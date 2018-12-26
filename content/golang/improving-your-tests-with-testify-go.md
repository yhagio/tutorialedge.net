---
title: "Improving Your Go Tests and Mocks With Testify"
date: 2018-10-13T09:53:51+01:00
desc: This tutorial demonstrates how one can implement their own version of bubble
  sort using the golang programming language
series: golang
image: golang.png
tags:
- misc
author: Elliot Forbes
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

Assertions are something that I genuinely feel the standard library in Go is missing. You can most definitely achieve the same results with the likes of `if` comparisons and whatever else, but it's not the cleanest way to write your test files.

This is where the likes of [stretchr/testify](https://github.com/stretchr/testify) comes in to save the day. This package has quickly become one of the most popular testing packages, if not *the* most popular testing package for Go developers around the world.

Its elegant syntax allows you to write incredibly easy assertions that just make sense. 

# Getting Started

The first thing we'll have to do in order to get up and running with the testify package is to install it. Now, if you are using Go Modules then this will just be a case of calling `go test ...` after importing the package at the top of one of your `*_test.go` files.

However, if you are still stuck on an older version of Go, you can get this package by typing:

```s
go get github.com/stretchr/testify
```

After you have done this, we should be good to start incorporating it into our various testing suites.

# A Simple Example

Let's start off by looking at how we would traditionally write tests in Go. This should give us a good idea of what `testify` brings to the table in terms of improved readability. 

We'll start by defining a really simple Go program that features one exported function, `Calculate()`. 

```go
package main

import (
	"fmt"
)

// Calculate returns x + 2.
func Calculate(x int) (result int) {
	result = x + 2
	return result
}

func main() {
	fmt.Println("Hello World")
}
```

If we were to write tests for this using traditional methods, we would typically end up with something like this:

```go
package main

import (
	"testing"
)

func TestCalculate(t *testing.T) {
	if Calculate(2) != 4 {
		t.Error("Expected 2 + 2 to equal 4")
	}
}
```

We can then try run this simple test by calling `go test ./... -v`, passing in the `-v` flag to ensure we can see a more verbose output.

If we wanted to be a bit fancier, we might incorporate table-driven tests in here to ensure a wide variety of cases were tested. For now though, let's try and modify this basic approach to see how `testify` works:

```go
package main

import (
	"testing"
)

func TestCalculate(t *testing.T) {
  assert.Equal(t, Calculate(2), 4)
}
```

Awesome, as you can see, we've managed to succinctly test for equality using the `assert.Equal` function. Straight away this looks like an improvement as we've got fewer lines of code to read over and we can clearly see what the test function is trying to achieve.

## Negative Test Cases and Nil Tests

So, we've looked at happy path testing, but how about negative assertions and Nil checks. Well, thankfully the `testify` package has methods that allow us to test for both.

Say we wanted to test a function that returns a status of a given application. For example, if the application was alive and waiting for requests then the status would return `"waiting"`, if it had crashed, then it would return `"down"` as well as a variety of other statuses for when it's serving a request, or when it's waiting on a third party, etc.  

When we perform our test, we would want our test to pass as long as the status equaled anything but `"down"`, so we could use `assert.NotEqual()` in this particular, hypothetical case.

```go
func TestStatusNotDown(t *testing.T) {
  assert.NotEqual(t, status, "down")
}
```

If we wanted to test to see if `"status"` was not nil then we could use either `assert.Nil(status)` or `assert.NotNil(object)` depending on how we wish to react to it being `nil`.

## Combining Testify with Table-Driven Tests

Incorporating `testify` into our test suites doesn't necessarily preclude us from using methods such as table-driven testing, in fact, it makes it simpler.

```go
package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCalculate(t *testing.T) {
	assert := assert.New(t)

	var tests = []struct {
		input    int
		expected int
	}{
		{2, 4},
		{-1, 1},
		{0, 2},
		{-5, -3},
		{99999, 100001},
	}

	for _, test := range tests {
		assert.Equal(Calculate(test.input), test.expected)
	}
}
```

Notice the slight difference between how we called `assert.Equal()` in this example compared to the previous example. We've initialized assert using `assert.New(t)` and we are now able to call `assert.Equal()` multiple times, just passing in the input and the expected values as opposed to having to pass `t` in as our first parameter every time. This isn't a big deal, but it certainly helps to make our tests look cleaner. 

# Mocking

Another excellent feature of the `testify` package is it's mocking capabilities. Mocking effectively allows us to write replacement objects that mock the behaviors of certain objects in our code that we don't necessarily want to trigger every time we run our test suite.

This could be, for example, a messaging service or an email service that fires off emails to clients whenever it's called. If we are actively developing our codebase, we might be running our tests hundreds of times per day, and we might not want to send out hundreds of emails and/or messages a day to clients as they may start to take umbrage.

So, how do we go about mocking using the `testify` package?

## A Mocking Example

Let's take a look at how we can put `mocks` to use with a fairly simple example. In this example, we've got a system that will attempt to charge a customer for a product or service. When this `ChargeCustomer()` method is called, it will subsequently call a Message Service which will send off an SMS text message to the customer to inform them the amount they have been charged.

```go
package main

import (
	"fmt"
)

// MessageService handles notifying clients they have 
// been charged
type MessageService interface {
	SendChargeNotification(int) error
}

// SMSService is our implementation of MessageService
type SMSService struct{}

// MyService uses the MessageService to notify clients
type MyService struct {
	messageService MessageService
}

// SendChargeNotification notifies clients they have been
// charged via SMS
// This is the method we are going to mock
func (sms SMSService) SendChargeNotification(value int) error {
	fmt.Println("Sending Production Charge Notification")
	return nil
}

// ChargeCustomer performs the charge to the customer
// In a real system we would maybe mock this as well
// but here, I want to make some money every time I run my tests
func (a MyService) ChargeCustomer(value int) error {
	a.messageService.SendChargeNotification(value)
	fmt.Printf("Charging Customer For the value of %d\n", value)
	return nil
}

// A "Production" Example
func main() {
	fmt.Println("Hello World")

	smsService := SMSService{}
	myService := MyService{smsService}
	myService.ChargeCustomer(100)
}
```

So, how do we go about testing this to ensure we don't drive our customers crazy? Well, we mock out our SMSService by creating a new `struct` called `smsServiceMock` and add mock.Mock to its list of fields.

We then stub out our `SendChargeNotification` method so that it doesn't actually send a notification to our clients and return a `nil` error.

Finally, we create our `TestChargeCustomer` test function which in turn instantiates a new instance of type `smsServiceMock` and specifies what should happen when `SendChargeNotification` is called. 

```go
package main

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/mock"
)

// smsServiceMock
type smsServiceMock struct {
	mock.Mock
}

// Our mocked smsService method
func (m *smsServiceMock) SendChargeNotification(value int) bool {
	fmt.Println("Mocked charge notification function")
	fmt.Printf("Value passed in: %d\n", value)
  // this records that the method was called and passes in the value
  // it was called with
  args := m.Called(value)
  // it then returns whatever we tell it to return
  // in this case true to simulate an SMS Service Notification
  // sent out 
	return args.Bool(0)
}

// we need to satisfy our MessageService interface
// which sadly means we have to stub out every method
// defined in that interface
func (m *smsServiceMock) DummyFunc() {
	fmt.Println("Dummy")
}

// TestChargeCustomer is where the magic happens
// here we create our SMSService mock
func TestChargeCustomer(t *testing.T) {
	smsService := new(smsServiceMock)

  // we then define what should be returned from SendChargeNotification
  // when we pass in the value 100 to it. In this case, we want to return
  // true as it was successful in sending a notification 
	smsService.On("SendChargeNotification", 100).Return(true)

  // next we want to define the service we wish to test
  myService := MyService{smsService}
  // and call said method
	myService.ChargeCustomer(100)

  // at the end, we verify that our myService.ChargeCustomer
  // method called our mocked SendChargeNotification method
	smsService.AssertExpectations(t)
}

```

So, when we run this calling `go test ./... -v` we should see the following output:

```
go test ./... -v
=== RUN   TestChargeCustomer
Mocked charge notification function
Value passed in: 100
Charging Customer For the value of 100
--- PASS: TestChargeCustomer (0.00s)
    main_test.go:33: PASS:      SendChargeNotification(int)
PASS
ok      _/Users/elliot/Documents/Projects/tutorials/golang/go-testify-tutorial  0.012s
```

As you can see, our mocked method was called as opposed to our "production" method and we've been able to verify that our `myService.ChargeCustomer()` method acts the way we expect it to!

Happy days, we've now been able to fully test a more complex project using mocks. It's worth noting that this technique can be used for all manner of different systems, such as mocking database queries or how you interact with other APIs. Overall, mocking is something that is really powerful and is definitely something you should try to master if you are going to be testing production-grade systems in Go. 

## Generating Mocks with Mockery

So, in the above example we mocked out all of the various methods ourselves, but in real-life examples, this may represent a hell of a lot of different methods and functions to mock. 

Thankfully, this is where the [vektra/mockery](https://github.com/vektra/mockery) package comes to our aide. 

The mockery binary can take in the name of any `interfaces` you may have defined within your Go packages and it'll automatically output the generated mocks to `mocks/InterfaceName.go`. This is seriously handy when you want to save yourself a tonne of time and it's a tool I would highly recommend checking out!

# Key Takeaways

* Testify helps you to simplify the way you write assertions within your test cases.
* Testify can also be used to mock objects within your testing framework to ensure you aren't calling production endpoints whenever you test.

# Conclusion

Hopefully, this has helped to demystify the art of testing your Go projects using the `stretchr/testify` package. In this tutorial, we've managed to look at how you can use assertions from the `testify` package to do things like assert if things are equal, or not equal or nil. 

We've also been able to look at how you can mock out various parts of your systems to ensure that, when running your tests, you don't subsequently start interacting with production systems and doing things you didn't quite want to.

If you found this useful, or if you have any comments or feedback, then please feel free to let me know in the comments section below.

## Further Reading

If you enjoyed this, you may like my other articles on testing in Go:

* [Advanced Testing in Go](/golang/advanced-go-testing-tutorial/)