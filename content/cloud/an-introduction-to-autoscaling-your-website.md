---
author: Elliot Forbes
date: 2017-11-30T21:21:51Z
desc: In this article we explore load balancers and how they can positively improve
  your websites and services reliability
series: cloud
image: cloud.png
tags:
- resiliency
title: An Introduction To Autoscaling Your Website or Service
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this article we are going to look at `autoscalers`. We are going to look at how they work and how they can enable your service to dynamically grow and shrink to cope with variable demands.

# The Scenario

Imagine the scenario where you write a RESTful API that at first just requires a single server instance on AWS in order to sustain the initial demand placed on it. After a couple of weeks somebody who appreciates the your service posts it on a popular site such as `/r/programming` and you see demand double. 

In some scenarios you may be ok, your server starts to struggle ever so slightly and drop the occasional request under load but nothing too major. 

It then hits the top page of `news.ycombinator.com` and suddenly you see an explosion in terms of requests. Your single server copes for all of 5 minutes before falling over and suddenly your service dies.

# The Solution

With autoscalers we can help to mitigate against this type of issue. We can specify that when one instance of our service starts to receive a massive number of requests then we can spin up another instance of said service. Coupling this with a `load balancer` we could dynamically scale up the number of `instances` of our application in order to cope with an increased demand. 

# 50 Shades of Autoscaler

When it comes to autoscalers, we can have them dynamically spin up or down the number of instances of our services based on a number of requirements. You could specify that whenever one server hits `1,500` requests per second that another should also be spun up, or when one server reaches `80%` cpu utilization. 

You could also specify that you wish to scale up your services preemptively at 8:30am in order to ensure your services are primed and ready for peak usage. Conversely you could have your services scale down at 5:00pm if you want to save the spending on extra servers.

This level of control is brilliant. No service will be the same and being able to control exactly when and why services scale up is a huge benefit. 

# Conclusion

Hopefully this article gave you some idea as to what autoscalers are and how you can use them in order to dynamically scale your application to cope with increased demands. 

If you found this tutorial useful then please let me know in the comments section below! 