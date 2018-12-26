---
author: Elliot Forbes
date: 2017-04-15T08:38:40+01:00
desc: This tutorial gives you a few different methods of keeping your nodejs applications
  alive and running forever, definitely a handy guide if you use Node in production
  environments.
series: nodejs
image: node.png
tags:
- pm2
- nodejs
- javascript
title: Keeping NodeJS Applications Running Forever Using PM2
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

<p>If you write an application that you need to keep running forever on your servers then this is the tutorial for you. </p>

<p>If you're a software developer working on business critical applications and have to adhere to strict Service Level Agreements (SLAs for short) then you know just how vital it is to have your applications back up and running the second they fall over, every second counts when trying to achieve the 5 9's or 99.999% availability throughout the year. In this tutorial I'll be demonstrating the effectiveness of PM2 which is a production process manager for Node.js applications which also features a built-in load balancer for those high-performance applications. </p>

<p>PM2 is an opensource bit of tech that's currently available here: <a href="https://github.com/Unitech/pm2" target="_blank">https://github.com/Unitech/pm2</a> and is currently owned and maintained by an Alexandre Strzelewicz from <a href="http://keymetrics.io" target="_blank">http://keymetrics.io</a> for those of you who want to check out his other work. </p>

<h2>Installing PM2</h2>

<p>PM2 doesn't require much configuration, if any, and if you've got NPM installed on your machine then installing PM2 is just a case of running the following command: </p>

```bash
npm install pm2 -g
```

<p>Once that's installed on your machine then you are then ready to go. </p>

<h2>Starting an Application</h2>

<p>Starting a node application that you want to keep running forever is as simple as this: </p>

```bash
pm2 start app.js
```

<h2>More Info</h2>

<p>PM2's official can be found here: <a href="http://pm2.keymetrics.io/" target="_blank">http://pm2.keymetrics.io/</a> should you wish to read up a bit more on this pretty amazing opensource tool and potentially thank the developers for their efforts. </p>
