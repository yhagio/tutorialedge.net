---
title: "Part 3 - Adding The Vue Router to our Application"
date: 2020-01-02T18:44:50+01:00
desc: In this tutorial series, we are going to be building an Imgur clone using Lambda functions written using Node.JS and a frontend built using Vue.JS
author: Elliot Forbes
weight: 3
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

With this installed, we can move on to creating our first routes!

## HomePage Route

The most obvious route to add will be the Home page route which will display the latest images that have been uploaded to the site by users. 

I tend to find having a `router/` directory at the same level as your `components/` directory in which an `index.js` file containing all of your route definitions tends to work best. 

<div class="filename"> frontend/src/router/index.js </div>

```js
import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './../components/HomePage.vue'

Vue.use(Router)

export default new Router({
    routes: [
      { path: '/', component: HomePage },
    ]
})

```

With this defined we can now tell our Vue.js application to use this newly defined vue router within our `main.js` at the root of our project like so:

<div class="filename"> frontend/src/main.js </div>

```js
import Vue from 'vue'
import App from './App.vue'
// we import the vue router from our router/index.js file
import router from './router'

Vue.config.productionTip = false

new Vue({
  router, // we tell our vue instance to use this vue router
  render: h => h(App),
}).$mount('#app')

```

With this defined, we now need to update our `App.vue` component and add a `<router-view/>` element to our `<template/>` block so that our newly added vue router knows where in our application it is meant to render the components. We'll also need to remove the `HomePage` component import as the vue router will now handle that for us!

```html
<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style>
</style>
```

When you save this, there should be no distinguishable changes to how you app renders in the browser, the only difference is under the covers it is matching the `/` route to your `HomePage` component.

## Login Route and Component

Now that we have our homepage route defined, let's extend our app and add a few really simple additional routes and components that we will be fleshing out more in part 4 of this series.

We'll start by defining the `/login` and `/register` routes and creating their respective components. 

Let's create a new component file called `Login.vue` that is going to simply print out `Login Page` at the top:

<div class="filename"> frontend/src/components/Login.vue </div>

```html
<template>
    <div>
        <h2>Login Page Placeholder</h2>
    </div>
</template>

<script>
export default {
    name: 'Login'
}
</script>

<style scoped>

</style>

```

With this created, the next step will be to add a new route that directs any incoming requests to `/login` to our newly defined `Login.vue` component. Let's do that now:

<div class="filename"> frontend/src/router/index.js </div>

```js
import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './../components/HomePage.vue'
import Login from './../components/Login.vue'

Vue.use(Router)

export default new Router({
    routes: [
      { path: '/', component: HomePage },
      { path: '/login', component: Login },
    ]
})

```

Next, we will want to update our `Navbar.vue` component so that we can hit this newly defined route from within our app itself. 

Now, we could update the existing `<a>` tags to point to this newly defined route, however, it is much better practice to use the `<router-link>` tags instead when working within Vue.js as it has been developed to work far more nicely within Vue.js by doing things like preventing page reloads.

<div class="filename"> frontend/src/components/Navbar.vue </div>

```html
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Imgur Clone</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">
            Home
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="login">Login</router-link>
        </li>
      </ul>
      <span class="navbar-text">@Elliot_F</span>
    </div>
  </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style>
</style>

```

Now, at this point, you should be able to click on this `Login` link at the top of your application and it should display something that looks like this within your browser:

