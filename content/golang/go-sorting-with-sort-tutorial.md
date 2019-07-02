---
title: Go Sorting With the sort Package - Tutorial
date: 2019-05-26T07:49:44.000+00:00
desc: In this tutorial, we are going to be taking a look at how you can implement
  sorting in your Go applications using the sort package.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.png
tags:
- beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg

---
Sorting items to be in order is something that every programmer will undoubtedly have to do at one point in their career. There are different approaches and many different sorting algorithms available for you to choose from, but typically it is better to rely on already implemented packages to do your sorting for you.

# Goals

By the end of this tutorial, you will know how to:

* Implement basic sorting within your Go applications using the `"sort"` package.
* Implement custom sorting functions that allow you to sort composite data structures

# Prerequisites

In order to complete this tutorial, you will need the following:

* Go v1.11+ installed on your machine
* A text editor in which you can work. I recommend Visual Studio Code for this.

# A Simple Sorting Example

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

# Custom Sorting Functions

In this section of the tutorial, we are going to cover how to sort more complex data structures using custom sorting functions.

```go
func (s byLength) Len() int {
    return len(s)
}
func (s byLength) Swap(i, j int) {
    s[i], s[j] = s[j], s[i]
}
func (s byLength) Less(i, j int) bool {
    return len(s[i]) < len(s[j])
}
```

# Conclusion

Awesome, in this tutorial, we have been able to use the `"sort"` package to help implement sorting in our Go applications.

We have also looked at how we can implement our own custom sorting functions that allow us to sort more complex data structures in our applications.

## Further Reading

If you enjoyed this article, you may also enjoy the following tutorials:

* [Concurrency in Go with goroutines](https://tutorialedge.net/golang/concurrency-with-golang-goroutines/)