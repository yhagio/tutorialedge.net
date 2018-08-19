---
title: "An Introduction to Go"
date: 2018-07-08T09:25:32+01:00
draft: true
desc: "In this tutorial, we are going to take a gentle look at what go is, and how to get started programming your own go programs"
author: "Elliot Forbes"
tags: ["golang"]
weight: 1
series: ["golang"]
image: "golang.png"
twitter: "https://twitter.com/Elliot_F"
---

In this course, we are going to be taking a look at how you can get started with the Go programming language. 

## Course Goals

By the end of this course, you should have a stable base of knowledge that you'll be able to take forward to build your own Go based programs.

##### Requirements:

* You must have some programming knowledge already in another language such as Java, Python or JavaScript. 
* You will require a code editor - I highly recommend Visual Studio Code as it is the editor I'll be using for the majority of this course.


## The Go Language

Go was originally developed by Robert Griesemer, Rob Pike, and Ken Thompson whilst they were working at Google and was released to the world in November of 2009, a good 9 years ago now. By language standards, this makes Go a young adolescent just about to go off to University and face the big bad world. 

The language was designed to be as simple as possible, and the language designers have been able to ward off pressure for new features in an attempt to keep the language as simple as possible. Keeping your systems as simple as possible can be a huge contributing factor to a projects overall success.

## Why Go?

For me, Go seems like an obvious choice when it comes to developing things such as microservices and RESTful APIs. It's a compiled language that is incredibly efficient at doing all manner of concurrent operations due to concurrency being baked into the language from the very start. 

##### It's Opinionated

Go, when compared to other languages, is also very opinionated in how things should be done, and whilst this may not sound good to some, in reality, it means that most Go programs follow a similar structure and coding conventions are mostly consistent across projects. 

This is great news for developers looking to pick up the language as it means that once you have gotten used to the syntax and structure, you'll be able to contribute to most, if not all, go-based projects relatively easily. 

##### It's Compiled and Efficient

The fact that you can compile your Go program down to a single binary executable that encompasses all of it's dependencies within that executable makes it an absolute breeze when it comes to deploying into production.

Languages such as Python and Java require their respective runtimes to be available on the servers that will host your production applications, and as such, System Admins need to manage version updates, compatibility issues and more. 

Go makes the lives of System Admins and DevOps professionals far easier.

## Course Outline

In this course, we are going to be covering a wide number of topics in order to give you a handle of the overall language. We'll start off by slowly building up a command-line interface tool that will allow you to do various things such as image resizing and as we are going along I'll be introducing new concepts to expand upon what we've already built.

* Lesson 1 - Installing Go and Building your Go Application
* Lesson 2 - [Basic Data Types Go](/golang/go-basic-types-tutorial/)
* Lesson 3 - [Complex Data Types in Go](/golang/go-complex-types-tutorial/)
* Lesson 4 - Variables in Go
* Lesson 5 - Methods in Go
* Lesson 6 - [Functions in Go](/golang/go-functions-tutorial/)
* Lesson 7 - Interfaces in Go
* Lesson 8 - Packages in Go

## Supporting Me

All of this material is provided free of charge as I believe there should not be any barrier to entry when it comes to education. If you wish to support me, then you can do so by subscribing to my channel on YouTube - [TutorialEdge](https://youtube.com/tutorialedge).

## Installation

In order to start writing your own Go based systems you'll need to install it on your local machine: [Download Go](https://golang.org/dl/) 

## Top Resources

> If you are in need of some excellent books to cover the language in a greater depth then I highly recommend you check out my list of the [top books for learning golang](/golang/top-books-for-learning-golang/).
