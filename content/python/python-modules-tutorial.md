+++
date = "2017-08-28T18:42:27+01:00"
title = "Python Modules Tutorial"
draft = true
desc = "In this tutorial we'll be looking at Python modules. What they are and how we can create/import our own Python Modules."
tags = ["python"]
series = [ "python" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

> This tutorial was developed using Python version 3.6.

Larger Python projects require larger degrees of order and sub-dividing your project up into logical blocks can greatly improve the readability of your codebase. In Python we can do this sub-division using a concept using modules. 

Say for instance you have a program that bought and sold widgets on the stock market. This project does a number of things:

* It performs analysis of the widgets and returns recommendations as to whether to buy or sell these widgets
* It performs the buying and selling of said widgets
* It produces reports of the widgets it has bought and sold

In this scenario the code would be far too much for one file and as such breaking it up into multiple modules would make sense in this instance. We could have an `analysis` module, a `trader` module and a `reports` module.

Our Python project structure would then look something like this:

~~~python
widgettrader
- widgettrader/
- - analysis/
- - trader/
- - reports/
- - widgettrader.py
- setup.py
- requirements.txt
...
~~~

## Defining a Module

Defining a module is relatively simple in Python, we can define a module by simply creating a folder with the desired name of your module and then adding a `__init__.py` file to that directory. 

So to continue the above example we would create our three distinct folders and add `__init__.py` files to all of them like so:

~~~python
widgettrader
- widgettrader/
- - analysis/
- - - __init__.py
- - trader/
- - - __init__.py
- - reports/
- - - __init__.py
- - widgettrader.py
- setup.py
- requirements.txt
...
~~~

Within one of our module directory we would then define a python file in the same name as that directory. So for the analysis module we would define `analysis.py` in which our code would live.

## Importing a Created Module

Once we've defined a new module, we need to be able to import it into the various places that need to use it. To use our existing project we can use the `import` statement in our `widgettrader.py` file. 

If we wanted to define a function within one of these modules that is callable from anywhere that imports then we have to make sure we import it in our `__init__.py` file. Let's define a `Hello()` function in our `analysis` module's `analysis.py` file. 

~~~python
# analysis/analysis.py
def Hello():
    print("Hello World")
~~~

If we then tried to do something like this:

~~~python
# widgettrader.py
import analysis

analysis.Hello()
~~~

You'll notice that it fails complaining that the `module` has no no attribute 'Hello'. To fix this we have to go into `analysis/__init__.py` and add the following:

~~~python
# analysis/__init__.py
from analysis import Hello
~~~

When we next try to run our `widgettrader.py` program you should see that it successfully calls `analysis.Hello`.   

> Under Construction - This is a placeholder for an article that is currently under construction. The official documentation can be found here: [Python Module](https://docs.python.org/3/tutorial/modules.html)