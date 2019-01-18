---
author: Elliot Forbes
date: 2018-06-09T22:48:26+01:00
desc: In this tutorial, we are going to look at how you can implement a testing framework
  for your TypeScript projects using Mocha and Chai
image: golang.png
draft: true
series: 
- gofacerecognition
tags:
- Face Recognition
title: Part 2 - Computing Local Binary Patterns in Go
twitter: https://twitter.com/Elliot_F
weight: 3
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---
In this part of the series, we are going to be implementing the Go code that will perform the task of converting an image from a combination of RGB pixels into a black and white scale representation of the image as a collection of *Local Binary Patterns*.

# The Theory

For each pixel within our image, we'll want to calculate a value for that pixel that is based on it's neighboring pixels. 

# Initializing Our Project

Before any programming can be done, we'll need to get our workspace sorted out. We can do that by creating a new folder on our local machine and running the following commands.

```s
$ mkdir -p go-face-recognition
$ cd go-face-recognition
$ GOMODULES111=ON
$ go mod init github.com/myname/go-face-recognition
```

> **Note -** This assumes that you have the latest version of Go installed on your local development machine.

If these commands have successfully run, we should see the files `go.mod` and `go.sum` added to our directory. 

Awesome, we should be good to go and we can start implementing some Go code. Let's create a `main.go` file within this directory and add the following code:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello World")
}

```

When this has been added, we can try sanity checking everything is working as expected by running the following commands:

```s
$ go run main.go
Hello World
```

# Implementing the Test Cases

Now that we have our initial project setup out of the way we can begin implementing our Face Recognition algorithm.

# Next Part of the Series

In the next part of the series, we'll look at what it takes to calculate the histograms for an image. These histograms will be a crucial part of our project as they will allow us to very quickly compare different images against each other and work out what images are closest in terms of distance.

* [Part 3 - Calculating our Histograms]()

> **Note -** Hopefully you enjoyed part two of this series! If you did, then please help me out by sharing this mini-course far and wide!