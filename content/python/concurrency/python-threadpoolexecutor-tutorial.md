---
author: Elliot Forbes
date: 2017-10-01T13:36:48+01:00
desc: In this article take a look at how you can use the ThreadPoolExecutor in Python
  to speed up your programs.
series: python
image: python-logo.png
tags:
- concurrency
title: Python ThreadPoolExecutor Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> This tutorial has been taken and adapted from my book: [Learning Concurrency in Python](https://www.packtpub.com/application-development/learning-concurrency-python)

In this tutorial we'll be looking at Python's ThreadPoolExecutor. This was originally introduced into the language in version 3.2 and provides a simple high-level interface for asynchronously executing input/output bound tasks. 

# Why Use a ThreadPoolExecutor?

ThreadPoolExecutors provide a simple abstraction around spinning up multiple threads and using these threads to perform tasks in a concurrent fashion. Adding threading to your application can help to drastically improve the speed of your application when used in the right context. By using multiple threads we can speed up applications which face an input/output based bottleneck, a good example of this would be a web crawler. 

Web crawlers typically do a lot of heavy i/o based tasks such as fetching and parsing websites, if we were to fetch every page in a synchronous fashion you would find the main bottleneck for your program would be the fetching of these pages from the internet. By using something like a ThreadPoolExecutor we can effectively mitigate this bottleneck by doing multiple fetches concurrently and processing each page as it returns. 

# Creating a ThreadPoolExecutor

The first step we need to know is how we can define our own `ThreadPoolExecutor’s`. This is a rather simple one-liner which looks something like so:

```py
executor = ThreadPoolExecutor(max_workers=3) 
```

Here we instantiate an instance of our `ThreadPoolExecutor` and pass in the maximum number of workers that we want it to have. In this case we’ve defined it as 3 which essentially means this thread pool will only have 3 concurrent threads that can process any jobs that we submit to it. 

In order to give the threads within our `ThreadPoolExecutor` something to do we can call the submit() function which takes in a function as its primary parameter like so:

```py
executor.submit(myFunction())
```

# Example

In this example we put together both the creation of our `ThreadPoolExecutor` object and the submission of tasks to this newly instantiated object. We’ll have a very simple task function that will which will simply sum the numbers from 0 to 9 and then print out the result. Not the most cutting edge software I’m sure you’ll agree but it serves as a fairly adequate example.

Below our defined task function we have our standard main function. It’s within this that we define our executor object in a similar fashion to above before then submitting two tasks to this new pool of threads.

```py
from concurrent.futures import ThreadPoolExecutor
import threading
import random

def task():
    print("Executing our Task")
    result = 0
    i = 0
    for i in range(10):
        result = result + i
    print("I: {}".format(result))
    print("Task Executed {}".format(threading.current_thread()))

def main():
    executor = ThreadPoolExecutor(max_workers=3)
    task1 = executor.submit(task)
    task2 = executor.submit(task)

if __name__ == '__main__':
    main()
```

# Output

If we were to execute our Python program above then we should see the rather bland output of both our tasks being executed and the result of our computation being printed out on the command line. 

We then utilize the `threading.current_thread()` function in order to determine which thread has performed this task. You should see that the two values outputted are distinct daemon threads. 

```py
$ python3.6 05_threadPool.py
Executing our Task
I: 45
Executing our Task
I: 45
Task Executed <Thread(<concurrent.futures.thread.ThreadPoolExecutor object at 0x102abf358>_1, started daemon 123145333858304)>
Task Executed <Thread(<concurrent.futures.thread.ThreadPoolExecutor object at 0x102abf358>_0, started daemon 123145328603136)>
```

# Context Manager

The second and possibly most popular method of instantiating a ThreadPoolExecutor is using it as a context manager like so:

```py
with ThreadPoolExecutor(max_workers=3) as executor:
```

It does much the same job as the previous method we looked at but syntactically it looks better and can be advantageous to us as the developers in certain scenarios. 

Context managers, if you haven’t encountered them before are an incredibly powerful concept with Python that allow us to write more syntactically beautiful code. 

# Example

This time we’ll be defining a different task that takes in a variable ‘n’ as input just to give you a simple demonstration of how we can do this. The task function just prints out that it’s processing ‘n’ and nothing more.

Within our main function we utilize our ThreadPoolExecutor as a context manager and then call future = executor.submit(task, (n)) 3 times in order to give our threadpool something to do. 

```py
from concurrent.futures import ThreadPoolExecutor

def task(n):
 print("Processing {}".format(n))

def main():
 print("Starting ThreadPoolExecutor")
 with ThreadPoolExecutor(max_workers=3) as executor:
   future = executor.submit(task, (2))
   future = executor.submit(task, (3))
   future = executor.submit(task, (4))
 print("All tasks complete")
  
if __name__ == '__main__':
 main()
```

# Output

When we execute the above program you should see that it prints out that we are starting out ThreadPoolExecutor before going on to execute the three distinct tasks we submit to it and then finally printing out that all tasks are complete. 

```py
 $ python3.6 01_threadPoolExe.py
Starting ThreadPoolExecutor
Processing 2
Processing 3
Processing 4
All tasks complete
```

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/h2L3-X1XUtU?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="640" height="360" frameborder="0" gesture="media" allowfullscreen></iframe></div>

# Conclusion

I hope this tutorial demystified the art of working with ThreadPoolExecutor's in Python. If you want to learn more about how threads work in Python then I recommend checking out my appropriately named tutorial: [Threads in Python](/python/concurrency/threads-in-python/).

If you need any further assistance then please let me know by leaving a comment in the comments section below or by tweeting me: [@Elliot_F](https://twitter.com/elliot_f)! 