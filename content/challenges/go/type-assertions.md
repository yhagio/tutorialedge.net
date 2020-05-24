---
author: Elliot Forbes
date: 2019-11-24T11:05:52Z
desc: In this Challenge, you are going to learn the basics of type assertions in Go and how you can use type assertions to retrieve the dynamic values of from interfaces
image: golang.png
weight: 1
series:
  - go-challenges
tags:
  - go
title: Challenge - Type Assertions in Go
twitter: https://twitter.com/Elliot_F
language: go
layout: challenge
snippet: |
  package main
  
  import (
    "fmt"
  )

  // Developer struct
  type Developer struct {
    Name string
    Age int
  }

  func GetDeveloper(name interface{}, age interface{}) Developer {
    // TODO
  }

  func main() {
    fmt.Println("Hello World")

    var name interface{} = "Elliot"
    var age interface{} = 26

    dynamicDev := GetDeveloper(name, age)
    fmt.Println(dynamicDev.Name)
  }
tests: 
  - name: main_test
    test: TestGetDeveloper
    code: |
      package main

      import "testing"

      func TestGetDeveloper(t *testing.T) {
        expectedAge := 26
        expectedName := "Elliot"
        result := GetDeveloper("Elliot", 26)

        if expectedName != result.Name {
          t.Fail()
        }

        if expectedAge != result.Age {
          t.Fail()
        }

      }
---

In this challenge, we are going to become familiar with the concept of `Type Assertions` in Go! 

# Preface

If you are new to the language, then type assertions are a concept that can sometimes trip you up and appear a little tricky at first, but after overcoming the syntax it becomes far easier to understand.

Through using type assertions, we can retrieve the *dynamic value* of an interface. For example:

```go
var myName interface{} = "Elliot"

name := myName.(string)
fmt.Println(name)
```

In this example, we have an interface which has a *dynamic value* of "Elliot". We can then use a *type assertion* to retrieve this dynamic value and use the value just like we would any other `string` value in Go.

# Challenge

In this challenge, we are going to define a function that is called `GetDeveloper` which will take in 2 `interface{}` arguments. 

Within this function, you will have to declare a new `Developer` instance and use *type assertion* to populate the values correctly before then returning this new `Developer` instance.

# See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 01 - Type Assertions](hhttps://discuss.tutorialedge.net/t/challenge-01-type-assertions/18) 

## Further Reading

* [Go Interfaces Tutorial](/golang/go-interfaces-tutorial/)
