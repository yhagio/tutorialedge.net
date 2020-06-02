---
title: "Challenge 10 - Word Frequencies"
date: 2020-05-31T18:22:08+01:00
desc: In this challenge, you will be tasked with efficiently counting the frequencies of words in Go!
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
weight: 10
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

  import (
    "fmt"
    "strings"
  )

  func CountWords(text string) map[string]int {
    // Implement Me :)
  }

  func Top5Words(wordmap map[string]int) []Word {
    // Implement Me :)
  }

  func main() {
    fmt.Println("Word Frequency Test")

    text := `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`

    results := CountWords(text)
    MostCommon := Top5Words(results)

    fmt.Println(MostCommon)
  }

tests:
  - name: main_test
    test: TestCountWords
    code: |
      package main

      import (
        "reflect"
        "testing"
      )

      func TestCountWords(t *testing.T) {
        expected := make(map[string]int)
        expected["A"] = 2
        expected["B"] = 2
        expected["C"] = 2
        expected["D"] = 1
        expected["E"] = 1
        expected["F"] = 1

        text := `A A B B C C D E F`

        result := CountWords(text)

        if reflect.DeepEqual(result, expected) != true {
          t.Fail()
        }

      }

      func TestTop5Words(t *testing.T) {
        expected := []Word{
          Word{Word: "A", Frequency: 5},
          Word{Word: "B", Frequency: 4},
          Word{Word: "C", Frequency: 3},
          Word{Word: "D", Frequency: 2},
          Word{Word: "E", Frequency: 1},
        }

        testMap := make(map[string]int)
        testMap["A"] = 5
        testMap["B"] = 4
        testMap["C"] = 3
        testMap["D"] = 2
        testMap["E"] = 1
        testMap["F"] = 0

        result := Top5Words(testMap)

        for index, char := range expected {
          if char != result[index] {
            t.Fail()
          }
        }

      }

  - name: main_test
    test: TestTop5Words
    code: |
      package main

      import (
        "reflect"
        "testing"
      )

      func TestCountWords(t *testing.T) {
        expected := make(map[string]int)
        expected["A"] = 2
        expected["B"] = 2
        expected["C"] = 2
        expected["D"] = 1
        expected["E"] = 1
        expected["F"] = 1

        text := `A A B B C C D E F`

        result := CountWords(text)

        if reflect.DeepEqual(result, expected) != true {
          t.Fail()
        }

      }

      func TestTop5Words(t *testing.T) {
        expected := []Word{
          Word{Word: "A", Frequency: 5},
          Word{Word: "B", Frequency: 4},
          Word{Word: "C", Frequency: 3},
          Word{Word: "D", Frequency: 2},
          Word{Word: "E", Frequency: 1},
        }

        testMap := make(map[string]int)
        testMap["A"] = 5
        testMap["B"] = 4
        testMap["C"] = 3
        testMap["D"] = 2
        testMap["E"] = 1
        testMap["F"] = 0

        result := Top5Words(testMap)

        for index, char := range expected {
          if char != result[index] {
            t.Fail()
          }
        }

      }

---

👋 Welcome Gophers! In this challenge, you will be tasked with efficiently counting the word frequencies of a large body of text in Go!

You will have to implement a function which keeps track of the number of times a word appears in a body of text and then you will have to implement a further function which returns the top 5 most frequent words from highest to lowest.


<Quiz question="We can rely on the ordering of maps to store a list of the top 5 words, true or false?" answer="False, you will have to rely on another data structure in order to return a list of the top 5 sorted words" correct="A" A="True" B="False" />

# See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 10 - Word Frequencies](https://discuss.tutorialedge.net/t/challenge-10-word-frequencies/29) 

## Further Reading:

If you enjoyed this challenge, you may also enjoy some of the other challenges on this site:

* [Sorting By Price](/challenges/go/sort-by-price/)