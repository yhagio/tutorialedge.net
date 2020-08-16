---
title: "Type Casting an Interface to a String in Go"
date: 2020-05-13T07:46:58+01:00
desc: In this code snippet, we are going to look at how you can effectively cast an interface in go to a string.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
language: go
layout: snippets
tags:
- snippets
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
  package main

  import "fmt"

  func main() {
    var code interface{}
    code = "hello"

    // we can use .(string) to effectively
    // type case the code interface{} to a string
    myString := code.(string)
    // we can then print this out!
    fmt.Println(myString)
  }
---

In this Code Snippet, we are going to see what it takes to convert an `interface{}` to a `string`.

### Further Reading:

If you enjoyed this code snippet, you may also appreciate some of the other content on my site:

* [Go Basic Types Tutorial](/golang/go-basic-types-tutorial/)