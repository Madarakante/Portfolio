// RSS feed for the blog — served at /rss.xml.
// Posts are the Markdown pages in src/pages/blog/*.md; `order` (higher = newer)
// is the same field the index uses for sorting.
import rss from '@astrojs/rss';

const MONTHS = {
  JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
  JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11,
};

// Frontmatter dates are display-only ("16 SEP 2026"), so parse them for RSS.
function parseDate(value) {
  const m = /^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/.exec(String(value ?? '').trim());
  if (!m) return undefined;
  const month = MONTHS[m[2].toUpperCase()];
  if (month === undefined) return undefined;
  return new Date(Date.UTC(Number(m[3]), month, Number(m[1])));
}

export async function GET(context) {
  const posts = Object.entries(import.meta.glob('./blog/*.md', { eager: true }));

  const items = posts
    .map(([path, mod]) => {
      const frontmatter = mod.frontmatter ?? {};
      const slug = path.replace(/^\.\/blog\//, '').replace(/\.md$/, '');
      const pubDate = parseDate(frontmatter.date);
      return {
        title: frontmatter.title,
        description: frontmatter.description,
        link: `/blog/${slug}/`,
        ...(pubDate ? { pubDate } : {}),
        _order: frontmatter.order ?? 0,
      };
    })
    .filter((item) => item.title)
    .sort((a, b) => b._order - a._order)
    .map(({ _order, ...item }) => item);

  return rss({
    title: 'Ngwashi Anthony · Build notes',
    description:
      'Build notes and beginner guides on electronics, embedded systems, robotics, and control.',
    site: context.site,
    items,
    customData: '<language>en</language>',
  });
}
