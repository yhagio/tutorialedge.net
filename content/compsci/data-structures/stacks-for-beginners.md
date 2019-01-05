---
author: Elliot Forbes
date: 2017-12-20T21:29:51Z
desc: In This Tutorial we look at Stacks, we look at how they work and what problems
  they can solve
series: compsci
tags:
- python
- compsci
title: Data Structures - Stacks For Beginners
twitter: https://twitter.com/Elliot_F
---

> Under Construction

In this tutorial, we are going to be taking a look at stacks in Computer Science and how they can be used to effectively solve problems that we may face as software developers.

# Stacks - The Theory

When working with stacks, we have the ability to perform two main actions. We can:

* **Push** - add a new element to the top of the collection
* **Pop** - remove the top element from our collection

This makes it a somewhat interesting and quite easy *abstract data type* to implement as there isn't a whole lot to them.

# A Simple Array Based Example

Let's consider how we would implement this in Python. We'll need to store a collection of elements, so an `array` makes sense to base our implementation off of. 

```py
class Stack:
    """a simple implementation of the stack data structure"""
    def __init__(self, e):
        print("Initialized Stack")
        self.elements = []
        self.elements = e 

    def push(self, element):
        self.elements.append(element)

    def pop(self):
        return self.elements.pop(-1)
```

If we walk this through, our `push` function takes in an element and appends it to the end of our `elements` array. In our `pop` function, we simply return the last element of our `elements` array.

> **Note -** - This is an incredibly basic, non-thread safe implementation of a `stack`. If you wanted to make it thread-safe, you would have to use locks around your `append` and `pop` calls to ensure these are done in a thread-safe manner.

# Conclusion

Hopefully you found this tutorial useful. If you have any suggestions as to how this could be improved then I would love to hear them in the suggestions section down below.

