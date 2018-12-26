---
author: Elliot Forbes
date: 2017-04-09T21:06:27+01:00
desc: In this tutorial we examine how we can build concurrent highly performant go
  programs using goroutines.
series: golang
image: golang.png
tags:
- concurrency
title: Concurrency With Golang Goroutines
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 22
---

Welcome all! In this tutorial, we are going to be looking at how you can use `goroutines` within you Go based programs and subsequently improve the performance with which your programs execute. 

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/ARHXmR0_MGY?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="640" height="360" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

# Introduction

Now, Go is an incredibly performant language that features a hell of a lot of great features that allow you to build incredibly fast applications. It redefines what it means to build concurrent programs by providing us with these `goroutines` and `channels`.

Using goroutines is a very quick way to turn what would be a sequential program into a concurrent program without having to worry about things like creating threads or thread-pools. But, as with all concurrent programming, this comes with some dangers that must be considered before you run around slapping the `go` keyword in front of all your function calls.

# What Are Goroutines?

So to begin with, what are Goroutines? Goroutines are incredibly lightweight “threads” managed by the go runtime. They enable us to create asynchronous parallel programs that can execute some tasks far quicker than if they were written in a sequential manner.  

> Goroutines are far smaller that threads, they typically take around 2kB of stack space to initialize compared to a thread which takes 1Mb.

Goroutines are typically multiplexed onto a very small number of OS threads which typically mean concurrent go programs require far less resources in order to provide the same level of performance as languages such as Java. Creating a thousand goroutines would typically require one or two OS threads at most, whereas if we were to do the same thing in java it would require 1,000 full threads each taking a minimum of 1Mb of Heap space.

By mapping hundreds or thousands of goroutines onto a single thread we don’t have to worry about the performance hit when creating and destroying threads in our application. It’s incredibly in-expensive to create and destroy new goroutines due to their size and the efficient way that go handles them.

# A Simple Sequential Program

As a means of demonstration, we’ll create a function that takes in an int value and prints a number to the console **n** times. We’ll also add a sleep function which will wait for a second before printing the second number:


```go
package main


import (
	"fmt"
	"time"
)


// a very simple function that we'll
// make asynchronous later on
func compute(value int) {
	for i := 0; i < value; i++ {
		time.Sleep(time.Second)
		fmt.Println(i)
	}
}

func main() {
	fmt.Println("Goroutine Tutorial")

  // sequential execution of our compute function 
	compute(10)
	compute(10)

  // we scan fmt for input and print that to our console
	var input string
	fmt.Scanln(&input)

}
```

If you execute the code above you should see that it prints 0 to 9 twice in a row. Total execution time for this sequential program is just over 20 seconds. The reason for our addition of `fmt.Scanln()` is so that our `main` function doesn't finish before our `goroutines` get a chance to execute.

# Making our Program Asynchronous

If we aren’t fussed about the order in which our program prints out the values 0 to **n** then we can speed this program up by using goroutines and making it asynchronous.

```go
package main


import (
	"fmt"
	"time"
)

// notice we've not changed anything in this function 
// when compared to our previous sequential program
func compute(value int) {
	for i := 0; i < value; i++ {
		time.Sleep(time.Second)
		fmt.Println(i)
	}
}

func main() {
	fmt.Println("Goroutine Tutorial")

  // notice how we've added the 'go' keyword 
  // in front of both our compute function calls
	go compute(10)
	go compute(10)
}
```

The only thing we needed to change to our existing sequential go program was to add the ‘go’ keyword in front of our compute function invocation. Here we’ve essentially created two separate goroutines that should now execute in parallel. 

But, if you try and run this program, you'll notice that it completes without printing out our expected output. 

Why is this? 

Well, this is because our `main` function completed before our asynchronous functions could execute and as such, any goroutines that have yet to complete are promptly terminated.

In order to get around this, we can add a call to `fmt.Scanln()` so that our program waits for keyboard input before it kills off our poor goroutines: 

```go
package main


import (
	"fmt"
	"time"
)

// notice we've not changed anything in this function 
// when compared to our previous sequential program
func compute(value int) {
	for i := 0; i < value; i++ {
		time.Sleep(time.Second)
		fmt.Println(i)
	}
}

func main() {
	fmt.Println("Goroutine Tutorial")

  // notice how we've added the 'go' keyword 
  // in front of both our compute function calls
	go compute(10)
	go compute(10)
	
	var input string
	fmt.Scanln(&input)
}
```

Try executing this in your terminal and you should see 0,0,1,1,2,2… and so on up till ..9,9 print out in our console. And if you time this program’s execution then we are suddenly down to roughly 10 seconds.

# Anonymous Goroutine Functions

In the previous example, we looked at how you could make a named function concurrent using the `go` keyword. But, it just so happens that we can use the `go` keyword to make our anonymous functions concurrent as well:

```go
package main

import "fmt"

func main() {
	// we make our anonymous function concurrent using `go`
	go func() {
		fmt.Println("Executing my Concurrent anonymouse function")
	}()

	fmt.Scanln()
}
```

# Conclusion

So, in this tutorial, we learned how we can get started developing concurrent applications in Go. We looked at what Goroutines are and how we can use them to speed up various parts of our systems and create performant applications.

Hopefully, you found this tutorial useful, if you did then please let me know in the comments section below!