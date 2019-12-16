---
title: "Part 5 - Uploading and Storing Images"
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

In this tutorial, we are going to look at building out the backend of our imgur clone and start creating a few simple ÅWS Lambda functions that will handle actions such as uploading, retrieving and deleting images.

# Introducing Serverless CLI

In order to make our lives simpler, we'll be using the Serverless CLI in order to test and deploy our AWS Lambda functions. 

The Serverless CLI does a number of key tasks for us when developing serverless applications across not only AWS, but also across technologies such as OpenFAAS, Google Functions and Azure functions to name a few. 

# Creating a Simple Lambda Function - Fetching Images from a Bucket

As with everything, we'll be starting off simple and creating a Lambda Function that can access an S3 Bucket that we will be creating and list off the paths of the images within that bucket.

## Creating an S3 Bucket

Before we build and test our function, we'll first need an S3 bucket in place that we will be using to store all of our user's images.

> We are keeping it simple for now and doing this through the AWS UI, but you can easily script the creation of these buckets through the excellent Boto3 Python library.



## Our Lambda Function Code

Now that we have an S3 bucket in place that will be able to store our user's images, we can start writing code that will retrieve the images from our bucket. 

```py
import s3

s3...
```

## Serverless Config

Now that we have the code for our first lambda function, we'll can now start writing our `serverless.yml` configuration that will allow us to easily deploy our first lambda function as well as giving it a HTTP endpoint.

<div class="filename"> .serverless.yml </div>

```yml
functions:
    events:
    ...
```

With this configuration in place, let's attempt to now deploy this 

<div class="filename"> $ serverless deploy </div>

```output
... deploy output
```

Awesome, you should now have your first deployed serverless function which you can hit through the endpoint outlined at the bottom of your deployment script.

# Storing Images

Now that we have the hang of writing serverless functions, let's 


# Deleting Images



# Image Rekognition



# Conclusion

So, in part 5 of this series, we have successfully managed to create a number of different AWS Lambda functions that now feature as the backend of our Imgur application.

## Further Reading:

Now that we have the backend of our Imgur application working and deployed to AWS, the next part of this series will be focused on creating an automated deployment pipeline that will allow us to focus on improving our application and reduce the time wasted on manual tasks.

* []()