---
author: Elliot Forbes
date: 2017-04-15T08:32:01+01:00
desc: In this tutorial we look at ways to start up a webserver using ExpressJS
series: nodejs
image: node.png
tags:
- expressjs
- nodejs
- javascript
title: Building a Webserver using ExpressJS and NodeJS
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

This is the first tutorial in a series in which we’ll be building up a website for a domain name I’ve been sitting on for a few years now. This is intended to show you everything it takes in order to program your own website using NodeJS and the new Angular2 framework. 

# Creating a Simple Web Server Using NodeJS and ExpressJS.

So the very first thing we need for our site is the foundation and for this we can use a very simple ExpressJS server.

## Prerequisites

Before we can begin this series you’ll need to make sure you have the following installed on your computer:


* NodeJS and the NPM

Typically NodeJS includes the node package manager (NPM) by default so once you’ve installed node on your machine, open up a terminal and test your installation. Type “npm” in your terminal and if everything has been configured correctly you should see the manual for npm printed out. 

# Setting Up Our Project

Create a directory on your development machine and then navigate to that folder using the terminal. Once you are here we can initialize our project with npm:

```bash
mpm init
```

This should then ask you a series of questions that will be used in order to populate a package.json file that this command creates. These aren’t critically important and can be changed at a later date if needed.

# Installing ExpressJS

Once you’ve initialized your project with npm we can then proceed to installing ExpressJS. `npm install express --save`

This command should install ExpressJS into a node_modules directory within your project and this will now allow us to make a start programming our simple web server.

# Implementing our Server

So to begin with you’ll want to create a new js file within your directory. We’ll call this server.js and it’s going to start off like so:

```js
var express = require('express');

var app = express();

app.get('/', function (req, res){
    res.send("Hello World!"); 
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("GadgetEdge.net listening at http://%s:%s", host, port); 
});
```

Once you’ve got this in your server.js file we can test it out. Open up your terminal and navigate to your project’s directory and then run your server code:

```bash
node server.js
```

This should start the server and if we navigate to our browser and type: http://localhost:3000 you should see Hello World! Printed out.

# Improving Our Server

So now that we’ve got a basic server up and running we now need to improve it a bit and give it functionality like serving our html files as well as all our assets. 

First of all we are going to create a public directory within our project that will house all of our website files. Within this create an index.html page and another directory called assets. Within this assets folder create another file called: style.css This will house all of our css for our site.

Next thing we need to do is point our express server to look at this new public directory. We can do this like so:

```js
// this line allows us to use the expressjs module
var express = require('express');

// Add this line so we can serve files from our local
// directory
var path = require('path');
var app = express();

// Add the abillity to serve our static files from the public directory
app.use(express.static('public'));

// Here we serve up our index page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("GadgetEdge.net listening at http://%s:%s", host, port); 
});
```

# Checking it all works

Once you’ve done all this, restart your server in the terminal by pressing ctrl-c or cmd-c and then restart it by running node server.js. Again navigate to localhost:3000 and you should see your index.html page rendered for you. Test the configuration by changing some of the css.