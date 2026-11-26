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
export const filters = ["Robotics", "PCB", "Control", "CAD", "Embedded", "Power", "PLC", "Wireless", "Automotive", "Software"];

export const projects = [
  {
    slug: "lumi-ya-dc-case",
    num: "16",
    year: "2026",
    title: "LUMIYA DC Enclosure",
    blurb: "A round FreeCAD case for the LUMIYA DC board — a domed lid over a shallow tray, with the PCB and its components modelled inside to check the fit. The lid is left semi-transparent instead of an exploded view.",
    label: "FreeCAD: round enclosure for the LUMIYA DC board",
    image: "/images/lumi-ya-dc-case-iso.png",
    featured: false,
    tags: ["CAD"],
  },
  {
    slug: "lumi-ya-ac-case",
    num: "15",
    year: "2026",
    title: "LUMIYA AC Enclosure",
    blurb: "A two-part FreeCAD box for the LUMIYA AC board, with the PCB and its parts modelled inside. The lid carries the PIR and light-sensor openings; the tray takes the mains terminal block.",
    label: "FreeCAD: two-part enclosure for the LUMIYA AC board",
    image: "/images/lumi-ya-ac-case-top.png",
    featured: false,
    tags: ["CAD"],
  },
  {
    slug: "lumi-ya-ac",
    num: "14",
    year: "2026",
    title: "LUMIYA AC Light Controller",
    blurb: "The mains version of LUMIYA: an AM312 PIR and TEMT6000 ambient light sensor feed an ATtiny202, which fires a MOC3041 optotriac and BTA06 triac to switch an AC load. Designed in KiCad with an isolation slot between the mains and low-voltage sides.",
    label: "KiCad: LUMIYA AC light controller",
    image: "/images/lumi-ya-ac-3d-front.png",
    featured: false,
    tags: ["PCB", "Power", "Embedded"],
  },
  {
    slug: "lumi-ya-dc",
    num: "13",
    year: "2026",
    title: "LUMIYA DC Light Controller",
    blurb: "A 12 V DC light controller that switches a load using an AM312 PIR and a TEMT6000 ambient light sensor. Built around an ATtiny202 with a 3.3 V buck converter and MOSFET output, designed in KiCad.",
    label: "KiCad: LUMIYA DC light controller",
    image: "/images/lumi-ya-dc-3d.png",
    featured: false,
    tags: ["PCB", "Embedded"],
  },
  {
    slug: "smoke-alarm",
    num: "12",
    year: "2026",
    title: "Smoke Alarm",
    blurb: "A circular photoelectric smoke alarm PCB built around the RE46C140E16F detector IC, with an IR emitter/detector pair, a buzzer, and a test button. Designed in KiCad and paired with a 3D-printed optical chamber.",
    label: "KiCad: circular smoke alarm PCB",
    image: "/images/smoke-alarm-3d-chamber.png",
    featured: false,
    tags: ["PCB", "Embedded"],
  },
  {
    slug: "optical-chamber",
    num: "11",
    year: "2026",
    title: "Optical Chamber",
    blurb: "A circular optical chamber with a ring of internal baffles and three mounting tabs, modelled in Fusion 360 and exported as a STEP file.",
    label: "Fusion 360: optical chamber",
    image: "/images/optical-chamber.png",
    featured: false,
    tags: ["CAD"],
  },
  {
    slug: "odm",
    num: "10",
    year: "2026",
    title: "ODM",
    blurb: "A detailed sword model built in Fusion 360 and exported as a STEP file. Three bodies, roughly 1.2 m long, with an ornate guard and a grooved blade.",
    label: "Fusion 360: ODM sword model",
    image: "/images/odm-sword.png",
    featured: false,
    tags: ["CAD"],
  },
  {
    slug: "nema17-bracket",
    num: "09",
    year: "2026",
    title: "NEMA 17 Mounting Bracket",
    blurb: "A single-piece L-bracket for mounting a NEMA 17 stepper motor, modelled in Fusion 360 with slotted holes for adjustment and 45° gussets for rigidity.",
    label: "Fusion 360: NEMA 17 mounting bracket",
    image: "/images/nema17-bracket.png",
    featured: false,
    tags: ["CAD", "Robotics"],
  },
  {
    slug: "can-module",
    num: "08",
    year: "2026",
    title: "CAN Bus Module",
    blurb: "A compact SPI-to-CAN bus module using MCP2515 and MCP2551, with the controller's buffer-control pins broken out to a header. Designed for learning CAN protocol and EV communications.",
    label: "3D render: CAN bus module PCB",
    image: "/images/CAN 3d.png",
    featured: false,
    tags: ["Automotive", "Embedded", "PCB"],
  },
  {
    slug: "pid-simulator",
    num: "07",
    year: "2026",
    title: "PID Motor Simulator",
    blurb: "An interactive Python simulator that visualizes a PID controller driving a DC motor to a target position, with live sliders to tune the gains in real time.",
    label: "matplotlib: PID motor position control simulation",
    image: "/images/PID.gif",
    featured: false,
    tags: ["Control", "Software"],
  },
  {
    slug: "flasher",
    num: "06",
    year: "2026",
    title: "Relayless Turn Signal Flasher",
    blurb: "A 555 timer-based turn signal flasher that replaces the factory relay with a solid-state MOSFET driver, designed on a custom KiCad PCB.",
    label: "3D render: 555 timer turn signal flasher PCB",
    image: "/images/flasher3Dview.png",
    featured: false,
    tags: ["PCB", "Automotive"],
  },
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
