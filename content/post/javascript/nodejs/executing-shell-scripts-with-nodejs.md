+++
date = "2017-04-15T08:26:02+01:00"
title = "Executing Shell Scripts With NodeJS"
draft = true
desc = "In this tutorial I'll be showing you how you can execute terminal commands and shell scripts from within your nodejs application."
series = [ "nodejs" ]
tags = ["unix", "javascript", "nodejs"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

<p>One of the problems I’ve been faced with recently is how do I go about executing shell scripts using NodeJS. This essentially allows me to query the status of certain processes and utilize the full power of the unix shell commands. </p>

<h2>Implementation using NodeJS child_process Module</h2>

<p>Node thankfully already has a module which is designed specifically for executing shell scripts and can be found <a href="https://nodejs.org/api/child_process.html" target="_blank">here</a> in the documentation.</p>

<p>This module essentially creates a child process in which we can execute our shell script and also sets everything up for us so that we can utilize stdin, stdout and stderr within our NodeJS application. </p>

<p>In the below example you’ll see how we can utilize callbacks in order to access the data from stdout and stderr and subsequently view any errors and output our shell scripts output.</p>

<pre><code class=”language-javascript”>
var exec = require('child_process').exec, child;
var testscript = exec('sh myscript.sh /directory');

testscript.stdout.on('data', function(data){
    console.log(data); 
    sendBackInfo();
});

testscript.stderr.on('data', function(data){
    console.log(data);
    triggerErrorStuff(); 
});
</code></pre>
