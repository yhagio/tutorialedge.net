---
author: Elliot Forbes
date: 2018-04-20T12:31:40+01:00
desc: In this tutorial, we are going to define our first DynamoDB table and try inserting,
  deleting and updating blog posts into our table before finally updating our first
  lambda function
image: vuejs.png
series:
- vuejsawsblog
tags:
- vuejs
- javascript
title: Part 4 - Setting Up Our Dynamodb Table
twitter: https://twitter.com/Elliot_F
weight: 3
---

In the previous tutorial, we managed to get our first Lambda tutorial up and running, however, it doesn't do anything too exciting as it stands. This is where Dynamo comes in, we need to create a DynamoDB table where we can store everything we need for our blog. This includes new blog posts, any comments, ratings, and whatever else we can think of!

Once we have this new table all defined, we can start to play about with inserting things and then retrieving them using our existing Lambda function. Let's get started!

## Step 1 - Creating a DynamoDB Table

The first thing we'll have to do is set up our table. This involves defining a simple schema that will be used to store our blog posts and subsequently our comments. We have a number of methods we can use when it comes to defining our table, we can do it either programmatically or via the web interface. For the purpose of this tutorial, we'll be using the web interface.

![Create Table DynamoDB](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/vuejs-blog-aws/screenshot-04.png)

We want our table to be able to store the post's title, the body, a description, and finally a slug which will allow us to navigate to the page within our Vue.JS application.

The good thing about a NoSQL database is that we can dynamically change the schema to suit our needs further down the line, as this is the case, let's just start by defining our `aws-vuejs-blog-posts` table with our `slug` as the Primary key and `posted` as our sort key. 

By doing this, we allow ourselves incredibly quick lookups of individual blog posts based off the `slug` we provide and we can also filter. 

![Create Table DynamoDB](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/vuejs-blog-aws/screenshot-05.png)

This will then go ahead and create our table for us. Once this is done we can then start playing with it and putting in some of our blog's content.

If we want to do cool things such as paginated queries and 

## Step 2 - Testing Inserts Locally

Now that we have defined our table's schema and everything is set up for us, we can go about testing it out with a few simple inserts. For the purpose of this tutorial, we'll just be using the web interface to insert new content into our table. 

Try inserting a few items into our new table that feature a `title`, a `body`, a `description`, and a `slug`.

![Create Table DynamoDB](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/vuejs-blog-aws/screenshot-08.png)

## Step 3 - Updating our Lambda Function

Perfect, we now have both a table and some data within said table to play about with and retrieve within our solitary Lambda function. Open up your `listPosts.js` lambda function within your editor and then append the following:

## Step 4 - A New Insert Function!

## Next Steps

