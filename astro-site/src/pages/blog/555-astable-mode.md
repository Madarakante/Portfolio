---
layout: ../../layouts/BlogPost.astro
title: "The 555 timer in astable mode: continuous oscillation"
description: Wire a 555 to oscillate forever. No button, no trigger, just power it up and it generates a square wave. This is how turn signal flashers, LED blinkers, and tone generators work.
category: Tutorial
date: 16 SEP 2026
readTime: 10 MIN READ
badge: BEGINNER
order: 9
heroLabel: 555 astable oscillator schematic
heroImage: /images/flasherSchematic.png
heroCaption: The KiCad schematic. R1, R2, and C2 set the frequency and duty cycle.
tags: [Tutorial, Electronics, 555 Timer, Beginner]
prev: { title: "The 555 timer in monostable mode: one shot, one pulse", url: "/blog/555-timer-blink-without-code" }
---

In monostable mode the 555 fires once per trigger. In astable mode it fires forever. No button, no external input, just power it up and it oscillates. The output swings high and low at a rate set by two resistors and one capacitor. This is the circuit behind turn signal flashers, LED blinkers, tone generators, and clock signals.

> Power it on. It oscillates. That is the whole circuit.

## What you'll need

Same parts as monostable, just arranged differently.

- A **555 timer IC** (NE555, LM555, TLC555 all work).
- Two resistors: **R1** and **R2** (values set frequency and duty cycle).
- One electrolytic capacitor: **C** (values set frequency and duty cycle).
- One ceramic capacitor: **100nF** (decoupling, across power rails).
- A **LED** and a **220 ohm resistor** (to see the output).
- Power supply: **5V to 15V** (a 9V battery works fine).

## The schematic

The astable circuit is almost the same as monostable, but the trigger and threshold pins are tied together and connected to the timing capacitor. The discharge pin sits between R1 and R2.

<div class="diagram">
  <div class="frame">
    <span class="frame-corner tl"></span><span class="frame-corner tr"></span>
    <span class="frame-corner bl"></span><span class="frame-corner br"></span>
    <img src="/images/flasherSchematic.png" alt="555 astable mode schematic" style="width:100%;height:100%;object-fit:contain;" />
  </div>
  <figcaption>KiCad schematic of the 555 in astable mode. The MOSFET drives the lamps, but for a simple LED blinker you can skip that and connect the LED directly to pin 3.</figcaption>
</div>

The key difference from monostable: **no trigger button**. Pin 2 (trigger) and pin 6 (threshold) are connected together and tied to the capacitor. The capacitor charges through R1 + R2, then discharges through R2 alone. When it charges to 2/3 VCC, the output goes low and the discharge pin opens. When it discharges to 1/3 VCC, the output goes high and the discharge pin closes. This cycle repeats forever.

## How it works

The 555 astable has two phases:

**Phase 1: Charging (output HIGH)**

The capacitor charges through both R1 and R2. The voltage rises from 1/3 VCC toward 2/3 VCC. The output is HIGH during this phase. The time this takes is:

<div class="pull-note"><b>t_high</b> = 0.693 x (R1 + R2) x C</div>

**Phase 2: Discharging (output LOW)**

When the capacitor reaches 2/3 VCC, the internal comparator flips. The discharge pin (pin 7) opens, and the capacitor discharges through R2 alone. The voltage drops from 2/3 VCC toward 1/3 VCC. The output is LOW during this phase:

<div class="pull-note"><b>t_low</b> = 0.693 x R2 x C</div>

When the capacitor hits 1/3 VCC, the cycle restarts.

## The math

**Total period:**

<div class="pull-note"><b>T</b> = t_high + t_low = 0.693 x (R1 + 2 x R2) x C</div>

**Frequency:**

<div class="pull-note"><b>f</b> = 1 / T = 1.44 / ((R1 + 2 x R2) x C)</div>

**Duty cycle:**

<div class="pull-note"><b>D</b> = (R1 + R2) / (R1 + 2 x R2) x 100%</div>

Notice that R2 appears in both the charge and discharge paths, but R1 only appears in the charge path. This means the duty cycle is always greater than 50% (the output is HIGH longer than it is LOW). If you need exactly 50%, you need diodes across R2 to separate the charge and discharge paths.

## Example: turn signal flasher

I used this circuit for my [relayless turn signal flasher project](/projects/flasher). The values I had on hand:

- R1 = 15k ohm
- R2 = 30k ohm
- C = 10uF

**Calculations:**

<div class="pull-note">
<b>t_high</b> = 0.693 x (15000 + 30000) x 0.000010 = <b>0.312 seconds</b><br/>
<b>t_low</b> = 0.693 x 30000 x 0.000010 = <b>0.208 seconds</b><br/>
<b>T</b> = 0.312 + 0.208 = <b>0.520 seconds</b><br/>
<b>f</b> = 1 / 0.520 = <b>1.92 Hz</b> (115 flashes per minute)<br/>
<b>D</b> = (15000 + 30000) / (15000 + 60000) = <b>60%</b>
</div>

