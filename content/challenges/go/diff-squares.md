---
author: Elliot Forbes
date: 2019-11-24T11:05:52Z
desc: In this Challenge, you are tasked with finding the difference between squares in Go!
image: golang.png
weight: 19
series:
  - go-challenges
tags:
  - "Math"
title: Challenge 19 - Calculating The Difference Between Squares 
twitter: https://twitter.com/Elliot_F
difficulty: Easy
language: go
layout: challenge
snippet: |
  package main

  import "fmt"

  func DiffSquares(n, m int) int {
    return 0
  }

  func main() {
    fmt.Println("Calculate The Difference of Squares")
  }
tests: 
  - name: main_test
    test: TestInterface
    code: |
      package main

      import "testing"

      func TestInterface(t *testing.T) {
        expected := 9
        result := DiffSquares(5, 4)
        if result != expected {
          t.Fail()
        }
      }
---

In this challenge, you are going to implement the `DiffSquares` function so that it returns the difference between the first number squared minus the second number squared.

```output
5^2 - 4^2 = 9
```

If you require a hint as to how this is done, please click below:

<details><summary>Hint</summary>

You can calculate powers of numbers in Go using the `math.Pow` function. You can read more about this here: [Math Pow](https://golang.org/pkg/math/#Pow)

</details>

# See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 19 - Diff of Squares](https://discuss.tutorialedge.net/t/challenge-19-diff-of-squares/53) 

# Further Reading:

If you like this challenge then you may also appreciate some of the following articles on the site:

* [Go Interfaces Tutorial](/golang/go-interfaces-tutorial/)