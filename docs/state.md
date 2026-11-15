# Aura — where we are

Last updated: 14 Nov 2026 (after step 4).

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
3. **DONE** — one-click demo logins, tested on a local build (desktop + phone):
   - `/sign-in` has two buttons, "Try as a customer" / "Try as the admin", like Library's
     `demo-login.blade.php`. No passwords, no sign-up. A cookie `aura_demo` holds `customer`/`admin`
     (`src/lib/server/demo.ts`, read in `src/hooks.server.ts`). It is not signed on purpose: both logins
     are public and read-only, so forging it gains nothing. Sign out: POST `/sign-out`.
   - `/account` (customer): the shared demo customer's orders. `/admin`: counts, latest 20 orders, all
     products. Nothing on either page saves. Header, mobile menu and footer show Sign in / My orders / Admin.
   - Orders: new `Order` + `OrderItem` tables (migration `20261114222953_orders`, already applied to the
     Neon database). Saved by `src/lib/server/orders.ts` from two places: the payment-success page
     (`?session_id=`) and the webhook `POST /api/stripe-webhook` (off unless `STRIPE_WEBHOOK_SECRET` is set).
     The unique Stripe session id stops double saves. No names/emails kept. Orders older than 30 days are
     deleted on each new order, except the 3 seeded samples (`seed_order_*`, in `prisma/seed.mjs`).
   - Old `/profile` page and its fake components are deleted.
4. **DONE** — polish, tested on a local build:
   - Images 4.7 MB → 1.3 MB: 17 unused files deleted, the two used chair PNGs are now 1000 px WebP.
     A product photo with a space in its name renamed (`Cloud-Nine-Platform-Bed-Frame.jpg`, seed updated).
   - Link check (every page as guest, customer and admin): nothing broken. Lighthouse on 5 pages:
     Best practices 100, SEO 100, Accessibility 94 → fixed its one issue (dark-mode switch and cart link
     had no name). Phone speed: main picture in 0.66 s on a slowed-down phone.
   - No page scrolls sideways at 360/390/768/1280 px. Phone fixes: filters on All products sit above the
     products, gap above the product name removed. Cart no longer claims tax/shipping is added.
   - Left for go-live: compression and cache headers belong in Caddy, not the app.
   - Shop text rewritten (Kia asked): no fake company facts. Home: new tagline "Quiet furniture for
     everyday rooms", "Try the whole shop" (4 true features), "Behind Aura" (portfolio + tech).
     About: "The shop" + "How it's built", with links to the demo logins and the GitHub code.
4b. **DONE** — redesign (Kia asked, 15 Nov 2026), tested light/dark, phone/desktop, Lighthouse 100 ×4:
   - Logo "Halo" (Kia picked A of 3): `src/lib/components/brand/` (LogoMark + Logo), `static/favicon.svg`,
     `favicon.png`, `apple-touch-icon.png`. Brand font Fraunces (self-hosted, `@fontsource-variable/fraunces`)
     for the logo and all h1/h2. New colour scale `mint-50…900` (`#83a9ac` = 400) in `src/app.css`.
   - All pictures replaced by one AI-made set (fal.ai, FLUX 1.1 pro ultra, $1.32 of Kia's €2–3 budget):
     13 products, home background, 5 category banners, 2 About pictures. Each is WebP in two sizes
     (`name.webp` + `name-sm.webp`, helpers in `src/lib/images.ts`). Full-size originals: `design/originals/`
     (git-ignored, local only).
   - New header (logo, pill menu, cart count, phone slide-in menu), footer (dark purple in both modes),
     home hero with parallax and a "breathing" glow, `PageBanner` on category pages, rounded product cards,
     scroll-in effect (`src/lib/actions/reveal.ts`), message pages show the glowing logo.
   - Dark-mode switch blink fixed: it now reads the `dark` class set before the first paint.
   - Home video (Kia OK'd): 5 s Kling 2.5 Turbo Pro loop from the home picture, $0.35 → fal.ai total
     **$1.67**. `static/banners/home.webm` (61 KB) + `.mp4` (347 KB); plays on screens ≥768 px only, and
     not with "reduce motion". Original in `design/originals/hero-video.mp4`.
   - UI review: axe scan of 14 page states × light/dark × phone/desktop went 42 → 0 problems
     (script idea: Playwright + axe-core, run from a scratch folder, not part of the project).
   - Extras: page changes cross-fade and product pictures glide card → product page (View Transitions,
     `onNavigate` in `+layout.svelte`); "Add to cart" stays on the page with a note (`src/lib/toast.svelte.ts`,
     `Toast.svelte`) and the cart count bounces. Idea not built yet: a search box in the header.
5. Go live at `aura.kiapmd.dev` on the Netherlands server (read `../_server/CLAUDE.md` first).
   Copy meditrack's setup: Dockerfile + image built by GitHub Actions. Must set
   `ORIGIN=https://aura.kiapmd.dev`, or checkout return links break behind Caddy. Env: `DATABASE_URL`,
   `STRIPEAPIKEY` (a **test** key), and `STRIPE_WEBHOOK_SECRET` after adding a webhook in the Stripe
   dashboard for `https://aura.kiapmd.dev/api/stripe-webhook`, event `checkout.session.completed`. Then a README with screenshots (today's README is the default one).

## Decisions Kia made

- Public repo (Kia leaned private, accepted public on advice).
- Stripe stays in **test mode**; the banner tells visitors to pay with 4242 4242 4242 4242.
- No legal pages (privacy, terms) — it's a demo.
- Live address `aura.kiapmd.dev`, no new domain.
- Vercel is being removed by Kia; Aura never used it.

## Not judged by Kia yet

- The finished redesign as a whole (Kia saw the logo options and the 3 test pictures, not the built pages).

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
