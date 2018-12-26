---
author: Elliot Forbes
date: 2018-07-14T22:24:26+01:00
desc: In this tutorial, we are going to look at how you can create and use your own Interfaces within the Go Programming Langauge
series: golang
image: golang.png
tags:
- beginner
title: Go Interfaces Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 6
---

Welcome all, in this tutorial, we are going to be taking a look at interfaces within the Go programming language. By the end of this tutorial, you should be well on your way to defining your own interfaces and working with existing ones that are currently out in the wild.

# Basic Example

If you are new to Go, you may be seeing `interface{}` a lot in code snippets and tutorials. This can be fairly daunting seeing this at first if you don't know what interfaces are in Go and what they are used for. 

Typically, if you see a function or a method that expects an empty interface, then you can typically pass anything into this function/method.

Let's see an example of this in action:

```go
package main

import (
	"fmt"
)

func myFunc(a interface{}) {
	fmt.Println(a)
}

func main() {
	var my_age int
	my_age = 25
	
	myFunc(my_age)
}
```

If we then go to run this then we should see that it runs successfully and prints out our integer value:

```s
$ go run main.go
25
```

## Why is this Useful?

By defining a function that takes in an `interface{}`, we essentially give ourselves the flexibility to pass in anything we want. It's a Go programmers way of saying, this function takes in something, but I don't necessarily care about its type. 

# Defining Interfaces

So, what are interfaces? Why do we use them within Go? Well by defining an interface in Go, we essentially define a contract. If we define a type based off this `interface` then we are forced to implement all of the functions or methods defined within that `interface` type.

Say, for example, we wanted to define an interface for a Guitarist. We could define our interface to include a `PlayGuitar()` function like so:

```go
type Guitarist interface {
  // PlayGuitar prints out "Playing Guitar"
  // to the terminal
  PlayGuitar()
}
```

With our `Guitarist` interface defined, we could define a `BaseGuitarist` and an `AcousticGuitarist` struct which implements the `Guitarist` interface.  

```go
package main

import "fmt"

type Guitarist interface {
	// PlayGuitar prints out "Playing Guitar"
	// to the terminal
	PlayGuitar()
}

type BaseGuitarist struct {
	Name string
}

type AcousticGuitarist struct {
	Name string
}

func (b BaseGuitarist) PlayGuitar() {
	fmt.Printf("%s plays the Bass Guitar\n", b.Name)
}

func (b AcousticGuitarist) PlayGuitar() {
	fmt.Printf("%s plays the Acoustic Guitar\n", b.Name)
}

func main() {
	var player BaseGuitarist
	player.Name = "Paul"
	player.PlayGuitar()

	var player2 AcousticGuitarist
	player2.Name = "Ringo"
	player2.PlayGuitar()
}
```

Should we wish, we could then create an array of type `Guitarist` which could store both our `BaseGuitarist` and `AcousticGuitarist` objects.

```go
var guitarists []Guitarist
guitarists = append(guitarists, player)
guitarists = append(guitarists, player2)
```

# Return Values

In real-world examples, we would typically have more complex functions within our interfaces that featured return values. In Go, we can define these interfaces like so:

```go
type Employee interface {
	Name() string
	Language() string
	Age() int
	Random() (string, error)
}
```

# Satisfying Interfaces

Say we wanted to create an array of all `Employee`'s in the firm. Within this array, we'd want all of our `Engineer`s. 

Now, in order for this to work, we'd need our `Engineer` type to satisfy the `Employee` interface or it will not allow us to compile our program: 

```go
package main

type Employee interface {
	Language() string
	Age() int
	Random() (string, error)
}

type Engineer struct {
	Name string
}

func (e *Engineer) Language() string {
	return e.Name + " programs in Go"
}

func main() {
	// This will throw an error
	var programmers []Employee
	elliot := Engineer{Name: "Elliot"}
	// Engineer does not implement the Employee interface
	// you'll need to implement Age() and Random()
	programmers = append(programmers, elliot)
}
```

# Conclusion

So, within this tutorial, we have successfully managed to uncover what interfaces are within Go and how we can implement them within our own Go-based programs. 

Hopefully, you found this tutorial useful and if you did then please let me know in the comments section below!

> **Note -** If you want to keep track of when new Go articles are posted to the site, then please feel free to follow me on twitter for all the latest news: [@Elliot_F](https://twitter.com/elliot_f).