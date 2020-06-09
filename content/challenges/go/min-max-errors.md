---
author: Elliot Forbes
date: 2019-11-24T11:05:52Z
desc: In this Challenge, you are going to find the cheapest and most expensive flights from a list in Go 
image: golang.png
weight: 7
series:
  - go-challenges
tags:
  - go
title: Challenge 07 - Minimums, Maximums and Errors
twitter: https://twitter.com/Elliot_F
language: go
difficulty: Medium
layout: challenge
snippet: |
  package main

  import (
    "fmt"
  )

  type Flight struct {
    Origin      string
    Destination string
    Price       int
  }

  func GetMinMax(flights []Flight) (int, int, error) {
    // Implement me :)
  }

  func main() {
    fmt.Println("Getting the Minimum and Maximum Flight Prices")
  }
tests: 
  - name: main_test
    test: TestGetMinMax
    code: |
      package main

      import (
        "fmt"
        "testing"
      )

      func TestGetMinMax(t *testing.T) {
        flights := []Flight{
          Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
          Flight{Origin: "NYC", Destination: "JFK", Price: 50},
          Flight{Origin: "CDG", Destination: "SNG", Price: 3000},
          Flight{Origin: "BSB", Destination: "NYC", Price: 5000},
        }

        min, max, err := GetMinMax(flights)
        if err != nil {
          t.Fail()
        }

        if min != 50 {
          t.Fail()
        }

        if max != 5000 {
          t.Fail()
        }
      }

      func TestErrorHandling(t *testing.T) {
        var flights []Flight

        min, max, err := GetMinMax(flights)
        if err != nil {
          fmt.Println(err)
        }

        if min != 0 {
          t.Fail()
        }

        if max != 0 {
          t.Fail()
        }

      }
  - name: main_test
    test: TestErrorHandling
    code: |
      package main

      import (
        "fmt"
        "testing"
      )

      func TestGetMinMax(t *testing.T) {
        flights := []Flight{
          Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
          Flight{Origin: "NYC", Destination: "JFK", Price: 50},
          Flight{Origin: "CDG", Destination: "SNG", Price: 3000},
          Flight{Origin: "BSB", Destination: "NYC", Price: 5000},
        }

        min, max, err := GetMinMax(flights)
        if err != nil {
          t.Fail()
        }

        if min != 50 {
          t.Fail()
        }

        if max != 5000 {
          t.Fail()
        }
      }

      func TestErrorHandling(t *testing.T) {
        var flights []Flight

        min, max, err := GetMinMax(flights)
        if err != nil {
          fmt.Println(err)
        }

        if min != 0 {
          t.Fail()
        }

        if max != 0 {
          t.Fail()
        }

      }


---

👋 Welcome Gophers! In this challenge, we'll be testing your ability to handle edge cases and work with the `errors` package. 

In this challenge, you have the task of implementing the `GetMinMax` function which will take in a `slice` of type Flight. 

The function will return 3 values:

* `min` - The cheapest price from the list passed in.
* `max` - The most expensive price from the list passed in.
* `error` - Any error values should there be issues with the list passed in.

<details><summary>Hint</summary>

You can create new errors using the `error` package and calling `errors.New()`.

</details>

# See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 07 - Minimums, Maximums and Errors](https://discuss.tutorialedge.net/t/challenge-05-implementing-a-stack/22) 


# Further Reading:

If you like this challenge then you may also appreciate some of the following articles on the site:

* [Go Interfaces Tutorial](/golang/go-interfaces-tutorial/)