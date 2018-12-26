---
author: Elliot Forbes
date: 2017-04-15T08:14:10+01:00
series: nodejs
desc: In this tutorial, we're going to be looking at how you can edit XML files using NodeJS
image: node.png
tags:
- xml
- javascript
- nodejs
title: Editing XML Files With NodeJS
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

<p>XML files are still widely used in enterprise programs and being able to manipulate xml files can be incredibly important.</p>

<h2>XML2JS Node Package</h2>

<p>In this tutorial I’ll be demonstrating how you can easily manipulate XML files using the xml2js node package. This package is great due to the fact it reads in an xml string and converts it to a far easier to use json structure. </p>

<h4>Reading in our XML File</h4>

<p>Create a new js file and type the following: </p>

```js
var fs = require('fs');

fs.readFile('test.xml', 'utf-8', function (data, err){
    if(err) console.log(err);
    console.log(data);    
});       
```

<p>Below you’ll find a sample xml file that we’ll be using:</p>

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<root>
    <graph>
        <node>
            <name>Node 1</name>
            <weight>24</weight>
        </node>
        <node>
            <name>Node 2</name>
            <weight>18</weight>
        </node>
        <node>
            <name>Node 3</name>
            <weight>47</weight>
        </node>
        <node>
            <name>Node 4</name>
            <weight>58</weight>
        </node>
    </graph>
</root>
```

<h2>Converting Our XML Data to Json</h2>

<p>Ok, so now that we’ve got the ability to read our xml files, we can then convert this to a far easier format to work with. The xml2js package is an excellent package that will take in any xml string and convert it to a json object. Again we can install this using the node package manager:</p>

```c
npm install xml2js --save-dev
```

<p>Once this is installed, modify your existing code to use the parseString method like so: </p>

```js
var fs = require('fs'),
    parseString = require('xml2js').parseString;

fs.readFile('test.xml', 'utf-8', function (err, data){
    if(err) console.log(err);
    // we log out the readFile results    
    console.log(data);
    // we then pass the data to our method here
    parseString(data, function(err, result){
        if(err) console.log(err);
        // here we log the results of our xml string conversion
        console.log(result); 
    });
});       
```

<p>If you run this you should see our newly created JSON object printed out in the console.</p>

<h2>Editing our New JSON Object</h2>

<p>JSON object manipulation is incredibly in javascript. I’m not going to go into depth about how we can edit it but as a means of demonstrating how we can edit the xml I’m going to change the name of the weight of the first node in our xml file. </p>

```js
var fs = require('fs'),
    parseString = require('xml2js').parseString;

fs.readFile('test.xml', 'utf-8', function (err, data){
    if(err) console.log(err);
    // we log out the readFile results    
    console.log(data);
    // we then pass the data to our method here
    parseString(data, function(err, result){
        if(err) console.log(err);
        // here we log the results of our xml string conversion
        console.log(result); 
        // save our json to a variable
        var json = result;
        // edit the first node’s weight and set it to 99
        json.root.graph[0].node[0].weight = "99";
                  
    });
});       
```

<h2>Converting to XML and Writing to FIle</h2>

<p>Now that we’ve successfully edited our json, we can then convert it back to xml and finally write it to a file.</p>

```js
var fs = require('fs'),
    parseString = require('xml2js').parseString,
    xml2js = require('xml2js');

fs.readFile('test.xml', 'utf-8', function (err, data){
    if(err) console.log(err);
    // we log out the readFile results    
    console.log(data);
    // we then pass the data to our method here
    parseString(data, function(err, result){
        if(err) console.log(err);
        // here we log the results of our xml string conversion
        console.log(result); 
        
        var json = result;
        
        json.root.graph[0].node[0].weight = "99";
        
        // create a new builder object and then convert
        // our json back to xml.
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(json);
        
        fs.writeFile('edited-test.xml', xml, function(err, data){
            if (err) console.log(err);
            
            console.log("successfully written our update xml to file");
        })
                  
    });
});       
```

<p>Run this and you should see our newly created and updated xml within the same directory as your node script.</p>