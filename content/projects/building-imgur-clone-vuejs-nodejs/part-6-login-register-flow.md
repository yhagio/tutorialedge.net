---
title: "Part 6 - Our Login/Registration Flow"
date: 2020-01-14T12:00:50+01:00
weight: 7
desc: In this tutorial series, we are going to be building an Imgur clone using Lambda functions written using Node.JS and a frontend built using Vue.JS
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: vuejsimgurclone
image: vuejs.png
tags:
- beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In the previous tutorial in this series, we looked at creating a Cognito User Pool using Terraform and creating the `cognitoAuth` class which we then hooked up to some route guards in order to protect some special areas of our application.

In this tutorial, we are going to be extending this and building out our register/login flow so that new people coming into the application can register a new account and login/logout as and when they wish.

By the end of this tutorial, we will have:

* Implemented a registration -> confirmation flow that allows new users to join our app

* Implement a login page which allows already registered users to login to our app

* Implement a profile page which displays the username and allows users to logout

Let's get started!

# Updates to Terraform

So, whilst we have successfully created a User Pool using terraform in the last tutorial, one thing we failed to do was set up email confirmation for our User Pool so that it could successfully send verification emails to incoming users.

In order to make this work, we'll want to add `auth_verified_attributes` and a `verification_message_template` block to our definition of our Cognito User Pool. This will enable Cognito to send verification emails to people actively trying to register accounts on our site:

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

    auto_verified_attributes = ["email"]

    verification_message_template {
        default_email_option = "CONFIRM_WITH_CODE"
    }
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

With these minor tweaks in place you will once again have to run `terraform plan` to verify that your changes look good, followed by a `terraform apply` to implement these changes to our underlying AWS infrastructure. 

With this in place, we should be good to start implementing our user registration flow!

# Register Flow

Now, we already have a `Register.vue` component in our app and an associated route to that component defined within our `router/index.js` file, however we'll need to update the code so that it interacts with our new `cognitoAuth` class and redirects people to the confirmation page once they have inputted their details. 

## Register.vue Component

Let's start by updating our `Register.vue` component which will enable our users to register a new account within our application. 

For this component, we are going to need a new form that we'll style with some simple CSS to make it look half decent and we'll leverage some default bootstrap 4 classes to nicely display any errors that may be returned from attempting to register.

<div class="filename"> frontend/src/components/Register.vue </div>

```html
<template>
    <div class="login-box">
        <h4>Register</h4>
        <hr/>
        <div class="alert alert-warning" v-if="error != null"><span class="white-text">{{ error.message }}</span></div>
        <p>Don't have an account? Register for one now</p>
         <form class="form-group">
            <div class="input-field">
                <label for="username">Username</label>
                <input id="username" type="text" class="form-control" v-model="username" required>
            </div>
            <div class="input-field">
                <label for="email">Email</label>
                <input id="email" type="text" class="form-control" v-model="email" required>
            </div>
            <div class="input-field">
                <label for="password">Password</label>
                <input id="password" type="password" class="form-control" v-model="pass" required>
            </div>
            <div class="center-align">
                <hr/>
                <button v-on:click="authenticate()" class="btn btn-primary btn-large">Register</button>
                <hr/>
                <p>Already have an account? - <router-link to="Login">Login Now</router-link></p> 
            </div>
        </form>
    </div>
</template>
```

With the template now in place, let's tackle the JavaScript code necessary for this component. We'll want to define a `data()` function which will return `username`, `email`, `pass` and an `error` which we'll populate in the unfortunate case where cognito throws back an error when registering a new user.

We'll also define our `methods` block, in which we'll define an `authenticate()` method which will pass in the `username`, `password` and `email` from our form defined above to the `cognitoAuth.signup` function we defined in the last tutorial in this series. This `signup` function returns either an `err`, or a `result` which we will ignore for now. 

The flow we want to define is, if `cognitoAuth.signup` is successful and the backend cognito service accepts this new user, then we should redirect our user to the `/confirm` route which we'll be adding shortly which will allow them to confirm their account. If it fails, then we populate our `error` which will be displayed in an alert at the top of our `Register Now` box:

<div class="filename"> frontend/src/components/Register.vue </div>

```html
<script>
export default {
  name: 'Register',
  data() {
      return {
          username: '',
          email: '',
          pass: '',
          error: null
      }
  },
  methods: {
    authenticate () {
        /*eslint: no-unused-vars: "off"*/
        this.$cognitoAuth.signup(this.username, this.email, this.pass, (err, result) => {
            if (err) {
                this.error = err
            } else {
                this.$router.push({path: '/confirm'})
            }
        })
    }
  }
}
</script>
```

And finally, just to make our Register component really **pop**, let's add some styling which will tweak the way a few things look:

<div class="filename"> frontend/src/components/Register.vue </div>

