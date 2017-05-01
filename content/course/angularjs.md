+++
date = "2017-04-14T20:27:58+01:00"
title = "AngularJS Fundamentals"
draft = true
author = "Elliot Forbes"
layout = "simple"
image = "angularjs.png"
+++

AngularJS is a web framework designed and built by Google for the main purpose of building web apps. It provides automatic 2 way data-binding and eliminates the need to manually manipulate the DOM. This is exceptionally useful as it allows developers to focus purely on the business logic behind their applications as opposed to tedious boilerplate code.

The models that angularjs uses are plain old javascript objects, this again makes it far easier to test, maintain and reuse.

Overall it’s a hugely popular framework that has seen a huge rise in adoption in financial institutions and tech companies due to its relative ease of use and the power that it brings to the table.

## Who is this Course For?

This course is designed to take someone that has knowledge of Javascript and set them on the right path to creating their own web applications. 

You will require:

* A Text Editor - I recommend Visual Studio Code

## Course Content

In this course I'll be demonstrating the absolute fundamentals to developing applications with AngularJS 1.X. We'll begin by creating a very simple admin application that will perform multiple tasks such as consuming RESTful APIs, Lazy Loading articles and more. 

We’ll begin by creating some very simple Single Page Applications or SPAs and then build up on these until we’ve covered everything you need in order to develop your own web applications using the AngularJS framework.

<div class="lesson row">
  <div class="lesson-number col l2 m2 s12">
    <div class="circle">1</div>
  </div>
  <div class="lesson-info col l10 m10 s12">
    <a href="/post/javascript/angularjs/angularjs-data-binding-tutorial/"><h3>AngularJS Scope and Scope Inheritance</h3></a>
    <p>Scopes are what allow us to manipulate data in the backend controller and have that data reflected instantaneously in the frontend. Scopes provide APIs which what any objects we define and then when they detect changes, they propogate these changes through the system. </p>
    <a href="/post/javascript/angularjs/angularjs-data-binding-tutorial/">Read Now</a>
  </div>
</div>

<div class="lesson row">
  <div class="lesson-number col l2 m2 s12">
    <div class="circle">2</div>
  </div>
  <div class="lesson-info col l10 m10 s12">
    <a href="/post/javascript/angularjs/angularjs-ng-model-in-ng-if-tutorial/"><h3>AngularJS ng-if Child Scopes</h3></a>
    <p></p>
    <a href="/post/javascript/angularjs/angularjs-ng-model-in-ng-if-tutorial/">Read Now</a>
  </div>
</div>

<div class="lesson row">
  <div class="lesson-number col l2 m2 s12">
    <div class="circle">3</div>
  </div>
  <div class="lesson-info col l10 m10 s12">
    <a href="/post/javascript/angularjs/angularjs-controllers-tutorial/"><h3>AngularJS Controllers Tutorial</h3></a>
    <p>Controllers are what we typically use to define our web application’s behavior. They should be used to manipulate our $scope objects and pull all of our applications together.</p>
    <a href="/post/javascript/angularjs/angularjs-controllers-tutorial/">Read Now</a>
  </div>
</div>

<div class="lesson row">
  <div class="lesson-number col l2 m2 s12">
    <div class="circle">4</div>
  </div>
  <div class="lesson-info col l10 m10 s12">
    <a href="/post/javascript/angularjs/angularjs-directives-tutorial/"><h3>AngularJS Directives Tutorial</h3></a>
    <p>At a high level, directives are markers on a DOM element (such as an attribute, element name, comment or CSS class) that tell AngularJS's HTML compiler ($compile) to attach a specified behavior to that DOM element (e.g. via event listeners), or even to transform the DOM element and its children. </p>
    <a href="/post/javascript/angularjs/angularjs-directives-tutorial/">Read Now</a>
  </div>
</div>

<div class="lesson row">
  <div class="lesson-number col l2 m2 s12">
    <div class="circle">5</div>
  </div>
  <div class="lesson-info col l10 m10 s12">
    <a href="/post/javascript/angularjs/angularjs-event-handling-tutorial/"><h3>AngularJS Event Handling Tutorial</h3></a>
    <p>One of the best features of AngularJS is the fact it abstracts away from you all the complex event handling code that you would typically deal with using other frameworks such as JQuery. In this section of the course we look at the numerous ways you can easily handle events in your AngularJS Applications: </p>
    <a href="/post/javascript/angularjs/angularjs-event-handling-tutorial/">Read Now</a>
  </div>
