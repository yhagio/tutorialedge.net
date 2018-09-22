---
author: Elliot Forbes
date: 2017-04-15T08:46:33+01:00
desc: In this tutorial I'll be demonstrating how to create a very simple web server
  using Google's GoLang programming language.
series:
- golang
tags:
- intermediate
title: Creating A Simple Web Server With Golang
twitter: https://twitter.com/Elliot_F
weight: 17
---

In this tutorial, we'll be focusing on creating a very simple web server using the [net/http](https://golang.org/pkg/net/http/) package. If you've ever used something like Node's ExpressJS or Python's Tornado, then you should hopefully see some similarities to how things are handled. 

## Creating a Basic Web Server

Ok, so to begin with, we’ll create a very simple web server that will just return whatever the URL path is of your query. This will be a good base from which we can build on top of.

```go
package main

import (
    "fmt"
    "html"
    "log"
    "net/http"
)

func main() {

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
    })
    
    http.HandleFunc("/hi", func(w http.ResponseWriter, r *http.Request){
        fmt.Fprintf(w, "Hi")
    })

    log.Fatal(http.ListenAndServe(":8081", nil))

}
```

In the above code, we essentially define two different Handlers. These handlers are what respond to any `HTTP` request that matches the string pattern we define as the first parameter. So essentially whenever a request is made for the home page or *http://localhost:8081/*, we'll see our first handler respond as the query matches that pattern.  

## Running Our Server

Ok so now that we've created our own very simplistic server we can try running it by typing go run server.go in to our console. Once this is done head over to your browser and head to http://localhost:8081/world. On this page, you should hopefully see your query string echoed back to you in true "hello world" fashion.

## Adding a bit of Complexity

So now that we've got a basic web server set up, let's try incrementing a counter every time a specific URL is hit. Due to the fact that the web server is asynchronous, we'll have to guard our counter using a mutex in order to prevent us from being hit with race-condition bugs.

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"sync"
)

var counter int
var mutex = &sync.Mutex{}

func echoString(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "hello")
}

func incrementCounter(w http.ResponseWriter, r *http.Request) {
	mutex.Lock()
	counter++
	fmt.Fprintf(w, strconv.Itoa(counter))
	mutex.Unlock()
}

func main() {
	http.HandleFunc("/", echoString)

	http.HandleFunc("/increment", incrementCounter)

	http.HandleFunc("/hi", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hi")
	})

	log.Fatal(http.ListenAndServe(":8081", nil))

}

```

Run this and then navigate to http://localhost:8081/increment and you should see the current count which will be locked, incremented and then unlocked every time you make a request to that page.

## Serving Static Files

Ok, so now that we've set up a simple server in go, it's time to start serving some static files. Create a static folder within your project's directory and then create some simple HTML files. For this example I'm just serving back the following: 

```html
<html>
    <head>
        <title>Hello World</title>
    </head>
    <body>
        <h2>Hello World!</h2>
    </body>
</html>
```

Once you've got this then we can then modify our web server code to use the http.ServeFile method. Essentially this will take in the url of the request made to the server, and if it contains say index.html then it would return the index.html file, rendered as HTML in the browser. If we were to create an edit.html page and send a request to http://localhost:8081/edit.html then it would return whatever HTML content you choose to put in that edit.html page.

```go
package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, r.URL.Path[1:])
	})

	http.HandleFunc("/hi", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hi")
	})

	log.Fatal(http.ListenAndServe(":8081", nil))

}
```

## Checking it Works

Again run the server and navigate to http://localhost:8081/index.html and you should hopefully see your very simple index.html file rendered in all its glory.

<p>I hope you found this tutorial useful and if you did then please let me know in the comments section below! This is part one of a series of GoLang tutorials in which we play around with APIs and creating servers so stay tuned for more!</p>

> Recommended Reading: If you wanted to say display a blog then connecting to a database is vital: [Go MySQL Tutorial](/golang/golang-mysql-tutorial/)