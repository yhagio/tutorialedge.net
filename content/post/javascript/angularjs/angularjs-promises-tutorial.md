+++
draft = true
date = "2017-04-15T14:41:31+01:00"
title = "AngularJS Promises Tutorial"
desc = "In this tutorial we examine the $q service and how we can chain promises."
tags = ["angularjs", "javascript"]
series = [ "angularjs" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

In this tutorial we'll be looking at how to work with and define promises in AngularJS. For more information check out the official [AngularJS Documentation](https://docs.angularjs.org/api/ng/service/$q)

## What are Promises in Javascript?

Essentially when you create a promise, you are ensuring that a certain order is followed in the execution of your code. Javascript is asynchronous by nature and in the execution of a method it’s not guaranteed what part of it will finish execution first. This is a big change if you are used to languages like Java and C++ where the order of execution is always exactly the same.

## Example of a Promise

If you have written any AngularJS applications that call upon the $http service then you will have already had experience working with Promises. For example this is a promise:

~~~js
// We create our promise
$http.get(‘api/status’)
    // that once complete will call either our success callback function
    // or our error callback function
    .then(function success(response) {
        // handle our response object
        $log.log(response);
    }, function error(response) {
        // handle our error
        $log.log(“Error Thrown”);
    });
~~~

This is essentially what all promises look like in javascript, we create the promise and pass it two *callback* functions. A good analogy to describe this is as follows:

Say you were cooking a meal
You delegate the task of cutting the onions to another person and say, let me know when this is done.
Whilst this other person is working on cutting the onions, you are free to carry on working on the carrots.
When the other person is done with the onions, they let you know and you can either add the onions to the stew if they were cut the right way, or throw them in the bin and try again.

This is also a good example of one of the main benefits to Javascript asynchronous design, the thread executing the code isn’t held up and can carry on doing other things whilst it waits for the results of the promise. 

In code terms the above flow would look something like this:

~~~js
$http.get('api/cut/onions')
  .then(function success(response){
    // add them to the stew
  }, function error(response){
    // these onions were bad,
    // throw them away
  });

// continue cutting carrots whilst you wait for the promise to finish executing
cutCarrots();
~~~

However this is also an example of how things can go wrong in your applications, for instance. Because we don’t have any control over when a promise will finish, we could see weird side-effects from our code. For instance we could see the onions added to the stew before the carrots which might not be what we want.

## Chaining Promises

Thankfully, we have a way we can dictate when we want things done. This is where the $q service comes in. If we wanted to maintain the order in which things happen in the preparation of our stew we could do something like this:

~~~js
// first chop our onions
$http.get('api/chop/onions')
  .then(function success(response){
    // once that is done chop our carrots
    return $http.get('api/chop/carrots');
  })
  .then(function success(response){
    // once the carrots are done, add both to the stew
    return $http.get('api/add/onionsAndCarrots');
  })
  .then(function success(response){
    // serve our stew
  });
~~~

## Defining our Own Promises

AngularJS's $q service allows to define our own promises. Below you'll find an example controller that contains the ctrl.ourPromise function, this function returns a promise object that we can chain like we have done in our ctrl.$onInit function.

~~~js
function TestController($q, $log){
  var ctrl = this;
  // our $onInit function shows exactly how we can
  // chain our newly defined promise object
  ctrl.$onInit = function() {
    ctrl.ourPromise()
      .then(function success(){
        $log.log("Our Promise has finished");
      });
  };
  // we define our promise object and return it in
  // this function
  ctrl.ourPromise = function(){
    var defer = $q.defer();

    $log.log("Do all of our stuff in here");

    return defer.promise;
  };

};

TestController.$inject = ['$q', '$log'];

angular.module('root')
  .controller('TestController', TestController);
~~~

## Conclusion

If you spot any errors with this tutorial or wish to ask any further questions then let me know in the comments section below.