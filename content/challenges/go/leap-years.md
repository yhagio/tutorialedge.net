---
title: "Challenge 14 - Leap Years"
date: 2020-06-04T21:22:55+01:00
desc: In this challenge, you are tasked with implementing a function that returns whether or not a year is a leap year.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
weight: 14
series: 
  - go-challenges
image: golang.svg 
difficulty: Medium
tags:
  - "Math"
language: go
layout: challenge
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
  package main

  import "fmt"

  func CheckLeapYear(year int) bool {
    // implement
  }

  func main() {
    fmt.Println("Check Leap Year")

    year := 2020
    fmt.Println(CheckLeapYear(year))
  }
tests:
  - name: main_test
    test: TestCheckLeapYear
    code: |
      package main

      import "testing"

      func TestCheckLeapYear(t *testing.T) {
          year := 2000 
          expected := true

          result := CheckLeapYear(year)

          if result != expected {
            t.Fail()
          }
      }
  - name: main_test
    test: TestCheckLeapYearNegative
    code: |
      package main

      import "testing"

      func TestCheckLeapYearNegative(t *testing.T) {
          year := 2100 
          expected := false
          result := CheckLeapYear(year)

          if result != expected {
            t.Fail()
          }
      }

---

👋 Welcome Gophers, in this challenge, you are tasked with implementing a function that returns whether or not a year is in fact a leap year.

# See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 14 - Leap Years](https://discuss.tutorialedge.net/t/challenge-14-leap-years/35) 

## Further Reading:

If you enjoyed this challenge, you may also enjoy some of the other challenges on this site:

* [Sorting By Price](/challenges/go/sort-by-price/)
* [Challenge 05 - Implementing a Stack](/challenges/go/implementing-a-stack/)
* [Challenge 06 - Implementing a Queue](/challenges/go/implementing-a-queue/)