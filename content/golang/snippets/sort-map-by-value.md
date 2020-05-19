---
title: "Sort Map by Value"
date: 2019-07-15T19:30:49+01:00
desc: In this code snippet, we look at how you can quickly and easily sort maps in Go
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
layout: snippets
language: go
tags:
- snippets
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
snippet: |
  package main
  
  import (
    "fmt"
    "sort"
  )

  func main() {
    mymap := map[string]int{
      "Elliot": 25,
      "Sophie": 24, 
      "Fraser": 20,
    }
    
    // make an array of type string to store our keys 
    keys := []string{} 

    // iterate over the map and append all keys to our
    // string array of keys
    for key := range mymap {
      keys = append(keys, key)
    }

    // use the sort method to sort our keys array
    sort.Strings(keys)

    for _, key := range keys {
      fmt.Println(key, mymap[key])
    }
  }
---

> In this code snippet, we are going to look at how you can quickly and easily sort maps in Go using the `sort` package.


When we run this, we should see that we are able to retrieve the values from our map in
order of the length of the string key.

<div class="filename"> $ go run main.go </div>

```output
Elliot 25
Fraser 20
Sophie 24
```

<!-- # Sort Map by Integer Value

```go
mymap := map[string]int{"Elliot": 25, "Sophie": 24, "Fraser": 20}

```

<div class="filename"> $ output </div>

```output 

``` -->

## Further Reading

If you enjoyed this code snippet, you may also enjoy these articles:

* [Go Basic Types Tutorial](/golang/go-basic-types-tutorial/)
* [Go Sorting with sort Package](/golang/go-sorting-with-sort-tutorial/)
