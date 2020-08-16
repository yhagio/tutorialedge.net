---
title: "Getting the Size of an Array or Slice in Go"
date: 2019-07-15T19:30:49+01:00
desc: In this code snippet, we are going to look at how you can retrieve the size or length of an Array or slice in Go
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
layout: snippets
language: go
tags:
- snippets
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
    package main

    import (
        "fmt"
    )

    func main() {
        scientists := []string{
            "Einstein",
            "Turing",
            "Lovelace",
            "Curie",
            "Franklin",
            "Hodgkin",
        }

        fmt.Println(len(scientists))

    }
---

In this code snippet, we are going to look at how you can retrieve the length of a type in Go using the `len` function.

In this example, we define an a slice of type `string` which contains a number of famous scientists. Below this instantiation, we then call `len(scientists)` to retrieve the length of this slice which is then printed out for us.

### Further Reading:

If you enjoyed this code snippet, you may appreciate some of the other content on the site:

* [Adding Values to Slices in Go](/golang/snippets/adding-values-array-slice-go/)