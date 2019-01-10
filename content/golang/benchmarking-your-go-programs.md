---
author: Elliot Forbes
date: 2018-02-10T08:48:40Z
desc: In this tutorial, we look at how you can effectively benchmark your go program.
series: golang
image: golang.png
tags:
- testing
title: An Introduction to Benchmarking Your Go Programs
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 14
---

In this article, we are going to be having a look at benchmarking. More specifically, we are going to be looking at how you can benchmark your Go-based programs.  

In times where performance is important, being able to benchmark how your program performs and analyze where potential bottlenecks are, is really valuable. By understanding where these bottlenecks lie, we can more effectively determine where to focus our efforts in order to improve the performance of our systems.

> **Note -** It's important to note that performance tweaking should typically be done after the system is up and running. 

> *"Premature optimization is the root of all evil"* - Donald Knuth  

In this tutorial, we are going to look at how we can perform standard benchmarking tests for very simple functions and then move on to more advanced examples before finally looking at how we can generate cool looking flame graphs.

# A Simple Benchmark Test

Within Go, benchmarking tests can be written in conjunction with your standard unit tests. These benchmark functions should be prefixed by "Benchmark" followed by the function name, in the same manner, that you would prefix Test for your test functions.

Let's take our code from our [previous article on testing](/golang/intro-testing-in-go/), and try to write a simple benchmark function for that. Create a new file called `main.go` and add the following code to that file:

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

As you can see, it's nothing crazy, we have a `Calculate` function that takes in an `int` value, adds 2 to that value and returns it. This is the perfect function to use for creating our first benchmark.

So, in order to write a benchmark for our `Calculate` function then we can utilize part of the `testing` package and write a function within our `main_test.go`. 

```go
package main

import (
    "testing"
)

func BenchmarkCalculate(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Calculate(2)
    }
}
```

In order for us to run our new benchmark, we could simply run `go test -bench=.` and it would run all benchmarks within our package for us. This should return something like so:

```c
Elliots-MBP:go-testing-tutorial elliot$ go test -bench=.
goos: darwin
goarch: amd64
BenchmarkCalculate-8    2000000000               0.30 ns/op
PASS
ok      _/Users/elliot/Documents/Projects/tutorials/golang/go-testing-tutorial  0.643s
```

As you can see, it ran our `Calculate()` function `2,000,000,000` times at a speed of `0.30 ns` per operation. The entire benchmark took just `0.653s` in order to run through. 

Obviously, as more benchmarks are added to our suite, or the complexity of our functions increases, you should see these benchmarks taking longer and longer. 

## The -run Flag

In the above example, we ran our benchmarks in conjunction with our tests. This might not be ideal if you have a massive test suite and just want to validate performance improvements. If you want to specify that you *only* want to run your benchmark tests, then you can use the `-run` flag.

This `-run` flag takes in a regex pattern that can filter out the benchmarks we want to run. Let's imagine that our `main_test.go` file had 2 other test functions in it. 

```go
package main

import (
	"fmt"
	"testing"
)

func TestCalculate(t *testing.T) {
	fmt.Println("Test Calculate")
	expected := 4
	result := Calculate(2)
	if expected != result {
		t.Error("Failed")
	}
}

func BenchmarkCalculate(b *testing.B) {
	for i := 0; i < b.N; i++ {
		Calculate(2)
	}
}

func TestOther(t *testing.T) {
	fmt.Println("Testing something else")
	fmt.Println("This shouldn't run with -run=calc")
}

```

If we wanted to just run our Calculate tests, we could specify a regex that matches on `Calculate`:

```s
$ go test -run=Calculate -bench=.
```

And this will trigger both our `TestCalculate` and our `BenchmarkCalculate` functions:

```s
go test -run=Calc -bench=.
Test Calculate
goos: darwin
goarch: amd64
BenchmarkCalculate-8    2000000000               0.28 ns/op
PASS
ok      _/Users/elliot/Documents/Projects/Tutorialedge/go-benchmarking-tutorial 0.600s
```

If we wanted to only run our `BenchmarkCalculate` function then we could change our regex pattern to be:

```s
go test -run=Bench -bench=.
goos: darwin
goarch: amd64
BenchmarkCalculate-8    2000000000               0.29 ns/op
PASS
ok      _/Users/elliot/Documents/Projects/Tutorialedge/go-benchmarking-tutorial 0.616s
```

And you'll see in the above output that only our `BenchmarkCalculate` function was triggered. As long as we keep a consistent naming convention for our benchmark functions, it should be fairly easy to specify a command that only tests them.

# Increasing the Complexity.

Typically, you'll want to benchmark your programs with a variety of distinct inputs. You want to measure the performance characteristics of your program under a number of distinct, real-life scenarios.

We'll use our `Calculate` function from the previous example and this time we'll add in a suite of different benchmarks that test various different inputs for our function:

```go
package main

import (
	"testing"
)

func benchmarkCalculate(input int, b *testing.B) {
	for n := 0; n < b.N; n++ {
		Calculate(input)
	}
}

func BenchmarkCalculate100(b *testing.B)         { benchmarkCalculate(100, b) }
func BenchmarkCalculateNegative100(b *testing.B) { benchmarkCalculate(-100, b) }
func BenchmarkCalculateNegative1(b *testing.B)   { benchmarkCalculate(-1, b) }
```

So, here we've created 3 distinct Benchmark functions that call `benchmarkCalculate()` with various different types of input. This lets us see if there are any performance differences between different inputs and gives us a more accurate view as to how our program will perform in real life.  

```s
go-benchmarking-tutorial go test -run=Bench -bench=.
goos: darwin
goarch: amd64
BenchmarkCalculate100-8                 2000000000               0.29 ns/op
BenchmarkCalculateNegative100-8         2000000000               0.29 ns/op
BenchmarkCalculateNegative1-8           2000000000               0.29 ns/op
PASS
ok      _/Users/elliot/Documents/Projects/Tutorialedge/go-benchmarking-tutorial 1.850s
```

When writing your benchmark suites, it's worthwhile fleshing out multiple benchmarks like this just to give you a far more accurate representation.

<!-- # Generating Flame Graphs

Flame graphs are an excellent way to help identify potential hot spots in your code that are bottlenecks through cool visualizations. In order to generate these Flame graphs, we'll be using the [uber/go-torch](https://github.com/uber/go-torch).

These graphs look a little something like this:

![generated flame graph](http://uber.github.io/go-torch/meta.svg) -->


# Conclusion

Hopefully this article gave you some indication as to how you can go about implementing your own suite of benchmarks. If you require further assistance then please let me know in the comments section below!

> If you want to keep track of when new Go articles are posted to the site, then please feel free to follow me on twitter for all the latest news: [@Elliot_F](https://twitter.com/elliot_f).

## Further Reading:

* [Analyzing the performance of Go functions with benchmarks](https://medium.com/justforfunc/analyzing-the-performance-of-go-functions-with-benchmarks-60b8162e61c6)
* [Practical Go Benchmarks](https://stackimpact.com/blog/practical-golang-benchmarks/)
* [How to Write Benchmarks in Go](https://dave.cheney.net/2013/06/30/how-to-write-benchmarks-in-go)