---
title: "Go Composite Types Tutorial"
date: 2018-07-14T22:24:26+01:00
draft: true
desc: "In this tutorial, we are going to look at the various composite types available in Go"
author: "Elliot Forbes"
weight: 2
tags: ["golang"]
series: ["golang"]
twitter: "https://twitter.com/Elliot_F"
---

Welcome All! In this tutorial, we are going to be looking at the various different composite data types that are available in the Go programming language. 

If you haven't already, I'd suggest you check out my other tutorial in this course on [Basic Data Types](/golang/go-basic-types-tutorial/). You'll need to know about these basic data types in order to understand some of the composite data types. 

## Arrays

Let's dive into our first Composite data type, the `array` and see how we can declare arrays and work with them.

Let's start by declaring an array of all of the days of the week. This will be an empty array for now:

```go
// declaring an empty array of strings
var days []string

// declaring an array with elements
days := [...]string{"monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"}
```

If we want to query the first element in the array, or a specific element, we can do so in a very similar fashion to other languages:

```go
fmt.Println(days[0]) // prints 'monday'
fmt.Println(days[5]) // prints 'saturday'
```

#### Slices

The difference between slices and arrays in very subtle and it's something that has most definitely caught me out a few times in the past. Slices in Go allow you to access a subset of an underlying array's elements. 

Slices are made up of three things, a `pointer`, a `length`, and a `capacity`. Let's try and visualize this with an example. Say, for instance, we have an array of the days of the week, we could use slices to extract only those days that are week days.

```go
days := [...]string{"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"}
weekdays := days[0:5]
fmt.Println(weekdays)
// This returns: [Monday Tuesday Wednesday Thursday Friday]
```

#### Maps

Maps are Go's representation of hash tables, a data structure that allows you to map one arbitrary data type to another. For instance, let's create a map of YouTube channel names to the numbers of subscribers for that channel:

```go
youtubeSubscribers := map[string]int{
  "TutorialEdge":     2240,
  "MKBHD":            6580350,
  "Fun Fun Function": 171220,
}

fmt.Println(youtubeSubscribers["MKBHD"]) // prints out 6580350
```

This represents a mapping between a `string` data type and an `int` data type.

#### Structs

> Under Construction

```go
type Person struct {
  name string
  age int
}
```

## Conclusion

So, hopefully you found this tutorial useful and it has given you insight as to how you can use more advanced data types within your own Go programs. 

If you found it useful or require more information then please let me know in the comments section below!

