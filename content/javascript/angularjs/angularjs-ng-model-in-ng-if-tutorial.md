---
author: Elliot Forbes
date: 2017-04-15T09:17:38+01:00
desc:
  A small helper tutorial for those struggling to use the ng-model directive
  within the ng-if directive in your angularjs app.
series: angularjs

tags:
  - javascript
title: AngularJS ng-model in ng-if Tutorial
twitter: https://twitter.com/Elliot_F
---

<p>a quick tip for those trying to get the ng-model directive working in your angularjs application within ng-if.</p>

<h2>ng-if Child Scopes</h2>

<p>If you are wanting to use an ng-model scope within an ng-if then you'll have to access that scope using $parent</p>

<p>Our html page will look something like so:</p>

```html
<html ng-app="testApp">
  <head>
    <title>AngularJS ng-if child scopes example</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
  </head>
  <body ng-controller="testController">
    <div ng-if="isFalse">
      {{$parent.name}}
    </div>

    <p>{{name}}</p>

    <div ng-if="isTrue">
      <p>{{$parent.name}}</p>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

<p>And our controller looks something like this:</p>

```js
var testApp = angular.module("testApp", []);
testApp.controller("testController", function($scope) {
  $scope.isTrue = false;

  $scope.name = "Elliot";
});
```
