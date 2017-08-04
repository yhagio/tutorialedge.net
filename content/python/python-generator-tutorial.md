+++
title = "Python Generators Tutorial"
draft = true
date = "2017-06-12T15:26:02+01:00"
desc = "In this tutorial we look at what generators are within Python and how we can use them"
tags = ["python"]
series = [ "python" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

In this tutorial I'm aiming to help demystify this concept of generators within the Python programming language. We'll look at what generators are and how we can utilize them within our python programs.

## What Are Generators?

Generators are functions that can return multiple values at different times. These essentially act as iterators that we can subsequently iterate over in a variety of different ways. In Python we would typically define a normal function like so:

~~~python
def my_func(x):
    return x*2
~~~

However this function would return once and only once the value of `x` doubled. However with generators we could return multiple values of `x` at different times like so:

~~~python
def my_generator(x):
    yield x*2
    yield x*4
    yield x*8
~~~

## Complete Code Snippet

In this code example we'll be defining a generator function which will yield `x*2`, `x*4` and then `x*8` respectively. 

~~~python

def my_generator(x):
    yield x*2
    yield x*4
    yield x*8

mygen = my_generator(2)

print(next(mygen))
print(next(mygen))
print(next(mygen))
~~~

#### Output

The above code should then print out the following in the console:

~~~bash
$ python3.6 generators.py
4
8
16
~~~

## StopIteration Error

The StopIteration error is raised when a call to next() is made and there are no subsequent values to be yielded from our generator function. If we added a 4th call to `print(next(mygen))` in the previous sample then you should see an error like so print out:

~~~bash
 $ python3.6 generators.py
4
8
16
Traceback (most recent call last):
  File "generators.py", line 12, in <module>
    print(next(mygen))
StopIteration
FAIL
~~~

## Infinite Generator

We can implement an iterator that continues to yield values indefinitely by doing something like so:

~~~python
def my_generator(x):
    x = 2
    while True:
        yield x*2
        x = x*2
        
mygen = my_generator(2)

print(next(mygen))
print(next(mygen))
print(next(mygen))
print(next(mygen))
~~~

## Output

We can then call the next() function as many times as we'd desire and we would then obtain an output that looks like so:

~~~bash
 $ python3.6 generators.py
4
8
16
32
~~~

> It's important to note that the physical limitations still apply and I'm sure you'd start to hit some form of limit for the above program if you called next() indefinitely.