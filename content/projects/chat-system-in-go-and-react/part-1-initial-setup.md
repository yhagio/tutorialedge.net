---
author: Elliot Forbes
date: 2018-03-19T11:05:52Z
desc: 'In this series, we are going to be building a Chat App in Go and ReactJS'
image: golang.png
series:
- goreactchat
tags:
- golang
title: Part 1 - Initial Setup
twitter: https://twitter.com/Elliot_F
---

We'll start off this course by setting up both of our projects. Once we've got the fairly boring setup out of the way, we can begin to add new functionality and build up our application and see some positive results!

# Setting Up Our Go Project

> **Note -** We'll be using Go version 1.11 for this course as it is the latest at the time of writing this. 

If you are familiar with Go, this step is fairly easy, we'll want to start off by creating a new directory called `backend` within our project directory. 

This `backend` directory will house all of our Go code for this project.

We'll then want to initialize our project by calling:

```s
$ cd backend
$ GOMODDULES=on
$ go mod init github.com/tutorialedge/chat-app/backend
```

This will add a `go.mod` file to our project and should set us up nicely for when we want to start adding some code.

## Validating Everything Works

Once we've called `go mod init` within our `backend/` directory, we'll sanity check that everything is working as intended. 

Add a new file within your `backend/` directory called `main.go` and add the following Go code:

```go
package main 

import "fmt"

func main() {
  fmt.Println("Chat App v0.01")
}
```

Once you have done this and saved your new file, try running it:

```s
$ go run main.go
Chat App v0.01
```

If that worked successfully, we can then move on to setting up our Frontend application.

# Setting Up Our React Frontend

Setting up our frontend is slightly more complex, we'll first start by creating another directory within the root of our project that we'll call `frontend` which will house all of our ReactJS code.

> **Note -** We'll be using [facebook/create-react-app](https://github.com/facebook/create-react-app) in order to generate our React frontend.

```s
$ cd frontend
$ npx create-react-app .
```

Upon running these commands, you should see that it populates our `frontend/` directory with a basic ReactJS application that we can use as our starting point for our application. 

Our directory structure should look something like this:

```s
node_modules/
public/
src/
.gitignore
package.json
README.md
yarn.lock
```

# Next Steps

Awesome, we've successfully setup both our frontend and our backend pieces of our project and we can get cracking on adding cool functionality.

* [Part 2](#)