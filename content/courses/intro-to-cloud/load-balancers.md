---
author: Elliot Forbes
date: 2018-06-09T22:48:26+01:00
desc:
  In this tutorial, we are going to look at how you can implement a testing
  framework for your TypeScript projects using Mocha and Chai
image: cloud.svg
paid: false
series: introcloud
tags:
  - cloud
title: Load Balancers and Auto Scalars
twitter: https://twitter.com/Elliot_F
## video: 433296255
nextPage: /courses/intro-to-cloud/containerization/
weight: 1
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

In this chapter, we'll be looking at how you can utilize Load Balancers and Auto Scalers in order to add resiliency to your application. We'll touch upon the different types of Load Balancers that are available and we'll look at how you can implement zero-downtime deployment pipelines using techniques like Blue-Green deployment and Canary Deployments.

### Introduction

Now, many developers I've seen are content to run their software on a single server instance and hope and pray that their single instance does not crash for any reason. This may be fine for a simple blog site or something that isn't highly critical and earning any significant revenue, but for serious projects, it's absolutely unacceptable. 

If you have applications that are highly critical and cannot, under any situation go down for any period of time, then deploying that application to a solitary server instance is on par with playing russian roulette. 

That solitary server instance could fall over at a moments notice and knock out your entire infrastructure and effectively wipe out your application. This is why it's vital that we start architect our applications in such a way that they aren't reliant on a solitary instance so that they can handle server failures.

This is where load balancers come into play.

### Load Balancers

So, load balancers are pretty cool in the sense that they can distribute every request coming into a load balanced service across multiple instances of an application. This effectively means that you could have 4 instances of your application deployed and running on 4 different servers in 4 different regions and have a load balancer spread all of the requests across these instances of your application in various ways.

This is ideal for scenarios where you must never have any downtime. If one of your servers falls over for any reason, the load balancer will just route any incoming requests to any of the other instances that are still currently running. 

![Basic Load Balancer](images/basic-load-balancer.png)

#### Types of Load Balancer

When it comes to configuring a load balancer, you can choose from a number of different types of load balancer. You could opt for a classic round-robin style load balancer, or go for a load balancer that features some underlying logic in how it handles requests. 

Most cloud service providers typically provide at least 3 different types of load balancer:

| Type | Description |
| -- | -- |  
| Classic Load Balancer | This is your standard round-robin style load balancer which distributes requests evenly across instances attached to that load balancer |
| Geographic Load Balancer | The geographic load balancer looks at where each particular request is coming from and tries to route the request to the closest geographic server instance |
| Network-based Load Balancer | The network based load balancer looks at latency and tries to route the request to the server that will provide the lowest latency |