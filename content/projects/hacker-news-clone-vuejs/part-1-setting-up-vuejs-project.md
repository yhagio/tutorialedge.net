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
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this first tutorial, we will be covering exactly how you set up your development machine so that we can start working on our HackerNews clone. 

We'll get a basic VueJS application up and running and we'll also cover how you can build this simple project so that you end up with files that are deployable to the likes of and S3 bucket, or a server that can serve your files.

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:42.76%"><iframe src="https://www.youtube.com/embed/IezF9Gj4Pcc?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="842" height="360" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

# Installing the Vue CLI

We'll be using version `3.4.0` of the `vue-cli` in order to create our initial project. You can install this by typing the following:

```s
$ yarn global add @vue/cli
# or
$ yarn global add @vue/cli
```

Once you have done this, verify you have a working `vue-cli` by typing:

```s
$ vue --version
3.4.0
```

# Creating our Project

Once we have successfully installed version `3.4.0` or above of the `vue-cli`, we can then go about creating our project by typing the following:

```s
$ vue create hn-clone
Vue CLI v3.4.0
? Please pick a preset: (use arrow keys)
> default (babel, eslint)
  Manually select features
```

Select the `default` option and the `vue-cli` should go away and instantiate the project for us. We'll then be able to navigate into our newly created project and start it using yarn:

```s
$ cd hn-clone
$ yarn serve
 DONE  Compiled successfully in 3281ms                                                                                                                     21:12:44

  App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.1.234:8080/

  Note that the development build is not optimized.
  To create a production build, run yarn build.
```

This will kick off a development server on our local machine that we will then be able to navigate to in our browser - `http://localhost:8080`. When you navigate to `http://localhost:8080` within your browser, you should see your newly created VueJS application running:

![VueJS up and running!](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/hackernews-clone/screenshot-01.png)

# Project Structure

If we open up the newly created `hn-clone` directory within a code editor of choice, we should see a number of files and directories automatically created for us. These are the core files of our web application and it is from this base that we'll be able to build our HackerNews clone.

```s
node_modules/
public/
 - favicon.ico
 - index.html
src/
 - assets/
 - components/
 - App.vue
 - main.js
.gitignore
babel.config.js
package.json
README.md
yarn.lock
```

The key directory that we'll want to concern ourselves with is the `src/` directory. This is where most of our application source code will live and we'll be adding a few new components under here in the next parts of this series.

# Building Your Project

Once you are happy with your project, you will need to build it using the `yarn run build` command. This will generate a `dist/` directory which will contain all of the necessary files needed in order for your application to run. If you are planning on deploying this application to a server or an AWS S3 bucket then you can certainly do so by simply pushing these files. 

Once you have run `yarn run build` you should see your `dist/` directory look something like this:

```s
dist/
- css/
- img/
- js/
- favicon.ico 
- index.html
```

Within the `dist/static/js/` directory you should see all of the minified, transpiled javascript files that your `index.html` file needs in order to run as a Vue.js application. You will be able to push this up to 

# Next Tutorial

Excellent, we now have everything we need set up on our machine in order to build our HackerNews clone! In the next tutorial, we are going to start building up our VueJS project and create our first single-page component with its' own styling. You can find that tutorial here: [Part 2 Creating a Few Components](/projects/hacker-news-clone-vuejs/part-2-creating-few-components/) 
