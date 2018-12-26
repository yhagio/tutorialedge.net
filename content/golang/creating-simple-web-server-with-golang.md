---
author: Elliot Forbes
date: 2017-04-15T08:46:33+01:00
desc: In this tutorial I'll be demonstrating how to create a very simple web server
  using Google's GoLang programming language.
series: golang
image: golang.png
tags:
- intermediate
title: Creating A Simple Web Server With Golang
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 17
---

> **Last Updated -** 3rd December, 2018

Web servers are always a really cool and relatively simple project to get up and running when trying to learn a new language. In Go, this is no different, and building a web server using the `net/http` package is an excellent way to come to grips with some of the basics.

In this tutorial, we'll be focusing on creating a very simple web server using the [net/http](https://golang.org/pkg/net/http/) package. If you've ever used something like Node's ExpressJS or Python's Tornado, then you should hopefully see some similarities to how things are handled. 

We'll first focus on building a simple server that can serve some really simple content back to a client making requests to our server. Once we have achieved this, we'll then look at how we can serve static files before finally moving on to how we can serve these files using HTTP over TLS or `https` for short.

# Creating a Basic Web Server

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

# Running Our Server

Ok so now that we've created our own very simplistic server we can try running it by typing `go run server.go` in to our console. Once this is done head over to your browser and head to `http://localhost:8081/world`. On this page, you should hopefully see your query string echoed back to you in true "hello world" fashion.

# Adding a bit of Complexity

So now that we've got a basic web server set up, let's try incrementing a counter every time a specific URL is hit. Due to the fact that the web server is asynchronous, we'll have to guard our counter using a `mutex` in order to prevent us from being hit with race-condition bugs. 

> **Note -** If you are unsure as to what a mutex is, don't worry, this is just being used to highlight that these servers aren't guarded against race conditions. If you want to learn more on mutexes, you can check out my other tutorial here: [Go Mutex Tutorial](/golang/go-mutex-tutorial/) 

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

# Serving Static Files

Now that we've had a look at the asynchronous nature of a Go based web server, we can move on to serving some static files. 

First, create a static folder within your project's directory and then create some simple HTML files. For this example I'm just serving back the following: 

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

Once you've got this then we can then modify our web server code to use the http.ServeFile method. Essentially this will take in the url of the request made to the server, and if it contains say index.html then it would return the index.html file, rendered as HTML in the browser. 

If we were to create an edit.html page and send a request to http://localhost:8081/edit.html then it would return whatever HTML content you choose to put in that edit.html page.

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

# Serving Content from a Directory

So, the above method works at serving files based on it's path, but doing it this way means we have a directory structure that looks a little like this:

```s
- main.go # our webserver
- index.html
- styles/
- - style.css
- images/
- - image1.png
- ...
```

This isn't too bad, but if our Go web server grows in complexity, we may want to move our website content into a directory of it's own. Let's create a directory within our project called `static/` which will contain all of our website's static files. 

```s
# Our Updated project structure
- main.go
- static/
- - index.html
- - styles/
- - - style.css
- - images/
- - - image1.png
- ...
```

If we want to do this, we'll need to modify our existing web server code like so:

```go
package main

import (
	"log"
	"net/http"
)

func main() {

	http.Handle("/", http.FileServer(http.Dir("./static")))

	log.Fatal(http.ListenAndServe(":8081", nil))
}
```

As you can see, we've moved away from using the `HandleFunc` method and we've started using `http.Handle()` passing in our path and `http.Dir()` which points to our newly created `static/` directory.

## Checking it Works

Now that we've updated our code, let's try running it once again using `go run main.go`. This will kick off our web server once again at `http://localhost:8081` and if we try and navigate to that URL, we should see the `index.html` that we have within our newly created `static` directory.

# Serving Content over HTTPS

Perfect, so we've been able to create a really simple web server that can serve any of the static files we want, but we've not yet thought about security. How do we go about securing our web server and serving our content using `HTTPS`?

With Go, we can modify our existing web server to use `http.ListenAndServeTLS` like so:

```go
package main

import (
	"log"
	"net/http"
)

func main() {

	http.Handle("/", http.FileServer(http.Dir("./static")))

	log.Fatal(http.ListenAndServeTLS(":443", "server.crt", "server.key", nil))
}

```

> **Note -** In this example, I pass in already generated `server.crt` and `server.key` certificate files. 

## Generating Keys

If you don't have keys already generated, you can generate self-signed certs locally using `openssl`:

```s
$ openssl genrsa -out server.key 2048
$ openssl ecparam -genkey -name secp384r1 -out server.key
$ openssl req -new -x509 -sha256 -key server.key -out server.crt -days 3650
```

This should generate self-signed certs for your locally and you can then try start your `https` web server by typing `go run main.go`. When you navigate to `https://localhost:8081` you should see that the connection is now secured based on your self-signed cert.

# Conclusion

I hope you found this tutorial useful and if you did then please let me know in the comments section below! This is part one of a series of GoLang tutorials in which we play around with APIs and creating servers so stay tuned for more!

## **Recommended Reading:** 

* [Authenticating your REST API with JWTs](/golang/authenticating-golang-rest-api-with-jwts/)
* [Go MySQL Tutorial](/golang/golang-mysql-tutorial/)