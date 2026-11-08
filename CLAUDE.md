# CLAUDE.md

This file guides Claude Code when working in this repo.

## What this is

Zanuar's personal site: a field guide to coding with agents. Small, friendly
tools for the moments an agent gets stuck, a teaser for ZRouter (still "In
the works") and a page for herdr-rig (open source). Built with Next.js App
Router + TypeScript + Tailwind, aimed at EU/AU remote-first hiring managers
for an AI agent engineering role.

Before touching UI, read **`DESIGN.md`**: it's not optional context, it's
the rulebook for colors, typography, component patterns, motion, and
(importantly) content honesty rules. The design source of truth is the
FigCraft file at `C:\Users\zen\Desktop\workspace\design\zanuar-dev\zanuar-dev.figcraft`;
DESIGN.md mirrors it. Don't improvise a new visual style for a new section;
extend the existing one.

## Stack

Next.js (App Router, `output: 'standalone'`), TypeScript, Tailwind CSS,
Framer Motion, hand-authored shadcn-style primitives in `components/ui/`
(no external UI library). Live at [zanuar.dev](https://zanuar.dev), deployed
via Docker Compose to a self-hosted VPS behind Caddy (auto TLS), not Vercel,
so avoid Vercel-only features. VPS access details live outside this repo,
ask the user if you need to deploy something and don't have them.

## Working agreements (learned the hard way this project)

- **Don't run `npm run dev` or `npm run build` unprompted.** The user runs
  the dev server themselves; starting/killing background dev processes has
  caused port conflicts and friction before. Make the code changes, describe
  them, let the user verify. Only run these if explicitly asked to.
- **Don't kill or manage the user's node processes** unless they ask.
- **No em dashes** in any copy you write or edit, in JSX or in the data
  files under `lib/`. Comma, colon, or period instead.
- **Never invent metrics, integrations, or claims the user hasn't
  confirmed are real.** This is a professional portfolio; overclaiming is a
  credibility risk, not a style nit. ZRouter stays "In the works", small
  tools stay "Idea". If unsure whether something is implemented, ask before
  adding it to the hero, a page, or a badge list.
- **Ask before big subjective content/design rewrites.** Aesthetic direction,
  project scope, and personal narrative details (years of experience,
  employment status, what's shipped vs. planned) are the user's facts to
  confirm, not to infer or embellish.
- **Pages are data, not templates.** Copy and structure live in
  `lib/content.ts`, `lib/zrouter.ts` and `lib/herdr-rig.ts`. Don't fork
  `app/zrouter/page.tsx` or `app/herdr-rig/page.tsx` per section.
- **No raw hex or hardcoded durations** in components. Use the tokens from
  `app/globals.css` / `tailwind.config.ts` (`color/*`, `radius/*`, `motion/*`,
  `text/*`).
- **Respect reduced motion.** CSS media query handles CSS animations and
  transitions; anything scripted reads `useReducedMotion` too.
- Don't push commits or open PRs without being asked. Committing locally
  when asked is fine; pushing/creating remote repos is a separate ask.
- **`Caddyfile` is bind-mounted into the `caddy` container on the VPS.**
  After a `git pull` there, a plain `docker compose restart caddy` (or
  `caddy reload`) won't pick up the new file, `git`'s atomic rename orphans
  the container's mount from the old inode. Use
  `docker compose up -d --force-recreate caddy`.

## Key files

- `app/globals.css`: tokens mirrored from the FigCraft `zanuar` collection,
  base type, the global 2px ink focus ring, and the reduced-motion overrides.
- `tailwind.config.ts`: maps those tokens to utilities (colors, radius,
  stroke, motion, type scale, the 768/1200 breakpoints).
- `lib/content.ts`: homepage copy and types for the hero, guide index
  entries, tool cards, ZRouter teaser and about.
- `lib/zrouter.ts`, `lib/herdr-rig.ts`: content and types for those pages.
- `lib/site.ts`: external links (GitHub, LinkedIn, X, email).
- `components/ui/`: `Button` (primary/secondary via cva), `Tag` (status
  pills), `Container` (the breakpoint shell).
- `components/home/`: homepage sections, including `hero`, `guide-index`,
  `zrouter-section`, `zrouter-demo` (the interactive provider diagram),
  `tool-cards`, `tool-visual` and `about`.
- `components/home/demo-boundary.tsx`: error boundary around the ZRouter
  demo, with the "The demo didn't load" fallback card.
- `components/motion/reveal.tsx`: scroll reveal wrapper. CSS does the
  fade/rise, Framer Motion only supplies in-view and reduced-motion.
- `components/sections/`: shared page sections, including `page-hero`,
  `promise-cards`, `dark-callout`, `numbered-steps`, `showcase`,
  `screenshot` (frame + skeleton), `checklist` and `live-map`.
- `components/nav.tsx`, `components/footer.tsx`: shared chrome; the mobile
  menu is a native `<dialog>`.
- `DESIGN.md`: full design system reference.
