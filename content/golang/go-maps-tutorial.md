---
author: Elliot Forbes
date: 2019-06-29T23:00:00+00:00
desc: In this tutorial, we are going to look at how you can effectively use Maps within your Go applications.
series: golang
image: golang.svg
tags:
  - concurrency
title: Go Maps Tutorial
twitter: https://twitter.com/elliot_f
weight: 15
---

In this tutorial, we are going to look at maps in Go and how you can use them to achieve world domination!

We are going to be covering just about everything you need to know about maps to get started using them within your own Go applications. We are going to be looking at all of the various ways you interact with maps in Go and by the end of this tutorial, you will be a master when it comes to using them.

# The Map Data Structure

Maps are an incredibly useful data structure when you need incredibly quick key-value lookups. They are used in an incredibly diverse number of ways and they are an invaluable tool in any programmer's belt regardless of the underlying language used.

> Maps in Go can be considered the equivalent of `dict` in Python, or `HashMap` in Java. 

# Map Basic Syntax

Maps in Go can be defined using the `map` keyword followed by a `key` type and a `value` type. These types can be any of the basic types that Go supports and you can initialise a new map in Go using the `make` keyword which takes in the map type.

> **Note:** The `make` builtin function takes an optional second `capacity` parameter, however for maps in Go this is ignored as maps will automatically grow and shrink

```go
// a map of string to int which has
// no set capacity
mymap := make(map[string]int)

// a map of bool to int which has a 
// set capacity of 2
boolmap := make(map[bool]int)
```

Once we have a map initialised, you can set keys in the map with their respective values like so:

```go
mymap["mykey"] = 10
fmt.Println(mymap["mykey"]) // prints out 10
```

# Iterating over Keys and Values

When it comes to retrieving values out of a map, we can use the `range` keyword and loop over `keys` and `values` like we would a normal `array` or `slice:`

```go
for key, value := range mymap {
    fmt.Println(key)
    fmt.Println(value)
}
```

Running this will subsequently print out all of the keys and their subsequent values contained within this `mymap` map.

If you need to extract all of the keys from a given `map` then you can use this loop in order to retrieve all keys and subsequently `append` them to an array of keys.

```go
var keyArray []string

for key := range mymap {
    keyArray = append(keyArray, key)
}
```

# Deleting Elements in a Map

For deleting items from a map, we can use the builtin `delete` function which takes in a `map[key]` key and subsequently tries to delete the given value from the map. In the event that the key does not exist within the map, the `delete` call is a no-op which essentially means it does nothing.

```go
mymap["mykey"] = 1
fmt.Println(mymap["mykey"])
delete(mymap["mykey"])
fmt.Println("Value deleted from map")
```

# Mapping Strings to Interfaces

Maps in Go can be used for more than just mapping basic types to basic types. In more complex programs, you may need to map `string` to say an `interface`.

Say, for instance, you wanted to map an incoming HTTP requests `UUID` to a given `interface` within your application. This would allow you to change what `interface` handles an incoming request based on its mapped `UUID`.

```go
package main

import "fmt"

type Service interface{
	SayHi()
}

type MyService struct{}
func (s MyService) SayHi() {
	fmt.Println("Hi")
}

type SecondService struct{}
func (s SecondService) SayHi() {
	fmt.Println("Hello From the 2nd Service")
}

func main() {
	fmt.Println("Go Maps Tutorial")
	// we can define a map of string uuids to
    // the interface type 'Service'
	interfaceMap := make(map[string]Service)
	
    // we can then populate our map with 
    // simple ids to particular services
	interfaceMap["SERVICE-ID-1"] = MyService{}
	interfaceMap["SERVICE-ID-2"] = SecondService{}

	// Incoming HTTP Request wants service 2
	// we can use the incoming uuid to lookup the required
	// service and call it's SayHi() method
	interfaceMap["SERVICE-ID-2"].SayHi()

}
```

If we then attempt to run this, we should see that we have successfully been able to retrieve the service we want from this map and then call the `SayHi()` method.

<div class="filename"> $ go run main.go </div>

```output
Go Maps Tutorial
Hello From the 2nd Service
```

If we wanted to get really fancy, we could iterate over all the interfaces within our map, much like we did earlier on in the tutorial and call every `SayHi()` method:

```go
for key, service := range interfaceMap {
	fmt.Println(key)
	service.SayHi()
}
```

This would subsequently print out the service keys and then call their respective `SayHi()` methods.

# Conclusion

Hopefully you enjoyed this tutorial on maps in Go and it has helped you out in some way! If you have any feedback or comments then I would love to hear them in the comments section below!

## Further Reading:

Maps in Go can also be used when it comes to unmarshalling JSON and XML data into Go structs. If you want to see how they are used then I recommend checking out the following articles:

* [Snippet: Checking if a Key Exists in a Map](/golang/snippets/check-key-exists-in-map-go/)
* [Snippet: Sort Map By Value](/golang/snippets/sort-map-by-value/)
* [Parsing JSON Files with Go](https://tutorialedge.net/golang/parsing-json-with-golang/)
* [Go JSON Tutorial](https://tutorialedge.net/golang/go-json-tutorial/)
