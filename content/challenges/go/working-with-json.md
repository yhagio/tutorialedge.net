---
title: "Challenge 21 - JSON and Stock Dividends"
date: 2020-08-02T21:08:18+01:00
desc: In this challenge, you are going to need to work with JSON strings and parse JSON in Go in order to retrieve the highest dividend stocks!
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series:
  - go-challenges
tags:
  - go
language: go
layout: challenge
image: golang.svg
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
    Ticker   string `json:"ticker"`
    Dividend int    `json:'dividend"`
  }

  // HighestDividend iterates through a JSON string of stocks
  // unmarshalls them into a struct and returns the Stock with
  // the highest dividend
  func HighestDividend(json string) string {
    // implement me
    return ""
  }

  func main() {
    fmt.Println("Stock Price AI")

    stocks_json := `[
      {"ticker":"APPL","dividend":0.5},
      {"ticker":"GOOG","dividend":0.2},
      {"ticker":"MSFT","dividend":0.3}
    ]`

    highestDividend, _ := HighestDividend(stocks_json)
    fmt.Println(highestDividend)
  }
tests:
  - name: main_test
    test: TestHighestDividend
    code: |
      package main

      import "testing"

      func TestHighestDividend(t *testing.T) {
        stocks_json := `[
            {"ticker":"APPL","dividend":0.5},
            {"ticker":"GOOG","dividend":0.2},
            {"ticker":"MSFT","dividend":0.3}
        ]`

        expected := "APPL"
        result := HighestDividend(stocks_json)

        if expected != result {
          t.Fail()
        }
      }

---

👋 Welcome Gophers! In this Go challenge, you are going to be working with JSON data and implementing a function that takes in a JSON string full of stock quotes and returns the one with the highest dividend return. 

# Example

```bash
[
  {"ticker": "APPL", "dividend": 0.5},
  {"ticker": "MSFT", "dividend": 0.2}
]

# HighestDividend returns "APPL"
```

# See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 21 - Working with JSON](https://discuss.tutorialedge.net/t/challenge-21-json-and-stock-dividends/63) 

## Further Reading:

If you enjoyed this challenge, you may also enjoy some of these other challenges:

* [Sorting Flights by Price](/challenges/go/sort-by-price/)
* [Satisfying Interfaces](/challenges/go/interfaces/)