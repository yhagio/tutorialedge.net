---
author: Elliot Forbes
date: 2018-03-14T19:12:49Z
desc: In this tutorial, we look at how you can use to vue-router within your VueJS
  applications.
image: vuejs.png
series: vuejs
tags:
- vuejs
- javascript
title: Vue Router Beginners Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 5
---

The vue-router within VueJS allows you to create powerful Single Page Applications with minimal fuss. On a traditional website, each distinct page would constitute a request to the server to load the relevant file. So when someone navigated to http://myapp.com/page-1.html, the `page-1.html` file would be served up. 

However, when navigating through a single page application, you only have see one request made to the server which returns your entire JavaScript application. This means you have full control over the experience your users have when navigating through your application, you can fully control any behaviours you wish in terms of transitions and this tends to give your site a far more dynamic look and feel.

# Installation

In order to get started with the `vue-router` you will first have to include it within your Vue.JS project. This can be done by either adding the `<script>` tag with the appropriate link to your application.

```html
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
```

Or through the use of `npm` or `yarn`:

```js
$ yarn add vue-router
$ npm install vue-router
```

> Full installation instructions can be found here: [Vue-Router Installation Guide](https://router.vuejs.org/en/installation.html)

# Simple Example

In order for us to render a series of distinct pages within our Single Page Application we need to add the `<router-view/>` tag to our application. This will render the component of our choice depending on the route that is hit.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>stock-tracker</title>
    </head>
    <body>
        <div id="app">
            
            <!-- router view will display the components we want based on route -->
            <router-view></router-view>
        
            <!-- we can display other components around our router-view -->
            <!-- for example we could display a footer component here or a -->
            <!-- header component that displays navigation above -->
        </div>
  </body>
</html>
```

In order to dictate what component our `<router-view/>` component will render, we need to define an array of routes. These represent a `path` and a corresponding component like so:

```js
const routes = [
  { path: '/', component: HomePageComponent },
  { path: '/simple', component: SimpleComponent }
]
```

Note, the above code needs both the `HomePageComponent` and `SimpleComponent` prior to referencing them in our `routes` array. We can then define a new `VueRouter` which takes in our newly defined `routes` array. 

```js
const router = new VueRouter({
  routes // short for `routes: routes`
})
```

And finally, once we've defined our `VueRouter`, we add it to our Vue instance like so:

```js
const app = new Vue({
  router
}).$mount('#app')
```

Ta-da! We now have VueJS routing with 2 very simple routes.

## Navigating Our Routes

Once we have defined our routes as well as our router, we need a method of traversing between these different routes. In order to do this, we can leverage the `<router-link/>` component. 

This `<router-link/>` component features a `to` prop which we can set to the `path` that we wish to navigate to. 

> Whilst you can use the `<a>` tag with the correct `href` specified, I would highly recommend using the `<router-link/>` component. More information on this can be found here: [VueJS Router Link](https://router.vuejs.org/en/api/router-link.html)

Say we wished to add a link to our `/simple` path that we defined in our above `routes` array. We could add the following to just above or `<router-view>` component within our `index.html`.

```html
<router-link :to="{ path: '/simple' }"></router-link>
```

When clicking on this we should see our application's `<router-view>` component change from rendering our `HomePageComponent` to our `SimpleComponent`.

## Full Single-Page Sample

If we were to do this within a single `index.html` page then it would look something like so:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
    <link rel="stylesheet" href="//cdn.rawgit.com/necolas/normalize.css/master/normalize.css">
    <link rel="stylesheet" href="//cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    
    <div id="app">
        <router-link :to="{ path: 'home'}">Home</router-link>
        <router-link :to="{ path: 'simple'}">Simple</router-link>
        
        <router-view></router-view>
    </div>

    <script src="https://unpkg.com/vue"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
    <script>
        var HomePageComponent = {
            template: '<h2>Home Page</h2>'
        }

        var SimpleComponent = {
            template: '<h2>Simple Page</h2>'
        }

        const routes = [
            { path: '/home', name: 'home', component: HomePageComponent },
            { path: '/simple', name: 'simple', component: SimpleComponent }
        ]

        const router = new VueRouter({
            routes // short for `routes: routes`
        })

        var app = new Vue({
            components: {
                'HomePageComponent': HomePageComponent,
                'SimpleComponent': SimpleComponent
            },
            router
        }).$mount('#app')
    </script>
</body>
</html>
```

And the final project should look something like so:

![VueJS routing tutorial](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/vuejs-routing-tutorial-01.png)

I threw in a bit of css for this one:

```css
.center {
    text-align: center;
}
.center a {
    margin: 20px;
}
.center h2 {
    margin-top: 40px;
}
.container {
    margin-top: 80px;
}
```

# Vue CLI Configuration

When using the `vue cli`, we can define that a router is set up for us on creation of our project. 

# Conclusion

Hopefully, you found this tutorial helpful. We have managed to set up a simple VueJS application that features routing with several routes, each displaying differing components. 

If you are interested in some more advanced routing concepts then I would highly recommend checking out the vue-router documentation. It features pages on things like transitions and lazy loading. 