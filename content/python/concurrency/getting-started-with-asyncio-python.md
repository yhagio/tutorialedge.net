+++
date = "2017-11-04T15:20:50Z"
title = "Getting Started with Asyncio in Python"
draft = true
tags = ["python", "concurrency"]
series = [ "python" ]
desc = "In this article we cover everything you need to get up and running with Python and Async.io"
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

> This tutorial was written on top of Python 3.6. This is taken from my book "Learning Concurrency in Python" if you wish to read up more on the library.

Asyncio became part of the Python ecosystem in version 3.4 and has since then become the basis for a huge number of Python libraries and frameworks due to it's impressive speed and ease of use. Asyncio allows you to easily write single-threaded concurrent programs that utilize something called coroutines, these coroutines are like a stripped down threads and don't come with the same inherit performance issues that your full-fat threads would typically come with. 

Asyncio also does a very good job of abstracting away from us the complexities of things such as multiplexing I/O access over sockets and it also simplifies our jobs by providing an arsenal of synchronization primitives that enable us to make our programs thread-safe. 

## Getting Started

In order to get started with asyncio we require one crucial component, that is an event loop. All asyncio based systems require an event loop, this is the crux of our programs performance. The event loop schedules our `asyncio.coroutines` and handles all of the heavy lifting. 

We can define an event loop that will simply execute on coroutine like so:

~~~py
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
~~~

When you run this you should see that our `myCoroutine()` successfully executes. Now at this point you must be asking, this doesn't give us anything but extra code, what's the fuss all about? Well for this example it doesn't provide much benefit, however in more complex scenarios, that's when we really see the true performance benefits.

> I would recommend checking out my tutorial on Creating a REST API in aiohttp and Python. This provides a more complex example and is a good example as to how performant asyncio can be.

## Coroutines

So these `coroutines` are essentially lightweight versions of your more traditional threads. By using these we essentially enable ourselves to write asynchronous programs that are very similar to threads but they run on top of a single thread. We can define `coroutines` in 2 distinct ways. 

~~~py
import asyncio

async def myFunc1():
    print("Coroutine 1")

@asyncio.coroutine
def myFunc2()
    print("Coroutine 2")
~~~

The first method was introduced in Python 3.5 and I would tend to push you towards using this method over the latter. 

## Conclusion

This was just a very quick and simple introduction to the `asyncio` framework. We'll be covering this framework in more detail in future tutorials.   