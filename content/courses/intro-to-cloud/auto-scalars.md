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
title: Auto Scalars
twitter: https://twitter.com/Elliot_F
# video: 433296255
nextPage: /courses/intro-to-cloud/
weight: 1
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

## Auto Scalers

One of the key issues that Gemma and her team faced was that of a variable amount of traffic coming through their services. At times this would be just a couple of users per minute which was easily handled, however when some of the comics went viral, this number could go up to hundreds of people using their site, per second. 

In order to ensure their services never went down due to too many people being on their site, they had to provision servers that were large and more than capable of handling any level of the traffic that hit them. 

This however was not ideal as it meant that in times of incredibly low usage these servers were left under-utilized and were costing more money than they were making. There were also times where even the largest of servers would start to struggle when certain pages went viral online.

This is where autoscalers came in to save the day. 

Gemma and her team could couple their services up with autoscalers that would be able to dynamically observe and react to varying levels of traffic being placed on their systems. This meant that in times of low traffic, the autoscalers would minimize the number of servers currently active and only increase this number when demands on the system increased. 

This not only saved the company a lot of money as they were no longer paying for incredibly powerful servers to be up at all times, it also saved them from constantly worrying how their site was going to handle periods where their content went viral. 

### Stateless vs Stateful Applications

When it came to designing new applications one thing Gemma had to bear in mind was the statefulness of said applications. When designing cloud-native systems it's best to keep the applications stateless so that they are not only easier to test, but they are also easier to scale horizontally.   

### Horizontal vs Vertical 

When it comes to scalability, you can either scale your apps horizontally or vertically. 

When someone says that they wish to scale their app horizontally it means that they wish to deploy more instances of their application across more servers in order to handle the load.

If they wished to scale their application vertically then it would be a case of increasing the size of the servers their application was currently running upon. 

Each of these ways has their merits but the easiest one to perform is without a doubt horizontal scaling. With vertical scaling you have to get a snapshot of your current EC2 instance, provision a larger instance and then deploy that instance with your snapshot. This requires stopping and killing the old instance.

With horizontal scaling, you simply clone an existing t2 instance and start it. Once it's started you add it to your load balancer and, if you have designed your application to be stateless, it should now be able to handle more traffic with minimal fuss.

## Summary

In this chapter we looked at the various ways that Gemma and her team could improve the resiliency of their applications running in the cloud through the use of various different types of load balancers. 

We also looked at the various ways that they could safely release new changes through the utilization of different deployment practices such as Green-Blue deployment, canary testing and feature flags. 