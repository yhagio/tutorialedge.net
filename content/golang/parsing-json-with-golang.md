---
author: Elliot Forbes
date: 2017-04-09T21:07:11+01:00
desc: In this tutorial we examine the encoding/json go package and how to parse JSON
  files.
series: golang
image: golang.png
tags:
- beginner
title: Parsing JSON files With Golang
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 9
---

Welcome all, in this tutorial, we are going to be taking a look at how you can read in JSON files, or JSON HTTP responses and parse them to your hearts desire. 

JSON or Javascript Object Notation as it is short for, is a standard format for sending and receiving information. We could represent the same information with either XML or JSON, but JSON provides one advantage in the fact it is far more compact and in my personal experience, more readable. 

JSON is now the most popular data format available and you'll find that most RESTful APIs provide JSON responses when you try to interface with them. Thus being able to work with it and parse it in Go is incredibly useful!  

# The Encoding/Json Package

So, to get us started, we'll be leveraging the `encoding/json` standard library package in order to get us up and running. I highly recommend you check out the official documentation for this here:  [Encoding/Json](https://golang.org/pkg/encoding/json/). 

Let's start with a really simple Go program as our base, we'll build this out to showcase how to work with various different examples. Create a new file called `main.go`.

```go
package main

import (
	"fmt"
)

func main() {
	fmt.Println("Hello World")
}
```

And we can run this with a simple `go run main.go` call. This should return a simple `Hello World`.

# Reading and Parsing a JSON File

Let's try and read in a simple JSON file and then parse it. For the purpose of this tutorial we’ll be parsing the following json within our file. Copy this and save it into a `users.json` file within the same directory as your `main.go` file.

```json
{
  "users": [
    {
      "name" : "Elliot",
      "type" : "Reader",
      "age" : 23,
      "social" : {
        "facebook" : "https://facebook.com",
        "twitter" : "https://twitter.com"
      }
    },
    {
      "name" : "Fraser",
      "type" : "Author",
      "age" : 17,
      "social" : {
        "facebook" : "https://facebook.com",
        "twitter" : "https://twitter.com"
      }
    }
  ]
}
```

This should be complex enough to test our skills and should allow us to transfer our skills to real world examples fairly easily. 

# Reading the JSON File

We’ll be using the `os` package in order to open up our `users.json` file from our filesystem. Once we have opened the file, we'll defer the closing of the file till the end of the function so that we can work with the data inside of it.

```go
// Open our jsonFile
jsonFile, err := os.Open("users.json")
// if we os.Open returns an error then handle it
if err != nil {
	fmt.Println(err)
}
fmt.Println("Successfully Opened users.json")
// defer the closing of our jsonFile so that we can parse it later on
defer jsonFile.Close()
```

## Parsing with Structs

We have a few options when it comes to parsing the JSON that is contained within our `users.json` file. We could either unmarshal the JSON using a set of predefined structs, or we could unmarshal the JSON using a map[string]interface{} to parse our JSON into strings mapped against arbitrary data types.  

If you know the structure that you are expecting then I would recommend going down the verbose route and defining your structs like so:

```go
package main

import (
	…
	// import our encoding/json package
	“encoding/json”
	…
)

// Users struct which contains
// an array of users
type Users struct {
	Users []User `json:"users"`
}

// User struct which contains a name
// a type and a list of social links
type User struct {
	Name   string `json:"name"`
	Type   string `json:"type"`
	Age    int    `json:"Age"`
	Social Social `json:"social"`
}

// Social struct which contains a
// list of links
type Social struct {
	Facebook string `json:"facebook"`
	Twitter  string `json:"twitter"`
}
```

Once we have these in place, we can use them to unmarshal our JSON. 

# Working with Unstructured Data

Sometimes, going through the process of creating structs for everything can be somewhat time consuming and overly verbose for the problems you are trying to solve. In this instance, we can use standard `interfaces{}` in order to read in any JSON data:

