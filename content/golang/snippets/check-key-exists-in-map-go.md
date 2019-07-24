---
title: "Check Key Exists in Map Go"
date: 2019-07-17T08:58:40+01:00
desc: In this code snippet, we are going to look at how you can check to see if a key exists within a Map in Go
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.png
tags:
- snippets
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> In this code snippet, we are going to look at how you can check to see if a key exists within a Map in Go

<div class="filename"> main.go </div>

```go
package main

import "fmt"

func main() {

    mymap := make(map[string]int)

    mymap["elliot"] = 25

    // we can use this if statement to check to see if 
    // a given key "elliot" exists within a map in Go
    if _, ok := mymap["elliot"]; ok {
        // the key 'elliot' exists within the map
        fmt.Println(mymap["elliot"])
    }
}
```

When we execute this, we will see the following output:

<div class="filename"> $ go run main.go </div>

```output
25
```

# Further Reading

If you found this useful and wish to learn more about Maps in Go, then you may also enjoy this full article on Maps:

* [Go Maps Tutorial](/golang/go-maps-tutorial/)
