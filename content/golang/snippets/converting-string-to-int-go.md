---
title: "Converting a String to an Int in Go"
date: 2019-07-15T19:30:49+01:00
desc: In this code snippet, we are going to look at how you can convert a string to an int value in Go
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
layout: snippets
language: go
tags:
- snippets
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
    package main

    import (
        "fmt"
        "strconv"
    )

    func main() {
        
        myAgeString := "26"
        fmt.Printf("My Age: %s\n", myAgeString)

        ageValue, err := strconv.Atoi(myAgeString)
        if err != nil {
            fmt.Println(err)
        }
        
        ageValue += 1
        fmt.Printf("New Age: %d\n", ageValue)

    }

---


In this code snippet, we are going to look at how you can convert a `string` variable to an `int` variable in Go using the `strconv` package.

In this example we define a string `myAgeString` which is equal to `"26"`. In order to convert this `string` value to an `int` we will need to call `strconv.Atoi()` passing in the `myAgeString`. This will return the `int` value or an `error` which can can capture and handle.

We are then able to add 1 to this new `int` variable and then print it out using the `%d` format character.


### Further Reading:

If you found this code snippet useful, you may also enjoy some of the other content on the site: 

* [Go Basic Types Tutorial](/golang/go-basic-types-tutorial/)