---
title: "Challenge 22 - Largest Pandigital Prime"
date: 2020-06-09T20:36:23+01:00
desc: In this challenge, you will be tasked with implementing a function that returns the largest possible pandigital prime number.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series:
  - go-challenges
tags:
  - "Math"
language: go
difficulty: Medium
image: golang.svg
weight: 22
tags:
  - "Math"
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
    package main

    import "fmt"

    func LargestPandigitalPrime() int {
        // Implement me! :)
        return 0
    }

    func main() {
        fmt.Println("Pandigital Primes")

        pandigitalPrime := LargestPandigitalPrime()
        fmt.Println(pandigitalPrime)
    }
tests:
  - name: main_test
    test: TestLargestPandigitalPrime
    code: |
        package main

        import (
            "fmt"
            "testing"
        )

        func TestLargestPandigitalPrime(t *testing.T) {
            expected := 7652413
            result := LargestPandigitalPrime()

            if expected != result {
                fmt.Println("Function does not return correct result")
                t.Fail()
            }
        }

---

> **Problem Attribution** - This challenge was inspired by Problem 41 on [Project Euler](https://projecteuler.net/problem=41) 

👋 Welcome Gophers! In this challenge, you are tasked with implementing the `LargestPandigitalPrime` function which will return the largest possible pandigital prime number.

## Pandigital Primes

An n-digit number is pandigital if it makes use of all the digits `1 to n` exactly ones.

```go
pandigital := LargestPandigitalPrime() // returns largest pandigital prime  
```

## See the Solution

Feel free to have a look at the forum discussion thread for this challenge and contribute with your own solutions here - [Challenge 22 - Pandigital Primes](https://discuss.tutorialedge.net/t/challenge-22-largest-pandigital-prime/70) 


### Further Reading:

If you enjoyed this challenge, you may also like some of the other challenges on the site!

* [Implementing a Stack](/challenges/go/implementing-a-stack/)
* [Implementing a Queue](/challenges/go/implementing-a-queue/)