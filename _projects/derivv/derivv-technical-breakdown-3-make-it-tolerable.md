---
layout: post
name: Derivv Technical Breakdown 3
short_description: Make it Tolerable.
title: "Derivv Technical Breakdown: Make it Tolerable using Web Workers"
featured_image: /images/projects/derivv-downscale-code.png
hero: /images/projects/derivv-downscale-code.png
description: Using Web Workers to process images in the browser.
sub: true
date: 15/01/2021
---

When processing images, the browser uses the main thread to render the UI and handle user interactions. This means that if the image processing takes too long, the UI will become unresponsive. Web Workers are a way to run JavaScript code in the background, separate from the main thread. This means that the image processing will not block the main thread, and the UI will remain responsive.

The way this works in Derivv is the canvas is created in the main thread, and then the image is drawn on the canvas. The canvas is then sent to a web worker for processing. The web worker then sends the processed image back to the main thread.

_[See downscale.worker.js](https://github.com/levivoelz/derivv/blob/master/_src/_frontend/lib/downscale.worker.js) in GH repo where the intensive part of the operation takes place._

```javascript
// downscale.js
import WebWorker from './WebWorker'
import downscaleWorker from './downscale.worker'

// scales the image by (float) scale < 1
// returns a canvas containing the scaled image.
function downscaleImage(img, scale) {
  return new Promise((resolve, reject) => {
    if (!(scale < 1) || !(scale > 0)) {
      reject('scale must be a positive number < 1')
    }

    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const context = canvas.getContext('2d')

    context.drawImage(img, 0, 0)
    const imageData = context
      .getImageData(0, 0, canvas.width, canvas.height)
      .data;

    const data = {
      imageData,
      sourceWidth: canvas.width,
      sourceHeight: canvas.height,
      scale: normalizeScale(scale)
    }

    const worker = new WebWorker(downscaleWorker)
    worker.postMessage(data)

    worker.addEventListener('message', event => {
      resolve(createResultCanvas(event.data))
    })
  })
}
```

This worker is called for each image that is processed. It takes the image data, scales it, and then sends it back to the main thread. The main thread then draws the image on the canvas and displays it to the user for further editing or downloading.

[Previous: Make it Tolerable using Web Workers](/projects/derivv-technical-breakdown-3-make-it-tolerable)<br />
[Next: What Makes the Interface So Unique?](/projects/derivv-technical-breakdown-4-unique-interface)

[Derivv Technical Breakdown Overview](/projects/derivv-technical-breakdown)