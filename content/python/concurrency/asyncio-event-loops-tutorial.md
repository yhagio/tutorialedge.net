---
author: Elliot Forbes
date: 2017-10-28T11:50:27+01:00
desc: In this tutorial we look at the various ways you can define and work with event
  loops in Asyncio.
series: python
image: python-logo.png
tags:
- asyncio
- concurrency
title: Asyncio Event Loops Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> This tutorial was built on top of Python 3.6.

In this tutorial we are going to be covering Asyncio's event loop. Some of the material for this tutorial was taken from my book: [Learning Concurrency in Python](https://www.packtpub.com/application-development/learning-concurrency-python).  

# Video

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/xWt5lpn8fN8?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="640" height="360" frameborder="0" gesture="media" allowfullscreen></iframe></div>

# The Event Loop 

The main component of any asyncio based Python program has to be the underlying event loop. Within this event loop we can (from the official documentation): 

* register, execute and cancel calls
* Launch subprocesses and the associated transports for communication with an external program
* Delegate costly function calls to a pool of threads

Essentially all an event loop does is wait for events to happen before matching each event to a function that we have explicitly matched with said type of event.

A good example of this would be a simple web server, say we have an endpoint on our server that serves our website which features a multitude of different pages. Our event loop essentially listens for requests to be made and then matches each of these requests to its associated webpage. 

Each of the requests made to our web server in the above example would be considered a separate `event`. These events are then matched to a set function that we have predefined whenever a said event is triggered. 

# Getting Started

Let's take a quick look at how you can define a very simple event loop. In order to instantiate an event loop we'll use `asyncio.get_event_loop()`, we'll then start a `try... finally` and within the body of our `try` we'll specify that we want our newly instantiated event loop to run until it has completed our `myCoroutine()` function.

```py
import asyncio

# Define a coroutine that takes in a future
async def myCoroutine():
    print("My Coroutine")

# Spin up a quick and simple event loop 
# and run until completed
loop = asyncio.get_event_loop()
try:
    loop.run_until_complete(myCoroutine())
finally:
    loop.close()
```

# Running Options

We have a number of options for running our event loops, we can either call `run_forever()` which will subsequently run our event loop until the `stop()` function is called, or we can call `run_until_complete(future)` and only run our event loop until whatever `future` object we've passed in has completed it's execution.

## The run_until_complete() method

Let's take a quick look at the `run_until_complete()` function. In this example we'll define our `myWork()` coroutine which we will then pass into our `run_until_complete` function and subsequently we should see our event loop run until this `myWork()` coroutine is finished it's execution.

```py
import asyncio
import time

async def myWork():
    print("Starting Work")
    time.sleep(5)
    print("Finishing Work")

loop = asyncio.get_event_loop()
try:
    loop.run_until_complete(myWork())
finally:
    loop.close()
```

Upon running this you should then see the following output:

```py
 $ python3.6 test.py
Starting Work
Finishing Work
```

## The run_forever() method

The alternative way of starting up your event loop is to call the `run_forever()` method which will subsequently start your asyncio based event loop and have it run indefinitely until the program comes to an end or the `stop()` method is called. It should be noted that calling this causes our main thread to block indefinitely. 

Let's take a look at a quick example which showcases the use of this method. We'll first define our `work()` coroutine which will feature a while loop that will run indefinitely and simply print out `Task Executed` in 1 second intervals. 

```py
import asyncio

async def work():
    while True:
        await asyncio.sleep(1)
        print("Task Executed")

loop = asyncio.get_event_loop()
try:
    asyncio.ensure_future(work())
    loop.run_forever()
except KeyboardInterrupt:
    pass
finally:
    print("Closing Loop")
    loop.close()
``` 

# Running Multiple coroutines:

If you wanted to run multiple coroutines indefinitely in parallel then you can do that by creating your `x` number of coroutines and have them run a while loop each. You would then call `asyncio.ensure_future(function())` in order to enqueue them onto the loop and they would run indefinitely after that point.

```py
import asyncio
import time

async def firstWorker():
    while True:
        await asyncio.sleep(1)
        print("First Worker Executed")
        
async def secondWorker():
    while True:
        await asyncio.sleep(1)
        print("Second Worker Executed")


loop = asyncio.get_event_loop()
try:
    asyncio.ensure_future(firstWorker())
    asyncio.ensure_future(secondWorker())
    loop.run_forever()
except KeyboardInterrupt:
    pass
finally:
    print("Closing Loop")
    loop.close()
```

This should output the following indefinitely:

```py
 $ python3.6 run-forever.py
First Worker Executed
Second Worker Executed
First Worker Executed
Second Worker Executed
First Worker Executed
Second Worker Executed
```

# Conclusion

If you found this tutorial useful or you require more assistance then please feel free to leave a comment in the comments section below!



