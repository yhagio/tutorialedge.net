---
author: Elliot Forbes
date: 2018-03-19T16:24:13Z
desc:
  In this tutorial, we are going to start hitting some APIs and showing some of
  the top stories on our HackerNews clone.
image: vuejs.png
series:
  - hackernewsclone
tags:
  - vuejs
  - javascript
title: Part 4 - Hitting The HackerNews API
twitter: https://twitter.com/Elliot_F
weight: 4
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

> The documentation for the API we will be hitting can be found here:
> [HackerNews/API](https://github.com/HackerNews/API)

In most frontend web applications, you will need to start making `HTTP` requests
in order to retrieve data from a database or get information from a RESTful API.
Being able to do this is considered almost essential these days and thus, in
this section of the course, we are going to look at how you can extend the
HackerNews project in order to make `HTTP` requests out to the HackerNews API.

This will give us experience hitting a RESTful API through the use of HTTP
requests and subsequently rendering the responses within one of our components.

In this part of the course, we will be updating our `Homepage.vue` single-page
component that we defined in
[Part 3](/projects/hacker-news-clone-vuejs/part-3-adding-a-few-routes/), so that
it makes a series of API requests to the HackerNews/API and renders the results
in a nice fashion.

## Video Tutorial

This tutorial is also available in video format, should you wish to support the
series then you can do so by subscribing to my YouTube channel and hitting that
like button on my videos!

<div style="position:relative;height:0;padding-bottom:42.76%"><iframe src="https://www.youtube.com/embed/ZQvNMHf6hNA?list=PLzUGFf4GhXBLWueypt6avCKOCNt0675EQ&amp;ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="842" height="360" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

## Installing axios

In order to add the `axios` library to your project type the following in your
terminal within your project:

```s
$ yarn add axios
```

This will add the `axios` library to our project so that we can subsequently use
it to perform our `HTTP` requests within our components. In the past, Vue.js
natively supported sending `HTTP` requests, but that functionality has since
been removed from the library in support of using pre-existing libraries such as
`axios`. This is beneficial as it doesn't tie you into a Vue.js specific way of
thinking when it comes to making these requests. Should you wish, you could also
use the `axios` library within any other JavaScript based project with minimal
fuss.

## Our REST API Calls

In order to get the top stories from HackerNews we are going to be hitting the
`https://hacker-news.firebaseio.com/v0/topstories.json` endpoint which will
return an array of `id`'s that we can subsequently query to get further
information.

Once we have an individual `ID`, we can query the
`https://hacker-news.firebaseio.com/v0/item/16619917.json` endpoint which will
return the story for that given `ID`. We can then pull this in and render it
within our VueJS application.

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

So, on our `Home` components initial load, we need to query the first API to
retrieve the top 490 odd top stories, we then iterate through the first 10 or 20
or so and query the HackerNews API once again for the fleshed out details.

To get us started, we will need to open up our `src/views/Home.vue` component
and then within the `<script>` element do the following:

```js
import axios from "axios";
export default {
  name: "home",
  data: function() {
    return {
      err: "",
      stories: []
    };
  },
  created: function() {
    axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then(result => {
        this.stories = result.data;
      })
      .catch(err => {
        this.err = err;
      });
  }
};
```

When we click save on this, you should see your application making a `HTTP GET`
request to that endpoint and populating `stories` with an array of `ID`s that
represent the top stories currently on HackerNews.

## Updating our Homepage Component

Now that we have successfully made a call to this REST API, let's show the
results on our page. We want to create a new `<div>` element for every story
returned for now, and we can achieve this by using the `v-for` directive like
so:

```html
<template>
  <div>
    <h2>Homepage</h2>
    <div v-for="story in stories" :key="story"><h2>{{ story }}</h2></div>
  </div>
</template>
```

When we save this now, you should see within your browser something that looks
like this:

![Our list of top stories!](https://images.tutorialedge.net/images/hackernews-clone/screenshot-05.png)

## Fleshing out Our Stories

Right now we are just displaying the `ID`s of the top stories on HackerNews, but
how do we retrieve all the story information and show things like the title, the
link, the score and so on?

Let's flesh out our `created()` function and slice the `results` we get back
from our initial `HTTP GET` request so that we are only dealing with the top 10.
After we've done this, we want to iterate through these and make a subsequent
`HTTP GET` request to the `/v0/item/` API endpoint to retrieve all the data.
We'll then populate our `stories` array with the responses returned:

```js
import axios from "axios";
export default {
  name: "home",
  data: function() {
    return {
      err: "",
      stories: []
    };
  },
  created: function() {
    axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then(result => {
        this.results = result.data.slice(0, 10);
        this.results.forEach(element => {
          axios
            .get(
              "https://hacker-news.firebaseio.com/v0/item/" + element + ".json"
            )
            .then(result => {
              this.stories.push(result);
            })
            .catch(err => {
              console.log(err);
            });
        });
      })
      .catch(err => {
        this.err = err;
      });
  }
};
```

When we again click save on this, you should see our application goes from
rendering a list of numbers to rendering a list of `JSON` objects like so:

![this is pretty ugly](https://images.tutorialedge.net/images/hackernews-clone/screenshot-06.png)

I wouldn't argue with you if you said this looked pretty ugly as it stands,
let's change this to only render some of the vital information we want by
modifying the `html` within our `v-for` directive:

```html
<template>
  <div>
    <h2>Homepage</h2>
    <div v-for="story in stories" :key="story.id">
      <h2>{{ story.data.title }}</h2>
      <p>Type: {{ story.data.type }}</p>
      <p>Link: {{ story.data.url }}</p>
      <p>Score: {{ story.data.score }}</p>
    </div>
  </div>
</template>
```

And the final result of these changes should end up looking similar to this:

![Our somewhat better looking hackernew clone](https://images.tutorialedge.net/images/hackernews-clone/screenshot-07.png)

Not the best, but it's a huge improvement over our previous version.

## Conclusion

In this tutorial, we managed to integrate our application with the HackerNews
API and get some of the top news items displayed within our application.

As a slight caveat, it should be noted that whilst this method of calling APIs
within your single-page components does get you up and running quickly, in more
advanced projects, you may with to abstract this functionality into something
like `vuex`. We will be covering this more in detail in
[Part 7 - Managing State with Vuex](/projects/hacker-news-clone-vuejs/part-7-managing-state-with-vuex-vuejs/)

> Check out the next tutorial in this series here:
> [Part 5 - Viewing Individual News Articles](/projects/hacker-news-clone-vuejs/part-5-single-news-article-view/)
