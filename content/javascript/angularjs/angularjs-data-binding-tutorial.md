---
author: Elliot Forbes
date: 2017-04-15T09:16:16+01:00
desc:
  This first lesson of the Angularjs course looks to teach how useful data
  binding is when using AngularJS
series: angularjs

tags:
  - javascript
title: AngularJS Data Binding Tutorial
twitter: https://twitter.com/Elliot_F
---

<p>AngularJS Official Docs on Data Binding can be found here: <a href="https://docs.angularjs.org/guide/databinding">AngularJS Data Binding</a></p>

> Please note that the use of scope is somewhat frowned upon. Check out my
> article on
> <a href="https://tutorialedge.net/working-with-angularjs-component-applications">Working
> with Components</a> and how you should use one way data-binding.

<h2>What is Data Binding?</h2>

<p>Data binding is incredibly useful due to the fact it automatically synchronizes the data in both our model and view components. Any changes made to something in the frontend will automatically be reflected in the backend and vice versa. This essentially means we no longer have to worry about complex DOM manipulation and traversal.</p>

# How Does it Work?

AngularJS utilizes it's own mechanism very similar to Dirty Checking.
Essentially AngularJS iterates through a list of variables and checks to see
whether or not the value of that variable has changed. If a variable has changed
then it goes and performs the DOM manipulation required.

## Performance Issues

It must be noted that once you get to about 2000 variables that you have to
consistently watch you might start seeing noticeable differences in your apps
performance. If you are dealing with incredibly complex sets of data then try
and limit the amount of variables that you have consistently being watched and
possibly break it down these sets into subsets which can be viewed on different
pages.

<h2>How Do We Implement It?</h2>

<p>Thanks to the hard work of the AngularJS team, data binding is incredibly simple to implement in your own applications. To demonstrate this we’ll start with a very basic application that allows us to dynamically change a name based off of an input box’s input.</p>

```html
<html ng-app="testApp">
  <head>
    <title>AngularJS ng-if child scopes example</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
  </head>
  <body ng-controller="testController">
    <div>
      <input type="text" ng-model="name" />
      {{name}}
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

```js
var testApp = angular.module("testApp", []);

testApp.controller("testController", function($scope) {
  $scope.name = "Elliot";
});
```

<p>The output for this small example can be seen below:</p>

<img src="https://images.tutorialedge.net/uploads/databinding.gif" alt="angularjs data binding"/>
