---
title: "Checking if a string contains a sub-string in Go"
date: 2020-05-13T07:46:58+01:00
desc: In this code snippet, we are going to look at how you can query the underlying system information such as CPU, RAM and   hard drive utilization 
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
layout: snippets
language: go
tags:
- snippets
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
snippet: |
  package main

  import (
    "fmt"
    "strings"
  )

  func main() {
    originalString := "This is our original string"

    doesContain := strings.Contains(originalString, "our")
    fmt.Println(doesContain)

    doesNotContain := strings.Contains(originalString, "meh")
    fmt.Println(doesNotContain)
  }
---

In this snippet, we are going to see how we can test if a string contains another string in Go.

To do this we'll be using the standard library `strings` package as it contains an incredibly handy function `Contains` which we can pass 2 arguments into. The first argument is our full string, the second is the string we want to check for.

In this example, we have our `originalString` which we test to see if it contains the string `our`. 

We then use the same function to check a negative case and see if `meh` exists in the second string.

## Further Reading:

If you liked this snippet, you make also like some of the other content on this site:

* [Go Basic Types Tutorial](/golang/go-basic-types-tutorial/)