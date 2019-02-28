---
author: Elliot Forbes
date: 2017-12-20T22:03:08Z
desc:
  In This Tutorial we look at arrays, we look at how they work and what problems
  they can solve
series: compsci
tags:
  - python
  - compsci
title: Data Structures - Arrays for Beginners
twitter: https://twitter.com/Elliot_F
---

> Under Construction

In this article we are going to be looking at the `array` data structure. We'll
be looking at some of the fundamental characteristics of the structure and how
we can best leverage this within our own programs.

# Intro

Arrays represent a collection of elements, these elements can be of different
types; `integers`, `characters`, `strings`, `floating-point values` and even
composite types such as `arrays` which allows you to create nested array
structures should you wish.

# Instantiation

In many programming languages you are required to set the size of your array at
the time of its instantiation.

```c
// in C if we wanted an array with 10 elements
// we could instantiation it like this:
int array[10];
```

# Access Elements in Arrays

In order for us to access any elements in an array we typically have to use
integers as our array's indices. For example if we wanted to access the first
element in an array we would typically use `my_array[0]`. This presumes the
language implements the array so that they start at `0` and not at `1`.

# Resizing Arrays

In most languages arrays are of a fixed length, if you try to insert more
elements into an array than there are allocated spaces then you will typically
be hit with an exception.

In these scenarios you will typically have to go through the following
procedure:

1. Create a new array with double the size
1. Copy all of the elements of the old array over to the new array
1. Delete the old array

As you can imagine this is a rather expensive task for larger arrays and can
adversely impact the performance of your systems.

> Note: In some languages there exist implementations that will automatically
> handle array resizing.

# Arrays Used In Other Data Structures

It should be noted that `arrays` can be used within other data structures. For
example, you can implement `binary trees` as well as `hash tables` using
`arrays`. I'll be covering exactly how this works in their respective tutorials.

# Conclusion

I hope you found this tutorial useful! If you did or you require further
assistance then please feel free to let me know in the comments section below or
by tweeting me: [@Elliot_F](https://twitter.com/elliot_f).
