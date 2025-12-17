---
layout: post
name: Polar Zonohedron Frames
short_description: 3d Printed Polar Zonohedrons
title: Polar Zonohedron Frames with 3D Printed Frame Connectors
featured_image: /images/first-polor-zonohedron-frame-levi-voelz.JPG
hero: /images/first-polor-zonohedron-frame-levi-voelz.JPG
description: How I build frames for my polar zonohedron sculptures using 3d printed frame connectors and some custom tools.
date: 12/05/2023
category: Software
tags: 3d-printing CAD making software
---

<style>
  /* Flickity core styles */
  .flickity-enabled {
    position: relative;
  }

  .flickity-enabled:focus {
    outline: 0;
  }

  .flickity-viewport {
    overflow: hidden;
    position: relative;
    height: 100%;
  }

  .flickity-slider {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .flickity-enabled.is-draggable {
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select:none;
    user-select: none;
  }

  .flickity-enabled.is-draggable .flickity-viewport {
    cursor: move;
    cursor: -webkit-grab;
    cursor: grab;
  }

  .flickity-enabled.is-draggable .flickity-viewport.is-pointer-down {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }

  /* Navigation buttons - minimal modern style */
  .flickity-button {
    position: absolute;
    background: rgba(255, 255, 255, 0.85);
    border: none;
    color: #333;
    backdrop-filter: blur(10px);
    transition: background 0.3s ease, opacity 0.3s ease;
    opacity: 0.7;
  }

  .flickity-button:hover {
    background: rgba(255, 255, 255, 0.95);
    opacity: 1;
    cursor: pointer;
  }

  .flickity-button:focus {
    outline: 0;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }

  .flickity-button:active {
    background: rgba(255, 255, 255, 1);
  }

  .flickity-button:disabled {
    opacity: 0;
    cursor: auto;
    pointer-events: none;
  }

  .flickity-button-icon {
    fill: currentColor;
  }

  .carousel .flickity-prev-next-button,
  .carousel .flickity-prev-next-button.previous,
  .carousel .flickity-prev-next-button.next {
    top: 50%;
    width: 48px;
    height: 48px;
    min-width: 48px;
    min-height: 48px;
    max-width: 48px;
    max-height: 48px;
    border-radius: 50%;
    transform: translateY(-50%);
    flex-shrink: 0;
    padding: 0;
  }

  .carousel .flickity-prev-next-button svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
  }

  .carousel .flickity-prev-next-button.previous {
    left: 20px;
  }

  .carousel .flickity-prev-next-button.next {
    right: 20px;
  }


  /* Page dots - refined modern style */
  .flickity-page-dots {
    position: absolute;
    width: 100%;
    bottom: -35px;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: center;
    line-height: 1;
  }

  .flickity-page-dots .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 6px;
    background: #333;
    border-radius: 50%;
    opacity: 0.3;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .flickity-page-dots .dot:hover {
    opacity: 0.6;
    transform: scale(1.2);
  }

  .flickity-page-dots .dot.is-selected {
    opacity: 1;
    transform: scale(1.3);
    background: #000;
  }

  /* Carousel container */
  .carousel {
    margin: 3rem 0 5rem;
    background: #f8f8f8;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }

  /* Carousel cell styling */
  .carousel figure {
    margin: 0 15px;
    width: 100%;
    max-width: 800px;
  }

  .carousel a {
    display: block;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    background: #fff;
    height: 500px;
  }

  .carousel a:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .carousel img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .carousel figcaption {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.9rem;
    color: #666;
    font-style: italic;
  }

  /* Mobile optimizations */
  @media screen and (max-width: 767px) {
    .carousel {
      padding: 1rem;
      margin: 2rem -1rem 4rem;
      border-radius: 0;
    }

    .carousel figure {
      margin: 0 10px;
    }

    .carousel a {
      height: 350px;
    }

    .flickity-prev-next-button {
      width: 40px;
      height: 40px;
    }

    .flickity-prev-next-button.previous {
      left: 10px;
    }

    .flickity-prev-next-button.next {
      right: 10px;
    }
  }

  /* Tablet and up */
  @media screen and (min-width: 768px) {
    .carousel a {
      height: 500px;
    }
  }

  /* Large screens */
  @media screen and (min-width: 1200px) {
    .carousel {
      padding: 3rem;
    }

    .carousel a {
      height: 600px;
    }
  }
</style>

A few years ago I was thinking about how to build a polar zonohedron similar to [Rob Bell's (Zomadic) Zomes](http://zomadic.blogspot.com/){:target="_blank"}. I had been to Rob's workshop many times—my brother-in-law had a woodworking shop next door to his and found the shapes and his process for making them fascinating.

He generated the 3d models using a SketchUp plugin he created and then fine-tuned them according to the application. Sometimes he would combine multiple PZ's to create more complex environments or he would extend a side or two to suit his whims. Once the general shape or solid was conceived he would use his proprietary connection system to build panels and connectors cut from plywood using a CNC machine.

Sometimes he'd paint them and sometimes he'd leave them bare. They were beautiful and transformative architectural structures that evoked a spiritual experience in me and I wanted to understand more about them.

<figure>
  <a href='http://zomadic.blogspot.com/2013/09/the-zonohedral-cathedral.html' target="_blank">
    <img src='http://3.bp.blogspot.com/-VlO0rGp1aE0/UilSSjJJw2I/AAAAAAAABF0/IeJh9Ns03Hw/s1600/Zonotopians_2013.jpg' />
  </a>
  <figcaption><cite>Zonotopia and the Quasicrystalline Conjunction</cite>, by Rob Bell</figcaption>
</figure>

I dreamt about making one for a while and thought it would be practical for me to do the shape out of tubes or rods and plumbing-like fittings. I did some research on how to make custom connectors but didn't find anything out there. Most connectors with unusual geometry are made for geodesic domes or cubic frames. I thought, maybe I could 3d print custom connectors. It seemed reasonable. I didn't have a 3d printer and wasn't very familiar with how 3d printing works. However, I did have a little bit of CAD experience from doing some projects around the house, so I figured it couldn't be that hard.

I started designing PZ models from scratch using a [YouTube tutorial](https://www.youtube.com/watch?v=wLwqUjXph2s){:target="_blank"} I found for doing it in SketchUp. I'd draw up the shape and once I had one I liked, I'd start the process of tracing the connectors over each of the vertices using a tube plugin. This was a painstaking and lengthy process, but it worked. Once I had designed all the connectors and exported them as printable STL files, I uploaded them to Shapeways and ordered some prints. A few days later I had a proof of concept.

<figure>
  <img src='/images/first-polor-zonohedron-frame-levi-voelz.JPG' />
  <figcaption><cite>First 3d Printed Polar Zonohedron Connectors with Painted Wooden Rods</cite></figcaption>
</figure>

I was pretty blown away with how it all came together. The only things I had to "craft" were the tiny dowels I used for the rods. I cut them all to the same length, except for the base layer rods, which were a little longer than the other rods.

Driven by my curiosity, I played around with other shapes but found the process of actually designing the connectors in CAD too cumbersome and painful. Sometimes if I made a mistake I'd have to start from the beginning and design everything all over. Or, if I wanted to change the diameter of the rods, I'd have to go through a crazy complex process of scaling up or down and adjusting the thickness of the connectors.

I did some research and came across Trammel Hudson's project, [Wireframe](https://trmm.net/Wireframe/){:target="_blank"}. The frame he generated was slightly different from what I was going after, but the general concept was similar—drop in a shape and have a script generate the frame for you, including the 3d printable connectors. He identified some constraints and maybe he thought it was impractical to pursue on a greater scale, but being as naive as I am I decided to see if I could improve upon what he had done, build a GUI for it, and make frames all day long.

<figure>
  <img src='/images/projects/modwerk-prototype-preview.png' />
  <figcaption><cite>Modwerk Clickable Prototype</cite>, Designed in Adobe XD</figcaption>
</figure>

I needed a little help getting over the geometry/trig hump and reached out to [George Profenza](https://sensori.al/), who previously helped me track down Rob Bell's missing [Polar Zonohedron SketchUp script](/polar_zonohedron.rb) for quickly creating PZ's. He got me up to speed with Three.js and wrote the first iteration of a frame generator called Modwerk. I'm eternally grateful to him for that.

I've built numerous frames using it and even did a live demo at a local maker space, [Chimera Arts](https://www.instagram.com/chimeraartspace/){:target="_blank"}, where people loved making things with connectors and stretching their creative muscles.

<div class="carousel" data-flickity='{ "imagesLoaded": true, "percentPosition": false }'>
  <figure>
    <a href="/images/projects/modwerk/modwerk-polar-zonohedron-md-kids.jpg" data-fancybox="gallery" data-caption="modwerk polar zonohedron md kids">
      <img src="/images/projects/modwerk/modwerk-polar-zonohedron-md-kids.jpg" alt="modwerk polar zonohedron md kids" />
    </a>
    <figcaption><cite>Polar Zonohedron</cite></figcaption>
  </figure>

  <figure>
  <a href="/images/projects/modwerk/modwerk-polar-zonohedron-frame-construction-3d-print.jpg" data-fancybox="gallery" data-caption="modwerk polar zonohedron frame construction 3d print">
    <img src="/images/projects/modwerk/modwerk-polar-zonohedron-frame-construction-3d-print.jpg" alt="modwerk polar zonohedron frame construction 3d print" />
  </a>
  <figcaption><cite>Polar zonohedron frame construction</cite></figcaption>
  </figure>

  <figure>
  <a href="/images/projects/modwerk/3d-printed-polar-zonohedron-connectors.jpg" data-fancybox="gallery" data-caption="3d printed polar zonohedron connectors">
    <img src="/images/projects/modwerk/3d-printed-polar-zonohedron-connectors.jpg" alt="3d printed polar zonohedron connectors" />
  </a>
  <figcaption><cite>3d printed polar zonohedron connectors</cite></figcaption>
  </figure>

  <figure>
  <a href="/images/projects/modwerk/inside-polar-zonohedron-3d-printed-connectors.jpg" data-fancybox="gallery" data-caption="inside polar zonohedron 3d printed connectors">
    <img src="/images/projects/modwerk/inside-polar-zonohedron-3d-printed-connectors.jpg" alt="inside polar zonohedron 3d printed connectors" />
  </a>
  <figcaption><cite>inside polar zonohedron 3d printed connectors</cite></figcaption>
  </figure>

  <figure>
  <a href="/images/projects/modwerk/stacked-dodecahedron-3d-printed-trellis.jpg" data-fancybox="gallery" data-caption="stacked dodecahedron 3d printed trellis">
    <img src="/images/projects/modwerk/stacked-dodecahedron-3d-printed-trellis.jpg" alt="stacked dodecahedron 3d printed trellis" />
  </a>
  <figcaption><cite>3d printed stacked dodecahedron</cite></figcaption>
  </figure>

  <figure>
  <a href="/images/projects/modwerk/3d-printed-dodecahedron-tomato-cage.jpg" data-fancybox="gallery" data-caption="3d printed dodecahedron tomato cage">
    <img src="/images/projects/modwerk/3d-printed-dodecahedron-tomato-cage.jpg" alt="3d printed dodecahedron tomato cage" />
  </a>
  <figcaption><cite>dodecahedron tomato cage</cite></figcaption>
  </figure>

  <figure>
  <a href="/images/projects/modwerk/dodecahedron-modwerk-frame.jpg" data-fancybox="gallery" data-caption="dodecahedron modwerk frame">
    <img src="/images/projects/modwerk/dodecahedron-modwerk-frame.jpg" alt="dodecahedron modwerk frame" />
  </a>
  <figcaption><cite>dodecahedron modwerk frame</cite></figcaption>
  </figure>

  <figure>
  <a href="/images/projects/modwerk/giant-modwerk-cube-connector.jpg" data-fancybox="gallery" data-caption="giant modwerk cube connector">
    <img src="/images/projects/modwerk/giant-modwerk-cube-connector.jpg" alt="giant modwerk cube connector" />
  </a>
  <figcaption><cite>giant modwerk cube connector</cite></figcaption>
  </figure>

  <figure>
  <a href="/images/projects/modwerk/gigi-modwerk-cube.jpg" data-fancybox="gallery" data-caption="gigi modwerk cube">
    <img src="/images/projects/modwerk/gigi-modwerk-cube.jpg" alt="gigi modwerk cube" />
  </a>
  <figcaption><cite>gigi modwerk cube</cite></figcaption>
  </figure>
</div>

<hr />

# More on Modwerk

## How it works
[Modwerk](https://www.modwerk.com){:target="_blank"} is a web app I built that makes the process of converting a solid 3d shape into a frame that consists of rods and connectors. You can think of the rods as wooden dowels, PVC pipes, or metal tubing, and the connectors are kind of like plumbing fittings. The exception is the connectors aren't limited to a small set of pre-defined shapes, like an elbow, a wye, a coupler, etc, and you aren't limited to 2, 3, or 4 openings. Theoretically, there are infinite connector configurations that could be generated depending on the complexity of your shape.

There are two ways to start—you can either use a predefined shape from the shape palette, or you can upload a shape you've already made in another CAD program like SketchUp, Fusion360, Blender, etc. Once you have the shape, you convert it to a frame with the click of a button and export the parts. You can print them at home if you have a printer, or you can order prints from Shapeways or another 3d printing service.

## Assembly
For simple shapes, assembly is pretty straightforward. All the shapes in the shape palette have equivalent length edges, making it a breeze to cut and assemble. I typically use wooden rods but have recently been experimenting with aluminum tubing and PVC. Wood is relatively inexpensive but the diameter can vary widely which can be problematic if you want to pressure-fit the pieces. If you are looking for more strength and a pressure fit, metal and plastic rods are a good option, yet more expensive. It's worth experimenting with materials and print types to get the right attributes you might be looking for.

## Technical Breakdown
I plan on doing a more in-depth technical breakdown of Modwerk in the future, but from a high level, it's a client-only web app. The first version was written in Svelte, but I ran into some limitations with that and found it slow to iterate. V2, which hasn't been released yet, is a complete rewrite in React that uses React Three Fiber on the FE and will have a Ruby on Rails REST API for handling saving projects and payments.

<div style="text-align: center; padding: 10px;">
<a class="button" href="https://www.modwerk.com" target="_blank">Try It</a>
</div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css" />
<script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js"></script>
<script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
<script>
  Fancybox.bind('[data-fancybox="gallery"]', {
    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"]
      }
    },
    Images: {
      zoom: true
    },
    Thumbs: {
      autoStart: true
    }
  });
</script>