---
layout: ../../layouts/BlogPost.astro
title: Getting your first servo moving with Arduino
description: If you've never made anything move before, this is a lovely place to start. Three wires, a few lines of code, and a part that moves when you tell it to.
category: Tutorial
date: 28 MAY 2026
readTime: 6 MIN READ
badge: BEGINNER
order: 9
heroLabel: photo — servo wired to an Arduino on a breadboard
heroCaption: The whole setup — one servo, one Arduino, three jumper wires. That's all you need for your first moving thing.
tags: [Tutorial, Arduino, Servo, Beginner]
prev: { title: "Why my LED wouldn't light up: a checklist", url: "/blog/why-my-led-wouldnt-light-up" }
next: { title: "Make the servo follow a potentiometer knob", url: "/blog/getting-your-first-servo-moving-with-arduino" }
---

A servo is the friendliest motor to start with. You tell it an angle — say 90 degrees — and it goes there and holds. No motor driver, no fiddly wiring. If you've got an Arduino and a hobby servo (the little blue SG90 is the classic), you can have something moving in about ten minutes.

Here's the mental model: **the servo is always listening for an angle, and your job is just to keep telling it which one you want.** Everything below is in service of that one idea.

> Wire it up, upload the sketch, watch it sweep. Then start changing numbers.

## What you'll need

Nothing exotic — most of this is in any starter kit:

- An Arduino Uno (or any compatible board).
- A hobby servo — an SG90 9g servo is perfect and cheap.
- Three jumper wires, and a USB cable to the board.

## Wiring it up

Servos have three wires. The colours vary, but the order is standard: **brown or black is ground, red is power, and orange or yellow is the signal.** Connect ground to a GND pin on the Arduino, power to 5V, and the signal wire to pin 9. That's the whole circuit.

<div class="pull-note">// <b>beginner tip</b> — one small servo can run off the Arduino's 5V pin, but two or more will brown out the board and cause random resets. Once you add a second servo, give them their own battery and just share the ground wire.</div>

## The code

Arduino comes with a built-in `Servo` library, so this is genuinely short. Open the Arduino IDE, paste this in, pick your board and port, and hit upload.

```cpp
// Sweep a servo back and forth, 0 to 180 and back
#include <Servo.h>

Servo myServo;            // create a servo object

void setup() {
  myServo.attach(9);      // signal wire is on pin 9
}

void loop() {
  for (int a = 0; a <= 180; a++) {
    myServo.write(a);     // go to angle 'a'
    delay(15);            // give it time to get there
  }
  for (int a = 180; a >= 0; a--) {
    myServo.write(a);
    delay(15);
  }
}
```

That's it. `write(a)` tells the servo the angle you want; the `delay(15)` simply gives it a moment to physically move before you ask for the next angle. Change that 15 to a bigger number and the sweep slows down — your first taste of tuning a motion by changing one value.

<figure class="diagram">
  <div class="frame"><span class="frame-corner tl"></span><span class="frame-corner tr"></span><span class="frame-corner bl"></span><span class="frame-corner br"></span><span class="frame-label">diagram — servo wiring: GND, 5V, signal to pin 9</span></div>
  <figcaption>FIG 1 — the three connections between the servo and the Arduino.</figcaption>
</figure>

## If it doesn't move

Don't panic — it's almost always one of these:

- Signal wire in the wrong pin. The code says pin 9, so the orange wire goes to 9.
- Power and ground swapped — double-check red to 5V, brown/black to GND.
- The board didn't actually upload. Check you picked the right board and port in the IDE.
- A buzzing servo that won't settle usually means it's underpowered — give it its own battery.

Get those right and you'll have a part moving on command. It's a small thing, but it's the exact loop every robot runs on, just scaled up.

Once your servo sweeps, try making it move to an angle *you* choose — wire up a potentiometer and have the servo follow the knob. The next post does exactly that, and it's where this starts to feel like control.
