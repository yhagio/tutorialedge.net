---
author: Elliot Forbes
date: 2018-07-14T22:33:43+01:00
desc: In this course, we will be taking a look at everything you need to know about
  Docker if you are a golang based developer
image: docker.png
series: docker
tags:
- docker
title: Docker for Go Developers
twitter: https://twitter.com/Elliot_F

---

In this tutorial, we are going to look at how we can leverage Docker as Go developers. 

By the end of this tutorial, we will have covered the following topics:

* Creating a Simple Dockerfile for a simple Go Program
* Mounting Volumes in Docker
* Auto-build on changes

# Our Basic Go Program

For the purpose of this tutorial, we'll be using the code from my [go WebServer tutorial](/golang/creating-simple-web-server-with-golang/)

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

	http.HandleFunc("/hi", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hi")
	})

	log.Fatal(http.ListenAndServe(":8080", nil))

}
```

# A Simple Example

Let's start by creating a simple `Dockerfile` that will allow us to run a very simple Go program that runs on port 8080. 

```dockerfile
# All Dockerfiles start from a base image
# you want to choose as lightweight a base
# image to start with as possible
FROM golang:1.11.4-alpine
# we create a directory within our docker image
# that will contain all of the code for our app
RUN mkdir /app
# We need to copy the current directory
# into our /app directory 
ADD . /app
# we set our workdir
WORKDIR /app
# We build our go application and
# specify the name of the executable we 
# want to build
RUN go build -o main .
# here we trigger our newly built Go program
CMD ["/app/main"]
```

Once we have done all that, we then have to go about building our Docker image. We can do this by running a `docker build` command and passing in the name of the image we want to create.

```s
$ docker build -t my-go-image .
```

Depending on the speed of our connection, this may take a while. But we should see that the build command goes away and pulls down all of the images that our base image depends upon before attempting to run through all of the steps we've outlined within our `Dockerfile`.

Upon successfully building our image, we can then set about running it on our local machine through the `docker run` command.

```s
$ docker run -it -p 8080:8080 my-go-image
```

Let's break down some of the flags we've passed in here:

* **-it** - This flag is a combination of two flags `i` and `t`, which declare that we want to run this in `interactive` mode, i.e. with a terminal so that you can easily see program output.
* **-p 8080:8080** - This flag declares what ports we'll be using. In this case we want to run our program on port 8080 within our docker container, and we want to map it to port 8080 on our host machine. 
* **my-go-image** - We declare what docker image we wish to run, in this case we want to run the new docker image we've just built

Awesome, when this runs, you should see that our simple Go program kicks off successfully and we should see any output from our program streaming out in the terminal.

# Mounting Volumes

Now that we've got a really simple example up and running, let's take a look at how we can construct a more complex Docker image that *mounts* a particular directory within our project.

What does this mean exactly? Well, let's imagine we were building a web server that served a bunch of static files from a `/static` directory. 

It would be a royal pain in the butt if we had to build our docker image and re-run every time we made a change to any of our static files, so what we can instead do is *mount* our docker image onto our `/static` directory using `volumes`.

This effectively allows us to share data between both our host machine (our laptop) and our running docker container. 

```s
$ docker run -it -p 8080:8080 -v $(pwd)/static:/app/static my-go-image
```

Now, if we make any changes to any of our `/static` directory files, we should see those changes being automatically reflected within our running docker container.

If we update our Go code to serve files from a `/static` directory and create a new `index.html` within that directory, we should be able to verify this works:

```go
package main

import (
	"log"
	"net/http"
)

func main() {

	http.Handle("/", http.FileServer(http.Dir("./static")))

	log.Fatal(http.ListenAndServe(":8080", nil))

}
```

We can then create our `/static/index.html`:

```html
<!-- /static/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <title>test</title>
</head>
<body>
    <h1>Does Stuff</h1>
</body>
</html>
```

Before finally building our image and running it using the `-v` volume flag:

```s
$ docker build -t my-go-image .
$ docker run -it -p 8080:8080 -v $(pwd)/static:/app/static my-go-image
```

Now, when you navigate to `http://localhost:8080` you should see our newly created `index.html` being served back to us. 

> **Try it Yourself -** Try updating the `index.html` file and changing the `<h1/>` tag contents on `line 7`. Then refresh your browser window.


# Conclusion

So, in this tutorial, we covered how we can use Docker for fame and fortune when building your Go applications. 

Hopefully you found this useful, if you did, or if you have any comments or suggestions then please let me know in the suggestion box below! 

> **Note -** If you want to keep up to date with the latest articles and updates on the site then please feel free to follow me on twitter: [@Elliot_f](https://twitter.com/elliot_f)