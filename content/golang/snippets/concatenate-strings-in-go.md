---
title: "Concatenate Strings in Go"
date: 2019-07-15T19:30:49+01:00
desc: In this code snippet, we are going to look at how you can use the strings.Builder type to efficiently concatenate strings in Go.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
language: go
layout: snippets
tags:
- snippets
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
    package main

    import (
        "fmt"
        "strings"
    )

    func main() {
        fmt.Println("String Concatenation Tutorial")

        var myString strings.Builder
        // we can use the WriteString method to append
        // to our existing strings.Builder string
        myString.WriteString("Hello ")
        // here we append to the end of our string
        myString.WriteString("World")
        
        // print out our concatenated string
        fmt.Println(myString.String())

    }
---

👋 Welcome Gophers! In this code snippet, we are going to look at how you can efficiently concatenate strings in Go using the string.Builder type.

<div class="filename"> $ go run main.go </div>

```output
String Concatenation Tutorial
Hello World
```

### Further Reading

If you enjoyed this really quick and dirty code snippet on string concatenation in Go, you may also like these articles:

* [Go Basic Types Tutorial](/golang/go-basic-types-tutorial/)
* [Comparing Structs in Go](/golang/snippets/comparing-structs-in-go/)
