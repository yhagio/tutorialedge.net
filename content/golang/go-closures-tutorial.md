---
title: "An Introduction to Go Closures - Tutorial"
date: 2018-12-08T13:33:45Z
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
tags:
- intermediate
desc: In this tutorial, we are going to be looking at closures and how you can use them within your own Go applications.
---

In this tutorial, we are going to be looking at closures in Go. We'll be covering the theory behind them, and we'll look at how you can use them in your own Go applications. 

# Closures - The Theory

So, let's dive in the theory. 

We can create and use closures within any programming language that supports functions as first-class object. Go, just so happens to be one such language, otherwise this article would be pointless. 

So, the technical definition for a closure is `a closure is a technique for implementing a lexically scoped name binding in a language with first-class functions - Wikipedia`. 

Now, don't worry, when I first read this I scratched my head a little and had to think things through. 

In layman's terms, a closure is a function value which is able to reference variables that lay outwith it's body. 

> **Note -** It's important to note the distinct differences between both closures and anonymous functions which are commonly mistaken for closures. You can learn more about anonymous functions here: [Go Anonymous Functions](/golang/go-functions-tutorial/#anonymous-functions)

# A Simple Example

Let's create a really simple example of a closure which will hopefully clarify how it works. 

We'll start by creating a really simple function called `getLimit()` which will be our closure in this example. 

This will contain a `limit` variable of type `int` which will be set to `10`. Every time `limit()` is called

```go
package main

import "fmt"

func getLimit() func() int {
	limit := 10
	return func() int {
		limit -= 1
		return limit
	}
}

func main() {
	limit := getLimit()
	fmt.Println(limit())
	fmt.Println(limit())
}

```

Now, if we run this, we should see the following output:

```s
$ go run main.go
9
8
```

But why is this important? Well, this `limit` variable is bound to its assigned `limit`. If we were to bind `getLimit()` to say, `limit2` just below it, it would have a state that is unique to it:

```go
package main

import "fmt"

func getLimit() func() int {
	limit := 10
	return func() int {
		limit -= 1
		return limit
	}
}

func main() {
	limit := getLimit()
	fmt.Println(limit()) // 9
	fmt.Println(limit()) // 8

	limit2 := getLimit()
	fmt.Println(limit2()) // 9
	fmt.Println(limit2()) // 8

	fmt.Println(limit()) // 7

}
```

When we run this, we should see the following output:

```s
$ go run main.go
9
8
9
8
7
```

Awesome, so we've just successfully created our own instance of a `closure` in Go. 

# Conclusion

So, in this tutorial, we covered the basic theory of closures and how you can use them within your own Go programs. 

Hopefully, you found this tutorial useful, if you did, or if you have any feedback/suggestions, I would love to hear them in the comments/suggestions section below!

> **Note -** If you want to keep track of when new Go articles are posted to the site, then please feel free to follow me on twitter for all the latest news: [@Elliot_F](https://twitter.com/elliot_f).

## Further Reading

* [Go Variadic Functions](/golang/go-variadic-function-tutorial/)


