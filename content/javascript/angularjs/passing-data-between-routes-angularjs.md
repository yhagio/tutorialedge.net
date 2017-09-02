+++
date = "2017-04-09T21:13:23+01:00"
title = "Passing Data Between Routes in AngularJS"
draft = true
desc = "In this tutorial we look at how we can store information between routes using services in our angularjs applications."
tags = ["angularjs", "javascript"]
series = [ "angularjs" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

In this tutorial we’ll be looking at how we can store or pass information between routes in an AngularJS application. This can be useful in a number of different applications and is actually quite simple.


<div class="github-link">
This tutorial will be using the code from this github repo: <a href="https://github.com/elliotforbes/angularjs-fundamentals">AngularJS Fundamentals</a>
</div>

If you want to see a working example of this then simply clone the repo to your local machine and run it. I typically use the npm module: live-server in order to run my applications: [link](https://github.com/tapio/live-server)

## Implementation

The easiest way to implement cross route storage is to create a service and pass what you want to store to the service before you refresh your application. Our service will basically act as an in-memory cache for anything we wish to pass it and we can easily extend it to store as much as we'd like, for now however, we'll just be creating 2 methods and one variable to store things. 

As a means of an example we’ll be creating 2 components, a 'route1' component and a 'route2' component. On each page we'll then have an input field in which you can enter anything you wish and a button to press in order to 'push' whatever is in that input field to our storage service. These can be accessed by going to http://app:port/#/route1 and http://app:port/#/route2 respectively.

#### Our Storage Service

This storage service can be used throughout our application and will store whatever we want as long as the application isn’t refreshed in the browser. A service acts as the perfect storage solution in these situations as it follows the singleton design pattern. 

~~~
function StorageService($log) {

  // we create our service object
  var StorageService = {};

  // this is where we'll store our stuff
  var storage = [];

  // this method will take in an object and set our storage variable to whatever that object is
  StorageService.store = function(object) {
    $log.log(object);
    this.storage = object;
    $log.log(this.storage);
  }

  // this is the getter for whatever is in our store
  StorageService.getStore = function() {
    return this.storage;
  }
  // here we return our newly created storage service
  return StorageService;
}

StorageService.$inject = ['$log'];

angular.module('root')
  .factory('StorageService', StorageService);
~~~

This is all we need for a very simple storage service, this can easily be extended with more variables and more methods to get and set things but for now this will do as an example.

## Our RouteProvider:

In this route provider we'll define our first and second route and pass in our the two components that we will be defining below:

~~~
function routeTestProvider($routeProvider){
    $routeProvider
      .when('/route1', {
          template: '<route1></route1>'
      })
      .when('/route2', {
          template: '<route2></route2>'
      });
}
routeTestProvider.$inject = ['$routeProvider'];

angular.module('root')
  .config(routeTestProvider);
~~~

#### Component 1

This component will consist of 3 different files, our index.html file, our controller and our component file.

~~~
<div>
  <h2>Route 1 Page</h2>


  {{ $ctrl.storage }}


  <input type="text" class="form-control" ng-model="$ctlr.message" />


  <button class="btn btn-primary" ng-click="$ctrl.store($ctrl.message)"></button>


</div>
~~~


When you input something into the input box and click the store button, the contents of that button are pushed to the storage service and can be queried in our next view.


~~~
function Route1Controller($log, StorageService) {
  var ctrl = this;


  ctrl.storage = [];

  // on page load we check to see if the storage service contains anything
  this.$onInit = function() {
    ctrl.storage = StorageService.getStore();
  }

  // here we pass whatever is in our input field to our
  // storage service
  ctrl.store = function(object) {
    StorageService.store(object);
  }

}
// inject both $log and our new StorageService into our controller
Route1Controller.$inject = ['$log', 'StorageService'];

// Bind this controller to our root module
angular.module('root')
  .controller('Route1Controller', Route1Controller);
~~~

Above you’ll see the $onInit function queries the StorageService as soon as the component loads. 

#### Our Second Component

Our second component is almost identical to our first, it'll perform exactly the same stuff as our first component but I wanted to differentiate them into two separate components to serve as a demonstration:

~~~
<div>
  <h2>Route 2 Page</h2>


  {{ $ctrl.storage }}


  <input type="text" class="form-control" ng-model="$ctlr.message" />


  <button class="btn btn-primary" ng-click="$ctrl.store($ctrl.message)"></button>


</div>
~~~

Our Route2 component will again be bound to the root module and will instead pass the Route2Controller and route2.html files. Other than that it's exactly the same.

~~~
var route2 = {
  templateUrl : 'app/components/cross-route-communication/route2/route2.html',
  controller: Route2Controller,
  bindings: {
    message: '<'
  }
}


angular.module('root')
  .component('route2', route2);
~~~

The Controller again gets passed our newly created StorageService and on the page's load, it queries this StorageService to see if there is anything there. As long as the page hasn't been reloaded since passing data from our route1 component, we should see whatever we entered in route1 being loaded straight of the bat.

~~~
function Route2Controller($log, StorageService) {
  var ctrl = this;


  ctrl.storage = [];

  // again on page load we query our storageservice
  // if we've come from route1 and passed information when in route1
  // we should see our ctrl.storage variable being set here
  this.$onInit = function() {
    ctrl.storage = StorageService.getStore();
  }

  // we can override what we've stored in route1 with whatever
  // we enter in this component
  ctrl.store = function(object) {
    StorageService.store(object);
  }

}

// again we pass both $log and our StorageService to this component
Route2Controller.$inject = ['$log', 'StorageService'];


angular.module('root')
  .controller('Route2Controller', Route2Controller);
~~~

## Conclusion

If you found this tutorial useful or need a better explanation then let me know in the comments and I'll be glad to address your concerns.