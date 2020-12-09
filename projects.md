---
layout: default
title: My Projects
description: Here are few projects I've created or worked on.
---

_I like working on really unusual and challenging projects. Some see the light of day and others don’t, but that’s not the point. If I can make something new that's useful and learn something while doing it — that’s what’s important to me._
{% for project in site.projects reversed %}
 - [{{ project.name }}]({{ project.url }}){:title='{{project.description}}'} — {{ project.short_description }}{% endfor %}
 - Actimedean 1.0 – Active truncated octaghedron speakers
 - Patronish — Ask questions and get answers via video
 - GreenZome — 3d printed model greenhouse skeleton
 - Current Route — Advanced goal setting mobile app
 - CLVR TV — Interactive video e-commerce

<div id='contribute'>
  <p><i>If you like what you've seen, take a moment to help keep the lights on. All contributions go towards expenses like hosting, domains, materials, and third-party services.</i></p>
  <script type='text/javascript' src='https://ko-fi.com/widgets/widget_2.js'></script><script type='text/javascript'>kofiwidget2.init('Support Me on Ko-fi', 'hsla(212, 30%, 70%, 1)', 'P5P121G7T');kofiwidget2.draw();</script>
</div>
