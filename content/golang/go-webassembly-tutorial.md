---
author: Elliot Forbes
date: 2018-08-25T15:54:23+01:00
desc: In this tutorial, we are going to be looking at how you can compile your Go
  programs into WebAssembly
series: golang
image: golang.png
tags:
- advanced
title: Go WebAssembly Tutorial - Building a Calculator Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 29
---

Welcome All! With Go v1.11 having just been released with an experimental port to WebAssembly included, I thought it would be awesome to see how we can write our own Go programs that compile straight to WebAssembly! 

So, in this article, we are going to be building a really simple calculator to give us an idea as to how we can write functions that can be exposed to the frontend, evaluate DOM elements and subsequently update any DOM elements with the results from any functions we call. 

This will hopefully show you what it takes to write and compile your own Go-based programs for your frontend applications. 

> **Note -** If you haven't guessed from the opening line, Go v1.11 will be required in order for this tutorial to work!

# Video Tutorial

If you want to support me and my efforts then check out the video version of this tutorial and subscribe to my channel! 

<iframe width="560" height="315" src="https://www.youtube.com/embed/4kBvvk2Bzis" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

# Introduction

So what does this really mean for Go and Web developers? Well, it gives us the ability to write our frontend web apps using the Go language and subsequently all its cool features such as its type safety, its [goroutines](/golang/concurrency-with-golang-goroutines/) and more. 

Now, this isn't the first time we've seen the Go language being used for frontend purposes. GopherJS has been around for quite a while now and is pretty damn mature, however, the difference is that it compiles Go code to JS and not to WebAssembly.

# A Simple Example

Let's start off with a really simple example, this will simply output `Hello World` in the console whenever we click a button in our web page. Sounds exciting I know, but we can very quickly build this up into something more functional and cooler:

```go
package main

func main() {
	println("Hello World")
}
```

Now, in order to compile this, you'll have to set `GOARCH=wasm` and `GOOS=js` and you'll also have to specify the name of your file using the `-o` flag like so:

```s
$ GOARCH=wasm GOOS=js go build -o lib.wasm main.go
```

This command should compile our code into a `lib.wasm` file within our current working directory. We'll be using the `WebAssembly.instantiateStreaming()` function to load this into our page within our `index.html`. Note - this code was stolen from the official Go language repo:

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
</head>

<body>

	<script src="wasm_exec.js"></script>

	<script>
		if (!WebAssembly.instantiateStreaming) { // polyfill
			WebAssembly.instantiateStreaming = async (resp, importObject) => {
				const source = await (await resp).arrayBuffer();
				return await WebAssembly.instantiate(source, importObject);
			};
		}

		const go = new Go();
		
		let mod, inst;

		WebAssembly.instantiateStreaming(fetch("lib.wasm"), go.importObject).then((result) => {
			mod = result.module;
			inst = result.instance;
			document.getElementById("runButton").disabled = false;
		});

		async function run() {
			await go.run(inst);
			inst = await WebAssembly.instantiate(mod, go.importObject); // reset instance
		}

	</script>

	<button onClick="run();" id="runButton" disabled>Run</button>
</body>
</html>
```

We'll also need the `wasm_exec.js` file which can be found [here](https://github.com/golang/go/blob/master/misc/wasm/wasm_exec.js). Download that and save it alongside your `index.html`.

```html
$ wget https://github.com/golang/go/blob/master/misc/wasm/wasm_exec.js
```

And, we also have a simple `net/http` based file server, again stolen from [here](https://github.com/golang/go/wiki/WebAssembly), to serve up our `index.html` and our various other WebAssembly files:

```go
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

When you navigate to `localhost:8080` once you've kicked off this server, you should see that the `Run` button is clickable and if you open up your console in the browser, you should see that it prints out `Hello World` every time you click the button! 

Awesome, we've managed to successfully compile a really simple Go -> WebAssembly project and get it working in the browser. 

# A More Complex Example

Now for the good bit. Say, we wanted to create a more complex example that featured DOM manipulation, custom Go functions that could be bound to button clicks and more. Well thankfully, it's not too difficult!

## Registering Functions

We'll start off by creating a few functions of our own that we want to expose to our frontend. I'm feeling rather unoriginal today so these are going to be just `add` and `subtract`. 

These functions take in an array of type `js.Value` and use the `js.Global().Set()` function to set `output` to equal the result of any calculations done within our function. For good measure, we also print out to the console what the result is as well:

```go

func add(i []js.Value) {
	js.Global().Set("output", js.ValueOf(i[0].Int()+i[1].Int()))
	println(js.ValueOf(i[0].Int() + i[1].Int()).String())
}

func subtract(i []js.Value) {
	js.Global().Set("output", js.ValueOf(i[0].Int()-i[1].Int()))
	println(js.ValueOf(i[0].Int() - i[1].Int()).String())
}

func registerCallbacks() {
	js.Global().Set("add", js.NewCallback(add))
	js.Global().Set("subtract", js.NewCallback(subtract))
}

func main() {
	c := make(chan struct{}, 0)

	println("WASM Go Initialized")
	// register functions
	registerCallbacks()
	<-c
}
```

