---
layout: ../../layouts/BlogPost.astro
title: How to actually read a resistor's colour bands
description: The trick that finally made the colour code stick for me — plus why you should just buy a cheap component tester.
category: Tutorial
date: 21 APR 2026
readTime: 5 MIN READ
badge: TUTORIAL
order: 6
heroLabel: photo — a handful of resistors, bands facing up
heroCaption: Four little stripes that tell you everything — once you know how to read them.
tags: [Tutorial, Electronics, Beginner]
prev: { title: "Arduino Uno starter kit: is it worth it?", url: "/blog/arduino-starter-kit-worth-it" }
next: { title: "Why my LED wouldn't light up: a checklist", url: "/blog/why-my-led-wouldnt-light-up" }
---

For weeks I just measured every resistor with a multimeter because the colour code felt like magic. Then a classmate explained it in one sentence and it finally clicked.

## The one-sentence version

On a standard 4-band resistor: **the first two bands are digits, the third is how many zeros to add, and the fourth (usually gold) is the tolerance.** That's the whole thing.

So brown-black-red is `1`, `0`, then two zeros → 1000 Ω, or 1 kΩ. Once you see it as "two digits and a multiplier", it stops being a memory test.

## Remembering the colours

The digits go black, brown, red, orange, yellow, green, blue, violet, grey, white — i.e. 0 through 9. You don't need a rude mnemonic; just remember black is 0 and white is 9, and the rainbow sits in between.

<div class="pull-note">// <b>honestly though</b> — a €10 component tester reads resistance, capacitance and more in one tap. Learn the code so you understand it, then buy the gadget so you're not squinting at gold bands at midnight.</div>

## When the bands lie

Old or heat-stressed resistors fade, and red/orange/brown look identical under warm desk light. If a value seems wrong, measure it. The colour code is a label, not a guarantee.
