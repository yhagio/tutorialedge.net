---
author: Elliot Forbes
date: 2019-11-24T11:05:52Z
desc: In this Challenge, you are tasked with implementing a function that will correctly return the 'nth' triangular number in Go!
image: golang.png
weight: 20
series:
  - go-challenges
tags:
  - "Math"
title: Challenge 20 - Finding the nth Triangular Number 
twitter: https://twitter.com/Elliot_F
difficulty: Easy
language: go
layout: challenge
snippet: |
  package main

  import "fmt"

  func TriangularNumber(n int) int {
    // implement me!
    return 0
  }

  func main() {
    fmt.Println("Returning the 'nth' triangular number")

    number := TriangularNumber(3)
    fmt.Println(number) // '6'

  }
tests: 
  - name: main_test
    test: TestTriangularNumber
    code: |
      package main

      import "testing"

      type TestCases struct {
        n int
        expected int
      }

      func TestTriangularNumber(t *testing.T) {
        var triangularNumbers = []TestCases{
          {1, 1},
          {2, 3},
          {3, 6},
          {4, 10},
          {5, 15},
        }
        
        for _, test := range triangularNumbers {
          result := TriangularNumber(test.n)
          if result != test.expected {
            t.Fail()
          }
        }
      }
---

In this challenge, you are going to implement the `TriangularNumbers` function which takes in `n` and returns the `nth` triangular number.

```output
n = 1
result = 1

n = 3
result = 6
```

# See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 20 - Triangular Numbers](https://discuss.tutorialedge.net/t/challenge-20-triangular-numbers/55) 

# Further Reading:

If you like this challenge then you may also appreciate some of the following articles on the site:

* [Go Interfaces Tutorial](/golang/go-interfaces-tutorial/)