</div>

<div class="lesson row">
  <div class="lesson-number col l2 m2 s12">
    <div class="circle">6</div>
  </div>
  <div class="lesson-info col l10 m10 s12">
    <a href="/post/javascript/angularjs/angularjs-form-validation-tutorial/"><h3>AngularJS Form Validation Tutorial</h3></a>
    <p>In this section we'll be looking at how we can effectively work with forms.</p>
    <a href="/post/javascript/angularjs/angularjs-form-validation-tutorial/">Read Now</a>
  </div>
</div>


<div class="lesson row">
  <div class="lesson-number col l2 m2 s12">
    <div class="circle">7</div>
  </div>
  <div class="lesson-info col l10 m10 s12">
    <a href="/post/javascript/angularjs/angularjs-filter-tutorial/"><h3>AngularJS Filters Tutorial</h3></a>
    <p>By definition filters select a subset of items from an array and returns it as a new array. For front-end applications this can be a very powerful tool that helps us to manipulate the data we've got into a format that suits our needs.</p>
    <ul>
    <li><a href="/post/javascript/angularjs/angularjs-filter-tutorial/">AngularJS Filter Tutorial</a></li>
    <li><a href="/post/javascript/angularjs/angularjs-filter-search-tutorial/">AngularJS Filter Search Tutorial</a></li>
    </ul>
  </div>
</div>


<div class="lesson row">
  <div class="lesson-number col l2 m2 s12">
    <div class="circle">8</div>
  </div>
  <div class="lesson-info col l10 m10 s12">
    <a href="/post/javascript/angularjs/interacting-with-apis-using-http-angularjs/"><h3>AngularJS $http Tutorial</h3></a>
    <p>Here we'll look at how you can utilize AngularJS's $http Service in order to communicate with servers and REST APIs using the browsers XMLHttpRequest object or JSONP.</p>
    <a href="/post/javascript/angularjs/interacting-with-apis-using-http-angularjs/">Read Now</a>
  </div>
</div>



## Factories and Services

In this section we'll examine how to create and use AngularJS Factories and Services.

* [AngularJS Factory Tutorial](https://tutorialedge.net/post/javascript/angularjs/angularjs-factory-tutorial/)

## Routing

AngularJS's routing functionality gives us the ability to have a single master page in which we dynamically load in the necessary views that we need. In this section we'll explore the power of the ng-view directive and the $routeProvider service.

* [AngularJS Templating Tutorial using ng-view Directive](https://tutorialedge.net/post/javascript/angularjs/angularjs-template-tutorial-using-ng-view/)

An interesting problem that comes up with regards to routing is how to pass data between route changes. Say for instance you want to pass form submission data to the next stage of an application, one of the best and easiest ways to do this is using a storage service. In this tutorial we look at exactly how we can implement this:

* [Passing Data Between Routes in AngularJS](https://tutorialedge.net/post/javascript/angularjs/passing-data-between-routes-angularjs/)

## AngularJS Promises

In this section of the course we look at how we can effectively use AngularJS's $q promise service:

* [AngularJS Promises Tutorial](https://tutorialedge.net/post/javascript/angularjs/angularjs-promises-tutorial/)

## Project Structure

The structure you choose for your project is hugely important. Having a clear, consise structure from the get go can help you to no end further down the line. In this section of the course we look at the just how you should structure your angularjs applications so that they can be easily maintained and extended.

* [AngularJS Project Structure Tutorial](https://tutorialedge.net/post/javascript/angularjs/angularjs-project-structure-tutorial/)

## Working with AngularJS Component Based Applications

In this section of the course we look at how you can effectively work with an extend angularjs applications that follow a component based architecture. We see how to define our own component, controller and any necessary routes needed for a new page within an existing application.

* [Effectively Working with Component Based AngularJS Applications](https://tutorialedge.net/post/javascript/angularjs/working-with-angularjs-component-applications/)


## Automating Your AngularJS Workflow with Gulp

This section of the course looks at the build tools we can use to make our life a little easier as AngularJS devs. 

* [Automating your AngularJS Workflow with Gulp](https://tutorialedge.net/post/javascript/angularjs/automating-your-angularjs-workflow-with-gulp/)

## Miscellaneous Tutorials

* [AngularJS Removing Duplicates from an Array](https://tutorialedge.net/post/javascript/angularjs/removing-duplicates-from-ng-repeat/)