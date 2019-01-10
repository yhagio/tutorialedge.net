---
author: Elliot Forbes
date: 2018-02-17T21:56:17Z
desc: In this tutorial, we are going to look at how you can read and write files on
  your local filesystem using Go
series: golang
image: golang.png
tags:
- filesystem
title: Reading And Writing To Files in Go
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 8
---

Within this tutorial, we are going to look at how you can effectively read and write to files within your filesystem using the go programming language. 

The method we are going to use to read and write to these files will be file format-agnostic. What this means is that you'll be able to use the techniques we'll be covering in order to read and write, `.txt`, `.csv`, `.xls` and so on, the only thing that differs for these files is the structure of the data that you write to each of these file types.

# Reading Files 

In order to read from files on your local filesystem, you'll have to use the `io/ioutil` module. You'll first have to pull of the contents of a file into memory by calling `ioutil.ReadFile("/path/to/my/file.ext")` which will take in the path to the file you wish to read in as it's only parameter. This will return either the `data` of the file, or an `err` which can be handled as you normally handle errors in go.

Create a new file called `main.go` as well as another file called `localfile.data`. Add a random piece of text to the `.data` file so that our finished go program has something to read and then do the following:

```go
package main

// import the 2 modules we need
import (
	"fmt"
	"io/ioutil"
)

func main() {
	// read in the contents of the localfile.data
	data, err := ioutil.ReadFile("localfile.data")
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

Once you have added this go code to your `main.go` file, try running it by calling:

```s
> go run main.go
this has all my content%
```

As you can see, we've successfully managed to read all of the data stored within our proprietary `localfile.data` file type. 

# Writing Files to New Files

Now that we've covered reading from files in Go, it's time to look at creating and writing to our own files!

In order to write content to files using Go, we'll again have to leverage the `io/ioutil` module. We'll first have to construct a byte array that represents the content we wish to store within our files. 

```go
mydata := []byte("all my data I want to write to a file")
```

Once we have constructed this byte array, we can then call `ioutil.WriteFile()` to write this byte array to a file. The `WriteFile()` method takes in 3 different parameters, the first is the location of the file we wish to write to, the second is our `mydata` object, and the third is the `FileMode`, which represents our file's mode and permission bits. 

```go
// the WriteFile method returns an error if unsuccessful 
err := ioutil.WriteFile("myfile.data", mydata, 0777)
// handle this error
if err != nil {
  // print it out
  fmt.Println(err)
}
```

Let's expand our original `main.go` file to not only read, but to write to a file as well:

```go
package main

import (
	"fmt"
	"io/ioutil"
)

func main() {

	mydata := []byte("All the data I wish to write to a file")

	// the WriteFile method returns an error if unsuccessful
	err := ioutil.WriteFile("myfile.data", mydata, 0777)
	// handle this error
	if err != nil {
		// print it out
		fmt.Println(err)
	}

	data, err := ioutil.ReadFile("myfile.data")
	if err != nil {
		fmt.Println(err)
	}

	fmt.Print(string(data))

}
```

If you attempt to run this now by calling `go run main.go`, you should see that a new file is automatically created within your current directory called `myfile.data` and our go program proceeds to read from this newly created file and prints the contents in the console:

```s
➜ go run main.go
All the data I wish to write to a file
```

# Writing to Existing Files

What happens if we have an existing file that we want to write additional information to? 

Let's take a look at that now.

```go
package main

import (
	"fmt"
	"io/ioutil"
	"os"
)

func main() {

	mydata := []byte("All the data I wish to write to a file\n")

	// the WriteFile method returns an error if unsuccessful
	err := ioutil.WriteFile("myfile.data", mydata, 0777)
	// handle this error
	if err != nil {
		// print it out
		fmt.Println(err)
	}

	data, err := ioutil.ReadFile("myfile.data")
	if err != nil {
		fmt.Println(err)
	}

	fmt.Print(string(data))

	f, err := os.OpenFile("myfile.data", os.O_APPEND|os.O_WRONLY, 0600)
	if err != nil {
		panic(err)
	}
	defer f.Close()

	if _, err = f.WriteString("new data that wasn't there originally\n"); err != nil {
		panic(err)
	}

	data, err = ioutil.ReadFile("myfile.data")
	if err != nil {
		fmt.Println(err)
	}

	fmt.Print(string(data))

}
```

Now that you have added the new code, we can test it out by running our `main.go` file:

```
$ go run main.go
All the data I wish to write to a file
new data that wasn't there originally
```

And Voila! We have successfully managed to append to an existing file using `os.OpenFile` and the `f.WriteString()` method.

## File Permissions

It's incredibly important to understand the various different file permissions available to you when you are writing to new files. 

> **Note -** For more in-depth documentation about permissions, I would suggest checking out: [https://golang.org/pkg/os/#FileMode](https://golang.org/pkg/os/#FileMode)

# Conclusion

If you understand the basics of reading and writing files in Go, then you have the basics down for reading and writing **any** filetype possible, be that CSV, PNG or some proprietary data format. All you need to know, is how this data is structured so that you can parse and modify to suit your needs.

That's all we are going to cover in this tutorial, we've managed to look at reading and writing to a really simple data format. We then briefly looked at file permissions.

## Further Reading:

* [Parsing JSON Files with Go](/golang/parsing-json-with-golang/)
* [Parsing XML Files with Go](/golang/parsing-xml-with-goland/)

Hopefully you found this tutorial useful, if you did, or if you require further help, then please do not hesitate to let me know in the comments section below!

