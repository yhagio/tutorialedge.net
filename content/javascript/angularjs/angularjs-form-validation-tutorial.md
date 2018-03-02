+++
date = "2017-04-09T21:20:37+01:00"
title = "AngularJS Form Validation Tutorial"
draft = true
desc = "In this tutorial we have a look at how to implement form validation using angularjs"
tags = ["angularjs", "javascript"]
series = [ "angularjs" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

In this tutorial I’m going to be demonstrating how we can implement form validation using the AngularJS framework. 

Form validation is a user experience designers best friend when ensuring application users are inputting the correct data into your form. If you had a web application that took in email addresses from prospective clients then you could employ form validation to ensure that they email addresses they are putting in look like standard email addresses. Or you could enforce passwords to follow certain strength guidelines etc.

## Security

Form validation is something that can and should be used along with input validation in order to protect your applications from harmful attacks. If you are passing data back to a RESTful API for processing then you *must* ensure that you perform some form of input validation on the backend as well as the frontend. 

If you do not perform input validation on the backend then it’s possible hackers can manipulate the information you send to the backend regardless of what form validation you do.

![Javascript only form validation](http://i.imgur.com/GluNcro.jpg)

## Implementation

We’ll start with a basic form:

```html
<!DOCTYPE html>
<html ng-app="myApp">
    <head>
        <title>AngularJS Form Validation</title>
        <!-- Latest compiled and minified CSS --><!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
    </head>
    <body ng-controller="AppController">

      <div class="container">
        <form name="testform">
          <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input type="username" class="form-control" id="exampleInputEmail1" placeholder="Email" ng-model="user.name">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" ng-model="user.pass">
          </div>
          <button type="submit" ng-click="register(user)" class="btn btn-default">Register</button>
        </form>
      </div>

        <script src="AppController.js"></script>
    </body>
</html>
```

With our AppController looking like so:

```js
var myApp = angular.module('myApp',[]);

myApp.controller('AppController', ['$scope', function($scope) {

    $scope.testVariable = "hello world!";

    $scope.register = function(user) {
      console.log(user);
    };

}]);
```

Now what this does is it takes in our username and password from our form and calls the register function that we have defined in our AppController. The register function essentially just logs out the inputted username and password to the console.

## Adding Validation

In this example we’ll create 2 regexs, one for our usernames and one for our passwords. These aren’t especially secure regexs so I’d probably try to find something more secure.

Notice how I’ve added the ng-pattern directive to both our username and password inputs. I’ve also added a p html tag which will show if either the username or password inputs are invalid.
We’ve also added ng-disabled to our button which will render the register button disabled until the input in the form meets the necessary standards.

```html
<div class="container">
  <form name="testform" novalidate>

    <div class="form-group">
      <label>Username</label>
      <input type="username" class="form-control" name="username" placeholder="Email" ng-pattern="userRegex" ng-model="user.name">
      <br/>
      <p class="bg-warning" ng-show="testform.username.$invalid">Username needs to be at least 8 characters long</p>
    </div>

    <div class="form-group">
      <label>Password</label>
      <input type="password" class="form-control" name="password" ng-pattern="passRegex" placeholder="Password" ng-model="user.pass">
      <p class="bg-warning" ng-show="testform.password.$invalid">Password needs to be at least 5 characters long</p>
    </div>

    <button ng-disabled="testform.$invalid" type="submit" ng-click="register(user)" class="btn btn-default">Register</button>
  </form>
</div>
```

#### AppController.js

```js
var myApp = angular.module('myApp',[]);

myApp.controller('AppController', ['$scope', function($scope) {

    $scope.testVariable = "hello world!";

    $scope.userRegex = '[a-zA-Z]{8,}';

    $scope.passRegex = '[a-zA-Z]{5,}';

    $scope.register = function(user) {
      console.log(user);
    };

}]);
```
