---
title: "Challenge 12 - Armstrong Numbers"
date: 2020-06-02T18:12:42+01:00
desc: In thie challenge, you are tasked with checking to see if a number is an Armstrong number in Go!
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
weight: 12
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

  type MyInt int

  // IsArmstrong checks to see if a number is
  // indeed an armstrong number and returns a
  // bool
  func (n *MyInt) IsArmstrong() bool {
    return false
  }

  func main() {
    fmt.Println("Armstrong Numbers")

    var num1 MyInt = 371
    fmt.Println(num1.IsArmstrong())
  }
tests:
  - name: main_test
    test: TestIsArmstrong
    code: |
      package main

      import "testing"

      func TestIsArmstrong(t *testing.T) {
        var armstrong MyInt = 371
        result := armstrong.IsArmstrong()

        if result != true {
          t.Fail()
        }
      }

      func TestIsArmstrongNegative(t *testing.T) {
        var armstrong MyInt = 372
        result := armstrong.IsArmstrong()

        if result != false {
          t.Fail()
        }
      }

  - name: main_test
    test: TestIsArmstrongNegative
    code: |
      package main

      import "testing"

      func TestIsArmstrong(t *testing.T) {
        var armstrong MyInt = 371
        result := armstrong.IsArmstrong()

        if result != true {
          t.Fail()
        }
      }

      func TestIsArmstrongNegative(t *testing.T) {
        var armstrong MyInt = 372
        result := armstrong.IsArmstrong()

        if result != false {
          t.Fail()
        }
      }

---

👋 Welcome Gophers! In this challenge, you are tasked with implementing a function that checks to see whether a number is an armstrong number.

# Armstrong Numbers

> Armstrong Numbers - An Armstrong number is a 3-digit number such that each of the sum of the cubes of its digits equal the number itself:

![Armstrong Number](https://images.tutorialedge.net/challenges/armstrong.png)

<Quiz question="Can we define a method with a pointer receiver to an int type?" answer="No, if you wish to extend any type that is not local to your package then you will have to define an alias type - type ExtendedType T" correct="B" A="Yes" B="No" C="I Don't Know" />

# See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 12 - Armstrong Numbers](https://discuss.tutorialedge.net/t/challenge-12-armstrong-numbers/32) 

## Further Reading:

If you enjoyed this challenge, you may also enjoy some of the other challenges on this site:

* [Sorting By Price](/challenges/go/sort-by-price/)