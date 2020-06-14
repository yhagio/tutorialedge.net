---
title: "Crafting HTTP Requests in Go"
date: 2020-06-13T13:40:18+01:00
draft: true
desc: In this snippet, we are going to look at how you can craft custom HTTP requests in
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: 
image:
layout: snippets 
language: go
tags:
- beginner
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
  package main

  import (
    "fmt"
    "bytes"
    "encoding/json"
    "net/http"
  )

  func main() {

    client := http.Client{}

    body, err := json.Marshal(map[string]string{
      "name": "Elliot",
    })

    if err != nil {
      fmt.Println(err)
    }

    request, err := http.NewRequest("POST", "https://example.org", bytes.NewBuffer(body))
    if err != nil {
      fmt.Println(err)
    }

    fmt.Printf("%+v\n", request)

    resp, err := client.Do(request)
    if err != nil {
      fmt.Println(err)
    }
    
    fmt.Println(resp)
  }
---

# Introduction

# Prerequisites

# Conclusion

## Further Reading:

* []()