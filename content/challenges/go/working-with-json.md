---
title: "Challenge 21 - Working with JSON"
date: 2020-08-02T21:08:18+01:00
desc: In this challenge, you are going to be building a function that takes in two string values and checks to see if they are permutations of each other!
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series:
  - go-challenges
tags:
  - go
language: go
layout: challenge
image: golang.svg
draft: true
difficulty: Medium
weight: 21
tags:
  - "Language"
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
  package main

  import "fmt"

  type Stocks struct {
    Stocks []Stocks
  }

  type Stock struct {
    Ticker string `json:"ticker"`
    Dividend int `json:'dividend"`
  }

  // HighestDividend iterates through a JSON string of stocks
  // unmarshalls them into a struct and returns the Stock with 
  // the highest dividend
  func HighestDividend(json str) (Stock, error) {
    // implement me
  }

  func main() {
    fmt.Println("Stock Price AI")

    stocks_json := "adcme"

    highestDividend, _ := HighestDividend(stocks_json)
    fmt.Println(highestDividend)
  }
tests:
  - name: main_test
    test: TestCheckPermutations
    code: |
      package main

      import "testing"

      type Test struct {
        str1     string
        str2     string
        expected bool
        throws   bool
      }

      func TestCheckPermutations(t *testing.T) {
        tests := []Test{
          Test{str1: "abc", str2: "bca", expected: true},
          Test{str1: "cda", str2: "abc", expected: false},
        }

        for _, test := range tests {
          result := CheckPermutations(test.str1, test.str2)
          if result != test.expected {
            t.Fail()
          }
        }
      }


---

👋 Welcome Gophers! In this Go challenge, you are going to be working with JSON data and implementing a function that takes in a JSON string full of stock quotes and returns the one with the highest dividend return. 

# Example


<details><summary>Hints</summary>

Possible hints

</details>

<Quiz question"How can we optimize this function so that it is not performing unnecessary calculations?" answer="We can implement all of the above checks to ensure that the function only does what it has to before returning the correct answer" correct="C" A="We can check the length of each string at the start of the function and return false if they differ" B="We can use maps to efficiently lookup perviously encountered characters" C="All of the Above" />

# See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 21 - Working with JSON](https://discuss.tutorialedge.net/t/challenge-08-checking-permutations/25/2) 

## Further Reading:

If you enjoyed this challenge, you may also enjoy some of these other challenges:

* [Sorting Flights by Price](/challenges/go/sort-by-price/)
* [Satisfying Interfaces](/challenges/go/interfaces/)