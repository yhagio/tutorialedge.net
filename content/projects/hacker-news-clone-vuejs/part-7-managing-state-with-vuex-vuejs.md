---
title: "Part 7 - Managing State with Vuex in your VueJS Applications"
date: 2018-03-19T16:24:13Z
draft: true
desc: "In this tutorial, we are going to look at how you can manage state within your VueJS applications using vuex"
author: "Elliot Forbes"
tags: ["vuejs", "javascript"]
image: "vuejs.png"
weight: 7
series: [ "hackernewsclone" ]
twitter: "https://twitter.com/Elliot_F"
---

In this tutorial, we are going to be adding Vuex to our VueJS application. We'll be looking at how we can improve the performance of our application and persist data between route changes. 

## Why Vuex?

Vuex is a state management pattern + library for Vue.js applications. Essentially, it acts as a centralized store for all components in an application. 

### Vuex Core Concepts

Before we continue to flesh out our VueJS application, we should really ground ourselves with the core concepts of Vuex. There are 5 main concepts we'll need to get our heads round, `state`, `getters`, `mutations`, `actions`, and `modules`.

* *State* : Our `state` contains everything we wish to store within our `Vue.js` application.  
* *Actions* : Actions are what we call to interact with our state, these trigger `mutations` which in turn do any modifications necessary to our `state`.
* *Mutations* : These perform the act of updating our applications `state`, they are triggered by `actions`. 
* *Getters* : These are functions that return commonly computed results. Say for example you wanted to filter our list of articles to only show those with a score above `100`. You could define a `getter` once that would do just that. This result is then cached until the data it relies upon is changed and using `getters` are a good way to improve application performance.
* *Modules* : `modules` allow us to split our more complex application's state into a series of smaller components, thus simplifying our state.   

## Installing Vuex

First things first, we will have to install `vuex` using our package manager of choice. As I've been using yarn for this series, I'll be using yarn to install this package.

```s
# npm
$ npm install vuex
# Yarn
$ yarn add vuex
```

Once we have successfully installed `vuex` we can go ahead and start using this wonderful package.

## Setting up a Store

The first thing we need to do is to create a new directory `/src/store/`. This will contain the code for our store that our application will rely upon.

Let's create a new file `index.js` within this directory. In this file we will be creating a `store` object that will be of type `Vuex.Store({})`. Within this object we are going to define a `state` property as well as a `mutations` property. 

Within our `state` property we will store all of our application's cached articles and comments.

```js
import Vuex from 'vuex'
import Vue from 'vue'

export const store = new Vuex.Store({
  state: {
    articles: []
  },
  mutations: {}
})
```

Now that we've set this up, we need to ensure that we call `Vue.use(Vuex)` to explicitly install Vuex into our HackerNews application. We can do this just below our `import` statements:

```js
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    articles: []
  },
  mutations: {}
})
```  

> It should be noted that whilst we are storing everything in the one file for now, it's typically recommended to split your `mutations`, your `actions` and any modules you may have into separate files and directories. Check out the [official docs](https://vuex.vuejs.org/en/structure.html) for more on this. 

## Updating our main.js File

Now that we've created our basic vuex store, we need to ensure our Vue instance is using this newly defined store by adding it to our root instance in our `main.js` file:

```js
import Vue from 'vue'
import App from './App'
import router from './router'
/* Here we import our store from our newly defined index.js file */
import { store } from './store/index.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store, /* Here we ensure our Vue instance uses our store */
  components: { App },
  template: '<App/>'
})
```


## Vuex Basics

Now that we've set up our application to use our newly defined store, let's test to see if it all works. Open your `Homepage.vue` component file and then within your `created: function()` block, add: 

```js
console.log(this.$store.state.articles)
```

Now, when you refresh your page, you should see an empty array print out in the console. We've been able to successfully create a store, and then query said store from a component within our application.

Currently, this doesn't really provide much extra value on top of what we already have. Let us change this now by adding a few `actions` to our store. These will actually perform the API requests needed to retrieve all articles and comments etc.

Create a new file, `actions.js` within your `/src/store/` directory. This is where we will define our `vuex` actions.

## Updating our State

We want to store both our `topStories` and our `newStories`, so we will need to not only update our `/src/store/index.js` to import the mutations file we will be creating in the next section and we will need to update our `state` object to contain an array of `topStories` and `newStories`.

```js
import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions.js'
import mutations from './mutations.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    topStories: [],
    newStories: []
  },
  mutations,
  actions
})
```

## Defining our Mutations

We need to define a mutation that will update our `state`'s `topStories` and `newStories` arrays. These will simply take in an article and push said article to the respective array depending on what `mutation` was called. Create a new file called `/src/store/mutations.js` and then add the following:

```js
export default {
  APPEND_TOP_STORY: (state, article) => {
    state.topStories.push(article)
  },
  APPEND_NEW_STORY: (state, article) => {
    state.newStories.push(article)
  }
}
```

## Defining our Actions

Now that we've defined our mutations, we need to add our `actions` that will use these `mutations`. We'll call these `fetch_top_stories` and `fetch_new_stories` respectively. These will simply hit the appropriate API endpoints and then commit the retrieves stories to our store.

```js
import axios from 'axios'

export default {
  fetch_top_stories: ({ commit }) => {
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(resp => {
        let results = resp.data.slice(0, 25)
        results.forEach(element => {
          axios.get('https://hacker-news.firebaseio.com/v0/item/' + element + '.json')
            .then((result) => {
              commit('APPEND_TOP_STORY', result)
            })
            .catch((err) => {
              console.log(err)
            })
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  fetch_new_stories: ({ commit }) => {
    axios.get('https://hacker-news.firebaseio.com/v0/newstories.json')
      .then(resp => {
        let results = resp.data.slice(0, 25)
        results.forEach(element => {
          axios.get('https://hacker-news.firebaseio.com/v0/item/' + element + '.json')
            .then((result) => {
              commit('APPEND_NEW_STORY', result)
            })
            .catch((err) => {
              console.log(err)
            })
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
```

## Updating our Homepage.vue and our New.vue Components

Now that we've defined everything we need with regards to our `actions`, `mutations` and `store`, it's time to update our `Homepage.vue` and `New.vue` components so that they retrieve the topStories from the store or trigger a `fetch_top/new_stories` action should the store not contain any stories.

### New.vue component

```js
data: function () {
  return {
    err: '',
    stories: this.$store.state.newStories
  }
},
created: function () {
  if (this.$store.state.newStories.length === 0) this.$store.dispatch('fetch_new_stories')
}
```

### Homepage.vue component

```js
data: function () {
  return {
    err: '',
    stories: this.$store.state.topStories
  }
},
created: function () {
  if (this.$store.state.topStories.length === 0) this.$store.dispatch('fetch_top_stories')
}
```

Hopefully, you will agree, that by moving off our state management code into `vuex`, we have managed to greatly simplify some of our components. 

## Conclusion

In this section of the course, we managed to add Vuex to our HackerNews clone application. This helped to improve the performance of our application by caching API results in a simple store so that we don't have to make a series of new API requests every time we navigate to a page we have already visited. 

I would recommend looking at the official HackerNews project in order to look at how you can do things such as cache refreshing every 5 minutes and 

Hopefully, you found this enjoyable and educational! In the next part of this series, we are going to be looking at how you can build your VueJS application so that it's ready for deployment to production!



