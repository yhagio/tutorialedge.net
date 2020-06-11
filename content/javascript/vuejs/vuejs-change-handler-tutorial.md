---
title: "Vue.js Change Handler Tutorial"
date: 2019-08-11T13:35:05+01:00
desc: In this tutorial, we are going to be looking at how you can effectively watch for changes within a Vue.JS applications.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: vuejs
image: vuejs.png
tags:
- beginner
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

Welcome fellow programmers! In this tutorial, we are going to be looking at how you can effectively watch for changes in your application and trigger functions whenever particular data properties are updated. 

In order to demonstrate this, we'll be creating a simple login form component that will watch for changes to the `username` field and perform some validation whenever that username is updated. We'll be triggering some really simple animations in Vue.JS whenever the inputted username meets our validation requirements. 

This will hopefully give you a good idea as to how you can take this forward and implement change handlers within your own Vue.JS applications.

# Prerequisites

You should have the following installed on your machine to ensure that you can complete this tutorial:

* `yarn` cli - for dependency management and serving your Vue.JS application
* `vue` cli - for generating new Vue.JS applications

# Introduction

Let's start off by creating a new Vue.JS application using the `vue` cli. 

```output
$ vue create vuejs-change-handler
```

This will create a new Vue.JS project for us to use and play about with in a `vuejs-change-handler` directory. Open this directory up in your code editor and then navigate to `App.vue`. We'll be doing the majority of our work in here to keep the tutorial simple.

```html
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
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

Awesome, we'll start off by removing the references to the `HelloWorld` component that the cli helpfully creates for us:

```html
<template>
  <div id="app">
      <h2>Vue.JS Change Handler Tutorial</h2>
  </div>
</template>

<script>
export default {
  name: 'app',
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

Cool, we now have a foundation for the rest of our project!

# Implementing Change

Let's dive in to how we would effectively handle changes within our app. We'll be creating `form` with a single input field which will feature the `v-model` attribute equal to `username`. Within the `data` of our simple component, we'll also be defining this matching `username` data value.

```html
<template>
     <div id="app">
        <div class="login center">
          <h2>Vue.JS Change Handler Tutorial</h2>

          <form>
              <div class="medium-6 cell">
                  <label>Username
                  <input type="text" placeholder=".medium-6.cell" v-model="username">
                  </label>
                </div>
          </form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'app',
  data: function() {
    return {
      username: '',
    }
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

Awesome, so we have an input field which now takes in a username, the next step is to implement a watcher that will feature a `handler` function 

Let's add a `watch` attribute to our `app` component and within that will house a new handler function that will be triggered every time our `username` is updated. 

```js
export default {
  name: 'app',
  data: function() {
    return {
      username: '',
    }
  },
  watch: {
    username: {
      handler (newValue, oldValue) {
        /* eslint-disable-next-line */
        console.log(newValue) 
      },
      immediate: true
    }
  }
}
```

In the `watch` section of our component, we define a `handler` function that will be triggered whenever our `username` changes within our app. Open up the 

# Conclusion

So, in this tutorial, we have looked at how you can build your own change handler functions in Vue.js. If you enjoyed this article, or have any comments or issues then please let me know in the comments section below!

## Further Reading

If you enjoyed this article then you may enjoy some of the other tutorials on our site:

* [Vue.js WebSocket Tutorial](/javascript/vuejs/vuejs-websocket-tutorial/)
* [Vue.js Animations and Transitions Tutorial](/javascript/vuejs/vuejs-transitions-animations-tutorial/)