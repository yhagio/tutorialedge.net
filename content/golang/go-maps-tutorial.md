+++
author = "Elliot Forbes"
date = "2019-06-29T23:00:00+00:00"
desc = "In this tutorial, we are going to look at how you can effectively use Maps within your Go applications."
image = ""
series = ["golang"]
tags = ["beginner"]
title = "Go Maps Tutorial"
twitter = "https://twitter.com/elliot_f"
weight = 15

+++
In this tutorial, we are going to look at maps in Go and how you can use them to achieve world domination!

We are going to be covering just about everything you need to know about maps to get started using them within your own Go applications.

# The Map Data Structure

Maps are an incredibly useful data structure when you need incredibly quick key-value lookups. They are used in an incredibly diverse number of ways and they are an invaluable tool in any programmer's belt regardless of the underlying language used.

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

# Deleting Elements in a Map

For deleting items from a map, we can use the builtin `delete` function which takes in a `map[key]` key and subsequently tries to delete the given value from the map. In the event that the key does not exist within the map, the `delete` call is a no-op which essentially means it does nothing.

```go
mymap["mykey"] = 1
fmt.Println(mymap["mykey"])
delete(mymap["mykey"])
fmt.Println("Value deleted from map")
```

# Conclusion

Hopefully you enjoyed this tutorial on maps in Go and it has helped you out in some way! If you have any feedback or comments then I would love to hear them in the comments section below!

## Further Reading:

* [Sorting in Go with the sort Package](https://tutorialedge.net/golang/go-sorting-with-sort-tutorial/)