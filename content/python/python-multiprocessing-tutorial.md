---
author: Elliot Forbes
date: 2017-04-15T09:28:06+01:00
desc: We take a look at how you can side-step the Global Interpreter Lock by using
  sub-processes instead of threads and effectively achieve both local and remote concurrency
  in your Python programs.
series:
- python
tags:
- python
- concurrency
title: Python Multiprocessing Tutorial
twitter: https://twitter.com/Elliot_F
---

<p>Previously we've looked at how you can try to achieve concurrency with Python using multithreading, the tutorial of which can be found here: <a href="/python/python-multithreading-tutorial/">Python Multithreading Tutorial</a></p>

<p>Now we are going to be having a look at how we can sidestep the limiting Global Interpreter Lock that effectively prevented our multithreaded applications from being truly concurrent by using the multiprocessing Python module. </p>

# A Simple Example:

<p>In this example I'll be showing you how to spawn multiple processes at once and each process will output the random number that they will compute using the random module.</p>

```python
from multiprocessing import Process, Queue
import random

def rand_num():
    num = random.random()
    print(num)
    
if __name__ == "__main__":
    queue = Queue()
    
    processes = [Process(target=rand_num, args=()) for x in range(4)]
    
    for p in processes:
        p.start()
        
    for p in processes:
        p.join()
```

<p>Running this should then print out an array of 4 different decimal numbers between 0 and 1 like so:</p>

```bash
Elliots-MacBook-Pro:Networking elliotforbes$ python processing.py
0.090906474002
0.306163229303
0.995446921388
0.0320995066016
```

# Passing Data Between Processes

<p>When performing concurrent programming the best practice is usually to avoid sharing state as much as possible. However when you absolutely need to have some form of shared data then the multiprocessing module provides a couple of ways of doing so. </p>

<p><strong>Queues:</strong></p>

<p>Queue objects are a FIFO data structure that are thread and process safe which make them perfect for passing data between different processes without potentially corrupting data. Using them is relatively simple, we can expand:</p>

```python
from multiprocessing import Process, Queue
import random

def rand_num(queue):
    num = random.random()
    queue.put(num)
    
if __name__ == "__main__":
    queue = Queue()
    
    processes = [Process(target=rand_num, args=(queue,)) for x in range(4)]
    
    for p in processes:
        p.start()
        
    for p in processes:
        p.join()
    
    results = [queue.get() for p in processes]

    print(results)
```

<p>This should output the following:</p>

```bash
Elliots-MacBook-Pro:Networking elliotforbes$ python processing.py
[0.6756465745753756, 0.4104274331895341, 0.6733748532075048, 0.9494118991646461]
```

# Conclusion

<p>Overall Python's MultiProcessing module is brilliant for those of you wishing to sidestep the limitations of the Global Interpreter Lock that hampers the performance of the multi-threading in python. I hope this has been helpful, if you feel anything else needs added to this tutorial then let me know in the comments section below!</p>
