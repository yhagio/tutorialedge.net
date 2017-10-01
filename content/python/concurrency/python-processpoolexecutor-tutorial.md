+++
date = "2017-10-01T13:52:59+01:00"
title = "Python ProcessPoolExecutor Tutorial"
draft = true
tags = ["python", "concurrency"]
series = [ "python" ]
desc = "In this article take a look at how you can use the ProcessPoolExecutor in Python to speed up your programs."
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

> This tutorial has been taken and adapted from my book: [Learning Concurrency in Python](https://www.packtpub.com/application-development/learning-concurrency-python)

`ProcessPoolExecutors` can be used and created in much the same way as your standard [ThreadPoolExecutors](/python/concurrency/python-threadpoolexecutor-tutorial/). It subclasses the Executor class the same way the `ThreadPoolExecutor` class does and thus features many of the same methods within it. 

## Creating a ProcessPoolExecutor

The process for creating a `ProcessPoolExecutor` is almost identical to that of the `ThreadPoolExecutor` except for the fact that we have to specify we’ve imported that class from the concurrent.futures module and that we also instantiate our executor object like so:
 
~~~py
Executor = ProcessPoolExecutor(max_workers=3)
~~~

## Example

The below example features a very simple full example of how you can instantiate your own `ProcessPoolExecutor` and submit a couple of tasks into this pool. It should be noted that our task function here isn’t that computationally expensive so we may not see the full benefit of using multiple processes and it could in fact be significantly slower than your typical single-threaded process.

We’ll use the `os` module to find the current `PID` of each of the tasks that we execute within our pool.  

~~~py
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
~~~

## Output

When we run this you should see that both our submitted tasks are executed as well as the Process IDs in which they were executed. This is a very simple example but it’s good at verifying that we are indeed running our tasks across multiple processes.

~~~py
 $ python3.6 06_processPool.py
Executing our Task on Process 40365
Executing our Task on Process 40366
~~~
