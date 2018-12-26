---
author: Elliot Forbes
date: 2017-11-04T15:20:50Z
desc: In this article we cover everything you need to get up and running with Python
  and Asyncio
series: python
image: python-logo.png
tags:
- concurrency
title: Getting Started with Asyncio in Python
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:56.3%"><iframe src="https://www.youtube.com/embed/L3RyxVOLjz8?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="639" height="360" frameborder="0" gesture="media" allowfullscreen></iframe></div>

> This tutorial was written on top of Python 3.6. This is taken from my book ["Learning Concurrency in Python"](https://www.packtpub.com/application-development/learning-concurrency-python) if you wish to read up more on the library.

Asyncio became part of the Python ecosystem in version 3.4 and has since then become the basis for a huge number of Python libraries and frameworks due to it's impressive speed and ease of use. Asyncio allows you to easily write single-threaded concurrent programs that utilize something called coroutines, these coroutines are like a stripped down threads and don't come with the same inherit performance issues that your full-fat threads would typically come with. 

Asyncio also does a very good job of abstracting away from us the complexities of things such as multiplexing I/O access over sockets and it also simplifies our jobs by providing an arsenal of synchronization primitives that enable us to make our programs thread-safe. 

# Getting Started

In order to get started with asyncio we require one crucial component, that is an event loop. All asyncio based systems require an event loop, this is the crux of our programs performance. The event loop schedules our `asyncio.coroutines` and handles all of the heavy lifting. 

We can define an event loop that will simply execute on coroutine like so:

```py
import asyncio

async def myCoroutine():
    print("Simple Event Loop Example")

def main():
    # Define an instance of an event loop
    loop = asyncio.get_event_loop()
    # Tell this event loop to run until all the tasks assigned
    # to it are complete. In this example just the execution of
    # our myCoroutine() coroutine.
    loop.run_until_complete(myCoroutine())
    # Tidying up our loop by calling close()
    loop.close()

if __name__ == '__main__':
    main()
```

When you run this you should see that our `myCoroutine()` successfully executes. Now at this point you must be asking, this doesn't give us anything but extra code, what's the fuss all about? Well for this example it doesn't provide much benefit, however in more complex scenarios, that's when we really see the true performance benefits.

> I would recommend checking out my tutorial on [Creating a REST API in aiohttp and Python](/python/create-rest-api-python-aiohttp/). This provides a more complex example and is a good example as to how performant asyncio can be.

# Coroutines

So these `coroutines` are essentially lightweight versions of your more traditional threads. By using these we essentially enable ourselves to write asynchronous programs that are very similar to threads but they run on top of a single thread. We can define `coroutines` in 2 distinct ways. 

```py
import asyncio

async def myFunc1():
    print("Coroutine 1")

@asyncio.coroutine
def myFunc2()
    print("Coroutine 2")
```

The first method was introduced in Python 3.5 and I would tend to push you towards using this method over the latter. 

# Futures

Futures in asyncio are very much similar to the `Future` objects you would see within Python `ThreadPoolExecutors` or `ProcessPoolExecutors` and tt follows an almost identical implementation. Future objects are created with the intention that they will eventually be given a result some time in the future, hence the name. This is beneficial as it means that within your Python program you can go off and perform other tasks whilst you are waiting for your `Future` to return a result. 

Thankfully working with Futures in asyncio is relatively easy thanks to the `ensure_future()` method which takes in a `coroutine` and returns the `Future` version of that `coroutine`. 

```py
import asyncio

# Define a coroutine that takes in a future
async def myCoroutine(future):
    # simulate some 'work'
    await asyncio.sleep(1)
    # set the result of our future object
    future.set_result("My Coroutine-turned-future has completed")

async def main():
    # define a future object
    future = asyncio.Future()
    # wait for the completion of our coroutine that we've
    # turned into a future object using the ensure_future() function
    await asyncio.ensure_future(myCoroutine(future))
    # Print the result of our future
    print(future.result())

# Spin up a quick and simple event loop 
# and run until completed
loop = asyncio.get_event_loop()
try:
    loop.run_until_complete(main())
finally:
    loop.close()
```

If you were to run this you should see that our program successfully turns our `coroutine` into a `future` object and prints out the result. 

# Multiple Coroutines

Let's now try to take advantage of asyncio's ability to run multiple coroutines concurrently. This will hopefully give you some idea as to how powerful `asyncio` is and how you can use it to effectively create incredibly performant Python programs running on a single-thread. 

Let's start by creating a simple coroutine that takes in an `id` as its primary parameter. This will generate a random integer called `process_length` and wait for that length of time. It will then print out it's `id` and how long it awaited for. 

Next within our `main()` method we will generate 10 tasks that and then await these tasks completion using the `await asyncio.gather()` function, passing in our list of `tasks`. Finally we'll utilize the same event loop from the previous example in order to run our `asyncio` program.

```py
import asyncio
import random

async def myCoroutine(id):
    process_time = random.randint(1,5)
    await asyncio.sleep(process_time)
    print("Coroutine: {}, has successfully completed after {} seconds".format(id, process_time))

async def main():
    tasks = []
    for i in range(10):
        tasks.append(asyncio.ensure_future(myCoroutine(i)))

    await asyncio.gather(*tasks)


loop = asyncio.get_event_loop()
try:
    loop.run_until_complete(main())
finally:
    loop.close()
```  

When you run this you should see something like so:

```py
 $ python3.6 getting-started-asyncio.py
Coroutine: 4, has successfully completed after 1 seconds
Coroutine: 7, has successfully completed after 2 seconds
Coroutine: 8, has successfully completed after 2 seconds
Coroutine: 0, has successfully completed after 3 seconds
Coroutine: 1, has successfully completed after 3 seconds
Coroutine: 2, has successfully completed after 4 seconds
Coroutine: 6, has successfully completed after 4 seconds
Coroutine: 3, has successfully completed after 5 seconds
Coroutine: 5, has successfully completed after 5 seconds
Coroutine: 9, has successfully completed after 5 seconds
```

Our coroutines go off and execute concurrently and finish execution at different times. It's important to note that these are not completed in the same order as they were submitted and if you were to time the execution of the above program, it would take just above 5 seconds to complete execution.


# Conclusion

This was just a very quick and simple introduction to the `asyncio` framework. We'll be covering this framework in more detail in future tutorials.   
