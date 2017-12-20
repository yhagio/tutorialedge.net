+++
title = "Working With The File System in Python"
draft = true
date = "2017-12-20T18:41:30Z"
desc = "In this tutorial we evaluate the different ways you can work with the file system in Python"
tags = ["python", "filesystem"]
series = [ "python" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

> This tutorial was written using Python 3.6

In this tutorial we'll be taking a look at the various ways you can work with the file system in Python. 

## Recursing Through Directories

In some situations you may need to recurse through directory after directory. This could be for any number of reasons. 

In this example let's look at how we can walk through a directory and retrieve the names of all the files:

~~~py
# This will walk through EVERY file in your computer
import os

# You can change the "/" to a directory of your choice
for file in os.walk("/"):
    print(file)
~~~

#### Output

Let's see this in action in a directory that has 3 distinct files in it: `['test2.txt, 'test.txt', 'main.py']`

~~~py
>>> import os
>>> os.walk("./")
<generator object walk at 0x10457c7d8>
>>> for file in os.walk("./"):
...     print(file)
...
('./', [], ['test2.txt', 'test.txt', 'main.py'])
~~~

# Checking Whether File Or Directory?

Being able to discern whether something is a file or directory can come in handy. Let's look at how you can check whether something is either a file or directory in Python.

To do this we can use the `os.path.isfile()` function which returns `False` if it's a directory or `True` if it is indeed a file.

~~~py
>>> os.path.isfile("/")
False
>>> os.path.isfile("./main.py")
True
~~~

## Conclusion

If you found this tutorial useful or require further help then please feel free to let me know in the comments section below or message me [@Elliot_f](https://twitter.com/elliot_f).