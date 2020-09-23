---
author: Elliot Forbes
date: 2020-09-22T22:48:26+01:00
desc:
  In this tutorial, we are going to look at how you can optimize the size of your WASM files using the tinygo compiler
image: golang.svg
paid: true
series: gowebassembly
tags:
  - gowebassembly
title: Optimizing WASM File Size using Tinygo
twitter: https://twitter.com/Elliot_F
video: 460998542
nextPage: /courses/gowebassembly/getting-started-with-gowebassembly/
weight: 5
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

One of the most critical things you have to take into consideration when building any production-ready Web application, regardless of what it's developed using is the size of the application that you are serving.

If we have a look at the size of the WebAssembly files that we've generated so far with Go, you'll notice that they are quite substantial in size for such simple applications.

Thankfully, there are ways we can effectively optimize these file sizes through the use of TinyGo!

TinyGo, if you haven't used it before is a Go compiler that has been designed and built to create incredibly lightweight compiled binaries. It's main target is for things like embedded systems and microcontrollers, as well as for optimizing the size of our WebAssembly binaries!

```go
brew tap tinygo-org/tools
brew install tinygo

tinygo version
```

With this installed, let's have a look at how you can now compile the same Go app down to WebAssembly using the following command:

```
$ tinygo build -o main2.wasm -target wasm ./main.go
```

Awesome, you should now notice that the new `wasm` file is now an order of magnitude smaller in size than the original `main.wasm` file which was built by the standard Go compiler!