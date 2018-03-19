---
title: "Part 1 - Setting Up Our VueJS Project"
date: 2018-03-19T16:24:13Z
draft: true
desc: "In this tutorial, we are going to be setting up our basic project that will form the base of our HackerNews clone"
author: "Elliot Forbes"
tags: ["vuejs", "javascript"]
image: "vuejs.png"
weight: 1
series: [ "hackernewsclone" ]
twitter: "https://twitter.com/Elliot_F"
---

In this first tutorial, we will be covering exactly how you set up your development machine so that we can start working on our HackerNews clone. 

We'll get a basic VueJS up and running and we'll also cover how you can build our project so that you end up with files that are deployable to the likes of and S3 bucket, or a server that can serve your files.

## Installing the Vue CLI

We'll be using version `3.0.0` of the `vue-cli` in order to create our initial project. You can install this by typing the following:

```s
$ yarn global add @vue/cli
# or
$ npm install -g @vue/cli
```

Once you have done this, verify you have a working `vue-cli` by typing:

```s
$ vue -V
3.0.0-beta.6
```

## Creating our Project

Once we have successfully installed version `3.0.0` or above of the `vue-cli`, we can then go about creating our project by typing the following:

```s
$ vue create hackernews-clone
```

This will ask you a series of questions regarding how you project should be set up. 

1. Choose ESLint + babel as option 1
2. Choose either Yarn or NPM, for this project I am using Yarn
3. Everything else should be handled for you!

Once we've done this we can navigate into our newly created project and run it locally by calling:

```s
$ cd hackernews-clone
$ yarn serve
```

When you navigate to `http://localhost:8080` within your browser, you should see your newly created VueJS application running:

![VueJS up and running!](https://s3-eu-west-1.amazonaws.com/tutorialedge.net/images/hackernews-clone/screenshot-01.png)

## Next Tutorial

Excellent, we now have everything we need set up on our machine in order to build our HackerNews clone! In the next tutorial, we are going to start building up our VueJS project and adding a few components with their own styling. 
