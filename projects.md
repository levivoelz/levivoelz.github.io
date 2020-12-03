---
layout: default
title: Projects
---

_I like working on really unusual and challenging projects. Some see the light of day and others don’t, but that’s not the point. If I can make something new and learn something while doing it — that’s what’s important to me._
{% for project in site.projects reversed %}
 - [{{ project.name }}]({{ project.url }}) — {{ project.short_description }}{% endfor %}
 - BenchBuddy — A bench for the masses
 - Bargod — Drink recipes in your POS terminal
 - Actimedean 1.0 – Active truncated octaghedron speakers
 - Patronish — Ask questions and get answers via video
 - GreenZome — 3d printed model greenhouse skeleton
 - Current Route — Advanced goal setting mobile app
 - CLVR TV — Interactive video e-commerce
