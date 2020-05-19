---
title: "Adding Values to an Array in Go"
date: 2019-07-15T19:30:49+01:00
desc: In this code snippet, we are going to look at how you can add values to an array in Go
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

        scientists = append(scientists, "Hawkins")

        fmt.Println(scientists)

    }
---

In this quick snippet, we are going to look at how you can add values to an array in Go using the `append` function.

In this example, we define an array of type `string` which contains a list of scientists. Below where we create this array we use the `append` function to then add `Hawkins` to the list of scientists.

# The append Function

The `append` function is a built-in function which appends elements to the end of a slice. It takes care of allocating the underlying arrays should they need to be resized to accommodate any new elements and then returns the new slice.

## Further Reading:

If you enjoyed this snippet, you may also enjoy some of the other work on the site:

* [Go Basic Types Tutorial](/golang/go-basic-types-tutorial/)