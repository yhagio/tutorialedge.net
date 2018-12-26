---
title: "Go Variadic Function Tutorial"
date: 2018-12-06T21:38:44Z
desc: In this tutorial, we are going to look at variadic functions in Go and how you can use them within your own Go applications
series: golang
tags:
- intermediate
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> **Note -** This tutorial is a follow on from my previous article on regular functions in go: [Go Functions Tutorial](/golang/go-functions-tutorial/)

In this tutorial, we are going to be looking at `Variadic Functions` in Go. We'll be covering how to implement and how to use these functions within your own Go applications.

# Variadic Functions

There are times, when we do not know how many string arguments we will require for our functions. This is where `variadic functions` come into play. 

Variadic functions allow us to define functions that take in an arbitrary number of arguments. This prevents us having to code against every possible variation of input length and this concept transfers across a wide number of different languages such as Python and in Java.

```go
package main

import ( 
  "fmt"
)

func myVariadicFunction(args ...string) {
  fmt.Println(args)
}

func main() {
  myVariadicFunction("hello", "world")
}
```

If we attempt to run this, we should see that our call to `fmt.Println()` will print an array of strings that include both `Hello` and `world`.

```s
$ go run main.go
[hello world]
```

> **Note -** Variadic Functions are not limited to strings, we can use any variation of composite or basic types. 

# Production Examples

Let's have a look at an example of this in production Go code. `Println()` is a great example of a variadic function which is possibly the most well known. 

```go
// Println formats using the default formats for its operands and writes to standard output.
// Spaces are always added between operands and a newline is appended.
// It returns the number of bytes written and any write error encountered.
func Println(a ...interface{}) (n int, err error) {
	return Fprintln(os.Stdout, a...)
}
```

> **Note -** This example takes in an arbitrary number of `interface{}` arguments.  

# Conclusion

So, in this tutorial, we managed to successfully cover variadic functions in Go. We covered, what they are and how they can be used for fame and fortune within your own Go programs.

If you enjoyed this tutorial, or have any suggestions, I would love to hear them in the suggestions/comments section below!

> **Note -** If you want to keep up to date with the latest articles and updates on the site then please feel free to follow me on twitter: [@Elliot_f](https://twitter.com/elliot_f)