---
title: "Essential Python Interview Questions"
date: 2019-03-13T09:16:38Z
draft: true
desc: In this article, we'll be looking at a list of various interview questions that you may be asked within your Python interviews.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: python.svg
tags:
- beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

Hello fellow devs! In this article, we'll be looking at some of the potential questions you may
be asked within a Python coding interview. This is in no way a comprehensive list, but it should
give you some additional practice if you are looking to sharpen your skills/knowledge before 
going into some interviews.

# Question 1

> **Question** - Explain Decorators and How You Would Implement A Simple Decorator

## Answer

Functions in Python are first class objects which can subsequently be passed around within your applications 
as if they were a standard variable or list. This allows us to create functions which take in functions and 
subsequently wrap a call to a function with anything we want.

Let's have a look at a simple example in which we create a `@my_decorator` decorator which will wrap a function
with a couple of print statements:

```py
def my_decorator(func):
    print("Wrapping a Decorator")
    func()
    print("Finished wrapping a Decorator")

@my_decorator
def hello_world():
    print("Hello World")

hello_world()
```

You'll notice that when we run this program. When our `hello_world()` function is called
it will attempt to run our function, but along with the `print` statements defined within
our `my_decorator()` function.

```s
$ python3 main.py
wrapping a decorator
hello world
finished wrapping a decorator
```

# Question 2

> **Question** - Explain The GIL (Global Interpreter Lock) and its limitations when creating concurrent applications.

## Answer

The GIL, or the `Global Interpreter Lock` within Python

# Question 3

> Explain some of the things that the multithreading package is good at optimizing

## Answer

# Question 4

> How would you improve the performance of a CPU intensive Python application

## Answer

# Question 5

> Explain Monkey-Patching

## Answer

# Question 6

> Difference between *args and **kwargs

## Answer

# Question 7

> What tools would you typically use to debug your Python applications?

## Answer

# Question 8

> What are some considerations when making your application multi-threaded

## Answer

# Question 9

> How do you ensure that differences in Python version packages don't break other applications running on your machine

## Answer

# Question 10

> How is memory managed in Python?

## Answer


# Conclusion

> **Note -** If you want to keep track of when new Go articles are posted to the
> site, then please feel free to follow me on twitter for all the latest news:
> [@Elliot_F](https://twitter.com/elliot_f).
