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
title: Challenge - Finding the Minimum and Maximum Values
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
  }
tests: 
  - name: main_test
    test: TestSortByPrice
    code: |
      package main

      import "testing"

      func TestSortByPrice(t *testing.T) {
        flights := []Flight{
          Flight{
            Origin: "GLA",
            Destination: "NYC",
            Price: 2000,
          },
          Flight{
            Origin: "EDI",
            Destination: "AMS",
            Price: 100,
          },
          Flight{
            Origin: "EDI",
            Destination: "CDG",
            Price: 300,
          },
        }

        sorted := []Flight

      }
---

In this challenge, you are going to implement the necessary methods needed to satisfy the provided Go interface.

On the left hand screen, you have a simple Go application that features an interface called `Employee`. 

In order to complete this challenge, you will have to complete the code and satisfy this interface.

<Quiz question="Can you implement additional methods for this interface outside of the contract?" correct="B" answer="False" A="True" B="False"/>

# Further Reading:

If you like this challenge then you may also appreciate some of the following articles on the site:

* [Go Interfaces Tutorial](/golang/go-interfaces-tutorial/)