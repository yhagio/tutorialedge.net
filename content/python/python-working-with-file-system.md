---
author: Elliot Forbes
date: 2017-12-20T18:41:30Z
desc: In this tutorial we evaluate the different ways you can work with the file system
  in Python
series: python
image: python-logo.png
tags:
- beginner
- filesystem
title: Working With The File System in Python
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 4
---

> This tutorial was written using Python 3.6

Being able to work with the file system and do things like traverse directories or retrieve every file can be very handy in a number of different situations. 

In this tutorial we'll be taking a look at the various ways you can work with the file system in Python. Hopefully this will give you a decent grasp of some of the cool things you can do very quickly and succinctly using the Python programming language. 

# Recursing Through Directories

In some situations you may need to recurse through directory after directory. This could be for any number of reasons. 

In this example let's look at how we can walk through a directory and retrieve the names of all the files:

```py
# This will walk through EVERY file in your computer
import os

# You can change the "/" to a directory of your choice
for file in os.walk("/"):
    print(file)
```

## Output

Let's see this in action in a directory that has 3 distinct files in it: `['test2.txt, 'test.txt', 'main.py']`

```py
>>> import os
>>> os.walk("./")
<generator object walk at 0x10457c7d8>
>>> for file in os.walk("./"):
...     print(file)
...
('./', [], ['test2.txt', 'test.txt', 'main.py'])
```

# Checking Whether File Or Directory?

Being able to discern whether something is a file or directory can come in handy. Let's look at how you can check whether something is either a file or directory in Python.

To do this we can use the `os.path.isfile()` function which returns `False` if it's a directory or `True` if it is indeed a file.

```py
>>> import os
>>> os.path.isfile("/")
False
>>> os.path.isfile("./main.py")
True
```

# Checking if a File or Directory Exists

If you wanted to check whether something exists on your current machine you can use the `os.path.exists()` function, passing in the file or directory you wish to check:

```py
>>> import os
>>> os.path.exists("./main.py")
True
>>> os.path.exists("./dud.py")
False
```

# Creating Directories in Python

Say you not only wanted to traverse directories but also wished to create your own. Well fear not, this is very possible using the `os.makedirs()` function.

```py
if not os.path.exists('my_dir'):
    os.makedirs('my_dir')
```

This will first go ahead and check to see if the directory `my_dir` exists, if it doesn't exist then it will go ahead and call the `os.makedirs('my_dir')` in order to create our new directory for us. 

It should be noted that this could potentially cause issues. If you were to create the directory after checking that the directory doesn't exist somewhere else, before your call to `os.makedirs('my_dir')` executes, you could see an `OSError` thrown. 

For the most part however you should be ok using the method mentioned above. If you want to be extra careful and catch any potential exceptions then you can wrap you call to `os.makedirs('my_dir')` in a `try...except` like so:

```py
if not os.path.exists('my_dir'):
    try:
        os.makedirs('my_dir')
    except OSError as e:
        if e.errno != errno.EEXIST:
            raise
``` 

# Conclusion

If you found this tutorial useful or require further help then please feel free to let me know in the comments section below or message me [@Elliot_f](https://twitter.com/elliot_f).