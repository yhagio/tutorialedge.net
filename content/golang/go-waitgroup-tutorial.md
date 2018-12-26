---
title: "Go WaitGroup Tutorial"
date: 2018-12-05T13:03:31Z
desc: In this tutorial, we'll be looking at how you can leverage WaitGroups within your Concurrent Go Applications
series: golang
image: golang.png
tags:
 - concurrency
author: Elliot Forbes
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
twitter: https://twitter.com/elliot_f
---

If you are just starting your journey about learning Go and how to implement highly concurrent, high-performance applications, then an understanding of WaitGroups is vital. 

In this tutorial, we are going to be covering the following:

* What `WaitGroups` are and when we should use them
* A simple example of working with `WaitGroups`
* A real world example of `WaitGroups`

By the end of this, you should have a solid grasp as to how to employ `WaitGroups` within your own concurrent Go applications.

# Understanding WaitGroups

Let's dive straight in and look at what a `WaitGroup` is and what problem it solves for us.

When you start writing applications in Go that leverage `goroutines`, you start hitting scenarios where you need to block the execution of certain parts of your code base, until these `goroutines` have successfully executed. 

Take for example this code:

```go
package main

import "fmt"

func myFunc() {
	fmt.Println("Inside my goroutine")
}

func main() {
	fmt.Println("Hello World")
	go myFunc()
	fmt.Println("Finished Execution")
}
```

It first prints out `Hello World` before triggering a `goroutine` and then finally printing out `Finished Execution`. 

When you run this however, you should notice that when you run this program, it fails to reach `line 6` and it never actually prints out `Inside my goroutine`. This is because the main function actually terminates before the `goroutine` gets a chance to execute.

## The Solution? - WaitGroups

WaitGroups essentially allow us to tackle this problem by blocking until any goroutines within that `WaitGroup` have successfully executed. 

We first call `.Add(1)` on our `WaitGroup` to set the number of `goroutines` we want to wait for, and subsequently, we call `.Done()` within any `goroutine` to signal the end of its' execution.

> **Note -** You need to ensure that you call `.Add(1)` before you execute your `goroutine`.

# A Simple Example

Now that we've covered the essential theory, let's take a look at how we can fix our previous example through the use of `WaitGroups`:

```go
package main

import (
	"fmt"
	"sync"
)

func myFunc(waitgroup *sync.WaitGroup) {
	fmt.Println("Inside my goroutine")
	waitgroup.Done()
}

func main() {
	fmt.Println("Hello World")

	var waitgroup sync.WaitGroup
	waitgroup.Add(1)
	go myFunc(&waitgroup)
	waitgroup.Wait()

	fmt.Println("Finished Execution")
}

```

As you can see, we've instantiated a new `sync.WaitGroup` and then called the `.Add(1)` method, before attempting to execute our `goroutine`. 

We've updated the function to take in a pointer to our existing `sync.WaitGroup` and then called the `.Done()` method once we have successfully finished our task.

Finally, on `line 19`, we call `waitgroup.Wait()` to block the execution of our `main()` function until the `goroutines` in the waitgroup have successfully completed.

When we run this program, we should now see the following output:

```s
$ go run main.go
Hello World
Inside my goroutine
Finished Execution
```

# Anonymous Functions

It should be noted that we can accomplish the same thing as above using anonymous functions should we so wish. This can be more succinct and easier to read if the goroutine itself isn't too complex:

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	fmt.Println("Hello World")

	var waitgroup sync.WaitGroup
	waitgroup.Add(1)
	go func() {
		fmt.Println("Inside my goroutine")
		waitgroup.Done()
	}()
	waitgroup.Wait()

	fmt.Println("Finished Execution")
}

```

Again, if we run this it provides the same results:

```s
$ go run main.go
Hello World
Inside my goroutine
Finished Execution
```

But, things start to get a little more complex when we do things this way when we need to input arguments into our function. 

Say for example, we wanted to pass a `URL` into our function, we would have to pass that `URL` in like so:

```go
go func(url string) {
  fmt.Println(url)
}(url)
```

This is just something to keep in mind if you ever face this issue.

# A "Real" World Example

In one of my production applications, I was tasked with creating an API that interfaced with a tonne of other APIs and aggregated the results up into one response. 

Each of these API calls took roughly 2-3 seconds to return a response and due to the sheer number of API calls I had to make, doing this synchronously was out of the question. 

In order to make this endpoint usable, I would have to employ `goroutines` and perform these requests asynchronously. 

```go
package main

import (
	"fmt"
	"log"
	"net/http"
)

var urls = []string{
	"https://google.com",
	"https://tutorialedge.net",
	"https://twitter.com",
}

func fetch(url string) {
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(resp.Status)
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Println("HomePage Endpoint Hit")
	for _, url := range urls {
		go fetch(url)
	}
	fmt.Println("Returning Response")
	fmt.Fprintf(w, "All Responses Received")
}

func handleRequests() {
	http.HandleFunc("/", homePage)
	log.Fatal(http.ListenAndServe(":8081", nil))
}

func main() {
	handleRequests()
}

```

However, when I first employed this tactic, I noticed that any calls I made to my API endpoint were returning before my `goroutines` had a chance to complete and populate the results. 

This is where I learned of `WaitGroups` and dived deeper into the `sync` package. 

By employing a `WaitGroup` I could effectively fix this unexpected behavior, and only return the results once all of my `goroutines` had finished.

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"
)

var urls = []string{
	"https://google.com",
	"https://tutorialedge.net",
	"https://twitter.com",
}

func fetch(url string, wg *sync.WaitGroup) (string, error) {
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	wg.Done()
	fmt.Println(resp.Status)
	return resp.Status, nil
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Println("HomePage Endpoint Hit")
	var wg sync.WaitGroup

	for _, url := range urls {
		wg.Add(1)
		go fetch(url, &wg)
	}

	wg.Wait()
	fmt.Println("Returning Response")
	fmt.Fprintf(w, "Responses")
}

func handleRequests() {
	http.HandleFunc("/", homePage)
	log.Fatal(http.ListenAndServe(":8081", nil))
}

func main() {
	handleRequests()
}

```

Now that I've added the `WaitGroup` to this endpoint, it will perform a `HTTP GET` request on all of the URLs listed and, only upon completion, will return a response to the client calling that particular endpoint. 

```s
$ go run wg.go
HomePage Endpoint Hit
200 OK
200 OK
200 OK
Returning Response
```

> **Note -** There is more than one way to approach this problem, a similar effective outcome could have been achieve through the use of channels. For more on channels - [Go Channels Tutorial](/golang/go-channels-tutorial/)

# Conclusion

In this tutorial, we learned the basics of WaitGroups, including what they are and how we can use them within our own highly performant applications in Go.

If you enjoyed this tutorial or have any comments/suggestions, then please feel free to let me know in the comments/suggestions section below!

> **Note -** If you wish to keep up to date with all the latest articles then I suggest following me on Twitter: [@Elliot_F](https://twitter.com/elliot_f)