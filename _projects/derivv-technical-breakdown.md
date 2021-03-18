---
layout: post
name: Derivv Technical Breakdown (Series)
short_description: Using React, web workers, and canvas for fast and high-quality image resizing in the browser.
title: "Derivv Technical Breakdown: What Makes it so Fast?"
featured_image: /images/projects/derivv-downscale-code.png
hero: /images/projects/derivv-downscale-code.png
description: A lot of people use Derivv, the best way to resize a single image to multiple sizes, and they use it because it's not only simple, but it's fast.
date: 04/12/2020
category: Software
tags: react web-workers canvas image-processing
---

A lot of image processing tools, like Photoshop, are slow. The fastest ones are command line utilities like ImageMagick, but they require some technical knowhow to operate. While working at one of the largest online retailers, I helped build a really useful tool for creatives to resize and crop product images according to a config file. All they had to do was upload the images via a web interface or drag and drop them into a folder on their machine, the images would process in the background, and they'd get a notification when it was all done. Depending on how many images needed to be processed, it could take a while. I was using a Sinatra Web Server with ImageMagick to handle image uploads and processing tasks, which was great. Two problems always bothered me though. It felt slow and you couldn't change the configuration. If you wanted to change the image sizes and crops you'd have to hit me up to write a new config for you.

After leaving that job, I joined another company and forgot about the image processor for a while. It wasn't until a few years later that I had time to work on my dream image processing app, [Derivv](https://derivv.com){:target="_blank"}. I wrote down the problems I wanted to solve and had some ideas of how to address them, but I didn't know how amazing it could be until I started working on it. One of the most impactful things I realized was that I could do 100% of the processing in the browser. I didn't need to send the image to the server because I could do everything client-side. This realization was really important and I probably wouldn't have launched Derivv if it wasn't for that because not only did it make processing images so much faster, but it made it more accessible. You could process images offline. Very cool.

There are several key technical aspects to Derivv that make it different from anything out there that I want to share. Over a series of articles I will outline in detail how Derivv works under the hood and what makes it so fast. The most important and exiting things are how downsizing impacts image quality and why it's an important step, cropping methods and the cropping interface, processing images concurrently and in the background, and packaging files before downloading.

---
### Article Series
_I'll be writing articles over the next few weeks that go into detail about each of these topics. Check back in a week or sign up to get a notification when the next one comes out._
- [Resizing Images Online the Fast Way](/projects/derivv-technical-breakdown-1-make-it-fast)
- High Quality Image Processing in the Browser
- What Makes the Interface so Unique?
- Packaging Files for Delivery in the Browser
- Offline Processing via a Progressive Web App (PWA)
