---
author: Elliot Forbes
date: 2018-07-14T22:23:10+01:00
desc:
  In this tutorial we'll look at what functions are in Golang and how you can
  use them in your programs
series: golang
image: golang.png
tags:
  - beginner
title: Go Functions Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 4
---

[![Tutorial Build Status](https://travis-ci.org/TutorialEdge/go-functions-tutorial.svg?branch=master)](https://travis-ci.org/TutorialEdge/go-functions-tutorial)

In this tutorial, we are going to be looking at functions in Golang and hopefully, by
the end of this tutorial, you will have a firm grasp as to what they are and how
you can use them in your own projects.

We'll be covering the following topics within this tutorial:

* The basics on Function Declaration
* Working with multiple return values

At the end of this tutorial, there will be challenges that you can attempt to complete on 
your own working machine that will help to validate what we have covered and give you 
a taste of writing your own functions in Go.

> **Source Code** - The full source code for this repository can be found here: [TutorialEdge/Go-Functions-Tutorial](https://github.com/TutorialEdge/go-functions-tutorial)

# Function Declaration

The first thing we'll need to figure out is, how do you declare a function
within a go program? Now, if you are en experienced programmer then this should
be nothing new to you, if not then don't panic, we'll be covering everything you
need to know in this tutorial.

All functions in Go start off with the `func` keyword which are then followed up
by the name of the function. After the name, we open brackets and define our 
`parameter-list` followed by a very similar looking `result-list`:

```go
func name(parameter-list) (result-list) {
  // the body of our function
}
```

Both the `parameter-list` and the `result-list` can be as long as you like, however it is
generally recommended that you keep these as small as possible to improve things such as
code readability.

> **Capitalization Matters!** If you want your functions to be accessible in other packages
then you will have to make the first letter of your function name Uppercase!

# A Simple Example

Now that we have covered the basic theory, let's see this in practice by defining our own
simple function. 

For this example, we'll be creating a function called `myFunction` which will take in 2
`string` parameters and return a resulting `string` output:

```go
func myfunction(firstName string, lastName string) (string) {
  fullname := firstName + " " + lastName 
  return fullname
}
```

In the first line of our function body, we have created a new variable called `fullname` 
which is the product of our `firstName` variable concatenated with a space `" "` and our 
`lastName` variable. 

Once we have done this concatenation, we then return the `fullname` variable.

## Full Source Code

And the full program would look like this:

```go
package main

import (
	"fmt"
)

func myfunction(firstName string, lastName string) (string) {
  fullname := firstName + " " + lastName 
  return fullname
}

func main() {
	fmt.Println("Hello World")

	fullName := myfunction("Elliot", "Forbes")
	fmt.Println(fullName)
}
```

# Multiple Results From a Function

It's quite often in Go programs that you'll see two results being returned from
a function call. This is typically the result as the first result, and any
potential errors as the second result. 

This practice can be very useful and allows go programmers to decide what to do 
with any errors return within the original function block that calls our function:

```go
package main

import (
	"fmt"
)

func myfunction(firstName string, lastName string) (string, error) {
  return firstName + " " + lastName, nil
}

func main() {
  fmt.Println("Hello World")

  // we can assign the results to multiple variables
  // by defining their names in a comma separated list
  // like so: 
  fullName, err := myfunction("Elliot", "Forbes")
  if err != nil {
    fmt.Println("Handle Error Case")
  }
  fmt.Println(fullName)
}
```

> **Try it Yourself** - Try running this program on your own machine by calling
`go run main.go` and see what the result is.

# Anonymous Functions

Anonymous functions are very similar to regular functions except they lack a
name in their function declaration. These functions can be defined within named 
functions and can have access to any variables within it's enclosing function like so:

```go
package main

import (
  "fmt"
)

func addOne() func() int {
  var x int
  // we define and return an
  // anonymous function which in turn
  // returns an integer value
  return func() int {
    // this anonymous function
    // has access to the x variable
    // defined in the parent function
    x++
    return x + 1
  }
}

func main() {
  myFunc := addOne()
  fmt.Println(myFunc()) // 2
  fmt.Println(myFunc()) // 3
  fmt.Println(myFunc()) // 4
  fmt.Println(myFunc()) // 5
}
```


# Try It Yourself Challenges!

One of the best ways to learn a new concept is to try this out for yourself. In 
order to aide your learning, I have created a branch within the Github repo for this
project which features some failing tests. 

These tests simply ensure that whatever function you define produces the correct
result and can be run by calling `go test ./...` within the root of the project
directory.

Pull the Github repo down locally to your machine and change to the Challenge-01 
branch using the following commands:

```s
$ git clone https://github.com/TutorialEdge/go-functions-tutorial.git
$ git checkout challenge-01
```

> **Challenge-01** - Defining your own Add Function

The aim of this challenge is to define an `Add` function within the `main.go`
file which will take in 2 `int` parameters in the `parameters-list` and return
a single `int` value which equals the sum of the two values.

When you have successfully implemented the `Add` function, try running the tests
to verify what you have done is correct. Upon successful completion, you should see
all tests passing and an output that looks like this:

```s
$ go test ./...
ok      github.com/tutorialedge/go-functions-tutorial   0.005s
```

> **Complete Challenge Code** The complete version of this code can be found here:
[Challenge 01 - Complete](https://github.com/TutorialEdge/go-functions-tutorial/tree/challenge-01-complete)

# Conclusion

So, in this article we managed to cover quite a fair bit on functions within the
go programming language. Hopefully, you found this useful! If you require any
further help or assistance then please feel free to let me know in the comments
section below!

> **Note -** If you want to keep up to date with the latest articles and updates
> on the site then please feel free to follow me on twitter:
> [@Elliot_f](https://twitter.com/elliot_f)

## Further Reading

- [Go Variadic Function Tutorial](/golang/go-variadic-function-tutorial/)
