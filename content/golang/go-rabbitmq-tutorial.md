---
title: "Go RabbitMQ Beginners Tutorial"
date: 2020-05-25T13:24:10+01:00
desc: In this tutorial, we are going to look at how you can build incredibly simple Go applications that interact with RabbitMQ.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
tag: Intermediate
tags: 
 - intermediate
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

👋 Welcome Gophers! In this tutorial, we are going to be looking at how you can build Go applications that interact with a RabbitMQ broker!

We'll be taking a look at how you can stand up a test RabbitMQ instance on your local machine using Docker and then we'll look at how you can connect in to that RabbitMQ instance from your Go app so that you can publish and subscribe to various topics within the broker.

## Prerequisites

In order to complete this tutorial on your local machine, you are going to need the following tools installed:

* Go v1.12+ - All my new tutorials use Go Modules by default.
* Docker - This will be used to run the local instance of RabbitMQ, if you have another RabbitMQ server you are connecting to then this won't be needed.

## Video Tutorial 

This tutorial is available in video format if you prefer following along that way! Please make sure to like and subscribe to my channel for more Go content!

{{< youtube id="pAXp6o-zWS4" autoplay="false">}}

## What is RabbitMQ?

RabbitMQ is one of the most popular open source message brokers from the lovely folks over at Pivotal which is now owned by VMWare. 

It's an incredibly lightweight and easy-to-deploy message broker that supports a range of different messaging protocols and features a whole host of different features when it comes to messaging.

It is without a doubt one of the most popular messaging brokers out at the moment and it can be easily distributed across multiple availability zones and regions to help ensure high availability of the service. 

## Why Use Brokers?

Using Brokers allows us as developers to implement more resilient distributed systems that are able to handle parts of the application going down.  

Let's take an example where we have multiple client systems that handle credit card transactions. You want these systems to be able to be as resilient as possible and ensure that no transactions are lost should the backend systems processing these requests go down for any reason. You also want to minimize the impact to the clients should this happen, you may not want to flat out reject all incoming requests whilst your backend systems are down and this is where message brokers come in to solve the problem. 

