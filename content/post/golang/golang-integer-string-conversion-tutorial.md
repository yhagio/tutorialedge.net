+++
date = "2017-04-09T21:09:39+01:00"
title = "golang integer string conversion tutorial"
draft = true
desc = "In this tutorial we look at how we can convert String to integer and back again using the strconv golang package."
series = [ "golang" ]
+++

In this tutorial we briefly look at how one can convert an integer to string and back again in GoLang. In order to do this we’ll be using the ‘strconv’ package and the Atoi and Itoa functions.

Full documentation of the strconv package can be found here: [Strconv Package](https://golang.org/pkg/strconv/)

## String to Integer Conversion

~~~
func strToIntConversion() {
	fmt.Println("String to Integer Value Conversion")

	var ourInteger int
	// use the strconv package to convert our string '12345' to an integer value
	ourInteger, err := strconv.Atoi("12345")

	// if there has been an error then handle it here
	if err != nil {
		fmt.Println(err)
	}

	// this should print out 12346
	fmt.Println(ourInteger + 1)

}
~~~

## Integer to String Conversion

~~~
func intToStringConversion() {
	fmt.Println("integer to string conversion")

	var ourString string

	ourString = strconv.Itoa(12345)

	// print out our string value
	fmt.Println(ourString)

}
~~~

## Conclusion

Full Source Code:

~~~
package main

import (
	"fmt"
	"strconv"
)

func strToIntConversion() {
	fmt.Println("String to Integer Value Conversion")

	var ourInteger int
	// use the strconv package to convert our string '12345' to an integer value
	ourInteger, err := strconv.Atoi("12345")

	// if there has been an error then handle it here
	if err != nil {
		fmt.Println(err)
	}

	// this should print out 12346
	fmt.Println(ourInteger + 1)
}


func intToStringConversion() {
	fmt.Println("integer to string conversion")

	var ourString string

	ourString = strconv.Itoa(12345)

	// print out our string value
	fmt.Println(ourString)

}


func main() {
	strToIntConversion()
	intToStringConversion()
}
~~~