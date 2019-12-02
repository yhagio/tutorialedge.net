---
author: Elliot Forbes
date: 2019-11-24T11:05:52Z
desc: In this Challenge, you will be building a very simple Go HTTP server which will show off the stats you collect in the first Go Challenge.
image: golang.png
weight: 2
series:
  - go-challenges
tags:
  - go
title: Challenge 02 - Creating a Simple HTTP Server in Go
twitter: https://twitter.com/Elliot_F
---

In this challenge, you are going to be extending the application you built in the previous challenge and exposing the hardware utilization stats you collected through a HTTP endpoint. 

# Challenge

> You will extend the application developed in the first challenge so that these statistics can be queried via a http request. 

This application will run indefinitely on a machine and expose information on given port and an endpoint such that when you hit http://localhost:9000/stats it will fetch and display the stats for that machine in JSON format.

## Acceptance Criteria

In order to successfully complete this challenge, your project will have to:

* Expose the hardware utilization stats collected from your machine on `http://localhost:9000/stats` in JSON format

# Key Concepts

Through completing this challenge:

* You will gain an understanding of how to write a simple HTTP server in Go
* You will learn about how to marshal and unmarshal information into `struct`s using the `encoding/json` standard library package in Go.

# Completing the Challenge

In order to complete the challenge, fork the [elliotforbes/go-challenges](https://github.com/elliotforbes/go-challenges) repository into your own GitHub account. 

Next, create a directory within that repo for each of the challenges you attempt! This will give you a super handy repo that will contain excellent references for your own future Go projects!

## Helpful Tutorials
  
The following tutorials should help you to complete this challenge:

* [Creating a Web Server in Go](/golang/creating-simple-web-server-with-golang/)
* [Creating a RESTful API in Go](https://tutorialedge.net/golang/creating-restful-api-with-golang/)
* [Go JSON Tutorial](/golang/go-json-tutorial/)

# Conclusion

Congratulations! You have successfully completed the second TutorialEdge Go challenge!