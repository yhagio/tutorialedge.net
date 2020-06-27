---
title: "Go JSON Tutorial"
date: 2019-01-21T19:07:28Z
desc:
  In this tutorial, we are going to cover everything you need when it comes to
  working with JSON in Go.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
tag: Beginner
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

Welcome fellow Gophers! In this tutorial, we are going to be taking a
comprehensive look at how we can work with JSON in our Go applications.

JSON, or JavaScript Object Notation, is without a doubt the most popular data
format for sending and receiving data across the web. All major languages
support the data format by default and Go is no different.

> **Source Code** - The full source code for this tutorial can be found here:
[TutorialEdge/go-json-tutorial](https://github.com/TutorialEdge/go-json-tutorial)

# Video Tutorial

{{< youtube id="Osm5SCw6gPU" autoplay="false" >}}

# Marshalling JSON

Let's start off by taking a look at how we can Marshal JSON in Go. Marshalling
effectively allows us to convert our Go objects into JSON strings.

## A Simple Example

Let's have a look at a simple example of this. Say we had a `Book` struct
defined in our Go code.

```go
type Book struct {
    Title string `json:"title"`
    Author string `json:"author"`
}

// an instance of our Book struct
book := Book{Title: "Learning Concurreny in Python", Author: "Elliot Forbes"}
```

If we wanted to convert an instance of a `Book` struct into JSON, we could do
that by using the `encoding/json` go package.

```go
byteArray, err := json.Marshal(book)
if err != nil {
    fmt.Println(err)
}

fmt.Println(string(byteArray))
```

## Advanced Example - Nested Structs

Now that we've got the basics of Marshalling down, let's take a look at a more
complex example that features nested structs.

```go
type Book struct {
    Title string `json:"title"`
    Author Author `json:"author"`
}

type Author struct {
    Sales int `json:"book_sales"`
    Age int `json:"age"`
    Developer bool `json:"is_developer"`
}

author := Author{Sales: 3, Age: 25, Developer: true}
book := Book{Title: "Learning Concurrency in Python", Author: author}
```

So, we've defined a more complex struct which features a nested struct this
time. Within the definition of the struct, we've defined the `JSON` tags that
map the fields of our structs directly to the fields in our marshalled JSON.

```go
byteArray, err := json.Marshal(book)
if err != nil {
    fmt.Println(err)
}

fmt.Println(string(byteArray))
```

Now, when we run this within our program, we should see the following output:

```s
$ go run main.go
{"title":"Learning Concurrency in Python","author":{"book_sales":3,"age":25,"is_developer":true}}
```

## Indentation

If you want to print out your JSON in a way that it more readable, then you can
try using the `json.MarshalIndent()` function instead of the regular
`json.Marshal()` function.

```go
author := Author{Sales: 3, Age: 25, Developer: true}
book := Book{Title: "Learning Concurrency in Python", Author: author}

byteArray, err := json.MarshalIndent(book, "", "  ")
if err != nil {
    fmt.Println(err)
}
```

You'll notice that we've passed in two additional arguments to MarshalIndent,
these are the prefix string and the indent string. You can add a deeper
indentation by changing the length of the indent string.

When we now go to run this, we should see that our outputted JSON string looks a
lot nicer:

```json
{
  "title": "Learning Concurrency in Python",
  "author": {
    "book_sales": 3,
    "age": 25,
    "is_developer": true
  }
}
```

### Full Source Code

The full source code for this example

```go
package main

import (
    "encoding/json"
    "fmt"
)

type Book struct {
    Title  string `json:"title"`
    Author Author `json:"author"`
}

type Author struct {
    Sales     int  `json:"book_sales"`
    Age       int  `json:"age"`
    Developer bool `json:"is_developer"`
}

func main() {

    author := Author{Sales: 3, Age: 25, Developer: true}
    book := Book{Title: "Learning Concurrency in Python", Author: author}

    byteArray, err := json.Marshal(book)
    if err != nil {
        fmt.Println(err)
    }

    fmt.Println(string(byteArray))
}
```

# Unmarshalling JSON

Now that we've covered marshalling our structs into JSON, let's try and go the
other way. We want to be able to take in a JSON string and unmarshal that string
into a struct that we can then work with just as we would a normal struct in Go.

You'll typically find yourself implementing just this if you have a Go service
which consumes other APIs, as these APIs that you are interacting with will
typically return responses as JSON strings.

In this example we'll take a JSON string that comes from a small Battery sensor
and we'll attempt to unmarshal this JSON string into a struct.

```json
{ "name": "battery sensor", "capacity": 40, "time": "2019-01-21T19:07:28Z" }
```

Now the first thing we'll want to do for this particular example is define a
struct that has the same fields as our JSON string.

```go
type SensorReading struct {
    Name string `json:"name"`
    Capacity int `json:"capacity"`
    Time string `json:"time"`
}
```

You'll notice that, for each of our key-value pairs in our JSON string, we've
defined a field on our `SensorReading` struct which matches that key name. We've
also added `tags` to each of our fields within our struct that look like this:
`json:"KEY"`. These tags are there to indicate which JSON key matches to which
`struct` field value.

Now that we've defined a struct, we can proceed with the task of unmarshalling
our JSON string into a struct using the `Unmarshal` function:

```go
jsonString := `{"name": "battery sensor", "capacity": 40, "time": "2019-01-21T19:07:28Z"}`

var reading SensorReading
err := json.Unmarshal([]byte(jsonString), &reading)
fmt.Printf("%+v\n", reading)
```

You'll notice that we've cast our `jsonString` which contains our JSON, to a
byte array when passing it into our `json.Unmarshal` function call. We've also
passed in a reference to the struct that we want to unmarshal our JSON string
into with `&reading`.

When we then go to run this, we should see the following output:

```s
$ go run main.go
{Name:battery sensor Capacity:40 Time:2019-01-21T19:07:28Z}
```

We've been able to successfully unmarshal our JSON string into a struct with
minimal fuss! We can now work with that populated struct just as we normally
would in our Go programs.

# Unstructured Data

Sometimes, you might not have knowledge of the structure of the JSON string that
you are reading. You may not be able to generate a pre-defined struct that you
can subsequently unmarshal your JSON into.

If this is the case, then there is an alternative approach that you can utilize
which is to use `map[string]interface{}` as the type you unmarshal into.

```go
str := `{"name": "battery sensor", "capacity": 40, "time": "2019-01-21T19:07:28Z"}`

var reading map[string]interface{}
err = json.Unmarshal([]byte(str), &reading)
fmt.Printf("%+v\n", reading)
```

Here, we have modified our existing SensorReading code from above and we've
changed the type of `reading` to this new `map[string]interface{}` type.

When we now go to run this, we should see that our JSON string has been
successfully converted into a map of strings and elements:

```s
$ go run main.go
map[capacity:40 time:2019-01-21T19:07:28Z name:battery sensor]
```

This can be a handy tip if you are in a tight squeeze, however, if you do know
the structure of your JSON then it is highly recommended that you define the
structs explicitly.

# Conclusion

Hopefully you enjoyed this tutorial and found it useful, if you have any
suggestions as to how I can make this better, I'd love to hear them in the
suggestions box below!

> **Note -** If you want to keep track of when new Go articles are posted to the
> site, then please feel free to follow me on twitter for all the latest news:
> [@Elliot_F](https://twitter.com/elliot_f).
