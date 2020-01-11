---
title: "Part 5 - Authentication between our Backend and Frontend"
date: 2019-08-20T18:44:50+01:00
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

In this tutorial, we are going to be taking a first look at how we will be adding authentication/authorization to our Vue.JS Imgur application. This is a fairly large and complex topic, but we'll be breaking it down into 2 parts. 

In this part, we'll be creating a helper class that will feature everything we need in order to talk to a `cognito` user pool that we'll be creating again with terraform, and we'll also be adding a few route guards to our application to see how these will protect certain sections of our app from unauthorized users!

# Authentication in Single Page Applications

Authenticating Single Page Applications, or SPAs, is very similar to authenticating REST APIs or services in the backend. You typically start off by defining routes that take in X and return Y and then you implement some form of middleware which wrap these routes and validate that incoming requests are indeed authorized to hit these routes.

With SPAs like this, we have already defined the routes for our app, we now just need to implement the frontend equivalent of middleware which, in Vue.js is typically called a route guard. 

## Route Guards

The `vue-router` library features route or navigation guards that can be applied either globally across the app, or on a per-route basis. These guards are designed to either forward, or reject requests based on decision logic based within the function for that guard.

These route guard functions take in 3 parameters:

* `to` - The route where the incoming request wants to be navigated to.
* `from` - The route where the incoming request originated from.
* `next` - A callback function that performs the task of either redirecting the incoming request to their intended target or elsewhere should you wish.  

> **Official Documentation** - If you want more in-depth information about these guards within the Vue Router then you can check out the official page here: [Vue Router Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)

## Per-Route Guard

Within our app, we will have a number of distinct routes such as the `/profile` route which we'll need to add a route guard to in order to ensure that the person accessing that route is authenticated. 

Once we have implemented our `cognitoAuth` class later on, we'll be creating a `requireAuth` route guard that will validate that the incoming request is authenticated with our cognito serivce. We'll then be able to update routes within our `router/index.js` file and add this route guard to each of the relevant routes like so:

```js
export default new Router({
  routes: [
    ...
    { path: '/profile', name: 'Profile', component: Profile, beforeEnter: requireAuth },
  ]
})
```

# Terraforming our Cognito User Pool

Before we can write any code for authentication/authorization, we'll need to create an AWS Cognito User Pool within our AWS account so that we have something to interface with when it comes to registering new accounts etc.

It feels right to do this again within our terraform as the pool itself is a bit of infrastructure that our app needs in place for it to properly function. Adding code to provision it alongside the rest of our infrastructure code makes sense and, in this particular instance, isn't actually all that difficult as we aren't doing anything overly bespoke:

<div class="filename"> terraform/main.tf </div>

```yml
provider "aws" {
    region = "eu-west-1"
}

resource "aws_s3_bucket" "bucket" {
    bucket = "dev-imgur-clone-bucket-test"
      
    tags = {
        Name = "Dev Imgur Clone Bucket"
        Environment = "Dev"
    }
}

resource "aws_cognito_user_pool" "imgur_clone_pool" {
    name = "imgurclonepool"   
}

resource "aws_cognito_user_pool_client" "client" {
  name = "imgur-app-client"

  user_pool_id = "${aws_cognito_user_pool.imgur_clone_pool.id}"
}

output "UserPoolId" {
    value = "${aws_cognito_user_pool.imgur_clone_pool.id}"
}

output "UserPoolArn" {
    value = "${aws_cognito_user_pool.imgur_clone_pool.arn}"
}

output "ClientId" {
    value = "${aws_cognito_user_pool_client.client.id}"
}
```

Notice at the bottom of this new `main.tf` file we have also added a number of `output` blocks. These do the handy job of returning the `ClientId`, the `UserPoolId` and the `IdentityPoolId` that we need in order to configure our app to connect to cognito. 

> **Note** - You will need to extract the `UserPoolId` from within the *arn*. 

With this in place, we can now run a `terraform plan` to first validate our new terraform infrastructure code, and then we can run `terraform apply` in order to provision this new user pool. This will result in the following output at the end of the terraform apply which will contain some of the necessary information we will need to configure our app:

```output
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.

Outputs:

ClientId = 7du6r7ds9332ptig4fjisui8oa
UserPoolArn = arn:aws:cognito-idp:eu-west-1:853957954650:userpool/eu-west-1_vTElG57hw
UserPoolId = eu-west-1_vTElG57hw
```

Whilst we have this information, let's create a `config` file which will expose this information to the rest of our app:

<div class="filename"> frontend/src/config/index.js </div>

```js
export default {
    region: 'eu-west-1',
    IdentityPoolId: 'eu-west-1_SOMERANDOMSTRING',
    UserPoolId: 'eu-west-1:12345678910',
    ClientId: 'SomeR4ndomClientId',
    // This will be the upload endpoint that we got from the last tutorial
    s3SignedUrl: 'https://rvv1a9to8j.execute-api.eu-west-1.amazonaws.com/dev/upload-node'
  }
```

# Our Cognito Service

Now that we have a `cognito` User Pool in place and the configuration added to our app, let's try and build out the `cognitoAuth` class which will be our primary means for communicating with our newly created `cognito` service.

We'll first need to add the following dependencies to our application by running `npm install` or `yarn add`:

