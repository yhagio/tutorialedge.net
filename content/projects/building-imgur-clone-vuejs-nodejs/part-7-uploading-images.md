---
title: "Part 7 - Uploading Images To Our App"
date: 2020-01-26T18:44:50+01:00
weight: 8
desc: In this tutorial series, we are going to be building an Imgur clone using Lambda functions written using Node.JS and a frontend built using Vue.JS
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: vuejsimgurclone
image: vuejs.png
tags:
- beginner
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

In the last tutorial in this series, we successfully implemented a complete login/registration flow for our application that interfaces directly with an AWS Cognito UserPool. 

In this tutorial, we'll finally start implementing some of the basic functionality that our app will need to survive in the wild and become self-driven by our newly registered users. More specifically, we will be adding the frontend **Upload** component component that will do the job of talking to the upload API endpoint that we built and deployed in part 4 of this series. 

The **main aim of this tutorial** is to show how easy it is to bring in additional Vue.js frontend libraries and components into your Vue.js application so that you can start leveraging the work of other people to build your own apps. We'll also be covering how you can **craft authenticated API requests** that can subsequently talk to a backend that we will be protecting with cognito before uploading to S3!

This will be a huge step towards a minimum viable product and it will be a very impressive technical challenge to overcome!

## Dependencies

Before we can continue, we'll need to add the 2 additional libraries that we were talking about to our project. One that will allow us to easily make  `HTTP` requests and the other to handle getting files from our users that we can subsequently upload. These 2 libraries are `Vue-Dropzone` and `Axios`.

* **Vue-dropzone** is an awesome Vue component which is powered by Dropzone.js that looks awesome and will allow us to upload multiple files at the same time which is a cool feature. 

* **axios** is an equally awesome JavaScript library that provides a really nice API when making `HTTP` requests.

Let's install these 2 now with `npm`:

```output
$ npm install vue2-dropzone axios
```

## Upload.vue Components

With `axios` and `vue-dropzone` now added to our project, we can now make a start on our `Upload.vue` component. Within this component we'll want to leverage the `vue-dropzone` component within the `<template/>` section of our component.

We'll also be adding two `<alert>` boxes which will wrap any errors we may see and highlight them to our users:

<div class="filename"> frontend/src/components/Upload.vue </div>

```html
<template>
    <div class="container">
        <div class="upload-wrapper">
            <h4>Upload Images</h4>
            <div class="alert alert-warning" v-if="error">{{ error }}</div>
            <div class="alert alert-info" v-if="status">{{ status }}</div>
            <div class="upload-form">
                <vue-dropzone 
                    ref="myVueDropzone" 
                    id="dropzone" 
                    v-on:vdropzone-file-added="sendingEvent"
                    :options="dropzoneOptions"></vue-dropzone>
            </div>
        </div>
    </div>
</template>
```

Note how we have defined an element, `<vue-dropzone/>` which features a number of different attributes, this is the external component that we can use in exactly the same manner as we would in internal component such as `<navbar/>`. The only difference is that we will import this component from the `vue2-dropzone` node module which we can do now:

<div class="filename"> frontend/src/components/Upload.vue </div>

```html
<script>
import CognitoAuth from './../cognito'
import config from './../config'
import vue2Dropzone from 'vue2-dropzone'
import axios from 'axios'

export default {
  name: "Upload",
  // register the external vue2-dropzone component
  // within this component
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function () {
    return {
        error: '',
        status: '',
        signurl: '',
        dropzoneOptions: {
            url: 'https://httpbin.org/post',
            thumbnailWidth: 200,
            addRemoveLinks: true,
            autoProcessQueue: false
        },
        awss3: {
            signingURL: 'http://aws-direct-s3.dev/',
            headers: {},
            params : {}
        },
    }
  },
  methods: {
      /*eslint no-unused-vars: "off"*/
    sendingEvent(file, xhr, formData) {
        this.$cognitoAuth.getIdToken((err, result) => {
            if (err) { 
                this.error = err;
            } else {
                const url = config.s3SignedUrl;
                axios.defaults.headers.common['Authorization'] = result;
                let headers = {
                        "Access-Control-Allow-Origin": "*"
                };
                axios({ method: 'post', url: url, headers: headers, data: { name: file.name, type: file.type }})
                    .then(x => {
                        var options = { headers: { 
                            'Content-Type': file.type,
                            'Access-Control-Allow-Origin': '*' 
                        }}
                        delete axios.defaults.headers.common['Authorization'];
                        axios.put(x.data.uploadURL, file, options)
                    })
                    .then(status => {
                        this.status = status;
                    })
                    .catch(err => {
                        this.error = err;
                    })
            }
        })
    }
  }
};
</script>
```

