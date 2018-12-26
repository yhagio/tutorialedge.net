---
author: Elliot Forbes
date: 2017-12-20T19:22:48Z
desc: In this tutorial we will look at how we can work with lists in Python
series: python
image: python-logo.png
tags:
- beginner
title: Working with Lists in Python - Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 3
---

> This tutorial was built in Python 3.6

# A Simple List

{{< terminal 0 python >}}my_list = [1, 2, 3, 4]
print(my_list)
{{< /terminal >}}




# Reversing a List

This quick and easy technique shows how you can access all the elements of a list in reverse order.

```py
>>> my_list = [1,2,3,4,5]
>>> my_list[::-1]
[5, 4, 3, 2, 1]
```

## Try it Out

{{< terminal 1 python >}}my_list = [1, 2, 3, 4]
print(my_list[::-1])
{{< /terminal >}}

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