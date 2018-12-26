---
author: Elliot Forbes
date: 2017-04-15T08:48:49+01:00
desc: A quick and simple tutorial on how to read in console text input into your GoLang
  program. Excellent for simple shells and other command line driven tools.
series: golang
image: golang.png
tags:
- beginner
title: Reading in Console Input in Golang
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 8
---

This is a quick and simple tutorial on how to read in console text input into your Go (GoLang) program. In this tutorial, we'll be creating the basis for a very simple shell that will take in all user input and simply echo it back to the user.

# Reading in Full Sentences

We'll use Go's while loop equivalent of a for loop without any parameters to ensure our program continues on forever. In this example every time text is entered and then enter is pressed, we assign text to equal everything up to and including the `\n` special character. If we want to do a comparison on the string that has just been entered then we can use the strings.Replace method in order to remove this trailing `\n` character with nothing and then do the comparison.

> **Note -** If you want this to work on Windows Systems then you will have to do `text = strings.Replace(text, "\r\n", "", -1)` as windows uses a different line ending compared to unix systems.

```go
package main

import (
  "bufio"
  "fmt"
  "os"
  "strings"
)

func main() {

  reader := bufio.NewReader(os.Stdin)
  fmt.Println("Simple Shell")
  fmt.Println("---------------------")

  for {
    fmt.Print("-> ")
    text, _ := reader.ReadString('\n')
    // convert CRLF to LF
    text = strings.Replace(text, "\n", "", -1)

    if strings.Compare("hi", text) == 0 {
      fmt.Println("hello, Yourself")
    }

  }

}

```

You'll see in this example that whenever we enter the word "hi", our strings.Compare method will then return a 0 and it will print out hello back.

# Reading Single UTF-8 Encoded Unicode Characters

If you want to simply read one unicode character from the command line then I recommend you use bufio.ReadRune like so:

```go
reader := bufio.NewReader(os.Stdin)
char, _, err := reader.ReadRune()

if err != nil {
  fmt.Println(err)
}

// print out the unicode value i.e. A -> 65, a -> 97
fmt.Println(char)

switch char {
case 'A':
  fmt.Println("A Key Pressed")
  break
case 'a':
  fmt.Println("a Key Pressed")
  break
}
``` 

# Using Bufio's Scanner

A third way you could potentially read in input from the console in go is by creating a new scanner and passing os.Stdin just as we have done above creating new readers and then using scanner.Scan in order to read in from the console:

```go
func scanner() {
  scanner := bufio.NewScanner(os.Stdin)
  for scanner.Scan() {
    fmt.Println(scanner.Text())
  }
}
```

The above code will infinitely ask scan for input and echo back whatever is entered.

# Conclusion 

As you can see there are numerous ways to do this and the best solution depends on your particular needs. If you are only needing single character input then use ReadRune() or if you are wanting to read in full new line delimited sentences then ReadString is the way to go.

I hope you found this tutorial useful and if you have any further questions then please let me know in the comments section below!

> **Note -** If you enjoyed this post then you may like this one on [Calling System Commands in Go](/golang/executing-system-commands-with-golang/)