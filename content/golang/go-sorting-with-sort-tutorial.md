---
title: Go Sorting With the sort Package - Tutorial
date: 2019-05-26T07:49:44.000+00:00
desc: In this tutorial, we are going to be taking a look at how you can implement
  sorting in your Go applications using the sort package.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.png
tag: Beginner
tags: 
 - beginner
authorImage: https://images.tutorialedge.net/authors/profile.jpeg

---
Sorting items to be in order is something that every programmer will undoubtedly have to do at one point in their career. There are different approaches and many different sorting algorithms available for you to choose from, but typically it is better to rely on already implemented packages to do your sorting for you.

## Goals

By the end of this tutorial, you will know how to:

* Implement basic sorting within your Go applications using the `"sort"` package.
* Implement custom sorting functions that allow you to sort composite data structures

## Prerequisites

In order to complete this tutorial, you will need the following:

* Go v1.11+ installed on your machine
* A text editor in which you can work. I recommend Visual Studio Code for this.

## A Simple Sorting Example

Let's take a look at a really simple sorting application that allows us to sort a variety of arrays.

Create a new file called `main.go` within a new project directory. Within this, we are going to define
an array of `int` elements:

<div class="filename"> main.go</div>

```go
package main

import "fmt"

func main() {
    fmt.Println("Go Sorting Tutorial")
    
    // our unsorted int array
    unsorted := []int{1,3,2,6,3,4}
	fmt.Println(unsorted)
}
```

And we can run this like so:

<div class="filename"> $ go run main.go </div>

```output
Go Sorting Tutorial
[1 3 2 6 3 4]
```

Let's take a look at how we can use the `sort` package to sort this.

<div class="filename"> main.go </div>

```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	fmt.Println("Go Sorting Tutorial")
	
	myInts := []int{1,3,2,6,3,4}
	fmt.Println(myInts)
	
	// we can use the sort.Ints
	sort.Ints(myInts)
	fmt.Println(myInts)
}
```

## Custom Sorting Functions

In this section of the tutorial, we are going to cover how to sort more complex data structures using custom sorting functions.

In order to implement custom sorting functions, we'll have to first define an `array` with the type of the item we would like to sort. 

In this case we'll be sorting an `array` of type `Programmer` which will feature a solitary `Age` field. We will therefore have to define a type `[]Programmer`  which we'll call `byAge` as we'll be sorted by age in this given example. We'll then have to create 3 methods that are built off this type.

* `Len()` - returns the length of the array of items
* `Swap()` - a function which swaps the position of two elements in a sorted array
* `Less()` - a function which returns a `bool` value depending on whether the item at position `i` is less than the item at position `j`.

```go
package main

import (
	"fmt"
	"sort"
)

type Programmer struct {
	Age int 
} 

type byAge []Programmer

func (p byAge) Len() int {
	return len(p)
}

func (p byAge) Swap(i, j int) {
	p[i], p[j] = p[j], p[i]
} 

func (p byAge) Less(i, j int) bool {
	return p[i].Age < p[j].Age
}

func main() {
    programmers := []Programmer{
		Programmer{Age: 30,},
		Programmer{Age: 20,},
		Programmer{Age: 50,},
		Programmer{Age: 1000,},
	}

	sort.Sort(byAge(programmers))

	fmt.Println(programmers)
}
```

When we run this, we should see that our `programmers` array is subsequently sorted based on the respective `Age` field of our `Programmer` struct.

<div class="filename"> $ go run main.go </div>

```output
[{20} {30} {50} {1000}]
```

## Conclusion

Awesome, in this tutorial, we have been able to use the `"sort"` package to help implement sorting in our Go applications.

We have also looked at how we can implement our own custom sorting functions that allow us to sort more complex data structures in our applications.

### Further Reading

If you enjoyed this article, you may also enjoy the following tutorials:

* [Concurrency in Go with goroutines](https://tutorialedge.net/golang/concurrency-with-golang-goroutines/)
