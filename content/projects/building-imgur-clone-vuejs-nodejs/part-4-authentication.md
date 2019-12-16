---
title: "Part 4 - Authentication between our Backend and Frontend"
date: 2019-08-20T18:44:50+01:00
draft: true
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

 

# Conclusion

So, in this tutorial we have covered adding authentication to our Imgur clone and adding a few routes that allow users to create accounts and subsequently log in to our app.

We have looked at some of the things you must avoid when adding authentication to your application and we now have the base of a pretty cool dynamic application.

## Further Reading:

In the next tutorial, we are going to be looking at building out the backend of our imgur clone and creating a number of AWS Lambda functions that our frontend SPA will interact with to upload, fetch and delete images within a user's account.

* [Part 5 - Introducing AWS Lambda Functions](/)