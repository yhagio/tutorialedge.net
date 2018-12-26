---
author: Elliot Forbes
date: 2018-03-11T14:08:54Z
desc: In this tutorial, we are going to create a nice and simple 404 checker for a
  given page using NodeJS
series: nodejs
image: node.png
tags:
- nodejs
- javascript
title: NodeJS 404 Checker Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

# Introduction

In this tutorial, we'll be looking at how you can create a nice and simple 404 broken link checker in NodeJS using the `axios` library as well as `cheerio` and `is-relative-url`.

> We will be taking advantage of the async and await keywords in this tutorial. You can find out more on them here: [JavaScript async and await Tutorial](/javascript/javascript-async-await-tutorial/) 

Let's begin by creating a simple `async` function that will retrieve all of the links from a passed in `URL`. We'll call this `getAllLinks(url)`. Within the function body, we will attempt to retrieve the `URL` passed in with a simple HTTP `GET` request. 

We'll use the `await` keyword to succinctly set our `result` variable as the response of our `GET` request. This saves us from having to do `.then()` and `.catch()` when handling the Promise returned by the `axios.get()` function call.


```js
const axios = require('axios')
const cheerio = require('cheerio')

async function getAllLinks(url) {
    try {
        let result = await axios.get(url);
        $ = cheerio.load(result.data);
        links = [];
        $('a').each((i, link) => {
            links.push(link)
        })
        return links;
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function crawlPage() {
    let list = await getAllLinks("https://tutorialedge.net")
    console.log(list);
}

crawlPage()
```

We can then extend this further so that once it has retrieved this list of links from our retrieved webpage, we then subsequently call another `GET` HTTP request to each of those links and print out the results:

```js
async function crawlPage(url) {
    let links = await getAllLinks(url);
    for (let link of links) {
        try {
            let resp = {};
            if (isRelativeUrl($(link).attr('href'))) {
                resp = await axios.get(url + $(link).attr('href'))
            } else {
                resp = await axios.get($(link).attr('href'))
            }
            console.log("Valid Url: " + $(link).attr('href') + " returned status: " + resp.status);
        } catch (err) {
            console.log("Not a valid URL: " + $(link).attr('href'))
        }
    }   
}
```


# Full Source Code:

The full source code for this tutorial can be found below:

```js
const axios = require('axios')
const cheerio = require('cheerio')
const isRelativeUrl = require('is-relative-url')

let brokenLinks = [];

async function getAllLinks(url) {
    try {
        let result = await axios.get(url);
        $ = cheerio.load(result.data);
        links = [];
        $('a').each((i, link) => {
            links.push(link)
        })
        return links;
    } catch (err) {
        console.log(err);
    }
}

async function crawlPage(url) {
    let links = await getAllLinks(url);
    for (let link of links) {
        try {
            let resp = {};
            if (isRelativeUrl($(link).attr('href'))) {
                resp = await axios.get(url + $(link).attr('href'))
            } else {
                resp = await axios.get($(link).attr('href'))
            }
            console.log("Valid Url: " + $(link).attr('href') + " returned status: " + resp.status);
        } catch (err) {
            console.log("Not a valid URL: " + $(link).attr('href'))
        }
    }
    
}

crawlPage("http://localhost:1313/");
```

# Conclusion

Hopefully, you found this tutorial useful, if you did then please feel free to let me know by tweeting me: [@Elliot_F](https://twitter.com/elliot_f). 