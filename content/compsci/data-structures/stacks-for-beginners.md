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

I think the best way to imagine the stack data structure is to imagine a stack of pancakes. Typically, when you add a new pancake, it has to go on to the top of the existing pile. If you want to conversely eat a pancake from the stack, you have to pop the top one off and into your mouth. 

From this, we can see that when we are working with stacks, we have the ability to perform two main actions. We can:

* **Push** - add a new element to the top of the collection
* **Pop** - remove the top element from our collection

This makes it a somewhat interesting and quite easy *abstract data type* to implement as there isn't a whole lot to them. 

Some implementations may include the functionality to `peek` the top element of our stack, but it isn't absolutely necessary. This is akin to peeking at the top pancake in our pile and inspecting it.

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

> **Note -** - This is an incredibly basic, non-thread safe implementation of a `stack`. 

# Conclusion

Hopefully you found this tutorial useful. If you have any suggestions as to how this could be improved then I would love to hear them in the suggestions section down below.

> **Note -** If you want to keep track of when new articles are posted to the site, then please feel free to follow me on twitter for all the latest news: [@Elliot_F](https://twitter.com/elliot_f).