// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import seoMedia from './src/integrations/seo-media.mjs';

// https://astro.build/config
export default defineConfig({
  // LIVE DOMAIN. Canonical URLs, Open Graph URLs, the sitemap and the RSS feed
  // are all derived from this — change it here and nowhere else.
  site: 'https://anthonycodes.tech',
  integrations: [
    sitemap({
      // 404 is a page, not content.
      filter: (page) => !page.includes('/404'),
    }),
    seoMedia(),
  ],
  markdown: {
    // Syntax highlighting for ```code``` fences in blog posts.
    shikiConfig: {
      theme: 'vitesse-dark',
      wrap: false,
    },
  },
});
