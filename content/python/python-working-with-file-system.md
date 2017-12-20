+++
title = "Working With The File System in Python"
draft = true
date = "2017-12-20T18:41:30Z"
desc = "In this tutorial we evaluate the different ways you can work with the file system in Python"
draft = true
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

## Conclusion

If you found this tutorial useful or require further help then please feel free to let me know in the comments section below or message me [@Elliot_f](https://twitter.com/elliot_f).