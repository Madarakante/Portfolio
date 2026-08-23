---
layout: ../../layouts/BlogPost.astro
title: "Your first blink without code: the 555 timer"
description: No IDE, no upload, no programming language. Just resistors, a capacitor, and one of the most popular chips ever made.
category: Tutorial
date: 22 AUG 2026
readTime: 8 MIN READ
badge: BEGINNER
order: 10
heroLabel: photo, 555 timer on a breadboard with an LED blinking
heroCaption: One chip, two resistors, one capacitor, and an LED. The simplest circuit that does something visible.
tags: [Tutorial, Electronics, 555 Timer, Beginner]
prev: { title: "Getting your first servo moving with Arduino", url: "/blog/getting-your-first-servo-moving-with-arduino" }
---

The 555 timer has been around since 1972 and it is still one of the first things people build when they get into electronics. There is a good reason for that: it works, the parts are cheap, and you do not need to write a single line of code. You wire it up, give it power, and something happens. An LED blinks. A speaker beeps. A motor pulses. That immediate feedback loop is the same one that makes Arduino addictive, just without the computer.

Here is what you will walk away with: a working blinker circuit built entirely from passive components and one IC. No USB cable, no IDE, no serial monitor. Just a breadboard and a battery.

> Wire it, power it, watch it blink. Then change a resistor and watch it change speed.

## What you'll need

Most of this is sitting in any starter kit. Nothing exotic here.

- A **555 timer IC** (the NE555 is the classic, LM555 or TLC555 work too).
- Two resistors: **10k (R1)** and **47k (R2)** to start.
- One electrolytic capacitor: **10 microfarads (C1)**.
- One ceramic capacitor: **0.01 microfarads (C2)**, for the control pin.
- An **LED** and a **330 ohm resistor** to protect it.
- A breadboard, some jumper wires, and a 5V power source (USB breakout, coin cell, or battery pack).

<div class="pull-note">// <b>beginner tip</b>: the 555 runs fine from 4.5V to 15V, but 5V from a USB breakout or Arduino's 5V pin is the easiest starting point. A 9V battery works too, just watch the LED current.</div>

## The pinout

The 555 has 8 pins and they are not in the order you would expect. Here is the one you need to memorise:

| Pin | Name | What it does |
|-----|------|-------------|
| 1 | GND | Ground, connect to 0V |
| 2 | TRIG | Trigger, starts the timing cycle when voltage drops below 1/3 Vcc |
| 3 | OUT | Output, this is where your LED or load connects |
| 4 | RESET | Reset, tie to Vcc to keep the chip running |
| 5 | CTRL | Control voltage, usually bypassed with a small capacitor to GND |
| 6 | THR | Threshold, ends the timing cycle when voltage rises above 2/3 Vcc |
| 7 | DIS | Discharge, drains the timing capacitor through R2 |
| 8 | Vcc | Power, connect to positive supply |

The important pins for astable mode are 1 (GND), 2 (TRIG), 3 (OUT), 4 (RESET), 6 (THR), 7 (DIS), and 8 (Vcc). Pin 5 just gets a small capacitor to ground for stability.

## The circuit

In astable mode, the 555 free-runs. It charges and discharges the capacitor through two resistors, flipping its output high and low forever. No button press needed, it just goes.

Here is the wiring:

1. **Pin 1** to GND.
2. **Pin 8** to Vcc (5V).
3. **Pin 4** to Vcc (keeps the chip enabled).
4. **Pin 5** to GND through a 0.01uF capacitor (C2).
5. **R1 (10k)** from Vcc to Pin 7 (discharge).
6. **R2 (47k)** from Pin 7 to Pin 6 (threshold).
7. **Pin 6** connected to Pin 2 (threshold and trigger are tied together).
8. **C1 (10uF)** from Pin 2 to GND (the timing capacitor).
9. **Pin 3** (output) to a 330 ohm resistor, then to the anode (long leg) of the LED. The cathode (short leg) goes to GND.

