---
layout: ../../layouts/BlogPost.astro
title: Breadboard mistakes that cost me an afternoon
description: Power rails split down the middle, jumpers in the wrong row, and other things nobody warned me about.
category: Notes
date: 12 MAR 2026
readTime: 5 MIN READ
badge: NOTES
order: 3
heroLabel: photo — a busy breadboard mid-project
heroCaption: Half of debugging at this stage is just looking very hard at the breadboard.
tags: [Notes, Electronics, Beginner]
prev: { title: "Cheap multimeter vs the lab bench one", url: "/blog/cheap-multimeter-vs-lab" }
next: { title: "My first time soldering (and what went wrong)", url: "/blog/my-first-time-soldering" }
---

The breadboard is the most forgiving tool in electronics and somehow still where most of my early bugs lived. Here are the ones that kept biting.

## The split power rail

This is the big one. On many full-size breadboards, the long red and blue rails are **broken in the middle**. Power one half and the other half is dead. I lost an afternoon to a circuit that was wired perfectly — to an unpowered rail. Now I always bridge the gap with two jumpers first thing.

## Counting rows wrong

The five holes in a column are connected; the gap down the centre is *not*. Twice I've put both legs of a component in the same column and shorted it. Each connection needs its own column.

## Tired contacts

Cheap breadboards wear out. After enough insertions a hole stops gripping and the wire makes intermittent contact — your circuit works when you press on it and fails when you let go. If something is flaky, try a fresh row before rewiring everything.

<div class="pull-note">// <b>habit that helped</b> — build the power and ground rails first, test them with a multimeter, and only then add components. Boring, but it's saved me hours.</div>
