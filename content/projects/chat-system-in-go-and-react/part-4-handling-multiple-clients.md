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

Our application will look a little like this by the end of this part of the course:

![Chat Application Screenshot](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/chat-app-go-react/screenshot-01.png)


# Splitting out our Websocket Code

Now that we've done that necessary bit of house-cleaning, we can move on to improving our codebase. We're going to be splitting up some of our application into sub-packages for easier development.

Now, ideally, your `main.go` file should just be an entry point into your Go application, it should be fairly minimal and call out to other packages within your project. 

> **Note -** We'll be basing our project layout on the unofficial standard for Go projects - [golang-standards/project-layout](https://github.com/golang-standards/project-layout)

Let's create a new directory called `pkg/` within our backend directory. Within this, we'll want to create another directory called `websocket/` which will contain a `websocket.go` file.

We'll be moving a lot of our WebSocket specific code that we currently have in our `main.go` file into this new `websocket.go` file. 

> **Note -** One key thing to note though, is that when we copy over our functions, we'll need to capitalize first letter of each function that we want to make visible to the rest of our project.

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

Now that we've created this new `websocket` package, we'll then want to update our `main.go` file to call out to this new package. We'll first have to add a new import to our list of imports at the top of our file, and then we can call the functions within that package by prepending the calls with `websocket.` like so:

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

We're going to be working on a system that features a lot of concurrent connections. For each of these concurrent connections, a new `goroutine` is spun up for the duration of that connection. This means that we have to worry about communication across these concurrent `goroutines` and ensure that whatever we are doing, is thread-safe. 

This means that, when we are implementing a `Pool` structure further down the line, we'll have to consider either using a `sync.Mutex` to mutually exclude `goroutines` from simultaneously accessing/modifying our data, or we can use `channels`.

For this project, I think we'll be better off using `channels` and using them to communicate in a safe fashion across these multiple, concurrent `goroutines`.

> **Note -** If you wish to learn more about channels in Go, you can check out my other article here: [Go Channels Tutorial](/golang/go-channels-tutorial/)

## Client.go

Let's start off by creating a new file called `Client.go`, this will live within our `pkg/websocket` directory and within it we'll define a `Client` struct which contain the following:

* **ID** - a uniquely identifiably string for a particular connection
* **Conn** - a pointer to a `websocket.Conn` object
* **Pool** - a pointer to the Pool which this client will be part of

We'll also define a `Read()` method which will constantly listen in for new messages coming through on this `Client`'s websocket connection. 

If there are any messages, it will pass these messages to the Pool's `Broadcast` channel which subsequently broadcasts the received message to every client within the pool.

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

Awesome, now that we've defined our Client within our code, we can move on to implementing our Pool. 

## Pool Struct

We'll create a new file within the same directory as our `client.go` file and our `websocket.go` file called `pool.go`

Let's start off by defining a `Pool` struct which will contain all of the `channels` we need for concurrent communication, as well as a `map` of clients.

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

We need to ensure that only one point of our application has the ability to write to our WebSocket connections or we'll face concurrent write issues. So, let's define our `Start()` method which will constantly listen for anything passed to any of our `Pool`'s channels and then, if anything is received into one of these channels, it'll act accordingly.

* **Register** - Our register channel will send out `New User Joined...` to all of the clients within this pool when a new client connects.
* **Unregister** - Will unregister a user and notify the pool when a client disconnects.
* **Clients** - a map of clients to a boolean value. We can use the boolean value to dictate active/inactive but not disconnected further down the line based on browser focus. 
* **Broadcast** - a channel which, when it is passed a message, will loop through all clients in the pool and send the message through the socket connection.

Let's code this up now:

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

Awesome, let's make some more small changes to our `websocket.go` file and remove some of the no-longer necessary functions and methods:

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

# Updating our main.go file:

And finally, we'll need to update our `main.go` file to create a new `Client` on every connection and to register that client with a `Pool`:

```go
package main

import (
	"fmt"
	"net/http"

	"github.com/TutorialEdge/realtime-chat-go-react/pkg/websocket"
)

func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("WebSocket Endpoint Hit")
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+v\n", err)
	}

	client := &websocket.Client{
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func setupRoutes() {
	pool := websocket.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})
}

func main() {
	fmt.Println("Distributed Chat App v0.01")
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
```

# Testing it Works

Now that we've made all of the necessary changes, we should be in a great place to test what we've done and ensure everything is working as intended. 

Kick off your backend application:

```s
$ go run main.go
Distributed Chat App v0.01
```

If you open up `http://localhost:3000` in a couple of browser tabs, you should notice that these connect automatically to our backend WebSocket server and we can now send and receive messages from other clients connected within the same `Pool`!

![Chat Application Screenshot](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/chat-app-go-react/screenshot-01.png)

# Conclusion

So, in this part of the series, we managed to implement a way to handle multiple clients and broadcast messages to everyone connected in the connection pool. 

Now things are starting to get a bit more interesting. We can start adding in cool new features such as custom messages in the next part of this series.

Check out the next part of this series here: [Part 5 - Improving the Frontend](/projects/chat-system-in-go-and-react/part-5-improved-frontend/)

> **Enjoying This Series?** - If you are enjoying this series, or have any feedback, I would love to hear it on twitter and see your progress in the form of screenshots! - [@Elliot_f](https://twitter.com/elliot_f). 