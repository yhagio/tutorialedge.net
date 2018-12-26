---
author: Elliot Forbes
date: 2017-04-15T09:55:57+01:00
desc: Explore the python multithreading module and the power of asynchronous programming
series: python
image: python-logo.png
tags:
- concurrency
title: Python Multithreading Tutorial - Concurrent Programming
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

# What is Multithreading?

Modern computers tend to feature a CPU that has multiple processing cores, each of these cores can run many threads simultaneously which gives us the ability to perform several tasks concurrently. This tutorial will hopefully show you how to get started with Python's `threading` module.

**Objectives:**


1. Creating and Running Threads
2. Teaching the Limitations of Python's threading implementation

# Creating Threads in Python

<p>To begin with we are going to want to create a new file and call it worker.py, this will contain all our code for one of our threads. To begin with we are going to create a class in python and have it import and extend the threading module.</p>

```python
import threading

class Worker(threading.Thread):
    # Our workers constructor, note the super() method which is vital if we want this
    # to function properly
    def __init__(self):
        super(Worker, self).__init__()

    def run(self):
        for i in range(10):
           print(i)
```


<p>Now that we have our worker class we can start work on our main class. Create a new python file and call it main.py and put the following code in:</p>

```python
import threading 
from worker import Worker

def main():
    # This initializes ''thread1'' as an instance of our Worker Thread
   thread1 = Worker()
    # This is the code needed to run our newly created thread
    thread1.start()

  if __name__ == "__main__":  
      main()
```

<p>That''s all the code you need to successfully create and instantiate a thread in python. If you can run python through your command line then open up a new terminal at your current folder and type ''python main.py''. You should hopefully see the output of the above program should no errors occur.</p>

# Exercise:

<p>Try instantiating more threads by creating new Worker() objects and then start them:</p>

```python
    thread1 = Worker(1)
    thread2 = Worker(2)
    thread3 = Worker(3)
    thread1.start()
    thread2.start()
    thread3.start()
```

<p>When you run this you should see output that looks something like this:  Notice that the outputted numbers are out of order, this basically shows you the precise order in which the threads have completed their tasks in and shows you the true power of asynchronous programming, multiple threads performing in parallel.</p>

# Limitation with Classic Python Threads

One of the main problems with Python's classic implementation of threads is that they are not truly asynchronous. Performing tests on huge datasets show that the execution times of python threads is not entirely in parallel and you''ll often find execution times increasing adding multiple threads to programs as often performing these tasks synchronously will greatly reduce execution times. This is due to the way Global Interpreter Lock (GIL) works in Python, this basically ensures that only one line of python code can be compiled at one time. 

> More about the GIL can be found here: <a href="https://wiki.python.org/moin/GlobalInterpreterLock">https://wiki.python.org/moin/GlobalInterpreterLock</a>