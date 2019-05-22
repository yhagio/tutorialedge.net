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

# gRPC Introduction

So, before we dive in, we first need to understand what gRPC is, how it works
and so on.

> **Definition -** _gRPC is a modern, open source remote procedure call (RPC)
> framework that can run anywhere_

Remote Procedure Calls are something we use within distributed computing. Let's
imagine we have two distinct applications written in Go, running on two distinct
servers in different data-centers. Our first Go application could use a _Remote
Procedure Call_ to trigger a function within our secondary Go application
running on another server.

# Conclusion

> **Note -** If you want to keep track of when new Go articles are posted to the
> site, then please feel free to follow me on twitter for all the latest news:
> [@Elliot_F](https://twitter.com/elliot_f).
