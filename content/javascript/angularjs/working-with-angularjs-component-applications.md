---
author: Elliot Forbes
date: 2017-04-09T21:15:58+01:00
desc:
  In this tutorial we look at how you can define your own components and
  effectively extend component based angularjs applications.
series: angularjs

tags:
  - javascript
title: Working With AngularJS Component Based Applications
twitter: https://twitter.com/Elliot_F
---

If you haven’t read my article on using a different architecture styles in your
AngularJS applications then I recommend you check it out here:
[Structuring AngularJS Applications](/javascript/angularjs/angularjs-project-structure-tutorial/)

In this article we will be having a look at the key features present in my
[AngularJS Admin Panel](https://github.com/emforce/Angular-Component-Admin-Panel)
application. This application utilizes a component based architecture and
follows some of the best practices outlined in Todd Motto’s
[Style Guide](https://github.com/toddmotto/angular-styleguide)

## Getting the Code

If you have git installed on your local machine then getting the code is just a
case of doing:

```bash
git init .
git remote add origin https://github.com/emforce/Angular-Component-Admin-Panel.git
git pull origin master
```

This should pull the latest version of the code to your current working
directory.

## Building our Application

This application currently uses gulp in order to minify and concatenate any and
all files under our components directory into a bundle.js file. In order to
include our new changes in this bundle.js file we need to run the `gulp watch`
task whilst we are developing this code. Every time a code change is made within
our components directory this watch task automatically calls our scripts task.

For more information on using gulp to improve your angularjs development flow
check out this tutorial:
[Automating your AngularJS Workflow with Gulp](/javascript/angularjs/automating-your-angularjs-workflow-with-gulp/)

## The Structure

The first thing we should look at is the structure. For cleanliness I’ve created
a src sub-folder within which all of our own code will be stored. This includes
the app directory, the assets directory and the dist directory.

All of our required node_modules will be stored at the root directory of our
project and this should hopefully keep them somewhat out of the way. The same is
true for our gulpfile.js, our package.json and our readme.md.

```c
-- node_modules/
-- src/
---- app/
---- assets/
---- dist/
```

### Component Based Architecture

As I’ve already said, this application utilizes a component based architecture.
This architecture style is perfect for medium to large projects that could
continue to grow long into the future. By modularizing code and having that
separation of concerns for every one of these modules, we safeguard ourselves
against potentially breaking aspects of our application further down the line by
modifying code that is tightly coupled. As with any architecture style this
features drawbacks, the biggest of which is that we will constantly find
ourselves breaking the Don’t Repeat Yourself (DRY) methodology. However I feel
that when developing huge, complex frontend applications, having that separation
of concerns is far more beneficial in the long run.

## Extending This Application

If we wanted to extend this application with a module of our own, we can simple
create a folder within our components directory in a fitting place and develop
the code solely in that directory.

Say for instance we wanted to create a youtube-subscribers page. We could create
a directory within the social directory called youtube-subscribers. Within that
directory we would create 4 main files initially:

```bash
-- app/components/social/
---- youtube-subscribers/
------ youtube-subscribers.html
------ youtube-subscribers.component.js
------ youtube-subscribers.controller.js
------ youtube-subscribers.routes.js
```

### Our HTML Page

The application currently uses the ng-view directive and ng-routes in order to
decide what html to show depending on what url you are currently looking at.
We’ve defined a _master_ page within which we can display any new widgets or
pages without having to duplicate our navigation code.

For our new youtube-subcribers.html page, this means we can just define
something like so:

```html
<div class="component">
  <div class="header">
    Youtube Subscribers
  </div>
  <div class="content">
    <!-- Any number of barcharts, line-graphs etc to show our youtube stats over time -->
  </div>
</div>
```

### Our Routes Page

Now that we have our html defined for our youtube-subscribers page, we need to
define a route that will show this html whenever we navigate to it. We can do
this by opening up the youtube-subscribers.routes.js file and adding the
following:

```js
function youtubeSubscriberRoutes($routeProvider) {
  $routeProvider.when("/youtube-subscribers", {
    templateUrl:
      "app/components/social/youtube-subscribers/youtube-subscribers.html"
  });
}
youtubeSubscriberRoutes.$inject = ["$routeProvider"];

angular.module("social").config(youtubeSubscriberRoutes);
```

If you try navigating to `http://localhost:port/#/youtube-subscribers`, you should
now see our application as well as our newly defined youtube-subscribers.html
rendering just below our navigation.

### Our Components File

Currently you’ll notice we are using an absolute path to our defined html page.
But say we wanted to display this page elsewhere as part of a bigger page? Well
for this we’d have to define our component.

```js
var youtubeSubscribers = {
  templateUrl:
    "app/components/social/youtube-subscribers/youtube-subscribers.html",
  bindings: {
    youtubeSubscribers: "<"
  }
};

angular.module("social").component("youtubeSubscribers", youtubeSubscribers);
```

This defines a youtubeSubscribers object with the same templateUrl that points
to our newly created youtube-subscribers.html page and also creates the bindings
for any variables we may wish to pass to that html page.

### Updating our Routes Provider

So now that we have a component defined for our application we can jump back
into our youtube-subscribers.routes.js file and modify templateUrl to template
and set it to the following:

```js
function youtubeSubscriberRoutes($routeProvider) {
  $routeProvider.when("/youtube-subscribers", {
    template: "<youtube-subscribers></youtube-subscribers>"
  });
}
youtubeSubscriberRoutes.$inject = ["$routeProvider"];

angular.module("social").config(youtubeSubscriberRoutes);
```

Now, when you navigate to `http://yourapp:port/#/youtube-subscribers` you should
hopefully still see the same html that you defined in your
youtube-subscribers.html file. The only difference being that it’s referencing
our newly created component and not just pulling in the html directly from the
file.

### Our Controller File

So we’ve done the bare minimum in order to create a new angularjs component, but
now we want to start adding some functionality to it. In order to that we can
define the controller that will contain all our desired functionality that only
our component can access.

```js
function YoutubeSubscriberController(){
  var ctrl = this;

  ctrl.youtubeSubscribers = [{ name: ‘elliot’}];

}
angular.module('social')
  .controller('YoutubeSubscriberController', YoutubeSubscriberController);
```

This creates the basic controller within which we can add things like querying
the youtube-api for our subscriber count or querying our own RESTful services in
order to attain any extra information we want to render through our application.

### Adding our Controller to Our Component

Now that we actually have a controller defined, we can come back into our
`youtube-subscriber.component.js` file and add a reference to our newly created
controller like so:

```js
var youtubeSubscribers = {
  templateUrl:
    "app/components/social/youtube-subscribers/youtube-subscribers.html",
  controller: YoutubeSubscriberController,
  bindings: {
    youtubeSubscribers: "<"
  }
};

angular.module("social").component("youtubeSubscribers", youtubeSubscribers);
```

Now we should be able to use any of the functions we may decide to add to the
controller as well as view the variables that we’ve bound to our component. In
this case we’ll just do an ng-repeat over all of the subs in our
youtubeSubscribers array that we’eve defined in our controller.

```html
<div class="component">
  <div class="header">
    Youtube Subscribers
  </div>
  <div class="content">
    <!-- Any number of barcharts, line-graphs etc to show our youtube stats over time -->
    <p ng-repeat="sub in $ctrl.youtubeSubscribers">{{ sub }}</p>
  </div>
</div>
```

## Conclusions

This hopefully gave you an idea of how easy it is to extend a component based
angularjs application and to define everything you need for your own components.
We’ve covered how to bind variables and controllers to these newly created
components and then access these variables within our html.

If you found this tutorial useful then please let me know in the comments
section below. Or conversely if you have anything you feel should be added to
this tutorial let me know.
