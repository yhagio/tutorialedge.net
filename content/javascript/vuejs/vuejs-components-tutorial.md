---
author: Elliot Forbes
date: 2018-03-01T12:26:40Z
desc:
  In this tutorial, we are going to be looking at how you can create your own
  components within a VueJS application
image: vuejs.png
series: vuejs
tags:
  - beginners
title: Vue.js Components Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
weight: 2
---

> This Tutorial builds off the starter application that we generated in the
> [Getting Started with VueJS](/javascript/vuejs/getting-started-with-vuejs/)
> article.

# Video Tutorial

This tutorial is also available in video format if you wish to watch it!

<div style="position:relative;height:0;padding-bottom:42.76%"><iframe src="https://www.youtube.com/embed/5ounPLpSdeE?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="842" height="360" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

# Introduction

In this tutorial, we are going to look at how you can work with components
within your VueJS applications. We are going to start at looking at very simple
components and then move on to your standard `.vue` file components.

> The official documentation for VueJS components can be found here:
> [VueJS Components Guide](https://vuejs.org/v2/guide/components.html)

# Goals

By the end of this tutorial, you will be able to define your own components in Vue.JS
using either the JavaScript `Vue.component` function, or contained within 
`.vue` component files.

# What is A Component?

A component within a VueJS application, is a self-contained unit of code that
represents a logical block of your application. Like for example, say you had a
dashboard with 4 distinct boxes showing 4 distinct metrics, you would typically
want to make each of these 4 boxes a unique component.

**The advantages of this are two-fold:**

* **You could easily re-use these components** in a different page by just inserting
the component's HTML tag into your other page and, ta-da, it's there and
working.

* **It also helps in terms of separation of concerns.** You don't want any changes you
make in Component A impacting Component B. By having these defined as 2 separate
components, you typically have an added level of safety when making any changes.

# A Basic Component

Let's start off by creating a very simple component. We can register this
globally by using the `Vue.component(tagName, options)` like so:

```js
Vue.component('simple-component', {
    // All of my components options
})

// followed by my vue instance:
var vue = new Vue({
    ...
})
```

Should you wish, we can also register components locally instead of globally as
we have done above. This makes the component _only_ available within the scope
of another instance and/or component by registering it with the `components`
instance option:

```js
var Child = {
  template: "<div><h2>Hello World</h2></div>"
};

var app = new Vue({
  components: {
    "my-awesome-component": Child
  }
  // all my other vue instance code
});
```

Once we've registered our component, we can then drop it into our VueJS
application with the `tagName`.

```html
<div id="myapp">
  <!-- We can add our component to our app like so -->
  <simple-component></simple-component>
</div>
```

## The Data Function

In the previous tutorial, we created a Vue instance which featured a `data`
object with a `msg` within it. One of the key things to note when starting to
rearchitect your Vuejs to use components, is that `data` **must** be a function
within your components.

You can certainly still define `data` as an object but you will see a number of
error warnings in the console and a number of weird side effects in you
application, such as one component impacting the data within another.

# Component.vue files

Now, whilst this is how you would define a basic component, I typically never
use this method within my Vue.JS applications. If you are doing anything serious
with VueJS then you will tend to find yourself using `.vue` files to encapsulate
your components.

One of the coolest things about Vue.JS is the fact that you can define a
component in one `.vue` file. This `.vue` file includes the HTML, the JavaScript
and the CSS for this one component. These are contained within their own tags:

* `<template>` - The template tag contains the component's HTML markup.
* `<script>` - The script tag contains the component's JavaScript code. Within
this we can do things like import other components, or other packages we need
for our component to work
* `<style>` - The style tag contains all of our component's rules for styling
said component. 

If you are coming from an AngularJS or
Angular background then you may be used to having a component defined as like 4
distinct files which can lead to thousands of files within your production
applications.

Vue.JS seriously helps to minimize this and this encapsulation means that your
project directories end up looking more succinct and cleaner and I'm a huge fan
of that.

> I would highly recommend using the vue-cli in order to generate your
> applications as it allows you to easily use `.vue` files within your Vue.JS
> applications.

## Defining a Simple Component

> **Note** - This section assumes you have set up your Vue.JS application
using the `vue cli`. If you would like to see how this is done, please check
out my other tutorial here: 
[Getting Started with Vue.JS](/javascript/vuejs/getting-started-with-vuejs/)

Below you'll find a very simple component that lives within the
`simple-component.vue` file. It features everything our `simple-component` needs
in terms of you HTML, the JavaScript, and the css:

<div class="filename">src/components/SimpleComponent.vue</div>

```html
<template>
  <p>All of your components html goes inside these template tags</p>
</template>

<script>
  // All of your components JS code lives within this section
  // we can still do things such as `import lib from 'lib'` should we wish
  export default {
    name: "simple-component",
    data() {
      return {
        msg: "My Profile Component"
      };
    }
  };
</script>

<style scoped>
  p {
    background-color: blue;
  }
</style>
```

With this in place, you are now able to import this new component
into your `src/App.vue` root component like so:

<div class="filename">/src/App.vue</div>

```html
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.svg">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <simple-component/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import SimpleComponent from './components/SimpleComponent.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
    SimpleComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

Saving this will cause your Vue.JS project to rebuild automatically
if you are running `yarn serve` or `npm run serve`. With this rebuilt, you
will now see your lovely new `<simple-component/>` component rendering in its
mighty blue glory within your Vue.JS application.

# Conclusion

> **Source Code** - The full source code for this tutorial can be found here:
[TutorialEdge/vuejs-components-tutorial](https://github.com/TutorialEdge/vuejs-components-tutorial)

Hopefully, this article showed you everything you need in order to work with
components within your Vue.JS applications. If you need further help then please
let me know in the comments section below or by tweeting me:
[@Elliot_F](https://twitter.com/elliot_f).

## Further Reading

If you found this tutorial useful, then you may also like some of our other 
Vue.JS tutorials:

* [Vue.JS Event Handling Tutorial](/javascript/vuejs/vuejs-event-handling-tutorial/)
* [Vue.JS Animation and Transitions Tutorial](/javascript/vuejs/vuejs-transitions-animations-tutorial/)
