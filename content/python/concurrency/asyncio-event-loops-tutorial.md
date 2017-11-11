+++
title = "Asyncio Event Loops Tutorial"
draft = true
date = "2017-10-28T11:50:27+01:00"
desc = "In this tutorial we look at the various ways you can define and work with event loops in Asyncio."
tags = ["python", "asyncio", "concurrency"]
series = [ "python" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

> This tutorial was built on top of Python 3.6.

## The Event Loop 

The main component of any asyncio based Python program has to be the underlying event loop. Within this event loop we can (from the official documentation): 

* register, execute and cancel calls
* Launch subprocesses and the associated transports for communication with an external program
* Delegate costly function calls to a pool of threads

Essentially all an event loop does is wait for events to happen before matching each event to a function that we have explicitly matched with said type of event.

A good example of this would be a simple web server, say we have an endpoint on our server that serves our website which features a multitude of different pages. Our event loop essentially listens for requests to be made and then matches each of these requests to its associated webpage. 

Each of the requests made to our web server in the above example would be considered a separate `event`. These events are then matched to a set function that we have predefined whenever a said event is triggered. 

## Getting Started

Let's take a quick look at 

~~~py
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
~~~