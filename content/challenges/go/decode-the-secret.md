---
title: "Challenge 17 - Decode the Secret"
date: 2020-06-08T21:23:28+01:00
desc: In this challenge, you are tasked with decoding this secret message and returning the unencoded string in Go!
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series:
  - go-challenges
tags:
  - "Language"
language: go
layout: challenge
difficulty: Medium
image: golang.svg
weight: 17
tags:
- beginner
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
  package main

  import "fmt"

  func DecodeSecret(message string) string {
    return ""
  }

  func main() {
    fmt.Println("Decode the Secret")

    message := "VEZEU0ZVVFVTSk9I"
    result := DecodeSecret(message)
    fmt.Println(result)

  }
tests:
  - name: main_test
    test: TestDecodeSecret
    code: |
      package main

      import "testing"

      func TestDecodeSecret(t *testing.T) {
        original := "VEZEU0ZVVFVTSk9I"
        expected := "SECRETSTRING"

        if expected != DecodeSecret(original) {
          t.Fail()
        }
      }

---

👋 Welcome Gophers! In this challenge, you are tasked with decoding the secret message.

You will need to implement the `DecodeSecret` function which will take in a string that has been encoded using base64 encoding and decode this string. 

This decoded string will be the result of a caesar cipher which has shifted all of the characters of the string up by 1 place. So you will have to ensure that when you return the result, it also decodes this cipher.

## See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 17 - Decode the Secret](https://discuss.tutorialedge.net/t/challenge-17-decode-the-secret/39) 

### Further Reading:

If you enjoyed this challenge, you may also enjoy some of the other challenges on this site:

* [Sorting By Price](/challenges/go/sort-by-price/)
* [Challenge 05 - Implementing a Stack](/challenges/go/implementing-a-stack/)
* [Challenge 06 - Implementing a Queue](/challenges/go/implementing-a-queue/)