![Go RabbitMQ Diagram](https://images.tutorialedge.net/golang/rabbitmq.svg)

We can design our applications to interact with message brokers instead of directly with backend servers. This has a couple of key advantages:

* We can use concepts such as `dead-letter queues` in order to store potentially corrupt or erroneous messages being received from the client so that we can process them through other means.
* We can prevent our backend systems being brought down if we see surges of traffic. RabbitMQ clusters can sustain absolutely huge numbers of messages per second which allows us to horizontally scale our backend systems independently so that they can handle surges in demand without falling over.
* Multiple systems can subscribe to queues, which makes message passing between multiple systems far less complex than they would otherwise be if you had to implement point-2-point communications which don't scale well. 

These are just some of the key benefits that using message brokers provide to us, there are absolutely a lot more and it's worthwhile reading up on them to see if they meet the needs for your project!

## Setting Up a RabbitMQ Instance Locally

With the basic theory out of the way, let's dive into the practical side and start implementing a Go application that can talk to a RabbitMQ instance running on our local machine via Docker.

First things first, we'll need an instance of RabbitMQ that we can interact with and play about with. The quickest approach is to use the `docker run` command and specifying the image name that we want to run:

```output
$ docker run -d --hostname my-rabbit --name some-rabbit -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

This will kick off our local RabbitMQ instance which we can manage through the UI which is available at `http://localhost:15672` using the username **guest** and password **guest**. 

## Getting Started

Now that we've covered some of the theory behind RabbitMQ, let's start off by creating a new directory in which we'll build up our Go applications. Within this directory, let's create a new file called `main.go` which will house the entry-point to our message-publishing application:

<div class="filename">main.go</div>

```go
package main

import (
	"fmt"

	"github.com/streadway/amqp"
)

func main() {
	fmt.Println("Go RabbitMQ Tutorial")
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	if err != nil {
		fmt.Println(err)
		panic(1)
	}
	defer conn.Close()

	fmt.Println("Successfully Connected to our RabbitMQ Instance")
}

```

In this code, we import the `streadway/amqp` package which allows us to communicate with the RabbitMQ instance using the *advanced message queueing protocol*. 

Within the body of our `main` function, we then attempt to `Dial` our RabbitMQ instance using the `guest:guest` username and password. This `Dial` function returns the connection to our RabbitMQ instance, or an error value should we be unsuccessful in connecting. 

### Testing our Connection

Now that we've covered the code, let's attempt to run our Go application by first initializing our project to use Go Modules and then running it by calling `go run main.go`:

```output
$ go mod init github.com/TutorialEdge/go-rabbitmq-tutorial
$ go run main.go
Go RabbitMQ Tutorial
Successfully Connected to our RabbitMQ Instance
```

Awesome! As you can see, we have been able to successfully connect to our running RabbitMQ instance!

## Sending Messages

Now that we have a basic connection setup, let's look at how we can start interacting with this RabbitMQ instance and publish messages to it.

We'll start of by creating a Go application that can publish messages to a `TestQueue` within our RabbitMQ instance. Once we have been able to successfully push a couple of messages, we'll then look at creating a client application that can consume the messages from the queue.

Within the `main.go` file we created earlier, let's add the following:

<div class="filename"> main.go </div>

```go
package main

import (
	"fmt"

	"github.com/streadway/amqp"
)

func main() {
	fmt.Println("Go RabbitMQ Tutorial")
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	if err != nil {
		fmt.Println("Failed Initializing Broker Connection")
		panic(err)
	}

    // Let's start by opening a channel to our RabbitMQ instance
    // over the connection we have already established
	ch, err := conn.Channel()
	if err != nil {
		fmt.Println(err)
	}
	defer ch.Close()

    // with this channel open, we can then start to interact
    // with the instance and declare Queues that we can publish and
    // subscribe to
	q, err := ch.QueueDeclare(
		"TestQueue",
		false,
		false,
		false,
		false,
		nil,
	)
    // We can print out the status of our Queue here
    // this will information like the amount of messages on
    // the queue
	fmt.Println(q)
    // Handle any errors if we were unable to create the queue
	if err != nil {
		fmt.Println(err)
	}

    // attempt to publish a message to the queue!
	err = ch.Publish(
		"",
		"TestQueue",
		false,
		false,
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte("Hello World"),
		},
	)

	if err != nil {
		fmt.Println(err)
	}
    fmt.Println("Successfully Published Message to Queue")
}

```

With this in place, let's attempt to run this code now and see what happens:

```output
$ go run main.go
{TestQueue 0 1}
Successfully Published Message to Queue
```

Awesome, we have been able to successfully publish a message to our newly instantiated `TestQueue`! If we run this a couple of times then we should see the number of messages increase as they await processing by another system!

## Consuming Messages From a Queue

With our Queue instantiated and starting to fill up with messages, let's have a look at creating a second Go app that will continually poll this queue for new messages and consume them.

Start by creating a new file called `consumer.go` in which we'll add the following:

<div class="filename"> consumer.go </div>

```go
package main

import (
	"fmt"

	"github.com/streadway/amqp"
)

func main() {
	fmt.Println("Go RabbitMQ Tutorial")
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	if err != nil {
		fmt.Println("Failed Initializing Broker Connection")
		panic(err)
	}

	ch, err := conn.Channel()
	if err != nil {
		fmt.Println(err)
	}
	defer ch.Close()

	if err != nil {
		fmt.Println(err)
	}

	msgs, err := ch.Consume(
		"TestQueue",
		"",
		true,
		false,
		false,
		false,
		nil,
	)

	forever := make(chan bool)
	go func() {
		for d := range msgs {
			fmt.Printf("Recieved Message: %s\n", d.Body)
		}
	}()

	fmt.Println("Successfully Connected to our RabbitMQ Instance")
	fmt.Println(" [*] - Waiting for messages")
	<-forever
}

```

Let's break down what we have done here. We start off in our `main` function using the same logic we used in our previous Go app to connect to our RabbitMQ instance. Once we have this connection, we then instantiate a new channel through which we'll interact with our RabbitMQ instance. 

Below this, we then call `ch.Consume`, passing in the queue name we wish to consume messages from as well as a few other parameters that dictate how we wish to consume these messages. We then create a Go `channel` which we'll call `forever` which will keep our consumer application running indefinitely so that it continues to consume new messages as they are published to the queue.

Below this, we the instantiate a `goroutine` which handles the processing of the messages consumed from our `TestQueue`. In this instance, we just simply print out the contents of the message.

Finally, after adding a few `Println` statements we then call `<-forever` which blocks our main function from completing until the channel is satisfied.

> **Note - ** for more information on how we are using channels here to block our main function, please check out the [Go Channels Tutorial](/golang/go-channels-tutorial/) on the site!

### Testing it Out

With this now in place, let's try run our consumer in another terminal window in order to test our ability to consume messages from this `TestQueue` that we have created:

```output
$ go run consumer.go
Go RabbitMQ Tutorial
Successfully Connected to our RabbitMQ Instance
 [*] - Waiting for messages
Recieved Message: Hello World
Recieved Message: Hello World
Recieved Message: Hello World
```

Awesome! We have been able to successfully consume all of the messages that have been sitting on that `TestQueue`. 

Try publishing more messages to the queue using `go run main.go` in your original terminal window and you should see the Queue size go up and then instantly be consumed by our running `consumer.go` application.

## Conclusion

Awesome, so in this tutorial, we've managed to set up a local instance of RabbitMQ running locally on our machine through the help of docker and we've been able to  subsequently build up a Go application that is able to publish and subscribe to this RabbitMQ instance.

If you enjoyed this or have anything you'd like to discuss then please let me know in the comment section down below!

### Further Reading:

If you enjoyed this article, you may also enjoy some of the other articles on the site:

* [Go GraphQL Tutorial - Part 01](/golang/go-graphql-beginners-tutorial/)