---
author: Elliot Forbes
date: 2017-04-09T21:26:14+01:00
desc: In this tutorial we discuss how to implement a very simple logging system using
  nodejs
series: nodejs
image: node.png
tags:
- javascript
- nodejs
title: Writing Your Own Logging System NodeJS
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

# Logging - Why Is It Important?

Logs are an invaluable resource when it comes to effectively maintaining applications. Think of them as breadcrumbs you can follow to find out where your application has faltered. In simple applications this may be unnecessary and overkill, but in production applications that work with highly sensitive and valuable data, logs are priceless.

# Logging in NodeJS Applications

In this tutorial I’m going to be demonstrating a quick and simple method of logging a very simple server program. 

## Log Levels

Some applications process hundreds of millions of transactions every day, if we log all this out to a single file then we could be traversing hundreds of millions of lines of log files in order to find errors. This is time consuming and can be made unnecessary through using multiple levels of logging. 

In this tutorial we are going to be creating 3 different log files for our simple server application, all of which take different levels of log messages. The levels will be as follows:

Info
Warning
Error

Not only that but we’ll set up a system where we create a new file every day so that we can narrow any error searches further. 

## Implementation

This is going to be a very simple logging system that has been made purely for demonstration purposes. It can be extended to suit your needs.

## Our Simple Server

Let’s create a very simple express based server that will serve as the base of our application. If you wish to read more about writing your own express based server then you can do so here: [Tutorial: Writing your own ExpressJS Server](/javascript/nodejs/creating-a-webserver-with-nodejs/).

## router.js 

First we’ll begin by creating a router which will act as our servers middleware for all requests:

```js
var express = require('express');
var router = new express.Router();

router.use(function timeLog(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  res.send('Home Page');
});

module.exports = router;
```

## app.js

And then we’ll create the server:

```js
var express = require('express');
var app = express();

var router = require('./router');

app.use('/', router);

app.listen(3000, function() {
  console.log("Now Listening on port 3000");
});
```

If you want to try this out then you can do so by typing:

```bash
Node app.js
```

# Implementing Our Logging System

Now that we’ve got a basic application running on port 3000, we can now begin to create our simple logging system; 

Create a new file called logger.js in your projects directory:

```js
// Firstly we'll need to import the fs library
var fs = require('fs');

// next we'll want make our Logger object available
// to whatever file references it.
var Logger = exports.Logger = {};


// Create 3 sets of write streams for the 3 levels of logging we wish to do
// every time we get an error we'll append to our error streams, any debug message
// to our debug stream etc...
var infoStream = fs.createWriteStream('logs/info.txt');
// Notice we set the path of our log files in the first parameter of 
// fs.createWriteStream. This could easily be pulled in from a config
// file if needed.
var errorStream = fs.createWriteStream('logs/error.txt');
// createWriteStream takes in options as a second, optional parameter
// if you wanted to set the file encoding of your output file you could
// do so by setting it like so: ('logs/debug.txt' , { encoding : 'utf-8' });
var debugStream = fs.createWriteStream('logs/debug.txt');


// Finally we create 3 different functions
// each of which appends our given messages to 
// their own log files along with the current date as an
// iso string and a \n newline character
Logger.info = function(msg) {
  var message = new Date().toISOString() + " : " + msg + "\n";
  infoStream.write(message);
};

Logger.debug = function(msg) {
  var message = new Date().toISOString() + " : " + msg + "\n";
  debugStream.write(message);
};

Logger.error = function(msg) {
  var message = new Date().toISOString() + " : " + msg + "\n";
  errorStream.write(message);
};
```

# Using our new Logging System:

Now that we’ve implemented our basic logging system we can go back into our router.js file and add the following:

```js
var express = require('express');
var router = new express.Router();
// Here we import our Logger file and instantiate a logger object
var logger = require('./logger').Logger;

router.use(function timeLog(req, res, next) {
  // this is an example of how you would call our new logging system to log an info message
  logger.info("Test Message");
  next();
});

router.get('/', function(req, res) {
  res.send('Home Page');
});

module.exports = router;

```
