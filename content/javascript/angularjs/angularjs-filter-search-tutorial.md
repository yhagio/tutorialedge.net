+++
title = "AngularJS Filter Search Tutorial"
draft = true
date = "2017-04-15T08:59:44+01:00"
desc = "We look at how you can implement your own style of filter searching using AngularJS's filter directive"
tags = ["angularjs", "javascript"]
series = [ "angularjs" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

<h3>Links:</h3>

<div class="github-link">Full Source Code: <a href="https://github.com/emforce/AngularFuzzySearch">https://github.com/emforce/AngularFuzzySearch</a></div>

<p>In this tutorial I’ll be showing you how you can create a tool which allows you to type in a search query in an input box and see all matches below that input box without having to reload the page and we’ll be leveraging AngularJS’s filter mechanic to do so.</p>

<p>To get us started we’ll start with mocking up what our page will look like, this is just going to be a basic no-frills design to get us started but feel free to modify it to suit.</p>

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <title>Google Search Like Functionality</title>
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
  <link rel="stylesheet" href="style.css">
  
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
</head>
<body ng-controller="SearchController">
    
  <div class="search-box">
      <div class="row">
          <div class="col-lg-4"></div>
          <div class="col-lg-4">
              <h2>TutorialEdge Search: {{query}}</h2>
              <form class="form">
                  <input class="form-control" type="text" ng-model="query" ng-change="updateValue()">
              </form>
          </div>
          <div class="col-lg-4"></div>
      </div>
  </div>

  <div class="search-results">
      <div class="container">          
          <div class="result" ng-repeat="result in results | filter: query">
              <a href="#"><h2>{{result.title}}</h2></a>
              <p class="url">{{result.link}}</p>
              <p>{{result.content}}</p>
          </div>
      </div>
  </div>
  
  <div class="footer">
      <div class="container">
          <p class="info">
              Full Source Code for this example can be found here: Github Link
          </p>
          <p class="info">
              Original Tutorial Link: http://tutorialedge.net
          </p>
      </div>
  </div>
  
  <script src="AppController.js"></script>
</body>
</html>
```

<b>Our CSS</b>

```css
.search-box{
    background-color: #f1f1f1;
    border-bottom: 1px solid #E5E5E5;
    margin-bottom: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
}

.search-box h2{
    color: #4285F4;
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
}

.search-box input {
    border-radius: 0;
}

.result h2{
    font-size: 18px;
        display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
    white-space: nowrap;
}

.result p{
    color: #545454;
    font-size: small;
    font-family: arial,sans-serif;
}
.result{
    padding-bottom: 20px;
    border-bottom: 1px solid #E5E5E5;
}

.result p.url{
        color: #006621;
    font-style: normal;
        font-size: 15px;
        font-weight: bold;
        padding-top: 0px;
        margin-bottom: 5px;
        padding-bottom: 2px;
}
```

<p>This is just basic html so far but let’s add some angularjs functionality to it and get all of our results listing in a google like manner. We’ll skip pagination as that’s going to be the subject of my next tutorial.</p>

<p>To get us started we’ll just be listing everything from the following JSON array, however you could easily hook this up to a REST api that returns meaningful results if you wished too. We’ll create our own controller for this one-page application:</p>

```js
var myApp = angular.module('myApp',[]);

myApp.controller('SearchController', ['$scope', function($scope) {
    
    $scope.results = [
        { title : "Cars", link: "http://tutorialedge.net", content: "lorem ipsum doler fox pixel"},
        { title : "Boats", link: "http://tutorialedge.net", content: "lorem ipsum doler cat pixel"},
        { title : "Vans", link: "http://tutorialedge.net", content: "lorem ipsum doler pig pixel"},
        { title : "Limos", link: "http://tutorialedge.net", content: "lorem ipsum doler pixel"}
    ];
    
}]);
```

<p>Now that we’ve implemented that you should hopefully see the everything in our array listing on our search results page:</p>

<p>Ok so now that we’ve got everything we need to display our search results we can move onto implementing our search box. This will essentially take in our search query string and then filter the results that we’ve listed to show only those that present a match. The match could be present in either the title, the url or the content of the list we are using so it’s kind of similar to the way google shows you pages for things that contain information about specific topics.</p>

<h2>The Filter Code:</h2>

<p>In order for us to make this list filter-able we simply have to add the following to our ng-repeat statement. </p>

```html
<div class="result" ng-repeat="result in results | filter: query">
  <a href="#"><h2>{{result.title}}</h2></a>
  <p class="url">{{result.link}}</p>
  <p>{{result.content}}</p>
</div>

```