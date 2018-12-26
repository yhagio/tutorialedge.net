---
author: Elliot Forbes
date: 2018-03-01T12:26:40Z
desc: In this tutorial we are going to look at how you can work with animations and
  transitions in VueJS
draft: false
image: vuejs.png
series: vuejs
tags:
- vuejs
- animations
- transitions
title: VueJS Animations and Transitions Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 6
---

In this tutorial, we are going to explore how we can use animations and transitions to make our VueJS web application really stand out from the crowd. 

# A Simple Transition

Let's start of by creating a few very simple transitions, these will simply fade in when a certain condition is met. I was watching Mission Impossible whilst writing this so the theme for this is a top secret mission. The finished product for this section is going to look something like this:

![finished product](/images/vuejs-animations.png)

So, if we break this down this shouldn't look as intimidating. We have 3 buttons within a div that when clicked basically flip a boolean value. When this is flipped, it triggers a transition in the black background `div` below. 

```html
<button class="btn btn-primary" v-if="!show" v-on:click="show = !show">
    Show Mission
</button>
<button class="btn btn-primary" 
    v-if="show && !accepted && !declined" v-on:click="accepted = true">
    Accept Mission
</button>
<button class="btn btn-warning" 
    v-if="show && !declined && !accepted" v-on:click="declined = true">
    Decline Mission
</button>
``` 

These all have a `v-if` directive attached to them to dictate when they are to show. Below these buttons we have 3 distinct `<transition/>` wrapper components. These `<transition/>` components allow you to enter/leave transitions when you are doing things like `v-if`, `v-show`, using dynamic components or in component root nodes.  

```html
<transition name="fade">
    <p v-if="show">Your Mission, should you choose to accept it...</p>
</transition>

<transition name="fade">
    <p v-if="accepted">You have accepted the mission, this message will self-destruct in 5...</p>
</transition>

<transition name="fade">
    <p v-if="declined">You have declined the mission, this message will self-destruct in 5...</p>
</transition>
```

Let's break down what happens when one of our `<p>` elements appears/disappears. Vue will automatically listen for whether one of these elements has a CSS transition or animation applied. If it does then these CSS transition classes will be added/removed at the appropriate time.

# Demo

<div id="app">
    <div class="hello">
        <button class="btn btn-primary" v-if="!show" v-on:click="show = !show">
            Show Mission
        </button>
        <button class="btn btn-primary" 
            v-if="show && !accepted && !declined" v-on:click="accepted = true">
            Accept Mission
        </button>
        <button class="btn btn-warning" 
            v-if="show && !declined && !accepted" v-on:click="declined = true">
            Decline Mission
        </button>
        <div class="cont center-align">
        <transition name="fade">
            <p v-if="show">Your Mission, should you choose to accept it...</p>
        </transition>
        <transition name="fade">
            <p v-if="accepted">You have accepted the mission, this message will self-destruct in 5...</p>
        </transition>
        <transition name="fade">
            <p v-if="declined">You have declined the mission, this message will self-destruct in 5...</p>
        </transition>
        </div>
    </div>
</div>

# Full Component Source

This is the full source code for the component with simple transitions:

```html
<template>
    <div class="hello">
      <h1>VueJS <span>Animations</span> and <span>Transitions</span> Tutorial</h1>

        <button class="btn btn-primary" v-if="!show" v-on:click="show = !show">
            Show Mission
        </button>
        <button class="btn btn-primary" 
            v-if="show && !accepted && !declined" v-on:click="accepted = true">
            Accept Mission
        </button>
        <button class="btn btn-warning" 
            v-if="show && !declined && !accepted" v-on:click="declined = true">
            Decline Mission
        </button>

      <div class="cont center-align">
        <transition name="fade">
          <p v-if="show">Your Mission, should you choose to accept it...</p>
        </transition>

        <transition name="fade">
          <p v-if="accepted">You have accepted the mission, this message will self-destruct in 5...</p>
        </transition>

        <transition name="fade">
          <p v-if="declined">You have declined the mission, this message will self-destruct in 5...</p>
        </transition>

      </div>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      show: false,
      accepted: false,
      declined: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.btn-primary{
  background-color:#256BFC;
}
.btn-warning{
  background-color: #C81117;
}
.cont {
  background-color: #000;
  width: 100%;
  height: 400px;
  margin-top: 40px;
  padding: 40px;
}

div {
  color: white;
}
h1 {
  font-weight: normal;
  color: white;
  font-weight: 100;
  font-size: 58px;
}
h1 span {
  font-weight: 900;
}
</style>
```

# Conclusion

That wraps up this tutorial! I hope you found it enlightening and educational! If you enjoyed it then please let me know in the comments section below! 

<div id="app">
    {{ msg }}
</div>


<script>
var app = new Vue({
    el: '#app',
    data () {
        return {
            show: false,
            accepted: false,
            declined: false
        }
    }
})
</script>

<style>
.hello .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.hello .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.hello .btn-primary{
  background-color:#256BFC;
}
.hello .btn-warning{
  background-color: #C81117;
}
.hello .cont {
  background-color: #000;
  width: 100%;
  height: 200px;
  margin-top: 40px;
  padding: 40px;
  color: white;
}
</style>