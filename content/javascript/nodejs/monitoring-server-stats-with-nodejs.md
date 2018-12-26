---
author: Elliot Forbes
date: 2017-04-09T21:25:15+01:00
desc: In this tutorial we look at how we can observe key statistics such as free memory
  and cpu usage in Nodejs
series: nodejs
image: node.png
tags:
- javascript
- nodejs
title: Monitoring Server Stats With NodeJS
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In production environments having visibility over how your systems are performing is vital. Being able to watch memory usage and ensure that servers are not being brought down by memory leaks and greedy programs can be hugely beneficial and can help you deal with issues before they become real headaches.

In this tutorial I’m going to be demonstrating how you can build a simple, yet effective NodeJS based monitoring system that will monitor your servers CPU usage, the total memory for a system and the current free memory for a system, the system uptime and possibly most importantly the average load for the last 15 minutes.

In order to do this we’ll be using the os-utils package which can be found here: https://github.com/oscmejia/os-utils

# Getting Started

So initially we’ll write a script that gives us

We’ll begin by creating a new directory on your local machine and run the following:

```bash
npm install --local os-utils
```

This will install the required npm package within the current working directory and will allow us to use it within our node script.

Create a new file within this directory called index.js and within this file we are going to do the following:

```js
// load the os-utils npm package to allow us to use it
var osutils = require(‘os-utils’);
```

Next we are going to start calling some of the os-utils functions to allow us to see the stats of our system. 

```js
var osutils = require('os-utils');

console.log("Platform: " + osutils.platform());
console.log("Number of CPUs: " + osutils.cpuCount());

osutils.cpuUsage(function(v) {
  console.log('CPU Usage (%) : ' + v);
});

console.log("Load Average (5m): " + osutils.loadavg(5));

console.log("Total Memory: " + osutils.totalmem() + "MB");

console.log("Free Memory: " + osutils.freemem() + "MB");

console.log("Free Memory (%): " + osutils.freememPercentage());

console.log("System Uptime: " + osutils.sysUptime() + "ms");
```
