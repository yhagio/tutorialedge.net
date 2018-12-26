---
title: "Go Decorator Function Pattern Tutorial"
date: 2018-10-20T21:34:14+01:00
series: golang
image: golang.png
tags:
- intermediate
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
desc: In this tutorial, we are going to be looking at how you can implement your own decorator functions in Go.
---

Decorators are certainly more prominent in other programming languages such as Python and TypeScript, but that's not to say you can't use them in Go. In fact, for certain problems, using decorators is the perfect solution as we'll hopefully be finding out in this tutorial.

# Understanding the Decorator Pattern

> **Decorators** essentially allow you to wrap existing functionality and append or prepend your own custom functionality on top. 

In Go, functions are deemed as first class objects which essentially means you can pass them around just as you would a variable. Let's see this in action with a very simple example:

```go
package main

import (
  "fmt"
  "time"
)

func myFunc() {
  fmt.Println("Hello World")
  time.Sleep(1 * time.Second)
}

func main() {
  fmt.Printf("Type: %T\n", myFunc)
}
```

So, in this example, we've defined a function called `myFunc`, which simply prints out `Hello World`. However, in the body of our `main()` function, we've called `fmt.Printf` and we've used `%T` to print out the type of the value we pass in as our second argument. In this case, we are passing `myFunc` which will subsequently print out the following:

```s
$ go run test.go
Type: func()
```

So, what does this mean for us Go developers then? Well, it highlights the fact that **functions can be passed around and used as arguments** within other parts of our code base.

Let's see this in action by extending our codebase a little bit more and adding a `coolFunc()` function which takes in a function as its only parameter:

```go
package main

import (
  "fmt"
  "time"
)

func myFunc() {
  fmt.Println("Hello World")
  time.Sleep(1 * time.Second)
}

// coolFunc takes in a function
// as a parameter 
func coolFunc(a func()) {
	// it then immediately calls that functino
  a()
}

func main() {
  fmt.Printf("Type: %T\n", myFunc)
  // here we call our coolFunc function
  // passing in myFunc
	coolFunc(myFunc)
}
```

When we attempt to run this, we should see that our new output features our `Hello World` string as we'd expect:

```s
$ go run test.go
Type: func()
Hello World
```

Now, this may strike you as a bit odd at first. Why would you want to do something like this? It essentially adds a layer of abstraction over your call to `myFunc` and complicates the code without really adding much value.

# A Simple Decorator

Let's see how we could use this pattern to add some value to our codebase. We could, if we wanted, add some additional logging around the execution of a particular function just to highlight it's start and end time.

```go
package main

import (
	"fmt"
	"time"
)

func myFunc() {
  fmt.Println("Hello World")
	time.Sleep(1 * time.Second)
}

func coolFunc(a func()) {
	fmt.Printf("Starting function execution: %s\n", time.Now())
	a()
	fmt.Printf("End of function execution: %s\n", time.Now())
}

func main() {
	fmt.Printf("Type: %T\n", myFunc)
	coolFunc(myFunc)
}

```

Upon calling this, you should see logs that look a little like this:

```s
$ go run test.go
Type: func()
Starting function execution: 2018-10-21 11:11:25.011873 +0100 BST m=+0.000443306
Hello World
End of function execution: 2018-10-21 11:11:26.015176 +0100 BST m=+1.003743698
```

As you can see, we've been able to effectively wrap my original function without having to alter it's implementation. We are now able to clearly see when this function was started and when it finished execution and it highlights to us that the function takes just about a second to finish execution.

# Real World Examples

Let's look at a few more examples as to how we can use decorators for further fame and fortune. We'll take a really simple http web server and decorate our endpoints so that we can verify whether or not the incoming request has a particular header set.

> **If you fancy** learning more about writing a simple REST API in Go then I recommend checking out my other article here: [Creating a REST API in Go](/golang/creating-restful-api-with-golang/)

