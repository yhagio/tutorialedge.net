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
title: Cloud Deployment Practices
twitter: https://twitter.com/Elliot_F
## video: 433296255
nextPage: /courses/ogimg-dev/frontend-02/
weight: 1
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

### Deployment Practices

When it comes to deploying new versions of your systems to replace existing versions of your application, you typically have a variety of different approaches you could choose from. Each of these has certain advantages over the others and it's important to consider the benefits of each of them when planning how you wish to do deployments.

In this section, we'll look at some of the most popular deployment strategies you could use to ensure minimal-to-no downtime updates to your applications.

#### Green-Blue Deployment 

The first deployment strategy, and quite possibly the most commonly used strategy, is your standard green-blue deployments. Say, for instance, we had 2 instances of our application running behind a load balancer. 

In this particular scenario, we've called one instance our `green` instance and the other our `blue` instance. It's important to note that these are identical in all but name.

![green blue deployments](images/green-blue-01.png)

At this point, our application developers finish cutting the release for version 1.1 of our new application, and are now at the point that they wish to release this into production for clients to consume.

So, how do they do this without incurring downtime?

This is where this blue-green strategy comes into play. Let's have a look at how this works step-by-step.

#### Step 1

Step 1 would be to remove our `green` instance from our load balancer. At this point in time we are down to only 1 server and instance of our application currently handling requests from our users.

![step 1](images/green-blue-02.png)

We would then swap out our `green` v1.0 instance for our newly cut v1.1 instance and perform any last minute checks or integration tests to ensure that when our instance does start accepting production requests, it doesn't start throwing up any errors: 

![step 2](images/green-blue-03.png)

And once we were happy v1.1 of our application is up and running as we expected, we would subsequently re-add it back to our load balancer setup:

![step 3](images/green-blue-04.png)

At this point in time, our application will be sending requests to both v1.1 and v1.0 of our application. 

We now need to update our `blue` instance in an identical fashion to how we updated our `green`. We first remove the `blue` instance from our load balancer setup:

![step 4](images/green-blue-05.png)

And then subsequently deploy our new v1.1 of our `blue` application over our old version:

![step 5](images/green-blue-06.png)

Before finally re-adding our `blue` instance back into our load balancer configuration:

![step 6](images/green-blue-07.png)

And ta-da! We've managed to update our application from version 1.0 to version 1.1. You should also notice that, at no point throughout this deployment process, was our application not accepting requests from our users. 

We've effectively managed to deploy a new version of our hypothetical application with no downtime and no stress. We were able to verify that our new v1.1 of our application was good to go before going live, should there have been any issues with v1.1 when we performed out tests, we could have simply redeployed version 1.0 and re-added that back to our load balancer configuration.

#### Canary Testing  

Another method of deployment that Gemma could leverage is Canary Testing. The name of this comes from the olden days of people working in mines, there would often be scenarios where Carbon Monoxide levels would rise dangerously and the miners had no way of determining this. 

In order to combat this, miners would place canary birds in cages along the sections of the mine that they inhabited. When carbon monoxide levels rose, this meant bad things for the poor canaries. The miners however would see their demise and quickly get out of the mine until levels of Carbon Monoxide dropped.

Imagine you were now trying to test how good a new feature of your application was but didn't want to impact everyone in the world using your service. With Canary testing you would deploy changes only to a very limited geographic spread and monitor to see how well these changes are picked up. If they are successful, you would then start to roll these changes out to other regions in an incremental fashion. If they failed then you would only have impacted a certain geographic location.

Large companies such as Facebook utilize this method and will commonly deploy things to the country of New Zealand before any other country in order to test any big changes.  

#### Feature Flags

Another cool way to deploy new changes is to utilize something called feature flags. Essentially, within your application, you would have a conditional statement that determines whether or not to use a new feature depending on what state a particular flag is in. 

If the flag is enabled then the new feature is utilized. If they face issues with this new feature and it starts to impact users, they can simply toggle the feature off until such time as they can debug what has went wrong and how they can fix it. 

These flags can be flipped at runtime and thus, if they do need to turn it off, it presents minimal effort on behalf of the developers and it presents minimal impact to the users. 