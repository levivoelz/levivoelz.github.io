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
  .flickity-enabled{position:relative}.flickity-enabled:focus{outline:0}.flickity-viewport{overflow:hidden;position:relative;height:100%}.flickity-slider{position:absolute;width:100%;height:100%}.flickity-enabled.is-draggable{-webkit-tap-highlight-color:transparent;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.flickity-enabled.is-draggable .flickity-viewport{cursor:move;cursor:-webkit-grab;cursor:grab}.flickity-enabled.is-draggable .flickity-viewport.is-pointer-down{cursor:-webkit-grabbing;cursor:grabbing}.flickity-button{position:absolute;background:hsla(0,0%,100%,.75);border:none;color:#333}.flickity-button:hover{background:#fff;cursor:pointer}.flickity-button:focus{outline:0;box-shadow:0 0 0 5px #19f}.flickity-button:active{opacity:.6}.flickity-button:disabled{opacity:.3;cursor:auto;pointer-events:none}.flickity-button-icon{fill:currentColor}.flickity-prev-next-button{top:50%;width:44px;height:44px;border-radius:50%;transform:translateY(-50%)}.flickity-prev-next-button.previous{left:10px}.flickity-prev-next-button.next{right:10px}.flickity-rtl .flickity-prev-next-button.previous{left:auto;right:10px}.flickity-rtl .flickity-prev-next-button.next{right:auto;left:10px}.flickity-prev-next-button .flickity-button-icon{position:absolute;left:20%;top:20%;width:60%;height:60%}.flickity-page-dots{position:absolute;width:100%;bottom:-25px;padding:0;margin:0;list-style:none;text-align:center;line-height:1}.flickity-rtl .flickity-page-dots{direction:rtl}.flickity-page-dots .dot{display:inline-block;width:10px;height:10px;margin:0 8px;background:#333;border-radius:50%;opacity:.25;cursor:pointer}.flickity-page-dots .dot.is-selected{opacity:1}
  * { box-sizing: border-box; }

.carousel {
    margin-bottom: 4rem;
  }

.carousel img {
    display: block;
    height: 200px;
    width: auto;
}

@media screen and ( min-width: 768px ) {
  .carousel img {
    height: 400px;
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

<script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>