---
author: Elliot Forbes
date: 2018-03-19T11:05:52Z
desc: "In this series, we are going to be building a Chat App in Go and ReactJS"
image: golang.svg
series:
  - goreactchat
tags:
  - golang
title: Part 1 - Initial Setup
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

We'll start off this course by setting up both of our projects. Once we've got
the fairly boring setup out of the way, we can begin to add new functionality
and build up our application and see some positive results!

# Goals

By the end of this part of the tutorial series, you will have:

* Created the basic Go application within a `backend/` directory.
* Created a basic ReactJS application within a `frontend/` directory.

With both of these achieved, you will then be able to start adding functionality
to your real-time chat system in the following parts of the course. 

# Prerequisites

In order to complete this tutorial series, you will need to meet the following 
prerequisites.

* You will need `npm` installed on your machine. 
* You will need `npx` installed on your machine. This can be installed by typing
`npm install -g npx`. 
* You will need Go version 1.11+ installed on your machine.
* You will need a code editor such as Visual Studio Code, in which you can 
develop this project.

# Setting Up Our Go Project

If you are familiar with Go, this step is fairly easy, we'll want to start off
by creating a new directory called `backend` within our project directory.

This `backend` directory will house all of our Go code for this project. We'll
then want to initialize our project by calling:

```s
$ cd backend
$ GO111MODULE=on
$ go mod init github.com/TutorialEdge/realtime-chat-go-react
```

This should initialize go modules within our backend project and it means we can
start fleshing out our project and making it a proper Go application.

Once, you've run these commands, you should notice that this has automatically
generated two new files within your `backend/` directory. These should be the
`go.mod` and the `go.sum` files.

- **go.mod** - This file is a bit like your standard `package.json` in a NodeJS
  project. It basically details all of the packages and versions required by our
  project in order to build and run.
- **go.sum** - This file is used for validation purposes, it contains the
  expected cryptographic checksums of the content of specific module versions
  for your application.

> **Note -** For more information on the new experimental Go modules feature,
> check out the official Wiki page:
> [Go Modules](https://github.com/golang/go/wiki/Modules)

## Validating Everything Works

Once we've called `go mod init` within our `backend/` directory, we'll sanity
check that everything is working as intended.

Add a new file within your `backend/` directory called `main.go` and add the
following Go code:

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

Awesome, if that worked successfully, we can then move on to setting up our
Frontend application.

# Setting Up Our React Frontend

Setting up our frontend is slightly more complex, we'll first start by creating
another directory within the root of our project that we'll call `frontend`
which will house all of our ReactJS code.

> **Note -** We'll be using
> [facebook/create-react-app](https://github.com/facebook/create-react-app) in
> order to generate our React frontend.

```s
$ cd frontend
```

You will then need to create a new ReactJS application using the `create-react-app`
package. This can be installed with `npm`:

```s
$ npm install -g create-react-app
```

Once this is installed, you should then be able to create your new ReactJS application
with the following command:

```s
$ npx create-react-app .
```

Upon running these commands, you should see that it populates our `frontend/`
directory with a basic ReactJS application that we can use as our starting point
for our application.

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

## Running Your ReactJS App Locally

Now that you have successfully created your basic ReactJS application, it is time
to test that everything is working as expected. Try running your application by
typing the following:

```s
$ npm start
```

If everything went to plan, you will see that your new ReactJS application compiles
and is served on a local development server running on `http://localhost:3000`:

```output
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://192.168.1.234:3000/

Note that the development build is not optimized.
To create a production build, use yarn build.
```

Perfect, you now have a basic ReactJS which can be extended in the next parts of this
tutorial series.

# Conclusion

Awesome, you have now successfully setup both your frontend and your backend pieces of
our project and we can get cracking on adding cool new functionality. 

> **Check out the next part of this series here:
[Part 2 - Simple Communication](/projects/chat-system-in-go-and-react/part-2-simple-communication/)**
