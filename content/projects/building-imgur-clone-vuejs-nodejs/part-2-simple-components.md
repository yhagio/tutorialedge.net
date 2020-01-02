---
title: "Part 2 - Creating Simple Vue.js Components"
date: 2019-08-20T18:44:50+01:00
desc: In this tutorial series, we are going to be building an Imgur clone using Lambda functions written using Node.JS and a frontend built using Vue.JS
author: Elliot Forbes
weight: 2
twitter: https://twitter.com/elliot_f
series: vuejsimgurclone
image: vuejs.png
tags:
- beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In the previous part of this project series, we scaffolded the basic structure of both the frontend and the backend of our project. Once we were happy that everything was setup correctly, we then created a github repository in which our project now lives.

With the setup out of the way, we can now start to dive down into developing the frontend and learnings some of the critical, core Vue.js concepts that you'll need in order to succeed as a Vue.js developer.

# Introduction

In this part of the series, we are going to be looking at components in Vue.js and how we can start to construct our application using a number of components. 

By the end of this particular tutorial, you should be comfortable creating your own components in Vue.js and you'll also have an appreciation as to how you can:

* Communicate between components using props and custom events
* Render multiple components using the `v-for` directive

I'll also be leaving a link to where you can find more in-depth information and articles on Vue.js components throughout this tutorial which provide additional information, but they aren't needed to help complete the course.

# Understanding the Project Structure

Let's get started by navigating in to our `frontend/` directory and trying to figure out what has been created for us by the `vue` cli.

<div class="filename"> frontend/ </div>

```output
node_modules/
public/ 
 - favicon.ico
 - index.html

src/
 - assets/
 - components/
 - App.vue
 - main.js

.gitignore
babel.config.js
package.json
README.md
```

We can somewhat ignore the `node_modules/` directory as that contains the dependencies our Vue.js application needs in order to build. 

The `public/` directory is interesting to us though, it contains the `index.html` file which is the main entry point which we serve our application from. It is here we typically import things such as the `bootstrap` css library for helping us style our components. You won't typically spend a lot of time in this directory.

The `src/` directory is where we do the majority of our application development. This directory contains all of our Vue.js components, and the `main.js` file which does the job of creating a new Vue.js instance for us and mounting it to the `<div id="app"></div>` tag that is featured within `public/index.html`.

Finally, we have a few standalone files:

* `.gitignore` - tells git to not include certain files and directories.
* `babel.config.js` - this config file tells our application how we wish to transpile our Vue.js code into a backwards compatible version of JavaScript that can be rendered by all/most browsers. 
* `README.md` - It's always good practice to document how you build your application and how you can do additional development work to said application in the `README.md` file for that project. 

# Starting from a Clean Slate

So, right now, our basic application looks a little like this:

![Basic Vue.js Application]()

We'll want to start from a clean-slate when we start developing our own application, so we want to delete the `src/components/HelloWorld.vue` file which contains a really simple reference component that renders things like the `essential links` and `ecosystem` links on the homepage of our current app.

With this deleted, you'll notice that our application instantly re-compiled and errored out. This is because in our `App.vue` component, we are attempting to import the `HelloWorld` component from the component file we have just deleted.

Open up `App.vue` and make the following changes:

<div class="filename"> frontend/src/App.vue </div>

```html
<template>
  <div id="app">
    <h2>Imgur Clone</h2>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {}
}
</script>

<style>
</style>
```

With this done, we will see our application now successfully compiling and displaying `Imgur clone` in the browser. We now have a great clean slate on top of which we can build our awesome image hosting application!

# Creating our First Component

Let's start looking at how we can develop our own components in Vue.js. We'll begin by creating a new file within the `src/components/` directory called `HomePage.vue`. 

All Vue.js components are broken up into three distinct sections which look something like this:

* `<template></template>` - This section houses the HTML for our component. We can easily interpolate JavaScript variables into this component using **"moustache"** syntax as well as a number of different Vue.js directives that we will be covering later on in this tutorial
* `<script></script>` - This section houses the JavaScript element of our components. It is in here we define all of our JavaScript logic for handling events and whatever other dynamic elements we need.
* `<style></style>` - This section houses the CSS rules for our particular component. It's in here we can make our components look really cool!

Let's put this into practice in our new `HomePage.vue` component. 

<div class="filename"> frontend/src/components/HomePage.vue </div>

```html
<template>
    <div>
        <h2>Home Page</h2>
    </div>
</template>

<script>
export default {
    name: 'HomePage'
}
</script>

<style>
</style>
```

With this created, we'll want to import this into our `App.vue` component and render it within our application.

<div class="filename"> frontend/src/App.vue </div>

```html
<template>
  <div id="app">
    <HomePage />
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue'

export default {
  name: 'app',
  components: {
    HomePage
  }
}
</script>

<style>
</style>
```

