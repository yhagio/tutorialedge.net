---
author: Elliot Forbes
date: 2018-06-09T22:48:26+01:00
desc:
  In this tutorial, we are going to look at how you can implement a testing
  framework for your TypeScript projects using Mocha and Chai
image: golang.png
draft: true
series:
  - gofacerecognition
tags:
  - Face Recognition
title: Part 2 - Computing Local Binary Patterns in Go
twitter: https://twitter.com/Elliot_F
weight: 3
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this part of the series, we are going to be implementing the Go code that
will perform the task of converting an image from a combination of RGB pixels
into a black and white scale representation of the image as a collection of
_Local Binary Patterns_.

# The Theory

For each pixel within our image, we'll want to calculate a value for that pixel
that is based on it's neighboring pixels.

Let's take for example a 3x3 square of pixels that looks like this:

```
 9 |  8  | 2
---|-----|---
 2 |  6  | 6
---|-----|---
 1 |  9  | 2
```

The goal is to convert that pixel neighbourhood into greyscale pixel values. We
can do this by comparing each of the individual pixel values against the central
pixel value.

If the neighbouring pixel value is greater than or equal to the central pixel
value `6`, we replace the value with a `1`, if it is less than our central pixel
value `6`, we replace it with a `0`.

Once we have these values, we can convert the central pixel into a binary number
starting from the top left pixel clock-wise.

- `9` - is greater than 6 so is converted to `1`
- `8` - is greater than 6 so is converted to `1`
- `2` - is less than 6 so is converted to `0`
- `4` - is less than 6 so is converted to `0`
- `2` - is less than 6 so is converted to `0`
- `9` - is greater than 6 so is converted to `1`
- `1` - is less than 6 so is converted to `0`
- `2` - is less than 6 so is converted to `0`

Therefore, we end up with the binary string `11000100` which equates to the
decimal number `35` in this particular example.

> **Note -** This is an example of an 8-neighbourhood LBP with a radius of 1,
> you can increase the radius to get higher quality matches at the expense of
> more computational cost

# Initializing Our Project

Before any programming can be done, we'll need to get our workspace sorted out.
We can do that by creating a new folder on our local machine and running the
following commands.

```s
$ mkdir -p go-face-recognition
$ cd go-face-recognition
$ GOMODULES111=ON
$ go mod init github.com/myname/go-face-recognition
```

> **Note -** This assumes that you have the latest version of Go installed on
> your local development machine.

If these commands have successfully run, we should see the files `go.mod` and
`go.sum` added to our directory.

Awesome, we should be good to go and we can start implementing some Go code.
Let's create a `main.go` file within this directory and add the following code:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello World")
}

```

When this has been added, we can try sanity checking everything is working as
expected by running the following commands:

```s
$ go run main.go
Hello World
```

# Implementation

Let's dive into the implementation of our LBP algorithm. We'll start off by
creating a really simple helper function that will take in 2 integer values and
return either a `1` if the value is greater than or equal to the `threshold`, or
a `0`, if it is less than the `threshold`.

Now this `threshold` will represent the center pixel if we refer back to our
simple example.

```go
package lbp

// GetBinaryValue function used to get a binary value as a string based on a threshold.
// Return "1" if the value is equal or higher than the threshold or "0" otherwise.
func GetBinaryValue(value, threshold int) string {
	if value >= threshold {
		return "1"
	} else {
		return "0"
	}
}

```

It's going to be critical that we test these things early and often to ensure
that, not only do we understand the concepts, but that the code we have written
is correct.

Let's create a new file in the same directory as our `pkg/lbp/lpb.go` file
called `lbp_test.go`. Within this file, we'll want to import our `lbp` package
from our project, and we'll want to define a `TestCase` struct.

```go
package lbp_test

import (
    "testing"

    "github.com/elliotforbes/go-face-recognition/pkg/lbp"
	"github.com/stretchr/testify/assert"
)

type BinaryValueTestCase struct {
	Value     int
	Threshold int
	Output    string
}

func TestGetBinaryValue(t *testing.T) {
	var tests = []BinaryValueTestCase{
		{9, 6, "1"},
		{8, 6, "1"},
		{2, 6, "0"},
		{6, 6, "1"},
		{2, 6, "0"},
		{9, 6, "1"},
		{1, 6, "0"},
		{2, 6, "0"},
	}

	for _, test := range tests {
		assert.Equal(t, test.Output, lbp.GetBinaryValue(test.Value, test.Threshold))
	}
}

