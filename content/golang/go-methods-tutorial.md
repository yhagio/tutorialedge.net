---
author: Elliot Forbes
date: 2018-07-14T22:23:10+01:00
desc: In this tutorial we'll look at what methods are in Golang and how you can use
  them in your programs
series: golang
image: golang.png
tags:
- beginner
draft: true
title: Go Methods Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 5
---

In this tutorial, we are going to first of all look at what methods are and how they work within the confines of the Go programming language. We'll then take a look at demystifying the differences between both methods and functions and when you should ideally use them within your Go programs.

# A Simple Example

Let's start off by covering what methods and how we can implement our own in our Go systems. We'll be creating an incredibly simple employee management system that allows you to Update an employees name and print that name out. Not the most exciting of example projects, but it'll serve it's purpose as a means of demonstration.

We'll first of all create a struct of type `Employee` which features one string field, `Name`. 

Next we'll declare an `UpdateName()` and a `PrintName()` method which will allow us to update and print the names of any employees we create. 

```go
package main

import (
	"fmt"
)

type Employee struct {
	Name string
}

func (e *Employee) UpdateName(newName string) {
	e.Name = newName
}

func (e *Employee) PrintName() {
	fmt.Println(e.Name)
}

func main() {
	var employee Employee
	employee.Name = "Elliot"
	employee.UpdateName("Forbsey")
	employee.PrintName()
}

```

> **Note -** One thing you should note when working with methods is that, like functions, they create copies of the arguments passed into it. To avoid this, we can use pointer receivers when defining our methods.

> `func (pointer *Pointer) myMethod()` 

So why do we use methods at all within our Go programs? 

# Functions Vs Methods

Well, there is a subtle distinction between your traditional functions in Go and your Methods. Methods typically act upon a given object, i.e. `guitarist.Update(params)` and using it in this fashion is typically far preferential than doing `UpdateGuitarist(guitarist, params)` when it comes to writing your code.

```go
func UpdateGuitarist(guitarist *Guitarist, params ParamsStruct) {
  fmt.Println("This is a simple function")
}

// Calling this function
UpdateGuitarist(guitarist, params)
```

In the above example, you'll notice that we have to pass in both the guitarist and the parameters we wish to update the guitarist with. However, if we were to implement this same function as a method, it would tend to look cleaner when calling it:

```go
func (g *Guitarist) Update(params ParamsStruct) {
  fmt.Println("This is a simple method")
}

// this is far nicer in my opinion
myGuitarist.Update(params)
```

# Conclusion

In this tutorial, we learned what methods are and how they differ from functions in go. 

Hopefully, you found this tutorial useful! If you need anything extra, then please feel free to let me know in the comments section below.