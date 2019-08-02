---
title: Makefiles for Go Developers
date: 2019-06-06T20:02:23.000+00:00
desc: In this tutorial, we are going to be looking at how you, as a Go developer,
  can leverage the wonderful bit of technology that is Makefiles for fame and fortune
  when developing your own Go applications.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.png
tags:
- Tools
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg

---
In this tutorial, we are going to be looking at how you, as a Go developer, can leverage
the wonderful bit of technology that is Makefiles for fame and fortune when developing
your own Go applications.

# What are Makefiles?

Let's start by looking at what Makefiles are first of all. Makefiles are an incredibly
useful automation tool that you can use to run and build not just your Go applications,
but for most programming languages.

You will typically see `Makefiles` at the root directory of a whole host of different
Go applications on Github and in Gitlab as they are used extensively as the tool of choice
for automating tasks that the maintainers of these applications find themselves doing often.

# A Simple Example

Now that we have covered the absolute basic concepts, let's see these concepts in action
with a really simple `Makefile` example to whet our appetite.

Create a new directory in which you can work in and within this directory create a new
file called `Makefile`.

Once you have this `Makefile`, open it up and let's add a `target` called `hello` to
this `Makefile`. This target, when executed, will run the script below it, very similar
to a normal function in programming terms.

<div class="filename"> Makefile </div>

```makefile
hello:
    echo "Hello"
```

With this new defined, let's try and execute this using the `make` command-line tool:

<div class="filename"> $ make hello </div>

```output
echo "Hello"
Hello
```

As you can see the script within the body of our `hello` target has been successfully
executed for us and `Hello` has printed out!

Awesome, hopefully you can see where we are going with this.

# Building a Simple Go App

So, we have a simple `Makefile` in a project directory that performs the highly complex
tax of printing out `Hello` to our terminal.

Let's now take this a step further and add a simple Go application into the mix so that
we can try our hand at defining new targets which will build and run this new Go app for us.

<div class="filename"> main.go </div>

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello")
}
```

Now that we have a suitably complex Go application to work with, let's define some
new targets within our `Makefile` which will simplify the task of building and running
our application for us.

Open up your `Makefile` once again and add the following targets:

<div class="filename"> Makefile </div>

```makefile
hello:
	echo "Hello"

build:
	go build -o bin/main main.go

run:
	go run main.go
```

Here, we have created a `build` target and a `run` target. The `build` target can be
used to compile our amazing Go application it's final binary state within a `bin/` directory.

The `run` target is aptly named as it attempts to run our Go application in its current
state.

Let's try run these both now:

<div class="filename"> $ make build </div>

```output
go build -o bin/main main.go
```

Awesome, this `make build` command will have gone away and compiled our Go application successfully
into a new `bin/` directory for us.

Let's now try the `make run` command:

<div class="filename"> $ make run </div>

```output
go run main.go
Hello
```

Here we see that our go application is run for us.

## What's the Big Deal?

At this point, you might be asking what the big deal is about using Makefiles for your own
Go applications.

Well imagine you wanted to cross-compile your application to run on every OS and every
architecture available but didn't want to manually set the `GOOS` and `GOARCH` variables
for every command.

Within your `Makefile`, you could define a new `compile` target which contains all of the build
commands with all the appropriate `GOOS` and `GOARCH` compinations set like so:

<div class="filename"> Makefile </div>

```makefile
compile:
	echo "Compiling for every OS and Platform"
	GOOS=freebsd GOARCH=386 go build -o bin/main-freebsd-386 main.go
	GOOS=linux GOARCH=386 go build -o bin/main-freebsd-386 main.go
	GOOS=windows GOARCH=386 go build -o bin/main-freebsd-386 main.go
```

And now, when you try to cross compile for every platform, you simply have to call
`make compile`:

<div class="filename"> $ make compile </div>

```output
echo "Compiling for every OS and Platform"
Compiling for every OS and Platform
GOOS=freebsd GOARCH=386 go build -o bin/main-freebsd-386 main.go
GOOS=linux GOARCH=386 go build -o bin/main-freebsd-386 main.go
GOOS=windows GOARCH=386 go build -o bin/main-freebsd-386 main.go
```

With everything successfully built, you should now see your `bin/` directory full of
binaries compatible with a range of different Operating Systems and Platforms.

# Layering Commands

Let's now imagine we are working with a complex system that has a multi-stage build/run
process that has developed over many years. Instead of having to define all of the commands
needed to build and run in a single target, you can break everything up into smaller targets
and have something like an `all` target combine them into one `make` command.

Open up your `Makefile` once again and add an `all` target at the bottom. This `all`
target will go away and execute your `hello` and `build` targets in series.

<div class="filename"> Makefile </div>

```makefile
hello:
	echo "Hello"

build:
	go build -o bin/main main.go

run:
	go run main.go


compile:
	echo "Compiling for every OS and Platform"
	GOOS=linux GOARCH=arm go build -o bin/main-linux-arm main.go
	GOOS=linux GOARCH=arm64 go build -o bin/main-linux-arm64 main.go
	GOOS=freebsd GOARCH=386 go build -o bin/main-freebsd-386 main.go

all: hello build
```

Now that we have added this new target, let's see what happens when we
call it:

<div class="filename"> $ make all </div>

```output
echo "Hello"
Hello
go build -o bin/main main.go
```

Awesome, using this approach we can start to break down more complex instructions
into a series of smaller, easier to digest targets that can be individually debugged
and executed.

# Conclusion

So, in this tutorial, we covered the absolute minimum needed to get up and running using
`Makefiles` and the `make` command so that you can simplify your development process.

## Further Reading

If you enjoyed this article but wish to learn more about Makefiles and how you can best
use them, I suggest you check out the following articles:

* [An Introduction to Makefiles](https://www.gnu.org/software/make/manual/html_node/Introduction.html)
* [A Good Makefile for Go](https://kodfabrik.com/journal/a-good-makefile-for-go/)
