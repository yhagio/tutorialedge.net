---
author: Elliot Forbes
date: 2017-11-11T13:06:32Z
desc: In this tutorial we look at the various ways you can define and work with tasks
  in Asyncio.
series: python
image: python-logo.png
tags:
- asyncio
- concurrency
title: Asyncio Tasks Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> This tutorial was built on top of Python 3.6

In this tutorial we'll be looking at Tasks in Asyncio. We'll be building on top of my previous tutorial on [Asyncio Event Loops](/python/concurrency/asyncio-event-loops-tutorial/).

# Tasks

Tasks within Asyncio are responsible for the execution of coroutines within an event loop. These tasks can only run in one event loop at one time and in order to achieve parallel execution you would have to run multiple event loops over multiple threads. 

I like to think of tasks within asyncio in a similar regard to how we’d think of tasks when used in conjunction with executors or pools like we’ve demonstrated in previous chapters. 

In this section we’ll look at some of the key functions that we can use in order to work with tasks within our asyncio based programs.

# A Simple Example

One of the key things to note about tasks in Asyncio is that you don't directly create them, you instead use the `ensure_future()` function or the `AbstractEventLoop.create_task()` method. Let's take a quick look at how we can use a task generator function in order to generate 5 distinct tasks for our event loop to process.

```py
import asyncio
import time

async def myTask():
    time.sleep(1)
    print("Processing Task")

async def myTaskGenerator():
    for i in range(5):
        asyncio.ensure_future(myTask())

loop = asyncio.get_event_loop()
loop.run_until_complete(myTaskGenerator())
print("Completed All Tasks")
loop.close()
```

Upon running this you should see the following output in the console:

```py
 $ python3.6 test.py
Processing Task
Processing Task
Processing Task
Processing Task
Processing Task
Completed All Tasks
```

Let's now take a look at how we can retrieve all of our tasks using the `all_tasks()` method. 

## The all_tasks(loop=None) method

Being able to ascertain what tasks are currently pending can be important for systems in production needing to be able to anticipate things such as workload etc. The `all_tasks()` method gives us some incite as to what tasks are currently in a pending state before they are executed by our event loop. 

```py
import asyncio
import time

async def myTask():
    time.sleep(1)
    print("Processing Task")

async def main():
    for i in range(5):
        asyncio.ensure_future(myTask())
    pending = asyncio.Task.all_tasks()
    print(pending)

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
print("Completed All Tasks")
loop.close()
```

Running this should yield the following results. A set of 5 distinct tasks is printed our and you can see that they are all in a `pending` state.

```py
 $ python3.6 test.py
{<Task pending coro=<myTask() running at test.py:4>>, <Task pending coro=<myTask() running at test.py:4>>, <Task pending coro=<main() running at test.py:12> cb=[_run_until_complete_cb() at /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/asyncio/base_events.py:176]>, <Task pending coro=<myTask() running at test.py:4>>, <Task pending coro=<myTask() running at test.py:4>>, <Task pending coro=<myTask() running at test.py:4>>}
Processing Task
Processing Task
Processing Task
Processing Task
Processing Task
Completed All Tasks
```

## The cancel() function

Being able to effectively cancel pending tasks can be useful in scenarios where you are rate limiting the number of tasks being executed, or if you are trying to perform a graceful shutdown of your application. Thankfully the asyncio API provides the necessary functionality for this to be done relatively easily.

```py
import asyncio
import time

async def myTask():
    time.sleep(1)
    print("Processing Task")
    
    for task in asyncio.Task.all_tasks():
        print(task)
        task.cancel()
        print(task)

async def main():
    for i in range(5):
        asyncio.ensure_future(myTask())
  
loop = asyncio.get_event_loop()
loop.run_until_complete(main())
print("Completed All Tasks")
loop.close()
```

This should then print out the following in the console. Note that all tasks apart from the `main()` task go from `pending` to `cancelling` once we've called `task.cancel()`.

```py
 $ python3.6 test.py
Processing Task
<Task pending coro=<myTask() running at test.py:4>>
<Task cancelling coro=<myTask() running at test.py:4>>
<Task pending coro=<myTask() running at test.py:4>>
<Task cancelling coro=<myTask() running at test.py:4>>
<Task finished coro=<main() done, defined at test.py:13> result=None>
<Task finished coro=<main() done, defined at test.py:13> result=None>
<Task pending coro=<myTask() running at test.py:4>>
<Task cancelling coro=<myTask() running at test.py:4>>
<Task pending coro=<myTask() running at test.py:9>>
<Task cancelling coro=<myTask() running at test.py:11>>
<Task pending coro=<myTask() running at test.py:4>>
<Task cancelling coro=<myTask() running at test.py:4>>
Completed All Tasks
```

# Task Functions

So we've looks at how we can interact with individual tasks but let's now take a step back and look at how we can interact with them as a collective. 

## The as_completed() function

```py
import asyncio

async def myWorker(number):
    return number * 2

async def main(coros):
    for fs in asyncio.as_completed(coros):
        print(await fs)

coros = [myWorker(1) for i in range(5)]

try:
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main(coros))
except KeyboardInterrupt:
    pass
finally:
    loop.close()
```

## The gather() function

The `gather()` function returns one single future that aggregates all of the results from the given coroutines or futures passed into it. You should note that the results aren't returned in the order they were submitted so if you care about order then you'll have to implement some admin functionality to reorder results.

```py
import asyncio

async def myWorker():
    print("Hello World")

async def main():
    print("My Main")

try:
    loop = asyncio.get_event_loop()
    loop.run_until_complete(asyncio.gather(*[myWorker() for i in range(5)]))
except KeyboardInterrupt:
    pass
finally:
    loop.close()
```

## The wait() function

The `wait()` function simply blocks until the Future instances passed into it complete, upon completion this will then returned a named 2-tuple of sets. The first set contains futures that have completed, the second gives the uncompleted futures. This can be useful in scenarios where you have to process a task within a given time, say you were making a number of REST API calls or pulling messages from a queue on a broker, if they failed to complete within the given `timeout` you could possibly try to process them in a different way. 

```py
import asyncio

async def myWorker():
    print("Hello World")

async def main():
    print("My Main")

try:
    loop = asyncio.get_event_loop()
    loop.run_until_complete(asyncio.wait([myWorker() for i in range(5)], timeout=2))
except KeyboardInterrupt:
    pass
finally:
    loop.close()
```

# Conclusion

I hope you found this tutorial useful, if you require further assistance then please feel free to let me know in the comments section below!