---
title: Go Tickers Tutorial
date: 2019-05-02T08:00:17.000+00:00
desc: 
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
tags:
- beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg

---
In this tutorial, we are going to be looking at tickers in Go and how you can use tickers effectively within your own Go applications.

Tickers are exceptionally helpful when you need to perform an action repeatedly at given time intervals and we can use tickers, in combination with goroutines in order to run these tasks in the background of our applications.

# Tickers vs Timers

Before we dive in, it's useful to know the distinction between both `tickers` and `timers.`

* `Tickers` - These are excellent for repeated tasks
* `Timers` - These are used for one-off tasks

# A Simple Example

Let's start off with a really simple in which we repeatedly run a simple `fmt.Println` statement ever 5 seconds.

<div class="filename"> main.go </div>

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("Go Tickers Tutorial")
	// this creates a new ticker which will
    // `tick` every 1 second.
    ticker := time.NewTicker(1 * time.Second)
	
    // for every `tick` that our `ticker`
    // emits, we print `tock`
	for _ = range ticker.C {
		fmt.Println("tock")
	}
}
```

Now, when we go to run this, our Go application will run indefinitely until we `ctrl-c` quit the program and every 1 second it will print out `tock` to the terminal.

<div class="filename"> $ go run main.go </div>

```output
Go Tickers Tutorial
Tock
Tock
^Csignal: interrupt
```

# Running in the Background

So we have been able to implement a really simple Go application that uses a `ticker` to repeatedly perform an action. However, what happens if we want this action to be performed in the background of our Go application though?

Well, if we had a task that we wanted to run in the background, we could move our `for` loop that iterates over  `ticker.C` to inside a `goroutine` which will allow our application to execute other tasks.

Let's move the code for creating the ticker and looping into a new function called `backgroundTask()` and then, within our `main()` function, we'll call this as a goroutine using the `go` keyword like so:

<div class="filename"> main.go </div>

```go
package main

import (
	"fmt"
	"time"
)

func backgroundTask() {
	ticker := time.NewTicker(1 * time.Second)
	for _ = range ticker.C {
		fmt.Println("Tock")
	}
}

func main() {
	fmt.Println("Go Tickers Tutorial")

	go backgroundTask()
	
    // This print statement will be executed before
    // the first `tock` prints in the console
	fmt.Println("The rest of my application can continue")
	// here we use an empty select{} in order to keep
    // our main function alive indefinitely as it would
    // complete before our backgroundTask has a chance
    // to execute if we didn't.
	select{}

}
```

Cool, so if we then go ahead and run this, we should see that our `main()` function carries on executing after our background task goroutine is kicked off.

<div class="filename"> $ go run main.go </div>

```output
Go Tickers Tutorial
The rest of my application can continue
Tock
Tock
Tock
^Csignal: interrupt
```

# Conclusion

So, in this tutorial, we have looked at how you can use tickers within your own Go applications to before repeatable tasks, both on the main thread, and as a background task.

## Further Reading

If you enjoyed this and wish to see how you can use `tickers` in a more advanced context then I recommend checking out my other article which is a real-time YouTube stats monitoring system.

* [https://tutorialedge.net/golang/building-realtime-youtube-sub-monitor-go/](https://tutorialedge.net/golang/building-realtime-youtube-sub-monitor-go/ "Build a Real-Time YouTube Stats Monitoring System in Go")