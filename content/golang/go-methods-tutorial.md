---
author: Elliot Forbes
date: 2018-07-14T22:23:10+01:00
desc: In this tutorial we'll look at what methods are in Golang and how you can use
  them in your programs
series:
- golang
tags:
- beginner
draft: true
title: Go methods Tutorial
twitter: https://twitter.com/Elliot_F
weight: 5
---

In this tutorial, we are going to look at what methods are and how they work within the confines of the Go programming language. 

## A Simple Example

```go
package main

import ( "fmt" )

type Person interface {
  UpdateName(string)
  PrintName()
}

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

## Functions Vs Methods

There's a subtle distinction between your traditional functions in Go and your Methods. Methods typically act upon a given object, i.e. `guitarist.Update()` 

```go
func myFunction() {
  fmt.Println("This is a simple function")
}
```

```go
func (e myStruct) myMethod() {
  fmt.Println("This is a simple method")
}
```

## Conclusion

In this tutorial, we learned what methods are and how they differ from functions in go. 

Hopefully, you found this tutorial useful! If you need anything extra, then please feel free to let me know in the comments section below.