---
layout: ../../layouts/BlogPost.astro
title: "The 555 timer in monostable mode: one shot, one pulse"
description: Press a button, get a timed pulse. No code, no IDE, just a 555, a resistor, a capacitor, and a breadboard that almost drove me crazy.
category: Tutorial
date: 22 AUG 2026
readTime: 8 MIN READ
badge: BEGINNER
order: 10
heroLabel: simulation, 555 monostable timer circuit animation
heroImage: /images/555-simulation.gif
heroCaption: Simulation of the 555 monostable circuit. Press the trigger, the output goes high for a set duration, then drops back to low.
tags: [Tutorial, Electronics, 555 Timer, Beginner]
prev: { title: "Getting your first servo moving with Arduino", url: "/blog/getting-your-first-servo-moving-with-arduino" }
---

The 555 timer has been around since 1972 and it is still one of the first things people reach for when they get into electronics. Not because it is the best at anything, but because it works, the parts are cheap, and you do not need to write a single line of code.

In monostable mode, the 555 does one thing: you press a button, the output goes high for a fixed duration, then it goes low again. One shot. The duration depends on one resistor and one capacitor. Press the button again, it fires again. This is behind door buzzers, automatic night lights, and debouncing circuits.

> Press the button. Watch the LED flash. That is it. That is the whole circuit.

## What you'll need

Nothing exotic here, most of this is sitting in any starter kit.

- A **555 timer IC** (the NE555 is the classic, LM555 or TLC555 work too).
- A resistor: **70k** (R1).
- An electrolytic capacitor: **10 microfarads (C1)**, this sets the pulse duration.
- One **push button** (momentary, normally open).
- An **LED** and a **330 ohm resistor** to protect it.
- A breadboard, some jumper wires, and a 5V power source.

<div class="pull-note">// <b>about the 0.01uF capacitor</b>: the datasheet recommends a 0.01uF capacitor on pin 5 (control voltage) to filter noise. I did not have one available so I left it out. For blinking an LED it does not matter, but for more sensitive circuits or cleaner timing you should include it.</div>

<div class="pull-note">// <b>about my power source</b>: I do not own a proper power supply yet. I repurposed the voltage regulator board from my earlier <a href="/projects/voltage-regulator">voltage regulator project</a>, a 7805 on a small perfboard with a screw terminal. It accepts up to 18V AC or DC input and gives me a clean 5V rail. It is not pretty, but it works perfectly for breadboard experiments like this.</div>

## The pinout

The 555 has 8 pins and they are not in the order you would expect. Here is the one you need to memorise:

| Pin | Name | What it does |
|-----|------|-------------|
| 1 | GND | Ground, connect to 0V |
| 2 | TRIG | Trigger, starts the timing cycle when voltage drops below 1/3 Vcc |
| 3 | OUT | Output, this is where your LED or load connects |
| 4 | RESET | Reset, tie to Vcc to keep the chip running |
| 5 | CTRL | Control voltage, bypassed with a small capacitor to GND |
| 6 | THR | Threshold, ends the timing cycle when voltage rises above 2/3 Vcc |
| 7 | DIS | Discharge, drains the timing capacitor through a resistor |
| 8 | Vcc | Power, connect to positive supply |

In monostable mode, the important pins are 1 (GND), 2 (TRIG), 3 (OUT), 4 (RESET), 6 (THR), 7 (DIS), and 8 (Vcc). Pin 5 gets a small capacitor to ground for stability, if you have one.

<figure class="diagram">
  <img src="/images/555-pinout-datasheet.jpg" alt="555 timer pin configuration from the TI datasheet" style="width:100%;border-radius:4px;" />
  <figcaption>FIG 2: 555 pin configuration from the TI datasheet. The notch indicates pin 1.</figcaption>
</figure>

<figure class="diagram">
  <img src="/images/555-pinout-handwritten.jpg" alt="hand-drawn 555 pinout diagram on yellow paper" style="width:100%;border-radius:4px;" />
  <figcaption>FIG 3: my own pinout reference, drawn before I started wiring. Drawing it out helps it stick.</figcaption>
</figure>

## How it works

When you press the button, pin 2 (trigger) gets pulled below 1/3 Vcc. The 555 sets its output high and starts charging a capacitor through a resistor. When the capacitor voltage reaches 2/3 Vcc (measured at pin 6, threshold), the output goes low and the capacitor discharges through pin 7 (discharge). The output stays high for exactly one time period, no matter how long you hold the button.

## The circuit

1. **Pin 1** to GND.
2. **Pin 8** to Vcc (5V).
3. **Pin 4** to Vcc (keeps the chip enabled).
4. **R1 (70k)** from Vcc to pin 7 (discharge).
5. **C1 (10uF)** from pin 6 to GND (the timing capacitor).
6. **Connect pin 6 to pin 7**, this is critical, the threshold pin needs to see the capacitor voltage.
7. **Pin 2** to one leg of the push button. The other leg goes to GND. Add a **10k pull-up resistor** from pin 2 to Vcc so the trigger pin sits high until you press the button.
8. **Pin 3** (output) to a 330 ohm resistor, then to the LED anode. LED cathode to GND.

Eight connections and you have a one-shot timer.

<figure class="diagram">
  <img src="/images/555-ic-breadboard.jpg" alt="NE555P IC placed on the breadboard ready for wiring" style="width:100%;border-radius:4px;" />
  <figcaption>FIG 4: the NE555P sitting on the breadboard, ready to be wired up. Pin 1 is at the bottom left.</figcaption>
</figure>

