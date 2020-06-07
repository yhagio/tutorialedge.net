---
title: Comparing 2 Structs in Go
date: 2019-07-17T07:58:40.000+00:00
desc: In this code snippet, we are going to look at how you can compare 2 structs in Go!
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.png
language: go
tags:
- snippets
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
layout: snippets
snippet: |
  package main

  import (
      "fmt"
      "reflect"
  )

  type Developer struct {
    Name string
    Age int
  }

  func main() {
    fmt.Println("Comparing 2 Structs in Go")

    elliot := Developer{
      Name: "Elliot",
      Age: 26,
    }

    elliot2 := Developer{
      Name: "Elliot",
      Age: 26,
    }

    fmt.Println(reflect.DeepEqual(elliot, elliot2))

  }

---

In this code snippet, we are going to look at how you can compare two `structs` in Go to see if they are equal. 

We'll be creating a simple `Developer` struct which will feature a `Name` and `Age` field. 

In the body of our `main` function, we'll define two instances of this `struct` called `elliot` and `elliot2` - not the most imaginative I know...

Below this, we'll then use the `reflect` package from the Go standard library in order to perform a `DeepEqual` comparison.

<Quiz question="What happens if we try and compare 2 different struct types with the same fields and values using the DeepEqual function?" answer="DeepEqual does a test to see whether or not the two instances are they same type" correct="B" A="It returns true" B="It returns false" />

## Further Reading

If you found this code snippet useful, you may also be interested in some of the other content on the site:

* [Building a REST API in Go with Fiber](/golang/basic-rest-api-go-fiber/)