---
layout: post
short_description: Leveraging the Browser
title: Leveraging the browser for high performance and cost effective full-stack web applications
featured_image: /images/clean-vs-dirty-office.jpg
hero: /images/clean-vs-dirty-office.jpg
allow_expand_hero: false
description: The browser is a highly underutilized resource in your CPU-intensive task pipeline. Save money and improve UX by moving some tasks to the browser.
slug: leveraging-the-browser-for-high-performance-web-applications
published: false
---
James Arthur: Little elephants everywhere: https://www.youtube.com/watch?v=ZlHWSpIYixk

In the high-stakes world of modern web applications, every millisecond counts and every dollar matters. As applications scale to millions of users, the cost of maintaining a seamless user experience and complex infrastructure can be staggering. But what if you could improve performance/UX and slash your infrastructure costs by 1%, 5%, 10% or more by moving some tasks to the front-end? By offloading some CPU-intensive processes, developers can tap into a vast, underutilized resource that’s already sitting on every user’s device—the browser.

To illustrate the potential cost savings of leveraging browser capabilities, let’s consider a real-world example. Let’s say you’re building a real estate platform using NextJS that allows users to upload and view property photos. Typically, the user would upload the full-resolution image to the server and it would resize and compress it, then send it to a storage bucket. If you are using Vercel and their [Pro plan](https://vercel.com/docs/image-optimization/limits-and-pricing), you’d be charged $20/mo for the first 5,000 images, and then $5 per 1,000 additional images. As your user base grows, the costs can become untenable. For instance, if you process 500,000 images per month, that’s $2,500 in monthly costs. But what if you could eliminate that cost altogether? By leveraging the browser to process images, you could save on that monthly expense, which could be invested in improving your search functionality, enhancing UX, or expanding your listings. That’s a significant savings that could have an impact on your business.

If we were to use the [AWS example](https://docs.aws.amazon.com/solutions/latest/serverless-image-handler/cost.html
) for a Serverless Images Handler, the costs would be much less than using Vercel’s option. In their cost analysis they estimate $150.83 per month for processing 1 million images. They don’t say what they expect the original image size to be, but they do say the final stored image would be 1mb. The high expense here isn’t necessarily in the infrastructure costs, it would be more from the dev time to build, test, deploy, and maintain the system. If you were resizing in the browser, you’d cut out the majority of that pipeline and save on dev time.

Another relatively common scenario to consider is updating a user's avatar. Typically what happens is the user selects their photo, the front-end uploads it to the server, the server either resizes it in a background job or sends it to a serverless function to resize, then the image gets stored in a bucket and a record gets updated in the database with the image URL. While all of that is happening the user doesn't see it update right away, they have to wait for it (sometimes quite a while). More times than not, they have to refresh the page a few times to see the new avatar. If the developers are UX aware and have time to implement a more complete solution, they might poll the server to get the new image and when it comes through they cancel the polling. The other solution is to show the unprocessed image temporarily in the browser and then update it to the final processed image after the operation is done. Better, but not ideal.

The best way to handle this is to resize the image in the browser, upload it direcly to your bucket by getting a signed URL from your server, and show the user that image, which is the final image. This is similar to the second solution but is more streamlined, simple, and cost effective. You can then update the user's profile to reflect the new URL. Because the image is already resized and compressed the transfer happens very quickly, even with a slow network connection. In the off chance the user loses the connection or closes their browser window during the transaction, you can recover by syncing the locally stored image URL with the profile record when they come back.

Here’s the kicker—browsers are fast and incredibly powerful. And, we are not limited to only working with JavaScript. With the advent of WebAssembly, browsers are capable of doing tasks that were previously unimaginable. From CAD to machine learning, you can do nearly anything you could do natively, directly in the browser. The benefits are vast and, unfortunately, scantily utilized or even recognized.

There are some drawbacks, however. Some WebAssembly packages can be quite large and take time to load, perform slower than their native counterparts, and can be limited in the amount of data they can process at any given time. The developers of Emscripten and other wasm packagers are aware of performance issues and many package maintainers are too. Chrome is limited to 4gb memory usage per instance/tab and there are some security restrictions that have to be adhered to on the developer side to take advantage of the full allocation. Image quality and compression performance is not as good in a pure browser/JavaScript implementation. I have first-hand experience trying to squeeze out every bit of performance and quality from my image resizing app, derivv.com.

There are some methods for handling long load times, such as lazy loading resources only when needed and loading asynchronously so as to not block rendering. Browser caching will store resources so they don’t have to be loaded in subsequent requests. Some processes may block the main thread and cause the browser to hang and impact UX. By moving intensive processes to WebWorkers you can bypass the main thread and the user can do other things while your process is running.

## Packages
Listed below are some open source packages dedicated to doing complex tasks in the browser. Some are JavaScript libraries, some are WebAssembly packages wrapped around native packages like FFmpeg or PostgreSQL, and some are written in Rust, Python, or another language and are built to be run exclusively in the browser. This is not a comprehensive list, but rather a sampling of what is available.

#### Resize and compress images
- [Photon](https://github.com/silvia-odwyer/photon) - Rust/WebAssembly image processing library
- [Pica](https://github.com/nodeca/pica) - Resize image in browser with high quality and high speed

#### Generate and compress PDFs
- [PDF-LIB](https://github.com/Hopding/pdf-lib) - Create and modify PDF documents in any JavaScript environment
- [CompressPDF](https://github.com/OpenToolKit/CompressPDF) - Fast in-browser PDF compressor

#### Parse and render Excel and CSVfiles
- [ExcelJS](https://github.com/exceljs/exceljs) - Excel Workbook Manager
- [PapaParse](https://github.com/mholt/PapaParse) - Fast and powerful CSV (delimited text) parser that gracefully handles large files and malformed input

#### Video processing
- [FFmpeg](https://github.com/ffmpegwasm/ffmpeg.wasm) - FFmpeg for browser, powered by WebAssembly

#### Run LLMs
- [wllama](https://github.com/ngxson/wllama) - WebAssembly binding for llama.cpp - Enabling in-browser LLM inference

#### Model training
- [TensorFlow.js](https://github.com/tensorflow/tfjs) - A WebGL accelerated JavaScript library for training and deploying ML models.

#### OCR
- [Tesseract.js](https://github.com/naptha/tesseract.js) - Pure Javascript OCR for more than 100 Languages

#### Speech to Text
- [whisper.cpp](https://github.com/ggerganov/whisper.cpp) - Port of OpenAI's Whisper model in C/C++

#### Background Jobs
- [Threads.js](https://github.com/andywer/threads.js) - Make web workers & worker threads as simple as a function call.

#### Vector similarity search
- [Voy](https://github.com/tantaraio/voy) - A WASM vector similarity search written in Rust

#### Database
- [PGlite](https://github.com/electric-sql/pglite) - Lightweight WASM Postgres with real-time, reactive bindings.

#### Data syncing
- [Electric](https://github.com/electric-sql/electric) - Sync little subsets of your Postgres data into local apps and services.

#### 3D modeling
- [OpenSCAD](https://github.com/openscad/openscad-wasm) - Webassembly port of OpenSCAD
- [OCJS](https://github.com/donalffons/opencascade.js) - Port of the OpenCascade CAD library to JavaScript and WebAssembly via Emscripten.
- [three-csg-ts](https://github.com/samalexander/three-csg-ts) - CSG library for use with THREE.js

#### 3D printing
- [gcode-viewer](https://github.com/aligator/gcode-viewer) - A simple gcode viewer lib using three.js

## Conclusion

While there are some drawbacks to consider, the benefits of leveraging the browser for CPU-intensive tasks are significant. By moving some tasks to the front-end you can save on infrastructure costs, improve UX, and create faster, more responsive experiences that delight users.

