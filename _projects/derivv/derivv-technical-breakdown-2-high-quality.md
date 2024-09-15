---
layout: post
name: Derivv Technical Breakdown 2
short_description: High Quality Image Processing in the Browser.
title: "Derivv Technical Breakdown 2: High Quality"
featured_image: /images/projects/derivv-downscale-code.png
hero: /images/projects/derivv-downscale-code.png
description: High Quality Image Processing in the Browser.
sub: true
date: 01/01/2021
---

It was almost too easy to resize an image in the browser. I tested a few images and there were some issues with clarity and fidelity that I wanted to address that often occurred when drastically reducing the size of the source image. After a lengthy search, I came across a stack overflow post about high quality [downscaling in the browser](https://stackoverflow.com/questions/18922880/html5-canvas-resize-downscale-image-high-quality). Like any good dev, I snagged the code and adapted it for my use. I made a few modifications to handle the alpha channel for png and refactored it to be more intelligible.

Breaking down the algorithm:

1. Start with the original image dimensions and the target dimensions.
Calculate the scale factor needed to reach the target size.

2. Scale Factor Calculation:
  The scale factor is calculated as the maximum of:
  a. The ratio of target width to current width
  b. The ratio of target height to current height
  c. The scale factor is generally 0.5 but I made it variable.

See [derivv source](https://github.com/levivoelz/derivv/tree/master/_src/_frontend/lib) for implementation details.

The downside of this solution is it is memory and compute intensive. I noticed that UI would freeze when processing images. After looking into various solutions I landed on using web workers, which I'll go over in the next article.

[Previous: Make it Fast using Web Workers](/projects/derivv-technical-breakdown-3-make-it-tolerable)<br />
[Next: Make it Tolerable using Web Workers](/projects/derivv-technical-breakdown-3-make-it-tolerable)

[Derivv Technical Breakdown Overview](/projects/derivv-technical-breakdown)