Saving this, our application will automatically recompile successfully and we will now see `Home Page` replace the `Imgur clone` which is indicates that our new `Home Page` component is now being rendered within our application.

# Importing CSS Libraries

As it stands, we've been able to successfully create and render our own simple component within our application but it isn't really doing anything all that exciting. Let's fix this now and import some additional CSS libraries and modify our `HomePage.vue` component so that it renders out a couple of placeholder images for now.

Let's start off by opening up the `index.html` file within the `public/` directory. It is in here that we are going to add the import statement for the bootstrap library we'll be using.

<div class="filename"> frontend/public/index.html </div>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title>frontend</title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but frontend doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>

```

We'll want to add a link to our externally hosted css library just within the `<head>` tags of this file. These styles will then be applied to every component within our application as long as they use the relevant css classes for that library.

In this instance, we'll be using plain old bootstrap due to its popularity and high adoption rate. 

<div class="filename"> frontend/public/index.html </div>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title>frontend</title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but frontend doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>

```

Awesome, our application is now set up to use an external CSS library! We can now start creating some nicely styled components which will house the images that we are going to display on our site!

# Creating Our First Component

Ok, so we have the CSS framework in place, let's have a look at what it takes to start creating our own Vue.js components!

We'll start by creating a new file within `frontend/src/components/` called `Navbar.vue` which will contain the component that will contain a very simple navigation bar for our application. 

<div class="filename"> frontend/src/components/Navbar.vue </div>

```html
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar w/ text</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">
            Home
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
      </ul>
      <span class="navbar-text">Navbar text with an inline element</span>
    </div>
  </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style>
</style>
```

Much like our `HomePage.vue` component, we have defined the base of our new component with 3 different blocks. One for the `html` content of our component, the next for the JavaScript code which powers our component and the final one, the `style` block which contains all of the component specific stylesheet rules that we can define to make our component stand out!

Above is the absolute minimum required for a component in Vue.js, now, just to validate this let's try adding this new component to our existing `App` component so that it imports and renders this component within our existing application.

<div class="filename"> frontend/src/App.vue </div>

```html
<template>
  <div id="app">
    <Navbar />
    <HomePage />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import HomePage from './components/HomePage.vue'

export default {
  name: 'app',
  components: {
    HomePage,
    Navbar
  }
}
</script>

<style>
</style>
```


# Creating an Image Component

Within our HomePage component, we are going to be displaying the latest images that have been updated to our Imgur application. For these images, we'll want to create a component that will fetch and display each image for us as well as some metadata about the image.

Create a new file within your `components` directory in your project and call it `ImageCard.vue`. Within this, we are going to want to create a `card` component which is a pre-defined bootstrap css rule which will help to display our image in a nice, compact fashion.

<div class="filename"> frontend/src/components/ImageCard.vue </div>

```html
<template>
  <div class="card">
    <img class="card-img-top" src="http://lorempixel.com/400/200" alt="">
    <div class="card-body">
      <h5 class="card-title">Image</h5>
    </div>
  </div>  
</template>

<script>
export default {
    name: 'ImageCard'
}
</script>

<style>
</style>
```

For now, we'll be hardcoding the `<img src="">` to lorempixel which just returns a placeholder image with width and height of 400x200. 

Now that we have this `ImageCard` component, we will want to update our `HomePage` component to import this newly defined component and display a few images side by side. We'll want them displayed in a row on our homepage so for now we'll add a few `divs` and hardcode displaying 4 images:

<div class="filename"> frontend/src/components/HomePage.vue </div>

```html
<template>
    <div>
        <h2>Home Page</h2>
        <div class="container">
            <div class="row">
                <div class="col-lg-3">
                    <ImageCard />
                </div>
                <div class="col-lg-3">
                    <ImageCard />
                </div>
                <div class="col-lg-3">
                    <ImageCard />
                </div>
                <div class="col-lg-3">
                    <ImageCard />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ImageCard from './ImageCard.vue'

export default {
    name: 'HomePage',
    components: {
        ImageCard
    }
}
</script>

<style>
body {
    background-color: #F4F4F4;
}
</style>
```

With this now imported and added to our `template` block, when we save this `HomePage.vue` component and wait for it to recompile, we should see that our application now renders 4 instances of our `ImageCard` component just under the `Home Page` header in our application. 

At this point, our application should look something a little like this:

