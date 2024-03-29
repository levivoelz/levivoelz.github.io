---
layout: post
name: Derivv
short_description: Quickly resize one image to multiple sizes.
title: Resize an Image to Multiple Sizes with Derivv
featured_image: /images/projects/derivv-image-resizing-app-preview_1200_x_832.png
description: Derivv makes it easy to resize an image to the exact dimensions you are looking for. It resizes and crops it all in one fell swoop.
category: Software
tags: side-project react web-workers product-launch
date: 9/5/2016
redirect_from:
  - /journal/2016/09/05/derivv-image-resizer.html
  - /2016/09/05/derivv-image-resizer.html
  - /software/2016/09/05/derivv-image-resizer.html
---

I'm excited to announce a new piece of software I wrote for people who need to [resize a single image to multiple sizes](https://derivv.com){:target="_blank"}. It's called [Derivv](https://derivv.com){:target="_blank"} and it's a niche tool that does it very easily and quickly. It's browser-based, so no need to upload images to a server to be resized and sent back. And, it's fast! Anyway, I'm going to go over in more detail who I built it for, what applications it is good for, and some exciting new features coming up in the coming months.

>It’s really, really fast!

[![Derivv image resizing app preview](/images/projects/derivv-image-resizing-app-preview_1200_x_832.png "Derivv image resizing app preview")](https://derivv.com){:target="_blank"}

## Who it's for

Anyone who's had to resize images over and over in Photoshop knows what a pain in the ass it can be. You open an image you want to resize, reduce the size, then crop it to the exact dimensions. If you are an advanced user, you either create some Photoshop actions to handle the repetitive task, or you have a script that batch processes your files. It's quite a bit faster that way but still takes a while if you have a lot of images to do.

Derivv makes it easy to resize an image to the exact dimensions you are looking for. It resizes and crops it all in one fell swoop. You don't have to downsize the image to the approximate dimensions and then crop it. You just choose the size you want and Derivv does the rest.

I specifically built Derivv with Web producers, bloggers, graphic designers, and photographers in mind. If you are in one of those (or similar) professions, and you resize a lot of images, then it's perfect for you. Resizing images to the same size over and over and over again, is easy with Derivv. Of course, it is dialed in for a very specific use. It's not for people who need to resize an image every once and a while. It's not for people who just want to downsize an image by some percentage (at least not yet). It is for people doing the same thing over and over, who are sick of using Photoshop for resizing images and don't want to pay for another all-in-one imaging tool that does everything under the sun.

I know what web producers go through, and that's a topic of a whole other post, but I will say that this app is tuned for them. I worked several jobs where I needed to resize images over and over. It's not fun. So, if you are a web producer at an eCommerce company, Derivv will be a great tool for you.

> Derivv makes it easy to resize an image to the exact dimensions you are looking for.

## How it works
As I said before, Derivv resizes photos in the browser. It doesn't upload them to a server to resize and send back, which makes it fast. The downside to that is the quality suffers a little bit, but as I go along I'll be working to improve the quality. And, if you are someone who needs the absolute best quality, I may end up building a feature where images are uploaded to a server and processed with some beefier processing tool like ImageMagick and sent back. Or, I may build a native app that does all that right on your computer.

As it stands today, Derivv allows you to choose an image to upload by either dragging and dropping or clicking to open the file browser, picking the width and height for any number of new images you want to create, and then processing them right then and there. It bundles all the new images into a folder, renames each file with the dimensions tacked on the end of the filename, and zips it all up into one easily downloadable file.

It has a few other features like if you only assign the width and not the height, it will resize and retain the aspect ratio of the image. You can also download a single image at a time. And, let's say you configure a bunch of image sizes and come back to it later, it automatically saves all your previous dimensions.

## Useful applications

Derivv is almost perfectly suited for eCommerce sites. Any time you have more than 2 or 3 different sizes of the same image you have to resize them so they look right. You can't just have one image and then set the size in your markup or CSS, which is what a lot of people do. Really big eCommerce companies, or smaller ones that care about their image quality in different browsers, platforms, or devices, try to get the best quality image possible, so they deliberately resize every image and review them. This is time-consuming. I wrote a script for a big eCommerce company that would speed up their image resizing process many times over, yet the images still had to go in for review.

One thing that is nice about Derivv is that you can resize an image and review it all right there. So, if you have image sizes for mobile, tablet, desktop, thumbnails, retina screens, 4k/5k screens, etc, you can see them all in one place to verify they are good to go.

If you have a blog, you can use it to resize thumbnails for blog posts and create images for multiple screen sizes and resolutions. WordPress, Squarespace, and other blogging platforms have some form of image resizing baked in, but in my opinion, they don't do a very good job. It's easier to do all that beforehand and batch-upload the images when you need them. Because Derivv renames the images with the dimensions in the filename, you can find them quickly after uploading them.

If you are a photographer and you need to present images to clients, Derivv is a great way to have multiple resolutions at your fingertips.

## What's next

I have a few features in mind that I'll implement over the next few months. A big one will be the ability to select a batch of images and resize them according to the configuration you've made. Another is to be able to adjust the crop to pull from one side or another so that you can fine-tune your image. Right now the images automatically get cropped from the center, so if you have a portrait of someone, their head might get chopped off the top. Not ideal.

Here is a list of features on my TODO list:

- Multiple image/batch image support
- ~~Ability to fine-tune cropping~~
- Crop gravity from left/right/top/bottom/etc
- Downsizing by Percentage
- Third-party plugins for WordPress, Squarespace, etc
- Plug and play resizing script with custom HTML attribute support

## That's it!

Thanks for reading this post and happy resizing!
