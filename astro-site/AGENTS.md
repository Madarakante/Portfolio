# AGENTS.md — Astro portfolio + blog

Static Astro 5 site. No framework, no lint/typecheck script — **`npm run build` is the
verification step** (it also type-checks `.astro`/TS in `<script>` blocks).

```bash
npm run dev      # http://localhost:4321
npm run build    # → ./dist  (gitignored; run this after every content change)
npm run preview  # serve ./dist
```

## File map

```
src/styles/global.css        design tokens + shared classes (.wrap .kicker .tag .frame .card …)
src/components/Header.astro  nav; pass active="home|projects|blog|cv|about"
src/components/Footer.astro
src/layouts/BaseLayout.astro shell: head, OG/canonical, fonts, Header/Footer. <slot />
src/layouts/BlogPost.astro   reading layout for Markdown posts (720px column)
src/data/projects.js         SINGLE source of truth for project cards (home + /projects)
src/pages/index.astro        home
src/pages/projects/index.astro   gallery + tag filter
src/pages/projects/_example.astro  template (leading _ = not published)
src/pages/blog/index.astro   auto-globs ./*.md, featured = highest `order`
public/images/               all images (filenames may contain spaces)
```

## Adding a project (2 files)

1. **`src/data/projects.js`** — insert at the **top** of `projects` (array order = newest
   first) and give it `num = <project count> - <index>`, zero-padded to two digits — the
   current top entry `can-module` at index 0 is `"08"`, so the next one is `"09"`:
   `slug`, `num`, `year`, `title`, `blurb`, `label`, `image`, `featured`, `tags`.
   - `tags[0]` renders highlighted and every tag must exist in the exported `filters`
     array, or the filter bar hides the card.
2. **`src/pages/projects/<slug>.astro`** — copy `_example.astro`; filename must equal `slug`.
3. Images → `public/images/`, referenced as `/images/<file>` (spaces are fine, quote them).

### Project page anatomy

`BaseLayout(title="… · Ngwashi Anthony", description, image, active="projects")`
→ `.crumb` `← Projects` → `.proj-head` (`.kicker` `PROJ-09 · Tag · Tag · 2026`, `h1.h-xl`,
`.lede`, `.tags`, `.head-meta` rows) → hero `.frame.hero-frame` → `.body-grid`
(`article.writeup` + `aside.specs`, sticky) → `.nextprev` → `#lightbox` script.

Writeup building blocks (styles are **copied into each page** — keep them in sync):

| Class | Use |
|---|---|
| `<p class="mono-note">// goal: …</p>` | one-line intent, opens the write-up |
| `.calc-block` > `.calc-title` / `.calc-eq` / `.calc-result` | maths |
| `.calc-block` > `.calc-table` > `.calc-row` > `.ck` / `.cv` | pin/part tables |
| `.photo-single` / `.photo-pair` > `.frame` + `.photo-cap` | figures, caption `FIG 1: …` |
| `.frame` + `.frame-corner tl/tr/bl/br` + `.frame-label` | image placeholder |
| `.expandable` on `<img>` | click-to-zoom (needs the lightbox block) |
| `.specs` > `.specs-head` > `.spec-group` > `.g-label` + `.spec-line.sk/.sv` | sidebar |
| `.spec-link` | sidebar GitHub link |

### `.nextprev` chain (hand-maintained — easy to break)

Ordered **oldest → newest**: `auralink → voltage-regulator → plc-conveyor →
fume-extractor → led-matrix → flasher → pid-simulator → can-module`.

Left slot = older project (`← Title`), right slot = newer project (`Title →`).
An end of the chain gets `← All projects` / `All projects →` instead of an empty span.
Never point two pages at each other as each other's prev (that was a real bug).

## Adding a blog post (1 file)

`src/pages/blog/<slug>.md` — appears on `/blog` and home automatically.

```markdown
---
layout: ../../layouts/BlogPost.astro
title: Title Case, under ~60 chars
description: One-line summary (blog index excerpt + meta description)
category: Tutorial            # Tutorial | Project Log | Review | Notes
date: 01 OCT 2026             # uppercase, display-only
readTime: 6 MIN READ
badge: BEGINNER               # BEGINNER | BUILD LOG
order: 12                     # integer; HIGHER = NEWER. Controls sort AND "★ Most recent"
heroLabel: photo, describe the cover
heroImage: /images/x.png      # optional; omit → grey .frame with heroLabel
heroCaption: shown under the lead figure
tags: [Tutorial, Electronics] # tags[0] shown as tag-accent
prev: { title: "Older post", url: "/blog/older-slug" }
next: { title: "Newer post", url: "/blog/newer-slug" }
---
```

- **`order` must be unique and strictly increasing with date.** Duplicate/incorrect
  `order` silently makes the wrong post "Most recent". Before publishing: give the new
  post `order = max(existing) + 1` and add `next:` to the previously-newest post.
- `category` is mapped through `groupOf` in `blog/index.astro` to the filter chips
  (Tutorial→Tutorials, Project Log→Project Logs, Review→Reviews, Notes→Notes).
- Body supports: `## h2` (accent rule), `>` blockquote, ``` fences (Shiki
  `vitesse-dark`), inline `<div class="pull-note">`, `<figure class="diagram">` with
  `.frame` + `<figcaption>`, lists (rendered as mono dashes).

## Design system (`src/styles/global.css`)

- Tokens: `--paper #FBFAF7` `--ink #1B1A17` `--ink-2/3`, `--line/--line-2`,
  single accent `--accent oklch(0.575 0.176 38)` (vermilion), `--sans` Space Grotesk,
  `--mono` IBM Plex Mono, `--maxw 1180px`, `--gutter`, `--nav-h 70px`.
- Layout: `.wrap` (1180px) / `.wrap-narrow` (760px). Type: `.display .h-xl .h-lg .h-md
  .lede .mono .kicker`. Buttons: `.btn .btn-ghost .txtlink`. Cards: `.card`.
- Restraint is the style: hairlines, mono metadata, one accent, no extra colours.
- Breakpoints used across pages: 920/900/860px (stack grids), 760px (footer), 560/520px
  (single column + hamburger).

## Site config

- `astro.config.mjs` → `site: 'https://madarakante.github.io'`. **This is the only place
  the domain lives** — `BaseLayout` derives canonical/OG URLs from `Astro.site`.
- Deploy: `wrangler.jsonc` serves `./dist` as static assets (`wrangler deploy`).
- Markdown highlight theme: `vitesse-dark`.

## Content accuracy

Hardware claims get checked against the real source before shipping: Microchip datasheets
for pin names and electrical limits, and the project's own KiCad schematic/PCB renders in
`public/images/` for what is actually wired. Distinguish *buffers* from *pins*, *inputs*
from *outputs*, and what a header physically breaks out versus what its silkscreen calls it.
