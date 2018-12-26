---
author: Elliot Forbes
date: 2018-03-31T19:06:13+01:00
desc: In this tutorial, we are going to look at how you can manage state within your
  VueJS application using Vuex
image: vuejs.png
series: vuejs
tags:
- vuejs
- javascript
title: Managing State With Vuex in Vuejs
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 1
---

State management is something you will ultimately have to deal with as you create increasingly complex frontend applications. Thankfully, with the help of Vuex, this isn't as hard as you may think! 

# Installation

In order to install `vuex`, you will have to use either `yarn` or `npm` like so:

```s
# Npm
$ npm install vuex
# Yarn
$ yarn add vuex
```

# Setting up Vuex

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

# Core Concepts

So, there are 5 core concepts you will have to become familiar with if you wish to use `vuex` as your application's state management system.

## State

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

## Mutations

Mutations within the `vuex` world allow us to update the `state` of our application. These are very similar to event handlers and each mutation has a string type and a handler. 

Effectively, if you wished to update the `name` within our `state` object above, you could do so through a `mutation`. This `mutation` has to be invoked through the use of an `action` which we'll cover in the next section. 

Let's have a look at how we would create a `updateName` mutation which would allow us to change our `name` value within our `state` object:

```js
import Vuex from 'vuex'
import Vue from 'vue'

export const store = new Vuex.Store({
  state: {
    name: 'elliot'
  },
  mutations: {
    updateName (state, newname) {
      state.name = newname
    }
  }
})
```

## Actions

Actions allow us to `commit` mutations. What this means is that should we wish to update the `name` of our `state` object above, we would trigger an action using the `store.dispatch()` method and passing in the string name of the action we wish to call. 

The main reason we have this level of abstraction away from our `mutations` is so that we can make asynchronous requests. All mutations have to be synchronous, so by having our `actions` perform any asynchronous code and then `commit`-ing the result to a mutation, we manage to get round this.  

```js
import Vuex from 'vuex'
import Vue from 'vue'

export const store = new Vuex.Store({
  state: {
    name: 'elliot'
  },
  mutations: {
    updateName (state, newname) {
      state.name = newname
    }
  },
  actions: {
    updateName ({ commit }) {
      commit('updateName', 'Sophie')
    }
  }
})
```

Whenever we trigger the `updateName` action, the `name` stored within our `state` object will subsequently be updated to `Sophie`. 

We can trigger an `action` by doing the following:

```js
store.dispatch('updateName')
```

Due to the way we have registered our `vuex` store within our application, you can typically trigger this like so:

```js
this.$store.dispatch('updateName')
``` 

## Getters

There are some situations where we need to get compute a derived state based on stored state. For example, say we wanted the first initial of our `name` value that we have already stored, we could define a `Getter` that would compute this for us, cache the result and then return the result.

This caching is a major benefit and can help us to improve the performance of our application. `Getters` also refresh the cached result should any of the data that our result dependes upon be changed.

For example, if we had a `name` set to `elliot` originally, and we had a `getter` that returned `e` as the first initial, this `e` result would be cached for us. However, when we update the name by dispatching an `action`, this result would be updated to `S` as that would be the initial of `Sophie`. 

```js
import Vuex from 'vuex'
import Vue from 'vue'

export const store = new Vuex.Store({
  state: {
    name: 'elliot'
  },
  mutations: {
    updateName (state, newname) {
      state.name = newname
    }
  },
  actions: {
    updateName ({ commit }) {
      commit('updateName', 'Sophie')
    }
  },
  getters: {
    firstInitial: state => {
      return state.name[0]
    }
  }
})
```

If you are doing more expensive operations such as filtering a large list of objects then this starts to become more beneficial.

## Modules

> Still under construction

# Conclusion

Hopefully, you found this tutorial on `vuex` useful and it showed you everything you need in order to get started using it within your own Vue.js applications.

