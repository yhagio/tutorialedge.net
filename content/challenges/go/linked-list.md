---
title: "Challenge 09 - 🔗 Singly Linked Lists"
date: 2020-05-30T08:41:49+01:00
desc: In this challenge, you will be implementing the basic functionality of a singly linked list in Go!
image: golang.png
weight: 9
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

  type Element struct {
    Value string
    Next  *Element
  }

  type SinglyLinkedList struct {
    Count int
    Head  *Element
    Tail  *Element
  }

  func (l *SinglyLinkedList) Append(value string) {
    // implement

  }

  // You will have to ensure when you add new elements
  // that this method still returns the correct value
  func (l *SinglyLinkedList) Size() int {
    return l.Count
  }

  func (l *SinglyLinkedList) Print() {
    current := l.Head
    fmt.Printf("%+v\n", current.Value)
    for current.Next != nil {
      fmt.Printf("%+v\n", current.Value)
      current = current.Next
    }
  }

  func main() {
    fmt.Println("Singly Linked List Challenge")

    var llist SinglyLinkedList

    values := []string{"First", "Second", "Third"}
    for _, value := range values {
      llist.Append(value)
    }
    llist.Print()
  }
tests:
  - name: main_test
    test: TestAppend
    code: |
      package main

      import (
        "fmt"
        "testing"
      )

      func TestAppend(t *testing.T) {

        var llist SinglyLinkedList
        el01 := "First"

        llist.Append(el01)

        if llist.Count != 1 {
          fmt.Println("Count Has Not Updated Correctly")
          t.Fail()
          return
        }

        if llist.Head.Value != "First" {
          fmt.Println("Head Element Not Updated Correctly")
          t.Fail()
          return
        }

        if llist.Tail.Value != "First" {
          fmt.Println("Tail Element Not Updated Correctly")
          t.Fail()
          return
        }

        llist.Append("Second")

        if llist.Count != 2 {
          fmt.Println("Count Has Not Updated Correctly")
          t.Fail()
          return
        }

        if llist.Head.Value != "First" {
          fmt.Println("First Value of Linked List Updated Incorrectly")
          t.Fail()
          return
        }

        if llist.Head.Next.Value != "Second" {
          fmt.Println("Head Next Not updated correctly on second append")
          t.Fail()
          return
        }

        if llist.Tail.Value != "Second" {
          fmt.Println("Tail Element Not Updated Correctly")
          t.Fail()
          return
        }

      }

---

👋 Welcome Gophers! In this challenge, you will be implementing some of the basic functionality of a singly linked-list in Go! 💪

In this challenge, we will be attempted to implement the `Add` function of a *singly linked list*.

# Linked Lists

Linked lists are a data structure we can utilize in order to represent a sequence of elements or `nodes` as they are called. Singly linked lists are a one way sequence where each `node` contains a pointer to the next `node` in the list. 

![Singly Linked List](https://images.tutorialedge.net/challenges/singly-linked-list-03.svg)

Doubly linked lists on the other hand have 2 pointers to both the previous `node` and the next `node` and can be traversed back and forth.

# Challenge Requirements

In this challenge, you will be implementing a very simple, singly linked list that allows you to append new `string` values to the end of our linked list and ensure that you update the `Tail` and `Head` values appropriately. 

<Quiz question="What is the time complexity of the most optimal solution for the Append method?" answer="O(k)" correct="B" A="O(k^2)" B="O(k)" C="O(1)" />

# See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 09 - Singly Linked Lists](https://discuss.tutorialedge.net/t/challenge-09-singly-linked-list/28/2) 

# Further Reading:

If you enjoyed this challenge, then feel free to try some of the other challenges on the site:

* [Challenge 05 - Implementing a Stack](/challenges/go/implementing-a-stack/)
* [Challenge 06 - Implementing a Queue](/challenges/go/implementing-a-queue/)