1.92 Hz means the lamps flash about 115 times per minute. The 60% duty cycle means the lamps are ON for 60% of the time and OFF for 40%. This matches typical turn signal behavior.

Here is my hand-drawn sketch of the circuit before I laid it out in KiCad:

<div class="diagram">
  <div class="frame">
    <span class="frame-corner tl"></span><span class="frame-corner tr"></span>
    <span class="frame-corner bl"></span><span class="frame-corner br"></span>
    <img src="/images/flasher handrawn for blog.jpg" alt="Hand-drawn schematic of the 555 flasher circuit" style="width:100%;height:100%;object-fit:contain;" />
  </div>
  <figcaption>Hand-drawn sketch of the flasher circuit. Sometimes paper and pen is faster than opening KiCad.</figcaption>
</div>

## The build

I soldered the board and wired it up to a pair of turn signal lamps. The 555, MOSFET, resistors, and capacitors all fit on a small two-layer PCB designed in KiCad.

<div class="diagram">
  <div class="frame">
    <span class="frame-corner tl"></span><span class="frame-corner tr"></span>
    <span class="frame-corner bl"></span><span class="frame-corner br"></span>
    <img src="/images/flasher front view.jpg" alt="Assembled flasher board front view" style="width:100%;height:100%;object-fit:contain;" />
  </div>
  <figcaption>Assembled flasher board. Screw terminals for the car wiring, 555 and MOSFET in the center.</figcaption>
</div>

<div class="diagram">
  <div class="frame">
    <span class="frame-corner tl"></span><span class="frame-corner tr"></span>
    <span class="frame-corner bl"></span><span class="frame-corner br"></span>
    <img src="/images/flasher top view.jpg" alt="Assembled flasher board top view" style="width:100%;height:100%;object-fit:contain;" />
  </div>
  <figcaption>Top view showing component placement and trace routing.</figcaption>
</div>

And here it is running:

<video controls preload="metadata" style="width:100%;border-radius:4px;margin:28px 0;">
  <source src="/images/flasher-demo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

The lamps blink at a steady 1.92 Hz. No relay click, no contact bounce, just clean solid-state switching.

## Tuning the frequency

Change R1, R2, or C to change the frequency:

- **Double the frequency**: halve R2 (or C).
- **Halve the frequency**: double R2 (or C).
- **Change duty cycle**: adjust the ratio of R1 to R2. Bigger R1 relative to R2 means higher duty cycle.

Quick reference for common frequencies with C = 10uF:

| Frequency | R1    | R2    | Application |
|-----------|-------|-------|-------------|
| 1 Hz      | 22k   | 47k   | Slow blink  |
| 2 Hz      | 15k   | 30k   | Turn signal |
| 5 Hz      | 6.8k  | 12k   | Fast blink  |
| 10 Hz     | 3.3k  | 5.6k  | LED strobe  |

## What trips people up

**The duty cycle is never exactly 50%.** R1 is always in the charge path but not the discharge path. If you need 50%, put two diodes across R2 so charge goes through R1 + D1 and discharge goes through R2 + D2 separately.

**The capacitor value matters a lot.** A 10uF cap gives you seconds. A 100nF cap gives you milliseconds. A 1uF cap gives you somewhere in between. Check your capacitor's voltage rating too, it needs to be above VCC.

**The 555 can source or sink current.** The output pin can drive up to 200mA, which is enough for a small relay, a buzzer, or a few LEDs. For bigger loads, add a MOSFET like I did in the flasher project.

**Decouple your power rails.** Put a 100nF ceramic cap across pins 1 and 8, as close to the IC as possible. The 555 draws current spikes when it switches, and without decoupling you get noise on the power rail that can cause erratic behavior.

## Monostable vs astable

| | Monostable | Astable |
|---|---|---|
| **Trigger** | External button | None, self-triggering |
| **Output** | One pulse per trigger | Continuous oscillation |
| **Frequency** | N/A (one-shot) | Set by R1, R2, C |
| **Duty cycle** | N/A | Always > 50% (without diodes) |
| **Use cases** | Timers, debouncing, delays | Flashers, tone generators, clocks |

## What to try next

- **LED blinker**: wire the output to an LED through a 220 ohm resistor. Watch it blink.
- **Tone generator**: connect a speaker to the output. Adjust R2 to change the pitch.
- **Turn signal flasher**: drive a MOSFET from the output to switch real lamps. That is what I did for the [relayless flasher project](/projects/flasher).
- **PWM output**: add diodes across R2 to get independent control over on-time and off-time. That is the basis for the [fume extractor motor speed controller](/projects/fume-extractor).

The 555 in astable mode is one of those circuits that looks too simple to be useful, but once you understand the math you start seeing it everywhere.
