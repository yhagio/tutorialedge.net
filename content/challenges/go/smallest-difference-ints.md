---
title: "Challenge 13 - Smallest Difference between Ints"
date: 2020-06-03T19:55:24+01:00
desc: In this challenge, you are tasked with finding the smallest possible difference between 2 int slices.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
weight: 13
series: 
  - go-challenges
image: golang.svg 
difficulty: Medium
tags:
  - "Math"
language: go
layout: challenge
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
  package main

  import "fmt"

  func CalcSmallestDifference(arr1, arr2 []int) int {
    return 0
  }

  func main() {
    fmt.Println("Smallest Difference Challenge")

    arr1 := []int{9, 8, 7, 6}
    arr2 := []int{7, 3, 2, 5}

    smallestDiff := CalcSmallestDifference(arr1, arr2)
    fmt.Println(smallestDiff)
  }
tests:
  - name: main_test
    test: TestSmallestDifference
    code: |
      package main

      import "testing"

      func TestCalcSmallestDifference(t *testing.T) {
        expected := 2
        arr1 := []int{1, 2, 3}
        arr2 := []int{5, 6, 7}

        result := CalcSmallestDifference(arr1, arr2)

        if result != expected {
          t.Fail()
        }
      }

      func TestCalcSmallestDiff2(t *testing.T) {
        expected := 3
        arr1 := []int{1, 2, 3}
        arr2 := []int{6, 6, 7}

        result := CalcSmallestDifference(arr1, arr2)

        if result != expected {
          t.Fail()
        }
      }
  - name: main_test
    test: TestSmallestDifference2
    code: |
      package main

      import "testing"

      func TestCalcSmallestDifference(t *testing.T) {
        expected := 2
        arr1 := []int{1, 2, 3}
        arr2 := []int{5, 6, 7}

        result := CalcSmallestDifference(arr1, arr2)

        if result != expected {
          t.Fail()
        }
      }

      func TestCalcSmallestDiff2(t *testing.T) {
        expected := 3
        arr1 := []int{1, 2, 3}
        arr2 := []int{6, 6, 7}

        result := CalcSmallestDifference(arr1, arr2)

        if result != expected {
          t.Fail()
        }
      }


---

👋 Welcome Gophers! In this challenge, you are tasked with finding the smallest difference between two slices of `int` values.

> Example: Let's say I have 2 int arrays; [1, 2] and [4, 5]. The function should return the smallest difference which would be the difference between `2` and `4`.

## See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 13 - Smallest Difference](https://discuss.tutorialedge.net/t/challenge-13-smallest-difference/34) 

### Further Reading:

If you enjoyed this challenge, you may also enjoy some of the other challenges on this site:

* [Sorting By Price](/challenges/go/sort-by-price/)