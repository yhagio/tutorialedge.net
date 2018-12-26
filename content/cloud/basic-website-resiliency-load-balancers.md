---
author: Elliot Forbes
date: 2017-11-29T19:48:57Z
desc: In this article we explore load balancers and how they can positively improve
  your websites and services reliability
series: cloud
image: cloud.png
tags:
- resiliency
title: Basic Website Resiliency Patterns - Load Balancers
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this article we are going to be looking at the concept of load balancers. We'll be discussing what they are and how you can effectively use them to improve the reliability and resiliency of your websites and REST services and decrease downtime.

# Load Balancers - What Are They?

So the first thing you may be asking is, "what is a load balancer?". We'll to answer your question, load balancers enable us to effectively balance all incoming traffic/requests to a given website or service across multiple instances of your website or service.

An instance would be one deployed version of your website or service. So effectively if you spun up a simple Python REST API on your personal laptop that would be considered one `instance`. If you were then to run the same REST API on a second laptop that could be considered a second `instance`.

Typically you would have one server hosting one `instance` of your application. This then begs the question, how can you route a `request` to either of your instances? This is where your load balancer would come into play.

![load balancer graphic](/images/load-balancer.gif)

Typically you would set up a `load balancer` that would receive all of your website or services `requests`. The `load balancer` would then forward on these requests to any of your deployed `instances`.

# Why Do We Need Them?

Imagine you were running a website, much like this one, on a single server in one region. If that region was to be hit by a natural disaster or your server was to go offline for any reason, your website would be taken out and you would be left frantically trying to re-deploy your website on a new server to prevent any more loss of traffic. 

Using a `Load balancer` we can mitigate this scenario by having our website deployed across multiple servers in multiple regions. This means that when one of our servers goes down for some reason, our site will still be running on another server. 

# Implementing a Load Balancer

When it comes to fronting your application or service with a `load balancer` I would tend to recommend looking at services such as AWS' [Elastic Load Balancer](https://aws.amazon.com/elasticloadbalancing/) or potentially Cloudflare's offering: [Load Balancing](https://www.cloudflare.com/load-balancing/). Really this just depends on what platform you are hosting your website and or services on so I can't recommend one be all and end all solution. 

# Different Flavours of Load Balancer

When it comes to `load balancers` we have a number a of different options to choose from, the three most popular ones are:

* Round-Robin : The simplest load balancer option. This spreads all requests evenly over all instances of your website or service. 
* Geographic Based : This option chooses the closest geographical instance of your website to serve the request from. This means that any Americans could be served by an American based instance of your application. Any European requests would be served by any European based servers. 
* Network based : This option is designed to serve in situations where network latency is highly critical. Typically this serves your incredibly high performance applications.

# Conclusion

I hope this tutorial helps to highlight one of the most basic strategies you can leverage if you want to improve your website or services resiliency. In the next tutorial in this series we will be covering the different deployment strategies that using a `Load Balancer` enables us to do.

If you found this tutorial useful then please let me know in the comments section below!      

