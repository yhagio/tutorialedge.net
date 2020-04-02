---
title: "Check String Contains Python"
date: 2020-04-02T10:05:15+01:00
desc: In this snippet, we are going to look at how you can check
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: python
image: python.svg
tags:
- snippet
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
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