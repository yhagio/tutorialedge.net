---
title: "Part 5 - Authentication between our Backend and Frontend"
date: 2019-08-20T18:44:50+01:00
draft: true
weight: 6
desc: In this tutorial series, we are going to be building an Imgur clone using Lambda functions written using Node.JS and a frontend built using Vue.JS
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: vuejsimgurclone
image: vuejs.png
tags:
- beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this tutorial, we are going to be looking at adding authentication to our Vue.JS Imgur application. 

By the end of this tutorial, we will have added AWS' Cognito service to our application and we will have added a few additional routes to our app so that users of our application can log in and create accounts which will allow them to log in and subsequently upload images to our app.

# Authentication in Single Page Applications

Authenticating Single Page Applications is a little different to what you may be used to if you have ever developed a REST API or a backend service that requires it's own auth. 

> **Note** - One incredibly important thing to remember when building SPAs is that you must never include any passwords or secrets within the codebase. Anyone who has access to your application will be able to view the code for it and extract these secrets through standard browser tools.

With this in mind, there are a few methods for authentication that we can leverage that ensure we don't expose any secrets that could potentially compromise our application.

## Route Guards

In Vue.JS, if we want to guard routes and ensure that only authenticated personal can access these routes then we can use per-route guards alongside a bit of authentication logic.

In Vue.js, we can add a route guard by adding `beforeEnter` to our route definition and passing in a function that will be hit **before** our application allows a user to the given route. 

If we have a profile page or a dashboard within our application that we only want people to access after they have authenticated, then we can add define a `requireAuth` function and add it to those routes like so:

```js
export default new Router({
  routes: [
    ...
    { path: '/profile', name: 'Profile', component: Profile, beforeEnter: requireAuth },
  ]
})
```

# Our Cognito Service

Now that we have the basic theory behind what we want to achieve down, let's start implementing the cognito aspect of our Vue.js app. 

Let's create a new directory called `cognito` within our `src` directory and create 2 new files called `index.js` and `cognito.js`.

We'll start by creating a skeleton `cognito.js` file which will contain a class and the function stubs which we will be implementing 1 by 1.

<div class="filename"> frontend/src/cognito/cognito.js </div>

```js
// The imports we need from both aws-sdk and the cognito js library
import { Config, CognitoIdentityCredentials } from 'aws-sdk'
import { CognitoUser, CognitoUserPool, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js'

// We'll want to create a class for CognitoAuth which will
// contain all the methods we will need within our App
export default class CognitoAuth {
  // The constructor for this class will initialize our userSession
  // as null
  constructor () {
    this.userSession = null
  }

  // this will set up our app to use cognito to use
  // the user pool that we'll be creating later on
  configure (config) {

  }

  // a signup function which will allow new people
  // to create an account in our app
  signup (username, email, pass, cb) {

  }

  // a function that will allow existing users to
  // authenticate with our application
  authenticate (username, pass, cb) {

  }

  // a helper function that allows us to
  // get the information for the current user
  getCurrentUser () {

  }

  // a function that allows us to confirm newly
  // registered users of our app
  confirmRegistration (username, code, cb) {

  }

  // does what it says on the tin, allows users
  // to logout if they are already logged in
  logout () {

  }

  // Retrieve the users current token if they have
  // a session, otherwise returns null
  getIdToken (cb) {

  }
}

// This installed CognitoAuth into our Vue instance
CognitoAuth.install = function (Vue, options) {
  Object.defineProperty(Vue.prototype, '$cognitoAuth', {
    get () { return this.$root._cognitoAuth }
  })

  Vue.mixin({
    beforeCreate () {
      if (this.$options.cognitoAuth) {
        this._cognitoAuth = this.$options.cognitoAuth
        this._cognitoAuth.configure(options)
      }
    }
  })
}
```

## isAuthenticated()

```js
isAuthenticated (cb) {
    let cognitoUser = this.getCurrentUser()
    if (cognitoUser != null) {
        cognitoUser.getSession((err, session) => {
        if (err) {
            return cb(err, false)
        }
        return cb(null, true)
        })
    } else {
        cb(null, false)
    }
}
```

## configure()

```js
configure (config) {
    if (typeof config !== 'object' || Array.isArray(config)) {
        throw new Error('[CognitoAuth error] valid option object required')
    }
    this.userPool = new CognitoUserPool({
        UserPoolId: config.IdentityPoolId,
        ClientId: config.ClientId
    })
    Config.region = config.region
    Config.credentials = new CognitoIdentityCredentials({
        IdentityPoolId: config.IdentityPoolId
    })
    this.options = config
}
```

## signup()

