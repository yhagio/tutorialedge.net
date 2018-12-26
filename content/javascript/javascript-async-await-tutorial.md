---
author: Elliot Forbes
date: 2018-03-10T20:59:31Z
desc: In this tutorial, we are going to have a look at how you can use async/await
  within your JavaScript applications.
series: javascript
tags:
- javascript
title: Javascript Async Await Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this tutorial, we are going to have a look at how you can make your JavaScript programs more syntactically beautiful with the use of both the `async` and `await` keywords. Both of these keywords were introduced into Node in version 7.6. Hopefully, by the end of the tutorial, you will be going back to refactor all of your old NodeJS based applications to replace all of your chained callbacks and promises.

# A Simple Introduction

Let us first have a look at how we would typically deal with functions that return promises without `async` or `await`. We'll create a `myPromise()` function which will just return a `Promise` like so:

```js
function myPromise () {
    return new Promise((resolve, reject) => {
        resolve("My Promise Response");
    })
}
```

Let's now try and call the `myPromise()` function within a traditional function. This will mean we have to again return a `Promise` and only resolve this returned `Promise` once we have the result from our `myPromise()` function. Like so:

```js
function myTraditionalFunction() {
    return new Promise((resolve, reject) => {
        myPromise()
            .then((result) => {
                resolve(result);
            })
    })
}

myTraditionalFunction().then(x => console.log(x));
```

Now this isn't too bad for a simple program, but consider what happens when our programs grow in size and complexity, we'll then have to deal with hundreds of chained promise functions and our codebase will be needlessly complex.

Let's have a look at how we can improve this with the use of `async` and `await`. We will create a `myAsyncFunction()` which will be prepended by the `async` keyword. Within the function body, we can then get 

```js
async function myAsyncFunction () {
    var resp = await myPromise();
    return resp;
}

function myPromise () {
    return new Promise((resolve, reject) => {
        resolve("My Promise Response");
    })
}

myAsyncFunction().then(x => console.log(x));
```

We've managed to achieve the same result with our `myAsyncFunction` in 4 lines of code, as we had with 8 lines of code in our previous `myTraditionalFunction`. By utilizing the `async` and `await` keywords, we have been able to create a program that is far cleaner and more concise. 

# Improvements to Error Handling

Using both `async` and `await` improves the way we can deal with errors that occur inside of our promises. Let's take for example a program that crawls a page of a website and returns the response, using traditional error handling methods we would have to write additional `.catch()` blocks to catch any errors that our promises may throw.

With the `await` keyword however, we can simply wrap our promise within a try catch like so: 

```js
const axios = require('axios')

async function crawlPage(url) {
    try {
        let result = await axios.get(url);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

crawlPage("https://tutorialedge.net/");
```

This is far cleaner and simpler than using the `.catch()` block approach. Let's flesh this sample out a little and create a very simple web crawler that can retrieve all of the links on a given page:

```js
const axios = require('axios')
const cheerio = require('cheerio')

async function crawlPage(url) {
    try {
        let result = await axios.get(url);

        $ = cheerio.load(result.data);
        links = $('a')
        
        $(links).each((i, link) => {
            console.log(i)
            console.log($(link).attr('href'))
        })

    } catch (err) {
        console.log(err);
    }
}

crawlPage("https://tutorialedge.net/");
```

# Conclusion

Hopefully, you found this tutorial useful and I've shown you the light when it comes to using `async` and `await` within your own JavaScript programs. I would love to hear your feedback so please feel free to reach out to me on twitter: [@Elliot_F](https://twitter.com/elliot_f).