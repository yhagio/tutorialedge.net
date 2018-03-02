+++
date = "2017-04-15T09:08:03+01:00"
title = "AngularJS Directives Tutorial"
draft = true
desc = "This tutorial showcases how one can define their own angularjs directives."
tags = ["angularjs", "javascript"]
series = [ "angularjs" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"

+++

<p>The official documentation for AngularJS’s directives can be found here: <a href="https://docs.angularjs.org/guide/directive">AngularJS Directives</a></p>

<h2>What Are Directives?</h2>

<p>Directives essentially allow you to attach behaviors to specific DOM elements. This means you can define your own custom html-like tags and attach all of the functionality you desire to that tag which is perfect for creating breaking up your applications into distinct modules which can be worked on simultaneously in teams of developers.</p>

<p>Directives are an essential part of the AngularJS framework and if you want a bit of background behind why you should define your own directives rather than use the ng-controller directive then check out this post by one of Paypal’s engineers - <a href="https://medium.com/@bluepnume/sane-scalable-angular-apps-are-tricky-but-not-impossible-lessons-learned-from-paypal-checkout-c5320558d4ef">Lessons learned from rebuilding Paypal's checkout in AngularJS</a></p>

<h2>Implementing Your Own Simple Directive:</h2>

<p>In this tutorial we’ll just be implementing a very simple directive that defines our mydir tag and returns some text:</p>

```js
var testApp = angular.module('testApp', []);

testApp.directive('mydir', function () {
    return {
        template: 'This is my directive'
    };
});
```

<p>once we’ve added this to our scripts.js file we can then call this directive in our html file like so:</p>

```html
<html ng-app="testApp">
<head>
    <title>AngularJS ng-if child scopes example</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
</head>
<body ng-controller="testController">
    
    <h2>Directives Tutorial</h2>
    
    <mydir></mydir>
    
    <script src="script.js"></script>
</body>
</html>
```

<p>Open this up in a browser and you should see our text rendering in place of our mydir element.</p>

<h2>Implementing Directives using HTML Templates</h2>

<p>For directives that return more than a couple of lines of html code it's best to separate this html code into another file. In this example I'll keep the html pretty simple as we'll just be returning "Hello, World!" and a few other things.</p>

<h4>Application Structure</h4>

<p>With regards to folder structure it's best to separate each directive into it's own folder within a "Components" folder. This essentially modularizes your code which can be highly useful if you work in teams and need multiple people to work on different bits of your application at the same time.</p>

<p>Our App will take the following structure:</p>

```bash
app/
---- controllers/
-------- AppController.js
---- Components/
-------- MyDirective/
------------ MyDirective.js
------------ MyDirectiveTemplate.html
views/
---- index.html
```

<h3>Index.html</h3>

```html
<html ng-app="myapp">
    <head>
        <title>TutorialEdge.net</title>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
    </head>
    <body>
        <h2>Introduction to AngularJS Templates</h2>
        
        <mydirective></mydirective>
        
        <script src="../controllers/MainController.js"></script>
        <script src="../components/MyDirective/MyDirective.js"></script>
    </body>
</html>
```

<h3>MyDirective.js</h3>

```js
var app = angular.module('myapp', []);

app.directive("mydirective", function() {
    return {
        templateUrl: '../components/MyDirective/DirectiveTemplate.html'
    }
})
```

<h3>DirectiveTemplate.html</h3>

```html
<h2>Hello World!</h2>
```

<h2>The Results</h2>

<p>Run this on any test-server you have set up and you should see your index.html and the directive template.html page rendering in your browser. </p>