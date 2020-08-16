---
author: Elliot Forbes
date: 2016-02-14T16:11:58+05:30
desc:
  This article shows you how you can remove duplicates from a list printed our
  using ng-repeat in AngularJS using filters.
series: angularjs

tags:
  - javascript
title: Removing Duplicate Entries from ng-repeat in AngularJS
twitter: https://twitter.com/Elliot_F
---

> This tutorial was built using Angular 1.6. Earlier or later versions of the
> code may not work as intended.

This tutorial will show you how you can filter out duplicates when using the
ng-repeat directive in AngularJS. We'll be passing in an array of JSON Objects
and filtering based on multiple different things within each object.

## Implementing our Test Controller

<p>We’ll start off with a very simple angular controller that will have a list of item names, some of which are duplicates.</p>

```js
var testApp = angular.module("testApp", []);

testApp.controller("testController", function($scope) {
  $scope.list = [
    { name: "ipad" },
    { name: "ipad" },
    { name: "ipad" },
    { name: "ipod" },
    { name: "iMac" },
    { name: "iMac" },
    { name: "iMac" },
    { name: "iPhone" },
    { name: "iWatch" },
    { name: "iWatch" },
    { name: "iWatch" },
    { name: "iPeed" }
  ];
});
```

Next we’ll introduce our index file that we will be using to showcase our simple
list. To showcase our list we'll be using a very simple ng-repeat that iterates
through the _list_ array that we've defined within our controller

```html
<html ng-app="testApp">
  <head>
    <title>AngularJS Removing Duplicates from ng-repeat</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
  </head>
  <body ng-controller="testController">
    <ul>
      <li ng-repeat="item in list">{{item.name}}</li>
    </ul>

    <script src="script.js"></script>
  </body>
</html>
```

<p>You’ll see the ng-repeat directive that will at this time print out every item from our list, regardless of whether or not it is a duplicate.</p>

## Filtering Out Duplicates

<p>Now that we’ve got some test data setup it’s time to write our filter. This will be written just above our controller declaration in our scripts.js file and will look a little something like this:</p>

```js
var testApp = angular.module("testApp", []);

// here we define our unique filter
testApp.filter("unique", function() {
  // we will return a function which will take in a collection
  // and a keyname
  return function(collection, keyname) {
    // we define our output and keys array;
    var output = [],
      keys = [];

    // we utilize angular's foreach function
    // this takes in our original collection and an iterator function
    angular.forEach(collection, function(item) {
      // we check to see whether our object exists
      var key = item[keyname];
      // if it's not already part of our keys array
      if (keys.indexOf(key) === -1) {
        // add it to our keys array
        keys.push(key);
        // push this item to our final output array
        output.push(item);
      }
    });
    // return our array which should be devoid of
    // any duplicates
    return output;
  };
});

testApp.controller("testController", function($scope) {
  $scope.list = [
    { name: "ipad" },
    { name: "ipad" },
    { name: "ipad" },
    { name: "ipod" },
    { name: "iMac" },
    { name: "iMac" },
    { name: "iMac" },
    { name: "iPhone" },
    { name: "iWatch" },
    { name: "iWatch" },
    { name: "iWatch" },
    { name: "iPeed" }
  ];
});
```

<h2>Modifying our Index File</h2>

Now that we’ve written our filter we need to add one slight modification to our
ng-repeat code like so.

```html
<li ng-repeat="item in list | unique : 'name'">{{item.name}}</li>
```

<p>And that should be it removing all of our duplicates from our list from us. I hope you found this useful and if so then please share it around the world!</p>

## Filtering by Nested Properties

Removing duplicates from the list based on nested properties can be achieved by
doing the following:

```html
<li ng-repeat="item in list | unique:'name.nested_property'>{{item.name}}</li>
```
