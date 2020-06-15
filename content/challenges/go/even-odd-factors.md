---
title: "Challenge 16 - Odd or Even Factors"
date: 2020-06-07T19:04:19+01:00
desc: In this challenge, we are going to be implementing a function that will return either "odd" or "even" depending on the number of factors of a number.
author: Elliot Forbes
image: golang.png
weight: 16
difficulty: Easy
series:
  - go-challenges
tags:
  - go
twitter: https://twitter.com/Elliot_F
language: go
layout: challenge
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
  package main

  import "fmt"

  func OddEvenFactors(num int) string {
    // implement me
    return ""
  }

  func main() {
    fmt.Println("Odd or Even Factors")

    numFactors := OddEvenFactors(23)
    fmt.Println(numFactors) // "even"

    numFactors = OddEvenFactors(36)
    fmt.Println(numFactors) // "odd"
  }
tests:
  - name: main_test
    test: TestOddEvenFactors
    code: |
      package main

      import "testing"

      func TestOddEvenFactors(t *testing.T) {
        number := 23
        expected := "even"

        if expected != OddEvenFactors(number) {
          t.Fail()
        }

        number = 36
        expected = "odd"
        if expected != OddEvenFactors(number) {
          t.Fail()
        }
      }
---

👋 Welcome Gophers! In this challenge, you will be tasked with implementing a function that will return either "odd" or "even" depending on whether or not a number has an odd or an even number of factors.

# See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 16 - Odd or Even Factors](https://discuss.tutorialedge.net/t/challenge-16-odd-or-even-factors/38) 

## Further Reading:

If you enjoyed this challenge, you may also enjoy some of the other challenges on this site:

* [Sorting By Price](/challenges/go/sort-by-price/)