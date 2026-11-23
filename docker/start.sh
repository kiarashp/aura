#!/bin/sh
# What the app's box runs when it starts (see Dockerfile):
#   1. bring the database tables up to date (prisma migrate deploy: runs only the migrations not run yet)
#   2. fill in the shop's products, categories and 3 sample orders (prisma/seed.mjs: safe to run every time,
#      it updates rows instead of adding copies)
#   3. start the app
# If step 1 or 2 fails, the app does not start (better than a shop with no products).
set -e
cd /app
./node_modules/.bin/prisma migrate deploy
node prisma/seed.mjs
exec node build
