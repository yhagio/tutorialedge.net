---
title: "Converting Byte Slices to Strings in Go"
date: 2020-06-10T08:30:28+01:00
desc: In this article, we look at how you can convert a byte array or slice in Go to a string value.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
language: go
layout: snippets
tags_weight: 1
tags:
- snippets
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
    package main

    import (
        "fmt"
    )

    func main() {
        byteSlice := []byte("Convert Me")
        fmt.Println(byteSlice)
        
        converted := string(byteSlice)
        fmt.Println(converted)

        direct := string([]byte("Another Example"))
        fmt.Println(direct)
    }
---

👋 Welcome Gophers! In this snippet, we are going to be looking at how you can convert a `byte` slice to a `string` in Go!

In order to achieve the conversion we can use the built-in `string` function which takes in a byte slice and returns a string value!

### Further Reading:

If you found this snippet useful, you may also like some of the other snippets on the site:

* [Go Basic Types Tutorial](/golang/go-basic-types-tutorial/)
* [Comparing Structs in Go](/golang/snippets/comparing-structs-in-go/)
