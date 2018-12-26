---
author: Elliot Forbes
date: 2017-04-09T21:07:45+01:00
desc: In this tutorial we examine how to read in files and unmarshal them using the
  xml package in go.
series: golang
image: golang.png
tags:
- beginner
title: Parsing XML Files With Golang
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
twitter: https://twitter.com/Elliot_F
weight: 10
---

In this tutorial we look at how you can effectively read in an XML file from the file system and then parse this file using Go’s [“encoding/xml” Package](https://golang.org/pkg/encoding/xml/). We’ll look at how you can traverse multiple nested xml elements and then we’ll simply print this out to our terminal window.

# Our Example XML File

So to begin with, we’ll need an xml file that we can traverse.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<users>
  <user type="admin">
    <name>Elliot</name>
    <social>
      <facebook>https://facebook.com</facebook>
      <twitter>https://twitter.com</twitter>
      <youtube>https://youtube.com</youtube>
    </social>
  </user>  
  <user type="reader">
    <name>Fraser</name>
    <social>
      <facebook>https://facebook.com</facebook>
      <twitter>https://twitter.com</twitter>
      <youtube>https://youtube.com</youtube>
    </social>
  </user>  
</users>
```


You’ll see the above xml has attributes set on the user tags, nested elements and if you are able to parse this then you should, by extension, be able to parse any xml file regardless of size.

# Reading in our File

The first obstacle we’ll have to overcome is reading this file into memory. We can do this by using a combination of the “os” package and the “io/ioutil” package. 

```go
package main


import (
	"fmt"
	"io/ioutil"
	"os"
)

func main() {

	// Open our xmlFile
	xmlFile, err := os.Open("users.xml")
	// if we os.Open returns an error then handle it
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Successfully Opened users.xml")
	// defer the closing of our xmlFile so that we can parse it later on
	defer xmlFile.Close()

}
```

# Defining our Structs

Before we can parse our xml file, we need to define some structs. We’ll have one to represent the complete list of users, one to represent our user and then one to represent our users social links.

```go
import (
  ... 
  // remember to add encoding/xml to your list of imports
	"encoding/xml"
	...
)

// our struct which contains the complete
// array of all Users in the file
type Users struct {
	XMLName xml.Name `xml:"users"`
	Users   []User   `xml:"user"`
}

// the user struct, this contains our
// Type attribute, our user's name and
// a social struct which will contain all
// our social links
type User struct {
	XMLName xml.Name `xml:"user"`
	Type    string   `xml:"type,attr"`
	Name    string   `xml:"name"`
	Social  Social   `xml:"social"`
}

// a simple struct which contains all our
// social links
type Social struct {
	XMLName  xml.Name `xml:"social"`
	Facebook string   `xml:"facebook"`
	Twitter  string   `xml:"twitter"`
	Youtube  string   `xml:"youtube"`
}
```

# Unmarshalling Our XML

So above we’ve seen how to load in our file into memory, in order to marshal it we need to convert this file to a byte array and then use the xml.Unmarshal method in order to populate our Users array.

```go
// read our opened xmlFile as a byte array.
byteValue, _ := ioutil.ReadAll(xmlFile)

// we initialize our Users array
var users Users
// we unmarshal our byteArray which contains our
// xmlFiles content into 'users' which we defined above
xml.Unmarshal(byteValue, &users)
```

# Full Implementation

```go
package main

import (
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"os"
)

// our struct which contains the complete
// array of all Users in the file
type Users struct {
	XMLName xml.Name `xml:"users"`
	Users   []User   `xml:"user"`
}

// the user struct, this contains our
// Type attribute, our user's name and
// a social struct which will contain all
// our social links
type User struct {
	XMLName xml.Name `xml:"user"`
	Type    string   `xml:"type,attr"`
	Name    string   `xml:"name"`
	Social  Social   `xml:"social"`
}

// a simple struct which contains all our
// social links
type Social struct {
	XMLName  xml.Name `xml:"social"`
	Facebook string   `xml:"facebook"`
	Twitter  string   `xml:"twitter"`
	Youtube  string   `xml:"youtube"`
}

func main() {

	// Open our xmlFile
	xmlFile, err := os.Open("users.xml")
	// if we os.Open returns an error then handle it
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Successfully Opened users.xml")
	// defer the closing of our xmlFile so that we can parse it later on
	defer xmlFile.Close()

	// read our opened xmlFile as a byte array.
	byteValue, _ := ioutil.ReadAll(xmlFile)

	// we initialize our Users array
	var users Users
	// we unmarshal our byteArray which contains our
	// xmlFiles content into 'users' which we defined above
	xml.Unmarshal(byteValue, &users)

	// we iterate through every user within our users array and
	// print out the user Type, their name, and their facebook url
	// as just an example
	for i := 0; i < len(users.Users); i++ {
		fmt.Println("User Type: " + users.Users[i].Type)
		fmt.Println("User Name: " + users.Users[i].Name)
		fmt.Println("Facebook Url: " + users.Users[i].Social.Facebook)
	}

}
```

# Conclusion

I hope you found this tutorial beneficial, if you’ve got anything you wish to add then please do in the comments section below!
