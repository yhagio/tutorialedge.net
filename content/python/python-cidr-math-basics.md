---
title: "Python CIDR Math Basics"
date: 2020-03-18T10:39:47Z
draft: true
desc: 
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: 
image: 
tags:
- beginner
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

Python is well known for being the tool of choice for most System Administrators and a common task that most SysAdmins find themselves is calculating CIDR ranges. 

In this tutorial, we'll be looking at how you can perform a wide range of various CIDR calculations using the `netaddr` package in Python!

## Installation

Before we can get started with the `netaddr` python package, we'll have to install it using the `pip` command line tool like so:

```output
$ pip install netaddr
```

With this in place, we can start manipulating some CIDRs!

## Simple Examples

Let's start off with a really simple example. Imagine we had a really simple Yaml file which contained some information about authors:

<div class="filename"> authors.yml </div>

```yaml
---
books:
- name: Learning Concurrency in Python
  author: Elliot Forbes 
```

With this in the root of our project directory, let's create another file called `main.py` which will do the job of parsing this yaml file and reading the list of books and the author for each book.

On the first line, we'll need to import this `netaddr` package and then we can define a `main` function in which we'll 

<div class="filename"> main.py </div>

```py
import netaddr

def main():
    print("Hello World")
```

<div class="filename"> $ python main.py </div>

```output
Hello World
```

## Conclusion

Hopefully you found this tutorial useful! If you have any comments of feedback then I would love to hear them in the comments section below!

### Further Reading:

If you enjoyed this tutorial then you may also enjoy these other tutorials on the site:

* [SysAdmins CheatSheet in Python](/)