Within this component, we will have defined the `sendingEvent` function which we passed in to our `<vue-dropzone>` component using the `v-on:vdropzone-file-added` directive. This will attempt to get the **ID Token**, if it is set, which we subsequently use to form an authenticated request to `S3` in order to get a s3 Signed URL. 

This pattern of adding an **Authorization** header to `HTTP` requests is very common and something you will absolutely see being done in other Vue.js applications who interact with authenticated endpoints themselves. 

Finally, let's style our `Upload.vue` component and make it look slightly nicer. We'll create a wrapper for our upload form that will essentially be just a white box and give it some box shadow, some margins and that'll do us.

<div class="filename"> frontend/src/components/Upload.vue </div>

```html
<style scoped>
.upload-wrapper {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #E4E6E7;
  box-shadow: 0px 2px 5px rgba(0,0,0,0.4);
}
.upload-wrapper h4 {
  font-size: 22px;
  margin: 0;
  padding: 0;
  margin-bottom: 40px;
}
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}
.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}
.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}
.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
```

### Router Updates

With this `Update.vue` component now defined, we need to now register a route for it within our `router/index.js` file. This will be another route that we'll want to guard with our `requireAuth` route guard as we don't want people to be able to see the upload page unless they are signed in.

> **Note** - We will have to update our upload backend endpoint to ensure that only people who are authenticated are able to hit the endpoint. It is hugely important that you do both *client-side* and *server-side* authentication in situations like these.

<div class="filename"> frontend/src/router/index.js </div>

```js
import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './../components/HomePage.vue'
import Login from './../components/Login.vue'
import Register from './../components/Register.vue'
import Single from './../components/Single.vue'
import Profile from './../components/Profile.vue'
import Upload from './../components/Upload.vue'
import Confirm from './../components/Confirm.vue'
import cognitoAuth from '@/cognito'
Vue.use(Router)

function requireAuth (to, from, next) {
  cognitoAuth.isAuthenticated((err, loggedIn) => {
    if (err) return next()
    if (!loggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  })
}

function logout(to, from, next) {
  cognitoAuth.logout()
  next('/')
}

export default new Router({
    routes: [
      { path: '/', component: HomePage },
      { path: '/login', component: Login },
      { path: '/register', component: Register },
      { path: '/confirm', component: Confirm },
      { path: '/Profile', component: Profile, beforeEnter: requireAuth },
      { path: '/upload', component: Upload, beforeEnter: requireAuth },
      { path: '/:id', component: Single },
      { path: '/logout', beforeEnter: logout }
    ]
})
```

### Conditional Rendering

Having this new route in place, we want our users to be able to easily navigate to this new page when they are logged in. In order to make this easy, we are going to add a bit of conditional rendering to our `Navbar.vue` component so that it displays the links to **upload** and **profile** when they are logged in, and **signup** and **log in** when they are not!

Currently, we have 2 `<li class="nav-item">` elements within our `<nav>` that current hold the links to **Login** and **Register**. We can make these render conditionally by using the `v-if` directive. 

The `v-if` directive will only render a block if the directive's expression returns a truthy value. Therefore, we need to define a function within our component that will return **true** if there is a currently logged in user, or **false** otherwise.

<div class="filename"> frontend/src/components/Navbar.vue </div>

