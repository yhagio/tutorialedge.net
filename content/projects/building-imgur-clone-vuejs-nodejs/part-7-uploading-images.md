---
title: "Part 7 - Uploading Images To Our App"
date: 2019-08-20T18:44:50+01:00
draft: true
weight: 8
desc: In this tutorial series, we are going to be building an Imgur clone using Lambda functions written using Node.JS and a frontend built using Vue.JS
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: vuejsimgurclone
image: vuejs.png
tags:
- beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In the last tutorial in this series, we successfully implemented a complete login/registration flow for our application that interfaces directly with an AWS Cognito UserPool. 

In this tutorial, we'll finally start implementing some of the basic functionality that our app will need to survive in the wild and become self-driven by our newly registered users!

# Dependencies

Before we can continue, we'll need to add 2 additional libraries to our project that will allow us to make `HTTP` requests and to handle getting files from our users that we can subsequently upload. These 2 libraries are `Vue-Dropzone` and `Axios`.

* **Vue-dropzone** is an awesome Vue component which is powered by Dropzone.js that looks awesome and will allow us to upload multiple files at the same time which is a cool feature. 

* **axios** is an equally awesome JavaScript library that provides a really nice API when making `HTTP` requests.

Let's install these 2 now with `npm`:

```output
$ npm install vue2-dropzone axios
```

# Upload.vue Components

With `axios` and `vue-dropzone` now added to our project, we can now make a start on our `Upload.vue` component. Within this component we'll want to leverage the `vue-dropzone` component within the `<template/>` section of our component.

We'll also be adding an `alert` box which will wrap any errors we may see and highlight them to our users:

<div class="filename"> frontend/src/components/Upload.vue </div>

```html
<template>
    <div class="container">
        <div class="upload-wrapper">
            <h4>Upload Images</h4>
            {{ error }}
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

With the template in place, let's now flesh out the JavaScript element of this component. We'll start off 


<div class="filename"> frontend/src/components/Upload.vue </div>

```html
<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.css'

export default {
  name: "Upload",
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function () {
    return {
        error: '',
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
    sendingEvent(file, xhr, formData) {
        upload(file)
            .then((success) => { console.log("FUCK YES") })
            .catch((err) => { console.log(err); })
    
    },
    s3UploadSuccess(location) {
      console.log(location)
    },
    uploadFiles() {
        console.log("Hit");
      if (this.signurl) {
        this.$refs.myVueDropzone.setAWSSigningURL(this.signurl);
        this.$refs.myVueDropzone.processQueue();
      }
      else {
        this.$refs.urlsigner.focus();
        alert("Enter your signing URL");
      }
    }
  },
  watch: {
    fileAdded() {
        console.log("success");
    },
  }
};
</script>
```


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

## Router Updates

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


# Updating our config/index.js File

```js
export default {
    region: 'eu-west-1',
    IdentityPoolId: 'eu-west-1_vTElG57hw',
    UserPoolId: 'eu-west-1:853957954650',
    ClientId: '7du6r7ds9332ptig4fjisui8oa',
    s3SignedUrl: 'https://rvv1a9to8j.execute-api.eu-west-1.amazonaws.com/dev/upload-node'
}
```

# Deploying our Application

The next piece of the puzzle that we will have to solve is deploying our application somewhere that other people can see it and interact with it. This is one of the most exciting parts of software deployment in my opinion as it means that other people get to see the fruits of your hard labour and benefiting from your work!

> **Next Tutorial** - Under Construction - The next tutorial in this series will be out on the 1st of February, 2020.
