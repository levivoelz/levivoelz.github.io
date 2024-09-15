---
layout: post
name: Derivv Technical Breakdown 4
short_description: Unique Interface
title: "Derivv Technical Breakdown: What Makes the Interface So Unique?"
featured_image: /images/projects/derivv-interface-code.png
hero: /images/projects/derivv-interface-code.png
description: What makes the interface so unique?
sub: true
date: 01/02/2021
---

Derivv is unique in the image resizing arena due to the fact that it is built to handle one image at a time. This is a stark contrast to other online image resizers that batch process images to one size. With Derivv, you can set a config of image sizes and then process all of them at once. If any of them don't look right, you can adjust the focal point by moving the image around in a 

<figure>

  <video width="100%" controls muted>
    <source src="/videos/derivv-image-adjust-focal-point.mp4" type="video/mp4">
  </video>
  <figcaption>
    Adjusting the focal point of an image.
  </figcaption>
</figure>

Often times the source image may not be aligned properly or the focal point of the image is off center. In these cases, the user may want to crop the image to focus on the main subject. If the site is batch processing images, the user will have to wait for the site to process all the images before they can view the full size image. Derivv allows the user to set their image sizes and then correct the image within the browser before downloading.

[Previous: Make it Tolerable using Web Workers](/projects/derivv-technical-breakdown-3-make-it-tolerable)<br />
[Next: Packaging Files for Delivery in the Browser](/projects/derivv-technical-breakdown-5-packaging-files)

[Derivv Technical Breakdown Overview](/projects/derivv-technical-breakdown)
