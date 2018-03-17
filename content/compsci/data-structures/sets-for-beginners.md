+++
title = "Data Structures - Sets For Beginners"
draft = true
date = "2017-12-20T22:22:37Z"
desc = "In This Tutorial we look at sets, we look at how they work and what problems they can solve"
tags = ["python", "compsci"]
series = ["compsci"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

> Under Construction

In this tutorial we are going to look at the `set` data structure in computer science and how you can leverage it within your applications. We'll be covering this concept using the Python programming language.

## Introduction

A `set` is a data structure that can store any number of `unique` values in any order you so wish. Set's are different from [arrays](/compsci/data-structures/arrays-for-beginners) in the sense that they only allow non-repeated, unique values within them.

```py
>>> an_array = [1,2,2,3,4] # repeated values
>>> a_set = set({1,2,3,4}) # non-repeated, unique values
>>> a_set
{1, 2, 3, 4}
```

## Adding Values to Sets

When you try to add values to a `set` in Python, it will only insert the value if that value does not already exist within the set:

```py
>>> my_set
{1, 2, 3, 4}
>>> my_set.add(1)
>>> my_set
{1, 2, 3, 4} # No Change to the set 
>>> my_set.add(5)
>>> my_set
{1, 2, 3, 4, 5} # 5 is added to the set
```

This means we can very easily use the `set` data-structure to parse all of the unique values from a list of any size:

```py
>>> my_list = [1,2,2,3,4,5,5,1,3,6,7]
>>> my_set = set(my_list)
>>> my_set
{1, 2, 3, 4, 5, 6, 7} # prints out only the unique values
```

## Conclusion

Hopefully you found this article on the `set` data structure useful! If you require further help then please feel free to let me know in the comments section below or by tweeting me: [@Elliot_f](https://twitter.com/elliot_f).
