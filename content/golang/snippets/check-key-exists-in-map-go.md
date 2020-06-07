---
title: Checking if a Key Exists in a Map in Go
date: 2019-07-17T07:58:40.000+00:00
desc: In this code snippet, we are going to look at how you can check to see if a
  key exists within a Map in Go
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.png
language: go
tags:
- snippets
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
layout: snippets
snippet: |
  package main

  import "fmt"

  func main() {

      mymap := make(map[string]int)

      mymap["elliot"] = 25

      // we can use this if statement to check to see if 
      // a given key "elliot" exists within a map in Go
      if _, ok := mymap["elliot"]; ok {
          // the key 'elliot' exists within the map
          fmt.Println(mymap["elliot"])
      }
  }

---


When we execute this, we will see the following output:

<div class="filename"> $ go run main.go </div>

```output
25
```

When we execute the call to `mymap['key']` we get back two distinct values, the first of which is the value of the key and the second is a `bool` value which represents whether or not the given key exists within the map. 

This second value is what we use to check if a given key exists in the `if` statement on line 13. We first do an assignment using `_, ok := mymap["elliot"];` before then using the `ok` value as a conditional for our `if` statement. 

Only if the value exists in the map does the body of the `if` statement execute.

# Further Reading

If you found this useful and wish to learn more about Maps in Go, then you may also enjoy this full article on Maps:

* [Go Maps Tutorial](/golang/go-maps-tutorial/)