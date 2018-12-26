---
author: Elliot Forbes
date: 2018-08-25T14:47:06+01:00
desc: In this tutorial, we are going to look at how you can use channels in your Go programs
series: golang
image: golang.png
tags:
- concurrency
title: Go Channels Tutorial
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
twitter: https://twitter.com/Elliot_F
weight: 25
---

Welcome All! In this tutorial, we are going to be looking at how you can use channels within your Go-based applications. 

Channels are pipes that link between `goroutines` within your Go based applications that allow communication and subsequently the passing of values to and from variables. 

They are incredibly handy and can help you craft incredibly high performance, highly concurrent applications in Go with minimal fuss compared to other programming languages. This was by no means a fluke, when designing the language, the core developers decided that they wanted concurrency within their language to be a first class citizen and to make it as simple to work with as possible, without going too far and not allowing developers the freedom they need to work in.

The ability to craft concurrent systems so easily is something that drew me to the language in the first place, and I have to say, it's been an absolute delight so far.

> **Note -** I would recommend having a look at my other tutorial on [goroutines](/golang/concurrency-with-golang-goroutines/) if you wish to learn more about goroutines.

# The Theory

The idea of channels isn't anything new, as like many of Go's concurrency features, these concepts have been brought forward from the likes of Hoare's Communicating Sequential Processes (1978), CSP for short, and even from the likes of Dijkstra's guarded commands (1975). 

The developers of Go, however, have made it their mission to present these concepts in a simple a fashion as possible to enable programmers to create better, more correct, highly concurrent applications.

# A Simple Example

Let's start off by seeing how we can build up a really simple example of how this works in Go. We'll first create a function that goes away and computes an arbitrary, random value and passes it back to a channel variable called `values`:

```go
package main

import (
	"fmt"
	"math/rand"
)

func CalculateValue(values chan int) {
	value := rand.Intn(10)
	fmt.Println("Calculated Random Value: {}", value)
	values <- value
}

func main() {
	fmt.Println("Go Channel Tutorial")

  values := make(chan int)
  defer close(values)

	go CalculateValue(values)

	value := <-values
	fmt.Println(value)
}

```

Let's disect what happened here. In our `main()` function, we called `values := make(chan int)`, this call effectively created our new channel so that we could subsequently use it within our `CalculateValue` goroutine. 

> **Note -** We used `make` when instantiating our `values` channel as, like maps and slices, channels must be created before use.

After we created out channel, we then called `defer close(values)` which deferred the closing of our channel until the end of our `main()` function's execution. This is typically considered best practice to ensure that we tidy up after ourselves.

After our call to `defer`, we go on to kick off our single goroutine: `CalculateValue(values)` passing in our newly created `values` channel as its parameter. Within our `CalculateValue` function, we calculate a single random value between 1-10, print this out and then send this value to our `values` channel by calling `values <- value`. 

Jumping back into our `main()` function, we then call `value := <-values` which receives a value from our `values` channel.

> **Note -** Notice how when we execute this program, it doesn't immediately terminate. This is because the act of sending to and receiving from a channel are blocking. Our `main()` function blocks until it receives a value from our channel.

Upon execution of this code, you should see the output look something like this:

```paintext
$ go run main.go
Go Channel Tutorial
Calculated Random Value: {} 7
7
```

> **Summary**: 

> `myChannel := make(chan int)` - creates *myChannel* which is a channel of type `int`

> `channel <- value` - sends a value *to* a channel

> `value := <- channel` - receives a value *from* a channel

So, instantiating and using channels in your Go programs looks fairly straightforward so far, but what about in more complex scenarios? 

# Multiple goroutines Example

Let's now take a look at how we can construct our Go programs to use `channels` in conjunction with a number of different `goroutines` and build up the complexity a bit. 

# Avoiding Deadlock Panic!

There may be times where you see your Go program exit in a state of panic due to a misuse of these channels. You 

