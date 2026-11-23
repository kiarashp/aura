# The app's box (Docker image: a sealed box with the app and everything it needs to run).
# Built on GitHub, never on the server (see .github/workflows/deploy.yml): a build uses all CPUs for a while
# and would slow down the other live sites.

# Shared start: Debian with openssl (the Prisma database parts need it; with it installed, Prisma picks the
# parts made for this exact system).
FROM node:24-slim AS os
RUN apt-get update && apt-get install -y --no-install-recommends openssl wget \
  && rm -rf /var/lib/apt/lists/*

# 1. Build: install everything, build the site, then drop the build-only packages.
FROM os AS build
WORKDIR /app
RUN npm install -g pnpm@12.18.0
# Packages first, code after: when only code changes, the slow install is reused from the cache.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build && pnpm prune --prod --ignore-scripts

# 2. Run: only the built site, the packages it needs at run time, and the database files.
FROM os
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    # adapter-node settings. Caddy (the front door) is the only way in, so its headers can be trusted:
    # the visitor's real address, and the site's real address (https + name), so links like the Stripe
    # return pages point to the right place on any address the site is served from.
    ADDRESS_HEADER=X-Forwarded-For \
    XFF_DEPTH=1 \
    PROTOCOL_HEADER=X-Forwarded-Proto \
    HOST_HEADER=X-Forwarded-Host \
    NODE_OPTIONS=--max-old-space-size=160 \
    # Prisma: no "is there a new version?" calls, and a writable home (the box is read-only except /tmp).
    CHECKPOINT_DISABLE=1 \
    PRISMA_HIDE_UPDATE_MESSAGE=1 \
    HOME=/tmp
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY package.json ./
COPY docker/start.sh /start.sh
# Run as the plain "node" user, not root (if someone breaks in, they get less).
USER node
EXPOSE 3000
CMD ["sh", "/start.sh"]
