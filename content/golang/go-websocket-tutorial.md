---
title: "Go Websocket Tutorial"
date: 2019-03-14T20:40:33Z
desc: In this tutorial, we are going to look at how we can work with WebSockets in our Go-based applications.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.png
tags:
  - WebSockets
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

Hi Fellow Devs! In this tutorial, we are going to be looking at how we can use WebSockets
within our own Go-based programs to do some cool real-time stuff.

By the end of this tutorial, we should have covered the following:

- What WebSockets are
- How we can build simple WebSocket Applications in Go

For the purpose of this tutorial, we'll be working with the `gorilla/websocket` package
as I've used it personally in a few production applications to great success.

# Video Tutorial

{{< youtube id="dniVs0xKYKk" autoplay="false" >}}

# WebSockets - What Are They?

So I've covered this a few times in a number of different tutorials, but it's always
worth mentioning why we use WebSockets and how they differ from traditional `HTTP` requests.

WebSockets are upgraded HTTP connections that live until the connection is killed by either the
client or the server. It's through this WebSocket connection that we can perform duplex communication which is a really fancy way of saying we can
communicate to-and-from the server from our client using this single connection.

The real beauty of WebSockets is that they use a grand total of 1 TCP connection and all
communication is done over this single long-lived TCP connection. This drastically reduces
the amount of network overhead required to build real-time applications using WebSockets as
there isn't a constant polling of HTTP endpoints required.

# A Simple Example

Let's start off with a really simple Go program, once we can run that we can build on top of it
and start building some simple WebSocket endpoints.

We'll need to first initialize our project to use `go modules` by calling:

```s
$ go mod init github.com/elliotforbes/go-websocket-tutorial
```

This command should create a `go.mod` file within our current directory.

Once this has been done, we can go ahead and define our `main.go` file in which we'll do the majority of our coding:


<div class="filename">main.go</div>

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello World")
}
```

Let's sanity check that we can run this by opening up a terminal, navigating to our
project's directory and then calling `go run main.go`. We should see that it successfully
outputs `Hello World` in our terminal.

# A Simple HTTP Endpoint

We're going to start off by building a simple HTTP server that returns `Hello World` whenever we hit it on port `8080`. We'll also define a simple HTTP endpoint that will act as the base of the
WebSocket endpoint that we'll be creating:

```go
package main

import (
    "fmt"
    "log"
    "net/http"
)

func homePage(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Home Page")
}

func wsEndpoint(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello World")
}

func setupRoutes() {
    http.HandleFunc("/", homePage)
    http.HandleFunc("/ws", wsEndpoint)
}

