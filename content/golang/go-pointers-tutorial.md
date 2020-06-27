---
title: "Go Pointers Tutorial"
date: 2019-11-30T11:56:56Z
desc:  In this tutorial, we are going to be covering pointers in Go and how you can use them within your own Go programs. We'll be covering the best practices and we'll be covering some of the most common use-cases for pointers.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
tag: Beginner
tags: 
 - beginner
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

In this tutorial, we are going to be covering pointers in Go and how you can use them within your own Go programs. We'll be covering the best practices and we'll be covering some of the most common use-cases for pointers.

By the end of this tutorial, you will have a solid understanding of pointers and how they can be used.

# Introduction

In Go, when we call a function and pass in a bunch of arguments to that function, the language creates copies of the arguments which are then used within said function. For example:

<div class="filename"> main.go </div>

```go
package main

import "fmt"

func myTestFunc(a int) {
    a += 3
    fmt.Println(a)
}

func main() {
    a := 2
    myTestFunc(a)
    fmt.Println(a) // prints out 2
}
```

In the above code, `myTestFunc` takes in an integer variable and makes a copy of it for use within the context of the function body. Any changes we make to `a` within `myTestFunc` will only persist inside the body of the `myTestFunc` function.

Now, say we wanted to call `myTestFunc` and update the original `a` variable and add 3 to it? 

In this particular instance, we could change the function signature so that it takes in a pointer as opposed to a reference. This would then mean that any changes we make to `a` within the `myTestFunc` function would be done against the **original** variable and not against a copy!

<div class="filename"> main.go </div>

```go
package main

import "fmt"

func myTestFunc(a *int) {
    a += 3
    fmt.Println(a)
}

func main() {
    a := 2
    myTestFunc(a)
    fmt.Println(a) // prints out 5
}

```

When we run the above code, we should see that `myTestFunc` has correctly updated the original value of `a` and added 3:

<div class="filename"> $ go run main.go </div>

```output
5
5
```

# Defining Pointers

Let's now take a step back and looks at the fundamentals of working with pointers. 

We'll start by looking at how we can define pointers within our Go code. In order to define a pointer, we can use the `*` symbol at the point at which we are declaring the variable and it will turn the variable into a `pointer` variable. 

<div class="filename"> main.go </div>

```go
package main

import "fmt"

func main() {
    var age *int

    fmt.Println(age)
    fmt.Println(&age)
}
```

When we attempt to run this? We should see the following:

<div class="filename"> $ go run main.go </div>

```output
<nil>
0xc00000e018
```

The first value represents the value of our pointer variable `age`. The second represents the address of this variable.

## Assigning Values to Pointers

> **Question** - What happens if you try and assign a value to age?

As it stands, our `age` variable is `nil`. Let's attempt to set it to `26` and see what happens:

<div class="filename"> main.go </div>

```go 
package main

import "fmt"

func main() {
    var age *int

    *age = 26

    fmt.Println(age)
    fmt.Println(&age)
}
```

This will actually cause the compiler to panic.  

<div class="filename"> $ go run main.go </div>

```output
panic: runtime error: invalid memory address or nil pointer dereference
[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x1092f6e]

goroutine 1 [running]:
main.main()
        /Users/elliot/Documents/Projects/TutorialEdge/Projects/Go/go-pointers-tutorial/main.go:8 +0x3e
exit status 2
```

The reason for this is that we need to use the built-in function `new` in order to allocate enough memory to fit a value of type int. Let's see this in action now:

<div class="filename"> main.go </div>

```go
package main

import "fmt"

func main() {
    var age *int
	age = new(int)
	*age = 26

    fmt.Println(*age)
    fmt.Println(&age)
}
```

> **Important Note** - We can eliminate the first line of our main function in the above example and modify `age = new(int)` to be `age := new(int)` should we wish to be a little more succinct.

## Nullability

> **Important Note** - A big advantage of using pointers within your Go code is that they are nullable. 

If we have a function that has a `pointer` return value, we can take advantage of the fact that pointers are nullable. 

Take for instance this first function:

```go
func testFunc(id string) (Guitarist, error) {
    result, err := getSongs(id)
    if err != nil {
        return Guitarist{}, err
    }

    return result, nil
}
```

In the above code, we have had to populate an empty `Guitarist{}` struct in order to return the error. However, if we were to define this function with a pointer return value then we could simplify the above code like so:

```go
func testFunc(id string) (*Guitarist, error) {
    result, err := getSongs(id)
    if err != nil {
        return nil, err
    }

    return result, nil
}
```

# Passing Variables

When teaching Go, I often see developers stumble over how they pass pointer variables to functions that take a value receiver. Let's see an example of this:

<div class="filename"> main.go </div>

```go
package main

import "fmt"

func YearsUntilRetirement(age int) {
    fmt.Println(100 - age)
}

func main() {
	var age *int
	age = new(int)
	*age = 26
    
    YearsUntilRetirement(age)
}
```

When we try to run this, we should see that it complains that we cannot pass in a `type *int` to our function `YearsUntilRetirement`. 

<div class="filename"> $ go run main.go </div>

```output
# command-line-arguments
./main.go:13:25: cannot use age (type *int) as type int in argument to YearsUntilRetirement
```

In order to pass the value of this pointer, we can dereference is by passing it into our function as `*age` like so:

<div class="filename"> main.go </div>

```go
package main

import "fmt"

func YearsUntilRetirement(age int) {
    fmt.Println(100 - age)
}

func main() {
	var age *int
	age = new(int)
	*age = 26
    
    YearsUntilRetirement(*age)
}
```

Now, when we go to run this, we should see that our Go applications executes!

<div class="filename"> $ go run main.go </div>

```output
74
```

# Conclusion

Awesome, so in this tutorial, we covered the basics of pointers within Go and how you can use and abuse them within your own Go applications!

Hopefully you found this tutorial useful and interesting, if you did, or you have any additional comments or questions, then please feel free to let me know in the comments section below!

## Further Reading:

If you enjoyed this tutorial, then you may also be interested in some of the other tutorials on my site:

* [Go Interfaces Tutorial](/golang/go-interfaces-tutorial/)
* [Go Methods Tutorial](/golang/go-methods-tutorial/)