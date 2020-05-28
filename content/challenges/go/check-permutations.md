---
title: "Challenge 08 - Check Permutations"
date: 2020-05-28T21:08:18+01:00
draft: true
desc: In this challenge, you are going to be building a function that takes in two string values and checks to see if they are permutations of each other!
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
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
snippet: |
  package main

  import "fmt"

  func CheckPermutations(str1, str2 string) bool {
    // implement
    return false
  }

  func main() {
    fmt.Println("Check Permutations Challenge")

    str1 := "adcme"
    str2 := "medac"

    isPermutation := CheckPermutations(str1, str2)
    fmt.Println(isPermutation)

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

👋 Welcome Gophers! In this Go challenge, you are going to be implementing a function that takes in two `string` values and checks to see if they are permutations of one another.

# Example

If I have 2 strings, "abc" and "cba", when I pass these strings into the function, it should return `true` as these two strings are permutations of each other. 


<details><summary>Hints</summary>

> You can iterate through all the characters in a string using the `range` keyword in a for loop

```go
// prints out the position and the rune
for pos, char := range str1 {
  fmt.Printf("%d: %c\n", pos, char)
}
```

Start off by building up a map of these `rune` values to the number of occurrences in one for loop and then work from there.

</details>

# See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 08 - Checking Permutations]() 

## Further Reading:

If you enjoyed this challenge, you may also enjoy some of these other challenges:

* [Sorting Flights by Price](/challenges/go/sort-by-price/)
* [Satisfying Interfaces](/challenges/go/interfaces/)