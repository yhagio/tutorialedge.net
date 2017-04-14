+++
title = "angularjs event handling tutorial"
draft = true
date = "2017-04-09T21:13:59+01:00"
desc = "In this tutorial we explore some of the ways we can handle browser and document events in our AngularJS applications"
tags = ["angularjs", "javascript"]
series = [ "angularjs" ]
+++

In this tutorial we’ll be looking at the different ways we can handle events in AngularJS. We’ll be exploring several of the event listening directives that AngularJS has on offer and how we can use these to create cool behaviours in our AngularJS Applications.


<div class="github-link">
All code in this tutorial can be found in this github repo: <a href="https://github.com/elliotforbes/angularjs-fundamentals">Github Repo</a>
</div>


## Browser Events


In most modern web browsers, every time something interesting happens in either the Document or the browser an event is generated. Within AngularJS we can register event listeners that will listen for said events and perform some action whenever they occur. 


An event can be a vast number of things, from hovering over a hyperlink to double-clicking on an object on the page and thankfully Angular has directives that cover a lot of these. 


## AngularJS Event Listeners


The complete list of AngularJS events are as follows:


* ng-blur
* ng-change
* ng-click
* ng-copy
* ng-cut
* ng-dblclick
* ng-focus
* ng-keydown
* ng-keypress
* ng-keyup
* ng-mousedown
* ng-mouseenter
* ng-mouseleave
* ng-mousemove
* ng-mouseover
* ng-mouseup
* ng-paste


These can be used by placing them on the object of your page and passing this directive the name of the function you wish to call or the code that you wish to execute. 


~~~
// passing it the code we wish to execute
<div ng-click="console.log('hello world')"></div>
// or the named function we wish to call
<div ng-click="myNamedFunction()"></div>
~~~
This shows the power of the AngularJS framework as it hides all the ugly DOM manipulation code and allows us to focus on implementing the business logic into our application.


## Implementation

Below you'll find an array of how we can utilize these event handling directives in AngularJS. These are just some examples of how you could go about implementing these directives in your own Angular application.

~~~
<input class="form-control" ng-keydown="counter = counter + 1" placeholder="Keydown Change..."/>
<input class="form-control" ng-keypress="counter = counter + 1" placeholder="Keypress change..."/>
<button class="btn btn-primary" ng-click="counter = counter + 1">Click Me!</button>
<button class="btn btn-primary" ng-dblclick="counter = counter + 1">Double Click Me!</button>
<p ng-copy="counter = counter + 1">Copy text from me!</p>
<textarea class="form-control" ng-cut="counter = counter + 1" cols="30" rows="10">Cut text from me!</textarea>
<input type="text" class="form-control" ng-focus="counter = counter + 1" placeholder="Focus on me..."/>
<p ng-mouseenter="counter = counter + 1">Mouse Enter event</p>
<p ng-mouseleave="counter = counter + 1">Mouse Leave event</p>
<input type="text" class="form-control" ng-paste="counter = counter + 1" placeholder="paste into me..."/>
~~~