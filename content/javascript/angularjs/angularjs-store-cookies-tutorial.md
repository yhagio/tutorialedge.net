---
author: Elliot Forbes
date: 2017-04-09T21:11:31+01:00
desc:
  In this tutorial we look at how we can use the $cookie service in angularjs in
  order to store information across requests.
series: angularjs

tags:
  - javascript
title: How To Store Information in Cookies in AngularJS
twitter: https://twitter.com/Elliot_F
---

In this tutorial we look at how you can store information in cookies in your
AngularJS application.

A cookie is a small piece of data that’s typically sent from a website you may
be viewing and stored by your web browser. We can use these cookies for a wide
range of things, from storing the last viewed items of a visitor to
authentication cookies. These cookies persist across requests and thus are
advantageous over using parent components or services to store information
between routes as is detailed here:
[Passing Information Between Routes using Services](/javascript/angularjs/passing-data-between-routes-angularjs/)

<div class="github-link">The full source code for this tutorial can be found here: <a href="https://github.com/elliotforbes/angularjs-fundamentals">AngularJS Fundamentals Repo</a></div>

# Cookie Limitations

It must be noted that typically you cannot store more than 20 cookies per web
server, or more than 4KB of data per cookie.

Specifying max-age is optional and without this the cookie will only last the
same amount of time as the browser remains open. If you were to close the
browser then the cookie would be lost. However if you specify a max-age then the
browser will retain that cookie for the longer. This is typically how sites like
Amazon retain your browsing history and can determine what to show you in the
recommended items section.

# Implementation

In this tutorial I’ll be following a component based architecture style, if you
are not familiar with components in AngularJS then I recommend you check our my
other post:
[Working with AngularJS Component Based Applications](/javascript/angularjs/working-with-angularjs-component-applications/).

Conversely you can also just lift the code from the controller and put it into
your own existing controllers.

## The Necessary Imports

In your angular application you’ll need to add the following script tag to the
head of your main html page and below your angular.js script tag:

```html
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
  ...
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-cookies.min.js"></script>
</head>
```

Ensure that the version of angular-cookies you are importing is the same version
of angularjs that you are using within your application or you may run into
issues.

## Our Controller

In our controller we’ll have 2 main functions, one to get the cookies on page
load and one to set the cookies on a button click. We’ll have to ensure that we
import \$cookies service to our controller:

```js
function CookieController($log, $scope, $cookies) {
  var ctrl = this;

  ctrl.$onInit = function() {
    $log.log("Initialized cookie page");
    ctrl.storedCookie = $cookies.get("favourite");
    $log.log(ctrl.storedCookie);
  };

  ctrl.storeCookie = function(cookie) {
    $log.log(cookie);
    $cookies.put("favourite", cookie);
  };
}

CookieController.$inject = ["$log", "$scope", "$cookies"];

angular.module("root").controller("CookieController", CookieController);
```

## Our Html Page

Our html page will consist of an input field and a button, when we enter a value
into the input field and click our Store Cookie button, the ctrl.storeCookie
function will be called within our controller which will store whatever is in
our input field in a ‘favourite’ cookie.

```html
<div class="component">
  <div class="header">
    <h2>Cookies Demo</h2>
  </div>
  <div class="content">
    <p>
      Enter what you want to store in your cookie in the input box below and
      click the submit button.
    </p>
    <p>When you refresh the page you should see your cookie below:</p>
    <p>Info Stored in Cookie: <b>{{ $ctrl.storedCookie }}</b></p>
    <div class="form-group">
      <label>Set Cookie</label>
      <input
        class="form-control"
        placeholder="cookie"
        ng-model="$ctrl.cookie"
      />
      <br />
      <button
        class="btn btn-primary"
        ng-click="$ctrl.storeCookie($ctrl.cookie)"
      >
        Store Cookie
      </button>
    </div>
  </div>
</div>
```

## Our Component

We’ll have a very simple component to tie everything together:

```js
var cookies = {
  templateUrl: "./app/components/cookies/cookies.html",
  controller: CookieController,
  bindings: {
    storedCookie: "=?",
    cookie: "<"
  }
};

angular.module("root").component("cookies", cookies);
```

# Conclusion

I hope that you found this tutorial useful, if you’ve got any further queries
then please feel free to let me know in the comments section below. The full
source code for this tutorial is included in my
[AngularJS Fundamentals Repo](https://github.com/elliotforbes/angularjs-fundamentals).
Pull this code and run it using live-server and then navigate to
http://localhost:8080/#/cookies and you should see the cookies component
working.
