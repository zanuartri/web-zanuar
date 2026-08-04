# web-zanuar

Live at **[zanuar.dev](https://zanuar.dev)**.

Personal portfolio for an AI agent engineering career transition (QA
Automation Engineer → AI Agent Engineer). Built with Next.js App Router,
TypeScript, and Tailwind CSS, self-hosted on a VPS behind Caddy rather than
deployed to Vercel.

See **[DESIGN.md](./DESIGN.md)** for the visual design system and content
rules, and **[CLAUDE.md](./CLAUDE.md)** for AI-assisted development
conventions used on this repo.

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS
- Framer Motion for animation
- Hand-authored shadcn-style primitives (`components/ui/`), no external UI
  component library
- Docker multi-stage build with `output: 'standalone'`, deployed via
  `docker-compose.yml` with a Caddy reverse proxy (automatic Let's Encrypt
  TLS)

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
Next.js `standalone` output. `docker-compose.yml` runs two services: `web`
(not exposed on a host port) and `caddy` (bound to 80/443), which
reverse-proxies to `web` and auto-provisions TLS for the hostnames listed in
`Caddyfile`. Extend `docker-compose.yml` with additional services for
per-project demo subdomains as those get built.

**Note:** `Caddyfile` is bind-mounted into the `caddy` container. If you edit
it after a `git pull` on the server, `docker compose restart caddy` isn't
enough, atomic file replacement (which `git` does) orphans the container's
mount from the old inode. Use `docker compose up -d --force-recreate caddy`
instead.
