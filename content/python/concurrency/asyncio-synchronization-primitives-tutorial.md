---
author: Elliot Forbes
date: 2017-11-23T19:35:09Z
desc: In this tutorial we look at the various synchronization primitives available
  to you in your Asyncio based programs.
series: python
image: python-logo.png
tags:
- asyncio
- concurrency
title: Asyncio Synchronization Primitives Tutorial - Queues and Locks
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> This tutorial was built on top of Python 3.6

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:42.76%"><iframe src="https://www.youtube.com/embed/kMcwcJdIvHI?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="842" height="360" frameborder="0" gesture="media" allowfullscreen></iframe></div>

In this tutorial we'll be looking at the various synchronization primitives available to you in your Asyncio programming adventures. We'll be taking a brief look at why these synchronization primitives are important and also the various ways you can use them within a simple Asyncio based program.

# Why Are These Important?

When it comes to programming concurrent systems you have to try and ensure that your program is free from a little thing called a `Race Condition`. A `Race Condition` occurs when multiple concurrent workers try to modify a shared variable, array etc. concurrently and they start to produce erroneous results due to timing issues.

Because of these race conditions we have to utilize things known as synchronization primitives. When it comes to synchronization primitives within Asyncio we have a number to choose from. These are all based on the `threading` module equivalent and tend to have the same `API` with which we can work with them.

# Locks

The best analogy to describe how a lock works is to imagine there is a queue of people trying to access a bathroom. One person goes in and locks the door and in doing so prevents another person from coming in whilst they are doing their business. 

In computing terms when we lock something, we essentially prevent someone else coming in and messing with the locked resource whilst it's in use.

## A Simple Lock Example

In this example we are going to create a `asyncio.Lock()` instance and we are going to try to acquire this lock using `with await lock`. Once our worker has attained this lock we will then execute our critical section of code and then proceed to release the lock that we have just attained.

```py
import asyncio
import time

async def myWorker(lock):
    print("Attempting to attain lock")
    # acquire lock
    with await lock:
        # run critical section of code
        print("Currently Locked")
        time.sleep(2)
    # our worker releases lock at this poit
    print("Unlocked Critical Section")

async def main():
    # instantiate our lock
    lock = asyncio.Lock()
    # await the execution of 2 myWorker coroutines 
    # each with our same lock instance passed in 
    await asyncio.wait([myWorker(lock), myWorker(lock)])    

# Start up a simple loop and run our main function
# until it is complete
lock = asyncio.Lock()
loop = asyncio.get_event_loop()
loop.run_until_complete(main())
print("All Tasks Completed")
loop.close()
```

## Output

WHen we run this ywe should see that only one of our concurrently running workers is able to run at the one time.

```py
 $ python3.6 synchronization.py
Attempting to attain lock
Currently Locked
Unlocked Critical Section
Attempting to attain lock
Currently Locked
Unlocked Critical Section
All Tasks Completed
```

# Queues 

When it comes to communicating in a synchronized fashion then asyncio provides its own `queue` based implementation. We can push things onto our queue in a synchronized fashion with a producer and have consumers simultaneously poll this queue for anything pushed onto it.  

## Simple Implementation

In this example we are going to create a `newsProducer()` coroutine and a `newsConsumer()` coroutine. The `newsProducer()` coroutine will push new news items onto our synchronized queue, the `newsConsumer()` coroutine will attempt to retrieve any items that have been pushed onto said queue and then print whenever it does get something. 

```py
import asyncio
import random
import time

async def newsProducer(myQueue):
    while True:
        await asyncio.sleep(1)
        print("Putting news item onto queue")
        await myQueue.put(random.randint(1,5))

async def newsConsumer(id, myQueue):
    print(myQueue)
    while True:
        print("Consumer: {} Attempting to get from queue".format(id))
        item = await myQueue.get()
        if item is None:
            # the producer emits None to indicate that it is done
            break
        print("Consumer: {} consumed article with id: {}".format(id, item))


loop = asyncio.get_event_loop()        
myQueue = asyncio.Queue(loop=loop, maxsize=10)
try:
    loop.run_until_complete(asyncio.gather(newsProducer(myQueue), newsConsumer(1, myQueue), newsConsumer(2, myQueue)))
except KeyboardInterrupt:
    pass
finally:
    loop.close()
```

## Output

When we then try to run this you should see that our producer pushes items onto our queue and then our consumers compete with one another in order to get anything put onto the queue. 

```py
 $ python3.6 asyncio-queues.py
<Queue maxsize=10>
Consumer: 1 Attempting to get from queue
<Queue maxsize=10 _getters[1]>
Consumer: 2 Attempting to get from queue
Putting news item onto queue
Consumer: 1 consumed article with id: 5
Consumer: 1 Attempting to get from queue
Putting news item onto queue
Consumer: 2 consumed article with id: 3
Consumer: 2 Attempting to get from queue
Putting news item onto queue
Consumer: 1 consumed article with id: 4
Consumer: 1 Attempting to get from queue
Putting news item onto queue
```

# Conclusion

If you found this tutorial useful or require further assistance then please let me know in the comments section below!