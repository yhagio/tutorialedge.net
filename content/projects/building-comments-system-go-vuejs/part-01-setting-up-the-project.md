---
author: Elliot Forbes
date: 2018-03-19T16:24:13Z
desc:
  In this tutorial, we are going to look at how we can deploy our Vue.js
  application to S3 and set up our CI/CD pipeline
image: vuejs.png
series:
  - serverlesscomments
tags:
  - serverlesscomments
title: Part 01 - Setting Up Our Project
twitter: https://twitter.com/Elliot_F
weight: 1
---

**Adding dynamic components to the site has been a task that I've wanted to tackle for a while now.** As an interim solution I had employed the Disqus commenting system but this was incredibly bulky and accounted for just under half of the page size for every page on my site. 

Eventually I want to add challenges to the site that allow people to test their knowledge through the browser. In order to prevent fragmentation across multiple services pieced poorly together, coming up with one solution to this challenge was clearly the only way forward. 

The first, and easiest part of this new dynamic site to try and implement was the commenting system. It was generally low-risk, if you lost the comments for a particular article then it wouldn't impact the content which is the most valuable part of the site.

# Why Serverless

There were a number of reasons why I opted for a serverless approach to this system:

* **Highly Scalable** - AWS Lambda services can cater for thousands of parallel requests per second with ease. 
* **Highly Resilient** - The site is already fairly popular and has a tonne of traffic, so I had to deploy something that I could almost guarantee wouldn't fail on me as soon as I deployed. If one request fails, it only impacts that one request, other requests are processed normally without any issue.
* **Maintainability** - The lambda functions that get deployed here store their logs in CloudWatch, this comes *for free* with this implementation and allows us to debug issues easily.
* **Cost** - This was a huge factor. Currently the site makes enough money to fund some Carbon Offsetting efforts, the hosting costs and a few gadgets and improvements to my home setup. Deploying a multi-server kube-based REST API is something that I had implemented in the past but I quickly found this ate into my profit margins. With AWS Lambda you only pay for the compute power you utilize, there is no wasted compute power. 

# Installing the Serverless CLI

The Serverless CLI is an absolutely wonderful tool that handles a lot of the complexity for deploying lambda functions and exposing them as `HTTP` endpoints for us. I've used this for other projects in the past and it is an incredible weapon to have in your arsenal when developing your own serverless APIs.

We can install this through `npm` like so:

```output
$ npm install -g serverless 
```

> **Official Documentation** - For the official and most up-to-date docs on installing the serverless cli check [here](https://serverless.com/framework/docs/getting-started/)

# Setting Up The Project

Let's start by setting up a project directory. Create a new directory and `cd` into that directory:

```output
$ mkdir -p comments-system
$ cd comments-system
```

Within this directory we can then look at initializing a new serverless project using the newly installed CLI:

```output
$ serverless init
```

With this in place, we can start defining a really simple `Hello, World!` API endpoint that will act as our starting point for the comment system.

# A Simple Endpoint

Let's start laying the foundations for our API by creating a single solitary endpoint. 

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello World")
}
```

# Deploying Our API

# Conclusion

Awesome, so in this tutorial we have managed to successfully setup a simple HTTP API using the `serverless cli` and 

## Next Tutorial

In the next tutorial, we are going to look at how we can set up our Database and 

* [Next Tutorial]()