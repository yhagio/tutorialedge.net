---
author: Paul Halliday
date: 2018-06-07T19:36:57+01:00
desc: In this post, you'll use a third-party library named Vuelidate to perform model
  validation depending on a particular rule set
image: vuejs.png
series:
- vuejs
tags:
- vuejs
- javascript
title: Form Validation With Vuelidate Vuejs
twitter: https://twitter.com/paulhalliday_io
weight: 1
---

> Learn how to validate forms using Vuelidate in this tutorial by Paul Halliday, the author of [Vue.js 2 Design Patterns and Best Practices](https://amzn.to/2JjyXiT).

In this post, you'll use a third-party library named Vuelidate to perform model validation depending on a particular rule set

# Create a New Vue Project

Create a playground project by running the following in your Terminal:

```s
# Create a new Vue project
$ vue init webpack-simple vue-validation

# Navigate to directory
$ cd vue-validation

# Install dependencies
$ npm install

# Install Vuelidate
$ npm install vuelidate

# Run application
$ npm run dev
```

# What is Vuelidate?

`Vuelidate` is an open source, lightweight library that helps you perform model validation with a variety of validation contexts. Validation can be functionally composed and it also works well with other libraries such as `Moment`, `Vuex`, and more. As you've installed it in your project with `npm install vuelidate`, you now need to register it as a plugin within main.js:

```js
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';

Vue.use(Vuelidate);

new Vue({
  el: '#app',
  validations: {},
  render: h => h(App),
});
```

Adding the empty validations object to your main Vue instance bootstraps Vuelidate's `$v` throughout the project. This then allows you to use the `$v` object to gain information about the current state of your form within your Vue instance across all components.

# Using Vuelidate

Now, create a basic form that allows you to input `firstName`, `lastName`, `email`, and `password`. This will allow you to add validation rules with Vuelidate and visualize them on screen:

```html
<template>
  <div>
    <form class="form" @submit.prevent="onSubmit">
      <div class="input">
        <label for="email">Email</label>
        <input 
        type="email" 
        id="email" 
        v-model.trim="email">
      </div>
      <div class="input"> 
        <label for="firstName">First Name</label>
        <input 
        type="text"
        id="firstName" 
        v-model.trim="firstName">
      </div>
      <div class="input">
        <label for="lastName">Last Name</label>
        <input 
        type="text" 
        id="lastName" 
        v-model.trim="lastName">
      </div>
      <div class="input">
        <label for="password">Password</label>
        <input 
        type="password" 
        id="password" 
        v-model.trim="password">
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };
  },
  methods: {
    onSubmit(){
    }
  },
}
</script>
```

There's a lot going on here, so break it down step by step:

1. You'll create a new form with the `@submit.prevent` directive so that the page doesn't reload when the form is submitted, which is the same as calling submit on this form and having `preventDefault` on the event.
1. Next, you’ll add `v-model.trim` to each form input element so as to trim any white space and capture the input as a variable.
1. You’ll define these variables inside your data function so that they're reactive.
1. The `Submit` button is defined with `type="submit"` so that when it's clicked, the form's submit function is run.
1. You're stubbing out a blank `onSubmit` function, which you'll be creating soon.

Now, you need to add the `@input` event and call the `touch` event on each one of your input elements, binding to the data property `v-model` and providing validation to the field:

```html
<div class="input">
  <label for="email">Email</label>
  <input 
  type="email" 
  id="email" 
  @input="$v.email.$touch()"
  v-model.trim="email">
</div>
<div class="input"> 
  <label for="firstName">First Name</label>
  <input 
  type="text"
  id="firstName" 
  v-model.trim="firstName"
  @input="$v.firstName.$touch()">
</div>
<div class="input">
  <label for="lastName">Last Name</label>
  <input 
  type="text" 
  id="lastName" 
  v-model.trim="lastName"
  @input="$v.lastName.$touch()">
</div>
<div class="input">
  <label for="password">Password</label>
  <input 
  type="password" 
  id="password" 
  v-model.trim="password"
  @input="$v.password.$touch()">
</div>
```

You can then add the validations to your Vue instance by importing them from `Vuelidate` and adding a `validations` object that corresponds to the form elements.

`Vuelidate` will bind the same name set here with your data variable:

```js
import { required, email } from 'vuelidate/lib/validators';

export default {
 // Omitted
  validations: {
    email: {
      required,
      email,
    },
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    password: {
      required,
    }
  },
}
```

You're simply importing the required email validators and applying them to each model item. This essentially makes sure that all of your items are required and that the email input matches an email regular expression. You can then visualize the current state of the form and each field by adding the following:

```html
<div class="validators">
  <pre>{{$v}}</pre>
 </div>
```

You can then add some styling to show the validation on the right and the form on the left:

```html
<style>
.form {
 display: inline-block;
 text-align: center;
 width: 49%;
}
.validators {
 display: inline-block;
 width: 49%;
 text-align: center;
 vertical-align: top;
}
.input {
 padding: 5px;
}
</style>
```

If everything has gone as planned, you should get the following result:

![vuejs form validation result](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/javascript/vuejs/form-validation-image1.png)

# Displaying form errors

You can use the `$invalid` Boolean inside the `$v.model_name` object (where `model_name` is equal to `email`, `firstName`, `lastName`, or `password`) to display messages or change the look and feel of your form field(s). You can start by adding a new class named `error` that adds `redborder` around the input field:

```html
<style>
input:focus {
  outline: none;
}
.error {
  border: 1px solid red;
}
</style>
```

You can then conditionally apply this class whenever the field is invalid and touched using `v-bind:class`:

```html
<div class="input">
  <label for="email">Email</label>
  <input 
  :class="{ error: $v.email.$error }"
  type="email" 
  id="email" 
  @input="$v.email.$touch()"
  v-model.trim="email">
</div>
<div class="input"> 
  <label for="firstName">First Name</label>
  <input 
  :class="{ error: $v.firstName.$error }"
  type="text"
  id="firstName" 
  v-model.trim="firstName"
  @input="$v.firstName.$touch()">
</div>
<div class="input">
  <label for="lastName">Last Name</label>
  <input 
  :class="{ error: $v.lastName.$error}"
  type="text" 
  id="lastName" 
  v-model.trim="lastName"
  @input="$v.lastName.$touch()">
</div>
<div class="input">
  <label for="password">Password</label>
  <input 
  :class="{ error: $v.password.$error }"
  type="password" 
  id="password" 
  v-model.trim="password"
  @input="$v.password.$touch()">
</div>
```

This will then give you the following results whenever the field is invalid or valid:

![vuejs form validation result](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/javascript/vuejs/form-validation-image2.png)

Subsequently, you can then display an error message if this is the case. This can be done in numerous ways, depending on the type of message you want to show. You can use the `email` input as an example and show an error message when the `email` field has an invalid email address:

```html
<div class="input">
  <label for="email">Email</label>
  <input 
  :class="{ error: $v.email.$error }"
  type="email" 
  id="email" 
  @input="$v.email.$touch()"
  v-model.trim="email">

  <p class="error-message" v-if="!$v.email.email">Please enter a valid email address</p>
</div>

// Omitted
<style>
.error-message {
 color: red;
}
</style>
```

As you can see from the representation of your `$v` object, the email Boolean is true when the field has a valid email address and false when it doesn’t. While this checks to see whether the email is correct, it doesn't check to see whether the field is empty. Now, add another error message that checks this based on the `required` validator:

```html
<p class="error-message" v-if="!$v.email.email">Please enter a valid email address.</p>
 <p class="error-message" v-if="!$v.email.required">Email must not be empty.</p>
```

You could even take this a step further and create your own wrapper component that would render the various error messages of each field. You can fill in the rest of your error messages along with a check to see whether the form element has been touched (is `$dirty`):

```html
<div class="input">
  <label for="email">Email</label>
  <input 
  :class="{ error: $v.email.$error }"
  type="email" 
  id="email" 
  @input="$v.email.$touch()"
  v-model.trim="email">

  <div v-if="$v.email.$dirty">
    <p class="error-message" v-if="!$v.email.email">Please enter a 
    valid email address.</p>
    <p class="error-message" v-if="!$v.email.required">Email must not 
    be empty.</p>
  </div>

</div>
<div class="input"> 
  <label for="firstName">First Name</label>
  <input 
  :class="{ error: $v.firstName.$error }"
  type="text"
  id="firstName" 
  v-model.trim="firstName"
  @input="$v.firstName.$touch()">

  <div v-if="$v.firstName.$dirty">
    <p class="error-message" v-if="!$v.firstName.required">First Name 
  must not be empty.</p>
  </div>
</div>
<div class="input">
  <label for="lastName">Last Name</label>
  <input 
  :class="{ error: $v.lastName.$error}"
  type="text" 
  id="lastName" 
  v-model.trim="lastName"
  @input="$v.lastName.$touch()">

  <div v-if="$v.lastName.$dirty">
    <p class="error-message" v-if="!$v.lastName.required">Last Name 
   must not be empty.</p>
  </div>
</div>
<div class="input">
  <label for="password">Password</label>
  <input 
  :class="{ error: $v.password.$error }"
  type="password" 
  id="password" 
  v-model.trim="password"
  @input="$v.password.$touch()">

  <div v-if="$v.password.$dirty">
    <p class="error-message" v-if="!$v.password.required">Password must 
  not be empty.</p>
  </div>
</div>
```

# Password validation

When creating user accounts, passwords tend to be entered twice and conform to a minimum length. Add another field and some more validation rules to enforce this:

```js
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';

export default {
 // Omitted
  data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      firstName: '',
      lastName: '',
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    repeatPassword: {
      required,
      minLength: minLength(6),
      sameAsPassword: sameAs('password'),
    },
  },
}
```

You've done the following:

1. Added the `repeatPassword` field to your data object so that it can hold the repeated password
1. Imported both the `minLength` and `sameAs` validators from `Vuelidate`
1. Added the `minLength` of 6 characters to the `password` validator
1. Added the `sameAs` validator to enforce the fact that `repeatPassword` should follow the same validation rules as `password`

As you now have appropriate password validation, you can add the new field and display any error messages:

```html
<div class="input">
 <label for="email">Email</label>
 <input 
 :class="{ error: $v.email.$error }"
 type="email" 
 id="email" 
 @input="$v.email.$touch()"
 v-model.trim="email">

 <div v-if="$v.email.$dirty">
 <p class="error-message" v-if="!$v.email.email">Please enter a valid email address.</p>
 <p class="error-message" v-if="!$v.email.required">Email must not be empty.</p>
 </div>

</div>
<div class="input"> 
 <label for="firstName">First Name</label>
 <input 
 :class="{ error: $v.firstName.$error }"
 type="text"
 id="firstName" 
 v-model.trim="firstName"
 @input="$v.firstName.$touch()">

 <div v-if="$v.firstName.$dirty">
 <p class="error-message" v-if="!$v.firstName.required">First Name must not be empty.</p>
 </div>
</div>
<div class="input">
 <label for="lastName">Last Name</label>
 <input 
 :class="{ error: $v.lastName.$error}"
 type="text" 
 id="lastName" 
 v-model.trim="lastName"
 @input="$v.lastName.$touch()">

 <div v-if="$v.lastName.$dirty">
 <p class="error-message" v-if="!$v.lastName.required">Last Name must not be empty.</p>
 </div>
</div>
<div class="input">
 <label for="password">Password</label>
 <input 
 :class="{ error: $v.password.$error }"
 type="password" 
 id="password" 
 v-model.trim="password"
 @input="$v.password.$touch()">

 <div v-if="$v.password.$dirty">
 <p class="error-message" v-if="!$v.password.required">Password must not be empty.</p>
 </div>
</div>
<div class="input">
 <label for="repeatPassword">Repeat Password</label>
 <input 
 :class="{ error: $v.repeatPassword.$error }"
 type="password" 
 id="repeatPassword" 
 v-model.trim="repeatPassword"
 @input="$v.repeatPassword.$touch()">

 <div v-if="$v.repeatPassword.$dirty">
 <p class="error-message" v-if="!$v.repeatPassword.sameAsPassword">Passwords must be identical.</p>

 <p class="error-message" v-if="!$v.repeatPassword.required">Password must not be empty.</p>
 </div>
</div>
```

# Form submission

In case your form is invalid, you can disable the `Submit` button:

```html
<button :disabled="$v.$invalid" type="submit">Submit</button>
```

You can also get this value inside your JavaScript with `this.$v.$invalid`. Here's an example of how you can check to see whether the form is invalid and then create a user object based on your form elements:

```js
methods: {
  onSubmit() {
    if(!this.$v.$invalid) {
      const user = { 
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        repeatPassword: this.repeatPassword
      }

      // Submit the object to an API of sorts
    }
  },
},
```

If you'd like to use your data in this fashion, you may prefer to set up your data object as follows:

```js
data() {
  return {
    user: {
      email: '',
      password: '',
      repeatPassword: '',
      firstName: '',
      lastName: '',
    }
  };
},
```

You have now successfully created a form with appropriate validation!
If this article interests you, you can refer to [Vue.js 2 Design Patterns and Best Practices](https://amzn.to/2JjyXiT). With this book, you'll be well on your way to becoming an expert Vue developer who can leverage design patterns to efficiently architect the design of your application and write clean and maintainable code.

