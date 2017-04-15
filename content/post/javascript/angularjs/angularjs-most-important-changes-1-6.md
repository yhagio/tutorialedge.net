+++
date = "2017-04-09T21:12:25+01:00"
title = "angularjs most important changes 1 6"
draft = true
desc = "In this article we look at the most important changes to AngularJS in the latest upcoming release version 1.6."
tags = ["angularjs", "javascript"]
series = ["angularjs"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

<div class="github-link">The changelog with the AngularJS 1.6 release notes can be found here: <a href="https://github.com/angular/angular.js/blob/master/CHANGELOG.md">AngularJS 1.6-RC.0</a></div>

After having a look at the AngularJS release notes for 1.6, I thought I’d compile my thoughts together as to the most important changes to the framework in the coming release.

## Expression Sandbox Removal

[Expression Sandbox Removal Full Notes](http://angularjs.blogspot.co.uk/2016/09/angular-16-expression-sandbox-removal.html) 

The expression sandbox removal was essentially something that checked to see if your code was accidentally accessing arbitrary javascript and discourage you from placing any business logic inside your templates.

The expression sandbox was intended to be a security feature but exploits continued to be found regardless of the number of patches put out. Thus the Angular team decided to out and out remove the feature and to place to onus of securing applications on the developers using Angular.

This will help to speed up the framework as a whole and is ultimately a good thing,if you are developing a full stack app then you need to consider security at all levels of your application.


## $http Success/Error Callback Methods Deprecated


Regardless of the fact this was considered bad practice in Angular 1.5, you may still have some of these sprawled about your codebase, in 1.6 this callback function will be entirely removed and you will be forced to use the better practice for making http requests:


~~~
// this is the old way
$http.get(‘oauth/clients’)
    .success(function onSuccess(response){
        // use response
    })
    .error(function onError(response){
        // use error
    });


// this is the new way
$http.get('oauth/clients')
      .then(function success(response){
        $log.log(response.data);
      })
      .catch(function error(response){
        $log.log(response);
        $log.log(response.status);
        $log.log(response.headers);
      });
~~~


Note: the response object returned is different, if you are trying to access the data of your response, just append .data and you should see the new content.


## Changes to ngModel


There have been some notable changes to ngModel, for instance you are no longer able to methods to $scope.$watch without some form of context. This essentially means you’ll have to wrap things in a function like so:


~~~
// old way with no context passed
$scope.$watch('something', myNgModelCtrl.$render);
// new way with context
$scope.$watch('something', function() {
  myNgModelCtrl.$render();
})
~~~


## Updates to jqLite


I don’t typically use jqLite in my day to day coding but there were multiple breaking changes to this featured in the changelog, if you do tend to use this then I’d recommend you check out the changelog for more.