---
author: Elliot Forbes
date: 2018-04-20T12:41:31+01:00
desc:
  In this tutorial, we are going to set up our Cognito user pools so that we can
  start to build admin panels that only select people can access.
image: vuejs.png
series:
  - vuejsawsblog
tags:
  - vuejs
  - javascript
title: Part 5 - Getting Started With AWS Cognito
twitter: https://twitter.com/Elliot_F
weight: 4
---

In the previous tutorial, we managed to get our DynamoDB table set up and
populated with a couple of very simple posts. In this tutorial, we are going to
set up a Cognito pool that will store all of the users that register for our
Blog. We'll also be able to improve our Lambda endpoints so that they aren't
open to the world, they require authentication before they start updating our
database, this will stop unauthorized people potentially updating posts and
doing malicious things.

# Step 1 - Setting up a Pool

So, the first thing we'll need to do is to provision a new User Pool within the
Cognito service. We can do this by navigating to the Cognito service page and
clicking "Manage Pools". Once we've done that, you should see a page that looks
quite similar to this:

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/vuejs-blog-aws/screenshot-09.png)

You'll notice the blue `Create a user pool` button in the top right hand corner,
click on it and we'll walk through the options.

First, we'll specify the name, in this case I've gone for a reasonably apt name:
`vuejs-blog-aws`:

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/vuejs-blog-aws/screenshot-10.png)

Next, we'll want to click on the `Review defaults` button below where it asks
how we wish to create our pool.

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/vuejs-blog-aws/screenshot-11.png)

The standard settings are perfect for what we are trying to achieve, so lets
leave everything as it stands and click create at the bottom of the page.

We should then see our console go off and provision the pool for us. If
everything went to plan then you should see a screen similar to the one below,
it'll contain our Pool ID and it's ARN.

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/vuejs-blog-aws/screenshot-12.png)

Finally, we'll want to add an `App Client` to our user pool so that we can start
to interact with the cognito service from our frontend blog:

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/vuejs-blog-aws/screenshot-13.png)

Once, we've done this, we should be good to move onto the next part of our
project and create authenticated Routes and a sign-in.

# Step 2 - Authentication with Cognito

So, we've got our User Pool all sorted, we also have our App's client ID. We'll
also be utilizing the `amazon-cognito-identity-js` and `aws-sdk` node modules in
order to communicate with our AWS Cognito service.

We can install these like so:

```s
$ npm install amazon-cognito-identity-js aws-sdk --save
```

We'll then need to create a config file within our `frontend` project that will
feature the following:

- Region - The region in which our AWS User Pool resides
- IdentityPoolId - The `Pool Id` supplied within the General settings tab for
  our Cognito Pool
- UserPoolId - This looks very similar to this: `eu-west-1:853957954650` which
  can be found within the generated `Pool ARN`.
- ClientId - The App client ID

This will be put into a file that looks like this:

```js
// src/config/index.js
export default {
  region: "eu-west-1",
  IdentityPoolId: "eu-west-1_9IBAarCx9",
  UserPoolId: "eu-west-1:853957954650",
  ClientId: "43duengi4ldb6jel18p84sgq22"
};
```

I'll admit that I was somewhat apprehensive about putting these values into my
frontend source code, in which people can inspect it when it goes live into
production. However, these are only used to hit unathenticated endpoints and as
such, hackers cannot use them to do anything malicious.

Next, let's create a new cognito service within our application that will handle
all of our cognito-based interaction:

```js
// src/cognito/cognito.js
import { Config, CognitoIdentityCredentials } from "aws-sdk";
import {
  CognitoUser,
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUserAttribute
} from "amazon-cognito-identity-js";

export default class CognitoAuth {
  constructor() {
    this.userSession = null;
  }
}
```

## Some Simple Functions

Let's now start to populate our `CognitoAuth` class with a couple of functions.
We'll start by creating an `isAuthenticated()` method which will verify if a
user is authenticated against the Cognito service, and a `configure()` method
which we may need further down the line:

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

Next, we'll need need a `signup` method which will, funnily enough, allow people
to sign up to our blog and subsequently be able to post their own blog posts up
to the site.

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

We will also need an `authenticate` method which will validate whether someone
who is attempting to login has valid credentials.

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

Let's now have a look at our next batch of functions. We'll want to be able to
retrieve a logged-in user's details, we'll also want a method that will allow us
to confirm a user's registration. We'll also want a `logout` method and a
`getIdToken()` method so, let's dive into the code:

```js
getCurrentUser () {
    return this.userPool.getCurrentUser()
}

confirmRegistration (username, code, cb) {
    let cognitoUser = new CognitoUser({
        Username: username,
        Pool: this.userPool
    })
    cognitoUser.confirmRegistration(code, true, cb)
}

/**
  * Logout of your cognito session.
  */
logout () {
    this.getCurrentUser().signOut()
    this.onChange(false)
}

/**
* Resolves the current token based on a user session. If there
* is no session it returns null.
* @param {*} cb callback
*/
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

Finally, we'll want to create an `index.js` within our `cognito` directory which
will export our new CognitoAuth class like so:

```js
// src/cognito/index.js
import Vue from "vue";
import CognitoAuth from "./cognito";
import config from "@/config";

Vue.use(CognitoAuth, config);

