---
author: Elliot Forbes
date: 2017-04-09T21:29:02+01:00
desc: in this tutorial I'll be demonstrating how you can convert a csv file to JSON using NodeJS
series: nodejs
image: node.png
tags:
- csv
- json
- nodejs
- javascript
title: Converting CSV to JSON using NodeJS
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this tutorial I’m going to be showing you how we can create a NodeJS script that takes in a csv file and outputs the contents of that CSV file as JSON.

In order to do this conversion we’ll be using the <a href="https://www.npmjs.com/package/csvtojson">csvtojson</a> node package. This package will do pretty much all the heavy lifting for us and having used it in production environments I can say that it’s remarkably easy to implement into a project.

# Setting Up Your Project

Create a new project directory on your machine and open up this location in your terminal. Next we’ll want to install the <b>csvtojson</b> node module, you can do that by typing the following: 

```bash
npm install csvtojson --save
```

This should create a <b>node_modules</b> directory within your project which will contain all the dependencies that csvtojson requires.

# Implementation

Now that we’ve got everything set up we can begin implementation. Open up your project in your prefered text editor and create a new js file. Within this file add the following code.

```js
//require the csvtojson converter class 
var Converter = require("csvtojson").Converter;
// create a new converter object
var converter = new Converter({});

// call the fromFile function which takes in the path to your 
// csv file as well as a callback function
converter.fromFile("./path-to-your-file.csv",function(err,result){
    // if an error has occured then handle it
    if(err){
        console.log("An Error Has Occured");
        console.log(err);  
    } 
    // create a variable called json and store
    // the result of the conversion
    var json = result;
    
    // log our json to verify it has worked
    console.log(json);
});
```