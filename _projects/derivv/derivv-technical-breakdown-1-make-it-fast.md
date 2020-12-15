---
layout: post
name: Derivv Technical Breakdown 2
short_description: Fast Image Processing in the Browser.
title: "Derivv Technical Breakdown: Resizing Images the Fast Way"
featured_image: /images/projects/derivv-downscale-code.png
hero: /images/projects/derivv-downscale-code.png
description: Resizing Images Online the Fast Way Without Sending Images to the Server.
sub: true
date: 15/12/2020
---

I had already built an image processor while working at an online retailer and knew how to resize and crop images to a set of derivatives at specific dimensions. It was fairly simple given the various command-line tools available like ImageMagick. The fun part of that project wasn't necessarily creating an image processor, but creating an intuitive and simple interface for the it that addressed the user's needs. I spoke with stakeholders on a regular basis and came up with a few options that worked well for them—a web interface and and native OS X interface.

One of the project requirements was to be able to process batches of 10's or even 1000's of images at a time. Initially, a web interface did well, at least for smaller batches. Anyone could drop images onto the webpage and get their images back, cropped and resized. As time went on, we discovered the web interface was pretty slow, especially with large sets of images. So, I built an OS X application that had a UI kind of like Dropbox. You could drop any number of image files onto a folder and they would process in the background on your computer. When it was done, you'd get a Finder notification and you could grab the files to carry on with your project. The OS X application was relatively fast, given that I could process the files locally.

I had a few ideas about how I could improve it but most of them were for use-cases that didn't apply to BigCo. For example, I wanted to add the ability to change the derivative image configuration, which previously wasn't available–it was hardcoded. I also wanted to add the ability to fine-tune the crop. Sometimes the focal point of an image is offset to one side or another and needs tweaking because the resizing algorithm will modify the image based on the center being the focal point by default. In BigCo's app, the user could select a coordinate like "top", "right", or "topright" to move the focal point of the crop to match the focal point of the image, but I wanted to have more fine grained control where you could place the crop exactly where you want it.

>It's worth noting that Derivv intentionally doesn't allow for freeform cropping. When resizing images to a specific size, freeform cropping isn't necessary.

Even with all the improvements I made, it still felt _slow_. I figured it was mainly due to transferring images to and from the server. I ran a few tests and found out that, yes, that was the biggest contributor, but not only that, the libraries I was using were also slow. In Ruby, there are two primary libraries for image processing and both of them are wrappers for ImageMagick–RMagick and MiniMagick. RMagick is C-bindings for ImageMagick. MiniMagick spawns an ImageMagick process. Both are great tools, but neither is particularly fast. I looked into other options, including using other languages, and found out I didn't need to process images on the server at all. There was sufficient evidence that people were successfully processing images in the right in the browser. It was worth investigating and I found it relatively simple to do it.

This is an image that is resized by simply scaling it down with the `<canvas>` tag and some JavaScript<a href='#1'><sup>1</sup></a>.

```html
<img id='base' src='/images/projects/plane-2560_x_1600.jpg' />
<canvas id='derivative'></canvas>
```
---
```javascript
const base = document.getElementById('base');
const derivative = new Image();
let canvas = document.getElementById('derivative');
let context = canvas.getContext('2d');

derivative.onload = function() {
  canvas.width = base.width;
  canvas.height = base.height;
  context.drawImage(this, 0, 0, base.width, base.height);
}

derivative.src = base.src;
```

<figure>
  <img id='base' src='/images/projects/plane-2560_x_1600.jpg' />
  <figcaption>Original — 2560w x 1600h</figcaption>
</figure>
<figure>
  <canvas id='derivative'></canvas>
  <figcaption>Resized — <span id='derivative-width'></span>w x <span id='derivative-height'></span>h</figcaption>
</figure>
<script>
  document.addEventListener("DOMContentLoaded", () => {
    const codeblocks = document.getElementsByClassName('language-javascript');
    for (block of codeblocks) {
      eval(block.innerText);
    }

    setTimeout(() => {
      const canvas = document.getElementById('derivative');
      const dWidth = document.getElementById('derivative-width');
      const dHeight = document.getElementById('derivative-height');

      dWidth.innerText = canvas.width;
      dHeight.innerText = canvas.height;
    }, 500);

    document
      .getElementById('derivative--resize')
      .addEventListener('click', () => {
        canvas = document.getElementById('derivative--resized');
        context = canvas.getContext('2d');
        context.clearRect(0,0, base.width, base.height);
        canvas.width = base.width;
        canvas.height = base.height;
        canvas; // eh?
        context.drawImage(base, 0, 0, base.width, base.height);
    });
  });
</script>

Did you see how fast that is? Probably not, because the image was resized when the page loaded. Resize another one.

<div style='text-align: center'><button id='derivative--resize'>Resize</button></div>
<canvas id='derivative--resized'></canvas>

Did you see that? Press it a few times. Can you see the image clear and then load? I'm guessing the answer is "no", unless you are on a really old computer.

The point is, resizing in the browser is fast. It's clearly faster than resizing on the server because we don't have to send it there and back again. We completely skip the transfer step. The other plus is that processing images on the server is expensive because of data transfer costs, memory usage costs, and compute cycle costs, so we also save money.

You may have noticed a problem with this method, however—the image quality isn't great. Due to the way the browser downsizes images by default, we lose some clarity and detail.

_In the next article I'll go through why that is and how to improve the image quality when downscaling in the browser._

---
<small id='1'><sup>1</sup>See Mozilla developer documentation for more <a href='https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage' target='_blank'>Canvas 2D API</a> details.</small>

[Derivv Technical Breakdown Overview](/projects/derivv-technical-breakdown)
