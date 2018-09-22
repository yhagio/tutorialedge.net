---
author: Elliot Forbes
date: 2018-03-19T16:24:13Z
desc: In this tutorial, we are going to be setting up our basic project that will
  form the base of our HackerNews clone
image: vuejs.png
series:
- hackernewsclone
tags:
- vuejs
- javascript
title: Part 1 - Setting Up Our VueJS Project
twitter: https://twitter.com/Elliot_F
weight: 1
---

In this first tutorial, we will be covering exactly how you set up your development machine so that we can start working on our HackerNews clone. 

We'll get a basic VueJS application up and running and we'll also cover how you can build this simple project so that you end up with files that are deployable to the likes of and S3 bucket, or a server that can serve your files.

## Video Tutorial

<div style="position:relative;height:0;padding-bottom:42.76%"><iframe src="https://www.youtube.com/embed/IezF9Gj4Pcc?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="842" height="360" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

## Installing the Vue CLI

We'll be using version `2.9.3` of the `vue-cli` in order to create our initial project. You can install this by typing the following:

```s
$ yarn global add vue-cli
# or
$ npm install -g vue-cli
```

> Note: At the time of writing this `vue-cli` 3.0.0 is currently in beta, I will update this when it goes to production! 

Once you have done this, verify you have a working `vue-cli` by typing:

```s
$ vue -V
2.9.3
```

## Creating our Project

Once we have successfully installed version `2.9.3` or above of the `vue-cli`, we can then go about creating our project by typing the following:

```s
$ mkdir hackernews-clone
$ cd hackernews-clone
$ vue init webpack
```

This will ask you a series of questions regarding how you project should be set up. 

1. Choose `Y` to generate project in the current directory
1. Leave the Project name as is.
1. Leave the project description as is.
1. Enter your name in the Author field.
1. Choose Runtime + Compiler.
1. Install vue-router = `Y`
1. Use ESLint to lint your code = `Y` with the Standard lint settings.
1. Set up unit test = `n` for now, we can add them later
1. Choose no for e2e tests with Nightwatch
1. Then select the package manager of your choice, I'll be using Yarn

Once we've done this we can run it locally by calling:

```s
$ yarn run dev
```

When you navigate to `http://localhost:8080` within your browser, you should see your newly created VueJS application running:

![VueJS up and running!](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/hackernews-clone/screenshot-01.png)

## Building Your Project

Once you are happy with your project, you will need to build it using the `yarn run build` command. This will generate a `dist/` directory which will contain all of the necessary files needed in order for your application to run. If you are planning on deploying this application to a server or an AWS S3 bucket then you can certainly do so by simply pushing these files. 

Once you have run `yarn run build` you should see your `dist/` directory look something like this:

```s
dist/
- index.html
- static/
- - css/
- - js/
- - style.css 
```

Within the `dist/static/js/` directory you should see all of the minified, transpiled javascript files that your `index.html` file needs in order to run as a Vue.js application. You will be able to push this up to 

## Next Tutorial

Excellent, we now have everything we need set up on our machine in order to build our HackerNews clone! In the next tutorial, we are going to start building up our VueJS project and create our first single-page component with its' own styling. You can find that tutorial here: [Part 2 Creating a Few Components](/projects/hacker-news-clone-vuejs/part-2-creating-few-components/) 
