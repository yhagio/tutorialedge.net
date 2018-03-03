+++
date = "2017-04-15T09:10:12+01:00"
title = "AngularJS Controllers Tutorial"
draft = true
desc = "this tutorial teaches the basics of angularjs controllers as well as introducing concepts such as constructor and scope inheritance within your angularjs application"
tags = ["angularjs", "javascript"]
series = [ "angularjs" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

<p>AngularJS controllers are somewhat similar to classes in Object Oriented programming and as such you can define the functionality of your applications in these controllers. When a controller is attached to the DOM via the ng-controller directive it instantiates a new Controller object.</p>

> Check out my article on <a href="/javascript/angularjs/working-with-angularjs-component-applications/">Working with Components</a> and see how you should use controllers within a component based system.

## Instantiating a Controller

We’ll begin by creating a very simple controller that contains a function that we’ll call every time we click a button. We’ll also have a $scope variable that we will bind to somewhere on our HTML page so that we can see the effects of this function’s execution every time it is pressed.

```js
var testApp = angular.module('testApp', []);

testApp.controller('testController' , function ($scope) {
    
    $scope.myNumber = 1;
    
    $scope.go = function() {
        $scope.myNumber = $scope.myNumber + 1;
        console.log("hit");
    };
    
});
```

<p>Now that we’ve defined our controller, we need to create our button that will be able to call our newly defined function within our controller, we can do that like so:</p>

```html
<html ng-app="testApp">
<head>
    <title>AngularJS ng-if child scopes example</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
</head>
<body ng-controller="testController">
    
    <div>
        {{myNumber}}
        <!--
            by using the ng-click directive we can call the function 
            go() that we've declared in our testController.
        -->
        <button ng-click="go()">Add One!</button>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
```

<p>Notice we’ve that we’ve added the ng-controller directive to our body html tag and added the name of our controller in there as well as added the ng-app directive to our outermost html tags. These two things are essential if we want this to run.</p>

## Scope Inheritance

<p>One very useful thing to note is that we can effectively achieve scope inheritance due to the fact each new ng-controller instantiation creates a new child scope. This essentially allows us to access scope variables declared higher up in the hierarchy and this can be quite useful if you are wanting to achieve less code duplication etc.</p>

```js
var testApp = angular.module('testApp', []);

testApp.controller('testController' , function ($scope) {
    
    $scope.myNumber = 1;
    
    $scope.go = function() {
        $scope.myNumber = $scope.myNumber + 1;
        console.log("hit");
    };
    
});

testApp.controller('childTestController', function($scope) {
    $scope.yourNumber = 99;
});
```

```html
<html ng-app="testApp">
<head>
    <title>AngularJS ng-if child scopes example</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
</head>
<body ng-controller="testController">
    
    <div>
        {{myNumber}}
    </div>
    
    <div ng-controller="childTestController">
        {{yourNumber}}
    </div>
    
    
    <script src="script.js"></script>
</body>
</html>
```