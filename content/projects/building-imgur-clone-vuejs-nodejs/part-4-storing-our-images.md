---
title: "Part 4 - Uploading and Storing Images"
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

In this tutorial, we are going to look at building out the backend of our imgur clone and start creating a few simple AWS Lambda functions that will handle actions such as uploading, retrieving and deleting images. 

This is where our application really starts to take shape and provide real value to our users, just without some critical functions like authentication and registration, which we will be covering in the next tutorial in this series.

In this tutorial, we'll be introducing 2 key technologies that are widely used in production cloud applications around the world. These are:

* **Terraform** - This will be used to declaratively define what cloud infrastructure our application needs, i.e. the S3 buckets that will be used to store our images
* **Serverless CLI** - This will be used to define our AWS Lambda functions and the API gateways that these functions will sit behind.

> **Note** - You could use terraform to define these lambda functions, but I have found it's a far simpler and nicer experience using the Serverless CLI as it gives additional benefits such as deploying to multiple environments like 'test', 'dev', 'production'.   

# Introducing Serverless CLI

In order to make our lives simpler, we'll be using the Serverless CLI in order to test and deploy our AWS Lambda functions. This is a tool that has exploded in popularity since the start of the serverless revolution due to the way it simplified key tasks like creating API gateways and quickly deploying lambda functions. 

> **Note** - The Serverless CLI does a number of key tasks for us when developing serverless applications across not only AWS, but also across technologies such as OpenFAAS, Google Functions and Azure functions to name a few. 

## Official Serverless Docs

* [Serverless CLI Docs](https://serverless.com/framework/docs/providers/aws/cli-reference/)

# Introducing Terraform

Terraform is a widely adopted tool that allows us to declare in config what infrastructure we want to provision for our applications. It takes this config and interacts with `terraform providers` that call the underlying API endpoints that are needed to provision anything we configure. A lot of the large cloud providers such as AWS, Google Cloud, and DigitalOcean feature custom providers

# Creating a Simple Lambda Function - Fetching Images from a Bucket

As with everything, we'll be starting off simple and creating a Lambda Function that can access an S3 Bucket that we will be creating and list off the paths of the images within that bucket. 

## Creating an S3 Bucket

Before we build and test our function, we'll first need an S3 bucket in place that we will be using to store all of our user's images. 

We'll be using terraform to provision this bucket for us.

```terraform
provider "aws" {
}

resource aws_s3_bucket "image_bucket" {

}
```

With this defined, we can subsequently test this terraform configuration using the following command:

```output
$ terraform plan
;"```


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