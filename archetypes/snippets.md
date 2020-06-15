---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
desc: 
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.png
layout: snippets
tags:
- beginner
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
  package main

  import "fmt"

  func main() {
    fmt.Println({{ replace .Name "-" " " | title }})
  }
---
