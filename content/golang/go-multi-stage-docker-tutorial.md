---
title: "Go Multi-Stage Docker Tutorial"
date: 2019-03-16T11:16:25Z
desc: In this follow-up tutorial, we are going to look at how you can optimize containerizing our Go applications with Multi-stage Docker images.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
tags:
  - docker
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

Welcome fellow coders! In this tutorial, we are going to be looking at multi-stage
Docker images and how you can use them to minimize the size of the container needed for
your production Go applications.

By the end of this tutorial, we will have covered the following concepts:

- What Multi-stage Dockerfiles are.
- How we can build simple multi-stage Dockerfiles for our Go Apps

Docker is a seriously power containerization technology that can be used to easily spin up
isolated and reproducible environments in which our applications can be built and run.
It's growing in popularity and more and more cloud service providers are providing native
docker support to allow you to easily deploy your containerized apps for the world to see!

> _**Note**_ - This tutorial is a follow up to my previous Go + Docker tutorial which can be found here: [Containerizing Your Go Applications with Docker](/golang/go-docker-tutorial/)

# What is The Need for Multi-Stage Dockerfiles?

In order to see why multi-stage Dockerfiles are useful, we'll be creating a simple Dockerfile that
features one stage to both build and run our application, and a second Dockerfile which features
both a builder stage and a production stage.

Once we've created these two distinct Dockerfiles, we should be able to compare them and hopefully
see for ourselves just how multi-stage Dockerfiles are preferred over their simpler counterparts!

So, In my previous tutorial, we created a really simple Docker image in which our Go application was both built and run from. This `Dockerfile` looked something like this:

```Dockerfile
# We specify the base image we need for our
# go application
FROM golang:1.12.0-alpine3.9
# We create an /app directory within our
# image that will hold our application source
# files
RUN mkdir /app
# We copy everything in the root directory
# into our /app directory
ADD . /app
# We specify that we now wish to execute
# any further commands inside our /app
# directory
WORKDIR /app
# we run go build to compile the binary
# executable of our Go program
RUN go build -o main .
# Our start command which kicks off
# our newly created binary executable
CMD ["/app/main"]
```

And with this we could subsequently build our Docker image using a very simple `docker build`
command:

```s
$ docker build -t go-simple .
```

This would create an image and store it within our local docker image repository and would end up
looking something like this:

```s
$ docker images
REPOSITORY              TAG                 IMAGE ID            CREATED             SIZE
go-simple               latest              761b9dd5f9a4        4 seconds ago       793MB
```

You should hopefully notice that last column states that the size of this image
is 793MBs in size. This is absolutely massive for something that builds and runs
a very simple Go application.

Within this image will be all the packages and dependencies that are needed to both compile and run
our Go applications. With multi-stage dockerfiles, we can actually reduce the size of these images
dramatically by splitting things up into two distinct stages.

# A Simple Multi-Stage Dockerfile

Using multi-stage Dockerfiles, we can pick apart the tasks of building and running our
Go applications into different stages. Typically, we start off with a large image which
includes all of the necessary dependencies, packages, etc. needed to compile the binary
executable of our Go application. This would be classed as our `builder` stage.

We then take a far more lightweight image for our `run` stage which includes only what is
absolutely needed in order to run a binary executable. This would typically be classed as
a `production` stage or something similar.

```Dockerfile
# We use the larger image which includes
# all of the dependencies that we need to
# compile our program
FROM bigImageWithEverything AS Builder
RUN go build -o main ./...

# We then define a secondary stage which
# is built off a far smaller image which
# has the absolute bare minimum needed to
# run our binary executable application
FROM LightweightImage AS Production
CMD ["./main"]
```

By doing it this way, we benefit from a consistent build stage and we benefit from having
absolutely tiny images in which our application will run in a production environment.

> **Note** - In the above _psuedo-Dockerfile_, I've aliased my images using the `AS` keyword.
> This can help us differentiate different stages of our Dockerfile and we can use the `--target`
> flag to build specific stages.

# A Real-Life Example

Now that we've covered the basic concepts, let's take a look at how we could define a real
multi-stage Dockerfile that will first compile our application and subsequently run our
application in a lightweight Docker `alpine` image.

For the purpose of this tutorial, we'll be stealing the code from my new [Go WebSockets Tutorial](/golang/go-websocket-tutorial/) as this demonstrates downloading dependencies and is a non-trivial example and thus closer to a _real_ Go application than a standard `hello world` example.

Create a new file within your project's directory called `main.go` and add the following code:

```go
package main

import (
    "fmt"
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

func homePage(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Home Page")
}

func wsEndpoint(w http.ResponseWriter, r *http.Request) {
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
    http.HandleFunc("/", homePage)
    http.HandleFunc("/ws", wsEndpoint)
}

func main() {
    fmt.Println("Hello World")
    setupRoutes()
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

> **Note** - I have initialized this project to use go modules using the `go mod init` command.
> This can be run locally outside of a docker container using Go version 1.11 and by calling
> `go run ./...`

Next, we'll create a `Dockerfile` in the same directory as our `main.go` file above. This will feature a `builder` stage and a `production` stage which will be built from two distinct base
images:

```Dockerfile
# We'll choose the incredibly lightweight
# Go alpine image to work with
FROM golang:1.11.1 AS builder

# We create an /app directory in which
# we'll put all of our project code
RUN mkdir /app
ADD . /app
WORKDIR /app
# We want to build our application's binary executable
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./...

# the lightweight scratch image we'll
# run our application within
FROM alpine:latest AS production
# We have to copy the output from our
# builder stage to our production stage
COPY --from=builder /app .
# we can then kick off our newly compiled
# binary exectuable!!
CMD ["./main"]
```

Now that we've defined this multi-stage Dockerfile, we can proceed to build it using the
standard `docker build` command:

```s
$ docker build -t go-multi-stage .
```

Now, when we compare the sizes of our simple image against our multi-stage image, we should see a dramatic difference in sizes. Our previous, `go-simple` image was roughly 800MB in size, whereas
this multi-stage image is about 1/80th the size.

```s
$ docker images
REPOSITORY              TAG                 IMAGE ID            CREATED             SIZE
go-multi-stage          latest              12dd51472827        24 seconds ago      12.3MB
```

If we want to try running this to verify it all works, we can do so using the following `docker run` command:

```s
$ docker run -d -p 8080:8080 go-multi-stage
```

This will kick off our docker container running in `-d` detached mode and we should be able to
open up `http://localhost:8080` in our browser and see our Go application returning the
`Hello World` message back to us!

> **Exercise** - copy the `index.html` from the [Go WebSockets Tutorial](/golang/go-websocket-tutorial/) and open that in a browser, you should see that it connects into
> our containerized Go application and you should be able to view the logs using the
> `docker logs` command.

# Conclusion

To wrap things up, in this tutorial, we looked at how we could define a really simple Dockerfile
which creates a heavy Docker image. We then looked at how we could optimize this by using
multi-stage `Dockerfile`s which left us with incredibly lightweight images.

If you enjoyed this tutorial, or if you have any comments/feedback/suggestions, then I'd love to hear them in the suggestion box below!

> **Note -** If you want to keep track of when new Go articles are posted to the
> site, then please feel free to follow me on twitter for all the latest news:
> [@Elliot_F](https://twitter.com/elliot_f).
