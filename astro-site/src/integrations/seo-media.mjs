// Post-build pass over dist/**/*.html that adds the image attributes crawlers
// and layout want, without touching a single content file:
//
//   decoding="async"            always
//   loading="lazy"              on every image except the first in <main>
//   fetchpriority="high"        + loading="eager" on that first (LCP) image
//   width / height              intrinsic size read from public/images, so the
//                               browser reserves the right box before the file
//                               arrives (no layout shift)
//
// Images whose bytes can't be found (external URLs, files not in public/) are
// left alone apart from the loading/decoding hints.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const UTF8_STRICT = new TextDecoder('utf-8', { fatal: true });
const IMG_TAG = /<img\b[^>]*>/g;

function intrinsicSize(buffer) {
  // PNG: IHDR width/height are big-endian uint32 at offset 16/20.
  if (buffer.length > 24 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  // GIF: little-endian uint16 logical screen size at offset 6/8.
  if (buffer.length > 10 && buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
    return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
  }
  // JPEG: walk the marker segments to the first Start-Of-Frame.
  if (buffer.length > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    const NO_SIZE = new Set([0xc4, 0xc8, 0xcc]);
    let i = 2;
    while (i + 9 < buffer.length) {
      if (buffer[i] !== 0xff) { i += 1; continue; }
      const marker = buffer[i + 1];
      if (marker === 0xff) { i += 1; continue; }
      if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
      const length = buffer.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && !NO_SIZE.has(marker)) {
        return { height: buffer.readUInt16BE(i + 5), width: buffer.readUInt16BE(i + 7) };
      }
      if (length < 2) break;
      i += 2 + length;
    }
  }
  return null;
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function sizeFor(src, publicDir) {
  if (/^(https?:)?\/\//.test(src)) return null;
  let path;
  try {
    path = decodeURIComponent(src).replace(/^\//, '').split('?')[0];
  } catch {
    return null;
  }
  const file = join(publicDir, path);
  if (!existsSync(file)) return null;
  try {
    return intrinsicSize(readFileSync(file));
  } catch {
    return null;
  }
}

function decorate(html, publicDir) {
  const mainStart = html.indexOf('<main');
  let seenFirstInMain = false;
  let changed = false;

  const out = html.replace(IMG_TAG, (tag, offset) => {
    // The lightbox's <img> has no src until you click something.
    if (/\bid="lightbox-img"/.test(tag)) return tag;
    const src = /\bsrc="([^"]*)"/.exec(tag);
    if (!src) return tag;

    let next = tag;
    const first = mainStart >= 0 && offset >= mainStart && !seenFirstInMain;
    if (mainStart >= 0 && offset >= mainStart) seenFirstInMain = true;

    if (!/\bdecoding=/.test(next)) next = next.replace(/^<img/, '<img decoding="async"');
    if (!/\bloading=/.test(next)) {
      const hint = first ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';
      next = next.replace(/^<img/, `<img ${hint}`);
    }

    if (!/\bwidth=/.test(next) && !/\bheight=/.test(next)) {
      const size = sizeFor(src[1], publicDir);
      if (size) {
        const close = next.endsWith('/>') ? '/>' : '>';
        next = `${next.slice(0, -close.length)} width="${size.width}" height="${size.height}"${close}`;
      }
    }

    if (next !== tag) changed = true;
    return next;
  });

  return changed ? out : null;
}

export default function seoMedia() {
  return {
    name: 'seo-media',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const dist = fileURLToPath(dir);
        const publicDir = fileURLToPath(new URL('../../public/', import.meta.url));
        for (const file of walk(dist)) {
          let html;
          try {
            html = UTF8_STRICT.decode(readFileSync(file));
          } catch {
            continue; // never rewrite a file we can't round-trip
          }
          const next = decorate(html, publicDir);
          if (next) writeFileSync(file, next, 'utf8');
        }
      },
    },
  };
}