export default new CognitoAuth();
```

# Our Register Component

```html
<template>
  <div class="login-box">
    <h4>Register</h4>
    <div class="card-panel red darken-2" v-if="error != null">
      <span class="white-text">{{ error.message }}</span>
    </div>
    <p>Don't have an account? Register for one using your Google account</p>
    <form @submit.prevent="authenticate">
      <div class="input-field">
        <input
          id="username"
          type="text"
          class="validate"
          v-model="username"
          required
        />
        <label for="username">Username</label>
      </div>
      <div class="input-field">
        <input
          id="email"
          type="text"
          class="validate"
          v-model="email"
          required
        />
        <label for="email">Email</label>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          v-model="pass"
          required
        />
        <label for="password">Password</label>
      </div>
      <div class="center-align">
        <button class="btn btn-default btn-large">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        username: "",
        pass: "",
        email: "",
        error: null
      };
    },
    methods: {
      authenticate() {
        this.$cognitoAuth.signup(
          this.username,
          this.email,
          this.pass,
          (err, result) => {
            if (err) {
              this.error = err;
            } else {
              this.$router.replace({ path: "/confirm" });
            }
          }
        );
      }
    }
  };
</script>

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
    border: 1px solid #e4e6e7;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
  }
  button {
    margin: auto;
    background-color: #fa3254;
    margin: 0;
    padding: 0px 40px;
  }

  button i {
    font-size: 18px;
  }
</style>
```

# Our Confirm Component

```html
<template>
  <div class="login-box center-align">
    <h4>Confirm Signup</h4>
    <div class="card-panel red darken-2" v-if="error != null">
      <span class="white-text">{{ error.message }}</span>
    </div>
    <p>Enter the verification code you should have recieved via email</p>
    <form @submit.prevent="login">
      <div class="input-field">
        <input
          id="username"
          type="text"
          class="validate"
          v-model="username"
          required
        />
        <label for="username">Username</label>
      </div>
      <div class="input-field">
        <input
          id="confirmcode"
          type="text"
          class="validate"
          v-model="confirmcode"
          required
        />
        <label for="confirmcode">Confirmation Code</label>
      </div>
      <div class="center-align">
        <button class="btn btn-default btn-large">Verify Now</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: "Confirm",
    data() {
      return {
        username: "",
        confirmcode: "",
        error: null,
        loading: false
      };
    },
    methods: {
      login() {
        this.loading = true;
        this.$cognitoAuth.confirmRegistration(
          this.username,
          this.confirmcode,
          (err, result) => {
            if (err.statusCode !== 200) {
              this.error = err;
            } else {
              console.log("Successfully Verified");
              this.$router.replace("/profile");
            }
          }
        );
      }
    }
  };
  //confirmcode
</script>

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
    border: 1px solid #e4e6e7;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
  }
  button {
    margin: auto;
    background-color: #fa3254;
    margin: 0;
    padding: 0px 40px;
  }

  button i {
    font-size: 18px;
  }
</style>
```

# Our Login Component

So, now that we've created our User Pool and built our service, let's now create
a component within our VueJS application that will allow us to log in or
register should we not already have an account.

Let's build our `Login` component first. Create a new file called `Login.vue`
within your `src/component/` directory. Within this, we'll be defining our three
standard sections, the `<template>` section, the `<script>` section, and the
`<style>` section.

Within our `<template>` section, let's add the following code:

```html
<template>
  <div class="login-box">
    <h4>LOGIN</h4>
    <div class="card-panel red darken-2" v-if="error != null">
      <span class="white-text">{{ error.message }}</span>
    </div>
    <p>Login to upload your own images to the site!</p>
    <form @submit.prevent="login">
      <div class="input-field">
        <input
          id="username"
          type="text"
          class="validate"
          v-model="username"
          required
        />
        <label for="username">Username</label>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          v-model="pass"
          required
        />
        <label for="password">Password</label>
      </div>
      <div class="center-align">
        <button class="btn btn-default btn-large">login</button>
        <br />
        <p>
          Don't have an account? -
          <router-link to="Register">Register Now</router-link>
        </p>
      </div>
    </form>
  </div>
</template>
```

This will take in a `username` and a `password` and will hit the `login()`
method we are going to define below.

Now that's done, let's add our JavaScript, this will feature just a simple
`login()` method that will take any inputted credentials and attempt to
authenticate against our Cognito service using them. When the authenticate
method returns, we'll be able to check to see if it was successful, upon which
we'll redirect to the `/profile` page, or unsuccessful, upon which we'll log out
our issue.

```js
export default {
  name: "Login",
  data() {
    return {
      username: "",
      pass: "",
      error: null,
      loading: false
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$cognitoAuth.authenticate(
        this.username,
        this.pass,
        (err, result) => {
          if (err.statusCode !== 200) {
            console.log(err);
            this.error = err;
          } else {
            this.$router.replace("/profile");
          }
        }
      );
    }
  }
};
```

And finally, some really simple `css` rules that will make our Login form look a
little nicer.

```css
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
  border: 1px solid #e4e6e7;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
}
button {
  margin: auto;
  background-color: #fa3254;
  margin: 0;
  padding: 0px 40px;
}

button i {
  font-size: 18px;
}
```

# Conclusion

In this part of the course, we managed to successfully extend our project so
that it interacts nicely with the AWS Cognito service. We have implemented full
login/register functionality and consequently we can now start to build more of
a community around our topic of choice.

> The next parts of this course are currently under construction.
