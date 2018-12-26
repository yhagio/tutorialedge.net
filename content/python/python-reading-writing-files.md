---
author: Elliot Forbes
date: 2017-09-10T08:59:29+01:00
desc: In this tutorial we'll be looking at how you can manipulate and read from files
  using the Python programming language.
series: python
image: python-logo.png
tags:
- beginner
title: Reading and Writing Files In Python
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 5
---

> This tutorial was written using Python 3.6

Being able to effectively work with the filesystem in any programming language is important as there will always be a need to do things such as import data from files or store data in local files. In this tutorial we'll be looking at how you can create files, write to these newly created and then subsequently delete these files once we are done.

# Creating Files

There are multiple ways to create files in Python, but arguably the cleanest way to do this is by using the `with` keyword like so:

## Context Manager Approach

```py
def main():
    with open('test.txt', 'w') as file:
        file.write("THIS IS A TEST FILE")

if __name__ == '__main__':
    main()
```

What this does is open a file named `test.txt` in a context manager and returns this new file object to us as `file`. Within the bounds of this context manager we then call `file.write("THIS IS A TEST FILE")` which subsequently writes `THIS IS A TEST FILE` to our newly created file. Upon exiting our `with` statement the program then handles closing the file for us and we don't have to worry about anything else.

## Without a Context Manager

However should you wish to do this in a manner that doesn't use a context manager then you can do something like so:

```py
file = open('test2.txt', 'w')
file.write("This is a second test")
file.close()
```

The above code creates a new file called `test2.txt`, it then appends `This is a second test` to that file before closing the file by calling `file.close()`. It's important to note that by going down this route we have to handle the closing of these files ourself. Forgetting to do this can lead to complications such as:

* It can impact the performance of your program.
* Some of the changes you make to files in Python may not actually be written to the file until after the call to `.close()` is made.
* If you are dealing with thousands of files then you may hit limits as to how many files can be open on your machine.

More importantly, it's considered bad practice.

# Writing to a File

In the previous two examples you'll notice that we called the `open()` function with `'w'` as our second parameter.

# Different Modes

When it comes to working with files in Python, it's important to bear in mind that there are different `modes` that you can open a file with. This allows you to have more fine-grained control when you are working with files.

| Mode | Description |
| ---- | ----------- | 
| r    | The `r` or `read` mode is used when you wish to **only** read from that particular file. |
| w    | The `w` or `write` mode is the mode you should use when you wish to **overwrite** the file with new information. |
| a    | The `a` or `append` mode is mode you should use when you wish to append information to a file. |
| r+   | The `r+` or `read-write` mode is used when you wish to do both reading and writing from a file. |

Ensuring you have used the correct mode when opening files can potentially save you quite a bit of debugging time. In the past I have found myself scratching my head wondering why the `w` mode is overwriting all of my file's content when I should indeed have used the `a` mode.


# Reading a File Line-by-Line

It's not an uncommon use-case to want to iterate over a file in a line-by-line fashion and process each line as it comes in. When you open a file you can actually use it as an iterator and iterate over it in the same manner that you would with normal [iterators in Python](/python/python-iterator-tutorial/). 

Let's take for example a text file called `test3.txt` that contains the following:

```py
Line 1 - THIS IS A TEST FILE
Line 2
Line 3 - OMG THIS WORKS
```

If we wished to iterate over this in a line-by-line fashion we could do something like so:

```py
with open('test.txt', 'r') as file:
    for line in file:
        print(line)
```

This would then print out the following when we ran this program:

```py
Line 1 - THIS IS A TEST FILE
Line 2
Line 3 - OMG THIS WORKS
```
