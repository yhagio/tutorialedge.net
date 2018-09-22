---
author: Elliot Forbes
date: 2017-04-09T21:18:27+01:00
desc: In this tutorial we look at the numerous different ways you can structure your
  angularjs applications as well as the pros and cons to each structure
series:
- angularjs
tags:
- angularjs
- javascript
title: AngularJS Project Structure Tutorial
twitter: https://twitter.com/Elliot_F
---

Project organization is important for all angularjs applications. Having a well defined and easy to traverse project structure can be hugely beneficial further down the line when you have to deal with maintenance and enhancements. 

I'm going to start off by showing you sub-optimal project structures and then move on to the most recommended way of structuring your angularjs projects.

## Simple PoCs and Tiny Applications

There are multiple ways we can structure applications and of course different structures are better suited for different applications. For incredibly simple PoCs and technical demos then you might be better suited to a flat structure that looks like so:

```javascript
Project Structure 
-- index.html
-- app.js
-- angular.min.js
-- controller.js
-- service.js
```

But this structure, if the app grows, becomes ungainly and your app.js, controller.js and service.js become packed with thousands of lines of code. 

| Pro/Con | Justification |
| --- | --- |
| Pro | incredibly quick and easy to put together |
| Pro | good for initial PoCs |
| Con | As soon as your application grows this becomes a mess |
| Con | Having one file for controllers and services could lead to a haystack of code |

## File Type Based Approach

Another well known way of structuring applications is to split applications up based on file type. This leads to a project structure like this:

```javascript
Project Structure 
-- controllers
-- services
-- routes
-- directives
-- index.html
-- app.js
```

Now whilst this may seem to offer a nice structure, it essentially leaves you jumping around the project when adding a new feature to your application. Code for one piece of functionality is spread across multiple directories and as soon as your application grows, you’ll suddenly have a haystack of controllers to wade through.

| Pro/Con | Justification |
| --- | --- |
| Pro | features a more structured approach than the flat structure featured above |
| Pro | Good for small-medium sized applications where number of files won't grow into a haystack |
| Con | Code for each feature is split across multiple directories |
| Con | As soon as you hit more than 10 or so of a file type, it becomes a haystack |

## Component Based Approach

A new style of structuring your application is to follow a component based approach. This makes sense as we can break our applications down into a series of components and sub-components.

This gives us a number of benefits including easy extendability and maintainability. Take for instance a very simple website admin application, the file structure for that if broken into components could look something like so:

```javascript
Project Structure 
-- libs/
-- src/
---- assets/
---- common/
------ top-nav/
-------- top-nav.html
---- components/
------ articles/
-------- articles-edit/
-------- articles-new/
-------- articles-all/
-------- article.routes.js
-------- article.component.js
-------- article.service.js
---- app.js
---- app.routes.js
---- index.html
``` 

Notice how within our articles directory we have multiple sub-directories such as articles-edit
And articles-new which would in theory contain all our code for creating new articles and editing them.

Now imagine we wanted to add a comments section that showed us all the new comments on our site. We could easily extend this structure by adding a comments/ directory underneath our components/ directory. This comments/ subdirectory would encapsulate all our comments related code.

| Pro/Con | Justification |
| --- | --- |
| Pro | Applications can be broken down into an unlimited number of sub-components |
| Pro | Easy to extend and add new components that fit into project structure |
| Pro | Easy to maintain, all structure for a component is grouped under one directory | 
| Pro | Parallel development becomes easier |
| Con | Interaction between components may be challenging to implement |


## Examples of Component Based Applications

For examples of how to write your own component based applications then please check out my post: [Working with Component Based AngularJS Projects](https://tutorialedge.net/working-with-angularjs-component-applications).  

Todd Motto, one of the most respected AngularJS community members has an excellent github repo that showcases a component based application : [Angular 1.5 Components App](https://github.com/toddmotto/angular-1-5-components-app)

## Conclusion

If you found this tutorial or have any further questions then please let me know in the comments section below.