---
author: Elliot Forbes
date: 2017-12-20T19:22:48Z
desc: In this tutorial we will look at how we can work with lists in Python
series: python

tags:

title: Working with Lists in Python - Tutorial
twitter: https://twitter.com/Elliot_F
weight: 3
---

> This tutorial was built in Python 3.6

> Under Construction

# Reversing a List

This quick and easy technique shows how you can access all the elements of a list in reverse order.

```py
>>> my_list = [1,2,3,4,5]
>>> my_list[::-1]
[5, 4, 3, 2, 1]
```

We can then treat our reversed list as an `iterator` and iterate through every element within this reversed list like so:

```py
>>> for el in my_list[::-1]:
...     print(el)
...
5
4
3
2
1
```

# Conclusion

If you found this tutorial useful or require further assistance then please let me know in the comments section below or by tweeting me: [@Elliot_F](https://twitter.com/elliot_f).