That is the whole circuit. Nine connections and you have a blinker.

<figure class="diagram">
  <div class="frame"><span class="frame-corner tl"></span><span class="frame-corner tr"></span><span class="frame-corner bl"></span><span class="frame-corner br"></span><span class="frame-label">diagram, 555 astable circuit with LED</span></div>
  <figcaption>FIG 1: the complete astable circuit. R1 and R2 set the charge/discharge times, C1 sets the base frequency.</figcaption>
</figure>

## The math: how to pick R1, R2, and C1

The blinking speed is not random. It follows two simple formulas:

**Charge time (LED on):**
t_high = 0.693 x (R1 + R2) x C1

**Discharge time (LED off):**
t_low = 0.693 x R2 x C1

With R1 = 10k, R2 = 47k, and C1 = 10uF, you get:

- t_high = 0.693 x (10,000 + 47,000) x 0.00001 = **0.395 seconds**
- t_low = 0.693 x 47,000 x 0.00001 = **0.326 seconds**

That gives you a cycle of about 0.72 seconds, or roughly 1.4 Hz. The LED blinks a bit more than once per second. Not too fast, not too slow. You can see it happening.

<div class="pull-note">// <b>try this</b>: swap C1 for a 100uF capacitor. The blink slows to roughly once every 7 seconds. The bigger the capacitor, the slower the blink. This is the single most useful thing to understand about RC timing circuits.</div>

## Changing the speed

The fun part is tuning it. Here is what each component does:

- **R1** affects charge time only. Changing it changes how long the LED stays on.
- **R2** affects both charge and discharge. Changing it changes both the on-time and off-time.
- **C1** scales everything. Double the capacitance, double the period.
- **The LED brightness** does not change with the timing components. That is set by the 330 ohm resistor on the output. A lower resistor makes the LED brighter but do not go below 220 ohms.

For a faster blink (like a turn signal), try R1 = 1k, R2 = 10k, C1 = 10uF. For a slow pulse (like a heartbeat indicator), try R1 = 100k, R2 = 470k, C1 = 100uF.

## What I got wrong

The first time I built this, the LED stayed on solid and never blinked. The problem was obvious once I checked: I had the threshold pin (6) and trigger pin (2) connected to each other, but I forgot to connect them to the capacitor. The capacitor was sitting on the board with one leg in GND and the other leg just floating. A quick jumper fixed it.

The second mistake was putting the LED in backwards. The 555 output pin (3) sources current (pushes out positive voltage), so the LED anode connects to the output side. If you wire it the other way, the LED just does nothing. No damage, no smoke, just silence. It is the electronics equivalent of a typo.

The third thing: I used a 100uF capacitor for the control pin (pin 5) bypass instead of 0.01uF. It did not break anything but the datasheet says 0.01uF is the right value. Follow the datasheet on this one.

<div class="pull-note">// <b>debugging tip</b>: if the LED is solid on or solid off, grab a multimeter and check the voltage at pin 2. It should be bouncing between roughly 1.7V and 3.3V (at 5V supply). If it is stuck at one voltage, something is not connected right.</div>

## What to try next

Once the LED blinks, a few natural next steps:

- **Add a potentiometer** in place of R2. Turn the knob and watch the blink speed change in real time. This is the simplest variable-frequency oscillator you can build.
- **Swap the LED for a small speaker** (with a 100 ohm resistor in series). The blink becomes an audible beep. You have just built a tone generator.
- **Connect pin 3 to a relay module** instead of the LED. The 555 can sink or source about 200mA, which is enough to trigger a small relay. Now you have a timed switch.
- **Build the monostable version** (one-shot timer). Press a button, something happens for a set duration, then it stops. This is behind door buzzers, automatic lights, and turn signals.

The 555 is one of those rare parts that is worth understanding deeply. Even if you never use it in a real project (you probably will), the RC timing concepts it teaches show up everywhere in electronics.
