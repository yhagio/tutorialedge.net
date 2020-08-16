---
title: "Deleting Elements From A Map In Go"
date: 2020-06-19T21:14:02+01:00
desc: In this snippet, we are going to look at 
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

  import "fmt"

  func main() {
    fmt.Println("Deleting Elements from a Map in Go")
    mymap := map[string]int{
      "Elliot": 25, 
      "Fraser": 20,
      "Scott": 24,
    }
    
    fmt.Printf("%+v/n", mymap)

    delete(mymap, "Scott")

    fmt.Printf("%+v\n", mymap)

  }
---

👋 Welcome Gophers! In this snippet, we are going to take a look at how you can delete elements from a `map` in Go.

In order to do this, we are going to use the builtin function `delete` in order to remove an `key` from our `mymap` map.

### Further Reading:

If you found this snippet useful, you may also enjoy some of the other articles on the site:

* [Go Maps Tutorial](/golang/go-maps-tutorial/)