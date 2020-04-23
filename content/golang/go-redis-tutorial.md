---
title: "Getting Started with Redis and Go - Tutorial"
date: 2019-07-28T09:44:24+01:00
desc: In this tutorial, we are going to look at how you can use Redis as a backend service for your Go applications.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.png
tags:
- Redis
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

Hi everyone, in this tutorial, we are going to be looking at how you can effectively use Redis as a backend solution for your Go applications. 

# Prerequisites

If you wish to follow this tutorial on your local machine, you'll need to have the following installed on your machine:

* Docker - this will be needed to run a local instance of redis, if you already have a redis service then Docker is not needed.
* Go version 1.12+ - We'll be using Go modules to manage our project's dependencies
* A text editor such as Visual Studio Code

# Why Redis?

Redis is a fantastic open-source in-memory data structure store which can be used for various purposes such a database for your app, or a caching service or even a message broker. 

It supports a wide variety of different data structures and is incredibly versatile and fast. If you are concerned with things like resiliency then you'll be pleased to hear that it has built-in replication and can be run in a cluster setup to ensure that your applications are not reliant on a single instance.

For the purpose of this tutorial however, we are going to be keeping it nice and simple with a single, locally running instance of redis which we'll be running with Docker. 

# Running Redis With Docker Locally

Let's get started with this tutorial and download the `redis` docker image and run it using the following 2 docker commands:

```docker
$ docker pull redis
$ docker run --name redis-test-instance -p 6379:6379 -d redis
```

The first `pull` command does the job of retrieving the `redis` image from DockerHub so that we can then run it as a container using the second command. In the second command we specify the name of our redis container and we also map our local port 6379 to the port that redis is running against within the container using the `-p` flag. 

# Connecting to our Redis Instance

Ok, so now that we have successfully started our redis instance, we can start writing a very simple Go application that will connect with this instance. 

Start by creating a new directory in which our project will live. Within this new directory, create a new file called `main.go`. 

With that created, let's open this file up in our text editor of choice and start coding!

We'll start by creating a really simple Go application that will just print out `Go Redis Tutorial`. 

```go
package main

import "fmt"

func main() {
	fmt.Println("Go Redis Tutorial")
}
```

Let's validate that our setup works and that we are able to run this locally by calling `go run main.go`

<div class="filename"> $ go run main.go </div>

```output
Go Redis Tutorial
```

Awesome, with that in place, let's start working on connecting to our single Redis instance.

We'll start off by importing the widely used `github.com/go-redis/redis` package which, at the time of writing this, is the most popular Go package for interacting with Redis.

Now that we have imported the necessary package, we can start by defining a `client` which takes in various options such as the address of the redis instance we want to connect to, the password and the database we wish to use in that instance. 

In this case, we don't have any password set for our particular locally running instance so we can leave that blank and we'll be using the default database for now which is denoted by the value `0`.

After we define this new redis client, we then want to try and `Ping` our instance to ensure that everything has been set up correctly and print out the results:

<div class="filename"> main.go </div>

```go
package main

import (
	"fmt"
	"github.com/go-redis/redis"
)

func main() {
	fmt.Println("Go Redis Tutorial")

	client := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
		Password: "",
		DB: 0,
	})

	pong, err := client.Ping().Result()
	fmt.Println(pong, err)

}
```

When we go to run this now, we will see that our incredibly simple Go application has been able to successfully `ping` the redis instance that we have spun up and returned a successful `PONG` response:

<div class="filename"> $ go run main.go </div>

```output
Go Redis Tutorial
PONG <nil>
```

# Adding Values to Redis

Perfect, we've been able to successfully connect to our Redis instance in the previous part of this tutorial. We now need to look at how we can both `Set` and `Get` values from this redis instance.

## Setting Values

We'll start off by looking at setting values using the `client.Set` method. This method takes in a `key` and a `value` as well as an `expiration`. Setting the `expiration` to 0 effectively sets the key to have no expiration time.

```go
// we can call set with a `Key` and a `Value`. 
err = client.Set("name", "Elliot", 0).Err()
// if there has been an error setting the value
// handle the error
if err != nil {
    fmt.Println(err)
}
```

## Getting Values

Now that we have looked at setting values using the `Set` method, let's take a look at how we would retrieve those values using the aptly named `Get` method. 

The `Get` method simply takes in the `key` that you wish to retrieve from your redis instance and we can use the `Result()` method chained on the end to convert the response to a value, as well as a potential error:

```go
val, err := client.Get("name").Result()
if err != nil {
    fmt.Println(err)
}

fmt.Println(val)
```

If we add the above code to our `main` function just below where we `Set` the value, we can then try running this:

<div class="filename"> $ go run main.go </div>

```output
Go Redis Tutorial
PONG <nil>
Elliot
```

Awesome, we have now been able to successfully both Set and Get values from our Redis instance from within our Go application!

# Storing Composite Values

Whilst you can certainly achieve a lot just with storing basic key/value pairs in Redis, sometimes you need to take things a little further and store more complex composite data structures in the database. 

In this case, we tend to Marshal the composite data structures into JSON and subsequently store these JSON strings in the database using the same `Set` method we used earlier. 

Let's define an `Author` struct which contains an Name field and an Age field as well as the necessary tags on these fields that will allow us to marshal them into JSON. 

We can then update our code to first marshal a new Author struct and then `Set` this in our redis instance against the key `id1234` and passing in our newly marshalled JSON like so:

<div class="filename"> main.go </div>

```go
package main

import (
	"fmt"

	"encoding/json"
	"github.com/go-redis/redis"
)

type Author struct {
	Name string `json:"name"`
	Age int `json:"age"`
}

func main() {
    client := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
		Password: "",
		DB: 0,
    })
    
    json, err := json.Marshal(Author{Name: "Elliot", Age: 25})
    if err != nil {
        fmt.Println(err)
    }

    err = client.Set("id1234", json, 0).Err()
    if err != nil {
        fmt.Println(err)
    }
    val, err := client.Get("id1234").Result()
    if err != nil {
        fmt.Println(err)
    }
    fmt.Println(val)
}
```

When we go to run this, we should see that we have successfully been able to store our `Author` struct in our redis database against the key `id1234`. We've then been able to successfully retrieve said author using the same `key` and the same `Get` method we covered earlier.

<div class="filename"> $ go run main.go </div>

```output
Go Redis Tutorial
PONG <nil>
{"name": "Elliot", "age": 25}
```


# Conclusion

So, in this tutorial, we took a look at the basics of working with Redis in Go. We looked at how you can connect to Redis databases using the `github.com/go-redis/redis` package and we looked at how you can interact with that database using some of the methods that the package provides for us.

## Further Reading

If you enjoyed reading this, you may also enjoy some of our other articles on the site:

* [Creating a RESTful API with Go](/golang/creating-restful-api-with-golang/)
* [Go JSON Tutorial](/golang/go-json-tutorial/)
