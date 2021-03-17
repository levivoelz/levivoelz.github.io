---
layout: default
title: My Projects
description: Here are few projects I've created or worked on.
---

_I like working on really unusual and challenging projects. Some see the light of day and others don’t, but that’s not the point. If I can make something new that's useful and learn something while doing it — that’s what’s important to me._
{% assign projects = site.projects %}
{% for project in projects reversed %}{% unless project.sub %}
 - [{{ project.name }}]({{ project.url }}){:title='{{project.description}}'} — {{ project.short_description }}{% endunless %}{% endfor %}
 - Actimedean 1.0 – Active truncated octaghedron speakers
 - Patronish — Ask questions and get answers via video
 - GreenZome — 3d printed model greenhouse skeleton
 - Current Route — Advanced goal setting mobile app
 - CLVR TV — Interactive video e-commerce
