---
author: Elliot Forbes
date: 2017-11-19T10:18:54Z
desc: In this tutorial we will be looking at the absolute basics of unit testing in
  python using PyUnit
series: python
image: python-logo.png
tags:
- intermediate
- testing
title: Getting Started With PyUnit Testing
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 14
---

> This tutorial is currently under construction.

> This tutorial was built using Python 3.6

If you are starting to improve your Python development skills, the one aspect that must be up to scratch is your ability to test your code. Unit testing your code can help to improve the confidence you have whenever you are trying to make any patches, bug fixes or just changes in general. 

If your tests adequately test that your code behaves the way you expect it to, whenever you make a change, you can retest and ensure that your code still behaves the way you expect it with your incorporated changes. If the tests fail then you know that you will have to make further changes until your tests do pass.

In this tutorial I am going to be showing you the basics of unit testing in Python.

# Basic Tests

Let's envision that we have a very simple python module that features a `calc_x()` function. 

```py
# mymodule.py file
def calc_x(x):
    return x + 2
```

If we wanted to test this using the `unittest` module we could do something like so:

```py
# mymodule
import unittest
import mymodule

class MyModuleTest(unittest.TestCase):    

    def test_calc_x(self):
        assert(mymodule.calc_x(2) == 4)

if __name__ == '__main__':
    unittest.main()
```

# Output

When we run this using `python3.6 test_mymodule.py` you should see the following output:

```py
 $ python3.6 test_mymodule.py
.
----------------------------------------------------------------------
Ran 1 test in 0.000s

OK
```

# Conclusion

I hope you found this tutorial useful, if you wish to leave feedback or request more information then please let me know in the comments section below!