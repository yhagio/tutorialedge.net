+++
date = "2017-04-09T21:07:11+01:00"
title = "parsing json with golang"
draft = true
desc = "In this tutorial we examine the encoding/json go package and how to parse xml files."
+++

JSON or Javascript Object Notation as it is short for, is a standard format for sending and receiving information. We could represent the same information with either XML or JSON, but JSON provides one advantage in the fact it is far more compact. This provides advantageous for situations where bandwidth is 
In this tutorial we’ll be looking at how one can parse xml files from the local file system using Golang’s in-built ‘encoding/json’ package. 

JSON is now the most popular message format available and you'll find that most RESTful APIs provide JSON responses due to the fact it's easily readable and most popular languages provide JSON support by default.

## The Encoding/Json Package


I recommend you check out the official documentation for:  [Encoding/Json](https://golang.org/pkg/encoding/json/). 


## Our Sample JSON File


For the purpose of this tutorial we’ll be parsing the following json file. We'll be parsing nested elements, integers and arrays.  

~~~
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
~~~


## Reading the JSON File


We’ll be using the os package in order to open up our users.xml file from our filesystem. 

~~~
// Open our xmlFile
xmlFile, err := os.Open("users.xml")
// if we os.Open returns an error then handle it
if err != nil {
	fmt.Println(err)
}
fmt.Println("Successfully Opened users.xml")
// defer the closing of our xmlFile so that we can parse it later on
defer xmlFile.Close()
~~~


## Defining our Structs

We'll be decoding JSON and populating these Go data structures by unmarshalling but first we'll need to define these data structures like so:

~~~
Import (
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
~~~


## Unmarshalling our JSON

Once we've used the os.Open function to read our file into memory, we then have to convert it toa byte array using ioutil.ReadAll. Once it's in a byte array we can pass it to our json.Unmarshal() method.

~~~
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


~~~


## Full Implementation

Below you'll find the full implementation of this tutorial.

~~~
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
~~~


## Conclusion


If you found this tutorial helpful or have anything else to add then please let me know in the comments section below.