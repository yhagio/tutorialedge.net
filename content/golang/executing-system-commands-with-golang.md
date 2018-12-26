---
author: Elliot Forbes
date: 2017-04-15T08:47:48+01:00
desc: 'Executing system commands can be incredibly useful no matter what sort of software
  you are building, '
series: golang
image: golang.png
tags:
- beginner
weight: 8
title: Executing System Commands With Golang
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> **Last Updated -** 6th December, 2018

In this tutorial, we are going to be taking a look at the `os/exec` package in the standard library and how we can use this to successfully execute system commands within our Go applications.

> **Note -** The official documentation for executing system commands can be found under the exec package: [os/exec package](https://golang.org/pkg/os/exec/). 

# Cross Compatibility Issues

Please note that some of these commands may not work on your operating system. If you are trying to write code that is compatible on multiple platforms then it would be wise to select commands that only feature on all platforms. If this is un-achievable then I recommend you add conditional logic to your program that executes a different system command depending on the system it's executing on top of.

## Checking Current Operating System

In order to check what operating system our code is running on we can use the runtime package and check the GOOS constant. This will return the operating system target:

```go
    if runtime.GOOS == "windows" {
		fmt.Println("Can't Execute this on a windows machine")
	} else {
		execute()
	}
```

> **Note -** The full list of GOOS variables can be found here: [Sys Package](https://golang.org/pkg/runtime/internal/sys/#GOOS).

# Implementation

> **Note -** I'm writing this tutorial on MacOS using commands that may not necessarily work on Windows machines.

Let's have a look at how we can start executing some really simple commands such as `ls` and `pwd` using the `os/exec` package, and once we have the basics covered, we can move on to more advanced examples.

We'll first of all need to import the 3 key packages for this example, the `fmt`, `os/exec` and the `runtime` package. 

Once, we've done this, we'll define an `execute()` function which will attempt to execute the 

```go
package main

import (
	"fmt"
	"os/exec"
	"runtime"
)

func execute() {

	// here we perform the pwd command.
	// we can store the output of this in our out variable
	// and catch any errors in err
	out, err := exec.Command("ls").Output()

	// if there is an error with our execution
	// handle it here
	if err != nil {
		fmt.Printf("%s", err)
	}
	// as the out variable defined above is of type []byte we need to convert
	// this to a string or else we will see garbage printed out in our console
	// this is how we convert it to a string
	fmt.Println("Command Successfully Executed")
	output := string(out[:])
	fmt.Println(output)

	// let's try the pwd command herer
	out, err = exec.Command("pwd").Output()
	if err != nil {
		fmt.Printf("%s", err)
	}
	fmt.Println("Command Successfully Executed")
	output = string(out[:])
	fmt.Println(output)
}

func main() {
	if runtime.GOOS == "windows" {
		fmt.Println("Can't Execute this on a windows machine")
	} else {
		execute()
	}
}

```

If we then attempt to run this, we should see the following:

```s
$ go run main.go
Command Successfully Executed # ls command
main.go

Command Successfully Executed # pwd command
/Users/elliot/Documents/Projects/elliotforbes/...
```

As you can see, both of the commands are successfully executed and we've managed to capture the output from these commands and subsequently output them within the context of our own Go program. 

## Passing in Arguments

Awesome, we've managed to get some really simple commands running, but how do we go about passing in arguments to these commands? 

For instance, say I wanted to do an `ls -ltr` as opposed to just a standard `ls`? 

Thankfully, this is relatively easy, we just have to add these arguments to `.Command()` like so:

```go
package main

import (
	"fmt"
	"os/exec"
	"runtime"
)

func execute() {
	out, err := exec.Command("ls", "-ltr").Output()
	if err != nil {
		fmt.Printf("%s", err)
	}
	fmt.Println("Command Successfully Executed")
	output := string(out[:])
	fmt.Println(output)
}

func main() {
	if runtime.GOOS == "windows" {
		fmt.Println("Can't Execute this on a windows machine")
	} else {
		execute()
	}
}
```

When we go to execute this again, we should see the output now successfully picking up our `-ltr` flags:

```s
$ go run main.go
Command Successfully Executed
total 8
-rw-r--r--  1 elliot  staff  988  6 Dec 17:52 main.go
```

> **Note -** `.Command()` is an example of a *Variadic Function* which takes in any number of trailing arguments, therefore, you can pass in as many arguments to your initial command as you desire.

# Conclusion

So, in this tutorial, we looked at how we could leverage the `os/exec` package in Go to execute system commands within our Go programs. 

If you found this tutorial useful or wish to ask anything extra then please feel free to do so in the comments section below!

> **Note -** If you want to keep up to date with the latest articles and updates on the site then please feel free to follow me on twitter: [@Elliot_f](https://twitter.com/elliot_f)