# Unbuffered Channels

Using a traditional `channel` within your goroutines can sometimes lead to issues with behavior that you may not quite be expecting. With traditional `unbuffered` channels, whenever one goroutine sends a value to this channel, that goroutine will subsequently block until the value is received from the channel. 

Let's see this in a real example. If we have a look at the below code, it's very similar to the code that we had previously. However, we have extended our `CalculateValue()` function to perform an `fmt.Println` after it has sent it's randomly calculated value to the channel.

In our `main()` function, we've added a second call to `go CalculateValue(valueChannel)` so we should expect 2 values sent to this channel in very quick succession. 

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func CalculateValue(c chan int) {
	value := rand.Intn(10)
	fmt.Println("Calculated Random Value: {}", value)
	time.Sleep(1000 * time.Millisecond)
	c <- value
	fmt.Println("Only Executes after another goroutine performs a receive on the channel")
}

func main() {
	fmt.Println("Go Channel Tutorial")

	valueChannel := make(chan int)
	defer close(valueChannel)

	go CalculateValue(valueChannel)
	go CalculateValue(valueChannel)

	values := <-valueChannel
	fmt.Println(values)
}
```

However, when you run this, you should see that only our first goroutines' final print statement is actually executed:

```plaintext
go run test.go
Go Channel Tutorial
Calculated Random Value: {} 1
Calculated Random Value: {} 7
1
Only Executes after another goroutine performs a receive on the channel
```

The reason for this is our call to `c <- value` has blocked in our second goroutine and subsequently the `main()` function concludes it's execution before our second `goroutine` gets a chance to complete its own execution.

# Buffered Channels

The way to get around this blocking behavior is to use something called a buffered channel. These buffered channels are essentially queues of a given size that can be used for cross-goroutine communication. In order to create a buffered channel as opposed to an unbuffered channel, we supply a capacity argument to our `make` command:

```go
bufferedChannel := make(chan int, 3)
```

By changing this to a buffered channel, our send operation, `c <- value` only blocks within our goroutines should the channel be full. 

Let's modify our existing program to use a buffered channel and have a look at the output. Notice that I've added a call to `time.Sleep()` at the bottom of our `main()` function in order to lazily block our `main()` function enough to allow our goroutines to complete execution.

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func CalculateValue(c chan int) {
	value := rand.Intn(10)
	fmt.Println("Calculated Random Value: {}", value)
	time.Sleep(1000 * time.Millisecond)
	c <- value
	fmt.Println("This executes regardless as the send is now non-blocking")
}

func main() {
	fmt.Println("Go Channel Tutorial")

	valueChannel := make(chan int, 2)
	defer close(valueChannel)

	go CalculateValue(valueChannel)
	go CalculateValue(valueChannel)

	values := <-valueChannel
	fmt.Println(values)

	time.Sleep(1000 * time.Millisecond)
}
```

Now, when we execute this, we should see that our second goroutine does indeed continue its execution regardless of the fact a second receive has not been called in our `main()` function. Thanks to the `time.Sleep()`, we can clearly see the difference between unbuffered channels and their blocking nature and our buffered channels and their non-blocking (when not full) nature.

```plaintext
Go Channel Tutorial
Calculated Random Value: {} 1
Calculated Random Value: {} 7
7
This executes regardless as the send is now non-blocking
This executes regardless as the send is now non-blocking
```

# Conclusion

So, in this fairly lengthy tutorial, we managed to learn about the various distinct types of channels within Go. We discovered the differences between both buffered and unbuffered channels and how we could use them to our advantage within our concurrent go programs. 

If you enjoyed this tutorial, then please feel free to let me know in the comments section below. If you have any suggestions as to what I could do better then I would love to hear them in the comments section below!

> **Note -** If you want to keep track of when new Go articles are posted to the site, then please feel free to follow me on twitter for all the latest news: [@Elliot_F](https://twitter.com/elliot_f).