```go
package main

import (
	"fmt"
	"log"
	"net/http"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint Hit: homePage")
	fmt.Fprintf(w, "Welcome to the HomePage!")
}

func handleRequests() {
	http.HandleFunc("/", homePage)
	log.Fatal(http.ListenAndServe(":8081", nil))
}

func main() {
	handleRequests()
}
```

As you can see, nothing particularly complex in our code. We set up a `net/http` router that serves a single `/` endpoint.

Let's add a really simple authentication decorator function that will check to see if the `Authorized` header is set to `true` on the incoming request.

```go
package main

import (
	"fmt"
	"log"
	"net/http"
)

func isAuthorized(endpoint func(http.ResponseWriter, *http.Request)) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		fmt.Println("Checking to see if Authorized header set...")

		if val, ok := r.Header["Authorized"]; ok {
			fmt.Println(val)
			if val[0] == "true" {
				fmt.Println("Header is set! We can serve content!")
				endpoint(w, r)
			}
		} else {
			fmt.Println("Not Authorized!!")
			fmt.Fprintf(w, "Not Authorized!!")
		}
	})
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint Hit: homePage")
	fmt.Fprintf(w, "Welcome to the HomePage!")
}

func handleRequests() {

	http.Handle("/", isAuthorized(homePage))
	log.Fatal(http.ListenAndServe(":8081", nil))
}

func main() {
	handleRequests()
}
```

> **Note:** This is absolutely not the right way to handle securing your REST API, I'd recommend looking at using JWT or OAuth2 in order to achieve that goal!

So, let's break this down and try to understand what's going on! 

We've created a new decorator function called `isAuthorized()` which takes in a function that matches the same signature as our original `homePage` function. This then returns a `http.Handler`. 

Within the body of our `isAuthorized()` function, we return a new `http.HandlerFunc` within which does the job of validating our `Authorized` header is set and equals `true`. Now, this is a drastically simplified version of `OAuth2` authentication/authorization, There's a few slight discrepancies but it gives you a general idea as to how it would work.

The **key thing to note** however, is the fact that we've managed to decorate an existing endpoint and add some form of authentication around said endpoint without having to alter the existing implementation of that function.

Now, if we were to add a new endpoint that we wanted to be protected, we could easily do so:

```go
// define our newEndpoint function. Notice how, yet again,
// we don't do any authentication based stuff in the body 
// of this function
func newEndpoint(w http.ResponseWriter, r *http.Request) {
	fmt.Println("My New Endpoint")
	fmt.Fprintf(w, "My second endpoint")
}

func handleRequests() {

	http.Handle("/", isAuthorized(homePage))
  // register our /new endpoint and decorate our
  // function with our isAuthorized Decorator
  http.Handle("/new", isAuthorized(newEndpoint))
	log.Fatal(http.ListenAndServe(":8081", nil))
}
```

This highlights the key benefits of the decorator pattern, where wrapping code within our codebase is incredibly simple. We can easily add new authenticated endpoints using this same method 

# Conclusion

Hopefully, this tutorial helped to demystify the wonders of the decorator and how you can use the decorator pattern within your own Go-based programs. We learned about the benefits of the decorator pattern and how we could use it to wrap existing functionality with new functionality.

In the second part of the tutorial, we looked at a more realistic example as to how you could potentially use this within your own production-level Go systems.

If you enjoyed this tutorial, then please feel free to share the article far an wide, it really helps the site and I'd be very appreciative! If you have any questions and/or comments then please let me know in the comments section down below!

> **Note -** If you want to keep track of when new Go articles are posted to the site, then please feel free to follow me on twitter for all the latest news: [@Elliot_F](https://twitter.com/elliot_f).

## Further Reading

If you are looking for more, then you may quite like some of the other articles on this site. Feel free to check out the following articles:

* [Go OAuth2 Tutorial](/golang/go)/golang/go-oauth2-tutorial/)