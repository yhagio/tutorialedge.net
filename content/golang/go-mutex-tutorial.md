---
author: Elliot Forbes
date: 2018-08-25T14:21:04+01:00
desc:
  In this tutorial, we are going to look at how you can use mutexes in your Go
  programs
series: golang
image: golang.svg
tags:
  - concurrency
title: Go Mutex Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 24
---

The use of Go when programming highly concurrent applications doesn't prevent you from writing a system that features race conditions. These race conditions can cause unexpected issues with your systems that are both hard to debug and at times, even harder to fix.

Thus, we need to be able to write Go programs that can execute concurrently in a
safe manner without impacting performance. This is where the `mutex` comes into
play.

# The Theory

A Mutex, or a mutual exclusion is a mechanism that allows us to prevent
concurrent processes from entering a critical section of data whilst it's
already being executed by a given process.

Let's think about an example where we have a bank balance and a system that both
deposits and withdraws sums of money from that bank balance. Within a single
threaded, synchronous program, this would be incredibly easy. We could
effectively guarantee that it would work as intended every time with a small
battery of unit tests.

However, if we were to start introducing multiple threads, or multiple
goroutines in Go's case, we may start to see issues within our code.

1. Imagine we had a customer with a balance of £1,000.
1. The customer deposits £500 to his account
1. One goroutine would see this transaction, read the value at £1,000 and
   proceed to add the £500 to the existing balance.
1. However, at the same moment, a charge of £700 is applied to his account to
   pay for his mortgage.
1. This second process reads the account balance of £1,000 before the first is
   able to add the additional deposit of £500 and proceeds to subtract £700 from
   his account.
1. The customer checks his bank balance the next day and notices he is down to
   £300 as the second process was unaware of the first deposit and overwrote the
   value upon completion.

Obviously, if you were the customer, you would be pretty pissed that the bank
had somehow _"lost"_ your deposit of £500 and you would switch banks.

This right here, is an example of a race condition and how, if we aren't
careful, our concurrent programs can start to see issues when we don't carefully
guard the critical sections in our code.

# A Simple Example

So, now that we know what the problem is, let's see how we can fix it using a
`mutex` within our Go system. In order to use `mutexes` within our code, we need
to import the `sync` package.

<div class="filename">main.go</div>

```go
package main

import (
    "fmt"
    "sync"
)

var (
    mutex   sync.Mutex
    balance int
)

func init() {
    balance = 1000
}

func deposit(value int, done chan bool) {
    mutex.Lock()
    fmt.Printf("Depositing %d to account with balance: %d\n", value, balance)
    balance += value
    mutex.Unlock()
    done <- true
}

func withdraw(value int, done chan bool) {
    mutex.Lock()
    fmt.Printf("Withdrawing %d from account with balance: %d\n", value, balance)
    balance -= value
    mutex.Unlock()
    done <- true
}

func main() {
    fmt.Println("Go Mutex Example")

    done := make(chan bool)
    go withdraw(700, done)
    go deposit(500, done)
    <-done
    <-done

    fmt.Printf("New Balance %d\n", balance)
}

```

So, let's break down what we have done here. Within both our `deposit()` and our
`withdraw()` functions, we have specified the first step should be to acquire
the `mutex` using the `mutex.Lock()` method.

Each of our functions will block until it successfully acquires the Lock. Once
successful, it will then proceed to enter it's `critical section` in which it
reads and subsequently updates the account's balance. Once each function has
performed it's task, it then proceeds to release the lock by calling the
`mutex.Unlock()` method.

When you execute this code, you should see the following output:

```plaintext
Go Mutex Example
Depositing 500 to account with balance: 300
Withdrawing 700 from account with balance: 1500
New Balance 800
```

# Avoiding Deadlock

There a couple of scenarios that you need to be aware of when working with mutexes that will result in deadlock. Deadlock is a scenario within our code where nothing can progress due to every goroutine continually blocking when trying to attain a lock. 

## Ensure You Call Unlock()!

If you are developing goroutines that require this lock and they can terminate in a number of different ways, then ensure that regardless of how your goroutine terminates, it always calls the `Unlock()` method. 

If you fail to `Unlock()` on an error, then it is possible that your application will go into a deadlock as other goroutines will be unable to attain the lock on the mutex!

## Calling Lock() Twice 

One example to keep in mind when developing with mutexes is that the `Lock()` method will block until it attains the lock. You need to ensure that when developing your applications you do not call the `Lock()` method twice on the same lock or else you will experience a deadlock scenario. 

<div class="filename"> deadlock_example.go </div>

```go
package main

import (
	"fmt"
	"sync"
)


func main() {
	var b sync.Mutex
	
	b.Lock()
	b.Lock()
	fmt.Println("This never executes as we are in deadlock") 
}
```

When we attempt to run this, we should see that it throws a fatal error:

<div class="filename"> $ go run deadlock_example.go </div>

```output
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [semacquire]:
sync.runtime_SemacquireMutex(0x40e024, 0x1174ef00, 0x1, 0x40a0d0)
	/usr/local/go/src/runtime/sema.go:71 +0x40
sync.(*Mutex).lockSlow(0x40e020, 0x40c130)
	/usr/local/go/src/sync/mutex.go:138 +0x120
sync.(*Mutex).Lock(...)
	/usr/local/go/src/sync/mutex.go:81
main.main()
	/tmp/sandbox563268272/prog.go:13 +0xe0
```

# Semaphore vs Mutex

Everything you can achieve with a Mutex can be done with a [channel](/golang/go-channels-tutorial) in Go if the size of the channel is set to 1. 

However, the use case for what is known as a `binary semaphore` - a semaphore/channel of size 1 - is so common in the real world that it made sense to implement this exclusively in the form of a `mutex`.

# Conclusion

So, in this tutorial, we had a look at the joys of race conditions and how they
can wreck havoc on an unsuspecting concurrent system. We then looked at how we
could use mutexes in order to shield us from the evil that is race conditions
and ensure that our systems work the way we intended regardless of the number of
goroutines present within it!

Hopefully, you found this tutorial useful! If you have any comments or feedback,
I would love to hear them in the comment section below. Happy Coding!

## Further Reading

If you enjoyed this article and wish to learn more about working with Concurrency
in Go, then I recommend you check out our other articles on concurrency:

* [Go Goroutines Tutorial](/golang/concurrency-with-golang-goroutines/)
* [Go sync.WaitGroup Tutorial](/golang/go-waitgroup-tutorial/)
* [Go channels Tutorial](/golang/go-channels-tutorial/)