```html
<template>
  ...
          <li v-if="isLoggedIn()" class="nav-item">
            <router-link class="nav-link" to="profile">Profile</router-link>
          </li>
          <li v-if="isLoggedIn()" class="nav-item">
            <router-link class="nav-link" to="upload">Upload</router-link>
          </li>
          <li v-if="!isLoggedIn()" class="nav-item">
            <router-link class="nav-link" to="login">Login</router-link>
          </li>
          <li v-if="!isLoggedIn()" class="nav-item">
            <router-link class="nav-link" to="register">Register</router-link>
          </li>
  ...
</template>
```

With the `v-if` directive now added to our `nav-item`'s, we now need to implement this `isLoggedIn` function. This will call out to the `cognitoAuth` class that we have registered within our `Vue` instance and call `getCurrentUser()`. If the current user is `null` then it will return false or true if it is set:

<div class="filename"> frontend/src/components/Navbar.vue </div>

```html
<script>
export default {
    name: 'Navbar',
    methods: {
      isLoggedIn: function() {
        if(this.$cognitoAuth.getCurrentUser() === null) {
          return false;
        } else {
          return true;
        }
      }
    }
}
</script>
```

With this in place, try logging in and logging out to see if these changes have worked! When you log in, you will see that the links change and your users will be able to more easily navigate around the app.

## Adding an Authorizer to Our Upload Function

As it stands, our `upload-node` serverless function is currently open to the world and obviously this isn't ideal in terms of security. In order to lock this down, let's extend the `uploadImage` function definition within our `serverless.yml` file so that it uses our cognito pool as an `authorizer`:

<div class="filename"> backend/serverless.yml </div>

```yml
service: imgur-clone-backend-functions

frameworkVersion: ">=1.1.0 <2.0.0"

custom:
  bucket: dev-imgur-clone-bucket-test

provider:
  name: aws
  runtime: nodejs8.10
  region: eu-west-1
  iamRoleStatements:
    - Effect: Allow
      Action:
        - s3:*
      Resource: "arn:aws:s3:::${self:custom.bucket}"
    - Effect: Allow
      Action:
        - s3:*
      Resource: "arn:aws:s3:::${self:custom.bucket}/*"

functions:
  list:
    handler: listS3Objects.list
    events:
      - http:
          path: list
          method: get
          cors: true
  
  uploadImage:
    handler: getSignedUpload.requestUploadURL
    environment:
      BUCKET: ${self:custom.bucket}
    events:
      - http:
          path: upload-node
          method: post
          cors: true
          authorizer:
            arn: arn:aws:cognito-idp:eu-west-1:853957954650:userpool/eu-west-1_vTElG57hw
            identitySource: method.request.header.Authorization
            type: token
```

Awesome, with this now added, let's redeploy our functions using `serverless deploy`.

## Testing it All Works

With this new change made to our `uploadImage` function, let's test the full flow for our application now. Try logging out, logging in and then navigating to the upload page and uploading an image to your bucket. Before you upload the image, open up the developer console within your browser and select the **network** tab so that you can watch the HTTP requests flow through to first the serverless API function and before finally hitting your S3 Bucket with a **HTTP PUT** request and your image!

![Working Upload Functionality!](https://images.tutorialedge.net/images/imgur-clone/upload-success.png)

> **Up-to-date Code** - If you want the up-to-date code for this project, then please checkout the official repository: [elliotforbes/imgur-clone-vuejs-nodejs](https://github.com/elliotforbes/imgur-clone-vuejs-nodejs)


## Deploying our Application

Awesome, we have successfully been able to implement authenticated uploads to our S3 bucket through our frontend Vue.js applications! This is a huge step forward and a massive accomplishment and with this in place we are now well on our way to having a minimum viable product!

The next piece of the puzzle that we will have to solve is deploying our application somewhere that other people can see it and interact with it. This is one of the most exciting parts of software deployment in my opinion as it means that other people get to see the fruits of your hard labour and benefiting from your work!

> **Next Tutorial** - [Part 8 - Deploying our Application](/projects/building-imgur-clone-vuejs-nodejs/part-8-deploying-our-app/)