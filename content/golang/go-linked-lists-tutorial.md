---
title: "Linked Lists in Go - Tutorial"
date: 2019-01-21T19:07:28Z
desc: In this tutorial, we are going to have a look at how you can work with Linked Lists in the Go programming language
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
tag: Beginner
tags: 
 - beginner
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

In this tutorial, we are going to be taking a look at how you can create and work with linked lists in Go.

Linked lists are a very useful data structure in computer science that can be used for a wide variety of different tasks. They are also heavily used within programming interview questions, so a good knowledge of how they work and how you can create one in Go is vital if you want to land a new job!

## The container/list package

Thankfully, in Go, we have a handy linked list structure already implemented for us and ready to use in the shape of the container/list package - [container/list](https://golang.org/pkg/container/list/).

This incredibly handy package includes a number of different but helpful methods on the list structure that it exposes that allow us to easily query our linked list and iterate over it with minimal fuss.

In this tutorial, we'll look at how you can define your own linked lists and then cover some of the methods that you can use to make life easier when working with these linked lists.

## Defining a Linked List Struct

Let's first take a look at how we can define a linked list in Go.

<div class="filename"> main.go </div>

```go
package main

import (
    "fmt"
    "container/list"
)

func main() {
    fmt.Println("Go Linked Lists Tutorial")
    mylist := list.New()
    mylist.PushBack(1)
    mylist.PushFront(2)
    // we now have a linked list with '1' at the back of the list
    // and '2' at the front of the list.
}
```

In this instance, we are creating a linked list of integers, but we could change the type of Value to be anything we want such as another struct type. For now though, we are keeping it nice and simple. 

## Iterating a Linked List in Go

There a few potential ways to iterate over a linked list such as this in Go. The most straightforward way is to process the first node in the linked list, and then use a for loop to iterate over the remainder of the linked list checking to see if the Next node is nil like so:

<div class="filename"> main.go </div>

```go
package main

import (
    "fmt"
    "container/list"
)

func main() {
    fmt.Println("Go Linked Lists Tutorial")
	
    mylist := list.New()
    mylist.PushBack(1)
    mylist.PushFront(2)

    for element := mylist.Front(); element != nil; element = element.Next() {
	// do something with element.Value
	fmt.Println(element.Value)
    }

}
```

When you run this, you should see that it prints out all of the values defined within each of the nodes in our linked list.

<div class="filename"> $ go run main.go </div>

```output
Go Linked Lists Tutorial
2
1
```

## Populating a Linked List

When it comes to populating a linked list we have a number of methods to choose from. We've already seen the PushBack and PushFront methods in the previous code snippet. These do the job of inserting a new element into our linked list at either the front or the back of said list.

<div class="filename"> main.go </div>

```go

mylist.PushBack(1)

mylist.PushFront(1)

mylist.InsertAfter

```

## Removing Elements from a Linked List

When it comes to deleting an element from a linked list, there is yet another method available to us which makes our life a breeze. This method is the aptly named Remove() method!

<div class="filename"> main.go </div>

```go

element := mylist.Front()
mylist.Remove(element)

```

The Remove function takes in a pointer to an element within the list, and we can use it in handy situations where we want to say filter out elements that don't meet a certain threshold within our linked list:

<div class="filename"> main.go </div>

```go
package main

import (
	"fmt"
	"container/list"
)


func main() {

	mylist := list.New()
	mylist.PushBack(1)
	mylist.PushFront(2)
	
	for element := mylist.Front(); element != nil; element = element.Next() {
		// do something with element.Value
		if element.Value != 1 {
			mylist.Remove(element)
		}
	}
	
	for element := mylist.Front(); element != nil; element = element.Next() {
		// do something with element.Value
		fmt.Println(element.Value)
	}

}
```

When we run this, we should see that the second for loop only prints out 1 and we have successfully filter our linked list for elements that meet a certain criteria!

## Conclusion

Awesome, so in this tutorial, we looked at how you can work with linked lists in Go. We covered defining linked lists, and then we covered various ways you could intereact with you linked lists. 

### Further Reading:

If you enjoyed this tutorial or found it useful then you may also enjoy these other articles:

* [Go Maps Tutorial](https://tutorialedge.net/golang/go-maps-tutorial/)
