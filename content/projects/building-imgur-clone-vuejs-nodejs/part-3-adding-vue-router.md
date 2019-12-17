---
title: "Part 3 - Adding The Vue Router to our Application"
date: 2019-08-20T18:44:50+01:00
draft: true
desc: In this tutorial series, we are going to be building an Imgur clone using Lambda functions written using Node.JS and a frontend built using Vue.JS
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: vuejsimgurclone
image: vuejs.png
tags:
- beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In the last tutorial in this series, we looked at building a really simple component within our Imgur application. Now that we have some fo the basics under our belt when it comes to building components, it's time to look at how we can start building a more complex application and introduce multiple components and a router that allows us to switch between rendering certain components.

# Introduction

In this tutorial, we'll be looking primarily at how you can set up your Vue.JS application to use the incredibly popular `vue router` package. We'll be covering how routing works in terms of all Single Page Applications, and then how it specifically works within Vue.JS.

# Routing in Single Page Applications

In most frontend JavaScript frameworks such as React, Angular and even Vue.JS, you tend to have a single router within your application that handles the task of determining what path you are hitting and then dictating the component that has to be rendered for that path.

This act of determining what component to render within the framework is known as `client-side rendering`. You tend to find that the configuration for client-side rendering is typically very similar in terms of how it is structured. You tend to specify a path of some description and then match it against a given component:

```js
const routes = [
    { "path": "/home", "component": HomePage },
    { "path": "/login", "component": LoginPage }
]
```

If you look at how Angular handles client-side routing configuration, you will see a lot of similarities. React is ever so slightly different in how it handles route definitions but the underlying premise is still very much the same.

# Adding Our First Routes

Now that we have some inclination as to what client-side routing is, let's now put what we have covered into practice and create our very first route within our app.

We'll need to start by installing the vue router using either yarn/npm:

```output
$ npm install vue-router
$ yarn add vue-router
```

With this successfully added to our frontend project, we can now explicitly tell our Vue.js app to use the vue router within our `App.js` by calling `Vue.use()`:

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

Awesome, and with that we have successfully set up our application to use the vue router. We can now move on to creating a simple route!

## HomePage Route

The most obvious route to add will be the Home page route which will display the latest images that have been uploaded to the site by users. 

I tend to find having a `router/` directory at the same level as your `components/` directory in which an `index.js` file containing all of your route definitions tends to work best. 

```js

```

With this defined, we now need to update our `App.vue` component and add a `<router-view/>` element to our `<template/>` block so that our newly added vue router knows where in our application it is meant to render the components.

```html
<template>
    ...
</template>
```

When you save this, there should be no distinguishable changes to how you app renders in the browser, the only difference is under the covers it is matching the `/` route to your `HomePage` component.

## Login Route and Component

Now that we have our homepage route defined, let's extend our app and add a few really simple additional routes and components that we will be fleshing out more in part 4 of this series.

We'll start by defining the `/login` and `/register` routes and creating their respective components:

# TODO

> **Action** - Create 1 more additional route for `/profile` which will map to a really simple `Profile.vue` component that just features a `<h2>Profile</h2>` template.

## Dynamic Routing - Individual Images

We'll want to create a route that allows us to access individual images and our previous method of hardcoding routes to given components may have worked for previous parts of our application, it will unfortunately not scale out well to this new bit of functionality.

This is where dynamic routing can come in and save the day. With dynamic routing, we can define routes that look a little like `/image/:id`. With this path defined, **any** route that matches this dynamic path will render the appropriate component.

The `:id` within this dynamic path can be captured within the logic of the component it is rendering and this can subsequently be used to request the image associated with that `:id` through `this.$route.params`.

<div class="filename"> console.log(this.$route.params) </div> 

```json
{
    "id": "test-id"
}
```



# Conclusion

I always feel like adding routing to your applications make them feel like "proper" applications and it's always exciting adding the placeholders for the login and authentication flow that every application tends to require.

So, in this tutorial, we have managed to extend our existing Vue.JS Imgur application to incoroprate routing and we have created some incredibly simple placeholder components which will be used to login, register and view routes which we will flesh out in the next part of this series.

## Further Reading:

In the next tutorial in this series, we are going to be taking a look at authentication with AWS' Cognito service. This will allow people to log in to our Imgur application and create accounts. 

* [Part 4 - Adding Authentication to Your Application](/projects/building-imgur-clone-vuejs-nodejs/part-4-authentication/)