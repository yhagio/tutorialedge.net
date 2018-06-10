+++
date = "2017-04-09T21:06:27+01:00"
title = "Concurrency With Golang Goroutines"
draft = true
desc = "In this tutorial we examine how we can build concurrent highly performant go programs using goroutines."
series = [ "golang" ]
tags = ["golang", "concurrency"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"

+++

Go is an incredibly performant language that features a hell of a lot of great features that allow you to build incredibly fast applications. It redefines what it means to build concurrent programs by offering what are called goroutines and channels. Using goroutines is a very quick way to turn what would be a sequential program into a concurrent program without having to worry about things like creating threads or thread-pools.

## What Are Goroutines?

So to begin with, what are Goroutines? Goroutines are incredibly lightweight “threads” managed by the go runtime. They enable us to create asynchronous parallel programs that can execute some tasks far quicker than if they were written in a sequential manner.  

> Goroutines are far smaller that threads, they typically take around 2kB of stack space to initialize compared to a thread which takes 1Mb.

Goroutines are typically multiplexed onto a very small number of OS threads which typically mean concurrent go programs require far less resources in order to provide the same level of performance as languages such as Java. Creating a thousand goroutines would typically require one or two OS threads at most, whereas if we were to do the same thing in java it would require 1,000 full threads each taking a minimum of 1Mb of Heap space.

By mapping hundreds or thousands of goroutines onto a single thread we don’t have to worry about the performance hit when creating and destroying threads in our application. It’s incredibly in-expensive to create and destroy new goroutines due to their size and the efficient way that go handles them.

## A Simple Sequential Program

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

If you execute the code above you should see that it prints 0 to 9 twice in a row. Total execution time for this sequential program is just over 20 seconds.

## Making our Program Asynchronous

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
  
	var input string
	fmt.Scanln(&input)


}
```

The only thing we needed to change to our existing sequential go program was to add the ‘go’ keyword in front of our compute function invocation. Here we’ve essentially created two separate goroutines that should now execute in parallel. 

Try executing this in your browser and you should see 0,0,1,1,2,2… and so on up till ..9,9 print out in our console. And if you time this program’s execution then we are suddenly down to roughly 10 seconds.