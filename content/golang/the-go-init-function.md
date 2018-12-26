---
date: 2018-10-04T10:44:54+01:00
desc: In this tutorial we'll be looking at the Go init function, how to use it and some of the things to consider when using it within your Go programs.
series: golang
image: golang.png
tags:
- beginner
weight: 13
author: Elliot Forbes
title: "The Go init Function"
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

There are times, when creating applications in Go, that you need to be able to set up some form of state on the initial startup of your program. This could involve creating connections to databases, or loading in configuration from locally stored configuration files. 

When it comes to doing this in Go, this is where your `init()` functions come into play. In this tutorial, we'll be looking at how you can use this `init()` function to achieve fame and glory, or more likely to help you to build your next Go based project. 

# The init Function

In Go, the `init()` function is incredibly powerful and compared to some other languages, is a lot easier to use within your Go programs. These `init()` functions can be used within a `package` block and regardless of how many times that package is imported, the `init()` function will only be called once. 

Now, the fact that it is only called once is something you should pay close attention to. This effectively allows us to set up database connections, or register with various service registries, or perform any number of other tasks that you typically only want to do once. 

```go
package main

func init() {
  fmt.Println("This will get called on main initialization")
}

func main() {
  fmt.Println("My Wonderful Go Program")
}
```

Notice in this above example, we've not explicitly called the `init()` function anywhere within our program. Go handles the execution for us implicitly and thus the above program should provide output that looks like this:

```s
$ go run test.go
This will get called on main initialization
My Wonderful Go Program
```

Awesome, so with this working, we can start to do cool things such as variable initialization.

```go
package main

import "fmt"

var name string

func init() {
	fmt.Println("This will get called on main initialization")
	name = "Elliot"
}

func main() {
	fmt.Println("My Wonderful Go Program")
	fmt.Printf("Name: %s\n", name)
}
```

In this example, we can start to see why using the `init()` function would be preferential when compared to having to explicitly call your own setup functions.

When we run the above program, you should see that our `name` variable has been properly set and whilst it's not the most useful variable on the planet, we can certainly still use it throughout our Go program. 

```s
$ go run test.go
This will get called on main initialization
My Wonderful Go Program
Name: Elliot
```

# Multiple Packages

Let's have a look at a more complex scenario that is closer to what you'd expect in a production Go system. Imagine we had 4 distinct Go packages within our application, `main`, `broker`, and `database`.  

In each of these we could specify an `init()` function which would perform the task of setting up the connection pool to the various 3rd party services such as Kafka or MySQL. 

Whenever we then call a function in our `database` package, it would then use the connection pool that we set up in our `init()` function.  

> **Note -** It's incredibly important to note that you cannot rely upon the order of execution of your `init()` functions. It's instead better to focus on writing your systems in such a way that the order does not matter.

# Order of Initialization

For more complex systems, you may have more than one file making up any given package. Each of these files may indeed have their own `init()` functions present within them. So how does Go order the initialization of these packages?

When it comes to the order of the initialization, a few things are taken into consideration. Things in Go are typically initialized in the order in declaration order but explicitly after any variables they may depend on. This means that, should you have 2 files `a.go` and `b.go` in the same package, if the initialization of anything in `a.go` depends on things in `b.go` they will be initialized first.

> **Note -** A more in-depth overview of the order of initialization in Go can be found in the official docs: [Package Initialization](https://golang.org/ref/spec#Package_initialization)

The key point to note from this is this order of declaration can lead to scenarios such as this:

```go
// source: https://stackoverflow.com/questions/24790175/when-is-the-init-function-run
var WhatIsThe = AnswerToLife()

func AnswerToLife() int {
    return 42
}

func init() {
    WhatIsThe = 0
}

func main() {
    if WhatIsThe == 0 {
        fmt.Println("It's all a lie.")
    }
}
```

In this scenario, you'll see that `AnswerToLife()` will run before our `init()` function as our `WhatIsThe` variable is declared before our `init()` function is called. 

# Multiple Init Functions in the Same File

What happens if we have multiple `init()` functions within the same Go file? At first I didn't think this was possible, but Go does indeed support having 2 separate `init()` functions within the one file. 

These `init()` functions are again called in their respective order of declaration within the file:

```go
package main

import "fmt"

// this variable is initialized first due to
// order of declaration
var initCounter int

func init() {
	fmt.Println("Called First in Order of Declaration")
	initCounter++
}

func init() {
	fmt.Println("Called second in order of declaration")
	initCounter++
}

func main() {
	fmt.Println("Does nothing of any significance")
	fmt.Printf("Init Counter: %d\n", initCounter)
}
```

Now, when you run the above program, you should see the output look like so:

```s
$ go run test.go
Called First in Order of Declaration
Called second in order of declaration
Does nothing of any significance
Init Counter: 2
```

Pretty cool, huh? But what is this for? Why do we allow this? Well, for more complex systems, it allows us to break up complex initialization procedures into multiple, easier-to-digest `init()` functions. It essentially allows us to avoid having one monolithic code block in a single `init()` function which is always a good thing. The one caveat of this style is that you will have to take care when ensuring declaration order.

# Conclusion

So this concludes the basic introduction to the world of `init()` functions. Once you've mastered the use of the package initialization, you may find it useful to master the art of structuring your Go based projects. 

If you have any further questions or feedback, then please feel free to let me know in the comments section below!