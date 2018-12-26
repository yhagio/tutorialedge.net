---
author: Elliot Forbes
date: 2018-08-25T14:21:04+01:00
desc: In this tutorial, we are going to look at how you can use mutexes in your Go
  programs
series: golang
image: golang.png
tags:
- concurrency
title: Go Mutex Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 24
---

The use of Go when programming highly concurrent applications doesn't preclude the possibility of you writing a system that features race conditions. These race conditions can cause unexpected issues with your systems that are both hard to debug and at times, even harder to fix. 

Thus, we need to be able to write Go programs that can execute concurrently in a safe manner without impacting performance. This is where the `mutex` comes into play.

# The Theory

A Mutex, or a mutual exclusion is a mechanism that allows us to prevent concurrent processes from entering a critical section of data whilst it's already being executed by a given process. 

Let's think about an example where we have a bank balance and a system that both deposits and withdraws sums of money from that bank balance. Within a single threaded, synchronous program, this would be incredibly easy. We could effectively guarantee that it would work as intended every time with a small battery of unit tests.

However, if we were to start introducing multiple threads, or multiple goroutines in Go's case, we may start to see issues within our code. 

1. Imagine we had a customer with a balance of £1,000.
1. The customer deposits £500 to his account
1. One goroutine would see this transaction, read the value at £1,000 and proceed to add the £500 to the existing balance.
1. However, at the same moment, a charge of £700 is applied to his account to pay for his mortgage.
1. This second process reads the account balance of £1,000 before the first is able to add the additional deposit of £500 and proceeds to subtract £700 from his account.
1. The customer checks his bank balance the next day and notices he is down to £300 as the second process was unaware of the first deposit and overwrote the value upon completion.

Obviously, if you were the customer, you would be pretty pissed that the bank had somehow *"lost"* your deposit of £500 and you would switch banks.

This right here, is an example of a race condition and how, if we aren't careful, our concurrent programs can start to see issues when we don't carefully guard the critical sections in our code.

# A Simple Example

So, now that we know what the problem is, let's see how we can fix it using a `mutex` within our Go system. In order to use `mutexes` within our code, we need to import the `sync` package. 

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

So, let's break down what we have done here. Within both our `deposit()` and our `withdraw()` functions, we have specified the first step should be to acquire the `mutex` using the `mutex.Lock()` method. 

Each of our functions will block until it successfully acquires the Lock. Once successful, it will then proceed to enter it's `critical section` in which it reads and subsequently updates the account's balance. Once each function has performed it's task, it then proceeds to release the lock by calling the `mutex.Unlock()` method.

When you execute this code, you should see the following output:

```plaintext
Go Mutex Example
Depositing 500 to account with balance: 300
Withdrawing 700 from account with balance: 1000
New Balance 800
```

# Conclusion

So, in this tutorial, we had a look at the joys of race conditions and how they can wreck havoc on an unsuspecting concurrent system. We then looked at how we could use mutexes in order to shield us from the evil that is race conditions and ensure that our systems work the way we intended regardless of the number of goroutines present within it!

Hopefully, you found this tutorial useful! If you have any comments or feedback, I would love to hear them in the comment section below. Happy Coding!