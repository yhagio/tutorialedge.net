---
title: "Check String Contains Python"
date: 2020-04-02T10:05:15+01:00
desc: In this snippet, we are going to look at how you can check
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: python
language: python
layout: snippets
image: python.svg
tags:
- snippet
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
snippet: |
  planets = "my very excellent mother just served us nine pizzas"
  is_true = "very" in planets
  print(is_true)

  is_false = "pluto" in planets
  print(is_false)
---

In this code snippet, we are going to look at how you can check if a string exists within a string in Python.

```py
>>> planets = "my very excellent mother just served us nine pizzas"
>>> "very" in planets
True
>>> "venus" in planets
False
```

We can then use this in if statements like so:

```py
planets = "my very excellent mother just served us nine pizzas"
if "just" in planets:
    print("Just is in the mnemonic")
```