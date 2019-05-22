---
title: "Containerizing your Go Applications with Docker - Tutorial"
date: 2019-03-02T22:36:27Z
desc: In this tutorial, we look at how you can containerize your Go applications using Docker!
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
tags:
  - docker
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

Docker is a truly excellent bit of tech that allows us to specify the environment in which we want all of our applications to live within a simple `Dockerfile`. This effectively allows for easier collaboration and rids us of the _"it works on my machine"_ problem that is soo prevalent in development teams across the globe.

As such, I felt it would be a great idea to write a tutorial on how you can effectively containerize your Go applications using the Docker containerization technology.

By the end of this tutorial, you should have a good handle on the following:

- The basics of Docker and how it is useful to us developers
- Writing a Simple Dockerfile for your Go applications
- Finally, we'll look at how you can deploy these applications easily to DigitalOcean

Why DigitalOcean? we'll I'm secretly hoping they start sponsoring some of my upcoming video tutorials so that I can start focusing on writing content full time! :D

# Video Tutorial

{{< youtube id="lIbdPrUpGz4" autoplay="false" >}}

# Why Docker?

I've been asked this question a number of times, in a number of different contexts over the past few years and I've given talks about this particular bit of tech to developers of all levels of experience.

The main benefits of Docker become obvious when you are working on critical applications that require complex environment setup in order to run. Essentially, everything your application needs to run should be defined in a `Dockerfile` at the root of your application.

This includes things like environment variables, specific Go versions or build steps, or instructions on what directories need mounted and so on.

By investing the time to declare these in a Dockerfile upfront, you essentially make your app portable across any machine that can run docker. If you have new developers joining a team, you can simply point them to a repository with a `Dockerfile` already defined in it, give them the start command to run it locally and that's them set up and ready to start working on your system.

# Our Go Code

This tutorial will effectively act as a perfect example of this portability, as at the end of this, _if I have done my job right_, you should be able to run this application locally with a simple `docker` command.

> **Note** - For this particular tutorial, I'm going to be stealing the source code from my other tutorial on [Building a simple Web Server in Go](/golang/creating-simple-web-server-with-golang/). 

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

Awesome, if we want to run this then we can do so by running `go run main.go` which will kick of a server on `http://localhost:8081`.

# Writing a Dockerfile

Now that we have our server, let's set about writing our `Dockerfile` and constructing the container in which our newly born Go application will live.

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

Now that we have defined everything we need for our Go application to run in our `Dockerfile`
we can now build an _image_ using this file. In order to do that, we'll need to run the following
command:

```s
$ docker build -t my-go-app .
Sending build context to Docker daemon   5.12kB
Step 1/6 : FROM golang:1.12.0-alpine3.9
 ---> d4953956cf1e
Step 2/6 : RUN mkdir /app
 ---> Using cache
 ---> be346f9ff24f
Step 3/6 : ADD . /app
 ---> eb420da7413c
Step 4/6 : WORKDIR /app
 ---> Running in d623a88e4a00
Removing intermediate container d623a88e4a00
 ---> ffc439c5bec5
Step 5/6 : RUN go build -o main .
 ---> Running in 15805f4f7685
Removing intermediate container 15805f4f7685
 ---> 31828faf8ae4
Step 6/6 : CMD ["/app/main"]
 ---> Running in 9d54463b7e84
Removing intermediate container 9d54463b7e84
 ---> 3f9244a1a240
Successfully built 3f9244a1a240
Successfully tagged my-go-app:latest
```

You'll see that the output of this _build_ command has run through all of the 6 lines we have
defined within our `Dockerfile` as individual steps. Now the first time you run this may
take a fair length of time as it needs to pull down any dependencies, but after this initial
loading, building your image should be fairly quick as Docker cleverly caches the results
from each of these steps to ensure speedy build times on subsequent builds.

We can now verify that our image exists on our machine by typing `docker images`:

