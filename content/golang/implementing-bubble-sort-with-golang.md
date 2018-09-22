---
author: Elliot Forbes
date: 2017-04-15T08:34:43+01:00
desc: This tutorial demonstrates how one can implement their own version of bubble
  sort using the golang programming language
series:
- golang
tags:
- misc
title: Implementing the Bubble Sort Algorithm using Golang
twitter: https://twitter.com/Elliot_F
---

## What Is Bubble Sort?

Bubble sort is a sorting algorithm that sequentially goes through an array n times. Each time the algorithm runs through our array, it looks at the first element and then the second element, if the first element is larger than the second element then it swaps them, it then proceeds through the entire list performing this action.

## Time Complexity

The time complexity for this algorithm is O(n^2) where n is the number of items being sorted. An example of a worst case scenario would be:

```go
[9,8,7,6,5,4,3,2,1,0]
```

In this case the entire array is backwards and as a result the bubble sorting algorithm would take 10 complete iterations through the array in order to sort this array.

*Best Case Scenario* - In the best case scenario the time complexity is O(n) where n is the number of items being sorted.

## Implementation

Go provides a very cool swapping mechanism using tuple assignment. We'll create a swapped boolean flag which will indicate whether our list is fully sorted. We'll then iterate through our list 10 times and check to see if the nth element is larger than the n+1th element. If it is we'll swap it using tuple assignment.

```go
package main

import (
    "fmt"
)

var toBeSorted [10]int = [10]int{1,3,2,4,8,6,7,2,3,0}

func bubbleSort(input [10]int) {
    // n is the number of items in our list
    n := 10
    swapped := true
    for swapped {
        swapped = false
        for i := 1; i < n-1; i++ {
            if input[i-1] > input[i] {
                fmt.Println("Swapping")
                // swap values using Go's tuple assignment
                input[i], input[i-1] = input[i-1], input[i]
                swapped = true
            }
        }
    }
    fmt.Println(input)
}


func main() {
    fmt.Println("Hello World")
    bubbleSort(toBeSorted)
    
}
```