---
author: Elliot Forbes
date: 2018-08-29T21:57:53+01:00
desc: In this tutorial, we are going to be having a look at some more advanced Go
  testing practices that the core language developers use to test the language itself.
series: golang
image: golang.png
tags:
- testing
title: Advanced Go Testing Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 12
---

Welcome fellow coders! In this tutorial, we are going to be taking a look at selection of more advanced testing practices used by the likes of the Go core language developers and in popular production-level tools.

I feel this approach, of actually studying what has been done in a production system, will hopefully give you some insight into the best ways to test your own production-level Go programs. 

> **Note -** If you are entirely new to testing your Go-based programs, then I suggest you check out my other tutorial: [an introduction to testing in go](/golang/intro-testing-in-go/)

# Achieving Good Coverage with Table Driven Tests

Let's start our journey in the `strings` package. If you have a look at the top of the `strings_test.go` file within `src/strings/` you should see a number of arrays defined and populated. 

For example, take a look at `lastIndexTests` which is an array of type `IndexTest`:

```go
var lastIndexTests = []IndexTest{
	{"", "", 0},
	{"", "a", -1},
	{"", "foo", -1},
	{"fo", "foo", -1},
	{"foo", "foo", 0},
	{"foo", "f", 0},
	{"oofofoofooo", "f", 7},
	{"oofofoofooo", "foo", 7},
	{"barfoobarfoo", "foo", 9},
	{"foo", "", 3},
	{"foo", "o", 2},
	{"abcABCabc", "A", 3},
	{"abcABCabc", "a", 6},
}
```

This array is used to test the `LastIndex` function within the `strings.go` file with a number of negative and positive cases. Each of these `IndexTest` elements feature a standard `string`, a separator, and an `out` integer value and have a `struct` that looks like this:

```go
type IndexTest struct {
	s   string
	sep string
	out int
}
```

These tests are then triggered by the `TestLastIndex()` function which runs through all of these test cases and checks to see whether the results returned from the `lastIndex` function match the expected results outlined in the array.

This same practice is done numerous times for numerous different functions and this helps to guarantee that when any code changes are made to these functions, the expected functionality will not change. 

# Use the testdata Directory

In certain situations, you won't be able to specify your expected input and output as an array of elements like in the above example. You may be trying to test how you read + write to files on the filesystem or how you parse proprietary data formats and so on.

If this is the case then one option is to create a `testdata` directory and store any files you may need for testing within that directory. 

A great example of this can again be found within the Standard Library under `src/archive/tar/` in which a `testdata/` directory is defined and contains a number of `.tar` files that are subsequently used for testing. 

Some fairly complex examples of tests using these files can be found in the `reader_test.go` file.

```go
func TestReader(t *testing.T) {
	vectors := []struct {
		file    string    // Test input file
		headers []*Header // Expected output headers
		chksums []string  // MD5 checksum of files, leave as nil if not checked
		err     error     // Expected error to occur
	}{{
		file: "testdata/gnu.tar",
		headers: []*Header{{
			Name:     "small.txt",
			Mode:     0640,
			Uid:      73025,
			Gid:      5000,
			Size:     5,
			ModTime:  time.Unix(1244428340, 0),
			Typeflag: '0',
			Uname:    "dsymonds",
			Gname:    "eng",
			Format:   FormatGNU,
		}, {
			Name:     "small2.txt",
			Mode:     0640,
			Uid:      73025,
			Gid:      5000,
			Size:     11,
			ModTime:  time.Unix(1244436044, 0),
			Typeflag: '0',
			Uname:    "dsymonds",
			Gname:    "eng",
			Format:   FormatGNU,
		}},
		chksums: []string{
			"e38b27eaccb4391bdec553a7f3ae6b2f",
			"c65bd2e50a56a2138bf1716f2fd56fe9",
		},
  }, 
  // more test cases
```

