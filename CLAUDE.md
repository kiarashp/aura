# Aura

A portfolio demo shop (SvelteKit + Prisma + Stripe in test mode). **Read `docs/state.md` first**:
the plan, what is done, what is next, and the traps.

- Package manager: pnpm. Checks before each commit: `pnpm check` and `pnpm build`.
- Commit and push to `master` after each finished, tested piece of work. Aura is not live yet, so a push
  changes nothing for visitors. Once it is on the server, a push goes live in about a minute.
- Server work: read `../_server/CLAUDE.md` first.
- Keep `docs/state.md` the current picture (replace sections, don't stack session diaries).