```s
$ docker images
REPOSITORY                                 TAG                 IMAGE ID            CREATED             SIZE
my-go-app                                  latest              3f9244a1a240        2 minutes ago       355MB
```

Awesome, we now have a docker image that we can subsequently run on our machine!

In order to run this newly created image, we can use the `docker run` command and pass in the
ports we want to map to and the image we wish to run. 

```s
$ docker run -p 8080:8081 -it my-go-app
```

* _-p 8080:8081_ - This exposes our application which is running on port 8081 within our 
container on `http://localhost:8080` on our local machine. 
* _-it_ - This flag specifies that we want to run this image in interactive mode with a `tty` 
for this container process.
* _my-go-app_ - This is the name of the image that we want to run in a container. 

Awesome, if we open up `http://localhost:8080` within our browser, we should see that our application is successfully responding with `Hello, "/"`. 

## Running our Container In the Background

You'll notice that if we `ctrl-c` this within the terminal, it will kill the container. If we want to have it run permanently in the background, you can replace _-it_ with _-d_ to run this container in detached mode.

In order to view the list of containers running in the background you can use `docker ps` which should output something like this:

```s
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
70fcc9195865        my-go-app           "/app/main"              5 seconds ago       Up 3 seconds        0.0.0.0:8080->8081/tcp   silly_swirles
```

If we then wanted to kill this container, we could do so by using the `docker kill` command and pass in that container ID that is prints out in the terminal.

# Deploying our Docker Application to DigitalOcean

Now that we have a fully functioning containerized Go application, it's time to put it somewhere so that the world can see it in all of its glory!

I've not had much of a chance to play about with DigitalOcean as of yet, so I'm taking this tutorial as an opportunity to try out some of their services and features so that I'm not confined to the world of AWS permanently.

## Step 1 - Pushing to a Github Repo

It's always good practice to store your source code in a GitHub repo regardless of what you are doing. Further down the line, if we start automating the task of deployment using tools such as Jenkins or other continuous deployment tools, then having your code in a source control system is a vital part of that.

For the purpose of this tutorial, I've created a new repository here: [TutorialEdge/go-docker-tutorial](https://github.com/TutorialEdge/go-docker-tutorial). Next, I'll want to commit and push my code up to this repository like so:

```s
$ git init
$ git remote add origin https://github.com/TutorialEdge/go-docker-tutorial.git
$ git add .
$ git commit -m "Initial Commit"
$ git push origin master
```

When we next refresh our GitHub repository, we should see that our source code has been successfully committed and pushed up!

## Step 2 - Creating a Droplet and ssh-ing To That Droplet

Awesome, so the next step is to get a Droplet up and running within our DigitalOcean account that we can then deploy a Docker container to. 

Create a new droplet using the `One-click apps` Docker 18.09.2~3 on 18.04 image with the $5/month plan and then add your ssh key so that you can subsequently ssh into that newly created server.

## Step 3 - Deploying our Application

Finally, take the IP address of your new Droplet and ssh into it. Once you've ssh-ed into it, you can deploy our newly docker-ized Go application by first pulling it from GitHub and then using the same 2 docker commands we used on our local machine!

```s
$ ssh root@1.2.3.4
$ git clone https://github.com/tutorialedge/go-docker-tutorial.git app/
$ docker build -t my-go-app .
$ docker run -d -p 8080:8081 my-go-app
```

After running these commands, you should now be able to navigate to `http://1.2.3.4:8080`, replacing `1.2.3.4` with the IPv4 address of your newly started Droplet. You should now see `Hello World` printing out in your browser!

# Conclusion

Hopefully this tutorial was helpful! If you have any suggestions for what can be improved, or what additional content you would like to see then please let me know in the suggestions box below!

> **Note -** If you want to keep track of when new Go articles are posted to the
> site, then please feel free to follow me on twitter for all the latest news:
> [@Elliot_F](https://twitter.com/elliot_f).
