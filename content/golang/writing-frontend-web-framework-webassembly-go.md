---
title: "Writing a Frontend Web Framework with WebAssembly And Go"
date: 2018-10-28T10:28:34Z
desc: "In this tutorial, we are going to look at building a really simple frontend web framework using WebAssembly and Go"
series: golang
image: golang.png
tags:
- advanced
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

JavaScript Frontend frameworks have undoubtedly helped to push the boundaries of what was previously possible in the context of a browser. Ever more complex applications have come out built on top of the likes of React, Angular and VueJS to name but a few and there's the well known joke about how a new frontend framework seems to come out every day.

However, this pace of development is exceptionally good news for developers around the world. With each new framework, we discover better ways of handling state, or rendering efficiently with things like the shadow DOM. 

The latest trend however, seems to be moving towards writing these frameworks in languages other than JavaScript and compiling them into WebAssembly. We're starting to see major improvements in the way that JavaScript and WebAssembly communicates thanks to the likes of [Lin Clark](https://twitter.com/linclark) and we'll undoubtedly see more major improvements as WebAssembly starts to become more prominent in our lives. 

# Introduction

So, in this tutorial, I thought it would be a good idea to build the base of an incredibly simple frontend framework written in Go that compiles into WebAssembly. At a minimum, this will include the following features:

* Function Registration
* Components
* Super Simplistic-Routing

I'm warning you now though that these are going to be incredibly simple and nowhere near production ready. If this is article is somewhat popular, I'll hopefully be taking it forward however, and trying to build something that meets the requirements of a semi-decent frontend framework.