<video controls style="width:100%;border-radius:4px;margin:24px 0;">
  <source src="/images/555-monostablestable-demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## The math

The pulse width (how long the output stays high) is:

**t = 1.1 x R1 x C1**

With R1 = 70k and C1 = 10uF:

- t = 1.1 x 70,000 x 0.00001 = **0.77 seconds**

That is about three-quarters of a second. The LED flashes on, stays on for a visible moment, then turns off. Swap C1 for 100uF and you get 7.7 seconds, a long, obvious pulse.

<div class="pull-note">// <b>try this</b>: put a potentiometer in place of R1. Turn the knob and the pulse length changes. You have just built a variable one-shot timer. This is the same principle behind those hallway lights that stay on for 30 seconds then turn off.</div>

## Changing the pulse width

The fun part is tuning it:

- **R1** sets the charge rate. Bigger resistor equals longer pulse.
- **C1** sets how much charge is needed. Bigger capacitor equals longer pulse.
- **The LED brightness** does not change with the timing components. That is set by the 330 ohm resistor on the output.

For a quick flash (like a notification blip), try R1 = 1k, C1 = 1uF. For a long pulse (like a door buzzer), try R1 = 100k, C1 = 100uF.

## What I got wrong

<figure class="diagram">
  <img src="/images/555-monostable-breadboard-1.jpg" alt="full breadboard view of the monostable circuit with all wiring" style="width:100%;border-radius:4px;" />
  <figcaption>FIG 5: the complete monostable circuit on the breadboard. Every wire has a purpose, and one of them was lying to me.</figcaption>
</figure>

The first time I wired the monostable, the LED turned on when I pressed the button but it never turned off. It just stayed on, solid, like the timer did not exist. I stared at it for a while feeling like a fraud, I had just calculated that the pulse should last about 0.77 seconds with a 70k resistor and a 10uF capacitor, and here it was stuck on permanently.

The problem was embarrassingly simple. When I connected the resistor from pin 7 to Vcc, I missed the hole by one row. The wire was plugged into the hole right next to the one it should have been in. The resistor was physically close to the right spot but electrically connected to nothing useful. So pin 7 never got the discharge path it needed, the capacitor never drained, and the output never went low.

I moved the wire one row over and it worked immediately. One hole. That is all it was.

This is a breadboard problem nobody warns you about. The holes are tiny, they all look the same, and if you are even slightly off, the circuit does what it wants, not what you told it to do. If your circuit is not behaving the way the math says it should, do not assume the formula is wrong. Check that every wire is in the exact hole you think it is in.

The second mistake was putting the LED in backwards. The 555 output pin (3) sources current (pushes out positive voltage), so the LED anode connects to the output side. If you wire it the other way, the LED just does nothing. No damage, no smoke, just silence.

<figure class="diagram">
  <img src="/images/555-closeup.jpg" alt="close-up of the 555 timer and resistors on the breadboard" style="width:100%;border-radius:4px;" />
  <figcaption>FIG 6: close-up of the wiring around the 555. The resistors and push button are visible on the right side.</figcaption>
</figure>

<div class="pull-note">// <b>debugging tip</b>: if the LED turns on and never turns off, the capacitor is not discharging. Check pin 7, the resistor from pin 7 to Vcc and the connection between pin 6 and pin 7. If either is wrong, the capacitor has no discharge path and the output stays high forever.</div>

## What I learned

<figure class="diagram">
  <img src="/images/555-monostable-breadboard-2.jpg" alt="alternate angle of the monostable circuit on the breadboard" style="width:100%;border-radius:4px;" />
  <figcaption>FIG 7: another angle of the finished circuit. The push button and LED are on the right side of the board.</figcaption>
</figure>

**The breadboard is not always trustworthy.** I spent twenty minutes debugging a circuit that was wired correctly. The breadboard had a dead row. If something does not work and the schematic looks right, move to a different section of the board before you start replacing components.

**Power supply matters.** I used my <a href="/projects/voltage-regulator">voltage regulator board</a> from an earlier project, a 7805 regulator on a small piece of perfboard with a screw terminal. It accepts up to 18V AC or DC input and outputs a clean 5V. Without it, I would have been swapping batteries the whole time. Having a reliable 5V rail on the breadboard made experimenting much faster.

**The math actually works.** I was sceptical that the formula would match reality on a cheap breadboard with no-name components. It did. The measured pulse width was within 10% of the calculated value. Close enough to confirm you understand what is happening, far enough to remind you that real capacitors have tolerances.

## What to try next

Once the monostable is working, a few natural next steps:

- **Swap C1 for different values** and time the pulse with your phone. With a 70k resistor, 10uF gives you about 0.8 seconds. 100uF gives you about 7.7 seconds. 1000uF gives you about 77 seconds. The relationship is linear and predictable.
- **Add a potentiometer** in place of R1. Turn the knob and watch the pulse length change in real time. You have just built a variable one-shot timer.
- **Connect pin 3 to a relay module** instead of the LED. The 555 can source or sink about 200mA, enough to trigger a small relay. Now you have a timed switch, press the button, something stays on for a set duration, then turns off.
- **Try astable mode** next. Tie pins 2 and 6 together, add a second resistor, and the 555 free-runs forever. No button needed. That is the blinker, the oscillator, the clock signal, and it is the subject of my next post.

The 555 is one of those rare parts that is worth understanding deeply. Even if you never use it in a real project (you probably will), the RC timing concepts it teaches show up everywhere in electronics, from power supply filtering to communication protocols to sensor debouncing.
