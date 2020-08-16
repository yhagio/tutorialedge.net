---
author: Elliot Forbes
date: 2018-06-09T22:48:26+01:00
desc: In this course tutorial, we are going to be getting started with the Go programming language!
image: golang.svg
paid: false
draft: true
series: gocourse
tags:
  - gocourse
layout: interactive
title: Part 2 - Functions in Go
twitter: https://twitter.com/Elliot_F
nextPage: /courses/go/01-functions-in-go/
weight: 1
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
    package main

    import "fmt"

    func main() {
        fmt.Println("Hello World")
    }
tests:
  - name: main_test
    test: TestRuns
    code: |
      package main

      import (
          "fmt"
          "testing"
      )

      func TestRuns(t *testing.T) {
          fmt.Println("Great Success") 
      }
---

👋 Welcome to the first tutorial in my Beginner's Guide to Go course!

These interactive challenges have been designed in a way to help you learn the basics of the Go programming language. We'll be gradually building up more and more advanced topics  

