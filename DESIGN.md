# Design System

The design source of truth is the FigCraft file:

`C:\Users\zen\Desktop\workspace\design\zanuar-dev\zanuar-dev.figcraft`

Read the "Layout and handoff" frame (2263) first, then Tokens (1589), Components
(1705), Motion (1796), and "Loading, empty and error" (1889). Pages: Homepage
desktop 1024 and mobile 1367, ZRouter 1213 and 1506, herdr-rig 2014 and 2195,
Mobile menu open 1568, States 1468, 404 1953.

The site code mirrors the FigCraft `zanuar` variable collection. Values live in
`app/globals.css` as CSS custom properties, and `tailwind.config.ts` maps them
to Tailwind classes. Components use tokens, never raw hex.

## Tokens

Color:

| Token | Value | Use |
|-------|-------|-----|
| `color/cream` | `#EFE4D2` | Page background |
| `color/paper` | `#FBF6EE` | Cards, secondary buttons |
| `color/ink` | `#2A2226` | Text, outlines, primary buttons |
| `color/ink-soft` | `#5A4D4F` | Body copy |
| `color/muted` | `#8C7F7A` | Labels, quiet metadata |
| `color/faint` | `#B9AB9C` | Down paths, disabled text |
| `color/line` | `#E2D6C3` | Dividers |
| `color/peach` | `#E9967A` | Accent decoration, hover shadow |
| `color/peach-soft` | `#F6CDBB` | Live fills, status pills |
| `color/rust` | `#9A5A3E` | Local gateways eyebrow on peach-soft |
| `color/skeleton` | `#E6DACA` | Loading blocks |

Radius: `card` 32, `card-mobile` 28, `inner` 20, `pill` 999.
Stroke: `outline` 2px, `tag` 1.5px.

Space: `1` 4, `2` 8, `3` 12, `4` 16, `5` 24, `6` 36, `7` 56, `8` 96, `9` 128.
The 390 mobile frame uses 20px side padding, which is outside this scale.
The desktop layout adds its own steps: `card` 28 (card padding), `section` 72
(between sections), `close` 48 (footer close line to its actions) and `footer`
64 (footer bottom padding). Widths: `--content` 1080 and `--content-wide`
1184.

Type: `display` 76, `h1` 60, `h2` 50, `h3` 34, `h4` 27, `lead` 21,
`body` 17, `small` 14, `mono` 14, `close` 40 (the footer line, 40/44).
Below 768 the display and heading scale
multiplies by 0.86: 45, 34, 31, 24. Page heroes are the drawn exceptions:
the homepage title is 75 desktop and 45 mobile, project titles are 117
desktop and 65 mobile.

Motion: `fast` 150ms, `base` 250ms, `slow` 450ms. Easing: `out`
`cubic-bezier(0.2, 0.8, 0.2, 1)` and `pop`
`cubic-bezier(0.34, 1.56, 0.64, 1)`. FigCraft stores durations as numbers;
the CSS properties use `ms`.

## Fonts

Fonts are loaded with `next/font/local` from `app/fonts/`.

- Fraunces variable for headings and the `zanuar` wordmark. Always set
  `font-variation-settings: "SOFT" 100, "WONK" 0`.
- DM Sans variable for body copy.
- DM Mono 400 and 500 for labels, numbers, and system-style text.

## Layout

- Below 768: mobile, 390 design width, 20px side padding, one column.
- 768 to 1199: tablet, one column, 48px side padding, tool cards 2 across.
- 1200 and up: desktop, 1440 design width. Content below the hero sits on a
  1080 grid centred in the page (x=180 at 1440). The nav and the homepage hero
  keep the wider 1184 shell (x=128, avatar stage at x=842).

`components/ui/container.tsx` implements both shells: by default it is the
1080 content grid, and `wide` keeps the 1184 line for the nav and the hero.
Use it for every page section instead of repeating the shell classes.

On desktop, sections are separated by 72px: a normal section pads its bottom
edge only, so its content ends 72 above the next section's content. Banded
sections (How it will work, the dashboard concept) pad 72 top and bottom as
well. The homepage hero keeps 64 below its art, the About band pads 56, and
the footer takes 72 above and 64 below, with a 40px close line 48 above its
actions. The homepage ZRouter teaser no longer adds its own top space.

## Components

- `Button`: primary is an ink pill with paper text. Secondary is a paper pill
  with an ink outline. Both are 58px tall, 17px DM Sans semibold, radius pill.
  Hover lifts 2px with a 4px peach shadow below. Secondary also fills
  peach-soft on hover. Pressed returns to the baseline and drops the shadow.
  Disabled uses faint border and text.
- `Tag`: status pill. `in-the-works` and `open-source` use peach-soft with a
  1.5px ink outline and ink text. `idea` uses cream with muted text and no
  outline. `live` uses ink with paper text and no outline.
- Card: paper fill, 2px ink outline, `card` radius (32, 28 below 768), and the
  28px `card` padding on desktop. The homepage tool cards keep 28 at every
  width (frame 1123) and hold a 470x122 visual at radius 14.4.
- Focus ring: 2px ink with a 2px offset on every link and button. It is set
  globally in `app/globals.css`, so do not add per-component rings.

## Content rules

- Copy text exactly as it appears in the design.
- ZRouter stays "In the works" until it ships. Small tools stay "Idea".
- No invented stars, users, or metrics. No private projects.
- Peach is decoration only, never text on cream.
- No raw hex in components or page code. Use the token classes or CSS variables.
- No em dashes in copy. Use a comma, colon, or period.
- Respect reduced motion: nothing loops or moves when the user asks it not to.
