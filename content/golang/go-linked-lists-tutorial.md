---
title: "Linked Lists in Go - Tutorial"
date: 2019-01-21T19:07:28Z
desc: In this tutorial, we are going to have a look at how you can work with Linked Lists in the Go programming language
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
tags:
  - beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this tutorial, we are going to be taking a look at how you can create and work with linked lists in Go.

Linked lists are a very useful data structure in computer science that can be used for a wide variety of different tasks. They are also heavily used within programming interview questions, so a good knowledge of how they work and how you can create one in Go is vital if you want to land a new job!

# The container/list package

Thankfully, in Go, we have a handy linked list structure already implemented for us and ready to use in the shape of the container/list package - [container/list](https://golang.org/pkg/container/list/)

# Defining a Linked List Struct

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
    mylist := mylist.PushBack(1)
    mylist := mylist.PushFront(2)
    // we now have a linked list with '1' at the back of the list
    // and '2' at the front of the list.
}
```

In this instance, we are creating a linked list of integers, but we could change the type of Value to be anything we want such as another struct type. For now though, we are keeping it nice and simple. 

# Iterating a Linked List in Go

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
    mylist := mylist.PushBack(1)
    mylist := mylist.PushFront(2)

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

# Conclusion

This was a very quick and simple introduction showing you how you can create and work with linked lists in Go. 
