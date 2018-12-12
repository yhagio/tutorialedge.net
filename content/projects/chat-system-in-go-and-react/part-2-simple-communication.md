---
author: Elliot Forbes
date: 2018-03-19T11:05:52Z
desc: 'In this series, we are going to be building a Chat App in Go and ReactJS'
image: golang.png
series:
- goreactchat
tags:
- golang
title: Part 2 - Simple Communication
twitter: https://twitter.com/Elliot_F
---

> **Note -** This post is part 2 of a series on building a chat application in Go with ReactJS. You can find part 1 here - [Part 1 - Initial Setup](/projects/chat-system-in-go-and-react/part-1-initial-setup/)


So, now that we have our basic frontend and backend set up, it's time to actually do something with them. 

In this part of the series, we'll be implementing a basic WebSocket server which will listen for messages and write them back to via the same WebSocket.

By the end of this part of the series, we'll have a frontend application that can communicate directly with our backend in a two-way fashion. 

# Server

Let's start with our backend WebSocket server. We'll be using the `github.com/gorilla/websocket` package in order to set up our WebSocket endpoints and both read and write to our WebSocket connections. 

In order to install this, we'll need to run this command within our `backend/` directory:

```s
$ go get github.com/gorilla/websocket
```

Once we have the package installed successfully, we can start building up our web server. We'll start by creating a really simple `net/http` server:

```go
package main

import (
	"fmt"
	"net/http"
)

func setupRoutes() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Simple Server")
	})
}

func main() {
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}

```

This will run on `http://localhost:8080` and can be started by calling `go run main.go`. If you navigate to this in the browser, you should see `Simple Server` outputted in plaintext. 
 
# The WebSocket Protocol

Excellent, we've got a really simple server up and running, but how can we extend this so that it uses WebSockets? 

Well, we need to create a new endpoint and upgrade the connection from standard 

> **Note -** You can read more about the official WebSocket protocol here: [RFC-6455](https://tools.ietf.org/html/rfc6455)

# Creating a WebSocket Endpoint

Now that we have covered the theory, let's look at how we can do it in practice. Let's create a new endpoint `/ws` which we will convert from a standard `http` endpoint to a `ws` endpoint.

```go
package main

import (
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// We'll need to define an Upgrader
// this will require a Read and Write buffer size
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

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

// define our WebSocket endpoint
func serveWs(w http.ResponseWriter, r *http.Request) {
  // We'll need to check the origin of our connection
  // this will allow us to make requests from our React 
  // development server to here.
  // For now, we'll do no checking and just allow any connection
  upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	fmt.Println(r.Host)

  // upgrade this connection to a WebSocket
  // connection
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
  }
  // listen indefinitely for new messages coming
  // through on our WebSocket connection
	reader(ws)
}

func setupRoutes() {
  http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Simple Server")
  })
  // mape our `/ws` endpoint to the `serveWs` function
	http.HandleFunc("/ws", serveWs)
}

func main() {
	fmt.Println("Chat App v0.01")
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}

```

Excellent, we now have a working WebSocket server that we can connect to and send messages to. 

## Writing Back to Our WebSocket

Slowly, but surely, we are making progress and building up something pretty cool. But, one way connections aren't all that useful just yet, we need to have some way of communicating back to whoever is connected to us.

Let's create a `writer` function that will take in a pointer to our WebSocket connection. This will allow us to send messages back across our WebSocket connection. 

```go
func writer(conn *websocket.Conn) {
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

func serveWs(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	fmt.Println(r.Host)

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
  }
  // add this line to our serveWs endpoint function
  go writer(ws)
	reader(ws)
}
```

Excellent, we can now run this using `go run main.go`.

# Client

Now that we've set up our server, we need something that will be able to interact with it. This is where our ReactJS frontend comes in to play.

We'll keep this relatively simple and define an `api/index.js` file which will contain our WebSocket connection code.  

```js
// api/index.js
var socket = new WebSocket('ws://localhost:8080/ws');

let connect = () => {
  console.log("Attempting Connection...")

  socket.onopen = () => {
    console.log("Successfully Connected");
  }
  
  socket.onmessage = (msg) => {
    console.log(msg);
  }

  socket.onclose = (event) => {
    console.log("Socket Closed Connection: ", event)
  }

  socket.onerror = (error) => {
    console.log("Socket Error: ", error)
  }
};

let sendMsg = (msg) => {
  console.log("sending msg: ", msg);
  socket.send(msg);
};

export { connect, sendMsg };

```

So, in the above code, we have defined 2 functions that we've subsequently exported. These are `connect()` and `sendMsg(msg)`. 

The first of which, connects to the WebSocket endpoint in question and listens for events such as successful connection with `onopen`. If it sees any issue such as a closed socket or an error, it will proceed to print out these issues to the browser console.

The second function, our `sendMsg(msg)` function, allows us to send messages from our frontend to our backend via our WebSocket connection using `socket.send()`. Nice and simple!

Let's now update our `App.js` file within our React project and add the call to `connect()` and create a `<button/>` element which triggers our `sendMsg()` function.

```js
// App.js
import React, { Component } from 'react';
import './App.css';
import { connect, sendMsg } from './api';

class App extends Component {
  constructor(props) {
    super(props);
    connect();
  }
  
  send() {
    console.log("hello");
    sendMsg("hello");
  }

  render() {
    return (
      <div className="App">
          <button onClick={this.send}>Hit</button>  
      </div>
    );
  }
}

export default App;
```

Upon successfully compiling this, we should see in our browser a solitary button element, and if you open up your browser console, you should also see that it has been able to successfully connect to our backend WebSocket server running on `localhost:8080`.

> **Question -** What happens when you click this button? What Output do you see in the console of your browser and in the console of your backend?

# Conclusion

So, thus concludes part 2 of this series. We've been able to create a really simple WebSocket server that echo's back any messages sent to it. 

This step, is a critical first step in developing our application and now that we have the basics up and running, we can start to look at implementing basic chat functionality and making our app useful!

> **Enjoying This Series?** - If you are enjoying this series, or have any feedback, I would love to hear it on twitter and see your progress in the form of screenshots! - [@Elliot_f](https://twitter.com/elliot_f). 
