---
author: Elliot Forbes
date: 2017-04-15T08:20:02+01:00
desc: In this tutorial I’m going to be showing you exactly how we can read and write
  files on our local filesystem using NodeJS.
series: nodejs
image: node.png
tags:
- javascript
- nodejs
title: Reading and Writing Files With NodeJS
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

<p><strong>In this tutorial</strong> I’m going to be showing you exactly how we can read and write files on our local filesystem using NodeJS.</p>

# Reading From Files

<p>Being able to read from files on your local file system can be hugely useful and there are a number of different things you can build on top of this. A log reader, importing information from spreadsheets and xml files or whatever you can think of, being able to read from files is hugely useful.</p>

<h5>The FS Package</h5>

<p>Create a new file called index.js and add the following: </p>

```js
var fs = require('fs');

fs.readFile('temp.txt', function(err, buf) {
  console.log(buf.toString());
});
```

<p>Create a temp.txt within the same directory and write in it anything you’d like. Run your script using node index.js and you should see in the console the contents of your file.</p>

<h5>Understanding the Code</h5>

<p>We’ll step through this with comments.</p>

```js
var fs = require('fs');
```

<p>This line does the job of importing the fs package and allowing us to utilize it within our own code.</p>

```js
fs.readFile('temp.txt', function(err, buf) {
  console.log(buf.toString());
});
```

<p>This calls the readFile function asynchronously and then prints the contents of the file to the console.</p>

<h5>Returning a Buffer?</h5>

<p>If the above code hasn’t worked as expected and you are seeing a buffer being printed out in the terminal then it might be an idea to specify the files encoding. We can do this like so: </p>

```js
var fs = require('fs');

fs.readFile('temp.txt', 'utf-8' ,function(err, buf) {
  console.log(buf.toString());
});
```

<h2 id=”writing-to-files”>Writing To Files</h2>

<p>Now that you’ve got the reading of files down, it’s time to start modifying these files. To do this we’ll be using the same FS package we used in part one. </p>

<h5>The Code:</h5>

<p>Again create a new file within your current directory and call it write.js and then add the following javascript code:</p>

```js
var fs = require('fs');

var data = "New File Contents";

fs.writeFile('temp.txt', data, function(err, data){
    if (err) console.log(err);
    console.log("Successfully Written to File.");
});
```
<p>Run this code by executing node write.js in the terminal and then open up temp.txt in your editor, you should now see the new contents of the file. </p>



