+++
date = "2017-08-08T18:55:48+01:00"
title = "Python Decorators Tutorial"
desc = "In this tutorial we learn what Python Decorators are and how we can create our own"
draft = true
tags = ["python", "decorators"]
series = [ "python" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

> This Tutorial was written using Python 3.6

## Video Tutorial

<div style="position:relative;height:0;padding-bottom:56.3%"><iframe src="https://www.youtube.com/embed/4adQVHuIfnw?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="639" height="360" frameborder="0" gesture="media" allowfullscreen></iframe></div>

## Getting Started

Decorators are a pretty cool concept that allow you to decorate functions and classes with a decorator and a new, transformed function or class will be returned. If you are coming from a Java background then you may have used decorators a lot in frameworks such as Spring and Jersey.

If you come from a pure Python background then you may have seen decorators feature in frameworks such as flask. In flask you would typically define a function and then decorate it with things such as `@app.route("/my-endpoint")` in order to specify that this is the function that will be executed whenever the `/my-endpoint` is called from your app.

Let's take a look at a real life example. In the below code we define a very simple Flask based program. This program features only one function `def hello():`, right above this function declaration you should see `@app.route("/")` which is an example of an `decorator`.     

~~~python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"
~~~

If we were to run this program then you would see a very simple service start up at `http://localhost:5000` and whenever you navigated to that page in the browser you would would see that our `hello()` function is called and `Hello World!` is printed in our browser.

## First Class Citizens

So how do we write our own decorators? We'll it turns out it's suprisingly simple. In Python functions and classes are considered first class citizens. This essentially means that they can be treated much the same as you would treat variables or objects within your python applications. We can do cool things like pass one function as an argument into another function like so:

~~~python
def myFunction():
    print("Hello")

def anotherFunction(function):
    print(function)

anotherFunction(myFunction)
~~~

When you run this python program you should see the following output:

~~~bash
 $ python3.6 decorators.py
<function myFunction at 0x100562e18>
~~~

Instead of printing out hello, it prints out that the `myFunction()` that we passed into `anotherFunction()` is of type `function` as well as it's name and it's address in memory. 

## A Simple Decorator

Due to the fact functions are a first class citizen in python, we can also manipulate them in much the same way that we would manipulate variables. Let's define a very simple decorator that will return a new function and wrap it in two print statements. This decorator will be called `mutate()`. 

~~~python
def mutate(method):
    def newmethod(*args, **kwargs):
        print("Executing Method")
        method(*args, **kwargs)
        print("Finished Executing Method")
    return newmethod

@mutate
def myFunction():
    print("Hello")

myFunction()
~~~

when we execute this you should see the following output:

~~~bash
 $ python3.6 decorators.py
Executing Method
Hello
Finished Executing Method
~~~

Our call to `myFunction()` has successfully triggered our mutate decorator, which has modified our original function and returned a new function which contains our desired print statements.

## Taking it further

This is just a simple example of how you can write your own python decorators, if you found this tutorial useful or require further assistance then please let me know in the comments section below.

## Losing Traceability

When we utilize decorators in the above fashion you may notice an unintended side-affect where the function has been renamed to that of the decorator.

~~~py
>>> repr(myFunction)
'<function mutate.<locals>.newmethod at 0x1022b8e18>'
~~~

If we decorate hundreds of functions with this `@mutate` decorator then you may find that your programs become slightly harder to debug as tools that are specifically designed for introspection will throw back incorrect function names like the above example.

#### The Solution

In order to fix this particular side-effect we can look to the `functools` module which is built-in to Python. We add `from functools import *` to the top of our file and within our decorator we add a second `@wraps()` decorator which takes in the original function as it's parameter. If we update our example code above to include this fix, it should then look like this:

~~~py
from functools import *

def mutate(method):
    @wraps(method)
    def newmethod(*args, **kwargs):
        print("Executing Method")
        method(*args, **kwargs)
        print("Finished Executing Method")
    return newmethod

@mutate
def myFunction():
    print("Hello")

myFunction()
~~~

And when we again call `repr` on our function you'll see it outputs the correct name:

~~~py
>>> from main import *
Executing Method
Hello
Finished Executing Method
>>> repr(myFunction)
'<function myFunction at 0x1022d3e18>'
~~~