func main() {
    fmt.Println("Hello World")
    setupRoutes()
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

Awesome, when we try run this using `go run main.go` we should see that it successfully starts up
our newly defined HTTP server on `http://localhost:8080` and we should subsequently be able to hit
both the `/` and the `/ws` routes within our browser.

# Upgrading a HTTP Connection

In order to create a WebSocket endpoint, we effectively need to upgrade an incoming connection
from a standard HTTP endpoint to a long-lasting WebSocket connection. In order to do this,
we are going to be using some of the functionality from the very cool `gorilla/websocket` package!

## Define our Upgrader

The first thing we'll have to do is to define a `websocker.Upgrader` struct. This will hold
information such as the Read and Write buffer size for our WebSocket connection:

```go
// We'll need to define an Upgrader
// this will require a Read and Write buffer size
var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}
```

## Check Incoming Origin

The next thing we'll want to add to our existing `wsEndpoint` function is a call to
`upgrader.CheckOrigin`. This will determine whether or not an incoming request from a
different domain is allowed to connect, and if it isn't they'll be hit with a `CORS` error.

```go
func wsEndpoint(w http.ResponseWriter, r *http.Request) {
    // remove the previous fmt statement
    // fmt.Fprintf(w, "Hello World")
    upgrader.CheckOrigin = func(r *http.Request) bool { return true }

}
```

For now, we have kept it really simple and simply return true regardless of what host is
trying to connect to our endpoint.

## Upgrading our Connection

We can now start attempting to upgrade the incoming HTTP connection using the
`upgrader.Upgrade()` function which will take in the Response Writer and the pointer
to the HTTP Request and return us with a pointer to a WebSocket connection, or an error
if it failed to upgrade.

```go
func wsEndpoint(w http.ResponseWriter, r *http.Request) {
    upgrader.CheckOrigin = func(r *http.Request) bool { return true }

    // upgrade this connection to a WebSocket
    // connection
    ws, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
    }

}
```

## Continually Listening On That Connection

Next, we'll want to implement a function which will continually listen for any
incoming messages sent through that WebSocket connection. We'll call this `reader()` for 
now and it will take in a pointer to the WebSocket connection that we received from
our call to `upgrader.Upgrade`:

```go
// define a reader which will listen for
// new messages being sent to our WebSocket
// endpoint
func reader(conn *websocket.Conn) {
    for {
    // read in a message
        messageType, p, err := conn.ReadMessage()
        if err != nil {
            log.Println(err)
            return
        }
    // print out that message for clarity
        fmt.Println(string(p))

        if err := conn.WriteMessage(messageType, p); err != nil {
            log.Println(err)
            return
        }

    }
}
```

With this defined, we can then add it to our `wsEndpoint` function like so:

```go
func wsEndpoint(w http.ResponseWriter, r *http.Request) {
    upgrader.CheckOrigin = func(r *http.Request) bool { return true }

    // upgrade this connection to a WebSocket
    // connection
    ws, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
    }
    // helpful log statement to show connections
    log.Println("Client Connected")

    reader(ws)
}
```

With all of this in place, we should now be able to run our new WebSocket server like so:

```s
$ go run main.go
Hello World
```

Awesome, everything appears to have worked!

## Writing Back to Our Client

I mentioned before that WebSockets allow for duplex communication, i.e. back-and-forth
communication across the same TCP connection. In order to send messages from our Go
application to any connected WebSocket clients, we can utilize the `ws.WriteMessage()`
function like so:

```go
func wsEndpoint(w http.ResponseWriter, r *http.Request) {
    upgrader.CheckOrigin = func(r *http.Request) bool { return true }

    // upgrade this connection to a WebSocket
    // connection
    ws, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
    }

    log.Println("Client Connected")
    err = ws.WriteMessage(1, []byte("Hi Client!"))
    if err != nil {
        log.Println(err)
    }
    // listen indefinitely for new messages coming
    // through on our WebSocket connection
    reader(ws)
}
```

This addition means that any client that connects to our WebSocket server will
be greeted by a nice `Hi Client!` message!

# Testing it All Works With A Client

The final step, is testing to see if everything works by creating a client and attempting
to connect to our new WebSocket endpoint. For this, we'll create an incredibly simple
vanilla JavaScript app that will connect on `ws://localhost:8080/ws` and attempt to send
a message through this new WebSocket connection:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Go WebSocket Tutorial</title>
  </head>
  <body>
    <h2>Hello World</h2>

    <script>
        let socket = new WebSocket("ws://127.0.0.1:8080/ws");
        console.log("Attempting Connection...");

        socket.onopen = () => {
            console.log("Successfully Connected");
            socket.send("Hi From the Client!")
        };
        
        socket.onclose = event => {
            console.log("Socket Closed Connection: ", event);
            socket.send("Client Closed!")
        };

        socket.onerror = error => {
            console.log("Socket Error: ", error);
        };

    </script>
  </body>
</html>
```

If we open up this `index.html` page within a browser, we should see in the console
that it has been able to successfully connect!

We should also see in our server logs that a client has successfully connected as well
as a `Hi From The Client!` message!

We have now achieved full duplex communication!

# Docker-izing our Application

I've talked about the benefits of Docker in a number of my other tutorials, but essentially,
it allows us to define the exact environment that our App needs to run successfully. This means
that you should be able to run this tutorial in 10 years time and it should still work perfectly.

```dockerfile
FROM golang:1.11.1-alpine3.8
RUN mkdir /app
ADD . /app/
WORKDIR /app
RUN go mod download
RUN go build -o main ./...
CMD ["/app/main"]
```

Now that we have this `Dockerfile` defined for our application, let's create the `image`
using the `docker build` command and then let's attempt to run this Go WebSocket application
within a Docker `container`.

```s
$ docker build -t go-websocket-tutorial .
$ docker run -it -p 8080:8080 go-websocket-tutorial
```

If everything has worked successfully, we should then be able to see our application up and
running within our docker container mapped to our local machines port `8080`. If we open up
`http://localhost:8080` within our browser, we should see our application return `home page`.

# Conclusion

In this tutorial, we have managed to cover some of the basics of WebSockets and how you can build
a simple WebSocket based application in Go!

So, hopefully you enjoyed this tutorial and found it useful! I'm hoping this highlighted some of the main benefits of using WebSockets within your own Go applications!

> **Source Code** - The full source code for this tutorial can be found here: [Go-Websocket-Tutorial](https://github.com/TutorialEdge/Go/tree/master/go-websocket-tutorial)

## Further Reading

If you enjoyed this article, you may like my tutorial series which utilizes WebSockets to build a Real-Time chat application using both React and Golang. It covers how you would pool 
WebSocket connections and do things such as broadcast updates to all connected 
clients!

- [Creating a Chat Application in React and Go](/projects/chat-system-in-go-and-react)
- [Go Multi-Stage Dockerfiles](/golang/go-multi-stage-docker-tutorial/)

> **Note -** If you want to keep track of when new Go articles are posted to the
> site, then please feel free to follow me on twitter for all the latest news:
> [@Elliot_F](https://twitter.com/elliot_f).
