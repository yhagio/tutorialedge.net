---
author: Elliot Forbes
date: 2018-07-14T22:23:10+01:00
desc: In this tutorial we'll look at what functions are in Golang and how you can
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

In this tutorial, we are going to be looking at Go's functions and hopefully, by the end of this tutorial, you will have a firm grasp as to what they are and how you can use them in your own projects.

So, to make this interesting, we are going to be building a program a really simple command-line interface tool that we can extend to our hearts content. 

# Function Declaration

The first thing we'll need to figure out is, how do you declare a function within a go program? Now, if you are en experienced programmer then this should be nothing new to you. We start off by using the `func` keyword and then specifying the name of the our function. 

Once we've specified the name we'll want to specify our parameter list, essentially what parameters we wish to pass into this function. If we don't wish to pass any parameters into the function then we just use empty parenthesis. 

It's after we define our parameter list that things start to deviate from the norm. Just after the parameter list, we define the result list that is returned whenever someone calls our function.

```go
func name(parameter-list) (result-list) {
  body
}
```

So how does this look in a real go program? 

```go
func myfunction(firstName string, lastName string) (string) {
  return firstName + " " + lastName
}
```

And the full program would look like this:

```go
package main

import (
	"fmt"
)

func myfunction(firstName string, lastName string) (string) {
	return firstName + " " + lastName
}

func main() {
	fmt.Println("Hello World")

	fullName := myfunction("Elliot", "Forbes")
	fmt.Println(fullName)
}
```

It's quite often in Go programs that you'll see two results being returned from a function call. This is typically the result as the first result and any potential errors as the second result. This practice can be very useful and allows go programmers to decide what to do with an error within the original function block that called out to a second function:

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

	fullName, err := myfunction("Elliot", "Forbes")
	if err != nil {
		fmt.Println("Handle Error Case")
	}
	fmt.Println(fullName)
}
```

# Anonymous Functions

If you come from a Python background, you may be comfortable with anonymous functions, however, if you aren't then fear not! 

Anonymous functions are very similar to regular functions except they lack a named identifier. These functions can be defined within named functions and can have access to any variables within it's enclosing function like so:

```go
package main 

import (
  "fmt"
)

func addOne() func() int {
  var x int
  return func() int {
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

# Conclusion

So, in this article we managed to cover quite a fair bit on functions within the go programming language. Hopefully, you found this useful! If you require any further help or assistance then please feel free to let me know in the comments section below!

> **Note -** If you want to keep up to date with the latest articles and updates on the site then please feel free to follow me on twitter: [@Elliot_f](https://twitter.com/elliot_f)

## Further Reading

* [Go Variadic Function Tutorial](/golang/go-variadic-function-tutorial/)
