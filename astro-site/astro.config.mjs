// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  markdown: {
    // Syntax highlighting for ```code``` fences in blog posts.
    shikiConfig: {
      theme: 'vitesse-dark',
      wrap: false,
    },
  },
});
