---
author: Elliot Forbes
date: 2018-03-19T11:05:52Z
desc: 'In this series, we are going to be building a Chat App in Go and ReactJS'
image: golang.png
series:
- goreactchat
tags:
- golang
title: Part 4 - Handling Multiple Clients
twitter: https://twitter.com/Elliot_F
---

> **Note -** This post is part 4 of a series on building a chat application in Go with ReactJS. You can find part 3 here - [Part 3 - Designing Our Frontend](/projects/chat-system-in-go-and-react/part-3-designing-our-frontend/)

It's time to implement the ability to handle multiple clients and broadcast any received messages to every connected client. By the end of this part of the series we'll have:

* implemented a Pool mechanism that will effectively allow us to track how many connections we have into our WebSocket server. 
* We'll also be able to broadcast any received messages to all connections within our connection pool.
* We'll also be able to inform any existing clients when another client connects or disconnects.

Our application will look a little like this by the end of this part of the tutorial:

![Chat Application Screenshot](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/chat-app-go-react/screenshot-01.png)


# House Cleaning our Backend

So, before we go any further and extend our backend, we need to do a bit of house cleaning. 

We'll need to run the following commands in order to continue progress:

```s
$ cd backend
$ GOMODULES=on
$ go mod init github.com/TutorialEdge/realtime-chat-go-react
```

This should initialize go modules within our backend project and it means we can start fleshing out our project and making it a proper Go application.

Once, you've run these commands, you should notice that this has automatically generated two new files within your `backend/` directory. These should be the `go.mod` and the `go.sum` files.

> **Note -** For more information on the new experimental Go modules feature, check out the official Wiki page: [Go Modules](https://github.com/golang/go/wiki/Modules)

# Splitting out our Websocket Code

Ideally, your `main.go` file should just be an entry point into your Go application, it should be fairly minimal and call out to other packages within your project. 

> **Note -** We'll be basing our project layout on the unofficial standard for Go projects - [golang-standards/project-layout](https://github.com/golang-standards/project-layout)

Let's create a new directory called `pkg/` within our backend directory. Within this, we'll want to create another directory called `websocket/` which will contain a `websocket.go` file.

We'll be moving a lot of our WebSocket specific code that we currently have in our `main.go` file into this new `websocket.go` file. One key thing to note though, is that when we copy over our functions, we'll need to capitalize first letter of each function that we want to make visible to the rest of our project.

```go
package websocket

import (
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func Upgrade(w http.ResponseWriter, r *http.Request) (*websocket.Conn, error) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return ws, err
	}
	return ws, nil
}

func Reader(conn *websocket.Conn) {
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		fmt.Println(string(p))

		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}
	}
}

func Writer(conn *websocket.Conn) {
	for {
		fmt.Println("Sending")
		messageType, r, err := conn.NextReader()
		if err != nil {
			fmt.Println(err)
			return
		}
		w, err := conn.NextWriter(messageType)
		if err != nil {
			fmt.Println(err)
			return
		}
		if _, err := io.Copy(w, r); err != nil {
			fmt.Println(err)
			return
		}
		if err := w.Close(); err != nil {
			fmt.Println(err)
			return
		}
	}
}
```

We'll then want to update our `main.go` file to call out to this new package:

```go
package main

import (
	"fmt"
	"net/http"

	"github.com/TutorialEdge/realtime-chat-go-react/pkg/websocket"
)

func serveWs(w http.ResponseWriter, r *http.Request) {
	ws, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+V\n", err)
	}
	go websocket.Writer(ws)
	websocket.Reader(ws)
}

func setupRoutes() {
	http.HandleFunc("/ws", serveWs)
}

func main() {
	fmt.Println("Distributed Chat App v0.01")
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
```

With these new changes made, we should check to see that what we have done hasn't broken our existing functionality. Try running your backend and frontend again and ensuring that you can still send and receive messages:

```s
$ go run main.go
```

If that has worked successfully, we can move on to extending our codebase to handle multiple clients. 

By this point, your directory structure should look like this:

```s
- backend/
- - pkg/
- - - websocket/
- - - - websocket.go
- - main.go
- - go.mod
- - go.sum
- frontend/
- ...
```

# Handling Multiple Clients

Excellent, so now that we've done our basic house-keeping, we can move on to improving our backend and implement a mechanism to handle multiple clients.

In order to do this, we'll need to consider how we are handling connections in to our WebSocket server. Whenever a new connection is made, we'll have to add them to a pool of existing connections and ensure that every time a message is sent, everyone in that pool receives that message.

## Using Channels

We're going to be working on a system that features a lot of concurrent connections, therefore, it makes sense to use channels to communicate across multiple goroutines in a synchronized manner.

> **Note -** If you wish to learn more about channels in Go, you can check out my other article here: [Go Channels Tutorial](/golang/go-channels-tutorial/)

By employing Channels, we can ensure that we can safely modify certain aspects of our 


## Client.go

```go
package websocket

import (
	"fmt"
	"log"
	"sync"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID   string
	Conn *websocket.Conn
	Pool *Pool
	mu   sync.Mutex
}

type Message struct {
	Type int    `json:"type"`
	Body string `json:"body"`
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()

	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		message := Message{Type: messageType, Body: string(p)}
		c.Pool.Broadcast <- message
		fmt.Printf("Message Received: %+v\n", message)
	}
}
```

## Pool Struct

```go
package websocket

import "fmt"

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}
```

> **Note -** We need to ensure that only one point of our application has the ability to write to our WebSocket connections or we'll face concurrent write issues.

```go
func (pool *Pool) Start() {
	for {
		select {
		case client := <-pool.Register:
			pool.Clients[client] = true
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			for client, _ := range pool.Clients {
				fmt.Println(client)
				client.Conn.WriteJSON(Message{Type: 1, Body: "New User Joined..."})
			}
			break
		case client := <-pool.Unregister:
			delete(pool.Clients, client)
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			for client, _ := range pool.Clients {
				client.Conn.WriteJSON(Message{Type: 1, Body: "User Disconnected..."})
			}
			break
		case message := <-pool.Broadcast:
			fmt.Println("Sending message to all clients in Pool")
			for client, _ := range pool.Clients {
				if err := client.Conn.WriteJSON(message); err != nil {
					fmt.Println(err)
					return
				}
			}
		}
	}
}
```

## Websocket.go

```go
package websocket

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func Upgrade(w http.ResponseWriter, r *http.Request) (*websocket.Conn, error) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	return conn, nil
}
```

# Testing it Works

![Chat Application Screenshot](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/chat-app-go-react/screenshot-01.png)

```s
$ go run main.go
Distributed Chat App v0.01
WebSocket Endpoint Hit
Size of Connection Pool:  1
&{ 0xc0000f46e0 0xc0000a8340 {0 0}}
WebSocket Endpoint Hit
Size of Connection Pool:  2
&{ 0xc0000f46e0 0xc0000a8340 {0 0}}
&{ 0xc000164000 0xc0000a8340 {0 0}}
Message Received: {Type:1 Body:hello}
Sending message to all clients in Pool
Message Received: {Type:1 Body:hello}
```

# Conclusion

> **Enjoying This Series?** - If you are enjoying this series, or have any feedback, I would love to hear it on twitter and see your progress in the form of screenshots! - [@Elliot_f](https://twitter.com/elliot_f). 