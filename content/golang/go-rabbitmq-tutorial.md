---
title: "Go RabbitMQ Tutorial"
date: 2020-05-25T13:24:10+01:00
draft: true
desc: In this tutorial, we are going to look at how you can build incredibly simple Go applications that interact with RabbitMQ.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
tags:
  - intermediate
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

👋 Welcome Gophers! In this tutorial, we are going to be looking at how you can build Go applications that interact with a RabbitMQ broker!

We'll be taking a look at how you can stand up a test RabbitMQ instance on your local machine using Docker and then we'll look at how you can connect in to that RabbitMQ instance from your Go app so that you can publish and subscribe to various topics within the broker.

# Prerequisites

In order to complete this tutorial on your local machine, you are going to need the following tools installed:

* Go v1.12+ - All my new tutorials use Go Modules by default.
* Docker - This will be used to run the local instance of RabbitMQ, if you have another RabbitMQ server you are connecting to then this won't be needed.

# What is RabbitMQ?

RabbitMQ is one of the most popular open source message brokers from the lovely folks over at Pivotal which is now owned by VMWare. 

It's an incredibly lightweight and easy-to-deploy message broker that supports a range of different messaging protocols and features a whole host of different features when it comes to messaging.

It is without a doubt one of the most popular messaging brokers out at the moment and it can be easily distributed across multiple availability zones and regions to help ensure high availability of the service. 

# Setting Up a RabbitMQ Instance Locally

First things first, we'll need an instance of RabbitMQ that we can interact with and play about with. 

The quickest approach is to use the `docker run` command and specifying the image name that we want to run:

```output
$ docker run -d --hostname my-rabbit --name some-rabbit rabbitmq:3
```

This will kick off 

# Getting Started

Now that we've covered some of the theory behind RabbitMQ, let's start off by creating a new directory in which we'll build up our Go application. Within this directory, let's create a new file called `main.go` which will house the entry-point to our application:

<div class="filename">main.go</div>

```go
package main

import "fmt"

func main() {
    fmt.Println("Go RabbitMQ Tutorial")
}
```

# Conclusion

Awesome, so in this tutorial, we've managed to set up a local instance of RabbitMQ running locally on our machine through the help of docker and we've been able to  subsequently build up a Go application that is able to publish and subscribe to this RabbitMQ instance.

If you enjoyed this or have anything you'd like to discuss then please let me know in the comment section down below!

## Further Reading:

If you enjoyed this article, you may also enjoy some of the other articles on the site:

* [Go GraphQL Tutorial - Part 01]()