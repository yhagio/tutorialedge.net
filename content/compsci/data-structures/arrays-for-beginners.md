---
author: Elliot Forbes
date: 2017-12-20T22:03:08Z
desc:
  In This Tutorial we look at arrays, we look at how they work and what problems
  they can solve
series: compsci
tags:
- data-structures
title: Data Structures - Arrays for Beginners
image: logo.svg
twitter: https://twitter.com/Elliot_F
---

In this article we are going to be looking at the `array` data structure. We'll
be looking at some of the fundamental characteristics of the structure and how
we can best leverage this within our own programs.

## Intro

Arrays represent a collection of elements, these elements can be of different
types; `integers`, `characters`, `strings`, `floating-point values` and even
composite types such as `arrays` which allows you to create nested array
structures should you wish, or `objects` which are a group of elements all bundled together.

For example, say we wanted to store a list of names. We could use an array which would contain
all of the names we want like so:

```json
["Elliot", "Fraser"]
```

Or if we wanted to have an array of the months of the year then we could easily define our array
like so:

```json
["January", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
```

Arrays offer an incredible amount of flexibility to programmers as we can store any number of items we wish within
them and you'll find arrays in almost every programming language you work with.

## Access Elements in Arrays

In order for us to access any elements in an array we typically have to use
integers as our array's indices. For example if we wanted to access the first
element in an array we would typically use `my_array[0]`. This presumes the
language implements the array so that they start at `0` and not at `1`.

## Resizing Arrays

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

## Arrays Used In Other Data Structures

It should be noted that `arrays` can be used within other data structures. For
example, you can implement `binary trees` as well as `hash tables` using
`arrays`. I'll be covering exactly how this works in their respective tutorials.

## Conclusion

I hope you found this tutorial useful! If you did or you require further
assistance then please feel free to let me know in the comments section below or
by tweeting me: [@Elliot_F](https://twitter.com/elliot_f).
