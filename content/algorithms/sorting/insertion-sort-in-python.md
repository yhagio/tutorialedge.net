+++
date = "2017-11-15T18:12:50Z"
title = "Implementing The Insertion Sort Algorithm in Python"
draft = true
desc = "In This Tutorial we look at how you can implement the Insertion Sorting Algorithm in Python"
tags = ["python", "algorithms"]
series = ["python"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

> This tutorial was built using Python 3.6

~~~py
# Insertion Sort In Python
# 
# Performance Complexity = O(n^2)
# Space Complexity = O(n)

def insertionSort(my_list):
    for index in range(1, len(my_list)):
        current = my_list[index]
        position = index

        while position > 0 and my_list[position-1] > current:
            print("Swapped {} for {}".format(my_list[position], my_list[position-1]))
            my_list[position] = my_list[position-1]
            print(my_list)
            position -= 1

        my_list[position] = current

    return my_list

my_list = [8,2,1,3,5,4]

print(insertionSort(my_list))      
~~~