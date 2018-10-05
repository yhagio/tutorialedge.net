---
author: Elliot Forbes
date: 2017-11-15T18:10:37Z
desc: In This Tutorial we look at how you can implement the Bubble Sorting Algorithm
  in Python
series:
- compsci
tags:
- python
- compsci
title: Implementing The Bubble Sort in Python
twitter: https://twitter.com/Elliot_F
---

> This tutorial was built on top of Python 3.6

In this tutorial we are going to be taking a quick look at the bubble sort sorting algorithm. This algorithm is another very well known sorting algorithm that is quite often referenced in technical interviews. It is amongst the worst performing sorting algorithm with an average and a worst case sorting complexity of `O(N^2)`.

# How It Works

Bubble sort works by constantly iterating through an unsorted array and swapping values within that array until such times as no swaps are made within a full pass through the array.

# Implementing in Python

Now that we have an appreciation for how the algorithm works, let's now take a look at how you would go about implementing this in the Python programming language.

```py
# Bubble Sort In Python
# 
# Performance Complexity = O(n^2)
# Space Complexity = O(n)

def bubbleSort(my_list):
    swapped = True
    while swapped:
        swapped = False
        for i in range(len(my_list)-1):
            if my_list[i] > my_list[i+1]:
                my_list[i], my_list[i+1] = my_list[i+1], my_list[i]
                print("Swapped: {} with {}".format(my_list[i], my_list[i+1]))
                swapped = True
    return my_list

my_list = [8,2,1,3,5,4]

print(bubbleSort(my_list))
```

# Output

```py
 $ python3.6 bubbleSort.py
Swapped: 2 with 8
Swapped: 1 with 8
Swapped: 3 with 8
Swapped: 5 with 8
Swapped: 4 with 8
Swapped: 1 with 2
Swapped: 4 with 5
[1, 2, 3, 4, 5, 8]
```

# Conclusion

If you found this tutorial useful or require further help then please feel free to let me know in the comments section below!