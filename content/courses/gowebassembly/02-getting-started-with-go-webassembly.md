---
author: Elliot Forbes
date: 2020-09-11T22:48:26+01:00
desc:
  In this tutorial, we are going to look at how you can get up and running with Go and WebAssembly! 
image: golang.svg
paid: false
series: gowebassembly
tags:
  - gowebassembly
title: Getting Started with Go and WebAssembly
twitter: https://twitter.com/Elliot_F
video: 457420611
nextPage: /courses/gowebassembly/getting-started-with-gow-ebassembly/
weight: 2
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

Let's dive in and have a look at how we can take a simple Go application and compile it down to a WebAssembly file using the go build command.

As you can see here, we have a simple `hello world` application which will be the starting point for our course.

Let's open up the terminal and ensure we are in the same directory as our `main.go` file and then execute the following:

```jsx
GOOS=js GOARCH=wasm go build -o main.wasm
```

This will take our Go source code and produce an executable WebAssembly module file called `main.wasm`

Now, in order to import this `main.wasm` file into a web page and execute it, we'll need to pull in the `wasm_exec.js` file which exists within our GOROOT and then import that prior to importing our WebAssembly file into our application:

```jsx
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .
```

With this in place we can then attempt to run this using `node` by calling:

```jsx
node wasm_exec.js main.wasm
```

This should then execute our newly built WebAssembly program that we've written in Go!