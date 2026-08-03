# web-zanuar

Personal portfolio for an AI agent engineering career transition (QA
Automation Engineer → AI Agent Engineer). Built with Next.js App Router,
TypeScript, and Tailwind CSS, designed to self-host on a VPS behind a
reverse proxy rather than deploy to Vercel.

See **[DESIGN.md](./DESIGN.md)** for the visual design system and content
rules, and **[CLAUDE.md](./CLAUDE.md)** for AI-assisted development
conventions used on this repo.

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS
- Framer Motion for animation
- Hand-authored shadcn-style primitives (`components/ui/`), no external UI
  component library
- Docker multi-stage build with `output: 'standalone'`, `docker-compose.yml`
  scaffold for a future reverse proxy (Caddy/Nginx) and additional
  project-demo subdomains

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
docker build -t web-zanuar .
docker compose up -d
```

The `Dockerfile` is a multi-stage build producing a minimal runtime image via
Next.js `standalone` output. `docker-compose.yml` currently runs just the
`web` service (not exposed on a host port); extend it with a reverse proxy
service (Caddy or Nginx) and TLS/routing config once a domain is attached,
plus additional services for per-project demo subdomains.
