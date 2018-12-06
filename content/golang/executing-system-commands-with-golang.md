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
---

> **Last Updated -** 6th December, 2018

In this tutorial, we are going to be taking a look at the `os/exec` package in the standard library and how we can use this to successfully execute system commands within our Go applications.

> **Note -** The official documentation for executing system commands can be found under the exec package: [os/exec package](https://golang.org/pkg/os/exec/). 

# Cross Compatibility Issues

Please note that some of these commands may not work on your operating system. If you are trying to write code that is compatible on multiple platforms then it would be wise to select commands that only feature on all platforms. If this is unachievable then I recommend you add conditional logic to your program that executes a different system command depending on the system it's executing on top of.

## Checking Current Operating System

In order to check what operating system our code is running on we can use the runtime package and check the GOOS constant. This will return the operating system target:

```go
    if runtime.GOOS == "windows" {
		fmt.Println("Can't Execute this on a windows machine")
	} else {
		execute()
	}
```

The full list of GOOS variables can be found here: [Sys Package](https://golang.org/pkg/runtime/internal/sys/#GOOS).

# Implementation

Below is the absolute bare essentials as to how to execute a system command, I've stripped out all the error handling just to keep it simple.

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
	out, err := exec.Command("pwd").Output()

  // if there is an error with our execution
  // handle it here
	if err != nil {
		fmt.Printf("%s", err)
	}

	fmt.Println("Command Successfully Executed")
  // as the out variable defined above is of type []byte we need to convert
  // this to a string or else we will see garbage printed out in our console
  // this is how we convert it to a string
	output := string(out[:])

  // once we have converted it to a string we can then output it.
	fmt.Println(output)
}

func main() {

	fmt.Println("Simple Shell")
	fmt.Println("---------------------")

	if runtime.GOOS == "windows" {
		fmt.Println("Can't Execute this on a windows machine")
	} else {
		execute()
	}
}

```

# Exit Codes

// to be added

# Conclusion

So, in this tutorial, we looked at how we could leverage the `os/exec` package in Go to execute system commands within our Go programs. 

If you found this tutorial useful or wish to ask anything extra then please feel free to do so in the comments section below!

> **Note -** If you want to keep up to date with the latest articles and updates on the site then please feel free to follow me on twitter: [@Elliot_f](https://twitter.com/elliot_f)