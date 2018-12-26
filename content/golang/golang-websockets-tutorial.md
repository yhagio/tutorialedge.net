---
author: Elliot Forbes
date: 2017-08-23T19:29:11+01:00
desc: In this tutorial we'll look at how you can implement websockets in Golang
series: golang
image: golang.png
tags:
- advanced
title: Working with Websockets and Socket.IO in Go - Tutorial
weight: 26
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> **Note -** This tutorial was written using Go version 1.9 and [googollee/go-socket.io](https://github.com/googollee/go-socket.io)

Websockets are something I find interesting in the sense that they provide us with an alternative option to communication between applications as opposed to the standard RESTful API solution. With Sockets we can do cool things such as real-time communication between thousands to hundreds of thousands of different clients without having to incur the expense of hundreds of thousands of RESTful API calls hitting our servers every minute. 

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:47.08%"><iframe src="https://www.youtube.com/embed/ycgCMOWPgiw?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="765" height="360" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

# Real Life Example

To put things into perspective and show how important websockets can be. Imagine we had a chat application that got all the latest messages from a single server and pushed all new messages to that same server.

## REST API Approach

1. In order to attain real-time chat, you would have to poll the REST API that provides new messages every second. 
1. This would equate to roughly 60 REST API calls per minute **per client**. 
1. If we build a successful service and we start seeing more and more traffic hitting our application, our servers will start being inundated with handling the millions of REST API calls per minute. 

# Socket Example

If we then considered the scenario in which we used websockets instead of REST API calls:

1. Each client would maintain one solitary connection to the server. 
1. With 1,000 clients we would only have to maintain 1,000 socket connections.
1. If someone posts a new message, only then would our server `push` out an update to our 1,000 clients. 

With this method we have severely minimized the amount of network traffic hitting our server. We've saved costs on the number of instances of our server application that we need to run and we can essentially handle thousands more clients without too much effort.

# Implementing a Golang Server

In order to implement websockets in Go we have a number of different options. I come from a frontend background and one of the most prevalent libraries for socket communication in the frontend is [socket-io](https://socket.io/) and as such we'll be using the Golang equivalent in order to ease integrating them together.

## Installing go-socket.io

We can install the package using the `go get` command like so:

```bash
go get github.com/googollee/go-socket.io
```

And then we can include it within our go programs like so:

```go
import "github.com/googollee/go-socket.io"
```

## Simple Server

Let's have a look at the example code that the provide in the `readme.md` for the library that we are using. 

```go
package main

import (
	"log"
	"net/http"

	socketio "github.com/googollee/go-socket.io"
)

func main() {

	server, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}

	server.On("connection", func(so socketio.Socket) {

		log.Println("on connection")

		so.Join("chat")

		so.On("chat message", func(msg string) {
			log.Println("emit:", so.Emit("chat message", msg))
			so.BroadcastTo("chat", "chat message", msg)
		})

		so.On("disconnection", func() {
			log.Println("on disconnect")
		})
	})

	server.On("error", func(so socketio.Socket, err error) {
		log.Println("error:", err)
	})

	http.Handle("/socket.io/", server)

	fs := http.FileServer(http.Dir("static"))
	http.Handle("/", fs)

	log.Println("Serving at localhost:5000...")
	log.Fatal(http.ListenAndServe(":5000", nil))
}

```

## Breaking it down

So in the above code sample we do everything within our `main()` function. We first define a new `socketio` server instance by calling `socketio.NewServer(nil)` before defining what behaviors we want our socket server to have when connected to and when there is an error.

Within `server.On('connection',...)` we first log that there has been a successful connection made before then joining the `chat` room using `so.Join("chat")`.

After that we then specify what we want to happen when we receive a `"chat message"` event through one of our connected sockets. Whenever our server receives this type of event we call `so.BroadcastTo("chat", "chat message", msg)` which broadcasts whatever message was sent to every socket that is currently connected. This means that one client will see any messages that another client were to send.

Finally we define what should happen on `"disconnection"`, in this instance we simply just log the fact that one of our clients has disconnected. 

# A Frontend Client

Ok, so we have managed to flesh out our backend Go-based WebSocket server, but now it's time to get a simple frontend application up and running so that we can test what we have done works. 

We'll start by creating a simple `index.html` within our project directory. 

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Go WebSocket Tutorial</title>
</head>
<body>
  
  <h2>Hello World</h2>


  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js"></script>
  <script>
    const socket = io('http://localhost:5000/socket.io/');
  </script>
        
</body>
</html>
```

When you then run your go websocket server by calling:

```s
$ go run main.go
2018/06/10 07:54:06 Serving at localhost:5000...
2018/06/10 07:54:15 on connection
2018/06/10 07:54:16 on connection
```

This should then start running on `http://localhost:5000`. You should then be able to navigate to this URL within your browser and see new connections being made in the log output of your server. 

You have now successfully built up a frontend that connects directly into your newly created backend websocket server! 

# Conclusion

> **Note -** The full source code for this project can be found on Github: [TutorialEdge/Go](https://github.com/TutorialEdge/Go/tree/master/go-websocket-tutorial)

If you found this tutorial useful or require any further assistance then please feel free to let me know in the comments section below.