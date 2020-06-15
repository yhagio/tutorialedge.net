---
title: "The System Administrator's Python Cheat-sheet"
date: 2020-01-31T19:28:15Z
desc: The System Administrator's Python 3 Cheat-sheet filled with wonderful code snippets that help you automate running a fleet of servers.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: python
image: python.svg
tags:
- SysAdmin
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

For the majority of my development career I have been an application developer, and I thoroughly enjoyed writing applications and not worrying so much about the hardware and networking components upon which my applications sat. 

However, over the past year, I have been thrown into the deep end of a far lower level of software engineering than I was previously used to. I have been working on a fairly substantial project which has brought me down into the mirky depths of network rules and VM management. This typically meant moving away from building larger applications that clients directly interacted with and moving more towards writing scripts and deployment pipelines using Python.

# Iterating Over Files in a Directory

The first handy function is the `os.walk()` function which returns a generator object that you can iterate over using a `for` loop:

```py
import os

def main():
    for root, directories, files in os.walk("/")
        # print the root of the directory
        print(root)
        # print the directories within the root
        print(directories)
        # print the files within the root
        print(files)
```

Awesome, so this allows us traverse any directory we wish and get everything within those directories.

# Creating and Deleting Files

Creating and deleting files within the day-to-day life of a sysadmin is a fairly common task. Let's start by looking at how you can create and write to files using the `open()` function.

```py
import os

def main():
    with open("filename.txt") as file:
        file.write("My Certificate for my service")
```

Now, notice how we have achieved this using `with`. This `with` keyword in Python is incredibly useful in these scenarios as it allows you to ensure resources are **cleaned up** after you have finished executing the body of the `with` statement. This is hugely important as it prevents Python scripts from holding on to files well past when they were meant to. 

## Deleting Files

Deleting files can be achieved using either the `os.remove` function or the `os.unlink` function which takes in the path to the file as it's sole argument:  

```py
import os

def main():
    filepath = "/tmp/my-temp-file.txt"
    if os.path.isfile(filepath):
        os.remove(filepath)
    else:
        print("Error: %s file not found" % filepath)
```

> **Note** - It is generally considered best practice to first check and see if the file is indeed a file before attempting to delete it, hence why we have the `if` statement that calls `os.path.isfile(filepath)` surrounding our call to `os.remove()`

The second option if you need slightly more informed error handling when deleting these files is to wrap the call to `os.remove` within a `try/except` block and print out the error:

```py
import os

def main():
    filepath = "/tmp/my-temp-file.txt"
    try:
        os.remove(filepath)
    except OSError as error:
        print(error)
```

This second tactic can be very handy in situations where you are debugging why files are failing to be removed and can give you context around things like file ownership etc.

# Creating and Deleting Directories

Let's take a step back from files and look at how we can create and delete directories using the `os` package in Python.

For creating directories, this can be achieved using the `os.mkdir()` function which takes in the name of the directory you wish to create like so:

```py
import os

def main():
    print("Creating tmp directory...")
    os.mkdir("tmp")
```

## Deleting Directories

For deleting directories, we can leverage the `shutil` python package which is definitely worth taking a look at as there are a number of incredibly handy functions within that package which make a sysadmin's life a lot easier.

We can leverage the `shutil.rmtree` function which will delete an entire directory tree

```py
import shutil

def main():
    shutil.rmtree("/path/to/my/directory")
```

This will delete everything within `/path/to/my/directory` and the root folder. Nice and handy if you want to completely clean up a few things floating around!

> **Official Docs** - For more on the `shutil` package check out the official documentation here: [Python 3 Shutil](https://docs.python.org/3/library/shutil.html)

# Moving Files

Moving files about the place is yet another common task I find myself constantly performing time and time again. Once again, to solve this we can use the `shutil` package in order to make our lives that little bit easier:

```py
import shutil

def main():
    # move origin.file to destination.file
    shutil.move("/path/to/origin.file", "/path/to/destination.file")
```

Now, if you want to preserve some of the metadata for the file, then you can specify the `copy_function=copy2` 3rd argument within the `move()` function.

# Backing up Directories

Backups are hugely important. There will always be times when things go so wrong that you want to just start afresh and being able to deleting everything and restore from a backup directory always comes in handy.

```py
import shutil

def main():
    # backup our directory and attempt to preserve metadata on everything we
    # backup by specifying the copy_function
    shutil.copytree("/path/to/directory", "/path/to/backup", copy_function=copy2)
```

# Looking up IP Addresses

Moving away from the wonderful world of file manipulation, let's now have a look at a few network tests that I have found useful over the past year. 

We'll start off by looking up IP Addresses for hostnames using the `socket` package:

```py
import socket

def main():
    hostname = "tutorialedge.net"
    ip_addr = socket.gethostbyname(hostname)
    print(ip_addr)
```

This sample code will return the first `IP` address that gets returned.

# Testing Connectivity

The next network based code we will look at is testing connectivity to a port and IP address which can be very handy for debugging firewall rules which I have found to be an absolute pain in the ass, *but also necessary...*.

```py
import socket

def main():
    s = socket.socket()
    address = '127.0.0.1'
    port = 1313 
    try:
        s.connect((address, port))  
        print("Success")
    except Exception as e: 
        print("something's wrong with %s:%d. Exception is %s" % (address, port, e))
    finally:
        s.close()
```

I choose to try and connect to a **local instance** of this site running on **port 1313** when testing this, but you can change the IP to any IP you wish and the port to any port you wish and this will still work.

# Working with Environment Variables

Finally, let's take a look at environment variables. Some scripts need to be run against multiple environments with various different credentials for each environment and as such hard-coding these into your script can leave you with a fair few headaches depending on how complex the scripts are. Hard-coding also increases the chances of committing and publishing secrets to git repositories which I absolutely have never done before...

```py
import os

def main():
    password = os.getenv("PASSWORD")
    username = os.getenv("USERNAME")

    print(username)
    print(password)
```

# Conclusion

Hopefully this handy cheat sheet has been useful to you in your System Admin pursuits! If you have any ideas as to what else can be added to this list then please feel free to let me know in the comments section below!

<!-- ## Further Reading:

For a more in-depth look at some of the topics covered, please feel free to check out the other tutorials on this site:

* []() -->