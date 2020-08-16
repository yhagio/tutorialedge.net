---
author: Elliot Forbes
date: 2017-12-20T22:22:26Z
desc:
  In This Tutorial we look at priority queues, we look at how they work and what
  problems they can solve
series: compsci
image: logo.svg
tags:
- data-structures
title: Data Structures - Priority Queues For Beginners
twitter: https://twitter.com/Elliot_F
---

> This article uses Python 3.6 in order to demonstrate some of the concepts.

In this article we'll be covering `Priority Queues` and how they differ from
your standard `Queue` data structure.

## Why Do We Need Them?

In order to explain this better, let's think about a real-world example where a
normal queueing system may not be the best idea. Let's imagine you were
implementing a queuing system for a hospital's Accident and Emergency ward.


If you were to use a traditional queue for people coming into the ward then you
would see people with gunshot wounds or serious issues having to wait behind
people who may require nothing more than an x-ray and possibly a cast over a
minor break.

This queueing system would mean that people who had serious issues may end up
not getting the treatment they need in appropriate time. This is where
prioritization comes into play.

When someone comes into the ward, the nurses prioritize those who have serious
issues to the top of the queue so that they are seen first, they then prioritize
those with relatively minor ailments to the back of the queue as they can afford
to wait longer for treatment.

This same concept can be brought into our own data structures within our own
systems. You may for example be writing a queueing system for operating system
events, some events such as power loss or other critical issues would then be
prioritized higher than less serious issues, this is where priority queues
shine.

## Priority Queue Implementation

Let's have a look at how we could implement a very simple `Priority Queue` in
Python.

```py
from queue import PriorityQueue

priority_queue = PriorityQueue()

priority_queue.put((10,"Issue 1: Medium Priority"))
priority_queue.put((5,"Issue 2: Low Priority"))
priority_queue.put((25,"Issue 3: High Priority"))
priority_queue.put((50,"Issue 4: Very High Priority"))

while not priority_queue.empty():
    (priority, value) = priority_queue.get()
    print("{} Priority, {} Value".format(priority, value))
```

This would output the following when run:

```py
 $ python3.6 test.py
5 Priority, Issue 2: Low Priority Value
10 Priority, Issue 1: Medium Priority Value
25 Priority, Issue 3: High Priority Value
50 Priority, Issue 4: Very High Priority Value
```

## Conclusion

I hope you found this tutorial useful! If you did or require further assistance
then please do not hesitate to let me know in the comments section below or by
tweeting me [@Elliot_F](https://twitter.com/elliot_f).
