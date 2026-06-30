# Ngwashi Anthony — Mechatronics Portfolio & Blog

A minimal, engineering-flavoured portfolio + blog built with **[Astro](https://astro.build)**.
Static, fast, and easy to edit — no framework knowledge required.

---

## Running it on your machine

You need **Node.js 18.20+ or 20+** installed ([download here](https://nodejs.org)).

Open a terminal in this folder and run:

```bash
npm install      # download dependencies (first time only)
npm run dev      # start the local dev server
```

Then open the URL it prints — usually **http://localhost:4321** — in your browser.
Edits you save appear instantly.

When you want a finished site to upload somewhere:

```bash
npm run build    # outputs a static site into ./dist
npm run preview  # preview that built site locally
```

The `dist/` folder is plain HTML/CSS/JS — drop it on Netlify, Vercel, GitHub Pages, or any web host.

---

## How it's organised

```
src/
├─ styles/global.css          ← all the shared styling + design tokens (colours, fonts, spacing)
├─ components/
│  ├─ Header.astro            ← top navigation (used on every page)
│  └─ Footer.astro            ← footer (used on every page)
├─ layouts/
│  ├─ BaseLayout.astro        ← the page shell: <head>, fonts, header, footer
│  └─ BlogPost.astro          ← the reading layout for blog posts
├─ data/
│  └─ projects.js             ← YOUR PROJECT LIST (home + /projects both read this)
└─ pages/                      ← every file here becomes a URL
   ├─ index.astro             ← Home            →  /
   ├─ about.astro             ← About           →  /about
   ├─ projects/
   │  ├─ index.astro          ← Projects gallery →  /projects
   │  └─ _example.astro       ← project detail TEMPLATE (the _ means it's not published)
   └─ blog/
      ├─ index.astro          ← Blog index (lists every post automatically) → /blog
      └─ *.md                 ← one Markdown file per blog post
```

> **Starting fresh:** the project list in `src/data/projects.js` is empty on
> purpose — add your own real builds. Two example blog posts are kept as
> editable templates; replace them with your own write-ups.

---

## The bits you'll actually edit

### ✏️ Write a new blog post
Create a new `.md` file in `src/pages/blog/`. Copy the top section (the "frontmatter")
from an existing post and change the values:

```markdown
---
layout: ../../layouts/BlogPost.astro
title: My new post title
description: A one-line summary shown on the blog index.
category: Tutorial          # Tutorial | Project Log | Review | Notes
date: 01 JUN 2026
readTime: 5 MIN READ
order: 10                   # higher number = newer; controls sort order
heroLabel: photo — describe the cover image
tags: [Tutorial, Arduino]
---

Write your post here in Markdown. **Bold**, lists, links, and
```code blocks``` all just work.
```

Save it, and it appears on `/blog` automatically — no other file to touch.

### 🖼️ Add real images
Right now every image is a labelled grey placeholder (the `.frame` boxes).
To use a real photo: put it in a new `public/images/` folder and replace a
`<div class="frame">…</div>` with `<img src="/images/your-photo.jpg" alt="..." />`.

### 🎨 Change colours, fonts, spacing
Everything lives at the top of `src/styles/global.css` under `:root`.
For example, change the accent colour by editing `--accent`.

### 🤖 Add a project
1. Open `src/data/projects.js` and copy the template object into the `projects`
   array — fill in the slug, title, blurb, tags, etc. (Set `featured: true` on
   the one you want as the big card on the home page.)
2. Copy `src/pages/projects/_example.astro` to
   `src/pages/projects/<your-slug>.astro` (the file name must match the `slug`),
   then edit its text. That's the page the card links to.

The home page and `/projects` both read the same `projects.js`, so there's only
one list to keep up to date. Leave it empty and the site shows a tidy
"coming soon" panel instead of fake projects.

### 🧩 Edit a page's text
Open the matching file in `src/pages/` and edit the text directly — it's mostly
plain HTML (e.g. your bio, skills, and contact details live in
`src/pages/about.astro`).

---

## Notes

- Fonts (Space Grotesk + IBM Plex Mono) load from Google Fonts.
- Name, about, and contact details are set up for Ngwashi Anthony — edit them in
  `src/pages/about.astro`, `src/components/Header.astro`, and `src/components/Footer.astro`.
- Projects start empty and two blog posts remain as templates — add your real work.
- Images are still grey placeholders until you drop photos into `public/images/`.
