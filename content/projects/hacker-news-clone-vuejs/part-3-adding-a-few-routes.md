---
title: "Part 3 - Adding a Few Routes To Our App"
date: 2018-03-19T16:24:13Z
draft: true
desc: "In this tutorial, we are going to setting up our application to use the vue router and add a few simple routes to our application."
author: "Elliot Forbes"
tags: ["vuejs", "javascript"]
image: "vuejs.png"
weight: 3
series: [ "hackernewsclone" ]
twitter: "https://twitter.com/Elliot_F"
---

In the previous tutorial of this series, we created a simple `Navbar` component and added it to our application. In this tutorial, we are going to be creating a few more components and setting up a `vue-router` so that we can navigate between different views on our site.

## Video Tutorial

<div style="position:relative;height:0;padding-bottom:42.76%"><iframe src="https://www.youtube.com/embed/XLL2ufItDyM?list=PLzUGFf4GhXBLWueypt6avCKOCNt0675EQ&amp;ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="842" height="360" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

## Our HomePage Component

First thing we are going to need is a component that will show all of the most popular news stories currently on the real HackerNews site. Don't worry about where these posts are coming from just yet, we'll be solving that issue in the next tutorial when we start hitting the HackerNews API.

```html
<template>
    <div>
        <h2>Homepage</h2>
    </div>
</template>

<script>
export default {
  name: 'Homepage'
}
</script>

<style scoped>

</style>

```

## Setting Up Our Vue Router

Thankfully, the `vue-cli` did most of the heavy lifting for us when it came to setting up the `router` within our application.  

Open up the `src/router/index.js` and you should see the following code already pre-populated:

```js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
```

Let's disect what we have done here, so on the first and second lines, we have imported both `Vue` and the `vue-router`. Below this, we then import all of the components we wish to render on their own paths, in this case, it's only our `HelloWorld` component.

Finally, we tell our Vue application to use the `vue-router` before then creating a new `Router` which contains all of ours applications routes. 

Each of our routes is a combination of a path, the name of our path, and the component we wish to render when we hit this path. Should we wish, we can also do cool stuff such as dynamic route matching which we will cover in more detail in part 5 of this project.

> For more information our VueJS routing check out the official documentation or my tutorial: [VueJS Routing Tutorial](/javascript/vuejs/vue-router-beginners-tutorial/)

### Modifying Our Routes

Let's modify the routes slightly so that we are pointing the `/` path to our newly defined `Homepage` component.

```js
import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    }
  ]
})
```

When we navigate back our browser and view `http://localhost:8080/#/`, you should now see our Homepage `<h2>Homepage</h2>` being rendered in all its glory.

![Our updated view](https://s3-eu-west-1.amazonaws.com/tutorialedge.net/images/hackernews-clone/screenshot-04.png)

## Conclusion

In this tutorial, we managed to create a few more components within our VueJS application and set up the `vue router` which enables us to navigate between different components with ease. 

Currently, this only renders the one route, but in the next couple of tutorials, we will be using this to dynamically render our components depending on the user's location within our application.