You'll notice that we've modified our `main` function slightly by calling `make` and creating a new channel. This effectively turns our previously short-lived program into a long-running one. We also call another function `registerCallbacks()` that acts almost like a router, but instead creates new Callbacks that effectively bind our newly created functions to our frontend.

In order for this to work, we have to very slightly modify the JavaScript code within our `index.html` to run our program instance as soon as it's fetched it: 

```js
const go = new Go();
let mod, inst;
WebAssembly.instantiateStreaming(fetch("lib.wasm"), go.importObject).then(async (result) => {
	mod = result.module;
	inst = result.instance;
	await go.run(inst)
});
```

Load this up in your browser once again and you should see that, without any button presses, `WASM Go Initialized` prints out in the console. This means that everything has worked. 

We can then start calling out to these functions from the likes of `<button>` elements like so:

```html
<button onClick="add(2,3);" id="addButton">Add</button>
<button onClick="subtract(10,3);" id="subtractButton">Subtract</button>
```

Remove the existing `Run` button and add these two new buttons to your `index.html`. When you reload the page in the browser and open up the console, you should be able to see the outputs of this function printing out. 

We are slowly but surely starting to get somewhere with this!

## Evaluating DOM Elements

So, I guess the next stage, is to start evaluating DOM elements and using their values instead of hard-coded values. 

Let's modify the `add()` function so that I can pass in 2 `id`s of `<input/>` elements and then add the values of these elements like so:

```go
func add(i []js.Value) {
	value1 := js.Global().Get("document").Call("getElementById", i[0].String()).Get("value").String()
	value2 := js.Global().Get("document").Call("getElementById", i[1].String()).Get("value").String()
	js.Global().Set("output", value1+value2)
	println(value1 + value2)
}
```

We can then update our `index.html` to have the following code:

```html
<input type="text" id="value1"/>
<input type="text" id="value2"/>

<button onClick="add('value1', 'value2');" id="addButton">Add</button>
```

If you enter some numeric values into both our inputs and then click the `Add` button, you should hopefully see a concatenation of the two values print out in the console. 

What have we forgotten? We need to parse these string values as int values:

```go
func add(i []js.Value) {
	value1 := js.Global().Get("document").Call("getElementById", i[0].String()).Get("value").String()
	value2 := js.Global().Get("document").Call("getElementById", i[1].String()).Get("value").String()

	int1, _ := strconv.Atoi(value1)
	int2, _ := strconv.Atoi(value2)

	js.Global().Set("output", int1+int2)
	println(int1 + int2)
}
```

You'll probably notice that I'm not handling errors here as I'm feeling lazy, and this is just for show.

Try recompiling this code now and reloading your browser, you should notice that if we enter the values `22` and `3` in both our inputs, it successfully outputs `25` in the console.

# Manipulating DOM elements

Our calculator wouldn't be very good if it didn't actually report the results within our page, so let's fix that now by taking in a third `id` that we'll output the results to:

```go
func add(i []js.Value) {
	value1 := js.Global().Get("document").Call("getElementById", i[0].String()).Get("value").String()
	value2 := js.Global().Get("document").Call("getElementById", i[1].String()).Get("value").String()

	int1, _ := strconv.Atoi(value1)
	int2, _ := strconv.Atoi(value2)

	js.Global().Get("document").Call("getElementById", i[2].String()).Set("value", int1+int2)
}
```

# Updating our subtract function:

Finally, let's update our subtract method:

```go
func subtract(i []js.Value) {
	value1 := js.Global().Get("document").Call("getElementById", i[0].String()).Get("value").String()
	value2 := js.Global().Get("document").Call("getElementById", i[1].String()).Get("value").String()

	int1, _ := strconv.Atoi(value1)
	int2, _ := strconv.Atoi(value2)

	js.Global().Get("document").Call("getElementById", i[2].String()).Set("value", int1-int2)
}
```

Our finished `index.html` should look something like this:

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
</head>

<body>

	<script src="wasm_exec.js"></script>

	<script>
		if (!WebAssembly.instantiateStreaming) { // polyfill
			WebAssembly.instantiateStreaming = async (resp, importObject) => {
				const source = await (await resp).arrayBuffer();
				return await WebAssembly.instantiate(source, importObject);
			};
		}

		const go = new Go();
		let mod, inst;
		WebAssembly.instantiateStreaming(fetch("lib.wasm"), go.importObject).then(async (result) => {
			mod = result.module;
			inst = result.instance;
			await go.run(inst)
		});

	</script>

	<input type="text" id="value1"/>
	<input type="text" id="value2"/>

	<button onClick="add('value1', 'value2', 'result');" id="addButton">Add</button>
	<button onClick="subtract('value1', 'value2', 'result');" id="subtractButton">Subtract</button>

	<input type="text" id="result">

</body>

</html>
```

# Conclusion

So, in this tutorial, we managed to learn how we can compile our Go programs into WebAssembly using the new v1.11 of the Go language. We created a really simple calculator that exposes functions from our Go code to our frontend and also does a bit of DOM parsing and manipulation to boot.

Hopefully, you found this article useful/interesting! If you did, then I'd love to hear from you in the comments section below. If you wish to support my work then please feel free to subscribe to my YouTube channel: [TutorialEdge](https://youtube.com/tutorialedge).