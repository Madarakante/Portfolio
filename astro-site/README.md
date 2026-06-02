# Mara Voss — Mechatronics Portfolio & Blog

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
└─ pages/                      ← every file here becomes a URL
   ├─ index.astro             ← Home            →  /
   ├─ about.astro             ← About           →  /about
   ├─ projects/
   │  ├─ index.astro          ← Projects gallery →  /projects
   │  └─ line-following-robot.astro  ← a project detail page → /projects/line-following-robot
   └─ blog/
      ├─ index.astro          ← Blog index (lists every post automatically) → /blog
      └─ *.md                 ← one Markdown file per blog post
```

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

### 🧩 Edit a page's text
Open the matching file in `src/pages/` and edit the text directly — it's mostly
plain HTML. The project list lives in an array at the top of
`src/pages/projects/index.astro`.

---

## Notes

- Fonts (Space Grotesk + IBM Plex Mono) load from Google Fonts.
- All content is placeholder — swap in your own name, projects, posts, and photos.
- Built as a starting point: everything is meant to be edited.