> **Github:** The full source code of this project can be found here: [elliotforbes/oak](https://github.com/elliotforbes/oak). If you fancy contributing to the project, feel free, I'd be happy to get any pull requests!


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
// static/entrypoint.js
const go = new Go();
WebAssembly.instantiateStreaming(fetch("lib.wasm"), go.importObject).then((result) => {
    go.run(result.instance);
});
```

Finally, now that we have that out of the way, we can start diving into some Go code! Create a new file called `main.go` which will contain the entry point to our Oak Web Framework!

```go
// main.go
package main

func main() {
	println("Oak Framework Initialized")
}
```

This is as simple as it gets. We've created a really simple Go program that should just print out `Oak Framework Initialized` when we open up our web app. To verify that everything works, we need to compile this using the following command:

```s
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

Add the following to your existing `main.go` file:

```go
// main.go
import "syscall/js"

// RegisterFunction
func RegisterFunction(funcName string, myfunc func(i []js.Value)) {
	js.Global().Set(funcName, js.NewCallback(myfunc))
}
```

So, this is where things start to become a bit more useful. Our framework now allows us to register functions so users of the framework can start creating their own functionality. 

Other projects using our framework can start to register their own functions that can subsequently be used within their own frontend applications.

# Components

So, I guess the next thing we need to consider adding to our framework is the concept of components. Basically, I want to be able to define a `components/` directory within a project that uses this, and within that directory I want to be able to build like a `home.go` component that features all the code needed for my homepage.

So, how do we go about doing this? 

Well, React tends to feature classes that feature `render()` functions which return the HTML/JSX/whatever code you wish to render for said component. Let's steal this and use it within our own components.

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

In order to add components to our framework, we'll keep it simple and just define an `interface` to which any components we subsequently define will have to adhere to. Create a new file called `components/comopnent.go` within our Oak framework:

```go
// components/component.go
package component

type Component interface {
	Render() string
}
```

What happens if we want to add new functions to our various components? Well, this allows us to do just that. We can use the `oak.RegisterFunction` call within the `init` function of our component to register any functions we want to use within our component! 

```go
package components

import (
	"syscall/js"

	"github.com/elliotforbes/oak"
)

type AboutComponent struct{}

var About AboutComponent

func init() {
	oak.RegisterFunction("coolFunc", CoolFunc)
}

func CoolFunc(i []js.Value) {
	println("does stuff")
}

func (a AboutComponent) Render() string {
	return `<div>
						<h2>About Component Actually Works</h2>
						<button onClick="coolFunc();">Cool Func</button>
					</div>`
}
```

When we combine this with a router, we should be able to see our `HTML` being rendered to our page and we should be able to click that button which calls `coolFunc()` and it will print out `does stuff` within our browser console! 

Awesome, let's see how we can go about building a simple router now.

# Building a Router

Ok, so we've got the concept of `components` within our web framework down. We've almost finished right? 

Not quite, the next thing we'll likely need is a means to navigate between different components. Most frameworks seem to have a `<div>` with a particular `id` that they bind to and render all their components within, so we'll steal that same tactic within Oak.

Let's create a `router/router.go` file within our oak framework so that we can start hacking away.

Within this, we'll want to map `string` paths to components, we wont do any URL checking, we'll just keep everything in memory for now to keep things simple:

```go
// router/router.go
package router

import (
	"syscall/js"

	"github.com/elliotforbes/oak/component"
)

type Router struct {
	Routes map[string]component.Component
}

var router Router

func init() {
	router.Routes = make(map[string]component.Component)
}
```

So within this, we've created a new `Router` struct which contains `Routes` which are a map of strings to the components we defined in the previous section.

Routing won't be a mandatory concept within our framework, we'll want users to choose when they wish to initialize a new router. So let's create a new function that will register a `Link` function and also bind the first route in our map to our `<div id="view"/>` html tag:

```go
// router/router.go
// ...
func NewRouter() {
	js.Global().Set("Link", js.NewCallback(Link))
	js.Global().Get("document").Call("getElementById", "view").Set("innerHTML", "")
}

func RegisterRoute(path string, component component.Component) {
	router.Routes[path] = component
}

func Link(i []js.Value) {
	println("Link Hit")

	comp := router.Routes[i[0].String()]
	html := comp.Render()

	js.Global().Get("document").Call("getElementById", "view").Set("innerHTML", html)
}
```

You should notice, we've created a `RegisterRoute` function which allows us to register a `path` to a given component. 

Our `Link` function is also pretty cool in the sense that it will allow us to navigate between various components within a project. We can specify really simple `<button>` elements to allow us to navigate to registered paths like so:

```html
<button onClick="Link('link')">Clicking this will render our mapped Link component</button>
```

Awesome, so we've got a really simple router up and running now, if we wanted to use this in a simple application we could do so like this:

```go
// my-project/main.go
package main

import (
	"github.com/elliotforbes/oak"
	"github.com/elliotforbes/oak/examples/blog/components"
	"github.com/elliotforbes/oak/router"
)

func main() {
	// Starts the Oak framework
	oak.Start()

	// Starts our Router
	router.NewRouter()
	router.RegisterRoute("home", components.Home)
	router.RegisterRoute("about", components.About)

	// keeps our app running
	done := make(chan struct{}, 0)
	<-done
}

```

# A Full Example

With all of this put together, we can start building really simple web applications that feature components and routing. If you want to see a couple of examples as to how this works, then check out the examples within the official repo: [elliotforbes/oak/examples](https://github.com/elliotforbes/oak/tree/master/examples)

# Challenges Going Forward

The code in this framework is in no way production ready, but I'm hoping this post kicks off good discussion as to how we can start building more production ready frameworks in Go. 

If nothing else, it starts the journey of identifying what still has to be done to make this a viable alternative to the likes of React/Angular/VueJS, all of which are phenomenal frameworks that massively speed up developer productivity.

I'm hoping this article motivates some of you to go off and start looking at how you can improve on this incredibly simple starting point.

# Conclusion

If you enjoyed this tutorial, then please feel free to share it to your friends, on your twitter, or wherever you feel like, it really helps the site and directly supports me writing more!

I'm also on YouTube, so feel free to subscribe to my channel for more Go content! - [TutorialEdge](https://youtube.com/tutorialedge).

> The full source code for the Oak framework can be found here: [github.com/elliotforbes/oak](https://github.com/elliotforbes/oak/). Feel free to submit PRs!