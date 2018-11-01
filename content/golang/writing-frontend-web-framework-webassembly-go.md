---
title: "Writing Frontend Web Framework Webassembly Go"
date: 2018-10-28T10:28:34Z
draft: true
desc: "In this tutorial, we are going to look at building a really simple frontend web framework using WebAssembly and Go"
series:
- golang
tags:
- advanced
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
---

JavaScript Frontend frameworks have undoubtedly helped to push the boundaries of what was previously possible in the context of a browser. Ever more complex applications have come out built on top of the likes of React, Angular and VueJS to name but a few and there's the well known joke about how a new frontend framework seems to come out every day.

However, this pace of development is exceptionally good news for developers around the world. With each new framework, we discover better ways of handling state, or rendering efficiently with things like the shadow DOM. 

The latest trend however, seems to be moving towards writing these frameworks in languages other than JavaScript and compiling them into WebAssembly. We're starting to see major improvements in the way that JavaScript and WebAssembly communicates thanks to the likes of [Lin Clark](https://twitter.com/linclark) and we'll undoubtedly see more major improvements as WebAssembly starts to become more prominent in our lives. 

# Introduction

So, in this tutorial, I thought it would be a good idea to build the base of an incredibly simple frontend framework written in Go that compiles into WebAssembly. At a minimum, this will include the following features:

* Function Registration
* Components
* Simplistic-Routing

I'm warning you now though that these are going to be incredibly simple and nowhere near production ready. If this is article is somewhat popular, I'll hopefully be taking it forward however, and trying to build something that meets the requirements of a semi-decent frontend framework.

> **Github:** The full source code of this project can be found here: [elliotforbes/oak](https://github.com/elliotforbes/oak). If you fancy contributing to the project, feel free, I'd be happy to get any pull requests!

# Video Tutorial

This tutorial is available in video format. If you want to support my work then please like and subscribe to my channel! 

VIDEO GOES HERE

# Starting Point

Right, let's dive into our editor of choice and start coding! The first thing we'll want to do is create a really simple `index.html` that will act as our entry point for our frontend framework:

```html
<!doctype html>
<!--
Copyright 2018 The Go Authors. All rights reserved.
Use of this source code is governed by a BSD-style
license that can be found in the LICENSE file.
-->
<html>

<head>
	<meta charset="utf-8">
	<title>Go wasm</title>
	<script src="./static/wasm_exec.js"></script>
	<script src="./static/entrypoint.js"></script>
</head>
<body>	

  <div class="container">
    <h2>Oak WebAssembly Framework</h2>
  </div>
</body>

</html>
```

You'll notice these have 2 `js` files being imported at the top, these allow us to execute our finished WebAssembly binary. The first of which is about 414 lines long so, in the interest of keeping this tutorial readable, I recommend you download it from here: [https://github.com/elliotforbes/oak/blob/master/examples/blog/static/wasm_exec.js](https://github.com/elliotforbes/oak/blob/master/examples/blog/static/wasm_exec.js)

The second is our `entrypoint.js` file. This will fetch and run the `lib.wasm` that we'll be building very shortly.  

```js
const go = new Go();
WebAssembly.instantiateStreaming(fetch("lib.wasm"), go.importObject).then((result) => {
    go.run(result.instance);
});
```

Finally, now that we have that out of the way, we can start diving into some Go code! Create a new file called `main.go` which will contain the entry point to our Oak Web Framework!

```go
package main

func main() {
	println("Oak Framework Initialized")
}
```

This is as simple as it gets. We've created a really simple Go program that should just print out `Oak Framework Initialized` when we open up our web app. To verify that everything works, we need to compile this using the following command:

```
$ GOOS=js GOARCH=wasm go build -o lib.wasm main.go
```

This should then build our Go code and output our `lib.wasm` file which we referenced in our `entrypoint.js` file. 

Awesome, if everything worked, then we are ready to try it out in the browser! We can use a really simple file server like this:

```go
// server.go
package main

import (
	"flag"
	"log"
	"net/http"
)

var (
	listen = flag.String("listen", ":8080", "listen address")
	dir    = flag.String("dir", ".", "directory to serve")
)

func main() {
	flag.Parse()
	log.Printf("listening on %q...", *listen)
	log.Fatal(http.ListenAndServe(*listen, http.FileServer(http.Dir(*dir))))
}
```

You can then serve your application by typing `go run server.go` and you should be able to access your app from `http://localhost:8080`.

# Function Registration

Ok, so we've got a fairly basic print statement working, but in the grand scheme of things, I don't quite think that qualifies it as a Web Framework just yet. 

Let's take a look at how we can build functions in Go and register these so we can call them in our `index.html`. We'll create a new utility function which will take in both a `string` which will be the name of our function as well as the Go function it will map to. 

```go
// main.go
import "syscall/js"

// RegisterFunction
func RegisterFunction(funcName string, myfunc func(i []js.Value)) {
	js.Global().Set(funcName, js.NewCallback(myfunc))
}
```

So, this is where things start to become a bit more useful. Our framework now allows us to register functions so users of the framework can start creating their own functionality. 

# Components

So, I guess the next thing we need to consider adding to our framework is the concept of components. Basically, I want to be able to define a `components/` directory within a project that uses this, and within that directory I want to be able to build like a `home.go` component that features all the code needed for my homepage.

So, how do we go about doing this? 

Well, React tends to feature classes that feature `render()` functions which return the HTML/JSX code you wish to render for said component. Let's steal this and use it within our own components.

I essentially want to be able to do something like this within a project that uses this framework:

```go
package components

type HomeComponent struct{}

var Home HomeComponent

func (h HomeComponent) Render() string {
	return "<h2>Home Component</h2>"
}
```

So, within my `components` package, I define a `HomeComponent` which features a `Render()` method which returns our HTML. 



# Conclusion

