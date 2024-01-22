---
layout: post
name: Derivv Technical Breakdown 2
short_description: High Quality Image Processing in the Browser.
title: "Derivv Technical Breakdown 2: High Quality"
featured_image: /images/projects/derivv-downscale-code.png
hero: /images/projects/derivv-downscale-code.png
description: High Quality Image Processing in the Browser.
sub: true
date: 9/12/2020
---

One of the main problems I wanted to solve with Derivv was to make it simple and quick to resize a raster/bitmap image to multiple sizes. There are tools out there that address it indirectly, simply through having the ability to resize and crop, but those operations are almost always a separate step—you probably first crop the image and then resize it. If you need your resulting images to be specific dimensions, you might start with a file in Photoshop that is already set to the dimension you are looking for and then drop your image in as a layer, then "save as" to process it (or "save for web"). There are so many ways to do it and I wont go into all of them, but suffice it to say, this specific problem didn't really seem to have a direct solution.

Regardless of why I built Derivv, I knew that if people were going to use it, it had to return high quality images. Low quality images only work in under certain conditions, like on the web, however, as bandwidth gets more affordable, more end-users become less tolerant of low quality images. Image compression is another story and Derivv doesn't even offer it at this point.

As I worked on Derivv I realized the fastest way to resize an image online wasn't to send it to a server, it was to process it in the browser. Everyone processes images on the server because you have fine grained control, many options, and tons of support in terms of documentation and community. The biggest problem with processing on the server is it's slow. You have to upload the file, process it multiple times, and send every file back to the browser. What you could cut out the middleman and do it all locally? There were some client-side/browser-based image processing libraries like Pica and a few others, and they did a great job of resizing and cropping, but they didn't seem to retain image quality like I wanted.

One of the main problems with resizing images is retaining resolution and color as you scale up or down. When images are scaled way down they tend to loose a lot of resolution and the color gets faded or it ends up looking pixelated. This even happens in Photoshop, where if you downscale an image by a lot then it can lose quality. One technique to mitigate it is to downscale in steps. If the end result should be 50% of the original size, you step it down 10% at a time until it reaches the goal. Doing it this way takes longer, but you get great results.


SIDE NOTE
What other things could you do by resizing in the browser? If you had a lot of derivative images on your site you could improve performance by having the client only download one source image and then do something like:

<img src='placeholder.gif' class='derivative' data-width='300' data-height='300' />

or

<img src='placeholder.gif' class='derivative' data-name='small' />
```javascript
[
  {
    small: {
      width: 300,
      height: 300
    }
  },  
]

```

Another option is

- Upscaling
  - Interpolation
- Downscaling
  - Interpolation
  - No Interpolation
  - Downsampling

---
[<-- Back](/projects/derivv-technical-breakdown)
