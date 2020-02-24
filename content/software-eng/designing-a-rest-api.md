---
title: "Designing a Rest Api"
date: 2020-02-24T22:11:32Z
draft: true
desc: 
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: 
image: 
tags:
- beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this article, we are going to transcend the programming language paradigm and look at the more high-level topic that is REST API design fundamentals. 

We are going to take a look at some of the **do's** and **don'ts** when it comes to designing production-ready services and how we can design our systems so that they can be easily extended, upgraded and maintained without any underlying impact to the people consuming your service.

# Versioning Your API

The first, and quite frankly most important point that you should consider when designing a REST API is that the contract for all your endpoints is **immutable**. This is a really fancy way of saying that no matter when, how, or why you call this API, it should always follow the same contract.

What I mean by this is, if I design an API that let's me update the articles on this site, then I **must** at all times ensure that the API doesn't change the `JSON format` that it expects to update these articles. 

## Example

Let's look at an example of this in action. Say I had an endpoint which, when you hit that endpoint, it would return a `JSON` structure with a response. 

```output
# HTTP GET
https://api.tutorialedge.net/api/hello

{ "response": "hello" }
```

Bear with me here, but imagine that we had customers who started using this endpoint within their own services for whatever reason. 

Now, imagine how upset you would be if your clients were to suddenly see that their systems were breaking as you had updated the endpoint to return the following:

```output
# HTTP GET
https://api.tutorialedge.net/api/hello

{ "content": "hello" }
```

This may appear to have been a subtle change, but whoever was consuming this endpoint had built up their own application around the previous `JSON` structure and expects this to never change. 

## The Solution

This example highlights the importance of versioning your API endpoints. In practice this means ensuring that you expose the first version of your API using a structure like so:

```output
# HTTP GET
https://api.tutorialedge.net/api/v1/hello

{ "response": "hello" }
```

Notice the small change to the path parameters from `/api/hello` to `/api/v1/hello`. 

Now, if we wanted to modify the response of our `JSON` for any reason to use the new `content` key instead, we could simply add a new endpoint which uses `v2` like so:

```output
# HTTP GET
https://api.tutorialedge.net/api/v2/hello

{ "content": "hello" }
```

This approach ensures that we never unintentionally **break the downstream apps** that are using our original version of the service, but it also gives us the flexibility to extend our service and offer newer, or more improved endpoints!

Now, if you are rolling out new versions all the time, then you may want to use a more granular version number in the path parameters. i.e. `/api/v1-1/hello` so that you can roll out minor changes quicker without necessarily upgrading the major version entirely.

## Deprecating Older Versions

At some point, you may want to start deprecating and removing older versions of your API. There are many reasons as to why you might want to do this. From, removing additional endpoints that you have to constantly support, to possibly removing the feature entirely.

When it comes to managing this, you need to be careful and ensure that you **give your customers a massive lead time** in which they can migrate their applications to use newer versions of the system. This could range from a couple weeks to a couple months depending on the complexity of the change and how many clients you are dealing with and unfortunately this is never an easy process.

> **Side Note** - Having good monitoring and logging systems in place within your APIs can drastically help improve this process. If you can accurately map which of your clients is using which version of the endpoint, you can focus your efforts on migrating these clients off and ensure nobody is still using the version before removing it entirely.

# Use Appropriate HTTP Verbs


# 

# Prerequisites

# Conclusion

## Further Reading:

* []()