---
title: Parsing Date Strings in Go
date: 2019-07-17T07:58:40.000+00:00
desc: In this code snippet, we are going to look at how you can parse date and time strings in Go using the time package.
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

  import (
      "fmt"
      "time"
  )

  func main() {
    // the layout we want to use to parse our
    // date string
    layout := "2006-01-02T15:04:05.000Z"
    
    // the string we want to parse
    str := "2020-05-05T09:00:00.000Z"


    t, err := time.Parse(layout, str)
    if err != nil {
        fmt.Println(err)
    }
     
    fmt.Println(t.Weekday()) // Tuesday
    fmt.Println(t.Day()) // 05
    fmt.Println(t.Month()) // May
  }

---

In this code snippet, we are going to look at how you can parse date & time strings in Go using the `time` package.

In this example, we use the `time.Parse` function which takes in the date layout as well as the date string we wish to parse.

# List of Popular Layouts

Here you'll find a list of the most popular date format layouts that you can use to parse your date strings:

```go
const (
    ANSIC       = "Mon Jan _2 15:04:05 2006"
    UnixDate    = "Mon Jan _2 15:04:05 MST 2006"
    RubyDate    = "Mon Jan 02 15:04:05 -0700 2006"
    RFC822      = "02 Jan 06 15:04 MST"
    RFC822Z     = "02 Jan 06 15:04 -0700" // RFC822 with numeric zone
    RFC850      = "Monday, 02-Jan-06 15:04:05 MST"
    RFC1123     = "Mon, 02 Jan 2006 15:04:05 MST"
    RFC1123Z    = "Mon, 02 Jan 2006 15:04:05 -0700" // RFC1123 with numeric zone
    RFC3339     = "2006-01-02T15:04:05Z07:00"
    RFC3339Nano = "2006-01-02T15:04:05.999999999Z07:00"
    Kitchen     = "3:04PM"
    // Handy time stamps.
    Stamp      = "Jan _2 15:04:05"
    StampMilli = "Jan _2 15:04:05.000"
    StampMicro = "Jan _2 15:04:05.000000"
    StampNano  = "Jan _2 15:04:05.000000000"
)
```



## Further Reading

If you found this code snippet useful, you may also be interested in some of the other content on the site:

* [Building a REST API in Go with Fiber](/golang/basic-rest-api-go-fiber/)