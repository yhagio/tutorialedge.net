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
title: Challenge - Satisfying Interfaces in Go 
twitter: https://twitter.com/Elliot_F
language: go
layout: challenge
snippet: |
  package main
  
  import "fmt"

  func AddInts(a, b int) int {
    return 0
  }

  func main() {
    fmt.Println("Hello World")
  }
tests: 
  - name: main_test
    test: TestAddInts
    code: |
      package main

      import "testing"

      func TestAddInts(t *testing.T) {
        expected := 2
        result := AddInts(1, 1)
        if expected != result {
          t.Fail()
        }
      }
---

In this challenge, you are going to implement the necessary methods needed to satisfy the provided Go interface.

<Quiz question="Who Is The Best #Peep?" A="Elliot" B="Nadi" C="Donna" correct="A" answer="The correct answer is A" />

test