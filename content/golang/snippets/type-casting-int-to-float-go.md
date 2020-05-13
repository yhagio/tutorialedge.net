---
title: "Type Casting an Int to a Float in Go"
date: 2020-05-13T07:46:58+01:00
desc: In this code snippet, we are going to look at how you can effectively cast an int in go to a float
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
layout: snippets
tags:
- beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
snippet: |
  package main

  import "fmt"

  func main() {
    fmt.Println("Casting Int to Float")

    originalIntValue := 5
    floatValue := float64(originalIntValue)

    fmt.Println(floatValue)
  }
---

In this code snippet, we are going to take a look at how you can convert an `int` value in Go to a `float64` value.

## Further Reading:

For more in-depth information as to how this works, please check out the following blog posts:

* [Go Basic Types Tutorial](/golang/go-basic-types-tutorial/)