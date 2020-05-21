---
author: Elliot Forbes
date: 2019-11-24T11:05:52Z
desc: In this Challenge, you will create your first Go application and commit it up to Github!
image: golang.png
weight: 1
series:
  - go-challenges
tags:
  - go
title: Challenge 01 - Getting Started with Go
twitter: https://twitter.com/Elliot_F
language: go
snippet: |
  package main
  
  import "fmt"
  
  // AddInts is a function that takes in 2 integer
  // values and returns the sum
  func AddInts(a, b int) int {
    // add the code to successfully add the 2
    // integers
    return 0
  }

  func main() {
    // sets result equal to the output
    // of AddInts
    result := AddInts(2, 3)
    // prints the result of our add
    fmt.Println(result)
  }
tests: 
  - name: main_test
    test: TestAddInts
    code: |
      package main

      import "testing"

      func TestAddInts(t *testing.T) {
        expected := 2
        result := AddInts(1, 1)
        if expected != result {
          t.Fail()
        }
      }
---

In this first challenge, we are going to look at modifying an incredibly simple Go application so that it passes the unit tests.

In the code to the left, we have 2 functions in Go. The `main` func which is the entry point for our Go application, and the `AddInts` function which takes in 2 `int` values and *should* return the sum.

# Challenge

In a quick introduction to the language, you will have to modify the code so that the `AddInts` function returns the correct value and the tests pass.

## Helpful Tutorials
  
The following tutorials should help you to complete this challenge:

* [Getting Started with Go](https://tutorialedge.net/golang/getting-started-with-go/)
