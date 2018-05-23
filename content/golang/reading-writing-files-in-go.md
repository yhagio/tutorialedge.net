---
title: "Reading And Writing To Files in Go"
date: 2018-02-17T21:56:17Z
draft: true
desc: "In this tutorial, we are going to look at how you can read and write files on your local filesystem using Go"
author: "Elliot Forbes"
tags: ["golang", "filesystem"]
series: ["golang"]
twitter: "https://twitter.com/Elliot_F"
---

Within this tutorial we are going to look at how you can effectively read and write to files within your filesystem using the go programming language. The method we are going to use to read and write to these files will be file format-agnostic. What this means is that you'll be able to use the techniques we'll be covering in order to read and write, `.txt`, `.csv`, `.xls` and so on, the only thing that differs for these files is the structure of the data that you write to each of these file types.

## Reading Files 

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
  // 
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

## Writing Files

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

## Conclusion

Hopefully you found this tutorial useful, if you did, or if you require further help, then please do not hesitate to let me know in the comments section below!

