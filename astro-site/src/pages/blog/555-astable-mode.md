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
heroCaption: The 555 in astable mode. R1, R2, and C2 set the frequency and duty cycle.
tags: [Tutorial, Electronics, 555 Timer, Beginner]
prev: { title: "The 555 timer in monostable mode: one shot, one pulse", url: "/blog/555-timer-blink-without-code" }
---

In monostable mode the 555 fires once per trigger. In astable mode it fires forever. No button, no外部 input, just power it up and it oscillates. The output swings high and low at a rate set by two resistors and one capacitor. This is the circuit behind turn signal flashers, LED blinkers, tone generators, and clock signals.

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

```
         VCC
          |
         [R1]  (charge resistor)
          |
          +----[R2]----+---- Pin 7 (DISCH)
          |            |
 Pin 6 ---+            |
 Pin 2 ---+            |
          |           [C]  (timing capacitor)
          |            |
         GND          GND

 Pin 3 (OUT) ---[220R]--- LED --- GND
```

The key difference from monostable: **no trigger button**. Pin 2 (trigger) and pin 6 (threshold) are connected together and tied to the capacitor. The capacitor charges through R1 + R2, then discharges through R2 alone. When it charges to 2/3 VCC, the output goes low and the discharge pin opens. When it discharges to 1/3 VCC, the output goes high and the discharge pin closes. This cycle repeats forever.

## How it works

The 555 astable has two phases:

**Phase 1: Charging (output HIGH)**
The capacitor charges through both R1 and R2. The voltage rises from 1/3 VCC toward 2/3 VCC. The output is HIGH during this phase. The time this takes is:

```
t_high = 0.693 x (R1 + R2) x C
```

**Phase 2: Discharging (output LOW)**
When the capacitor reaches 2/3 VCC, the internal comparator flips. The discharge pin (pin 7) opens, and the capacitor discharges through R2 alone. The voltage drops from 2/3 VCC toward 1/3 VCC. The output is LOW during this phase:

```
t_low = 0.693 x R2 x C
```

When the capacitor hits 1/3 VCC, the cycle restarts.

## The math

**Total period:**
```
T = t_high + t_low = 0.693 x (R1 + 2 x R2) x C
```

**Frequency:**
```
f = 1 / T = 1.44 / ((R1 + 2 x R2) x C)
```

**Duty cycle:**
```
D = (R1 + R2) / (R1 + 2 x R2) x 100%
```

Notice that R2 appears in both the charge and discharge paths, but R1 only appears in the charge path. This means the duty cycle is always greater than 50% (the output is HIGH longer than it is LOW). If you need exactly 50%, you need diodes across R2 to separate the charge and discharge paths.

## Example: turn signal flasher

I used this circuit for my [relayless turn signal flasher project](/projects/flasher). The values I had on hand:

- R1 = 15k ohm
- R2 = 30k ohm
- C = 10uF

**Calculations:**

```
t_high = 0.693 x (15000 + 30000) x 0.000010 = 0.312 seconds
t_low  = 0.693 x 30000 x 0.000010           = 0.208 seconds
T      = 0.312 + 0.208                       = 0.520 seconds
f      = 1 / 0.520                           = 1.92 Hz
D      = (15000 + 30000) / (15000 + 60000)   = 60%
```

1.92 Hz means the lamps flash about 115 times per minute. The 60% duty cycle means the lamps are ON for 60% of the time and OFF for 40%. This matches typical turn signal behavior.

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
