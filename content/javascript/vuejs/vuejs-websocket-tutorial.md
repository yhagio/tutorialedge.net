---
title: "Vue.js WebSocket Tutorial"
date: 2020-03-31T20:16:28+01:00
desc: In this tutorial, we are going to look at how you can add WebSocket communication to your Vue.js applications.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: vuejs
image: vuejs.svg
tags:
- intermediate
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

I love playing with WebSockets, they are a very cool bit of technology that allow for incredibly efficient two-way (duplex) communication over a single long-lived TCP connection.

In this tutorial, we are going to be exploring the wonderful world of WebSockets and how you can integrate them into your Vue.js applications by building a really simple app that utilizes WebSocket connections.

## Video Tutorial

If you prefer, this tutorial is available in video format!

{{< youtube id="4via-J98jwM" autoplay="false" >}}

## Setting Up Our Project

Let's start by creating a new Vue.js application using the `vue cli`, we'll call this `vuejs-websocket-tutorial` to keep things nice and simple.

```output
$ vue create vuejs-websocket-tutorial
$ cd vuejs-websocket-tutorial
```

We can then serve this project by calling `yarn serve` and it will start up our simple Vue.js application for us on `http://localhost:8080`.

## Simple Approach - Logic Within Components

Let's take a look first at the simple approach. With this approach we will define all of the connection logic and the communication logic for our components within the component that does the communication.

This approach is ideal for simple apps that aren't likely to grow in complexity. 

<div class="filename"> App.vue </div>

```html
<template>
  <div id="app">
    <h2>Vue.js WebSocket Tutorial</h2> 
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

Let's start by adding a `created` function to our component definition. 

```js
export default {
  name: 'App',
  data: function() {
    return {
      connection: null
    }
  },
  created: function() {
    console.log("Starting connection to WebSocket Server")
    this.connection = new WebSocket("wss://echo.websocket.org")

    this.connection.onmessage = function(event) {
      console.log(event);
    }

    this.connection.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }

  }
}
```

You'll note that within this `created` function we have also defined a couple of callback functions that will be triggered by the client receiving a message from the WebSocket connection and when the WebSocket connection is successfully opened between the client and the server.

These aren't the only callbacks you can define:

* **onclose** - This is triggered whenever the connection between the client and the server is closed.
* **onerror** - This is triggered whenever there is an error between the client and the server.

### Sending Messages Over the WebSocket Connection

With this connection logic now in place, let's look at how we can start sending some messages to this WebSocket server which will in turn echo the message back to us!

We can achieve this by creating a new function within our `methods` block of our component like so:

```js
  methods: {
    sendMessage: function(message) {
      console.log(this.connection);
      this.connection.send(message);
    }
  },
```

I've added a simple `console.log` statement to the start of this function to print out the state of the connection object. This is purely to see the state of the connection just prior to calling the `send` method on our open connection to send a message to this server.

The final piece of the puzzle is adding a simple button to our `App.vue` component that will trigger this `sendMessage` function. 

For this, we'll just use a really simple button element that will hardcode the message:

```html
<template>
  <div id="app">
    <h2>Vue.js WebSocket Tutorial</h2> 
    <button v-on:click="sendMessage('hello')">Send Message</button>
  </div>
</template>
```

With this in place, check out the app in the browser and open the browser tools so that you can view the console output. Refresh the page and you should see the successful `onopen` connection message printed out, and, when you press the button you will be able to see that the message is successfully sent and echoed back by the websocket server.

Awesome! We have been able to implement two-way communication between a remote server from within our `App.vue` component!

### Full Component Code

With everything pieced together, we should now have an `App.vue` component that looks a little something like this:

<div class="filename"> App.vue </div>

```html
<template>
  <div id="app">
    <h2>Vue.js WebSocket Tutorial</h2> 
    <button v-on:click="sendMessage('hello')">Send Message</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      connection: null
    }
  },
  methods: {
    sendMessage: function(message) {
      console.log("Hello")
      console.log(this.connection);
      this.connection.send(message);
    }
  },
  created: function() {
    console.log("Starting connection to WebSocket Server")
    this.connection = new WebSocket("wss://echo.websocket.org")

    this.connection.onmessage = function(event) {
      console.log(event);
    }

    this.connection.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```

<!-- TODO: Add The WebSocket Service -->
<!-- ## Building a WebSocket Service

Now that we have covered the simpler approach, let's have a look at a more advanced approach for the Vue.js applications that are more complex and feature multiple components communicating over the same connection.

In this approach, we'll define a service within a `websocket.js` file which will 

<div class="filename"> src/services/websocket.js </div>

```js
console.log("WebSocket Service");
```

With this in place, we can now update one of our Vue.js components to interact with this service. -->

## Adding Vuex

As your applications start to grow and the state within the application starts to become a little more complex, it may come time to consider adding Vuex into your application so that you can elegantly handle and store state across all of your components.

If you are in this position, then it would be worthwhile checking out another tutorial I have on the site that looks at how you can [store and manage state in your Vue.js applications using Vuex](/javascript/vuejs/managing-state-with-vuex-vuejs/)

## Conclusion

So, in this tutorial, we have managed to build a really simple Vue.js application that utilizes WebSockets as a means of communication. 

I hope you enjoyed this tutorial, if you have any comments or would like any further help then pleas feel free to let me know in the comments section below!

### Further Reading:

If you enjoyed this tutorial, you may also like these other tutorials on the site:

* [Project - Building an Imgur Clone with Vue.js and Node.js](/projects/building-imgur-clone-vuejs-nodejs/)
* [Managing State in Vue.js with Vuex](/javascript/vuejs/managing-state-with-vuex-vuejs/)