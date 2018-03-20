---
title: "Part 4 - Hitting The HackerNews API"
date: 2018-03-19T16:24:13Z
draft: true
desc: "In this tutorial, we are going to start hitting some APIs and showing some of the top stories on our HackerNews clone."
author: "Elliot Forbes"
tags: ["vuejs", "javascript"]
image: "vuejs.png"
weight: 4
series: [ "hackernewsclone" ]
twitter: "https://twitter.com/Elliot_F"
---

> The documentation for the API we will be hitting can be found here: [HackerNews/API](https://github.com/HackerNews/API)



## Installing axios

In order to add the `axios` library to your project type the following in your terminal within your project:

```s
$ yarn add axios
```

This will add the library

## Updating our Homepage Component

```html
<template>
    <h2>Stuff In Here</h2>
</template>
```

## Our REST API Response

In order to get the top stories from HackerNews we are going to be hitting the `https://hacker-news.firebaseio.com/v0/topstories.json` endpoint which will return an array of `id`'s that we can subsequently query to get further information. 

Once we have an individual `ID`, we can query the `https://hacker-news.firebaseio.com/v0/item/16619917.json` endpoint which will return the story for that given `ID`. We can then pull this in and render it within our VueJS application. 

The returned JSON for an individual item looks like this: 

```js
{
  "by" : "dhouston",
  "descendants" : 71,
  "id" : 8863,
  "kids" : [ 8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876 ],
  "score" : 111,
  "time" : 1175714200,
  "title" : "My YC app: Dropbox - Throw away your USB drive",
  "type" : "story",
  "url" : "http://www.getdropbox.com/u/2/screencast.html"
}
```

## Rendering a list of Top Stories



## Conclusion

In this tutorial, we managed to integrate our application with the HackerNews API and get some of the top news items displayed within our application.  