```

> **Note -** We'll be using the `stretchr/testify` package in order to assert
> the equality of our input and outputs in our test cases.

At this point of our journey, we should have a folder structure that looks
something like this:

```
pkg/
- lbp/
- - lpb.go
- - lbp_test.go
main.go
go.mod
go.sum
```

And at this point, we should be able to run `go test ./...` to run our newly
implemented test:

```s
$  go test ./... -v
?       github.com/elliotforbes/go-face-recognition     [no test files]
=== RUN   TestGetBinaryValue
--- PASS: TestGetBinaryValue (0.00s)
PASS
ok      github.com/elliotforbes/go-face-recognition/pkg/lbp     0.014s
```

As you can see from our `-v` verbose output, we have successfully run our
`TestGetBinaryValue` test function.

# Calculating Binary Strings

Let's move on to calculating full binary strings for a grid of 3x3 pixels. We'll
start off by implementing the test that will ensure whatever we implement is
correct.

Once again, open `lbp_test.go` and below our existing code, we'll want to add a
new test function, `TestGetBinaryString`. This test function will pass in a
predefined grid of 9 pixels to the `GetBinaryString` function that we are about
to implement, and it will verify the expected output and the actual output are
equal:

```go
func TestGetBinaryString(t *testing.T) {
	testCase := [][]uint8{
		{9, 8, 2},
		{2, 6, 6},
		{1, 9, 2},
	}

	expectedString := "11010100"
	assert.Equal(t, expectedString, lbp.GetBinaryString(testCase))
}

```

Now, we can open up our `lbp.go` file and implement our `GetBinaryString`
function.

```go
func GetBinaryString(pixels [][]uint8) string {
    return ""
}
```

Let's break down what this function will have to do.

Given a grid of 3x3 pixels, this will calculate the binary value of each of the
neighbouring pixels starting from the top-left corner clockwise. It will
concatenate the binary value in that order and give us a binary string
representation.

We can implement this really simply by hard-coding the order in which it
calculates the binary values like so:

```go
// GetBinaryString takes in a grid of 3x3 pixels and computes
// a binary string from this grid
func GetBinaryString(pixels [][]uint8) string {
	binaryString := ""
	binaryString += GetBinaryValue(int(pixels[0][0]), int(pixels[1][1]))
	binaryString += GetBinaryValue(int(pixels[0][1]), int(pixels[1][1]))
	binaryString += GetBinaryValue(int(pixels[0][2]), int(pixels[1][1]))
	binaryString += GetBinaryValue(int(pixels[1][2]), int(pixels[1][1]))
	binaryString += GetBinaryValue(int(pixels[2][2]), int(pixels[1][1]))
	binaryString += GetBinaryValue(int(pixels[2][1]), int(pixels[1][1]))
	binaryString += GetBinaryValue(int(pixels[2][0]), int(pixels[1][1]))
	binaryString += GetBinaryValue(int(pixels[1][0]), int(pixels[1][1]))
	return binaryString
}

```

> **Note -** In choosing this approach, I've certainly simplified the code, but
> I've also made

Now that we've attempted to implement it, let's verify that the output matches
our expected output:

```s
$ go test ./... -v
?       github.com/elliotforbes/go-face-recognition     [no test files]
=== RUN   TestGetBinaryValue
--- PASS: TestGetBinaryValue (0.00s)
=== RUN   TestGetBinaryString
--- PASS: TestGetBinaryString (0.00s)
PASS
ok      github.com/elliotforbes/go-face-recognition/pkg/lbp     0.014s
```

Awesome, we now have 2 working tests validating what we have implemented is
correct.

# Taking an Image as Input

The next step we'll want to implement is the ability to read in a given image so
that we can then transform this into

# Next Part of the Series

In the next part of the series, we'll look at what it takes to calculate the
histograms for an image. These histograms will be a crucial part of our project
as they will allow us to very quickly compare different images against each
other and work out what images are closest in terms of distance.

- [Part 3 - Calculating our Histograms]()

> **Note -** Hopefully you enjoyed part two of this series! If you did, then
> please help me out by sharing this mini-course far and wide!
