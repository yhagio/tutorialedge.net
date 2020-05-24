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
title: Challenge - Sorting Flights by Price
twitter: https://twitter.com/Elliot_F
language: go
layout: challenge
draft: true
snippet: |
  package main

  import "fmt"

  // Flight - a struct that
  // contains information about flights
  type Flight struct {
    Origin string
    Destination string
    Price int
  }

  // SortByPrice sorts flights from lower to highest
  func SortByPrice(flights []Flight) []Flight {
    // implement
    return nil
  }

  func printFlights(flights []Flight) {
    for _, flight := range flights {
      fmt.Printf("Origin: %s, Destination: %s, Price: %d", flight.Origin, flight.Destination, flight.Price)
    }
  }

  func main() {
    // an empty slice of flights
    var flights []Flight

    sortedList := SortByPrice(flights)
    printFlights(sortedList)
  }
tests: 
  - name: main_test
    test: TestSortByPrice
    code: |
      package main

      import (
        "fmt"
        "reflect"
        "testing"
      )

      func TestSortByPrice(t *testing.T) {
        flights := []Flight{
          Flight{Price: 30},
          Flight{Price: 20},
          Flight{Price: 50},
          Flight{Price: 1000},
        }

        expected := []Flight{
          Flight{Price: 1000},
          Flight{Price: 50},
          Flight{Price: 30},
          Flight{Price: 20},
        }

        result := SortByPrice(flights)

        fmt.Println(reflect.DeepEqual(result, expected))

      }
---

In this challenge, you are going to be attempting to sort a list of `Flight`s based on their price from highest to lowest. 

You will have to implement the `SortByPrice` function that takes in a slice of type `Flight` and returns the sorted list of Flights.

In order to help you see what is going on, you have been provided a very quick printFlights function which you can use to print the flights out.

<details><summary>Helpful Article</summary>

* [Sorting in Go with the Sort Package](/golang/go-sorting-with-sort-tutorial/)
</details>

# Further Reading:

If you like this challenge then you may also appreciate some of the following articles on the site:

* [Go Interfaces Tutorial](/golang/go-interfaces-tutorial/)