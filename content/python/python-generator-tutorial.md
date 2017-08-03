+++
title = "Python Generators Tutorial"
draft = true
date = "2017-06-12T15:26:02+01:00"
desc = "In this tutorial we look at what generators are within Python and how we can use them"
tags = ["python"]
series = [ "python" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

In this tutorial I'm aiming to help demystify this concept of generators within the Python programming language. We'll look at what generators are and how we can utilize them within our python programs.

## What Are Generators?

Generators are functions that can return multiple values at different times. Let's Typically in Python we would define a function like so:

~~~python
def my_func(x):
    return x*2
~~~

This function would return once and only once the value of `x` doubled. However with generators we could return multiple values of `x` at different times like so:

~~~python
def my_generator(x):
    yield x*2
    yield x*4
    yield x*8
~~~

