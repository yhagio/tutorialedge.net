---
title: "Go gRPC Beginners Tutorial"
date: 2019-01-31T18:46:18Z
draft: true
desc:
  In this tutorial, we'll be covering how you can get up and running with gRPC
  in your Golang systems.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
tags:
  - intermediate
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

Welcome fellow Gophers! In this tutorial, we are going to be diving down into
the world of gRPC calls and how we can implement gRPC within our Go based
applications.

By the end of this tutorial, you should have a solid grasp as to what gRPC is, how you
can use gRPC to communicate between distributed systems built across multiple languages,
and finally we'll be looking at how to create our own gRPC client and server in Go.

# Prerequisites

Before you can complete this tutorial, you will have to have the following on your machines.

* gRPC installed - this can be done by running `go get -u google.golang.org/grpc`.
* Protocol Buffers v3 installed - this can be done by running `go get -u github.com/golang/protobuf/protoc-gen-go`

With these both installed, you will have to ensure that `$GOPATH/bin` is on your environment path so 
that you can use the `protoc` and `grpc` binaries.

# gRPC Introduction

So, before we dive in, we first need to understand what gRPC is, how it works
and so on. 

> **Definition -** _gRPC is a modern, open source remote procedure call (RPC)
> framework that can run anywhere_

Remote Procedure Calls are something that we use within distributed systems that 
allow us to communicate between applications. More specifically, it allows us to 
expose methods within our application that we want other applications to be able
to invoke. 

It's similar to REST API communication in the sense that with it, you are effectively
exposing functionality within your app to other apps using HTTP as the communication
medium.

# Differences between gRPC and REST

Whilst REST and gRPC are somewhat similar, there are some fundamental differences
in how they work that you should be aware of.

1. gRPC utilizes `HTTP/2` whereas REST utilizes `HTTP 1.1`
1. gRPC utilizes the protocol buffer data format as opposed to the standard JSON data format
that is typically used within REST APIs
1. With gRPC you can utilize `HTTP/2` capabilities such as server-side streaming, client-side streaming
or even bidirectional-streaming should you wish.

# Challenges with gRPC

You should bear in mind that whilst gRPC does allow you to utilize these newer bits of technology, it 
is more challenging prototyping a gRPC service due to the fact that tools like the Postman HTTP client cannot be
used in order to easily interact with your exposed gRPC service. 

You do have options that make this possible, but it's not something that's readily available natively. There are options to use tools such as envoy to reverse proxy standard JSON requests and transcode them into the right data format but this is an additional dependency that can be tricky to set up for simple projects.

# Building a gRPC Server in Go

Let's start off by defining a really simple gRPC server in Go. Once we have a simple server up and running we 
can set about creating a gRPC client that will be able to interact with it.

```go
package main

import "fmt"

func main() {
  fmt.Println("Go gRPC Server")
}
```

# Building a gRPC Client in Go

Now that we have our server up and running, let's take a look at how we can build up a simple client
that will be able to interact with it.

```go
package main

import "fmt"

func main() {
  fmt.Println("Go gRPC Client")
}
```

# Conclusion

So, in this tutorial, we've looked at how you can build out a simple gRPC client and server in Go.

Now, this is just the start of my dive into gRPC and over the coming weeks I'll be developing out a
more production-ready example app that will feature things such as authentication/authorization and
interacting with a Redis database.

## Further Reading

If you enjoyed this tutorial then you may also enjoy my other tutorials:

* [Go Protocol Buffers Tutorial](/golang/go-protocol-buffer-tutorial/)