---
author: Elliot Forbes
date: 2017-08-28T18:42:27+01:00
desc: In this tutorial we'll be looking at Python modules. What they are and how we
  can create/import our own Python Modules.
series: python
image: python-logo.png
tags:
- beginner
title: Python Modules Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 8
---

> This tutorial was developed using Python version 3.6.

Larger Python projects require larger degrees of order and sub-dividing your project up into logical blocks can greatly improve the readability of your codebase. In Python we can do this sub-division using a concept using modules. 

Say for instance you have a program that bought and sold widgets on the stock market. This project does a number of things:

* It performs analysis of the widgets and returns recommendations as to whether to buy or sell these widgets
* It performs the buying and selling of said widgets
* It produces reports of the widgets it has bought and sold

In this scenario the code would be far too much for one file and as such breaking it up into multiple modules would make sense in this instance. We could have an `analysis` module, a `trader` module and a `reports` module.

Our Python project structure would then look something like this:

```python
widgettrader
- widgettrader/
- - analysis/
- - trader/
- - reports/
- - widgettrader.py
- setup.py
- requirements.txt
...
```

# What is a Module in Python

Before we go on to creating our own Python Modules, it's important to know exactly what a `module` is in Python.

> A module can be defined as a file containing Python definitions and statements. The file name is the module name with the suffix `.py` appended.

# Defining a Simple Module

We'll start off by defining a very simple module that will exist in a `.py` file within the same directory as our `main.py` script that we'll be writing.

```bash
directory
- main.py
- testmodule.py
```

Within this `testmodule.py` file we'll define a very simple function `test()` that will simply print `Hey, I'm a test!` like so:

```py
# testmodule.py
def test():
    print("Hey, I'm a test!")
```

Within our `main.py` file we can then import this `testmodule` as a module and use our newly defined `test()` method like so:

```py
# main.py
import testmodule

def main():
    testmodule.test()

if __name__ == '__main__':
    main()
```

That is all we need to define a very simple python module within our Python programs. 

# Defining a Module Within a Sub-Directory

In order to define a module that exists within a sub-directory in Python we need to follow a number of steps, in this example we'll be creating a module named `analysis`:

* Create the `analysis/` directory
* Within the `analysis/` directory add a new `__init__.py` file.
* Create a new `analysis.py` file within the same `analysis` directory

Once we have done this we would then define all of our `analysis` module's code within the `analysis.py` file. 

```py
# analysis/analysis.py
def my_analysis_func():
    print("Executing Analysis")
```

We could then chose to either import this module directly in our `main.py` file like so:

```py
# main.py
import analysis.analysis

analysis.analysis.my_analysis_func()
```

Notice that when we call import we have to specify `analysis.analysis`. This is because our `analysis.py` file lives within the `analysis/` sub-directory. If we wanted to truncate this to just `import analysis` we could add the following line to our `analysis/__init__.py` file:

```py
# analysis/__init__.py
from analysis.analysis import my_analysis_func
```

Our `main.py` code would then look like the following:

```py
# main.py
import analysis

analysis.my_analysis_func()
```

Which, I'm sure you'll agree is more succinct and cleaner to read overall. 

## Difference Between a Python Module and a Python Package

It has to be noted that there is a difference between a `Python module` and a `Python package`. The key thing to remember is that a `package` is a module that contains multiple modules. Whilst a normal `Python module` may be a single file or multiple files that are imported under one import.

* A good example of a Python module would be our the `analysis` module that we defined in the previous section of this tutorial. 
* A good example of a Python package would be the `xml` package. This include multiple sub modules such as the `xml.etree` module and an even deeper `xml.etree.ElementTree` module.  

# Relative Path Imports

Importing modules using their full path can be an arduous task and thankfully Python offers us the ability to import modules from using relative paths. If we continue our `analysis` module example from above, we could modify the `analysis/__init__.py` file to use relative imports like so:

```python
# This would import the module which was 
from .analysis import my_analysis_func
```

This would mean that it would try and resolve the module from the relative path of the `__init__.py` file instead of having to specify the absolute path of the module like `analysis.analysis` as we had before. 

