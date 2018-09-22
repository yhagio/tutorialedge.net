---
author: Elliot Forbes
date: 2017-04-15T09:04:56+01:00
desc: This tutorial showcases how one can effectively use AngularJS's routeProvider
  in order to create master pages and templates with which to build their own angularjs
  applications
series:
- angularjs
tags:
- angularjs
- javascript
title: AngularJS Template Route Provider Tutorial
twitter: https://twitter.com/Elliot_F
---

<p>This tutorial covers how you can utilize AngularJS’s $routeProvider in order to create a multiple page application that features one master page. The official documentation for Routing and multiple views can be found here: <a href="https://docs.angularjs.org/tutorial/step_07" target="_blank">https://docs.angularjs.org/tutorial/step_07 </a></p>

<h2>Our Project</h2>

<p>The structure of our project for this tutorial is going to look a little something like this:</p>

```bash
index.html
scripts.js
view/
-- home.html
-- contact.html
-- about.html
```

<p>With our index.html being our master page in which we define all javascript dependencies and styling for things like the nav bar and footer etc. We would then typically put all of our page specific content in their own html files. This can be incredibly handy for times when you want to make a simple change to the header of your site that you want reflected across your whole site as it means you only have to make the change in one place.</p>

<h2>Implementation</h2>

<p>In this tutorial we’ll define some relatively simple routes that each have their own defined controllers and templates.</p>

```js
var testApp = angular.module('testApp', ['ngRoute']);

testApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'views/home.html',
            controller  : 'testController'
        })
        .when('/about', {
            templateUrl : 'views/about.html',
            controller  : 'AboutController'
        })
        .when('/contact', {
            templateUrl : 'views/contact.html',
            controller  : 'ContactController'
        });
});

testApp.controller('testController' , function ($scope) {
   $scope.home = "This is the homepage";
});

testApp.controller('AboutController', function($scope) {
    $scope.about = "You are awesome";
});

testApp.controller('ContactController', function($scope) {
    $scope.contact = "You can't contact me, go away.";
});
```

<h3>Our Index.html Page:</h3>

```html
<html ng-app="testApp">
<head>
    <title>AngularJS ng-if child scopes example</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular-route.min.js"></script>
</head>
<body ng-controller="testController">
    
    <h2>Routing Tutorial</h2>
    
    <div ng-view></div>
    
    <script src="scripts.js"></script>
</body>
</html>
```

<p>And finally our 3 pages, concatenated into one gist for brevity.</p>


```html
<!-- OUR ABOUT.HTML -->
{{about}}
<!-- END OF ABOUT.HTML -->

<!-- OUR CONTACT.HTML -->
{{contact}}
<!-- END OF CONTACT.HTML -->

<!-- OUR HOME.HTML -->
{{home}}
<!-- END OF HOME.HTML -->
```