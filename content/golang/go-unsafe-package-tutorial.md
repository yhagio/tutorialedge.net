---
title: "Go Unsafe Package Tutorial"
date: 2018-10-06T14:50:30+01:00
draft: true
tags:
- advanced
series: golang
image: golang.png
author: Elliot Forbes
twitter: https://twitter.com/Elliot_f
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
description: In this tutorial, we are going to be taking an in-depth look at the unsafe package in Go
weight: 32
---

# Introduction

## Calculating the Size of a Variable Reference

```go
	myint := 3
	fmt.Printf("a: %T, %d\n", myint, unsafe.Sizeof(myint))

	mybool := true
	fmt.Printf("a: %T, %d\n", mybool, unsafe.Sizeof(mybool))

	var myInterface interface{}
	fmt.Printf("a: %T, %d\n", myInterface, unsafe.Sizeof(myInterface))

	var myArray []int
	fmt.Printf("a: %T, %d\n", myArray, unsafe.Sizeof(myArray))

	var stringArray []string
	fmt.Printf("a: %T, %d\n", stringArray, unsafe.Sizeof(stringArray))
```

# Conclusion

