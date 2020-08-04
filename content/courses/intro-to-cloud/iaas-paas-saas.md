---
author: Elliot Forbes
date: 2018-06-09T22:48:26+01:00
desc:
  In this tutorial, we are going to look at how you can implement a testing
  framework for your TypeScript projects using Mocha and Chai
image: react.svg
paid: false
series: introcloud
tags:
  - cloud
title: Cloud Platforms - IAAS vs PAAS vs SAAS
twitter: https://twitter.com/Elliot_F
# video: 433296255
nextPage: /courses/ogimg-dev/frontend-02/
weight: 1
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

When it comes to cloud platforms, we can typically describe some of their offerings as `IAAS`, `PAAS`, `FAAS` or `SAAS`. Each of these is essentially a different level of abstraction, `IAAS` being the lowest-level of abstraction, `SAAS` being the highest. It's important to know the distinction between these different service levels that are currently on offer. 

You'll more often than not see a grid that looks like the one below when people discuss the differences between these key terms:

![Iaas-paas-faas](images/iaas-paas-faas.png)

This grid is excellent at showing how each level of service differs in terms of what the application developer manages compared to what the platform or service provider manages. 

## IAAS

When people talk about `IAAS`, they are referring to Infrastructure as a Service. This is where you effectively rent servers using services such as AWS' EC2. You would then be responsible for the management of these servers, and for the deployment of your applications to said servers.

Any servers requested would have to be configured to meet your exact system needs. This includes specifying things like the amount of memory each server has, the operating system it is running on and whether or not it is optimized for the likes of memory-intensive applications or graphical applications. 

It ultimately offers you far more fine-grained control when it comes to managing the infrastructure your applications run upon. However, in the world of designing applications for the cloud, this fine-grained control may not necessarily needed and could slow down the rate at which you develop new applications.   

## PAAS

`PAAS` or Platforms as a Service are offerings such as Pivotal's CloudFoundry or AWS' Elastic Beanstalk. These offerings effectively manage the underlying servers for you and allow you to focus purely on your application. 

These abstract away the difficulties you typically encounter when manage your own fleet of servers and, more often than not, provide you with things such as load balancers, monitoring and logging with minimal added fuss to the application developer.

## FAAS

`FAAS`, or Functions as a Service, are a newer style of offering where you focus purely on individual functions. Say, for instance, Gemma was looking to write an API Endpoint that she wanted to be scalable, resilient and available at a moments notice. She could leverage `FAAS`, write her function or a group of functions with a single entry point, and then deploy this as an AWS Lambda function.

This Lambda function will then scale dynamically to handle any incoming demands and she and her company will only be charged for whenever this Lambda Function is executed. She will not have to pay for idle servers waiting for demand to ramp up, and, more importantly, she will not have to worry about maintaining those servers, supporting those servers or requesting more servers. 

We'll be covering the advantages of `FAAS` in a later chapter and how Gemma used them to revolutionize things such as monitoring and batch processing. 

## SAAS 

`SAAS`, or Software as a Service would be akin to the likes of Microsoft Outlook, Twitter, or Github. These services are essentially a black box in terms of underlying infrastructure and are merely something you would consume through the likes of a web portal, a mobile application, or a standalone client.