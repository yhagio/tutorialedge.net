+++
date = "2017-04-15T09:03:47+01:00"
title = "Interacting With RESTful APIs Using $http in AngularJS"
draft = true
desc = "This tutorial deals with how we can interact with APIs using AngularJS's built in $http service. "
series = ["angularjs"]
tags = [ "angularjs", "javascript" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

<p>In this tutorial I will be showing you how we can create a frontend angularjs application that could interact with a RESTful API. In order for our Angular applications to be able to make API calls, we’ll have to use the $http service which gives us the ability to perform GET, POST, PUT and DELETE api calls, there are other types of calls but for now we’ll focus on these 4.</p>

## AngularJS's $http

AngularJS's $http service allows us to communicate with other servers using the browsers XMLHttpRequest object or via JSONP.

It takes in a single argument which is a configuration object that generates a HTTP request and returns a promise. Once the HTTP request is completed it can then execute either the success callback or or the error callback, both of which expose the response object.

This response object has multiple properties which we can easily parse.

```bash
data - the response body
status - the HTTP status code
headers - Header getter function
config - the configuration object used to generate the request
statusText - the HTTP status text of the response
```

## Getting Started:

<p>To start us off we’ll be creating a very simple html page that features one button. This button, when clicked will call a function in an angular controller in the scripts.js file that will in turn perform a GET request using the GET shortcut method that AngularJS provides.</p> 

<p>Below you’ll find the source code for our simplistic index page.</p>

```html
<html ng-app="testApp">
<head>
    <title>AngularJS $Http service tutorial example</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
</head>
<body ng-controller="testController">
    
    <h2>$http Service Tutorial</h2>
    
    <button ng-click="getRequest()">Test Rest</button>
    
    <script src="script.js"></script>
</body>
</html>
```

### Our Controller:

<p>So now that we’ve got our index page setup, we’ll have to define our controller and function in our script.js file. </p>

```js
var testApp = angular.module('testApp', []);

testApp.controller('testController' , function ($scope, $http) {
    $scope.home = "This is the homepage";
    
    $scope.getRequest = function () {
        console.log("I've been pressed!");  
        $http.get("http://urlforapi.com/get?name=Elliot")
            .then(function successCallback(response){
                $scope.response = response;
            }, function errorCallback(response){
                console.log("Unable to perform get request");
            });
    };
    
});
```

<p>You’ll see that consuming RESTful APIs using GET requests only requires one $http.get request with the url of the API passed in as a parameter. What you intend to do with the results of this query is entirely up to yourself and depends on what is returned. If it were say a JSON object then you could bind that to a $scope variable and then print it all in your frontend.</p>

<h3>Post Requests</h3>

<p>POST requests are a way we can pass data from our application to an API. This is useful if we intend to perform actions such as updating data held by our API etc.</p>

<p>POST requests take an almost identical form to get requests and look like so:</p>

```js
var testApp = angular.module('testApp', []);

testApp.controller('testController' , function ($scope, $http) {
    $scope.home = "This is the homepage";
    
    
//    Our GET request function
    $scope.getRequest = function () {
        console.log("I've been pressed!");  
        $http.get("http://urlforapi.com/get?name=Elliot")
            .then(function successCallback(response){
                $scope.response = response;
            }, function errorCallback(response){
                console.log("Unable to perform get request");
            });
    };
    
//    Our POST request function
    $scope.postRequest = function () {
        $http.post("http://urlforapi.com/", data)
            .then(function successCallback(response){
                console.log("Successfully POST-ed data");
            }, function errorCallback(response){
                console.log("POST-ing of data failed");
            });
    };
    
});
```

## Forcing Cache Refresh

One of the most annoying issues I've faced when I'm developing web applications is when you are receiving cached results for $http requests. One of the quickest ways to combat against this is to append the current datetime to your url so that it forces itself not to use the cached results.

We can do that like so:

```js
var testApp = angular.module('testApp', []);

testApp.controller('testController' , function ($scope, $http) {
    $scope.home = "This is the homepage";
    
    
//    Our GET request function
    $scope.getRequest = function () {
        console.log("I've been pressed!");  
        // Notice how I've appened '&v=' + Date.now() to our query
        $http.get("http://urlforapi.com/get?name=Elliot&v=" + Date.now())
            .then(function successCallback(response){
                $scope.response = response;
            }, function errorCallback(response){
                console.log("Unable to perform get request");
            });
    };=
    
});
```