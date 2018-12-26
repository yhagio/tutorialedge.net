---
author: Elliot Forbes
date: 2017-10-01T13:52:59+01:00
desc: In this article take a look at how you can use the ProcessPoolExecutor in Python
  to speed up your programs.
series: python
image: python-logo.png
tags:
- concurrency
title: Python ProcessPoolExecutor Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> This tutorial has been taken and adapted from my book: [Learning Concurrency in Python](https://www.packtpub.com/application-development/learning-concurrency-python)

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:56.3%"><iframe src="https://www.youtube.com/embed/J7w_G6ZKzz4?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="639" height="360" frameborder="0" gesture="media" allowfullscreen></iframe></div>

# Introduction

In this tutorial we will be looking at how you can utilize multiple processors within your Python Programs. 

# Multiprocessing vs Multithreading

Knowing when and where to use multiple threads vs multiple processes is incredibly important if you are going to be working on highly performant Python programs. Misuse of either threads or processes could lead to your systems actually seeing performance degradation. 

THere are typically 2 types of performance bottleneck for most programs, this is either an I/O bottleneck or a CPU-based bottleneck. 

If your program spends more time waiting on file reads or network requests or any type of `I/O` task, then it is an `I/O` bottleneck and you should be looking at using threads to speed it up. 

If your program spends more time in CPU based tasks over large datasets then it is a `CPU` bottleneck. In this scenario you *may* be better off using multiple processes in order to speed up your program. I say *may* as it's possible that a single-threaded Python program may be faster for CPU bound problems, it can depend on unknown factors such as the size of the problem set and so on.  

# Getting Started 

Let's take a look at `ProcessPoolExecutors`. `ProcessPoolExecutors` can be used and created in much the same way as your standard [ThreadPoolExecutors](/python/concurrency/python-threadpoolexecutor-tutorial/). It subclasses the Executor class the same way the `ThreadPoolExecutor` class does and thus features many of the same methods within it. 

# Creating a ProcessPoolExecutor

The process for creating a `ProcessPoolExecutor` is almost identical to that of the `ThreadPoolExecutor` except for the fact that we have to specify we’ve imported that class from the concurrent.futures module and that we also instantiate our executor object like so:
 
```py
Executor = ProcessPoolExecutor(max_workers=3)
```

# Example

The below example features a very simple full example of how you can instantiate your own `ProcessPoolExecutor` and submit a couple of tasks into this pool. It should be noted that our task function here isn’t that computationally expensive so we may not see the full benefit of using multiple processes and it could in fact be significantly slower than your typical single-threaded process.

We’ll use the `os` module to find the current `PID` of each of the tasks that we execute within our pool.  

```py
from concurrent.futures import ProcessPoolExecutor
import os

def task():
    print("Executing our Task on Process {}".format(os.getpid()))

def main():
    executor = ProcessPoolExecutor(max_workers=3)
    task1 = executor.submit(task)
    task2 = executor.submit(task)

if __name__ == '__main__':
    main()
```

# Output

When we run this you should see that both our submitted tasks are executed as well as the Process IDs in which they were executed. This is a very simple example but it’s good at verifying that we are indeed running our tasks across multiple processes.

```py
 $ python3.6 06_processPool.py
Executing our Task on Process 40365
Executing our Task on Process 40366
```

# Context Manager

It should be noted that you can also write this in a more succinct fashion

```py
from concurrent.futures import ProcessPoolExecutor
import os

def task():
    print("Executing our Task on Process: {}".format(os.getpid()))

def main():
#    executor = ProcessPoolExecutor(max_workers=3)
    with ProcessPoolExecutor(max_workers=3) as executor:
        task1 = executor.submit(task)
        task2 = executor.submit(task)

main()
```

# Output

When you run this you should see exactly the same output as before:

```py
 $ python3.6 test.py
Executing our Task on Process: 56335
Executing our Task on Process: 56336
```

# Conclusion

If you found this tutorial useful or require further assistance then please do not hesitate to let me know in the comments section below!