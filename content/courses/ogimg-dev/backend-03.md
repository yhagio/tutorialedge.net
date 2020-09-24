---
author: Elliot Forbes
date: 2018-06-09T22:48:26+01:00
desc:
  In this tutorial, we are going to look at how you can set up the foundations for the REST API that will be powering our SaaS product.
image: react.svg
paid: false
series: ogimgdev
tags:
  - ogimgdev
title: Part 3 - Generating Images with Puppeteer
twitter: https://twitter.com/Elliot_F
video: 461334515
nextPage: /courses/ogimg-dev/backend-04/
weight: 3
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

Now that we've been able to successfully generate the HTML using JSON input, it's time to take this generated HTML and generate an image from it using the `puppeteer` library.

Puppeteer will effectively allow us to run a headless version of chrome within our Node project and it will be able to load our html and render it just as a browser would before we then set about taking a screenshot.

Before we can get started implementing any new functions, let's start by installing the puppeteer library like so:

```go
npm install puppeteer
```

With this in place, let's open up our `cards.js` file and start implementing the function which will take in our raw `html` and convert it into an image for us:

```go
const puppeteer = require('puppeteer')

...

async function generateImage(html) {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      timeout: 10000,
    });
    const page = await browser.newPage();
    await page.setContent(html)
    await page.setViewport({ width: 2048, height: 1170 });
    const screenshot = await page.screenshot({
        encoding: 'binary'
     });
    await browser.close();
    return screenshot;
}

module.exports = {
  generateHTML,
  generateImage
};
```

Now that we have this in place, let's open up `routes/cards.js` and modify our route so that it calls our newly built `generateImage` function and also returns the image:

```go
const express = require('express');
const router = express.Router()

const { generateHTML, generateImage } = require('../cards/card')

router.get('/', async (req, res) => {
    let data = {};
    let html = await generateHTML(data);
    let image = await generateImage(html);
    res.contentType('image/jpeg');
    res.end(image, 'binary');
})

module.exports = router;
```

Awesome, let's open up the browser and navigate to the `/card/` path to see if it all worked!

If everything has worked, you should see our newly generated image rendering within the browser! Awesome!!

The full version of the code up until this point can be found on the `backend-03` branch in the repository for this course
