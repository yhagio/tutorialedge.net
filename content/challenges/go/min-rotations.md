---
title: "Challenge 18 - Min Rotations"
date: 2020-06-09T20:36:23+01:00
desc: In this challenge, you will be tasked with finding how many rotations an ordered slice has undergone.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series:
  - go-challenges
tags:
  - go
language: go
difficulty: Medium
image: golang.svg
weight: 18
tags:
- beginner
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
  package main

  import "fmt"

  func MinRotations(array []int) int {
    // Implement me :)
    return 0
  }

  func main() {
    fmt.Println("Min Rotation Challenge")

    testArr := []int{15, 18, 2, 3, 6, 12}
    min := MinRotations(testArr) // returns 2
    fmt.Println(min)

    testArr2 := []int{7, 9, 11, 12, 5}
    min2 := MinRotations(testArr2) // return 4
    fmt.Println(min2)

  }
tests:
  - name: main_test
    test: TestMinRotations
    code: |
      package main

      import (
        "testing"
      )

      func TestMinRotations(t *testing.T) {
        output := MinRotations([]int{1, 2, 3, 4, 5})
        if output != 0 {
          t.Fail()
        }
        output = MinRotations([]int{2, 3, 4, 5, 1})
        if output != 4 {
          t.Fail()
        }
        output = MinRotations([]int{3, 4, 5, 1, 2})
        if output != 3 {
          t.Fail()
        }
        output = MinRotations([]int{4, 5, 1, 2, 3})
        if output != 2 {
          t.Fail()
        }
        output = MinRotations([]int{5, 1, 2, 3, 4})
        if output != 1 {
          t.Fail()
        }
      }


---

👋 Welcome Gophers! In this challenge, you will be tasked with finding out how many rotations an ordered `int` slice has undergone and shifted by.

## Examples:

```go
arr := []int{1, 2, 3, 4, 5}
MinRotations(arr) // returns 2

arr := []int{3, 4, 5, 1, 2}
MinRotations(arr) // returns 3
```

# See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 18 - Minimum Rotations](https://discuss.tutorialedge.net/t/challenge-18-minimum-rotations/40) 

## Further Reading:

If you enjoyed this challenge, you may also enjoy some of the other challenges on this site:

* [Sets and Subsets](/challenges/go/sets-and-subsets/)
* [Linked List](/challenges/go/linked-list/)