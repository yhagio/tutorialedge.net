---
title: "Vuejs HTTP Requests with Axios Tutorial"
date: 2018-03-01T12:36:54Z
draft: true
desc: "In this tutorial, we are going to be looking at how you perform HTTP requests within your VueJS application"
author: "Elliot Forbes"
tags: ["vuejs", "javascript"]
series: ["vuejs"]
twitter: "https://twitter.com/Elliot_F"
---

> This Tutorial builds off the starter application that we generated in the [Getting Started with VueJS](/javascript/vuejs/getting-started-with-vuejs/) article.

In this article, we are going to look at how you can use the `axios` library to make `HTTP` requests within your VueJS 2 applications. The `axios` framework is without a doubt the most popular `HTTP` frameworks to use within the framework and makes the job of sending requests simple.

## Installing Axios

In order to install the `axios` client, you can use `npm` like so:

{{< highlight html >}}
$ npm install --save axios
{{< /highlight >}}

## GET Requests

Let's attempt to perform a `HTTP` `GET` request that will retrieve all of the pokemon from the official Pokemon API that is free to use! We'll modify the `HelloWorld.vue` that is generated with the `vue init webpack` command.

We are going to want to perform a `GET` request to this Pokemon API on the loading of our component, so in order to do that we are going to want to add the `created` lifecycle hook to our `<script/>` section and then put our `axios.get()` request within that.

```ts
<template>
  <div class="hello">
    {{ pokemon }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      pokemon: {}
    }
  },
  created () {
    axios.get('https://pokeapi.co/api/v2/pokedex/kanto/')
      .then(response => {
        console.log(response)
        this.pokemon = response.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped></style>
```

The `axios.get()` call returns a promise, when this resolves our `.then()` or our `.catch()` depending on if our call is successful or whether it returns an error. 

Should the request be successful, you should see the Pokemon JSON Response render out within your `HelloWorld` component.  

## POST Requests

> Under Construction

### Modifying Headers

> Under Construction

## PUT Requests

## DELETE Requests

## Conclusion

Hopefully, this article showed you everything you need in order to make `HTTP` requests within your VueJS applications.  