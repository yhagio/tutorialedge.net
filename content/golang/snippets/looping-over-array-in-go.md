---
title: "Looping Over Array in Go"
date: 2020-05-13T08:27:56+01:00
desc: In this snippet, we are going to look at how you can quickly loop over an array in Go
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

  import "fmt"

  func main() {
    fmt.Println("Looping Over Arrays in Go")

    scientists := []string{
      "Einstein",
      "Turing",
      "Lovelace",
      "Curie",
      "Franklin",
      "Hodgkin",
    }

    for _, name := range scientists {
      fmt.Println(name)
    }

  }
---

In this code snippet, we are going to take a look at how you can quickly iterate over an array of type strings in Go.

We'll use the `range` keyword to allow us to iterate over the `scientists` array that we have created. This will return 2 values, the first will be the `index`, the second is the value. 

In this instance we ignore the `index` returned by utilizing an `_` in its place. We then print out the value within the body of our `for` loop.

## Further Reading:

If you found this useful, then you may also enjoy these other articles on the site:

* [Go Maps Tutorial](/golang/go-maps-tutorial/)