---
title: "Part 3 - Adding The Vue Router to our Application"
date: 2019-08-20T18:44:50+01:00
draft: true
desc: In this tutorial series, we are going to be building an Imgur clone using Lambda functions written using Node.JS and a frontend built using Vue.JS
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: vuejsimgurclone
image: vuejs.png
tags:
- beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In the last tutorial in this series, we looked at building a really simple component within our Imgur application. Now that we have some fo the basics under our belt when it comes to building components, it's time to look at how we can start building a more complex application and introduce multiple components and a router that allows us to switch between rendering certain components.

# Introduction

In this tutorial, we'll be looking primarily at how you can set up your Vue.JS application to use the incredibly popular `vue router` package. We'll be covering how routing works in terms of all Single Page Applications, and then how it specifically works within Vue.JS.

# Routing in Single Page Applications

In most frontend JavaScript frameworks such as React, Angular and even Vue.JS, you tend to have a single router within your application that handles the task of determining what path you are hitting and then dictating the component that has to be rendered for that path.

This act of determining what component to render within the framework is known as `client-side rendering`. 

# Adding Our First Routes

## HomePage Route

## Login Route and Component

## Dynamic Routing - Individual Images

We'll want to create a route that allows us to access individual images and our previous method of hardcoding routes to given components may have worked for previous parts of our application, it will unfortunately not scale out well to this new bit of functionality.

This is where dynamic routing can come in and save the day. With dynamic routing, we can define routes that look a little like `/image/:id`. With this path defined, **any** route that matches this dynamic path will render the appropriate component.

The `:id` within this dynamic path can be captured within the logic of the component it is rendering and this can subsequently be used to request the image associated with that `:id` through `this.$route.params`.

<div class="filename"> console.log(this.$route.params) </div> 

```json
{
    "id": "test-id"
}
```



# Conclusion

So, in this tutorial, we have managed to extend our existing Vue.JS Imgur application to incoroprate routing as well as multiple components that will eventually encompass 

## Further Reading:

In the next tutorial in this series, we are going to be taking a look at authentication with AWS' Cognito service. This will allow people to log in to our Imgur application and create accounts. 



* []()