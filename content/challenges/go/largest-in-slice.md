---
author: Elliot Forbes
date: 2019-11-24T11:05:52Z
desc: In this Challenge, you are going to find the minimum and maximum values from a slice in Go.
image: golang.png
weight: 1
series:
  - go-challenges
tags:
  - go
title: Challenge - Finding Minimum and Maximum
twitter: https://twitter.com/Elliot_F
language: go
layout: challenge
draft: true
snippet: |
  package main

  type Employee interface {
      Language() string
      Age() int
      Random() (string, error)
  }

  type Engineer struct {
      Name string
  }

  func (e Engineer) Language() string {
      return e.Name + " programs in Go"
  }

  func main() {
      // This will throw an error
      var programmers []Employee
      elliot := Engineer{Name: "Elliot"}
      // Engineer does not implement the Employee interface
      // you'll need to implement Age() and Random()
      programmers = append(programmers, elliot)
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

On the left hand screen, you have a simple Go application that features an interface called `Employee`. 

In order to complete this challenge, you will have to complete the code and satisfy this interface.

# Further Reading:

If you like this challenge then you may also appreciate some of the following articles on the site:

* [Go Interfaces Tutorial](/golang/go-interfaces-tutorial/)