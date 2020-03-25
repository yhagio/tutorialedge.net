---
author: Elliot Forbes
date: 2018-03-19T11:05:52Z
desc: In this tutorial series, we are going to look at what it takes to build a commenting system for this site using a Go REST API running on AWS Lambda and Vue.JS.
image: vuejs.png
homepage: true
series:
  - gocommentsystem
tags:
  - golang
title: Building a Comment System in Go and Vue.JS
twitter: https://twitter.com/Elliot_F
---

**Welcome all! In this tutorial series we are going to be building a commenting system** using Go as the backend running atop AWS Lambda and Vue.js for the frontend.

# High Level Overview

The main aim of this tutorial series is to help you build a really cool, dynamic commenting system in Go and Vue.JS that will be resilient enough to cope with huge volumes of traffic to your website!

- ✅ We'll look at how you can build and deploy your own AWS Lambda based Go REST API
- ✅ We'll look at how you can build a frontend system that will be able to securely interact with this API and allow people to post their own comments
- ✅ How we can design a low-cost, highly scalable cloud based system that can be easily integrated with any static site.

Over the course of this series I'll be taking you through everything it took to build up the commenting system that serves 

# Low Level Overview

Hopefully these high level course objectives have caught your attention! 

## Go Concepts

In terms of what we'll be covering in Go, we'll be covering the following:

- ✅ Interacting with a MySQL-based database and building a full `CRUD` REST API.
- ✅ Building a full AWS Lambda-based RESTful API in Go. 
- ✅ Handling secrets and building a deployment pipeline that will allow us to quickly test and deploy to production. 

## Vue.JS Concepts

We'll be deviating from the well-worn path when it comes to building and deploying our Vue.JS components. Given this website is currently built using Hugo - the static-site generator - we don't necesarily want to be running a build process with the `vue-cli` in parallel to our hugo build process. 

We'll be looking at how we can combine these two processes and using Webpack to build our final JavaScript artefacts and put them where our Hugo site expects them.

- ✅ We'll look at components in Vue.JS 
- ✅ We'll be covering client-side authentication and how to integrate with Auth0 which is the backbone for user management on the site
- ✅ We'll look at Vue.JS animations and transitions and how we can improve the user experience of our dynamic elements.

# Finished Product

By the end of this course, you should have a firm understanding as to how you can build your own highly-scalable, resilient systems on top of AWS Lambda as well as an improved understanding of Vue.js.

If you want a sneak peak at the finished product then behold:

![]()
