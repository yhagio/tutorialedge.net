---
title: "Challenge 05 - Implementing a Stack in Go"
date: 2020-05-25T19:47:24+01:00
desc: In this challenge, you will be implementing some of the core functionality of the Stack data structure in Go!
image: golang.png
weight: 1
series:
  - go-challenges
tags:
  - go
twitter: https://twitter.com/Elliot_F
language: go
layout: challenge
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
snippet: |
  package main

  import "fmt"

  type Stack struct{}

  type Flight struct {
    Origin      string
    Destination string
    Price       int
  }

  func (s *Stack) Pop() Flight {
    // TODO Implement
    return Flight{}
  }

  func (s *Stack) Push(f Flight) {
    // TODO Implement
  }

  func (s *Stack) Peek() Flight {
    // TODO Implement
    return Flight{}
  }

  func (s *Stack) IsEmpty() bool {
    return false
  }

  func main() {
    fmt.Println("Go Stack Implementation")
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
        stack := Stack{
          Items: []Flight{
            Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
            Flight{Origin: "NYC", Destination: "JFK", Price: 2000},
            Flight{Origin: "CDG", Destination: "SNG", Price: 2000},
            Flight{Origin: "BSB", Destination: "NYC", Price: 2000},
          },
        }

        flight, err := stack.Pop()
        if err != nil {
          fmt.Println("Error")
          t.Fail()
        }

        if len(stack.Items) != 3 {
          fmt.Println("Stack Length Not Updated")
          t.Fail()
        }

        if flight.Origin != "BSB" {
          fmt.Println(flight)
          t.Fail()
        }

      }

      func TestPush(t *testing.T) {
        stack := Stack{
          Items: []Flight{
            Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
            Flight{Origin: "NYC", Destination: "JFK", Price: 2000},
            Flight{Origin: "CDG", Destination: "SNG", Price: 2000},
            Flight{Origin: "BSB", Destination: "NYC", Price: 2000},
          },
        }

        stack.Push(Flight{Origin: "DUB", Destination: "OHA", Price: 300})

        if len(stack.Items) != 5 {
          t.Fail()
        }

        flight, err := stack.Pop()
        if err != nil {
          t.Fail()
        }

        if flight.Origin != "DUB" {
          t.Fail()
        }
      }

      func TestIsEmpty(t *testing.T) {
        stack := Stack{Items: []Flight{}}
        expected := true
        result := stack.IsEmpty()
        if expected != result {
          t.Fail()
        }

      }

      func TestPeek(t *testing.T) {
        stack := Stack{
          Items: []Flight{
            Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
            Flight{Origin: "NYC", Destination: "JFK", Price: 2000},
            Flight{Origin: "CDG", Destination: "SNG", Price: 2000},
            Flight{Origin: "BSB", Destination: "NYC", Price: 2000},
          },
        }

        flight, err := stack.Peek()
        if err != nil {
          fmt.Println(err)
          t.Fail()
        }

        if flight.Origin != "BSB" {
          t.Fail()
        }

        if len(stack.Items) != 4 {
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
        stack := Stack{
          Items: []Flight{
            Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
            Flight{Origin: "NYC", Destination: "JFK", Price: 2000},
            Flight{Origin: "CDG", Destination: "SNG", Price: 2000},
            Flight{Origin: "BSB", Destination: "NYC", Price: 2000},
          },
        }

        flight, err := stack.Pop()
        if err != nil {
          fmt.Println("Error")
          t.Fail()
        }

        if len(stack.Items) != 3 {
          fmt.Println("Stack Length Not Updated")
          t.Fail()
        }

        if flight.Origin != "BSB" {
          fmt.Println(flight)
          t.Fail()
        }

      }

      func TestPush(t *testing.T) {
        stack := Stack{
          Items: []Flight{
            Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
            Flight{Origin: "NYC", Destination: "JFK", Price: 2000},
            Flight{Origin: "CDG", Destination: "SNG", Price: 2000},
            Flight{Origin: "BSB", Destination: "NYC", Price: 2000},
          },
        }

        stack.Push(Flight{Origin: "DUB", Destination: "OHA", Price: 300})

        if len(stack.Items) != 5 {
          t.Fail()
        }

        flight, err := stack.Pop()
        if err != nil {
          t.Fail()
        }

        if flight.Origin != "DUB" {
          t.Fail()
        }
      }

      func TestIsEmpty(t *testing.T) {
        stack := Stack{Items: []Flight{}}
        expected := true
        result := stack.IsEmpty()
        if expected != result {
          t.Fail()
        }

      }

      func TestPeek(t *testing.T) {
        stack := Stack{
          Items: []Flight{
            Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
            Flight{Origin: "NYC", Destination: "JFK", Price: 2000},
            Flight{Origin: "CDG", Destination: "SNG", Price: 2000},
            Flight{Origin: "BSB", Destination: "NYC", Price: 2000},
          },
        }

        flight, err := stack.Peek()
        if err != nil {
          fmt.Println(err)
          t.Fail()
        }

        if flight.Origin != "BSB" {
          t.Fail()
        }

        if len(stack.Items) != 4 {
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
        stack := Stack{
          Items: []Flight{
            Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
            Flight{Origin: "NYC", Destination: "JFK", Price: 2000},
            Flight{Origin: "CDG", Destination: "SNG", Price: 2000},
            Flight{Origin: "BSB", Destination: "NYC", Price: 2000},
          },
        }

        flight, err := stack.Pop()
        if err != nil {
          fmt.Println("Error")
          t.Fail()
        }

        if len(stack.Items) != 3 {
          fmt.Println("Stack Length Not Updated")
          t.Fail()
        }

        if flight.Origin != "BSB" {
          fmt.Println(flight)
          t.Fail()
        }

      }

      func TestPush(t *testing.T) {
        stack := Stack{
          Items: []Flight{
            Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
            Flight{Origin: "NYC", Destination: "JFK", Price: 2000},
            Flight{Origin: "CDG", Destination: "SNG", Price: 2000},
            Flight{Origin: "BSB", Destination: "NYC", Price: 2000},
          },
        }

        stack.Push(Flight{Origin: "DUB", Destination: "OHA", Price: 300})

        if len(stack.Items) != 5 {
          t.Fail()
        }

        flight, err := stack.Pop()
        if err != nil {
          t.Fail()
        }

        if flight.Origin != "DUB" {
          t.Fail()
        }
      }

      func TestIsEmpty(t *testing.T) {
        stack := Stack{Items: []Flight{}}
        expected := true
        result := stack.IsEmpty()
        if expected != result {
          t.Fail()
        }

      }

      func TestPeek(t *testing.T) {
        stack := Stack{
          Items: []Flight{
            Flight{Origin: "GLA", Destination: "NYC", Price: 2000},
            Flight{Origin: "NYC", Destination: "JFK", Price: 2000},
            Flight{Origin: "CDG", Destination: "SNG", Price: 2000},
            Flight{Origin: "BSB", Destination: "NYC", Price: 2000},
          },
        }

        flight, err := stack.Peek()
        if err != nil {
          fmt.Println(err)
          t.Fail()
        }

        if flight.Origin != "BSB" {
          t.Fail()
        }

        if len(stack.Items) != 4 {
          t.Fail()
        }
      }

---

👋 Welcome Gophers! In this challenge, we are going to be implementing some of the basic functionality of the `Stack` data structure in Go.

This is going to be the first of a number of data-structure questions which may come in handy if you are about to go in for an interview!

We'll be carrying on the theme of flying from the previous challenge here and implementing 3 crucial methods needed to support a basic implementation of a stack. 

# Push

The first challenge will be to implement the `Push` function of our Stack interface. 

This method will take in a Flight and `push` the flight onto the top of our `Items` stack. 

# Peek

The second part of this challenge will be implementing the `Peek` function.

This method will allow us to view what item is at the top of our stack but not modify the underlying stack values.

# Pop

The third and final part of this challenge will be implementing the `Pop` function.

This method will allow us to `pop` an element off the top of our `Items` stack and return to us the top flight.

<Quiz question="Pointer receivers, denoted by the (s *Stack), on our methods allow us to modify the value to which the receiver points" answer="True - not using pointer receivers here would mean that calling pop and push would not update the underlying value of the stack" correct="A" A="True " B="False" />

# See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 05 - Implementing a Stack](https://discuss.tutorialedge.net/t/challenge-05-implementing-a-stack/22) 


## Further Reading:

If you enjoyed this challenge, you may also enjoy some of the other challenges on this site:

* [Sorting By Price](/challenges/go/sort-by-price/)