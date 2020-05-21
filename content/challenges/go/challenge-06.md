---
author: Elliot Forbes
date: 2019-11-24T11:05:52Z
desc: In this Challenge, you are going to be implementing your own Linked Lists and learning the fundamentals of pointers in the Go programming language!
image: golang.png
weight: 6
language: go
series:
  - go-challenges
tags:
  - go
title: Challenge 06 - Pointers and Linked Lists
twitter: https://twitter.com/Elliot_F
---

Pointers vs References in Go is a topic I see a lot of beginners struggling with when they come from a language such as Python or Java which typically don't leverage pointers within the constructs of their language.

If you are coming from a C/C++ or lower level language, then you may well already be familiar with the differences between pointers and references in Go. If that is the case then this tutorial will help to introduce to you the Go way of doing things when it comes to handling pointers.

This aim of this challenge is to expose you to pointers and to help you brush up on your data structures and algorithms knowledge! 

# Challenge

Spotify is an incredible music streaming service that I rely on entirely to play all my music, Arctic Monkeys and Kasabian to name a few of my favorite bands. The aim of this challenge will be implement a music playlist application that allows you to navigate through a playlist of music. 

You will need to create a linked list `Playlist` data structure as well as a `struct` that will represent a `Song` in your `Playlist`. Each `Song` should have a pointer to the next `Song` in the `Playlist`.

> **Important Note** - This **_must_** be done without using the standard library linked list implementation!

## Acceptance Criteria

* You must implement this `Playlist` without using the standard library linked list implementation!!
* You must implement a function or method that allows you to remove a `Song` from your `Playlist`
* You must implement a function or method that allows you to insert a `Song` into your `Playlist` at any given point
* You must implement a function or method that allows you to add a `Song` to the end of your `Playlist`
* You must implement a function or method that displays the entire playlist in order.

# Key Concepts

By completing this challenge:

* You will gain a basic understanding as to how pointers work by implementing several functions/methods that will require you to update pointers within your `Song` elements
* You will be able to brush up on your Linked List knowledge!

# Completing the Challenge

In order to complete the challenge, fork the [elliotforbes/go-challenges](https://github.com/elliotforbes/go-challenges) repository into your own GitHub account.

Next, create a directory within that repo for each of the challenges you attempt! This will give you a super handy repo that will contain excellent references for your own future Go projects!

## Helpful Tutorials

* [Go Pointers Tutorial](/golang/go-pointers-tutorial/)

# Conclusion

Congratulations! You have successfully completed the 7th TutorialEdge Go Challenge!