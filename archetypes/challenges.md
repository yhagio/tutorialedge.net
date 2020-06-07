---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
desc: 
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series:
  - go-challenges
tags:
  - go
language: go
layout: challenge
weight: 8
tags:
- beginner
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
  package main

  import "fmt"

  func main() {
      fmt.Println("Challenge")
  }
tests:
  - name: main_test
    test: TestCheckPermutations
    code: |
      package main

      import "testing"

      func TestFunc(t *testing.T) {
          t.Fail()
      }
---


# See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - []() 

## Further Reading:

If you enjoyed this challenge, you may also enjoy some of the other challenges on this site:

* [Sorting By Price](/challenges/go/sort-by-price/)