```go
package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

func main() {

	// Open our jsonFile
	jsonFile, err := os.Open("users.json")
	// if we os.Open returns an error then handle it
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successfully Opened users.json")
	// defer the closing of our jsonFile so that we can parse it later on
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	var result map[string]interface{}
	json.Unmarshal([]byte(byteValue), &result)

	fmt.Println(result["users"])

}

```

You can see in the above code, we've managed to open our `users.json` and parse the JSON much like we would normally do in other programming languages such as Python or JavaScript.

When we run this, we should see that printing `result["users"]` results in a `map` being outputted to the console:

```s
$ go run main.go
Successfully opened users.json
[map[type:Reader age:23 social:map[facebook:https://facebook.com twitter:https://twitter.com] name:Elliot] map[name:Frasertype:Author age:17 social:map[facebook:https://facebook.com twitter:https://twitter.com]]]
```

If we wanted to traverse further down the tree, we could do that just as we normally would traverse down a `map` structure within Go, without having to define the struct types.

> **Note -** It is typically recommended to try and define the structs, if you happen to know the structure of the data coming back. 

# Unmarshalling our JSON

Once we've used the os.Open function to read our file into memory, we then have to convert it toa byte array using ioutil.ReadAll. Once it's in a byte array we can pass it to our json.Unmarshal() method.

```go
// read our opened xmlFile as a byte array.
byteValue, _ := ioutil.ReadAll(jsonFile)

// we initialize our Users array
var users Users

// we unmarshal our byteArray which contains our
// jsonFile's content into 'users' which we defined above
json.Unmarshal(byteValue, &users)

// we iterate through every user within our users array and
// print out the user Type, their name, and their facebook url
// as just an example
for i := 0; i < len(users.Users); i++ {
	fmt.Println("User Type: " + users.Users[i].Type)
	fmt.Println("User Age: " + strconv.Itoa(users.Users[i].Age))
	fmt.Println("User Name: " + users.Users[i].Name)
	fmt.Println("Facebook Url: " + users.Users[i].Social.Facebook)
}
```

# Full Implementation

Below you'll find the full implementation of this tutorial.

```go
package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
)

// Users struct which contains
// an array of users
type Users struct {
	Users []User `json:"users"`
}

// User struct which contains a name
// a type and a list of social links
type User struct {
	Name   string `json:"name"`
	Type   string `json:"type"`
	Age    int    `json:"Age"`
	Social Social `json:"social"`
}

// Social struct which contains a
// list of links
type Social struct {
	Facebook string `json:"facebook"`
	Twitter  string `json:"twitter"`
}

func main() {
	// Open our jsonFile
	jsonFile, err := os.Open("users.json")
	// if we os.Open returns an error then handle it
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Successfully Opened users.json")
	// defer the closing of our jsonFile so that we can parse it later on
	defer jsonFile.Close()

	// read our opened xmlFile as a byte array.
	byteValue, _ := ioutil.ReadAll(jsonFile)

	// we initialize our Users array
	var users Users

	// we unmarshal our byteArray which contains our
	// jsonFile's content into 'users' which we defined above
	json.Unmarshal(byteValue, &users)

	// we iterate through every user within our users array and
	// print out the user Type, their name, and their facebook url
	// as just an example
	for i := 0; i < len(users.Users); i++ {
		fmt.Println("User Type: " + users.Users[i].Type)
		fmt.Println("User Age: " + strconv.Itoa(users.Users[i].Age))
		fmt.Println("User Name: " + users.Users[i].Name)
		fmt.Println("Facebook Url: " + users.Users[i].Social.Facebook)
	}

}
```

# Conclusion

Hopefully this tutorial helped to demystify the art of working with JSON in Golang. If you found this tutorial helpful or have anything else to add then please let me know in the comments section below. 

# Further Reading

If you enjoyed this tutorial or found it useful, you may also enjoy some of my other articles on the site:

* [Creating a RESTful API with Go](/golang/creating-restful-api-with-golang/)
* [Creating a Simple Web Server with Go](/golang/creating-simple-web-server-with-golang/)