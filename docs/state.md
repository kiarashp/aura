# Aura — where we are

Last updated: 14 Nov 2026 (after step 2).

Aura is a **portfolio demo shop**, not a real shop: a SvelteKit + Prisma + Stripe furniture store that
proves Kia can build one. It must look finished and never break while a recruiter clicks around.
Repo: https://github.com/kiarashp/aura (public, renamed from `svelte-kia`). Branch: `master`.

## The plan (agreed with Kia)

1. **DONE** — repo cleanup: git root fixed, repo renamed `aura`, public, npm → pnpm, folder moved from
   `to-polish/aura/aura` to `servers/kia-netherlands-vps/aura`.
2. **DONE** (commit `c31cef8`) — bug fixes, all tested on a local build:
   - `adapter-node` 5 (v6 needs SvelteKit 3, which this project doesn't have).
   - One shared database client: `src/lib/server/db.ts`.
   - Missing/invalid product or category addresses give a real 404 (`src/lib/api.ts` → `getJson`).
   - New error page and payment pages share `src/lib/components/MessagePage.svelte`.
   - Checkout (`src/routes/api/checkout/+server.ts`) takes `{items:[{id,quantity}]}` and looks up
     Stripe prices in the database. Return links use the request's own address.
   - Cart refreshes names/prices from the shop, drops removed products, has an empty state and Remove.
   - Demo banner with the Stripe test card (`DemoBanner.svelte`). Newsletter forms removed.
   - Page titles everywhere, one price format (`src/lib/format.ts`), price filters fit real prices.
   - Seed: `pnpm prisma db seed` fills an empty database from `prisma/seed-data.json` (13 products,
     4 categories, same ids). Safe to run again.
3. **NEXT** — one-click demo logins, **Customer** and **Admin**, read-only. Copy how
   https://amg.kiapmd.dev/sign-in and https://library.kiapmd.dev/login do it (read their code in
   `../amg-next` and `../Library-Lara` first, so all three match). Customer sees order history (needs a
   Stripe webhook: Stripe calling the site when a payment is done). Admin sees a product list.
   Also swap the header's "profile" links (desktop icon + mobile menu) for "Sign in": `/profile` is
   still the old fake page with forms that save nothing.
4. Polish: every page at phone and desktop size in an isolated browser, a link checker, Lighthouse,
   shrink the 4.7 MB of images.
5. Go live at `aura.kiapmd.dev` on the Netherlands server (read `../_server/CLAUDE.md` first).
   Copy meditrack's setup: Dockerfile + image built by GitHub Actions. Must set
   `ORIGIN=https://aura.kiapmd.dev`, or checkout return links break behind Caddy. Env: `DATABASE_URL`,
   `STRIPEAPIKEY` (a **test** key). Then a README with screenshots (today's README is the default one).

## Decisions Kia made

- Public repo (Kia leaned private, accepted public on advice).
- Stripe stays in **test mode**; the banner tells visitors to pay with 4242 4242 4242 4242.
- No legal pages (privacy, terms) — it's a demo.
- Live address `aura.kiapmd.dev`, no new domain.
- Vercel is being removed by Kia; Aura never used it.

## Not judged by Kia yet

- The look of the new error / payment pages, the demo banner and the footer's "About this shop" column.
  Kia hasn't seen the site since the fixes.

## How to run and test

- Dev: `pnpm dev`. Checks: `pnpm check` (0 errors now) and `pnpm build`.
- Built site: `PORT=4321 ORIGIN=http://localhost:4321 node --env-file=.env build`.
  Stop it before building again: on Windows the running server locks `build/` and the build fails.
- `.env` (never committed) holds `DATABASE_URL` (today a Neon cloud Postgres), `STRIPEAPIKEY`,
  `API_VERSION`. See `.env.example`. `HOSTNAME` is no longer used: Docker overwrites it.

## Traps

- Files on disk were CRLF; they were switched to LF (git stores LF anyway). Use LF.
- pnpm needs build-script approval: see `allowBuilds` in `pnpm-workspace.yaml`.
- `lint` (prettier) would reformat almost every file; it hasn't been run. Do it as its own commit if wanted.
