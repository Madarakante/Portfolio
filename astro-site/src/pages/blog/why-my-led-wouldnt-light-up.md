---
layout: ../../layouts/BlogPost.astro
title: "Why my LED wouldn't light up: a beginner's checklist"
description: The five embarrassing things I check first now — polarity, the missing resistor, and a breadboard rail that wasn't actually powered.
category: Notes
date: 02 MAY 2026
readTime: 4 MIN READ
badge: NOTES
order: 7
heroLabel: photo — a single LED on a breadboard
heroCaption: The humble blink — the "hello world" of electronics, and my first real bug hunt.
tags: [Notes, Electronics, Beginner]
prev: { title: "Reading a resistor's colour bands", url: "/blog/reading-resistor-colour-bands" }
next: { title: "Line follower build log #1: the chassis", url: "/blog/line-follower-build-log-1" }
---

My very first circuit didn't work, and I spent twenty minutes convinced the Arduino was broken. It wasn't. Here's the checklist I now run through before blaming the hardware — in order, because the boring stuff is usually the culprit.

## 1. Is the LED the right way round?

LEDs only conduct one way. The **long leg is positive (anode)**, the short leg negative. Backwards, and it simply won't light. This was my actual bug the first time.

## 2. Is there a resistor?

An LED with no current-limiting resistor either stays dark (if you got lucky) or dies in a puff. A 220–330 Ω resistor in series is the standard.

## 3. Is the breadboard rail actually powered?

Many breadboards split the long power rails in the *middle*. I'd wired power to one half and my LED to the other, so it was never connected. Run a jumper across the gap, or just check with a multimeter.

## 4. Are both legs in different rows?

If both LED legs share the same breadboard row, you've shorted it out. Each leg needs its own column.

## 5. Then, and only then, suspect the code

Once the wiring is sound, check the pin number in your sketch matches the pin you actually used. Nine times out of ten the fix was in steps 1–4.
