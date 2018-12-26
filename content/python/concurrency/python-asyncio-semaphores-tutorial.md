---
author: Elliot Forbes
date: 2017-11-24T13:39:00Z
desc: In this tutorial we look at semaphores and bounded semaphores and how we can
  utilize them within our Python programs
series: python
image: python-logo.png
tags:
- asyncio
- concurrency
title: Asyncio Semaphores and Bounded Semaphores Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> This tutorial was built on top of Python 3.6.

In this tutorial we'll be looking at `semaphores` and `bounded-semaphores` and how they work within the Asyncio framework. 

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:56.3%"><iframe src="https://www.youtube.com/embed/uvM-JYnz1Mw?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="639" height="360" frameborder="0" gesture="media" allowfullscreen></iframe></div>

# What Are Semaphores?

Semaphores were originally a key part of railway system architecture and it was the famous Dijkstra that translated this real-world concept into our computing world. 

These semaphores have an internal counter that is incremented and decremented whenever either an `acquire` or a `release` call is made. 

Say we protected a block of code with a semaphore, and set the semaphore's initial value to 2. If one worker acquired the semaphore, the value of our semaphore would be decremented to 1, if a second worker comes along the semaphore's value would be decremented to 0. 

At this point if another worker comes along and tries again it would be denied. The value of these semaphores is that they allow us to protect resources from being overused.

# Implementation

Now that we have a basic understanding of what semaphores are let us now look at how we can work with them in our Asyncio based Python programs.

In this example we will create a simple instance of a semaphore and then create 3 worker functions that will try to acquire said semaphore. The initial value of this semaphore will be 2 and as such we will see 2 of our worker functions successfully acquire the semaphore before then releasing it and allowing our third worker to then acquire it.

```py
import asyncio
import time 

async def myWorker(semaphore):
    await semaphore.acquire()
    print("Successfully acquired the semaphore")
    await asyncio.sleep(3) 
    print("Releasing Semaphore")
    semaphore.release()

async def main(loop):
    mySemaphore = asyncio.Semaphore(value=2)
    await asyncio.wait([myWorker(mySemaphore), myWorker(mySemaphore), myWorker(mySemaphore)])
    print("Main Coroutine")

loop = asyncio.get_event_loop()
loop.run_until_complete(main(loop))
print("All Workers Completed")
loop.close()
```

## Output

When we run this we should see that our first 2 workers are able to acquire the semaphore before then releasing it and allowing our third worker to then go on and acquire it for itself.

```py
 $ python3.6 test.py
Successfully acquired the semaphore
Successfully acquired the semaphore
Releasing Semaphore
Releasing Semaphore
Successfully acquired the semaphore
Releasing Semaphore
Main Coroutine
All Workers Completed
```

# Bounded Semaphores

There lies a very subtle difference between a normal `semaphore` and a `bounded-semaphore`. A bounded semaphore only differs in terms of not allowing more releases to be made than acquires. If it does exceed the value then a `ValueError` is raised.

# Conclusion

If you found this tutorial useful or require further assistance then please let me know in the comments section below.