![Working Vue Router!](https://images.tutorialedge.net/images/imgur-clone/vue-router-01.png)

## Register Route and Component

Next, we will need a custom route and component for people that wish to register within our application. 

Let's create another component called `Register.vue` within our `components/` directory and add another new route and link to this now:

<div class="filename"> frontend/src/components/Register.vue </div>

```html
<template>
    <div>
        <h2>Register Page Placeholder</h2>
    </div>
</template>

<script>
export default {
    name: 'Register'
}
</script>

<style scoped>

</style>

```

Next, let's add the new route:

<div class="filename"> frontend/src/router/index.js </div>

```js
import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './../components/HomePage.vue'
import Login from './../components/Login.vue'
import Register from './../components/Register.vue'

Vue.use(Router)

export default new Router({
    routes: [
      { path: '/', component: HomePage },
      { path: '/login', component: Login },
      { path: '/register', component: Register },
    ]
})

```

And finally, let's update our `Navbar.vue` component so that we have a new link to this route:

<div class="filename"> frontend/src/components/Navbar.vue </div>

```html
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Imgur Clone</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">
            Home
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="login">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="register">Register</router-link>
        </li>
      </ul>
      <span class="navbar-text">@Elliot_F</span>
    </div>
  </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style>
</style>

```

Awesome, we have now successfully defined 3 static routes as well as their respective components and updated our application so that we can easily navigate to these routes!

> **Action** - Create 1 more additional route for `/profile` which will map to a really simple `Profile.vue` component that just features a `<h2>Profile</h2>` template.

## Dynamic Routing - Individual Images

We'll want to create a route that allows us to access individual images and our previous method of hard coding routes to given components may have worked for previous parts of our application, it will unfortunately not scale out well to this new bit of functionality.

This is where dynamic routing can come in and save the day. With dynamic routing, we can define routes that look a little like `/image/:id`. With this path defined, **any** route that matches this dynamic path will render the appropriate component.

The `:id` within this dynamic path can be captured within the logic of the component it is rendering and this can subsequently be used to request the image associated with that `:id` through `this.$route.params`.

<div class="filename"> console.log(this.$route.params) </div> 

```json
{
    "id": "test-id"
}
```

Let's create a new component called `Single.vue` that will display a single image as well as that image's metadata further down the line:

<div class="filename"> frontend/src/components/Single.vue </div>

```html
<template>
    <div>
        <h2>Single Image</h2>
    </div>
</template>

<script>
export default {
    name: 'Single'
}
</script>

<style scoped>

</style>
```

With this in place, let's add another route to our `router/index.js` file:

<div class="filename"> frontend/src/router/index.js </div>

```js
import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './../components/HomePage.vue'
import Login from './../components/Login.vue'
import Register from './../components/Register.vue'
import Single from './../components/Single.vue'

Vue.use(Router)

export default new Router({
    routes: [
      { path: '/', component: HomePage },
      { path: '/login', component: Login },
      { path: '/register', component: Register },
      { path: '/:id', component: Single },
    ]
})
```

Notice how here we have used `/:id` as our path. The `:` within this is important as it means it will denote this part of the URL as a dynamic segment. We can then use this dynamic segment as a means of identifying what image we want to display within our app. 

With this dynamic route in place, let's have a look at how we can capture this dynamic segment value within the our `Single.vue` component:

<div class="filename"> frontend/src/components/Single.vue </div>

```html
<template>
    <div>
        <h2>Single Image: {{ $route.params.id }}</h2>
    </div>
</template>

<script>
export default {
    name: 'Single'
}
</script>

<style scoped>

</style>
```

Now, when you navigate to `/random-id` within your application, you should see that it displays something like this in the browser:

![Working Vue Router!](https://images.tutorialedge.net/images/imgur-clone/vue-router-02.png)

# Conclusion

I always feel like adding routing to your applications make them feel like "proper" applications and it's always exciting adding the placeholders for the login and authentication flow that every application tends to require.

So, in this tutorial, we have managed to extend our existing Vue.JS Imgur application to incorporate routing and we have created some incredibly simple placeholder components which will be used to login, register and view routes which we will flesh out in the next part of this series.

> **Source Code** - The up to date code for this part of the series can be found here: [elliotforbes/imgur-clone-vuejs-nodejs](https://github.com/elliotforbes/imgur-clone-vuejs-nodejs/tree/861c195270f2cf2c669a762ab7d4da839607fd6d)

## Further Reading:

In the next tutorial in this series, we are going to be taking a look at building our own AWS Lambda functions, with the help of the serverless cli, that will allow us to store, retrieve and delete images in our application.

> **Under Construction** - The next tutorial in this series is currently under construction!

<!-- * [Part 4 - Adding Authentication to Your Application](/projects/building-imgur-clone-vuejs-nodejs/part-4-authentication/) -->