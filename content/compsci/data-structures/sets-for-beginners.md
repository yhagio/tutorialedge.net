---
author: Elliot Forbes
date: 2017-12-20T22:22:37Z
desc: In This Tutorial we look at sets, we look at how they work and what problems
  they can solve
series: compsci
tags:
- python
- compsci
title: Data Structures - Sets For Beginners
twitter: https://twitter.com/Elliot_F
---

> Under Construction

In this tutorial we are going to look at the `set` data structure in computer science and how you can leverage it within your applications. We'll be covering this concept using the Python programming language.

# Sets in Mathematics

Understanding Sets and basic Set Theory in Mathematics is a fundamental skill. The idea of a *Set* has been translated directly from mathematics into programming languages such as Python, and with this Set data structure, comes some incredibly useful functions such as `union()`, `issubset()`, `intersection()`, `isdisjoint()` that have also been translated directly over from Mathematics.

*Sets* aren't just a fundamental skill in Mathematics, throughout your programming career you will likely encounter a wide number of different problems that can be far more easily solved with the use of Sets. 

# Introduction

A `set` is a data structure that can store any number of `unique` values in any order you so wish. Set's are different from [arrays](/compsci/data-structures/arrays-for-beginners) in the sense that they only allow non-repeated, unique values within them.

Thankfully, programming languages tend to have the ability to convert the likes of an `array` into a `set` with minimal fuss. 

Let's take a look at an example of this in Python. We'll start off by defining `an_array` which will contain a number of repeated elements. 

We can then create a set using the `set()` function and pass in our `an_array`. This will automatically create a set of the unique values in our array for us. We can then view these unique values by printing out the contents of our set.

```py
>>> an_array = [1,2,2,3,3,4] # repeated values
>>> a_set = set(an_array) # non-repeated, unique values
>>> a_set
{1, 2, 3, 4}
```

This can also be used for strings:

```py
>>> my_string = "hello world, my name is elliot"
>>> char_set = set(my_string)
>>> char_set
{'r', ' ', 'a', 'i', 't', 'e', 'l', 'd', 'y', 'o', 's', 'n', 'm', 'h', ',', 'w'}
```

# Adding Values to Sets

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

# Conclusion

Hopefully you found this article on the `set` data structure useful! If you require further help then please feel free to let me know in the comments section below or by tweeting me: [@Elliot_f](https://twitter.com/elliot_f).
