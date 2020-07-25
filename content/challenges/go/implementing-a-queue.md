---
title: "Challenge 06 - Implementing a Queue in Go"
date: 2020-05-25T19:47:24+01:00
desc: In this challenge, you will be implementing some of the core functionality of the Queue data structure in Go!
image: golang.png
weight: 6
series:
  - go-challenges
tags:
  - "Data Structures"
twitter: https://twitter.com/Elliot_F
language: go
difficulty: Hard
layout: challenge
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
  package main

  import "fmt"

  type Queue struct{}

  type Flight struct {
    Origin      string
    Destination string
    Price       int
  }

  func (q *Queue) Pop() Flight {
    // TODO Implement
    return Flight{}
  }

  func (q *Queue) Push(f Flight) {
    // TODO Implement
  }

  func (q *Queue) Peek() Flight {
    // TODO Implement
    return Flight{}
  }

  func (q *Queue) IsEmpty() bool {
    return false
  }

  func main() {
    fmt.Println("Go Queue Implementation")
  }
tests:
  - name: main_test
    test: TestPop
    code: |
      package main

      import (
        "fmt"
        "testing"
      )

      func TestPop(t *testing.T) {
        queue := Queue{
          Items: []Flight{
            Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
            Flight{Origin: "NYC", Destination: "JFK", Price: 2000},
            Flight{Origin: "CDG", Destination: "SNG", Price: 2000},
            Flight{Origin: "BSB", Destination: "NYC", Price: 2000},
          },
        }

        flight, err := queue.Pop()
        if err != nil {
          fmt.Println("Error")
          t.Fail()
        }

        if len(queue.Items) != 3 {
          fmt.Println("queue Length Not Updated")
          t.Fail()
        }

        if flight.Origin != "GLA" {
          fmt.Println(flight)
          t.Fail()
        }

      }

      func TestPush(t *testing.T) {
        queue := Queue{
          Items: []Flight{
            Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
            Flight{Origin: "NYC", Destination: "JFK", Price: 2000},
            Flight{Origin: "CDG", Destination: "SNG", Price: 2000},
            Flight{Origin: "BSB", Destination: "NYC", Price: 2000},
          },
        }

        queue.Push(Flight{Origin: "DUB", Destination: "OHA", Price: 300})

        if len(queue.Items) != 5 {
          t.Fail()
        }

        flight, err := queue.Pop()
        if err != nil {
          t.Fail()
        }

        if flight.Origin != "GLA" {
          t.Fail()
        }
      }

      func TestIsEmpty(t *testing.T) {
        queue := Queue{Items: []Flight{}}
        expected := true
        result := queue.IsEmpty()
        if expected != result {
          t.Fail()
        }

      }

      func TestPeek(t *testing.T) {
        queue := Queue{
          Items: []Flight{
            Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
            Flight{Origin: "NYC", Destination: "JFK", Price: 2000},
            Flight{Origin: "CDG", Destination: "SNG", Price: 2000},
            Flight{Origin: "BSB", Destination: "NYC", Price: 2000},
          },
        }

        flight, err := queue.Peek()
        if err != nil {
          fmt.Println(err)
          t.Fail()
        }

        if flight.Origin != "GLA" {
          t.Fail()
        }

        if len(queue.Items) != 4 {
          t.Fail()
        }
      }
  - name: main_test
    test: TestPeek
    code: |
      package main

      import (
        "fmt"
        "testing"
      )

      func TestPop(t *testing.T) {
        queue := Queue{
          Items: []Flight{
            Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
            Flight{Origin: "NYC", Destination: "JFK", Price: 2000},
            Flight{Origin: "CDG", Destination: "SNG", Price: 2000},
            Flight{Origin: "BSB", Destination: "NYC", Price: 2000},
          },
        }

        flight, err := queue.Pop()
        if err != nil {
          fmt.Println("Error")
          t.Fail()
        }

        if len(queue.Items) != 3 {
          fmt.Println("queue Length Not Updated")
          t.Fail()
        }

        if flight.Origin != "GLA" {
          fmt.Println(flight)
          t.Fail()
        }

      }

      func TestPush(t *testing.T) {
        queue := Queue{
          Items: []Flight{
            Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
            Flight{Origin: "NYC", Destination: "JFK", Price: 2000},
            Flight{Origin: "CDG", Destination: "SNG", Price: 2000},
            Flight{Origin: "BSB", Destination: "NYC", Price: 2000},
          },
        }

        queue.Push(Flight{Origin: "DUB", Destination: "OHA", Price: 300})

        if len(queue.Items) != 5 {
          t.Fail()
        }

        flight, err := queue.Pop()
        if err != nil {
          t.Fail()
        }

        if flight.Origin != "GLA" {
          t.Fail()
        }
      }

      func TestIsEmpty(t *testing.T) {
        queue := Queue{Items: []Flight{}}
        expected := true
        result := queue.IsEmpty()
        if expected != result {
          t.Fail()
        }

      }

      func TestPeek(t *testing.T) {
        queue := Queue{
          Items: []Flight{
            Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
            Flight{Origin: "NYC", Destination: "JFK", Price: 2000},
            Flight{Origin: "CDG", Destination: "SNG", Price: 2000},
            Flight{Origin: "BSB", Destination: "NYC", Price: 2000},
          },
        }

        flight, err := queue.Peek()
        if err != nil {
          fmt.Println(err)
          t.Fail()
        }

        if flight.Origin != "GLA" {
          t.Fail()
        }

        if len(queue.Items) != 4 {
          t.Fail()
        }
      }

  - name: main_test
    test: TestPush
    code: |
      package main

      import (
        "fmt"
        "testing"
      )

      func TestPop(t *testing.T) {
        queue := Queue{
          Items: []Flight{
            Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
            Flight{Origin: "NYC", Destination: "JFK", Price: 2000},
            Flight{Origin: "CDG", Destination: "SNG", Price: 2000},
            Flight{Origin: "BSB", Destination: "NYC", Price: 2000},
          },
        }

        flight, err := queue.Pop()
        if err != nil {
          fmt.Println("Error")
          t.Fail()
        }

        if len(queue.Items) != 3 {
          fmt.Println("queue Length Not Updated")
          t.Fail()
        }

        if flight.Origin != "GLA" {
          fmt.Println(flight)
          t.Fail()
        }

      }

      func TestPush(t *testing.T) {
        queue := Queue{
          Items: []Flight{
            Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
            Flight{Origin: "NYC", Destination: "JFK", Price: 2000},
            Flight{Origin: "CDG", Destination: "SNG", Price: 2000},
            Flight{Origin: "BSB", Destination: "NYC", Price: 2000},
          },
        }

        queue.Push(Flight{Origin: "DUB", Destination: "OHA", Price: 300})

        if len(queue.Items) != 5 {
          t.Fail()
        }

        flight, err := queue.Pop()
        if err != nil {
          t.Fail()
        }

        if flight.Origin != "GLA" {
          t.Fail()
        }
      }

      func TestIsEmpty(t *testing.T) {
        queue := Queue{Items: []Flight{}}
        expected := true
        result := queue.IsEmpty()
        if expected != result {
          t.Fail()
        }

      }

      func TestPeek(t *testing.T) {
        queue := Queue{
          Items: []Flight{
            Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
            Flight{Origin: "NYC", Destination: "JFK", Price: 2000},
            Flight{Origin: "CDG", Destination: "SNG", Price: 2000},
            Flight{Origin: "BSB", Destination: "NYC", Price: 2000},
          },
        }

        flight, err := queue.Peek()
        if err != nil {
          fmt.Println(err)
          t.Fail()
        }

        if flight.Origin != "GLA" {
          t.Fail()
        }

        if len(queue.Items) != 4 {
          t.Fail()
        }
      }

---

👋 Welcome Gophers! In this challenge, we are going to be implementing some of the basic functionality of the `Queue` data structure in Go.

This is going to be the first of a number of data-structure questions which may come in handy if you are about to go in for an interview!

We'll be carrying on the theme of flying from the previous challenge here and implementing 3 crucial methods needed to support a basic implementation of a Queue. 

# Push

The first challenge will be to implement the `Push` function of our Queue data structure. 

This method will take in a Flight and `push` the flight onto the back of our `Items` queue. 

# Peek

The second part of this challenge will be implementing the `Peek` function.

This method will allow us to view what item is at the front of our queue but not modify the underlying stack values.

# Pop

The third and final part of this challenge will be implementing the `Pop` function.

This method will allow us to `pop` an element off the front of our `Items` queue and return to us the first flight.

# See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 06 - Implementing a Queue](https://discuss.tutorialedge.net/t/challenge-06-implementing-a-queue/23) 


## Further Reading:

If you enjoyed this challenge, you may also enjoy some of the other challenges on this site:

* [Sorting By Price](/challenges/go/sort-by-price/)