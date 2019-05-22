---
author: Elliot Forbes
date: 2018-02-09T17:27:18Z
desc:
  In this tutorial, we look at how properly implement a tests within your go
  based systems using the go test tool
series: golang
image: golang.svg
tags:
  - testing
weight: 11
title: An Introduction to Testing in Go
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

**Testing is hugely important in all software.** Being able to ensure the
correctness of your code and ensure that any changes you make don't end up
breaking anything else in different parts of your codebase is hugely important.

By taking the time to adequately test your go programs you allow yourself to
develop faster with a greater sense of confidence that what you are developing
will continue to work when you release it to production.

# Goals

By the end of this tutorial, you will have a good grasp of testing basic functions
and methods in Go using the standard `"testing"` package.

You will have had experience writing table-driven tests and you will also see
how to generate more verbose output from your tests using the various flags
available.

# Video Tutorial

This tutorial can be found in video format if you prefer:

<div style="position:relative;height:0;padding-bottom:42.76%"><iframe src="https://www.youtube.com/embed/GlA57dHa5Rg?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="842" height="360" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

# Introduction

In this tutorial we are going to look at how you can develop and run tests for
your go code using the `go test` command.

## Go Test Files

If you have seen any go projects before, you may have noticed that most, if not
all files within the project, feature a `FILE_test.go` counterpart within the
same directory.

This is not an accident. These are the files which contain all of the unit tests
for the project and they test all of the code within their counterparts.

<div class="filename">Project Structure Example</div>

```c
myproject/
- calc.go
- calc_test.go
- main.go
- main_test.go
```

## A Simple Test File

Imagine we had a very simple go program that was made up of one file and
featured a `calculate()` function. This `calculate()` function simply takes in 1
number and adds 2 to it. Nice and simple to get us up and running:

<div class="filename">main.go</div>

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

If we wished to test this we could create a `main_test.go` file within the same
directory and write the following test:

<div class="filename">main_test.go</div>

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

Now that we have created our first go test, it's time to run this and see if our
code behaves the way we expect it to. We can execute our tests by running:

```output
$ go test
```

This should then output something similar to the following:

<div class="filename"> $ go test </div>

```c
PASS
ok      _/Users/elliot/Documents/Projects/tutorials/golang/go-testing-tutorial  0.007s
```

## Table Driven Testing

Now that we are happy that one calculation works, we should look to improve
confidence by adding a few extra test cases into our code. If we want to
gradually build up a series of test cases that are always tested, we can
leverage an `array` of tests like so:

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

Here we declare a struct that contains both an input and the expected value. We
then iterate through the list of tests with our `for _, test := range tests`
call and check to see that our function will always return the expected results,
regardless of input.

When we run our test suite now, we should see the same output as before:

<div class="filename"> $ go test </div>

```c
PASS
ok      _/Users/elliot/Documents/Projects/tutorials/golang/go-testing-tutorial  0.007s
```

# Verbose Test Output

Sometimes you may wish to see exactly what tests are running and how long they
took. Thankfully, this is available if you use the `-v` flag when running your
tests like so:

<div class="filename"> $ go test -v</div>

```c
=== RUN   TestCalculate
--- PASS: TestCalculate (0.00s)
=== RUN   TestTableCalculate
--- PASS: TestTableCalculate (0.00s)
PASS
ok      _/Users/elliot/Documents/Projects/tutorials/golang/go-testing-tutorial  0.006s
```

You can see that both our normal test and our table test ran and passed and took
less than `0.00s` to execute.

# Checking Test Coverage

Test coverage is a metric that I have seen abused at times by companies. These
companies set targets on all of their systems such as "the codebase must be at least 75%
covered by tests". 

But these kind of targets can lead to poor behavior and development teams "gaming"
the system in order to try and hit these targets. I've seen people in some teams
spend days writing unit tests that test basic getters and setters in languages 
such as Java. 

Testing is hugely important, but you have to be pragmatic about how you test your
systems so that the tests you write are providing you with **the most value**. 

The days spent writing tests to cover unimportant parts of your codebase could
have been better spent writing test cases around the **critical business logic**
captured within your systems and ensuring more edge cases are covered. 

## Using the -cover flag

With the important part out of the way, let's look at how you can check the 
test coverage of your system using the `go test` command:

Within the same directory as your `main.go` and your `main_test.go` files, run
the following:

<div class="filename"> $ go test -cover</div>

```output
PASS
coverage: 66.7% of statements
ok      github.com/TutorialEdge/an-intro-to-testing-in-go       0.006s
```

You will see that you have `66.7%` of your total Go code covered by test
cases. 

## Visualizing Coverage

Whilst this `66.7%` value can tell us how much of our code we have tested,
it doesn't show us exactly what code paths we have or haven't tested. 

This is where the `go test` and the `go tool cover` come in to help us solve
this particular problem.

We can use the `go test` tool to generate a `coverprofile` which can then be
converted to a HTML visualization using the `go tool cover` command:

<div class="filename"> $ go test -coverprofile=coverage.out </div>

```output
PASS
coverage: 66.7% of statements
ok      github.com/TutorialEdge/an-intro-to-testing-in-go       0.008s
```

You can then take this generated `coverage.out` file and use it to generate
a HTML page which shows exactly what lines have been covered like so:

```output
$ go tool cover -html=coverage.out
```

This will open up a page in your browser of choice which will look a little 
something like this:

![Go test coverage visualization](https://images.tutorialedge.net/images/golang/an-intro-to-testing/coverage.png)

As you can see, most of the code within our `Calculate` function is testing and 
features `Green` coverage. Whilst the print statement in your `main` function
is `Red` as this hasn't been covered by tests.

# Conclusion

Hopefully you found this tutorial useful! If you require further assistance then
please feel free to let me know in the comments section below.

> The full source code for this article can be found here:
[TutorialEdge/an-intro-to-testing-in-go](https://github.com/TutorialEdge/an-intro-to-testing-in-go)

## Further Reading

If you enjoyed this, you may like my other articles on testing in Go:

- [Advanced Testing in Go](/golang/advanced-go-testing-tutorial/)
- [Improving Your Tests with Testify in Go](/golang/improving-your-tests-with-testify-go/)
