---
layout: ../../layouts/BlogPost.astro
title: "Line follower build log #1: the chassis"
description: Cutting acrylic for the first time, mounting two TT motors dead straight, and the caster wheel that ruined my evening.
category: Project Log
date: 14 MAY 2026
readTime: 7 MIN READ
badge: BUILD LOG
order: 8
heroLabel: photo, bare chassis with motors mounted
heroCaption: Day one of the line follower, just a plate, two motors, and a lot of optimism.
tags: [Project Log, Robotics, Chassis]
next: { title: "Getting your first servo moving with Arduino", url: "/blog/getting-your-first-servo-moving-with-arduino" }
---

Every robot has to stand up before it can think, so the chassis came first. The plan was simple: a flat plate, two driven wheels at the back, and a caster at the front. Simple, it turned out, is not the same as easy.

## Cutting the plate

I drew the base in CAD and had it laser-cut from 3 mm acrylic at the campus makerspace. Lesson one: acrylic cracks if your mounting holes are too close to the edge. My first plate split while I was tightening a screw, so version two moved every hole 5 mm inward.

## Mounting the motors straight

This mattered far more than I expected. The two yellow TT gear motors have to be *parallel*, or the robot pulls to one side even when both wheels spin at the same speed. I ended up cutting a little alignment jig so both motor brackets sit at exactly the same angle.

<div class="pull-note">// <b>note to self</b>: a couple of degrees of motor misalignment is the difference between "follows the line" and "drives gently into a wall".</div>

## The caster wheel

The front caster looked like the boring part and became the whole evening. The cheap one I had dragged instead of rolling, so the robot juddered. Swapping it for a smooth ball caster fixed it instantly. Next log: wiring up the sensor bar and reading the line.