```html
<style scoped>
h4 {
    text-align: center;
    margin: 0;
    padding: 0;
    font-weight: 800;
    font-size: 18px;
}
p {
    text-align: center;
    font-size: 14px;
    padding-bottom: 10px;
}
.login-box {
    width: 400px;
    height: auto;
    background-color: white;
    margin-top: 60px;
    border-radius: 5px;
    padding: 40px;
    margin: auto;
    margin-top: 60px;
    border: 1px solid #E4E6E7;
    box-shadow: 0px 2px 5px rgba(0,0,0,0.4);
}
</style>
```

Saving this and navigating to this page via the top navbar should result in something like this:

![Registration Page](https://images.tutorialedge.net/images/imgur-clone/register.png)

## Confirm.vue component

Awesome, with this in place, we'll now have to tackle the `Confirm.vue` component which will allow our newly registered users to confirm their newly created accounts using the confirmation code which will have been emailed to them after registration.

This is going to look very much like our `Register.vue` code except slightly simplified, as there will be less fields to submit.

<div class="filename"> frontend/src/components/Confirm.vue </div>

```html
<template>
    <div class="login-box center-align">
        <h4>Confirm Signup</h4>
        <div class="card-panel red darken-2" v-if="error != null"><span class="white-text">{{ error.message }}</span></div>
        <p>Enter the verification code you should have recieved via email</p>
        <form class="form">
            <div class="input-field">
                <label for="username">Username</label>
                <input id="username" type="text" class="validate" v-model="username" required>
            </div>
            <div class="input-field">
                <label for="confirmcode">Confirmation Code</label>
                <input id="confirmcode" type="text" class="validate" v-model="confirmcode" required>
            </div>
            <div class="center-align">
                <button v-on:click="confirm()" class="btn btn-default btn-large">Verify Now</button>
            </div>
        </form>
    </div>
</template>
```

We can then update the JavaScript element of this component and within this we will want to define a single method `confirm` which will interface with our `cognitoAuth` class and call `confirmRegistration` passing in the username and the confirmation code:

<div class="filename"> frontend/src/components/Confirm.vue </div>

```html
<script>
export default {
    name: 'Confirm',
    data () {
        return {
            username: '',
            confirmcode: '',
            error: null
        }
    },
    methods: {
        confirm () {
            /*eslint: no-unused-vars: "off"*/
            this.$cognitoAuth.confirmRegistration(this.username, this.confirmcode, (err, result) => {
                if (err) {
                    this.error = err
                } else {
                    this.$router.push('/profile')
                }
            });
        }
    }
}
//confirmcode
</script>
```

And finally, in order to make this look a little nicer, let's update the styles:

<div class="filename"> frontend/src/components/Confirm.vue </div>

```html
<style scoped>
h4 {
    text-align: center;
    margin: 0;
    padding: 0;
    font-weight: 800;
    font-size: 18px;
}
p {
    text-align: center;
    font-size: 14px;
    padding-bottom: 10px;
}
.login-box {
    width: 400px;
    height: auto;
    background-color: white;
    margin-top: 60px;
    border-radius: 5px;
    padding: 40px;
    margin: auto;
    border: 1px solid #E4E6E7;
    box-shadow: 0px 2px 5px rgba(0,0,0,0.4);
}
button {
    margin: auto;
    background-color: #FA3254;
    margin: 0;
    padding: 0px 40px;
}
button i {
    font-size: 18px;
}
</style>
```

## Updating Routes

With the `Confirm.vue` component now implemented, we now need to add a route to this component within our `router/index.js` file. This will look a little something like so:

<div class="filename"> frontend/src/router/index.js </div>

```js
import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './../components/HomePage.vue'
import Login from './../components/Login.vue'
import Register from './../components/Register.vue'
import Single from './../components/Single.vue'
import Profile from './../components/Profile.vue'
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
      { path: '/:id', component: Single },
      { path: '/logout', beforeEnter: logout }
    ]
})
```

With this route in place, you can now try and register within the app and it should redirect you to the confirmation page and you should also have received a confirmation code via email which you can now input into that form.

The confirmation page should successfully be able to verify and will redirect you to the profile page on successful confirmation. This is a huge step forward for our application as new users can now register and we can start building a user base!

![Confirm Screenshot](https://images.tutorialedge.net/images/imgur-clone/confirm.png)

# Login Flow

Now that we have the ability for users to register, we need to implement the login flow so that already registered users can return and log into their account. 

<div class="filename"> frontend/src/components/Login.vue </div>

```html
<template>
    <div class="login-box">
        <div class="center-align">
            <div v-if="loading" class="loader loader--style1" title="0">
                <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
                <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                    C22.32,8.481,24.301,9.057,26.013,10.047z">
                    <animateTransform attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 20 20"
                    to="360 20 20"
                    dur="0.5s"
                    repeatCount="indefinite"/>
                    </path>
                </svg>
            </div>
        </div>
        <h4>LOGIN</h4>
        <div class="alert alert-warning" v-if="error != null"><span class="white-text">{{ error.message }}</span></div>
        <p>Login to upload your own images to the site!</p>
        <form class="form-group">
            <div class="input-field">
                <label for="username">Username</label>
                <input id="username" type="text" class="form-control" v-model="username" required>
            </div>
            <div class="input-field">
                <label for="password">Password</label>
                <input id="password" type="password" class="form-control" v-model="pass" required>
            </div>
            <div class="center-align">
                <br/>
                <button v-on:click="login()" class="btn btn-default btn-large">login</button>
                <hr/>
                <p>Don't have an account? - <router-link to="Register">Register Now</router-link></p> 
            </div>
        </form>
    </div>
</template>
```

Let's now take a look at the JavaScript portion of this component. Once again, this is going to look very much like both our Confirm and Register components that we've already implemented.  

This isn't necessarily a bad thing however. We have done the bulk of the 'heavy' lifting in the previous tutorial in this series in defining the `cognitoAuth` class, now we get to benefit from the fruits of that hard labour!

<div class="filename"> frontend/src/components/Login.vue </div>

```html
<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      pass: '',
      error: null,
      loading: false
    }
  },
  methods: {
    login () {
        this.loading = true
        /*eslint: no-unused-vars: "off"*/
        this.$cognitoAuth.authenticate(this.username, this.pass, (err, result) => {
            if (err) {
                this.error = err
                this.loading = false
            } else {
                this.$router.push('/profile')
            }
        });
    }
  }
}
</script>
```

Let's add a little bit more style to our Login component just to finish it off:

<div class="filename"> frontend/src/components/Login.vue </div>

```html
<style scoped>
h4 {
    text-align: center;
    margin: 0;
    padding: 0;
    font-weight: 800;
    font-size: 18px;
}
p {
    text-align: center;
    font-size: 14px;
    padding-bottom: 10px;
}
.login-box {
    width: 400px;
    height: auto;
    background-color: white;
    border-radius: 5px;
    padding: 40px;
    margin: auto;
    margin-top: 60px;
    border: 1px solid #E4E6E7;
    box-shadow: 0px 2px 5px rgba(0,0,0,0.4);
}
button {
    margin: auto;
    background-color: #FA3254;
    margin: 0;
    padding: 0px 40px;
}
button i {
    font-size: 18px;
}
</style>
```

If you save this, you should see that when you navigate to the `/login` route our newly updated `Login.vue` component in all it's glory! 

![Login Page](https://images.tutorialedge.net/images/imgur-clone/login.png)

Try logging in with a confirmed account and you should see it redirect you to the placeholder profile page which we'll update now!

# Profile Page:

Let's finish off by updating our `Profile.vue` component so that it retrieves the current logged in users and displays their `username` on the page.

This will just be the icing on the cake that will also allow us to prove that things like the route guard are actually working within our app. We'll include a `logout` button on the profile page just so that users can end their session and be redirected back to the homepage.

<div class="filename"> frontend/src/components/Profile.vue </div>

```html
<template>
<div class="container">
  <div class="profile-container">
      <h4>My Profile: {{ user.username }}</h4>

      <hr/>

      <button v-on:click="logout()" class="btn btn-danger">Logout</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      user: {},
      accessToken: null,
      error: null
    }
  },
  created: function() {
    this.user = this.$cognitoAuth.getCurrentUser();
    this.$cognitoAuth.getIdToken((err, result) => {
      if (err) {
        this. error = err
      } else {
        this.accessToken = result
      }
    })
  },
  methods: {
      logout: function() {
          this.$cognitoAuth.logout()
          this.$router.push({path: '/'})
      }
  }
}
</script>

<style scoped>
.profile-container{
  width: 100%;
  height: auto;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  margin: auto;
  margin-top: 60px;
  border: 1px solid #E4E6E7;
  box-shadow: 0px 2px 5px rgba(0,0,0,0.4);
}
.profile-container h4 {
  font-size: 22px;
  margin: 0;
  padding: 0;
}
</style>
```

Save this, and we should see our profile page return our username and rendering a nice logout button like so:

![Finished Profile Page](https://images.tutorialedge.net/images/imgur-clone/profile.png)

> **Action** - Test the logout functionality and try hit the `/profile` page. You will see the route guard automatically redirect you to the login page!

# Conclusion

Congratulations, you have successfully implemented one of the trickiest and most demanding bits of functionality for your application so far. This new Login/Register flow allows you to start building an audience for your application now and you can now start building the functionality for your app that will make it successful. 

## Further Reading

In the next tutorial, we are going to be extending our application so that our newly registered users can start populating the site with their cat/dog images for the rest of the world to see! We now have a skeleton app that is almost an MVP which we can pitch to investors for millions, I'm very much hoping that you are enjoying this series and following along! If you have any feedback, I would love to hear it via either email or by tweeting me directly: [@Elliot_f](https://twitter.com/elliot_f)

> **Under Construction** - The next tutorial in this series is currently under construction! It will be released on the 25th of January, 2020!

