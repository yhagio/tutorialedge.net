---
author: Elliot Forbes
date: 2018-03-04T15:03:41Z
desc: In this tutorial we are going to look at how you can successfully handle events
  within your VueJS applications.
image: vuejs.png
series: vuejs
tags:
- vuejs
- webdev
title: Vuejs Event Handling Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 3
---

> The official documentation for VueJS event handling can be found here: [VueJS Event Handling](https://vuejs.org/v2/guide/events.html).

In this tutorial, we are going to look at how you can successfully handle events within your VueJS applications. This is by no means a replacement for the official documentation, think of it more so as a suplementary guide filled with live examples!

If you get through this I would love to hear your feedback either in the comments section or on twitter: [@Elliot_F](https://twitter.com/Elliot_F).

# Introduction

Being able to handle events in some manner is vital if you want to be able to make awesome real time applications with VueJS. Thankfully, VueJS allows us to handle events in a fairly easy fashion and this is just one of the reasons that I'm becoming a big fan of the framework!


# A Simple Example

Let's kick this tutorial off by dealing with a standard button click event. So initially we will need a `<button/>` element, and a method defined in our Vue instance that we can then map to a `click` event.

VueJS allows us to listen to these DOM events using the `v-on` directive and subsequently perform this mapping of any events to an appropriate bit of JavaScript. For example, this button below is mapped to the JS: `counter = counter + 1`. Not to a particular function but this will still work.

<div id="demo1">
    <button class="btn btn-primary" v-on:click="counter = counter +1">Counter: {{ counter }}</button>
</div>

```xml
<div id="demo1">
    <button class="btn btn-primary" 
        v-on:click="counter = counter +1">
        Counter: {{ counter }}
    </button>
</div>
```

Our Vue instance for the above demo looks something like this:

```js
new Vue({
    el: '#demo1',
    data: {
        counter: 0
    }
})
```

Nice and simple so far, but what happens if we want to do something a little more complex? Well, we can encapsulate all of the JavaScript code we wish to execute into a function that will live within our VueJS Instance. We can then change our `v-on:click` directive to point towards the name of our function like so:

<div id="demo2">
    <button class="btn btn-primary" v-on:click="update()">Counter: {{ counter }}</button>
</div>

The HTML for the above code looks something like so:

```xml
<div id="demo1">
    <button class="btn btn-primary" 
        v-on:click="update()">
        Counter: {{ counter }}
    </button>
</div>
```

And the Vue instance that has been created features our newly referenced `update()` function, this also subsequently logs `Hello World` to your console. You can see this by opening up your browser's console by right clicking and clicking `Inpsect Element`.

```js
new Vue({
    el: '#demo2',
    data: {
        counter: 0
    },
    methods: {
        update: function() {
            console.log("Hello World")
            this.counter += 2
        }
    }
})
```

## Keyboard Input

Say you wanted to add functionality on a certain key press event within your application, you could do this by using `keyup.key` combined with the `v-on` directive like so:

```html 
<div id="demo3">
    <input v-on:keyup.enter="submit" v-model="message" placeholder="test me out!">
</div>
```

Let's now create our Vue instance:

```js
new Vue({
    el: '#demo3',
    data:{
        message: ''
    },
    methods: {
        submit: function() {
            alert('Submitted: ' + this.message)
        }
    }
})
```

Now, Vuejs has aliased all of the most popular keys for us. This includes:

* `.enter`
* `.tab`
* `.delete`
* `.esc`
* `.space`
* `.up`
* `.down`
* `.left`
* `.right`

If you wish to use something outwith this list, then you will have to use the specific key code for that key. You can see the full list of key codes here: [Mozilla Key Codes](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode).

## In Action

Let's see this in action, try and enter a message into the input below and then click the `enter` key. You should see an alert popup with the contents of the input.

<div id="demo3">
    <input v-on:keyup.enter="submit" v-model="message" placeholder="test me out!">
</div>

# Conclusion

So, in this tutorial, we covered how you can effectively handle events within your VueJS applications. Hopefully you enjoyed this! If you did then please let me know in either the comments section below or on twitter: [@Elliot_F](https://twitter.com/Elliot_F).


<script>
new Vue({
    el: '#demo1',
    data: {
        counter: 0
    }
})

new Vue({
    el: '#demo2',
    data: {
        counter: 0
    },
    methods: {
        update: function() {
            console.log("Hello World")
            this.counter += 2
        }
    }
})

new Vue({
    el: '#demo3',
    data:{
        message: ''
    },
    methods: {
        submit: function() {
            alert('Submitted: ' + this.message)
        }
    }
})
</script>