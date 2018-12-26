---
author: Elliot Forbes
date: 2018-03-01T12:26:40Z
desc: In this tutorial, we are going to be looking at how you can create your own
  components within a VueJS application
image: vuejs.png
series: vuejs
tags:
- vuejs
- javascript
title: Vuejs Components Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 2
---

> This Tutorial builds off the starter application that we generated in the [Getting Started with VueJS](/javascript/vuejs/getting-started-with-vuejs/) article.

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:42.76%"><iframe src="https://www.youtube.com/embed/5ounPLpSdeE?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="842" height="360" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

# Introduction

In this tutorial, we are going to look at how you can work with components within your VueJS applications. We are going to start at looking at very simple components and then move on to your standard `.vue` file components.

> The official documentation for VueJS components can be found here: [VueJS Components Guide](https://vuejs.org/v2/guide/components.html)

# What is A Component?

A component within a VueJS application, is a self-contained unit of code that represents a logical block of your application. Like for example, say you had a dashboard with 4 distinct boxes showing 4 distinct metrics, you would typically want to make each of these 4 boxes a unique component. 

The advantages of this are two-fold. 

You could easily re-use these components in a different page by just inserting the component's HTML tag into your other page and, ta-da, it's there and working. 

It also helps in terms of separation of concerns. You don't want any changes you make in Component A impacting Component B. By having these defined as 2 separate components, you typically have an added level of safety when making any changes.

# A Basic Component 

Let's start off by creating a very simple component. We can register this globally by using the `Vue.component(tagName, options)` like so:

```js
Vue.component('simple-component', {
    // All of my components options
})

// followed by my vue instance:
var vue = new Vue({
    ...
})
```

Should you wish, we can also register components locally instead of globally as we have done above. This makes the component *only* available within the scope of another instance and/or component by registering it with the `components` instance option:

```js
var Child = {
    template: '<div><h2>Hello World</h2></div>'
}

var app = new Vue({
    components: {
        'my-awesome-component': Child
    }
    // all my other vue instance code
})

```

Once we've registered our component, we can then drop it into our VueJS application with the `tagName`. 

```html
<div id="myapp">
    <!-- We can add our component to our app like so -->
    <simple-component></simple-component>
</div>
```

## The Data Function

In the previous tutorial, we created a Vue instance which featured a `data` object with a `msg` within it. One of the key things to note when starting to rearchitect your Vuejs to use components, is that `data` **must** be a function within your components. 

You can certainly still define `data` as an object but you will see a number of error warnings in the console and a number of weird side effects in you application, such as one component impacting the data within another.

# Component.vue files

Now, whilst this is how you would define a basic component, I typically never use this method within my VueJS applications. If you are doing anything serious with VueJS then you will tend to find yourself using `.vue` files to encapsulate your components.

One of the coolest things about VueJS is the fact that you can define a component in one `.vue` file. This `.vue` file includes the HTML, the JavaScript and the CSS for this one component. If you are coming from an AngularJS or Angular background then you may be used to having a component defined as like 4 distinct files which can lead to thousands of files within your production applications. 

VueJS seriously helps to minimize this and this encapsulation means that your project directories end up looking more succinct and cleaner and I'm a huge fan of that.

> I would highly recommend using the vue-cli in order to generate your applications as it allows you to easily use `.vue` files within your VueJS applications.

Below you'll find a very simple component that lives within the `simple-component.vue` file. It features everything our `simple-component` needs in terms of you HTML, the JavaScript, and the css: 

```html
<!-- simple-component.vue -->
<template>
    <p>All of your components html goes inside these template tags</p>
</template>

<script>
// All of your components JS code lives within this section
// we can still do things such as `import lib from 'lib'` should we wish
export default {
  name: 'simple-component',
  data () {
    return {
      msg: 'My Profile Component'
    }
  },
}
</script>

<style scoped>
p {
    background-color: blue;
}
</style>
```

# Conclusion

Hopefully, this article showed you everything you need in order tow work with components within your VueJS applications. If you need further help then please let me know in the comments section below or by tweeting me: [@Elliot_F](https://twitter.com/elliot_f).