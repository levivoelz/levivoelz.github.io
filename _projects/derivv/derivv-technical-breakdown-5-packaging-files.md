---
layout: post
name: Derivv Technical Breakdown 4
short_description: Packaging files for delivery
title: "Derivv Technical Breakdown: Packaging Files for Delivery"
featured_image: /images/projects/derivv-interface-code.png
hero: /images/projects/derivv-interface-code.png
description: Packaging files for delivery using zip.
sub: true
date: 01/03/2021
---

After the images are processed and the user has refined the focal point, it's time to download the images. The user has the option to download a zip file of all the images or download them one by one.

This is achieved by using [JSZip](https://stuk.github.io/jszip/) to package the images into a zip file and then saving the file to the user's computer using [file-saver](https://github.com/eligrey/FileSaver.js/).

```javascript
const zip = new JSZip()
const folderName = `${images[0].originalName}-derivatives`;
const folder = zip.folder(folderName);

images.forEach((image) => {
  const fileName = `${image.name}.${image.extension}`
  folder.file(fileName, image.blob)
});

zip.generateAsync({type: 'blob'})
  .then((content) => {
    saveAs(content, `${folderName}.zip`)
  });
```

And that's essentially it folks. Thanks for reading!

[Previous: What Makes the Interface So Unique?](/projects/derivv-technical-breakdown-4-unique-interface)

[Derivv Technical Breakdown Overview](/projects/derivv-technical-breakdown)
