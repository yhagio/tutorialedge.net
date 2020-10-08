---
author: Elliot Forbes
date: 2020-10-07T22:48:26+01:00
desc:
  In this tutorial, we are going to look at how you can define functions in Go for your WebAssembly applications.
image: golang.svg
paid: true
series: gowebassembly
tags:
  - gowebassembly
title: Getting Started with Functions in Go for WebAssembly
twitter: https://twitter.com/Elliot_F
video: 466189063
nextPage: /courses/gowebassembly/getting-started-with-gowebassembly/
weight: 6
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

Basic DOM manipulation is cool, but let's now have a look at how we can start to define functions in WebAssembly that we can subsequently register and call as typical JavaScript functions.

Within our `main.go` file, let's start defining a new function that we'll want to expose to JavaScript:

```makefile
package main

import (
	"fmt"
	"syscall/js"
)

func myFunc(this js.Value, inputs []js.Value) interface{} {
	fmt.Println("My Func Executed")	
	return nil
}

func main() {
	fmt.Println("Go WebAssembly Tutorial")

	document := js.Global().Get("document")

	hello := document.Call("createElement", "h1")
	hello.Set("innerText", "Go WebAssembly Course")
	document.Get("body").Call("appendChild", hello)

}
```

With this function now defined, we need to register it. Now, this is where it's slightly more complicated, we need to ensure our Go WebAssembly code doesn't terminate before we get a chance to run any of the functions. 

In order to prevent our code from exiting, we can create a channel and then block at the bottom of our `main` function indefinitely:

```makefile
c := make(chan int)
fmt.Println("Go WebAssembly Tutorial")

document := js.Global().Get("document")
hello := document.Call("createElement", "h1")
hello.Set("innerText", "Go WebAssembly Course")
document.Get("body").Call("appendChild", hello)
<-c
```

With this in place, we can now register the function that we have just defined below where we've created our channel:

```go
c := make(chan int)
fmt.Println("Go WebAssembly Tutorial")
js.Global().Set("myFunc", js.FuncOf(myFunc))

document := js.Global().Get("document")
hello := document.Call("createElement", "h1")
hello.Set("innerText", "Go WebAssembly Course")
document.Get("body").Call("appendChild", hello)
<-c
```

With this in place, let's build and reload our application within the browser and open up the console. Create a new `makefile` within the root of your project and then add the following:

```makefile
build:
	tinygo build -o main.wasm -target wasm ./main.go
```

With this in place, call the build stage by running `make build` and it will recompile our `main.wasm` file using the tinygo compiler!

Now that you have recompiled, ensure `live-server` is running and then open up `localhost:8080` and you should be able to open up the console and run the `myFunc()` function within the console!

Awesome, we are now able to call this new function within the console!