---
title: "Challenge 09 - Min Max Stack"
date: 2020-05-30T08:23:36+01:00
draft: true
desc: In this challenge, you are going to be implementing the Push function on a min-max-stack data structure in Go!
image: golang.png
weight: 9
series:
  - go-challenges
tags:
  - "Data Structures"
twitter: https://twitter.com/Elliot_F
language: go
layout: challenge
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
  package main

  import "fmt"

  type MinMaxStack struct{}

  func main() {
    fmt.Println("Min Max Stack Challenge")
  }
tests:
  - name: main_test
    test: TestPush
    code: |
      package main

      import (
        "fmt"
        "testing"
      )

      func TestPush(t *testing.T) {
        t.Fail()
      }
---

👋 Welcome Gophers! In this challenge, we are going to be continuing on the data structures theme and attempting to implement some of the underlying functionality of a `min/max stack`. 

# 

# See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 05 - Min/Max Stacks](https://discuss.tutorialedge.net/t/challenge-05-implementing-a-stack/22) 

## Further Reading

If you enjoyed this challenge and want some more data structures challenges then check out these:

* [Challenge 05 - Implementing a Stack](/challenges/go/implementing-a-stack/)
* [Challenge 06 - Implementing a Queue](/challenges/go/implementing-a-queue/)