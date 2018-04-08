---
title: "Managing State With Vuex in Vuejs"
date: 2018-03-31T19:06:13+01:00
draft: true
desc: "In this tutorial, we are going to look at how you can manage state within your VueJS application using Vuex"
author: "Elliot Forbes"
tags: ["vuejs", "javascript"]
weight: 1
series: ["vuejs"]
twitter: "https://twitter.com/Elliot_F"
---

State management is something you will ultimately have to deal with as you create increasingly complex frontend applications. Thankfully, with the help of Vuex, this isn't as hard as you may think! 

## Installation

In order to install `vuex`, you will have to use either `yarn` or `npm` like so:

```s
# Npm
$ npm install vuex
# Yarn
$ yarn add vuex
```

## Setting up Vuex

Once you have successfully installed Vuex in your VueJS application, you can set your application to use it by doing the following within your `main.js` file:

```js
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
// Import the store from the file we are about to create
import { store } from './store/index.js'

Vue.config.productionTip = false

Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // tell our vue instance to use our store
  store: store,
  router,
  components: { App },
  template: '<App/>'
})

``` 

We then have to define our `/src/store/index.js` file which will contain our `Vuex.Router()` object which we've imported and used in our `main.js` file above.

## Core Concepts

So, there are 5 core concepts you will have to become familiar with if you wish to use `vuex` as your application's state management system.

### State

State is the object representation of your applications state. This could be as simple as this if we wanted to store a 'name' value within our application:

```js
import Vuex from 'vuex'
import Vue from 'vue'

export const store = new Vuex.Store({
  state: {
    name: 'elliot'
  }
})
```

If we wanted to make it more complex then we simply need to expand out our state object to store everything we need. This could be arrays, boolean values, nested objects or any of the 5 primitives types within JavaScript.

### Mutations

### Actions

### Getters

### Modules


## Conclusion

Hopefully, you found this tutorial on `vuex` useful and it showed you everything you need in order to get started using it within your own Vue.js applications.