```js
signup(username, email, pass, cb) {
    let attributeList = [
        new CognitoUserAttribute({
            Name: 'email',
            Value: email
        })
    ]

    this.userPool.signUp(username, pass, attributeList, null, cb)
}
```

## authenticate()

```js
authenticate (username, pass, cb) {

    let authenticationData = { Username: username, Password: pass }
    let authenticationDetails = new AuthenticationDetails(authenticationData)
    let userData = { Username: username, Pool: this.userPool }
    let cognitoUser = new CognitoUser(userData)

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken())
            var logins = {}
            logins['cognito-idp.' + this.options.region + '.amazonaws.com/' + this.options.UserPoolId] = result.getIdToken().getJwtToken()
            console.log(logins)
            
            
            Config.credentials = new CognitoIdentityCredentials({
                IdentityPoolId: this.options.UserPoolId,
                Logins: logins
            })
            console.log(Config.credentials)
            this.onChange(true)
            cb(null, result)
        },
        onFailure: function (err) {
            cb(err);
        },
        newPasswordRequired: function (userAttributes, requiredAttributes) {
            console.log('New Password Is Required')
        }
    })
}
```

## getCurrentUser()

```js
getCurrentUser () {
    return this.userPool.getCurrentUser()
}
```

## confirmRegistration()

```js
confirmRegistration (username, code, cb) {
    let cognitoUser = new CognitoUser({
        Username: username,
        Pool: this.userPool
    })
    cognitoUser.confirmRegistration(code, true, cb)
}
```

## logout()

```js
logout () {
    this.getCurrentUser().signOut()
}
```

## getIdToken()

```js
getIdToken (cb) {
    if (this.getCurrentUser() == null) {
        return cb(null, null)
    }
    this.getCurrentUser().getSession((err, session) => {
        if (err) return cb(err)
        if (session.isValid()) {
        return cb(null, session.getIdToken().getJwtToken())
        }
        cb(Error('Session is invalid'))
    })
}

```

## Exporting our CognitoAuth Class

With this in place, we'll also need to flesh out our `index.js` file to expose this to the rest of our application:

<div class="filename"> frontend/src/cognito/index.js </div>

```js
import Vue from 'vue'
import CognitoAuth from './cognito'
import config from '@/config'

Vue.use(CognitoAuth, config)

export default new CognitoAuth()
```

This will basically import our newly created `CognitoAuth` class from our `cognito.js` file as well as a `config` file which we'll now create that will contain all of the config needed for our application to talk to a Cognito user pool:

<div class="filename"> frontend/src/config/index.js </div>

```js
export default {
    region: 'eu-west-1',
    IdentityPoolId: 'eu-west-1_SOMERANDOMSTRING',
    UserPoolId: 'eu-west-1:12345678910',
    ClientId: 'SomeR4ndomClientId',
    // This will be the upload endpoint that we got from the last 
    s3SignedUrl: 'https://rvv1a9to8j.execute-api.eu-west-1.amazonaws.com/dev/upload-node'
  }
```

# Adding Our Route Guards

<div class="filename"> frontend/src/router/index.js </div>

```js
import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './../components/HomePage.vue'
import Login from './../components/Login.vue'
import Register from './../components/Register.vue'
import Single from './../components/Single.vue'
import Profile from './../components/Profile.vue'
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

export default new Router({
    routes: [
      { path: '/', component: HomePage },
      { path: '/login', component: Login },
      { path: '/register', component: Register },
      { path: '/Profile', component: Profile, beforeEnter: requireAuth },
      { path: '/upload', component: Upload, beforeEnter: requireAuth },
      { path: '/:id', component: Single }
    ]
})
```

<div class="filename"> frontend/src/router/index.js </div>

```js
// requireAuth and imports above
// ...

function logout(to, from, next) {
  cognitoAuth.logout()
  next('/')
}

export default new Router({
    routes: [
      { path: '/', component: HomePage },
      { path: '/login', component: Login },
      { path: '/register', component: Register },
      { path: '/Profile', component: Profile, beforeEnter: requireAuth },
      { path: '/upload', component: Upload, beforeEnter: requireAuth },
      { path: '/:id', component: Single },
      { path: '/logout', beforeEnter: logout }
    ]
})
```

# Terraforming our Cognito User Pool

With most


# Conclusion

So, in this tutorial we have covered adding authentication to our Imgur clone and adding a few routes that allow users to create accounts and subsequently log in to our app.

We have looked at some of the things you must avoid when adding authentication to your application and we now have the base of a pretty cool dynamic application.

## Further Reading:

In the next tutorial, we are going to be looking at building out the backend of our imgur clone and creating a number of AWS Lambda functions that our frontend SPA will interact with to upload, fetch and delete images within a user's account.

* [Part 6 - Deploying Our Application](/)