---
title: "Go Modules Tutorial"
date: 2019-04-19T09:34:10+01:00
draft: true
desc: In this tutorial, we are going to be looking at how you can successfully work with modules in Go!
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.png
tags:
- beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

**In this tutorial, we are going to be looking at how you can use Go modules** in your Go applications
to simplify the way you work with dependencies for your Go applications. We will be looking at
how Go Modules work, and also what problems they solve for us, before finally going into developing a simple
Go application which uses Go Modules.

# Goals

By the end of this tutorial:

* You will have a solid understanding of Go Modules
* You will be able to build a Go package which uses Go Modules

# Prerequisites

In order to follow this tutorial, you will have to have the following:

* You will need Go version 1.11+ installed on your development machine.
* You will need an account on GitHub 

# Why Go Modules?

There has been a lot of turbulence in the dependency management space in the Go language
over the last few years. We've seen tools such as `dep`, `godep`, `govendor` and a whole
heap more come into the scene to try and solve this problem once and for all. 

Go Modules is deemed to be the *official* solution

## The Problem

Imagine you are developing a Go service that has a number of key dependencies
such as `package A`. Now, at the time of writing your service `package A` has 
a set interface and works in a set way. 

However, what happens when the maintainers of `package A` update their program to fix
a bug or extend functionality? You might get lucky and their changes might not impact
your application, however, you might be unlucky and these changes subsequently break 
your application.

This is where versioning comes in to save the day. By using versioning, we can 
select the precise versions of a package or library that we wish to use and
ensure that whenever we build our package, it always uses the specified version.

# A Simple Example

In this part of the tutorial, we are going to build an simple Go package which 
will utilize Go Modules. 

# Vendoring Your Dependencies

# 

# Conclusion

> **Note -** If you want to keep track of when new Go articles are posted to the
> site, then please feel free to follow me on twitter for all the latest news:
> [@Elliot_F](https://twitter.com/elliot_f).
