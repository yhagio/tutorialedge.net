---
author: Elliot Forbes
date: 2018-03-19T16:24:13Z
desc:
  In this tutorial, we are going to be creating a few components to our
  HackerNews clone and fleshing out our project.
image: vuejs.png
series:
  - hackernewsclone
tags:
  - vuejs
  - javascript
title: Part 2 - Creating a Few Components
twitter: https://twitter.com/Elliot_F
weight: 2
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

In the previous tutorial, we not only managed to set up our base project and get
it running on `http://localhost:8080`, but we also managed to build it so that
it's ready for deployment to production. We now have a strong base project from
which we can build up up our HackerNews clone.

In this tutorial, we are going to create our first Single Page component which
will be our `Navbar.vue` component. I'll show you how you can subsequently
register this component within your Vue application and we'll also look at how
we can customize the way our component looks by using CSS that is only applied
to said component.

By the end of this tutorial, you should be comfortable building your own simple,
single-page components within Vue.js.

## Video Tutorial

This tutorial is available in video format. Should you wish to support the
series then please subscribe and like the video on YouTube!

<div style="position:relative;height:0;padding-bottom:42.76%"><iframe src="https://www.youtube.com/embed/FX1s4XBO0D4?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="842" height="360" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

## A Simple Navbar Component

So, the first thing I always notice whenever I open up HackerNews is the iconic
orange navbar at the top. This will undoubtedly have to feature in our own
clone, and in order to add it, we'll have to create the `Navbar` component we
talked about earlier.

Open up your project in a text editor of your choice and open the directory that
your project exists within. Create a `Navbav.vue` file within the
`/src/components/` directory and add the following:

```html
<template>
  <div class="pure-menu pure-menu-horizontal">
    <div class="container">
      <a href="#" class="pure-menu-heading pure-menu-link">Home</a>
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <a href="#" class="pure-menu-link">News</a>
        </li>
        <li class="pure-menu-item">
          <a href="#" class="pure-menu-link">Sports</a>
        </li>
        <li class="pure-menu-item">
          <a href="#" class="pure-menu-link">Finance</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Navbar"
  };
</script>

<style scoped>
  .pure-menu {
    background-color: #e17842;
  }
  .pure-menu a {
    color: white;
  }
</style>
```

The above code represents the bare-bones of our new `Navbar` component. We
define the `HTML` we wish to render for our component within the `<template>`
tags, we define all of our core component functionality, a.k.a. all of the
JavaScript functions within the `<script>` tags. Finally, should we wish to add
custom styling to our `Navbar` component, we can do so by placing the `css`
within our `<style>` tags. You should notice we've added `scoped` to our style
tag, this essentially ensures that the `css` we define within this component
will only impact the `HTML` within our component.

I've populated the `<template>` tags with a simple navbar element stolen from
the pure-css documentation page just to get us started.

> Most Vue.js single-page components follow this structure with a `<template>`
> section for your HTML, a `<script>` section for your components core code, and
> a `<style>` section for when you wish to customize the look of your component.

## Registering our New Component

So, now that we've defined our `Navbar.vue` component, it's time to register it
within our existing Vue.js application and start using it. As it stands, our
`Vue.js` application doesn't have any reference to our new `Navbar.vue`
component so we'll have to first `import` it into the component we wish to
render it and then register it within the `components` property of our
particular Vue.js component.

In this case, we are going to be importing our `Navbar.vue` component into our
`App.vue` component. We want our `Navbar.vue` component to be shown across every
route of our application, so importing it into this `App.vue` component and
rendering it in one place makes sense.

Open up your `/src/App.vue` component file and within the `<script>` tag, import
your `Navbar` and add it to a `components` object like so:

```js
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  }
};
```

Once we have imported and registered this new component, we can use it within
our `App.vue`'s `HTML` by adding the `<navbar>` to our app and removing the
`<helloworld>` tag from our `<template>` section.

```html
<template>
  <div id="app">
    <navbar></navbar>
  </div>
</template>
```

Our Vue.js application infers automatically that the `<navbar>` HTML tag
corresponds to the `Navbar` component we have registered within our `components`
property. However, should you wish to explicitly state the element you wish to
correspond to a component, you can do so like this:

```js
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: {
    navbar: Navbar
  }
};
```

Our finished `src/App.vue` file should look like this:

```html
<template>
  <div id="app">
    <navbar></navbar>
    <router-link />
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar";
  export default {
    name: "App",
    components: {
      Navbar
    }
  };
</script>

<style></style>
```

## Adding a CSS Framework

Pretty much every web application you see will utilize some form of `CSS`
framework. Now, for this project, I'm choosing to use the Pure-CSS framework as
it seems relatively lightweight whilst featuring essentials such as a grid
system, and I haven't had much of a chance to play about with it yet.

In order to add a CSS framework to our project, open up the `public/index.html`
page within your project and add:

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/purecss@1.0.0/build/pure-min.css"
  integrity="sha384-nn4HPE8lTHyVtfCBi5yW9d20FjT8BJwUXyWZT9InLYax14RDjBj46LmSztkmNP9w"
  crossorigin="anonymous"
/>
```

To just below your `<title>` tag. Upon clicking the `cmd-s` you should see your
application reload on `http://localhost:8080` with a slightly different style.

## How it looks

At this stage, your application should look something like this:

![Our HackerNews clone as it stands](https://images.tutorialedge.net/images/hackernews-clone/screenshot-03.png)

## Next Steps

Now that we've defined a few, very simple components within our application,
it's time to move on and start thinking about how we can show different views
within our application. This is where the `vue router` will come into play!

> Next Tutorial:
> [Part 3 - Adding Routes to our Vue.js Application](/projects/hacker-news-clone-vuejs/part-3-adding-a-few-routes/)
