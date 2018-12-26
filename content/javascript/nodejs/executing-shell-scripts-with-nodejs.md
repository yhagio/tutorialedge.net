---
author: Elliot Forbes
date: 2017-04-15T08:26:02+01:00
desc: In this tutorial I'll be showing you how you can execute terminal commands and
  shell scripts from within your nodejs application.
series: nodejs
image: node.png
tags:
- unix
- javascript
- nodejs
title: Executing Shell Scripts With NodeJS
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

<p>One of the problems I’ve been faced with recently is how do I go about executing shell scripts using NodeJS. This essentially allows me to query the status of certain processes and utilize the full power of the unix shell commands. </p>

<h2>Implementation using NodeJS child_process Module</h2>

<p>Node thankfully already has a module which is designed specifically for executing shell scripts and can be found <a href="https://nodejs.org/api/child_process.html" target="_blank">here</a> in the documentation.</p>

<p>This module essentially creates a child process in which we can execute our shell script and also sets everything up for us so that we can utilize stdin, stdout and stderr within our NodeJS application. </p>

# Executing Unix or Windows Commands

We can use the exec function to run a wide range of windows and unix commands and also pass any number of arguments to this command should we need to.

```js
const ls = spawn('ls', ['-lh', '/usr']);
```

Whilst there may be times that we aren't interested in the output of any of the commands that we run, more often than not we need to capture the output so that we can check that everything worked well.

```js
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', function(data){
    console.log(data); 
});

ls.stderr.on('data', function(data){
    console.log(data);
});

ls.on('close', function (code){
  console.log(`child process exited with code ${code}`);
});
```

# Executing Shell Scripts

In the below example you’ll see how we can utilize callbacks in order to access the data from stdout and stderr and subsequently view any errors and output our shell scripts output.

```js
const exec = require('child_process').exec, child;
const testscript = exec('sh myscript.sh /directory');

testscript.stdout.on('data', function(data){
    console.log(data); 
    // sendBackInfo();
});

testscript.stderr.on('data', function(data){
    console.log(data);
    // triggerErrorStuff(); 
});
```

# Conclusion

Through this method I was able to wrap some pretty mundane and annoying scripts in an automated fashion and tie them together in a concise and automated fashion. This helped to reduce the amount of time spent configuring the scripts and allowed me to focus more on the results.

I hope you found this tutorial useful, if you need anything further explained then please feel free to reach out to me in the comments section below!