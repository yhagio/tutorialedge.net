---
author: Elliot Forbes
date: 2018-03-01T12:36:54Z
desc: In this tutorial, we are going to be looking at how you perform HTTP requests
  within your VueJS application
image: vuejs.png
series: vuejs
tags:
- vuejs
- javascript
title: Vuejs HTTP Requests with Axios Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 4
---

> This Tutorial builds off the starter application that we generated in the [Getting Started with VueJS](/javascript/vuejs/getting-started-with-vuejs/) article.

In this article, we are going to look at how you can use the `axios` library to make `HTTP` requests within your VueJS 2 applications. The `axios` framework is without a doubt the most popular `HTTP` frameworks to use within the framework and makes the job of sending requests simple.

# Installing Axios

In order to install the `axios` client, you can use `npm` like so:

{{< highlight html >}}
$ npm install --save axios
{{< /highlight >}}

# GET Requests

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

## The Response Object

Whenever we make a `HTTP` request to something, we will get back a `response` object that features the following:

~~~js
axios.get('MY_URL')
    .then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
    });
~~~ 

You can then do cool things like check to see what status is returned as your response. 

# POST Requests

If you want to send `POST` requests to a service then you certainly can simply by changing the above code to `axios.post(URL)`. Again, this method returns a promise so you will still need `.then()` and `.catch()` to catch the response from this promise.

```js
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      pokemon: {}
    }
  },
  created () {
    axios.post('https://pokeapi.co/api/v2/pokedex/kanto/')
      .then(response => {
        this.pokemon = response.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
```

## Modifying Headers

Say, for example, you had an authorized endpoint that required some headers to be set in order to hit that endpoint. An example of this that I have faced recently was when I needed to hit an authorized API endpoint on AWS. In order for me to hit this endpoint, I had to first set the `Authorization` header 

~~~js
axios.defaults.headers.common['Authorization'] = result;
~~~

We can then make any `HTTP` requests as we normally would and it should include the newly set `Authorization` header. 

## Alternative Method of Setting Headers 

Another way of modifying headers is to define a JavaScript object like so:

~~~js
var options = { headers: { 'Content-Type': file.type } } 
~~~

# Other HTTP Verbs

Whilst, I have just used the `POST` and `GET` HTTP verbs to demonstrate how you can use axios to send HTTP requests, there are others. These are all of the verbs that you can use to query RESTful API endpoints.

~~~bash
- post
- put
- patch
- get
- head
- delete
- options
~~~

# Conclusion

Hopefully, this article showed you everything you need in order to make `HTTP` requests within your VueJS applications. If you need further help then please let me know in the comments section below or by tweeting me: [@Elliot_F](https://twitter.com/elliot_f).