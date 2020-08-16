---
author: Elliot Forbes
date: 2017-04-09T21:22:46+01:00
desc: In this tutorial we'll look at how we can implement factories in AngularJS
series: angularjs

tags:
  - javascript
title: AngularJS Factory Tutorial
twitter: https://twitter.com/Elliot_F
---

## What Are Factories

Services are essentially ways we can share code across our AngularJS
applications. Say for instance you have an application that interacts with a
RESTful API, you would typically create a factory which would return an object
that contains all the functions necessary to interact with that API.

By using a factory object, we can standardise the way we interact with the REST
API and reduce the amount of duplicate code we have scattered around our
application.

## Implementing a Factory

```js
var testApp = angular.module("testApp", []);

testApp.factory("RestService", function($http) {
  var service = {};
  var urlBase = "/api/v1";

  service.getUsers = function() {
    return $http.get(urlBase + "/users");
  };

  service.getUser = function(id) {
    return $http.get(urlBase + "/user/" + id);
  };

  return service;
});

testApp.controller("testController", [
  "$scope",
  "$log",
  "RestService",
  function($scope, $log, RestService) {
    var init = function() {
      RestService.getUsers().then(
        function successCallback(response) {
          $log.log("Success");
        },
        function errorCallback(response) {
          $log.log("Error");
        }
      );
    };

    init();
  }
]);
```

## Our Index Page

```html
<html ng-app="testApp">
  <head>
    <title>AngularJS Services Tutorial</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
  </head>
  <body ng-controller="testController">
    <script src="scripts.js"></script>
  </body>
</html>
```
