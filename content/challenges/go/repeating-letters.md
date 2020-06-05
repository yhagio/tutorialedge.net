---
title: "Challenge 15 - Repeating Letters"
date: 2020-06-05T17:56:04+01:00
desc: In this challenge, you are tasked with implementing a function that takes in a string and then duplicates the characters twice within the string. 
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
weight: 15
series: 
  - go-challenges
image: golang.svg 
tags:
- go
language: go
layout: challenge
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
snippet: |
  package main

  import "fmt"

  func DoubleChars(original string) string {
    // Implement me
    return ""
  }

  func main() {
    fmt.Println("Smallest Difference Challenge")

    original := "gophers"
    doubled := DoubleChars(original)
    fmt.Println(doubled) // ggoopphheerrss
  }
tests:
  - name: main_test
    test: TestDoubleChars
    code: |
      package main

      import "testing"

      func TestDoubleChars(t *testing.T) {
          expected := "ggoopphheerrss"
          original := "gophers"
          result := DoubleChars(original)

          if result != expected {
              t.Fail()
          }
      }
---

👋 Welcome Gophers! In this challenge, you are tasked with implementing a function `DoubleChars` which will take in a `string` and then return another string which has every letter in the word doubled.


# See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 15 - Repeating Letters](https://discuss.tutorialedge.net/t/challenge-15-repeating-letters/36) 

## Further Reading:

If you enjoyed this challenge, you may also enjoy some of the other challenges on this site:

* [Sorting By Price](/challenges/go/sort-by-price/)