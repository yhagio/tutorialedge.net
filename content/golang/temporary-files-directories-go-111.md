---
title: "Working with Temporary Files and Directories in Go 1.11"
date: 2019-01-10T11:21:58Z
draft: true
desc: In this tutorial, we are going to be looking at how you can create and work with temp files and directories in Go 1.11
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.png
tags:
- filesystem
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

Go 1.11 brought some very cool new functionality such as the experimental Go Modules feature as well as the ability to create temporary files and directories using the new `TempFile` and `TempDir` functions within the `ioutil` package.

The temporary files and directories created from these function calls are globally unique and this is awesome as it simplifies the way we handle hundreds or even thousands of files within our Go programs.

In this tutorial, we'll be looking at how you can use these within your own Go programs and some potential use cases.

# Creating Temporary Files

Let's start off by looking at the new `TempFile` function. Let's say we were creating an object recognition system that pulled in thousands of pictures of cars and used them as training sets. 

For each of the cars we pull in, we'll want to create a temporary file with a unique name that we don't necessarily care about. 

```go
package main

import (
    "fmt"
    "ioutil"
    "os"
)

func main() {
    // we call ioutil.TempFile which returns either a file
    // or an error.
    // we specify the directory we want to create these temp files in
    // for this example we'll use `car-images`, and we'll define
    // a pattern which will be used for naming our car images
    // in this case car-*.png
    file, err := ioutil.TempFile("car-images", "car-*.png")
    if err != nil {
        fmt.Println(err)
    }
    // We can choose to have these files deleted on program close 
    defer os.Remove(file.Name())
    // We can then have a look and see the name 
    // of the image that has been generated for us
    fmt.Println(file.Name()) 
}
```

If we then try to run this in our console, we should see the following output:

```s
$ go run main.go
car-images/car-982382640.png
```

This has automatically replaced the `*` character within our defined `car-*.png` pattern with a random, globally-unique pattern.

## Writing to Temporary Files

If we want to write to these temporary files, we can do so using the `Write` function like so:

```go
package main

import (
	"fmt"
	"io/ioutil"
	"os"
)

func main() {
	// we call ioutil.TempFile which returns either a file
	// or an error.
	// we specify the directory we want to create these temp files in
	// for this example we'll use `car-images`, and we'll define
	// a prefix that will be used for all of our individual image filenames
	// in this case we'll use 'car-'
	file, err := ioutil.TempFile("car-images", "car-*.png")
	if err != nil {
		fmt.Println(err)
	}
	// We can choose to have these files deleted on program close
	defer os.Remove(file.Name())

	if _, err := file.Write([]byte("hello world\n")); err != nil {
		fmt.Println(err)
	}

	data, err := ioutil.ReadFile(file.Name())
	// if our program was unable to read the file
	// print out the reason why it can't
	if err != nil {
		fmt.Println(err)
	}

	// if it was successful in reading the file then
	// print out the contents as a string
	fmt.Print(string(data))

}
```

This will write `Hello World\n` to our temporary file, and then attempt to read in the contents of that file using the `ioutil.ReadFile()` function. When we run this, we should see the following output:

```s
$ go run main.go
hello world
```

# Generating Temporary Directories

Now that we've covered temporary files, let's have a look at generating temporary directories. This could be useful if we wanted to extend our object recognition system further and generate directories containing distinct objects and cars within them.

Let's have a look at a simple, practical example as to how we can use this. We'll be extending our existing program from above to create a temporary directory in which our temporary car files will exist:

```go
package main

import (
	"fmt"
	"io/ioutil"
	"os"
)

func main() {

	tempDir, err := ioutil.TempDir("", "cars-")
	if err != nil {
		fmt.Println(err)
	}
	defer os.RemoveAll(tempDir)
	
	file, err := ioutil.TempFile(tempDir, "car-*.png")
	if err != nil {
		fmt.Println(err)
	}
	defer os.Remove(file.Name())

    // This will print out the full name and path of our image
	fmt.Println(file.Name())

	if _, err := file.Write([]byte("hello world\n")); err != nil {
		fmt.Println(err)
	}

	data, err := ioutil.ReadFile(file.Name())
	// if our program was unable to read the file
	// print out the reason why it can't
	if err != nil {
		fmt.Println(err)
	}

	// if it was successful in reading the file then
	// print out the contents as a string
	fmt.Print(string(data))

}
```

When we go to run this, we should see our globally unique directory being created and our globally unique filename appended to the end of that directory:

```s
$ go run main.go
/var/folders/3x/5g0pww953x54mq7rjttr5f880000gn/T/cars-396489778/car-860960233.png
hello world
```

# Conclusion

Awesome, in this tutorial, we looked at how we could use the newly added `TempDir` and `TempFile` functions from the `io/ioutil` package for fame and fortune.


Your opinion matters in making these tutorials the best they can be, if you have any ideas/suggestions as to how I can improve these tutorials then I would love to hear them in the suggestions box below!

> **Note -** If you want to keep track of when new Go articles are posted to the site, then please feel free to follow me on twitter for all the latest news: [@Elliot_F](https://twitter.com/elliot_f).

## Related Reading:

* [Reading and Writing Files in Go](/golang/reading-writing-files-in-go/)