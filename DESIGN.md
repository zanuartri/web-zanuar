# Design System

Visual direction: **"Console Pop"** — neo-brutalist. Bright paper background,
hard ink borders, offset "sticker" shadows instead of soft blur/glassmorphism,
electric cobalt + acid lime accents instead of the purple-gradient-on-white
AI-portfolio cliché. Terminal/agent motifs (traffic-light window chrome,
typewriter text, blinking status dots) reinforce the "AI agent engineer" story
without being literal screenshots.

Read this before adding a page, component, or case study. The goal is that a
new project entry in `lib/projects.ts` looks native on day one, not bolted on.

## Color tokens (`tailwind.config.ts`)

| Token    | Hex       | Use |
|----------|-----------|-----|
| `ink`    | `#111113` | Body text, borders, offset shadows |
| `paper`  | `#fbfbf7` | Page/card background |
| `signal` | `#2440ff` | Primary CTA, links, accent text, "in progress" status dot |
| `lime`   | `#d7ff3f` | Highlight fills (eyebrow tags, entry/sink nodes), success/blink accents |

Never introduce a fifth color without a reason. Two accents (signal + lime) on
an ink/paper base is the whole palette — resist the urge to add a third accent
for "variety."

## Typography

- **Display** (`font-display` → Fraunces, variable, italic available): page
  titles, hero headline. Bold/italic mixed within one heading is the signature
  move (see Hero's "act" / "chat." treatment).
- **Sans** (`font-sans` → IBM Plex Sans): body paragraphs.
- **Mono** (`font-mono` → IBM Plex Mono): everything that reads as
  data/system output — badges, nav, eyebrow labels, terminal content, stat
  labels. If it's uppercase + letter-spaced, it should be mono.

No Inter, no Space Grotesk, no system-ui fallback fonts for anything visible.

## Component patterns

- **Hard border + offset shadow** is the primary depth cue, not blur:
  `border-2 border-ink shadow-[Npx_Npx_0_0_theme(colors.X)]`. Interactive
  elements (`Button`, `ProjectCard`) shrink the shadow and translate toward it
  on hover, like a pressed button. Static elements (metric `Card`) don't need
  the press effect.
- **`components/ui/*`** (`Button`, `Badge`, `Card`) are the shadcn-style
  primitives — own the source, extend via `cva` variants, don't reach for a
  component library.
- **`components/terminal-window.tsx`** is the shared dark-window chrome
  (traffic lights + title bar). Reuse it for anything that should read as
  "live system output" (the hero's `AgentConsole`, About's `whoami` status
  card). Don't build a second version of this chrome.
- Status/progress must be honest: an unshipped or scoped-down project gets a
  visible status pill (see `Project.status` in `lib/projects.ts`), not a
  silent omission.

## Layout

- Outer shell is `max-w-6xl` (nav, main, footer in `app/layout.tsx`).
- Prose-heavy content (About paragraphs, case-study body copy) drops to a
  narrower measure (`max-w-2xl` / `max-w-3xl`) *inside* that shell — wide
  shell, narrow reading column.
- Mobile gets its own spacing scale, not just a squeezed desktop layout:
  vertical rhythm uses unprefixed (mobile) values that are tighter than the
  `sm:` desktop values (e.g. `space-y-14 sm:space-y-20`), not the reverse.

## Motion

- `SectionReveal` (scroll-triggered fade/rise via Framer Motion
  `whileInView`) wraps most page sections. Cheap, consistent, don't hand-roll
  a one-off variant per page.
- The Hero's staggered reveal and the `AgentConsole` typewriter effect are the
  two "hero moments" — deliberately more elaborate than anything else on the
  site. Don't add a third competing centerpiece animation; it dilutes both.
- Respect `prefers-reduced-motion` for anything looping/ambient
  (`GradientMesh`'s drift, the blink animation) — see `globals.css`.

## Content rules

These came from real corrections during development — they're not
stylistic opinions, they're guardrails:

- **No em dashes anywhere**, in code-authored copy or data. Use a comma,
  colon, or period instead. This applies to `lib/projects.ts` string fields
  too, not just JSX.
- **Never fabricate metrics or claim an unimplemented integration.** If a
  project doesn't actually do something yet, it doesn't appear in `stack`,
  the summary, or the architecture diagram, full stop, until it's real. If
  scope is genuinely planned but not built, say so via `status`, don't hide
  it and don't oversell it.
- **The hero is a personal statement, not a product pitch.** Keep it general
  (skills/background), not pinned to one project's implementation details
  (that's what the case study page is for).
- **Architecture diagrams must scope technology labels correctly.** Don't
  label one node "(LangGraph)" if LangGraph actually orchestrates the whole
  flow, i.e. the diagram is a claim, review it as carefully as the prose.
- Case studies are fully data-driven off `lib/projects.ts` (`Project`,
  `Architecture` types). Add a new project by adding an array entry, not by
  forking the page template.
