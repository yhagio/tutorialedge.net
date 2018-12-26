---
author: Elliot Forbes
date: 2017-12-01T21:32:19Z
desc: An absolute beginners introduction to writing face recognition software in Python
series: python
image: python-logo.png
tags:
- advanced
- c
title: Creating Basic Python C Extensions - Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> This tutorial was built using Python 3.6. The official documentation can be found here: [Extending and Embedding the Python Interpreter](https://docs.python.org/3/extending/index.html)

In this tutorial we are going to take a look at how you can create a really simple Python module using the `C` programming language. I felt this was a good topic to cover as I personally struggled with finding succinct documentation that worked and showed me the basics. 

# Why Are C Extensions Necessary?

Being able to write `C` extensions can come in handy in scenarios where the Python language becomes a bottleneck. Sometimes you require the raw performance of a low-level language like `C` in order to reduce things like response times and processing times.

# The Basic Requirements

In this tutorial we'll be building a very simple `C` based Python module that will feature a number of different functions that should hopefully give you enough to get started. 

We'll be creating 2 distinct functions:

* A `Hello World` function that simply performs a print.
* A Simple Fibonacci Function that takes in a value `n`.

# Getting Started

Let's dive into the `C` code. Open up the `.c` file that will contain your new module and add `#include <Python.h>` to the top. This will bring in the necessary `C` Python objects that will allow us to construct our module.

```c
#include <Python.h>

// Function 1: A simple 'hello world' function
static PyObject* helloworld(PyObject* self, PyObject* args) 
{   
    printf("Hello World\n");
    return Py_None;
}

// Our Module's Function Definition struct
// We require this `NULL` to signal the end of our method
// definition 
static PyMethodDef myMethods[] = {
    { "helloworld", helloworld, METH_NOARGS, "Prints Hello World" },
    { NULL, NULL, 0, NULL }
};

// Our Module Definition struct
static struct PyModuleDef myModule = {
    PyModuleDef_HEAD_INIT,
    "myModule",
    "Test Module",
    -1,
    myMethods
};

// Initializes our module using our above struct
PyMODINIT_FUNC PyInit_myModule(void)
{
    return PyModule_Create(&myModule);
}
```

# Our setup.py File

Thankfully Python includes some modules that make extending the language easier. Here we can specify the name of our module and pass in the necessay `.c` files that make up our module.

```py
from distutils.core import setup, Extension
setup(name = 'myModule', version = '1.0',  \
   ext_modules = [Extension('myModule', ['test.c'])])
```

# Building and Installing our Module

In order to `build` and `install` our newly created `C` module we have to do the following: 

```bash
python setup.py build
python setup.py install
```

When run in succession you should see the following output. We can then start our Python interpreter and call our newly created module:

```py
 $ python3.6 setup.py build
running build
running build_ext
building 'myModule' extension
/usr/bin/clang -fno-strict-aliasing -Wsign-compare -fno-common -dynamic -DNDEBUG -g -fwrapv -O3 -Wall -Wstrict-prototypes -arch i386 -arch x86_64 -g -I/Library/Frameworks/Python.framework/Versions/3.6/include/python3.6m -c test.c -o build/temp.macosx-10.6-intel-3.6/test.o
/usr/bin/clang -bundle -undefined dynamic_lookup -arch i386 -arch x86_64 -g build/temp.macosx-10.6-intel-3.6/test.o -o build/lib.macosx-10.6-intel-3.6/myModule.cpython-36m-darwin.so

 $ python3.6 setup.py install
running install
running build
running build_ext
running install_lib
copying build/lib.macosx-10.6-intel-3.6/myModule.cpython-36m-darwin.so -> /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages
running install_egg_info
Removing /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages/myModule-1.0-py3.6.egg-info
Writing /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages/myModule-1.0-py3.6.egg-info

 $ python3.6
Python 3.6.0 (v3.6.0:41df79263a11, Dec 22 2016, 17:23:13)
[GCC 4.2.1 (Apple Inc. build 5666) (dot 3)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import myModule
>>> myModule.helloworld()
Hello World
>>>
```

# Our Fibonacci Function

Let's now take a look at a more complex function that will take in a value `n` and then return the appropriate fibonacci number. We aren't going to do any fancy `memoization` here, it's going to be a plain old recursive function that features terrible performance. However it will show us how to both take in a value and return a value in our `C` module. 

```c
// Function 2: A C fibonacci implementation
// this is nothing special and looks exactly
// like a normal C version of fibonacci would look
int Cfib(int n)
{
    if (n < 2)
        return n;
    else
        return Cfib(n-1)+Cfib(n-2);
}
// Our Python binding to our C function
// This will take one and only one non-keyword argument
static PyObject* fib(PyObject* self, PyObject* args)
{
    // instantiate our `n` value
    int n;
    // if our `n` value 
    if(!PyArg_ParseTuple(args, "i", &n))
        return NULL;
    // return our computed fib number
    return Py_BuildValue("i", Cfib(n));
}
```

Again we should build and install this like we have done before. We can then test this out like so:

```py
>>> import myModule
>>> myModule.fib(2)
1
```

# Conclusion

Hopefully you found this tutorial useful and it clarifies the process of creating your own `C` based modules. If you feel like leaving some feedback or asking some further questions then please feel free to in the comments section below.