---
title: "An Introduction to Benchmarking Your Go Programs"
date: 2018-02-10T08:48:40Z
draft: true
desc: "In this tutorial, we look at how you can effectively benchmark your go program."
author: "Elliot Forbes"
tags: ["golang", "benchmarking"]
series: ["golang"]
twitter: "https://twitter.com/Elliot_F"
---

In this article, we are going to be having a look at benchmarking. More specifically, we are going to be looking at how you can benchmark your go based programs. 

In times where performance is important, being able to benchmark how your program performs and analyze where potential bottlenecks are, is important. By understanding where these bottlenecks lie, we can more effectively determine where to focus our efforts in order to improve the performance of our systems.

> It's important to note that performance tweaking should typically be done after the system is up and running. "Premature optimization is the root of all evil" - Donald Knuth  

## A Simple Benchmark

Within Go, benchmarking tests can be written in conjunction with your standard unit tests. These benchmark functions should be prefixed by "Benchmark" followed by the function name, in the same manner, that you would prefix Test for your test functions.#

Let's take our code from our previous article on testing and try to write a simple benchmark function for that

~~~go
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
~~~

If we wanted to benchmark our Calculate function then we would do something like so:

~~~go
func BenchmarkCalculate(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Calculate(2)
    }
}
~~~

In order for us to run our new benchmark, we could simply run `go test -bench=.` and it would run all benchmarks within our package for us. This should return something like so:

~~~c
Elliots-MBP:go-testing-tutorial elliot$ go test -bench=.
goos: darwin
goarch: amd64
BenchmarkCalculate-8    2000000000               0.30 ns/op
PASS
ok      _/Users/elliot/Documents/Projects/tutorials/golang/go-testing-tutorial  0.643s
~~~

As you can see, it ran our `Calculate()` function `2000000000` times at a speed of `0.30 ns` per operation. The entire benchmark took just `0.653s` in order to run through. 

Obviously, as more benchmarks are added to our suite, or the complexity of our functions increases, you should see these benchmarks taking longer and longer. 

## Conclusion

Hopefully this article gave you some indication as to how you can go about implementing your own suite of benchmarks. If you require further assistance then please let me know in the comments section below!