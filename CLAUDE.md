# CLAUDE.md

This file guides Claude Code when working in this repo.

## What this is

Zanuar's personal portfolio: Next.js App Router + TypeScript + Tailwind,
targeting EU/AU remote-first hiring managers for an AI agent engineering
role. Currently one real case study (`qa-agent-platform`, in progress).

Before touching UI, read **`DESIGN.md`** — it's not optional context, it's
the rulebook for colors, typography, component patterns, and (importantly)
content honesty rules. Don't improvise a new visual style for a new
section; extend the existing one.

## Stack

Next.js (App Router, `output: 'standalone'`), TypeScript, Tailwind CSS,
Framer Motion, hand-authored shadcn-style primitives in `components/ui/`
(no external UI library). Deploys via Docker to a self-hosted VPS behind a
reverse proxy, not Vercel, so avoid Vercel-only features.

## Working agreements (learned the hard way this project)

- **Don't run `npm run dev` or `npm run build` unprompted.** The user runs
  the dev server themselves; starting/killing background dev processes has
  caused port conflicts and friction before. Make the code changes, describe
  them, let the user verify. Only run these if explicitly asked to.
- **Don't kill or manage the user's node processes** unless they ask.
- **No em dashes** in any copy you write or edit, in JSX or in
  `lib/projects.ts` data. Comma, colon, or period instead.
- **Never invent metrics, integrations, or claims the user hasn't
  confirmed are real.** This is a professional portfolio; overclaiming is a
  credibility risk, not a style nit. If unsure whether something is
  implemented, ask before adding it to a case study, the hero, or a stack
  badge list.
- **Ask before big subjective content/design rewrites.** Aesthetic direction,
  project scope, and personal narrative details (years of experience,
  employment status, what's shipped vs. planned) are the user's facts to
  confirm, not to infer or embellish.
- **Case studies are data, not templates.** Add/edit projects via the
  `Project`/`Architecture` types in `lib/projects.ts`. Don't fork
  `app/projects/[slug]/page.tsx` per project.
- Don't push commits or open PRs without being asked. Committing locally
  when asked is fine; pushing/creating remote repos is a separate ask.

## Key files

- `lib/projects.ts` — case study content and types (`Project`,
  `Architecture`, `Metric`). Single source of truth for anything shown on a
  case study page or project card.
- `lib/site.ts` — external links (GitHub, LinkedIn).
- `components/ui/` — `Button`, `Badge`, `Card` primitives (cva-based).
- `components/terminal-window.tsx` — shared dark terminal chrome, reused by
  the hero console and the About `whoami` card.
- `components/architecture-flow.tsx` — data-driven architecture diagram
  renderer (reads `Project.architecture`), falls back to
  `components/architecture-diagram.tsx` (image + scroll-tilt) if a project
  only supplies `architectureImage`/`architectureAlt` instead.
- `DESIGN.md` — full design system reference.
