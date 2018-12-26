---
author: Elliot Forbes
date: 2017-04-09T21:04:56+01:00
desc: Here we look at everything it takes to define your own Angular components.
series: angular
image: angular.png
tags:
- typescript
title: Angular Components Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> This tutorial was created using Angular 2.2

Most new frontend frameworks feature this concept of components and compartmentalizing blocks of code into distinct blocks that can be reused in multiple locations around your application. In Angular 2 we can do this by creating our own components.

# What Are Components?

In Angular we can define these things we call components. These components are functional blocks of code that we can attach to html tags. Say for instance we are creating an application that mimics facebook, we want a to display a small widget on the side of the page that shows the current users current profile picture, as well as some other pieces of information. We could encapsulate all the functionality of this widget into a component. 

## Why Are Components Used?

When we split our applications into numerous components and sub-components we are essentially breaking down our problems into smaller and smaller problems. We create a loosely coupled system of components that can be easily changed and tested without potentially impacting anything else in our system. 

> From a development point of view this is hugely beneficial, huge teams of developers can work on a single application without worrying about pushing other bugs into production. 

# Creating a Simple Component

If you’ve come from an Angular 1.* background then you should find creating components to be a little bit simpler in Angular2. In Angular 2 we have done away with controllers and controller files and merged them straight into one single component file. In this component file we essentially define our controller as a class and then we annotate this class using the @Component({ … }) angular annotation.

```ts
// first we have to import Component
import { Component } from '@angular/core';


// next we annotate our UserComponent class
@Component({
  selector: 'user',
  template: '<h2>User</h2>'
})
// we define our class
export class UserComponent { }
```

# @Component Decorator

* *selector* - This defines what HTML tag we will bind to. In the above example we bind to the `<user></user>` tag.
* *template* - In this we define what html we wish to render for this component. In the above component we are simply going to print out a very simple `<h2>` tag.
* *templateUrl* - this is an alternative to *template*, we can define a html file which will contain all the html content for this component. This is typically used for situations where there is a lot of html and it makes sense to split it apart from the main component file.
* *styles* - This option allows us to define specific styles that will be unique to our component. 
* *directives* - If we want to access a directive then we would pass it into our component using this option.
* *providers* - Here we pass in any services that we want to utilize within our component.

# Creating Components using the Angular-CLI

If you've built your project using the Angular-CLI then creating new components that work straight away is easy:

```bash
ng g component your_component_name
```