---
author: Elliot Forbes
date: 2017-04-15T08:17:02+01:00
desc: In this tutorial I'll be showing you how to both create and delete directories using NodeJS
series: nodejs
image: node.png
tags:
- javascript
- nodejs
title: Creating and Deleting Directories With NodeJS
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

<strong>In this tutorial I’ll be showing you how to create and delete directories using NodeJS</strong> and we’ll be using the mkdirp and the rimraf node package in order to achieve this.

# Creating Directories

In order to create a directory we’ll need first download the mkdirp npm package, we can do this like so: 

```js
npm install mkdirp --local
```

This should install the mkdirp package as well as any of it’s dependencies in a node_modules directory within your current directory. Once this has completed we can then start using this new package.

If you wish to read up more about this package you check it’s code out here: <a href=”https://github.com/substack/node-mkdirp” target=”_blank”>mkdirp github</a>

<h5>The Code</h5>

```js
// first we import our newly installed mkdirp
// package so that we can use it further down
var mkdirp = require('mkdirp');

// and then we call it giving 2 parameters, the first
// being the name of the directory we wish to create
// and the second a callback function.
mkdirp('test', function (err){
    // if any errors then print the errors to our console
    if(err) console.log(err);
    // else print a success message.
    console.log("Successfully created test directory");
});
```


<h2>Deleting Directories in Node</h2>

<strong>In order to delete directories using node we’ll use the rimraf package</strong> and we’ll need to again install this using the node package manager: 

```js
npm install rimraf --local
```

Again, if you want to see the code for this package you can do so <a href=”https://github.com/isaacs/rimraf” target=”_blank”>here</a>

# The Code

```js
var rimraf = require('rimraf');

rimraf('test', function(err){
    if (err) console.log(err);
    console.log("Successfully deleted a directory");
});
```


Run this using node delete.js and you should hopefully see the success message printed out in your console as well as the test directory we created in the first part of the tutorial deleted.
