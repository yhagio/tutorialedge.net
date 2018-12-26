---
author: Elliot Forbes
date: 2017-09-03T17:58:24+01:00
desc: In this tutorial we will look at how we can work with iterators in Python
series: python
image: python-logo.png
tags:
- beginner
title: Python Iterator Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 13
---

> This tutorial was built using Python 3.6

In this tutorial we'll be looking at what `iterators` are with Python. We'll also be looking at how we can effectively work with them and improve our Python programs using them. 

# What Are Iterators?

Iterators are cool in the sense that they allow us to step over every item in an array, object or file and perform work on each item. For example, we could take the string `test` and use an iterator to step over every character element within that string.

```python
>>> string = "test"

>>> for character in string:
>>>    print(character)

# Output
t
e
s
t
```

# Iterables

`Iterables` in Python represent something that we can actively iterate over. These are things like `lists`, `sets` and even `strings` as we've seen in the previous demonstration. If we wish to turn an `iterable` into an `iterator` then we can use the `iter` built in function which takes in the `iterable` like so:

```python
>>> string = "test"
>>> iterator = iter(string)
>>> iterator = iter(string)
>>> print(iterator.next())
t
>>> print(iterator.next())
e
>>> print(iterator.next())
s
>>> print(iterator.next())
t
```

# The `next()` Method

When we have an `iterator` object we can effectively step through it using the `next()` method. This will simply return the next element of the given `iterator` object, if no further elements exist in the `iterator` then a `StopIteration` exception will be raised:

```python
>>> iterator = iter(string)
>>> print(iterator.next())
t
>>> print(iterator.next())
e
>>> print(iterator.next())
s
>>> print(iterator.next())
t
>>> print(iterator.next())
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```

> Under Construction
