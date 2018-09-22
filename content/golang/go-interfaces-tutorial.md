---
author: Elliot Forbes
date: 2018-07-14T22:24:26+01:00
desc: In this tutorial, we are going to look at how you can create and use your own
	Interfaces within the Go Programming Langauge
draft: true
series:
- golang
tags:
- beginners
title: Go Interfaces Tutorial
twitter: https://twitter.com/Elliot_F
weight: 6
---

Welcome all, in this tutorial, we are going to be taking a look at interfaces within the Go programming language. By the end of this tutorial, you should be well on your way to defining your own interfaces and working with existing ones that are currently out in the wild.

## Interfaces

So, what are interfaces? Why do we use them within Go? Well by defining an interface in Go, we essentially define a contract. 

Say, for example, we wanted to define an interface for a Guitarist. We could define our interface to include a `PlayGuitar()` function like so:

```go
type Guitarist interface {
  // PlayGuitar prints out "Playing Guitar"
  // to the terminal
  PlayGuitar()
}
```

With

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


## Conclusion

So, within this tutorial, we have successfully managed to uncover what interfaces are within Go and how they work. Hopefully, you found this tutorial useful and if you did then please let me know in the comments section below!