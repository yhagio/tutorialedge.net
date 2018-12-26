---
author: Elliot Forbes
date: 2018-02-09T17:27:18Z
desc: In this tutorial, we look at how properly implement a tests within your go based
  systems using the go test tool
series: golang
image: golang.png
tags:
- beginner
weight: 11
title: An Introduction to Testing in Go
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

Testing is hugely important in all software. Being able to ensure the correctness of your code and ensure that any changes you make don't end up breaking anything else in different parts of your codebase is hugely important.

By taking the time to adequately test your go programs you allow yourself to develop faster with a greater sense of confidence that what you are developing will continue to work when you release it to production.

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:42.76%"><iframe src="https://www.youtube.com/embed/GlA57dHa5Rg?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="842" height="360" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

# Introduction

In this tutorial we are going to look at how you can develop and run tests for your go code using the `go test` command.  

## Go Test Files

If you have seen any go projects before, you may have noticed that most, if not all files within the project, feature a `FILE_test.go` counterpart within the same directory. 

This is not an accident. These are the files which contain all of the unit tests for the project and they test all of the code within their counterparts. 

```c
// An Example of how your project would be structured
myproject/
- calc.go
- calc_test.go
- main.go
- main_test.go
```

## A Simple Test File

Imagine we had a very simple go program that was made up of one file and featured a `calculate()` function. This `calculate()` function simply takes in 1 number and adds 2 to it. Nice and simple to get us up and running:

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

If we wished to test this we could create a `main_test.go` file within the same directory and write the following test:

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

## Running Our Tests

Now that we have created our first go test, it's time to run this and see if our code behaves the way we expect it to. We can execute our tests by running:

```go
go test
```

This should then output something similar to the following:

```c
Elliots-MBP:go-testing-tutorial elliot$ go test
PASS
ok      _/Users/elliot/Documents/Projects/tutorials/golang/go-testing-tutorial  0.007s
```

## Table Driven Testing

Now that we are happy that one calculation works, we should look to improve confidence by adding a few extra test cases into our code. If we want to gradually build up a series of test cases that are always tested, we can leverage an `array` of tests like so:

```go
func TestTableCalculate(t *testing.T) {
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
		if output := Calculate(test.input); output != test.expected {
			t.Error("Test Failed: {} inputted, {} expected, recieved: {}", test.input, test.expected, output)
		}
	}
}
```

Here we declare a struct that contains both an input and the expected value. We then iterate through the list of tests with our `for _, test := range tests` call and check to see that our function will always return the expected results, regardless of input.

When we run our test suite now, we should see the same output as before:

```c
Elliots-MBP:go-testing-tutorial elliot$ go test
PASS
ok      _/Users/elliot/Documents/Projects/tutorials/golang/go-testing-tutorial  0.007s
```

# Verbose Test Output

Sometimes you may wish to see exactly what tests are running and how long they took. Thankfully, this is available if you use the `-v` flag when running your tests like so:

```c
Elliots-MBP:go-testing-tutorial elliot$ go test -v
=== RUN   TestCalculate
--- PASS: TestCalculate (0.00s)
=== RUN   TestTableCalculate
--- PASS: TestTableCalculate (0.00s)
PASS
ok      _/Users/elliot/Documents/Projects/tutorials/golang/go-testing-tutorial  0.006s
```

You can see that both our normal test and our table test ran and passed and took less than `0.00s` to execute.

# Conclusion

Hopefully you found this tutorial useful! If you require further assistance then please feel free to let me know in the comments section below. 

## Further Reading

If you enjoyed this, you may like my other articles on testing in Go:

* [Advanced Testing in Go](/golang/advanced-go-testing-tutorial/)
* [Improving Your Tests with Testify in Go](/golang/improving-your-tests-with-testify-go/)