# Bitsaura site

Marketing site for **Bitsaura**, a custom electronics hardware startup based in Douala, Cameroon.

Built with [Astro](https://astro.build). The homepage recreates the *Bitsaura Home v3 (Workbench)*
design from the Claude Design handoff: a fixed sidebar nav alongside a scrolling main column
(hero, services, products, request/about split, and a closing CTA), on a dark "workbench" theme
with an orange accent.

## Commands

| Command           | Action                                       |
| ----------------- | -------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start the dev server at `localhost:4321`     |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the production build locally         |

## Structure

- `src/pages/index.astro`: the homepage; section content lives in data arrays at the top.
- `src/layouts/BaseLayout.astro`: `<head>`, fonts (Space Grotesk / Inter / JetBrains Mono).
- `src/styles/global.css`: all styling. The accent color is driven by the `--acc*` custom
  properties on `:root`, so the brand color can be retuned in one place.
