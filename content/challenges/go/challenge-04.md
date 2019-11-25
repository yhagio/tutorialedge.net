---
author: Elliot Forbes
date: 2019-11-24T11:05:52Z
desc: In this Challenge, you are going to be building a Go application that 
image: golang.png
series:
  - go-challenges
tags:
  - go
title: Challenge 04 - Goroutines and WaitGroups!
twitter: https://twitter.com/Elliot_F
---

In Go, `goroutines` and `WaitGroups` are without a doubt some of the best features of the language. They enable us to more easily write highly concurrent applications that are vastly more efficient and quicker than their synchronous counterparts.

# Challenge

In this challenge, we will be creating a REST API that does the job of hitting a number of API endpoints and returning an aggregated response back to the requester. In order to successfully complete this, you will have to leverage `goroutines` within your endpoint function and ensure that **every** request is completed before returning a response to the requester.

## Acceptance Criteria

In order to successfully complete this challenge, your project will have to:

>  Create a simple REST API in Go that calls out to the PokeAPI and orders the height of these 5 pokemon:

* ditto
* charizard
* weedle
* mew
* bulbasaur

The PokeAPI documentation can be found here: [PokeAPI](https://pokeapi.co)

# Key Concepts

By completing this challenge:

* You will gain an insight into the basics of `goroutines` and how you can handle premature termination of your functions using `WaitGroups`
* You will learn how to request and parse JSON from an external HTTP API

# Completing the Challenge

In order to complete the challenge, fork the elliotforbes/go-challenges repository into your own GitHub account.

Next, create a directory within that repo for each of the challenges you attempt! This will give you a super handy repo that will contain excellent references for your own future Go projects!

## Helpful Tutorials

* [Go Goroutines Tutorial](/golang/concurrency-with-golang-goroutines/)
* [Go WaitGroup Tutorial](/golang/go-waitgroup-tutorial/)
* [Consuming a RESTful API in Go](/golang/consuming-restful-api-with-go/)

# Conclusion

Congratulations! You have successfully completed the 4th TutorialEdge Go Challenge! 