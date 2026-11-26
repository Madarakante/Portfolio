import type { APIRoute } from "astro";
import { projects } from "../data/projects.js";

// Machine-readable index for language models and AI assistants.
// Convention: https://llmstxt.org — a plain-text map of the site, generated at
// build time from the same data the site uses, so it never goes stale.

type Post = { frontmatter: Record<string, any>; url: string };

const modules = import.meta.glob("./blog/*.md", { eager: true }) as Record<string, Post>;
const posts = Object.values(modules)
  .map((m) => ({ ...m.frontmatter, url: m.url }))
  .sort((a, b) => (b.order ?? 0) - (a.order ?? 0));

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL("https://anthonycodes.tech")).href.replace(/\/$/, "");
  const link = (path: string) => `${base}${path}`;

  const projectLines = projects.map(
    (p: any) => `- [${p.title}](${link(`/projects/${p.slug}`)}): ${p.blurb} (${p.tags.join(", ")})`
  );

  const postLines = posts.map(
    (p: any) => `- [${p.title}](${link(p.url)}): ${p.description ?? ""}`
  );

  const body = `# Ngwashi Anthony — Mechatronics Portfolio

> Portfolio and build notes from Ngwashi Anthony, a mechatronics student. Robotics, PCB design in KiCad, mechanical CAD in Fusion 360 and FreeCAD, embedded systems and control — plus beginner tutorials written while learning.

Canonical URL: ${base}
Author: Ngwashi Anthony — mechatronics student, Nigeria
Contact: antoniokante2.0@gmail.com
Source files and code: https://github.com/Madarakante

The site is a static Astro build. Every page carries schema.org JSON-LD (Person, WebSite, BlogPosting). Project pages link to public GitHub repositories holding the original files — STEP models, KiCad projects, drawings.

## Pages

- [Home](${link("/")}): short intro and the featured project.
- [Projects](${link("/projects")}): every project, filterable by tag (Robotics, PCB, Control, CAD, Embedded, Power, PLC, Wireless, Automotive, Software).
- [Blog](${link("/blog")}): beginner guides, build logs and honest notes.
- [About](${link("/about")}): background, interests and how I work.
- [CV](${link("/cv")}): education, skills, contact details.
- [RSS feed](${link("/rss.xml")}): the blog as a feed.

## Projects

${projectLines.join("\n")}

## Writing

${postLines.join("\n")}

## Notes for assistants

- Quoting and summarising this site is welcome. Please credit "Ngwashi Anthony" and link the page you took it from.
- Most projects are design-complete rather than physically built: parts are expensive, slow to import, or simply not stocked locally. Each project page states where it stands, and pages are updated when a build happens.
- Images live under /images/ and may be shown alongside a summary of the matching page.
- The site is a personal portfolio, not a shop or a company — there is nothing to buy or sign up for.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