In the above function you'll see that the core developers are combining the first technique we covered here in combination with files from the `testdata/` directory to ensure that when a sample `.tar` file is opened, the files and their checksums match their expectations.

<!-- # Subtests - new in Go 1.8

This was a technique I came across recently when watching Mitchell Hashimoto's - [Advanced Testing with Go](https://www.youtube.com/watch?v=8hQG7QlcLBk) talk on YouTube which I highly recommend. 

Using subtests effectively allows you to write numerous tests within a Test method  -->

# Mocking HTTP Requests

As soon as you start writing production-level APIs and services, it's likely you'll start interacting with other services and being able to test the way that you interact with these services is just as important as testing other parts of your codebase.

However, you may be interacting with REST APIs that perform CRUD actions on databases and as such, you don't want these changes actually being committed to your database when you are just trying to test things are working. 

So, in order to get around this problem, we can mock HTTP responses using the `net/http/httptest` package which is our best friend in these situations.

```go
package main_test

import (
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHttp(t *testing.T) {
  // 
	handler := func(w http.ResponseWriter, r *http.Request) {
    // here we write our expected response, in this case, we return a
    // JSON string which is typical when dealing with REST APIs
		io.WriteString(w, "{ \"status\": \"expected service response\"}")
	}

	req := httptest.NewRequest("GET", "https://tutorialedge.net", nil)
	w := httptest.NewRecorder()
	handler(w, req)

	resp := w.Result()
	body, _ := ioutil.ReadAll(resp.Body)
haha
	fmt.Println(resp.StatusCode)
	fmt.Println(resp.Header.Get("Content-Type"))
	fmt.Println(string(body))
}
```

In the above test case, we basically overwrite the response we expect from our URL and then continue to test other parts of our system that rely upon that response. 

# The Use of Separate Packages

If we have a look at the `strings_test.go` file and inspect the package at the top, you should notice that it doesn't reside within the same package that the `strings.go` file resides within.

The reason for this? It helps you to avoid cyclic imports. In some scenarios, you'll need to import a package in your `*_test.go` file to adequately write your tests. If the package you import in already has a reference to the package you are trying to test, you may see issues with cyclic dependencies. 

# Differentiate your Unit and Integration Tests

> **Note -** I originally found out about this tip from: [Go Advanced Tips Tricks](https://medium.com/@povilasve/go-advanced-tips-tricks-a872503ac859)

If you are writing tests for large enterprise Go systems then you'll more than likely have a set of both `integration` and `unit` tests ensuring the validity of your system. 

More often than not however, you'll find your integration tests taking far longer to run as opposed to your unit tests due to the fact they could be reaching out to other systems. 

In this case, it makes sense to put your integration tests into `*_integration_test.go` files and adding `// +build integration` to the top of your test file:

```go
// +build integration

package main_test

import (
	"fmt"
	"testing"
)

func TestMainIntegration(t *testing.T) {
	fmt.Println("My Integration Test")
}
```

In order to run this suite of integration tests you can call `go test` like so:

```s
➜  advanced-go-testing-tutorial git:(master) ✗ go test -tags=integration
My Integration Test
PASS
ok      _/Users/elliot/Documents/Projects/tutorials/golang/advanced-go-testing-tutorial 0.006s
```

# Conclusion

So, in this tutorial, we had a look at some of the more advanced testing techniques and tricks employed by the Go language maintainers. 

Hopefully, you found this useful and it gave you the insight needed to go off and improve your own go tests. If you found it useful, or have any further questions, then please don't hesitate to let me know in the comments section below! 

> **Note -** If you want to keep track of when new Go articles are posted to the site, then please feel free to follow me on twitter for all the latest news: [@Elliot_F](https://twitter.com/elliot_f).

## Further Reading

If you enjoyed this, you may like my other articles on testing in Go:

* [Improving Your Tests with Testify in Go](/golang/improving-your-tests-with-testify-go/)