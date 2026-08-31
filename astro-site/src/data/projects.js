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
export const filters = ["Robotics", "PCB", "Control", "CAD", "Embedded", "Power", "PLC", "Wireless"];

export const projects = [
  {
    slug: "led-matrix",
    num: "05",
    year: "2026",
    title: "Wireless LED Matrix",
    blurb: "A WiFi-controlled scrolling LED matrix using a NodeMCU and MAX7219, powered by a LiPo battery and programmed to display custom text from a web browser.",
    label: "Fritzing: NodeMCU driving a MAX7219 32x8 LED matrix",
    image: "/images/ffritzingmatrix.png",
    featured: false,
    tags: ["Embedded", "Wireless"],
  },
  {
    slug: "fume-extractor",
    num: "04",
    year: "2026",
    title: "PWM Fume Extractor",
    blurb: "A 555-based PWM motor speed controller for a solder fume extractor, with a custom PCB and 3D-printed enclosure designed in Fusion 360.",
    label: "3D render: fume extractor motor speed controller PCB",
    image: "/images/motor-pcb-3d view.png",
    featured: false,
    tags: ["PCB", "Control", "Embedded"],
  },
  {
    slug: "plc-conveyor",
    num: "03",
    year: "2025",
    title: "PLC Conveyor Control",
    blurb: "A simple conveyor system in OpenPLC that detects boxes with a sensor and pushes them from one belt to another using a pneumatic pusher.",
    label: "OpenPLC editor: conveyor pusher control program",
    image: "/images/plc-editor-overview.gif",
    featured: false,
    tags: ["Control", "PLC"],
  },
  {
    slug: "voltage-regulator",
    num: "02",
    year: "2026",
    title: "Adjustable Voltage Regulator",
    blurb: "An LM317-based adjustable DC-DC converter: 12V input to a smooth 1.25V–12.8V output, with bridge rectification and thermal management.",
    label: "3D render: LM317 adjustable voltage regulator PCB",
    image: "/images/regulator-3d-render.png",
    featured: false,
    tags: ["PCB", "Power"],
  },
  {
    slug: "auralink",
    num: "01",
    year: "2026",
    title: "Auralink",
    blurb: "A 4-layer ESP32-C3 + LTE Cat-1 cellular board: dual-rail power, an RF-matched antenna, and a level-shifted UART bridge, taken from schematic to a DRC-clean, ordered PCB.",
    label: "board render: Auralink cellular IoT PCB",
    image: "/images/hero-3d.png",
    featured: true,
    tags: ["PCB", "Embedded"],
  },
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
