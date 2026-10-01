// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://madarakante.github.io',
  markdown: {
    // Syntax highlighting for ```code``` fences in blog posts.
    shikiConfig: {
      theme: 'vitesse-dark',
      wrap: false,
    },
  },
});
