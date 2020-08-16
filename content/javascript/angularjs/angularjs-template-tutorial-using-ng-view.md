---
author: Elliot Forbes
date: 2017-04-15T09:09:12+01:00
desc:
  In this tutorial I'll be showing you exactly how you can create you own
  templating system using angularjs's ng-view directive.
series: angularjs

tags:
  - javascript
title: AngularJS Templating Tutorial Using ng-view
twitter: https://twitter.com/Elliot_F
---

Templating is fantastic for reducing the amount of code you have to maintain, if
you have a defined structure to all of your webapp's pages then templating
allows you to create one master page for this structure and then just replace
pieces of the page with different content based on the url.

For instance, say we had a blog. If our blog had the same nav bar, the same
header image, the same footer, then it makes sense to put this in one place
instead of constantly repeating it throughout every page in your application. By
defining all this in one page you then have the ability to update your entire
application's design very quickly as opposed to making changes in what could
potentially be hundreds of files.

## The Templating Solution

In this tutorial I’ll be introducing you to the ng-view angularjs directive.
This directive is fantastic for creating multiple page applications that are
fast and require no reloading providing a fluent motion through your web
application.

You can check out the official documentation for the ng-view directive here:
https://docs.angularjs.org/api/ngRoute/directive/ngView

## Basic Templating

<div class="github-link">
Full source code is available here: <a href="https://github.com/elliotforbes/AngularJS-1.4.5-ngView">AngularJS ngView Directive</a>
</div>

In this tutorial we’ll be creating a simple shop with a home view, a categories
view and a single view.

## Our Controllers

In the interest of brevity I've kept this as a single file but these could be
split into multiple files if you so wished.

```js
var testApp = angular.module("testApp", ["ngRoute"]);

testApp.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "views/home.html",
      controller: "testController"
    })
    .when("/category/:name", {
      templateUrl: "views/category.html",
      controller: "CategoryController"
    })
    .when("/item/:name", {
      templateUrl: "views/single.html",
      controller: "ShopController"
    });
});

testApp.controller("testController", function($scope) {
  $scope.myNumber = 1;

  $scope.go = function() {
    $scope.myNumber = $scope.myNumber + 1;
    console.log("hit");
  };
});

testApp.controller("CategoryController", function($scope, $routeParams) {
  $scope.categoryName = $routeParams.name;

  $scope.items = [
    { name: "iPhone", cost: "12.99" },
    { name: "iPad", cost: "14.99" }
  ];
});

testApp.controller("ShopController", function($scope, $routeParams) {
  $scope.itemName = $routeParams.name;
});
```

### Our Master Page:

This is our master template. Here we can define our title, all of our asset
imports as well as anything else that we want to feature on every page. In this
instance, we'll want "My Amazing Web Store" featured at the top of every page of
our application.

```html
<html ng-app="testApp">
  <head>
    <title>AngularJS ng-if child scopes example</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-route.min.js"></script>
  </head>
  <body ng-controller="testController">
    <h2>My Amazing Web Store</h2>

    <div ng-view></div>

    <script src="script.js"></script>
  </body>
</html>
```

## Our Templates

For brevity I've kept this in a single code block. You'll see below the contents
of our three different html pages. As you can see we've only defined what is
going to change whenever we look at these pages and haven't touched our master
template. When viewing all of these routes you should see our h2 tag - My
Amazing Web Store - featured at the top followed by each pages distinct html.

```html
... category.html
<h2>{{ categoryName }}</h2>

<ul>
  <li ng-repeat="item in items">
    <a href="#/item/{{item.name}}">{{item.name}}</a> : ${{item.cost}}
  </li>
</ul>
... home.html
<h2>Home Page</h2>

<ul>
  <li><a href="#/category/apple">Apple Products</a></li>
  <li><a href="#/category/microsoft">Microsoft Products</a></li>
</ul>
... ... single.html
<h2>Item</h2>

<p>{{ itemName }}</p>
...
```

## Displaying Custom Components

The above method is great for displaying very simple routes that match to a page
and a controller, but what happens if you have defined components? How do you
display different components on different routes? Well we can actually make some
slight modifications to one of our routes and pass the component like so:

```js
// a very simple component that has a html template and a
// controller bound to it.
var OurComponent = {
  templateUrl: 'path/to/our-component.html',
  controller: OurComponentController
}

angular.module('ourApp')
  .component('OurComponent', OurComponent);
// end of our component

...
$routeProvider
      .when('/our-component', {
          template: '<our-component></our-component>'
      })
...
```

## Conclusion

If you found this article useful or have any further questions then please feel
free to let me know in the comments section below.
