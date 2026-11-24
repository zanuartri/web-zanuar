# web-zanuar

Live at **[zanuar.dev](https://zanuar.dev)**.

Personal portfolio for an AI agent engineering career transition (QA
Automation Engineer → AI Agent Engineer). Built with Next.js App Router,
TypeScript, and Tailwind CSS, self-hosted on a VPS behind a shared Traefik reverse
proxy rather than deployed to Vercel.

See **[DESIGN.md](./DESIGN.md)** for the visual design system and content
rules, and **[CLAUDE.md](./CLAUDE.md)** for AI-assisted development
conventions used on this repo.

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS
- Framer Motion for animation
- Hand-authored shadcn-style primitives (`components/ui/`), no external UI
  component library
- Docker multi-stage build with `output: 'standalone'`, deployed via
  `docker-compose.traefik.yml` behind the shared Traefik in `vps-infra`
  (automatic Let's Encrypt TLS)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/
  page.tsx                  home: hero + case study list
  about/page.tsx            about page
  projects/[slug]/page.tsx  case study template (data-driven)
  icon.svg, apple-icon.tsx, opengraph-image.tsx  favicon/OG images
components/
  ui/                       Button, Badge, Card primitives
  hero.tsx, agent-console.tsx, terminal-window.tsx
  architecture-flow.tsx     data-driven architecture diagram
  project-card.tsx, gradient-mesh.tsx, section-reveal.tsx
lib/
  projects.ts               case study content + types (single source of truth)
  site.ts                   external links (GitHub, LinkedIn)
  utils.ts                  `cn()` class-merging helper
```

Adding a new case study: add an entry to the `projects` array in
`lib/projects.ts`. No new page/component required.

## Building for production

```bash
npm run build
npm run start
```

## Docker

```bash
docker compose up -d --build
```

The `Dockerfile` is a multi-stage build producing a minimal runtime image via
Next.js `standalone` output. In production, the shared Traefik instance from
`vps-infra` owns ports 80/443 and routes `zanuar.dev` / `www.zanuar.dev` to the
`web` container using the labels in `docker-compose.traefik.yml`. On the VPS
(`~/web-zanuar`), deploy with:

```bash
git pull
sudo docker compose -f docker-compose.traefik.yml up -d --build
```

Always pass `-f docker-compose.traefik.yml`. The plain `docker-compose.yml`
starts `web` without the Traefik labels, so zanuar.dev returns 404.

**Legacy:** `docker-compose.yml` and `Caddyfile` are the old Caddy-based setup
from before the Traefik migration. Production no longer uses them; they are
kept only for standalone use. If you do run them, `Caddyfile` is bind-mounted,
so after a `git pull` use `docker compose up -d --force-recreate caddy`
rather than a restart.
