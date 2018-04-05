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

```s
// Npm
$ npm install vuex
// Yarn
$ yarn add vuex
```

## Setting up Vuex

Once you have successfully installed Vuex in your VueJS application, you can set your application to use it by doing the following:

```js
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

``` 