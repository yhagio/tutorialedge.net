---
author: Elliot Forbes
date: 2017-04-09T21:22:03+01:00
desc:
  In this tutorial we define exactly what filters are, how we can use existing
  filters and finally how we can implement our own filters.
series: angularjs

tags:
  - javascript
title: AngularJS Filter Tutorial
twitter: https://twitter.com/Elliot_F
---

## Introduction

Filters allow us to perform a number of incredibly useful things on bindings in
views within our AngularJS applications. By definition filters select a subset
of items from an array and returns it as a new array.

By employing filters we are able to easily manipulate entire arrays in the
front-end giving us far more power in the way we wish to display our data.

The Official Documentation for filters can be found here:
[AngularJS Filter Documentation](https://docs.angularjs.org/api/ng/filter/filter)

## Capitalization

Capitalization is a very simple way to demonstrate the powers of AngularJS
filters. Here we select every element from the array provided and transform each
element of that array into uppercase.

Thankfully AngularJS has already defined the uppercase filter and included it as
standard so we can simply do the following:

### AppController.js

```js
var myApp = angular.module("myApp", []);

myApp.controller("AppController", [
  "$scope",
  function($scope) {
    $scope.testVariable = "hello world!";
  }
]);
```

### index.html

```html
<!DOCTYPE html>
<html ng-app="myApp">
  <head>
    <title>Google Search Like Functionality</title>
    <!-- Latest compiled and minified CSS -->
    <link
      rel="stylesheet"
      href="bootstrap.min.css"
      integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="style.css" />

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
  </head>
  <body ng-controller="AppController">
    {{ testVariable | uppercase }}

    <script src="AppController.js"></script>
  </body>
</html>
```

### Defining your Own Filters

Defining your own filters is relatively simple, here we’ll modify our existing
AppController.js file to the following:

### AppController.js

```js
var myApp = angular.module("myApp", []);

// Register our filter within our application
myApp.filter("ourFilter", function() {
  // our filter returns a function which will be performed on every expression it's bound to.
  return function(input) {
    // we define what we are going to return
    var output;
    // we transform our input to upper case
    output = input.toUpperCase();
    // we return the results.
    return output;
  };
});

myApp.controller("AppController", [
  "$scope",
  function($scope) {
    $scope.testVariable = "hello world!";
  }
]);
```

### Index.html

```html
<!DOCTYPE html>
<html ng-app="myApp">
  <head>
    <title>Google Search Like Functionality</title>
    <!-- Latest compiled and minified CSS -->
    <link
      rel="stylesheet"
      href="bootstrap.min.css"
      integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="style.css" />

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
  </head>
  <body ng-controller="AppController">
    {{ testVariable | ourFilter }}

    <script src="AppController.js"></script>
  </body>
</html>
```
