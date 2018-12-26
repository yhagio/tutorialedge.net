---
author: Elliot Forbes
date: 2017-10-31T22:00:56Z
desc: In this article take a look at how you can implement very basic threading in
  Python using Threads
series: python
image: python-logo.png
tags:
- concurrency
title: Threads in Python
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> This tutorial was written using Python 3.6. Some of the code may not be compatible with Python 2.7

In this tutorial we are going to take an in-depth look at threads in Python. We'll start by covering what they consist of, we'll then touch upon how you can define your own simple threads within your Python programs and finally we'll cover all of the ways you can work with these simple threads within a simple Python program.

# What Are Threads?

Threads are essentially just ordered streams of instructions. I.e. do this 5 times and then terminate. These can be scheduled to run by the operating system and can be run in parallel across multiple cores or concurrently across a single core. 

Threads typically live within a parent process, which we'll be covering later on in the course, and typically consist of 4 things.

1. A Program Counter
1. A Stack
1. A Set of Registers
1. An Identifier

Threads within an operating system are typically able to interact with shared resources, and communication is indeed possible between multiple threads. As they are able to share resources such as memory, they are also able to modify things in a concurrent or even parallel fashion. However, when two threads start modifying something in a concurrent fashion, it's important to note that if you do not put in place appropriate guards and checks within your code, you may see race conditions start to create issues. 

# Types of Thread

There are two distinct types of thread. These are:

1. User-level threads: These are the ones we can actively play with within our code etc.
1. Kernel-level threads: These are very low-level threads that act on behalf of the operating system.

# Multithreading

When people typically talk about multithreaded processors, they are typically referring to a processor that can run multiple threads simultaneously. These would typically have 2 or more threads actively competing for execution time within a core and when one thread gives up or stops, the processing core then starts to execute another thread. It context switches between these threads very quickly and gives of the impression that the computer is running things in parallel.

# Creating a Simple Thread

Before we go into creating a thread in Python, we should take a look at the Python Thread class constructor and see what we need to pass in:

```py
# Python Thread class Constructor
def __init__(self, group=None, target=None, name=None, args=(), kwargs=None, verbose=None):
```

It takes in five distinct parameters:

1. group: a special parameter which is reserved for future extension
1. target: the callable object to be invoked by the run method(), if None then nothing will be started...
1. name: Our threads name
1. args: argument tuple for target invocation. defaults to `()`
1. kwargs: dictionary keyword argument to invoke the base class constructor

The key one to notice is the `target` parameter. In order to start a simple thread we need to be able to pass it something to run. Let's create a simple function which we'll then use to create our first thread like so:

```py
import threading

# The simple function that will simply print hello world and 
# the thread that is executing this
def myTask():
    print("Hello World: {}".format(threading.current_thread()))

# We create our first thread and pass in our myTask function
# as its target
myFirstThread = threading.Thread(target=myTask)
# We start out thread
myFirstThread.start()
``` 

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:56.21%"><iframe src="https://www.youtube.com/embed/Ci1803KhtCM?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="641" height="360" frameborder="0" gesture="media" allowfullscreen></iframe></div>