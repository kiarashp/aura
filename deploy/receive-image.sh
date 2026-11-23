#!/usr/bin/env bash
# Runs on the server when GitHub Actions sends a new app image (see .github/workflows/deploy.yml).
#
# GitHub logs in with its own SSH key, which may run ONLY this script (a "forced command" in
# ~claude/.ssh/authorized_keys). It cannot open a shell or run anything else.
# It sends the image (packed with gzip) and the commit id it was built from.
#
# This script: unpacks the image, checks it is really aura built from that commit, names it "live",
# restarts the box with it, and keeps the 3 newest images.
#
# By hand (as claude on the server):
#   receive-image.sh back <commit>   run an older image that is still on the server
set -euo pipefail
cd /srv/aura
LOG=/var/log/kiapmd/deploy.log
log() { echo "$(date -u '+%Y-%m-%d %H:%M:%S UTC') aura: $*" | tee -a "$LOG" >&2; }

restart() {
  docker tag "aura:$1" aura:live
  docker compose -f compose.server.yml up -d --remove-orphans >&2
  # Wait up to 2 minutes for the box to say it is healthy (it first updates the database tables and fills in the products).
  for _ in $(seq 24); do
    sleep 5
    state=$(docker inspect -f '{{.State.Health.Status}}' aura-app-1 2>/dev/null || echo missing)
    [ "$state" = healthy ] && return 0
  done
  return 1
}

# Started by GitHub: the "command" it sends is just the commit id. Started by hand: the arguments.
set -f  # no wildcard expansion of what GitHub sends
set -- ${SSH_ORIGINAL_COMMAND:-$*}

if [ "${1:-}" = back ]; then
  commit=${2:?give a commit id, see: docker images aura}
  docker image inspect "aura:$commit" >/dev/null || { echo "no image aura:$commit on the server" >&2; exit 2; }
  restart "$commit" && log "WENT BACK to image ${commit:0:7} (healthy)" || log "WENT BACK to image ${commit:0:7}, NOT HEALTHY (docker logs aura-app-1)"
  exit 0
fi

commit=${1:-}
[[ $commit =~ ^[0-9a-f]{40}$ ]] || { echo "expected a 40-character commit id" >&2; exit 2; }

# At most 1 GB unpacked, so a broken upload cannot fill the disk.
loaded=$(gunzip | head -c 1G | docker load | sed -n 's/^Loaded image: //p') || true
if [ "$loaded" != "aura:$commit" ]; then
  log "REFUSED image \"$loaded\" (expected aura:$commit)"
  [ -n "$loaded" ] && docker rmi "$loaded" >/dev/null 2>&1 || true
  exit 2
fi

if restart "$commit"; then
  log "image ${commit:0:7} live (healthy)"
else
  log "image ${commit:0:7} started but NOT HEALTHY (docker logs aura-app-1; go back: receive-image.sh back <older commit>)"
fi

# Keep the 3 newest images, delete older ones (shared parts are stored once).
docker images aura --format '{{.CreatedAt}}\t{{.Tag}}' | grep -vP '\t(live|<none>)$' | sort -r \
  | tail -n +4 | cut -f2 | while read -r old; do docker rmi "aura:$old" >/dev/null || true; done
docker image prune -f >/dev/null
