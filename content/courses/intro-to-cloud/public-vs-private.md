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
title: Public Vs Private vs Hybrid Clouds
twitter: https://twitter.com/Elliot_F
## video: 433296255
nextPage: /courses/intro-to-cloud/load-balancers/
weight: 1
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---
 
For many large enterprises, the concept of throwing all of their confidential data straight into a public cloud offering can sometimes be a terrifying prospect. 

For larger enterprises, the solution to this is to expose private cloud offerings to enable internal developers to take advantage of all the benefits that cloud technologies offer, whilst retaining the data within on their own physical servers.

This approach, however, requires a team to manage any internal cloud offerings that are made available. But having one team do this is often far preferable, in terms of cost savings, than having every team having to manage their own servers.

This is the reason that platforms such as Pivotal's CloudFoundry are being developed. These platforms enable companies to develop and host their own private cloud offering with minimal fuss.

#### Hybrid Cloud Offerings

By offering an internal cloud platform, you by no means preclude yourself from using external public cloud applications. In fact, I've seen a number of successful examples of teams developing what is known as a hybrid cloud application.

These hybrid cloud applications are typically made up from a number of distinct services or microservices and deployed both on internal and external cloud offerings. The reason for doing this is that it gives you the best of both worlds. 

You can effectively architect your applications in such a way that it handles any confidential data internally, whilst leveraging public cloud platforms for your non-confidential data processing needs. 

![Hybrid Applications](images/hybrid-apps.png)

This approach can also be extended further to include applications deployed across traditional infrastructure. Say, for instance, you have an application that leverages a infrastructure such as message queues which are deployed on traditional infrastructure within your organization. 

A popular approach for moving to the cloud would be to pick apart pieces of your application and refactor those pieces to be cloud-native. You could then run this refactored part of your application at the same time as your traditional application until you are sure that everything is ready for a true production load. 

By picking apart your application, and transitioning your applications in a phased approach, you save yourself from the potential scenario where everything fails at once and you experience significant downtime. It gives you a safer route to onboarding to the cloud.