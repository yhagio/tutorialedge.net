---
author: Elliot Forbes
title: "Challenge 11 - Sets and Subsets"
date: 2020-06-01T19:47:02+01:00
desc: In this challenge, you are going to be implementing a function that checks to see if a set is a sub-set.
image: golang.svg
weight: 11
series:
  - go-challenges
tags:
  - go
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
language: go
snippet: |
  package main

  import "fmt"

  // Flight struct which contains
  // the origin, destination and price of a flight
  type Flight struct {
    Origin      string
    Destination string
    Price       int
  }

  // IsSubset checks to see if the first set of
  // flights is a subset of the second set of flights.
  func IsSubset(first, second []Flight) bool {
    // implement
    return false
  }

  func main() {
    fmt.Println("Sets and Subsets Challenge")
    firstFlights := []Flight{
      Flight{Origin: "GLA", Destination: "CDG", Price: 1000},
      Flight{Origin: "GLA", Destination: "JFK", Price: 5000},
      Flight{Origin: "GLA", Destination: "SNG", Price: 3000},
    }

    secondFlights := []Flight{
      Flight{Origin: "GLA", Destination: "CDG", Price: 1000},
      Flight{Origin: "GLA", Destination: "JFK", Price: 5000},
      Flight{Origin: "GLA", Destination: "SNG", Price: 3000},
      Flight{Origin: "GLA", Destination: "AMS", Price: 500},
    }

    subset := IsSubset(firstFlights, secondFlights)
    fmt.Println(subset)
  }
tests: 
  - name: main_test
    test: TestIsSubset
    code: |
      package main

      import "testing"

      func TestIsSubset(t *testing.T) {
        firstFlights := []Flight{
          Flight{Origin: "GLA", Destination: "CDG", Price: 1000},
          Flight{Origin: "GLA", Destination: "JFK", Price: 5000},
          Flight{Origin: "GLA", Destination: "SNG", Price: 3000},
        }

        secondFlights := []Flight{
          Flight{Origin: "GLA", Destination: "CDG", Price: 1000},
          Flight{Origin: "GLA", Destination: "JFK", Price: 5000},
          Flight{Origin: "GLA", Destination: "SNG", Price: 3000},
          Flight{Origin: "GLA", Destination: "AMS", Price: 500},
        }

        expected := true
        result := IsSubset(firstFlights, secondFlights)

        if result != expected {
          t.Fail()
        }
      }

      func TestIsSubsetNegative(t *testing.T) {
        firstFlights := []Flight{
          Flight{Origin: "GLA", Destination: "BRZ", Price: 1000},
          Flight{Origin: "GLA", Destination: "JFK", Price: 5000},
          Flight{Origin: "GLA", Destination: "SNG", Price: 3000},
        }

        secondFlights := []Flight{
          Flight{Origin: "GLA", Destination: "CDG", Price: 1000},
          Flight{Origin: "GLA", Destination: "JFK", Price: 5000},
          Flight{Origin: "GLA", Destination: "SNG", Price: 3000},
          Flight{Origin: "GLA", Destination: "AMS", Price: 500},
        }

        expected := false
        result := IsSubset(firstFlights, secondFlights)

        if result != expected {
          t.Fail()
        }
      }
  - name: main_test
    test: TestIsSubsetNegative
    code: |
      package main

      import "testing"

      func TestIsSubset(t *testing.T) {
        firstFlights := []Flight{
          Flight{Origin: "GLA", Destination: "CDG", Price: 1000},
          Flight{Origin: "GLA", Destination: "JFK", Price: 5000},
          Flight{Origin: "GLA", Destination: "SNG", Price: 3000},
        }

        secondFlights := []Flight{
          Flight{Origin: "GLA", Destination: "CDG", Price: 1000},
          Flight{Origin: "GLA", Destination: "JFK", Price: 5000},
          Flight{Origin: "GLA", Destination: "SNG", Price: 3000},
          Flight{Origin: "GLA", Destination: "AMS", Price: 500},
        }

        expected := true
        result := IsSubset(firstFlights, secondFlights)

        if result != expected {
          t.Fail()
        }
      }

      func TestIsSubsetNegative(t *testing.T) {
        firstFlights := []Flight{
          Flight{Origin: "GLA", Destination: "BRZ", Price: 1000},
          Flight{Origin: "GLA", Destination: "JFK", Price: 5000},
          Flight{Origin: "GLA", Destination: "SNG", Price: 3000},
        }

        secondFlights := []Flight{
          Flight{Origin: "GLA", Destination: "CDG", Price: 1000},
          Flight{Origin: "GLA", Destination: "JFK", Price: 5000},
          Flight{Origin: "GLA", Destination: "SNG", Price: 3000},
          Flight{Origin: "GLA", Destination: "AMS", Price: 500},
        }

        expected := false
        result := IsSubset(firstFlights, secondFlights)

        if result != expected {
          t.Fail()
        }
      }

---

👋 Welcome Gophers! In this challenge, you are tasked with trying to implement a function that checks to see if a set is a sub-set of another set.

We'll be carrying on the flying theme where the function takes in a `slice` of Flights and then checks to see if they exist within another `slice` of flights.

<details><summary>Hint</summary>

There are a number of ways to solve this. You may be able to use the `reflect` package or you may be able to serialize each flight and create a hash of them which you can store in a hash.
</details>

# See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 11 - Sets and Subsets](https://discuss.tutorialedge.net/t/challenge-11-sets-and-subsets/30) 

# Further Reading:

If you enjoyed this challenge, then feel free to try some of the other challenges on the site:

* [Challenge 05 - Implementing a Stack](/challenges/go/implementing-a-stack/)
* [Challenge 06 - Implementing a Queue](/challenges/go/implementing-a-queue/)