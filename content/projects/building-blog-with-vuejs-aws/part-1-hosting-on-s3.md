---
author: Elliot Forbes
date: 2018-03-19T16:24:13Z
desc: In this tutorial, we are going to look at how we can deploy our Vue.js application
  to S3 and set up our CI/CD pipeline
image: vuejs.png
series:
- vuejsawsblog
tags:
- vuejs
- javascript
title: Part 1 - Setting Up Our CI/CD Pipeline to S3
twitter: https://twitter.com/Elliot_F
weight: 1
---

If you know anything about me, you'll know I am incredibly lazy. This means that it's incredibly important to set up an automated deployment pipeline early in the project's development. 

If we are serious about developing a decent website that will make us tonnes of money then we need to get this working from the start. Afterall, if it takes us about 5-10 minutes to deploy our site, by automating this we'll be saving ourselves 5-10 minutes every time we wish to push up changes. 

## Benefits of Automated Deployments

There are quite a few benefits of setting up an automated deployment pipeline:

* We save ourselves time.
* We can quickly and accurately deploy fixes to our site should we have any issues.
* I may have mentioned this before but, we save ourselves time! This cannot be stated enough, we can spend more time developing our application and providing more value to our users.

## The Process

So, within this part of the series, we need to follow these steps:

* Generate Vue.js project using the Vue cli.
* Create a new Github repo and make our first commit to it.
* Set up our Travis-CI account and get it automatically building whenever we make a commit to `master`
* Create a CI/CD pipeline that will automatically deploy both our Lambda functions and our frontend for us! :)

This is a somewhat ambitious list of things we need to do, however, if we complete this, we should have an excellent base from which we can build the rest of our project!

## Creating our Vue.JS Project

First things, first. We need something that we can deploy, let's create our base Vue.JS project using the `vue-cli` like so:

```s
$ mkdir frontend
$ cd frontend
# assuming version 2.9.4 of the vue-cli 
$ vue init webpack
```

Once we have this set up, we can test whether our project builds by running:

```s
$ yarn run build
```

This should compile all of our dependencies, resources and everything our Vue.js project needs in order to run within a browser into a `dist/` directory. Essentially, these files within this `dist/` directory are the ones that we'll want to deploy to our S3 bucket.

## Creating a Repo and Making Our First Commit

We'll need to set up a new github repository in which our project can live. Create a new repository called `vuejs-aws-blog` on Github and then open up a command prompt at the location of your new Vue.js project. 

```s
$ git add -A
$ git commit -m "Initial Commit"
$ git push origin master
```

Now that you have pushed up your changes, you should be able to see your initial Vue.js. We've completed the first step of this tutorial! Time to move on to setting up our Travis-CI account:

## Setting up our Travis Account

We need a Travis-CI account in order for this to work. Thankfully, for open source projects like ourselves, this is 100% free, woo! You will need to do the following:

1. Register for Travis should you not already have an account [Travis](https://travis-ci.org/)
1. You'll then want to register the new repo you've created within your Travis account

Once you've done all of these steps, travis should start to kick off jobs everytime you make a commit to your new repo.

## Building our CI/CD Pipeline

Add `.travis.yml` to the root directory of your new project and add the following to this new file:

```yaml
language: node_js

node_js:
- node

jobs:
  include:
    - stage: deploy_frontend
      script: ./deploy/frontend.sh
    - stage: deploy_functions
      script: ./deploy/functions.sh
```

This essentially specifies that we want to build our project using node. We then go on to specify a [multi-stage pipeline](https://docs.travis-ci.com/user/build-stages/) which will build and deploy our frontend and then deploy our AWS Lambda functions that we will build up later in the course.

You'll then want to add a new folder to your project called `deploy/`. This will contain 2 deployment scripts:

```s
.travis.yml
deploy/
- frontend.sh
- functions.sh
```

Our frontend.sh will look like this:

```s
# navigate into our frontend directory
cd frontend/

# build our frontend project
npm install
npm run build

# navigate into the directory which contains
# our built frontend
cd dist/

# Push to S3
# We've still to do this
```

and our `functions.sh` will look like this for now, we'll just be installing the `serverless` cli for now until we are ready to go ahead and build and deploy our own Lambda functions:

```s
# we need to install the serverless cli
npm install -g serverless

# we navigate into the directory which contains
# our serverless functions
# cd functions

# We deploy our functions up to our AWS account
# this step we've still to implement
```

#### Travis CI Environment Variables

In order for us to be able to deploy both our site to S3 and our functions to AWS Lambda, we'll have to add our AWS credentials as environment variables to the project. We can do that within the UI that Travis.ci provides for us. We need to add the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` that you can obtain from your AWS account from the `IAM` section of your AWS console.

You should see your credentials look like this within your travis.ci project settings page: 

![Adding AWS credentials](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/vuejs-blog-aws/screenshot-01.png)

Now, whenever we commit a new change to our repo, we should see our travis build kick off and run through the two stages of our project's deployment that we've defined above.

## Current State

At this point in the tutorial, you should have a directory structure that looks like this:

```s
frontend/
# all our Vue.JS frontend code
deploy/
- functions.sh
- frontend.sh
.travis.yml
```

## Conclusion

In this tutorial, we managed to get our CI/CD pipeline up and running so that it automatically deploys our built application up to our S3 bucket where it will live.

