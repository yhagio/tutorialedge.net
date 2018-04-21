---
title: "Part 3 - Setting Up Our Dynamodb Table"
date: 2018-04-20T12:31:40+01:00
draft: true
desc: "In this tutorial, we are going to define our first DynamoDB table and try inserting, deleting and updating blog posts into our table before finally updating our first lambda function"
author: "Elliot Forbes"
tags: ["vuejs", "javascript"]
image: "vuejs.png"
weight: 3
series: [ "vuejsawsblog" ]
twitter: "https://twitter.com/Elliot_F"
---

In the previous tutorial, we managed to get our first Lambda tutorial up and running, however, it doesn't do anything too exciting as it stands. This is where Dynamo comes in, we need to create a DynamoDB table where we can store everything we need for our blog. This includes new blog posts, any comments, ratings, and whatever else we can think of!

Once we have this new table all defined, we can start to play about with inserting things and then retrieving them using our existing Lambda function. Let's get started!

## Step 1 - Creating a DynamoDB Table

The first thing we'll have to do is set up a pool. This involves defining a simple schema that will be used to store our blog posts and subsequently our comments. We have a number of methods we can use when it comes to defining our table, we can do it either programmatically or via the AWS website. For the purpose of this tutorial, we'll be using the later.

![Create Table DynamoDB](https://s3-eu-west-1.amazonaws.com/tutorialedge.net/images/vuejs-blog-aws/screenshot-04.png)

We want our table to be able to store the post's title, the body, a description, and finally a slug which will allow us to navigate to the page within our Vue.JS application.

The good thing about a NoSQL database is that we can dynamically change the schema to suit our needs further down the line, as this is the case, let's just start by defining our `vuejs-aws-blog` table with our `title` as the Primary key like so:

![Create Table DynamoDB](https://s3-eu-west-1.amazonaws.com/tutorialedge.net/images/vuejs-blog-aws/screenshot-05.png)

This will then go ahead and create our table for us. ONce this is done we can then start playing with it and putting in 

![Create Table DynamoDB](https://s3-eu-west-1.amazonaws.com/tutorialedge.net/images/vuejs-blog-aws/screenshot-06.png)

## Step 2 - Testing Inserts Locally

Once we have defined our table's schema and everything is set up for us, we can go about testing it out with a few simple inserts.

![Create Table DynamoDB](https://s3-eu-west-1.amazonaws.com/tutorialedge.net/images/vuejs-blog-aws/screenshot-07.png)

> UNDER CONSTRUCTION

## Step 3 - Updating our Lambda Function

## Step 4 - A New Insert Function!

## Next Steps

