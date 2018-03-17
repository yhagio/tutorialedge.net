+++
draft = true
date = "2017-12-20T22:02:47Z"
title = "Data Structures - Queues For Beginners"
desc = "In This Tutorial we look at Queues, we look at how they work and what problems they can solve"
tags = ["python", "compsci"]
series = ["compsci"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

> Under Construction

In this tutorial we are going to look at the `queue` data structure. We'll take a look at how this data structure can be used for various tasks and the various sort of things you can do with queues.

## Introduction

The `queue` data structure is typically used in scenarios where you want things to be processed in the same order that they were inputted into a system.

For example, imagine you had a system that dealt with user registrations to your site. You could enqueue any new requests from users to register to your site into a `queue`. Worker threads within your application would then monitor this `queue` and process new registrations as they come in.

```py
>>> import queue
>>> my_q = queue.Queue()
>>> my_q.put('first')
>>> my_q.put('second')
>>> my_q.put('third')
>>> my_q.get()
'first'
>>> my_q.get()
'second'
>>> my_q.get()
'third'
``` 

## Conclusion

Hopefully you found this article on the `queue` data structure useful! If you require further help then please feel free to let me know in the comments section below or by tweeting me: [@Elliot_f](https://twitter.com/elliot_f).
