---
author: Elliot Forbes
date: 2017-11-20T18:09:47Z
desc: In This Tutorial we look at how you can implement the Selection Sorting Algorithm
  in Python
series: compsci
tags:
- python
- compsci
title: Implementing Selection Sort in Python
twitter: https://twitter.com/Elliot_F
---

Welcome all! In this tutorial, we are going to be looking at how you can implement the selection sort in Python! 

# Theory

How does the selection sorting algorithm work? Well it sorts data by finding the smallest item and swapping it into the array in the first unsorted location.

* It enumerates the array from the first unsorted element to the end
* Identifies the smallest item
* Swaps the smallest item with the first unsorted item

The selection sorting algorithm typically performs better than the bubble sort and typically worse than the insertion sorting algorithm.

# Implementation

Let's take a look at how we would implement this. We'll start by defining a `selection_sort` function which will take in an array. 

```py
def selection_sort(arr):
  print(arr)
```

We can then set up a for loop which will iterate over all of the elements in our array. Our `position` will represent the location of the first unsorted element in our array. 

We can then set our minimum_item to our current position:

```py
def selection_sort(arr):
  for position in range(len(arr)):
    # set our min_item to 0
    min_item = position
```

Once we have done this, we'll want to iterate through the rest of our array and find the smallest item in our unsorted array. If we find an element that is smaller, we'll want to swap it to the first unsorted element in our array:

```py

def selection_sort(arr): 
  # iterate through all of the elements in
  # our passed in arr 
  # 
  # position will represent the location of the
  # first unsorted element in our array going forward
  for position in range(len(arr)):
    # set our min_item to 0
    min_item = position
    # iterate through the rest of our array
    for i in range(position+1, len(arr)):
      # if an element in the rest of our array
      # is smaller than the current min_item
      if arr[i] < arr[min_item]:
        # set that to our new min_item
        min_item = i

    # swap the minimum item to the first unsorted element in
    # our array.
    arr[position], arr[min_item] = arr[min_item], arr[position]
  
  # return our sorted array
  return arr
  
my_array = [5, 3, 9, 2, 1, 6]
print(selection_sort(my_array))
```

## Testing it Out

Let's have a go at running this:

```s
$ python3.6 sort.py
[1, 2, 3, 5, 6, 9]
```

As you can see, it returns a list that has been successfully sorted using the selection sort algorithm.

# Conclusion

So, that's all we are going to cover in this tutorial! We've successfully managed to implement the selection sorting algorithm. 

If you found this useful, or have any feedback/comments then I'd love to hear them down below! 


