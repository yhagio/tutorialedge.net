---
title: "Challenge 05 - External Dependencies and Production Logging"
date: 2019-12-02T20:31:47Z
desc: In this tutorial, we are going to venture out from the relative safety of the Go standard library and trying our hand are pulling in external packages from github
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
draft: true
series: 
 - go-challenges
weight: 5
image: golang.svg
language: go
tags:
- go
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this challenge, we are going to be venturing out of the relative safety of the Go standard library and into the big, bad world of external dependencies. 

The aim of this challenge is to solidify your knowledge of Go modules and introduce you to a few of the more popular packages out there in the wild. 

# Challenge

In this challenge, we are going to be concerned about logging. We are going to be writing a really simple `gorilla/mux` backed API that will feature a number of endpoints. Whenever these endpoints are hit, it will interact with a `sirupsen/logrus` logger that will log the incoming request in JSON in a local file and to stdout.

If you are wanting to develop cloud-native applications, then getting logging right from the start is critical. Cloud native applications typically send all of their log messages to `stdout` so that they can be consumed by a logging and monitoring agent and then aggregated together in a really nice and simple dashboard. This practice of piping to the `stdout` and forwarding it to something off-platform means that we as developers do not have to ssh into multiple linux boxes to try and debug potential issues.

## Acceptance Criteria

In order to successfully complete this challenge, your project will have to:

* Expose a CRUD API that will have an in-memory list of shopping cart items.
* Whenever an endpoint is hit within your API, it will have to use `logrus` to log that event to a file in JSON format. 

# Key Concepts

By completing this challenge:

* You will learn how to import and use external packages from GitHub
* You will gain an insight into how production Go applications handle logging.

# Completing the Challenge

In order to complete the challenge, fork the [elliotforbes/go-challenges](https://github.com/elliotforbes/go-challenges) repository into your own GitHub account.

Next, create a directory within that repo for each of the challenges you attempt! This will give you a super handy repo that will contain excellent references for your own future Go projects!

## Helpful Tutorials:

* [Go Modules Tutorial](/golang/go-modules-tutorial/)

# Conclusion

Congratulations! You have successfully completed the 4th TutorialEdge Go challenge!