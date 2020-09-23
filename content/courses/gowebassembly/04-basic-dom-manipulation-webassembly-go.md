---
author: Elliot Forbes
date: 2020-09-11T22:48:26+01:00
desc:
  In this tutorial, we are going to look at how you can do some basic DOM manipulation in Go through WebAssembly.
image: golang.svg
paid: true
series: gowebassembly
tags:
  - gowebassembly
title: Basic DOM Manipulation in Go and WebAssembly
twitter: https://twitter.com/Elliot_F
video: 457426594
nextPage: /courses/gowebassembly/getting-started-with-gow-ebassembly/
weight: 2
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

Let's take this a step further and try and do some basic DOM-manipulation in our WebAssembly application.

We'll start off by modifying the `main` function and implementing the functionality to append a `h1` tag to our `body` so that we aren't just rendering a blank page.

```go
package main

import ( 
	"fmt"
	"syscall/js"
)

func main() {
	js.Global().Get("document")

	hello := document.Call("createElement", "h1")

	hello.Set("innerText", "Go WebAssembly Course")

	document.Get("body").Call("appendChild", hello)
}
```

Awesome, let's re-compile this now using the same go build command as before:

```go
GOOS=js GOARCH=wasm go build -o main.go
```

And then our browser window should automatically have reloaded to show us our new `h1` tag within our application!