```bash
$ npm install --save amazon-cognito-identity-js aws-sdk
# or
$ yarn add amazon-cognito-identity-js aws-sdk
```

With our necessary dependencies now in place, let's create a new directory called `cognito` within our `src` directory and create 2 new files called `index.js` and `cognito.js`.

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

With the skeleton of our `CognitoAuth` class now in place, we can now set about implementing each function within the class. You will have to bear with me as there are quite a few functions to implement, but it will be worth it once these are done and we can start fleshing out our `login`, `register` and `profile` components of our app!

## isAuthenticated()

Let's start with the `isAuthenticated()` function. This will be a helpful function within our app that will allow us to validate whether or not the current user has been authenticated against the backend Cognito service. If they haven't been validated, it will return null and false, otherwise it will return the session and true.

```js
isAuthenticated (cb) {
    let cognitoUser = this.getCurrentUser()
    if (cognitoUser != null) {
        cognitoUser.getSession((err, session) => {
        if (err) {
            return cb(err, false)
        }
        return cb(session, true)
        })
    } else {
        cb(null, false)
    }
}
```

## configure()

Next, we'll implement the `configure()`, this function will read in the config from the config file that we created earlier in the tutorial and construct a `CognitoUserPool` using them:

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

The `signup()` function allows us to pass in a `username`, `email`, and `password` and sign up a new user to our application. Thankfully, this isn't all that complex and we don't have to worry too much about any client-side validation before we send it off to the backend. 

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

Our `authenticate()` function takes in a `username` and `password` from a form within our app and then attempts to authenticate whether or not they are a valid combination and the user exists within our pool. 

You'll notice that within the `cognitoUser.authenticateUser()` we define an `onSuccess`, `onFailure` and `newPasswordRequired` function within which we can  

```js
authenticate (username, pass, cb) {

    let authenticationData = { Username: username, Password: pass }
    let authenticationDetails = new AuthenticationDetails(authenticationData)
    let userData = { Username: username, Pool: this.userPool }
    let cognitoUser = new CognitoUser(userData)

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var logins = {}
            logins['cognito-idp.' + this.options.region + '.amazonaws.com/' + this.options.UserPoolId] = result.getIdToken().getJwtToken()
            
            Config.credentials = new CognitoIdentityCredentials({
                IdentityPoolId: this.options.UserPoolId,
                Logins: logins
            })
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

This handy helper function returns the current user which can be parsed for things like username and email:

```js
getCurrentUser () {
    return this.userPool.getCurrentUser()
}
```

## confirmRegistration()

The `confirmRegistration()` function takes in a username and a given `code` which is sent to them via email and then validates whether this code is correct before confirming the user's new account:

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

This is an incredibly simple function that simply ends the user's session on the site and logs them out:

```js
logout () {
    this.getCurrentUser().signOut()
}
```

## getIdToken()

This function checks to see if the current user is logged in, if they are then it retrieves the user's JSON Web TOken which can then be used for crafting HTTP Requests against endpoints that feature JWT protection.

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

This will basically import our newly created `CognitoAuth` class from our `cognito.js` file as well as a `config` file which we created earlier that contains all of the config needed for our application to talk to a Cognito user pool.

# Adding Our Route Guards

Let's now have a look at how we can implement a route guard and then subsequently update our route definitions to include this route guard.

We'll start off by defining a `requireAuth` function which will call out to `cognitoAuth.isAuthenticated` to check whether or not the incoming request is coming from someone who is indeed authenticated and able to access that route:

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

// .. routes
```

Let's now add a simple `logout` function which will call the `logout` function we defined in our `cognitoAuth` class and then add a route that calls this function directly. 

We'll also take this opportunity to add this newly defined `requireAuth` route guard to the `/profile` route so we can test whether or not our guards work! 

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
      { path: '/profile', component: Profile, beforeEnter: requireAuth },
      { path: '/:id', component: Single },
      { path: '/logout', beforeEnter: logout }
    ]
})
```

# Update main.js

With our cognitoAuth class now all fleshed out, we will need to do one last thing to register the class within our Vue.js instance. 

<div class="filename"> frontend/src/main.js </div>

```js
import Vue from 'vue'
import App from './App.vue'
import cognitoAuth from './cognito'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  cognitoAuth,
  render: h => h(App),
}).$mount('#app')
```

You should now be able to try and hit `/profile` within your application and see that the requireAuth route guard has done it's job and redirected you to the `/login` page! 

# Conclusion

So, in this tutorial we have started the process of adding authentication to our Imgur clone app through the use of AWS' Cognito service. We've successfully added a few route guards to existing components and validated that our route guards are successfully redirecting users to a `/login` route should they attempt to hit a route unauthenticated.

This is a huge step forward and a piece of functionality that is vital in the vast majority of applications currently in the wild. This concept is agnostic to the type of application you are building and there is the option to lift and shift this authentication code from out of this application into your own application which is very cool!

## Further Reading:

In the next tutorial in this series, we are going to be looking at extending our app to include a login/register workflow so that new users can join our application. With this authentication flow in place, we'll then be able to start tackling problems such as image upload!

> **Under Construction** - The next part of this series is currently under construction and will be published on the 18th of January, 2020.

<!-- * [Part 6 - Deploying Our Application](/) -->