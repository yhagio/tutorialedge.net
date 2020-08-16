---
title: "Pretty Printing JSON Structs in Go"
date: 2020-06-10T08:36:02+01:00
desc: In this snippet, we are going to look at how you can pretty print JSON values in Go!
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

    import (
        "fmt"
        "encoding/json"
    )

    type Flight struct {
        Origin string `json:"origin"`
        Destination string `json:"destination"`
        Price int `json:"price"`
    }

    func main() {
        flight := Flight{
            Origin: "GLA",
            Destination: "JFK",
            Price: 2000,
        }

        b, err := json.MarshalIndent(flight, "", "  ")
        if err != nil {
            fmt.Println(err)
        }
        fmt.Print(string(b))
    }
---


👋 Welcome Gophers! In this snippet, we are going to look at how you can pretty-print JSON in Go using the `json` package!

In this example we have a simple interface called `Flight` which we want to pretty print the values for.

We can use the `json.MarshalIndent` function which takes in the `interface` we want to marshal as well as the `prefix` string and the `indent` string. In this example we don't use a prefix, but we do set the indent to 2 empty spaces.

### Further Reading:

If you found this snippet useful, you may also like some of the other snippets on the site:

* [Go Basic Types Tutorial](/golang/go-basic-types-tutorial/)
* [Comparing Structs in Go](/golang/snippets/comparing-structs-in-go/)
