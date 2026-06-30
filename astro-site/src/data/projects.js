// ───────────────────────────────────────────────────────────────────────────
// YOUR PROJECTS: the single source of truth.
//
// Both the home page (featured grid) and /projects read from this one array,
// so you only edit your project list in ONE place.
//
// To add a real project:
//   1. Copy the template object below, paste it into the `projects` array,
//      and fill in your details. Newest project goes at the TOP.
//   2. Create the matching detail page so the card has somewhere to link:
//      copy  src/pages/projects/_example.astro  to
//            src/pages/projects/<your-slug>.astro
//      (the file name must match `slug`), then edit its text.
//
// Leaving the array empty is fine, the site shows a tidy "coming soon" state.
//
// Field reference:
//   slug    URL + detail-page filename, e.g. "my-robot" → /projects/my-robot
//   num     two-digit label shown on the card, e.g. "01"
//   year    e.g. "2026"
//   title   project name
//   blurb   one or two sentences for the card
//   label   caption shown inside the grey image placeholder (until you add a photo)
//   featured  set true on the ONE project you want as the big home-page card
//   tags    array; the FIRST tag is highlighted. Keep them from the list below.
// ───────────────────────────────────────────────────────────────────────────

// Tags that appear as filter buttons on /projects. Add/remove to taste.
export const filters = ["Robotics", "PCB", "Control", "CAD", "Embedded"];

export const projects = [
  // ── TEMPLATE: copy this, fill it in, remove the leading // on each line ──
  // {
  //   slug: "my-first-robot",
  //   num: "01",
  //   year: "2026",
  //   title: "My First Robot",
  //   blurb: "One or two sentences describing what it does and why you built it.",
  //   label: "build photo: describe the cover image",
  //   featured: true,
  //   tags: ["Robotics", "Embedded"],
  // },
];
