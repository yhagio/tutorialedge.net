+++
date = "2017-11-15T18:10:37Z"
title = "Implementing The Bubble Sort in Python"
draft = true
desc = "In This Tutorial we look at how you can implement the Bubble Sorting Algorithm in Python"
tags = ["python", "algorithms"]
series = ["python"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

> This tutorial was built on top of Python 3.6

~~~py
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
~~~