![Simple Components](https://images.tutorialedge.net/images/imgur-clone/simple-components-01.png)

# The v-for Directive and Component Props

Ok, so we hard coded rendering 4 divs to display some images within our `HomePage` component, but there is a way we can dynamically render multiple images using the `v-for` directive.

The end goal is going to be that our frontend Vue.js application hits an API endpoint which returns a list of URLs that we then pass through to an `ImageCard` component which will perform the task of rendering the image for us.

For now, as we don't have any endpoints that we can hit just yet, we are going to mimic this action by defining a list of URLs within our `HomePage` component and then rendering them using this `v-for` directive.

Within our `HomePage` component, we need to define a `data()` function which will return a list called `latest` which in turn contains 5 lorempixel links:

<div class="filename"> frontend/src/components/HomePage.vue </div>

```js
import ImageCard from './ImageCard.vue'

export default {
    name: 'HomePage',
    components: {
        ImageCard
    },
    data() {
        return {
            latest: [
                "http://lorempixel.com/400/200",
                "http://lorempixel.com/400/200",
                "http://lorempixel.com/400/200",
                "http://lorempixel.com/400/200",
                "http://lorempixel.com/400/200"
            ]
        }
    },
}
```

> **Note** - It's generally best practice to use a `data` *function* as opposed to an object as it ensures that each instance of a component maintains an independent copy of the data returned. 

## v-for

Let's now update the `<template>` section of our `HomePage` component so that it utilizes this `v-for` directive:

<div class="filename"> frontend/src/components/HomePage.vue </div>

```html
<template>
  <div>
    <h2>Home Page</h2>
    <div class="container">
      <div class="row">
        <div v-for="image in latest" v-bind:key="image" class="col-lg-3">
          <ImageCard />
        </div>
      </div>
    </div>
  </div>
</template>
```

Let's break down the changes here. We have deleted three of the hard coded `div` wrapping our `<ImageCard />` component and modified the first to include `v-for="image in latest"`. This `v-for` directive will loop through every element in our `latest` array that we defined in the `data` function and render a `div` with an `<ImageCard/>` component inside it. 

> **Note** - We've also had to add the `v-bind:key` directive to our `div` due to it being required since version 2.2.0+ of Vue.js when using the `v-for` directive. 

At this point, you should see that our changes have successfully been rendered in the browser and you should see that 5 `ImageCard` components are now being rendered!

![v-for directive working!](https://images.tutorialedge.net/images/imgur-clone/simple-components-02.png)

## Passing props to Components

The final part of this tutorial is going to look at how we can pass information from a parent component, or `HomePage` component in this example, to a child component, our `ImageCard` component. This will allow us to pass unique `URLs` to each `ImageCard` component.

The way that we can achieve this result is to use `props` in Vue.js. 

Let's update our `ImageCard` component to accept props now:

<div class="filename"> frontend/src/components/ImageCard.vue </div>

```js
export default {
    name: 'ImageCard',
    props: [
        'img'
    ]
}
```

Adding this registers a custom attribute on this `ImageCard` component which means that we can pass in a prop value, which then becomes a property within each individual `ImageCard` instances. 

With this added, we then have to update the template so that instead of having a hard coded `src` attribute on the images, it uses this new `img` property:

<div class="filename"> frontend/src/components/ImageCard.vue </div>

```html
<template>
    <div class="card">
        <img class="card-img-top" :src="img" alt="">
        <div class="card-body">
            <h5 class="card-title">{{img}}</h5>
        </div>
    </div>
</template>
```

You may noticed a slight change to our `src` attribute on the `<img>` tag. We've changed this to include a `:` character just before it which is shorthand for `v-bind:src="img"`. 

## Final Updates to the HomePage Component

Now that we have added this `prop` to our `ImageCard` component, we now need to make 1 final update to our `HomePage` component to pass in URLs to our dynamically rendered components:

<div class="filename"> frontend/src/components/HomePage.vue </div>

```html
<template>
    <div>
        <h2>Home Page</h2>
        <div class="container">
            <div class="row">
                <div v-for="image in latest" v-bind:key="image" class="col-lg-3">
                    <ImageCard :img="image" />
                </div>
            </div>
        </div>
    </div>
</template>
```

Save these changes and you should see that our `ImageCard` components new render the images which we have passed down from the `HomePage` parent component down to these individual child components!

![Props working!](https://images.tutorialedge.net/images/imgur-clone/simple-components-03.png)

# Conclusion

Awesome, so in this tutorial of our series, we have successfully learned how our Vue.js application is structured as well as how we can go about creating simple components and subsequently rendering these components within our `HomePage` component.

If you are enjoying this series, then please let me know on twitter by tweeting me with a screenshot of how you are getting on!

## Further Reading:

In the next part of this series, we are going to be looking at setting up the vue router and getting routes setup within our application so that we can have distinct pages for things such as image-uploading, user login and profile pages and for individual image posts.

> **Note** - Part 3 is currently under construction!

<!-- * [Part 3 - Vue Router Setup](/projects/building-imgur-clone-vuejs-nodejs/part-3-adding-vue-router/) -->