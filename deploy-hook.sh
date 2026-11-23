#!/usr/bin/env bash
# This project's hook for the server's auto-pull (see the server project, docs/server.md "Auto-pull").
# It runs in /srv/aura after each pull, with the old and new commit, and prints a short word for the log.
# The app's CODE does not arrive this way (that is the image from GitHub Actions, deploy/receive-image.sh);
# a pull only brings settings files, so only a change to compose.server.yml needs the box updated.
set -euo pipefail
changed=$(git diff --name-only "$1" "$2")
done=""
if grep -qx 'compose.server.yml' <<<"$changed" && docker image inspect aura:live >/dev/null 2>&1; then
  docker compose -f compose.server.yml up -d --remove-orphans >&2 && done+=" app-box-updated"
fi
echo "$done"
