---
author: Elliot Forbes
date: 2017-11-20T18:09:47Z
desc:
  In This Tutorial we look at how you can implement the Quicksort Sorting
  Algorithm in Python
series: compsci
image: logo.svg
tags:
- sorting
title: Implementing Quicksort in Python
twitter: https://twitter.com/Elliot_F
---

**In this tutorial we are going to be looking at how you can implement the QuickSort algorithm using Python.** This will include looking at how the underlying algorithm works, and the time/space complexity of the algorithm when implemented correctly.

> **Note** - If you are applying for jobs at some of the top tech companies in the world then be aware that this algorithm may feature within their interview processes so it's worthwhile memorizing some of the key information about it.

# QuickSort Algorithm

Quicksort is one of the most popular sorting algorithms you will come across in
computer science. This is because of it's `average` case performance of
`O(n log n)`.

The Quicksorting algorithm uses a **divide-and-conquer** approach and recursively **partitions** the elements in an unsorted array around a randomly picked **pivot**
element.

- A Random `Pivot` element is chosen from our unsorted array.
- We create 3 distinct `partitions`:
  - Equal - for all elements equal to our `pivot` element
  - Lower - for all elements lower than our `pivot` element
  - Higher - for all elements higher than our `pivot` element
- We iterate through our array and sort those that are less than our `pivot`
  into the lower `partition`
- We sort those that are higher than our `pivot` into the higher `partition`
- We then recursively sort through these higher and lower `partitions`

Whilst this typically runs with a performance of `O(n log n)`, it should be
noted that the worst case performance for this algorithm is actually `O(N^2)`
which occurs if you consistently choose the worst possible point in the array to
`pivot` on.

# Implementing this in Python

Now that we understand the logic behind the quicksorting algorithm, it's time to
implement this in Python. Below we'll be defining a `quicksort()` function which
will take in an `array` as it's only parameter.

> **Note -** I find this implementation of QuickSort to be the simplest and most straightforward implementation. **However, it does not do in-place swaps** and utilizes more memory than absolutely needed. 

<div class="filename"> main.py </div>

```py
def quicksort(array):

    # We define our 3 arrays
    less = []
    equal = []
    greater = []

    # if the length of our array is greater than 1
    # we perform a sort
    if len(array) > 1:
        # Select our pivot. This doesn't have to be
        # the first element of our array
        pivot = array[0]

        # recursively go through every element
        # of the array passed in and sort appropriately
        for x in array:
            if x < pivot:
                less.append(x)
            if x == pivot:
                equal.append(x)
            if x > pivot:
                greater.append(x)

        # recursively call quicksort on gradually smaller and smaller
        # arrays until we have a sorted list.
        return quicksort(less)+equal+quicksort(greater)

    else:
        return array

def main():
  print(quicksort([6,4,7,1,2,9,12,3]))
```

# Testing it works

We can test this by doing the following:

<div class="filename"> python main.py </div>

```py
[1, 2, 3, 4, 6, 7, 9, 12]
```

Awesome, we can see from the output that this has successfully managed to sort our list of random integers and print it out!

<Quiz question="What is the average time complexity of the Quick Sort Algorithm?" A="O(N)" B="O(N^2)" C="O(n log n)" correct="C" answer="C - The average case sorting complexity of Quick sort is O(n log n)"/>

# In-Place Memory QuickSort Implementation

Now that we've looked at implementing the simplest version of QuickSort, let's now take a look at a slightly more complex but memory-efficient implementation which does in-place sorts.

The most common way of implementing this version is to define a `partition` function which takes in 3 parameters:

- **The Array**

- **The Start**

- **The End**

It's in this `partition` function that the comparison and swaps take place:


```py
def partition(arr, start, end):
  pivot = arr[begin]
  i = start + 1
  j = end - 1

  while True:
    while (i <= j and arr[i] <= pivot):
      i = i + 1
    while (i <= j and arr[j] >= pivot):
      j = j -1

    if i <= j:
      arr[i], arr[j], arr[j], arr[i]
    else:
      arr[start], arr[j] = arr[j], arr[start]
      return j
```

We can then modify our `quicksort()` function so that it leverages this new `partition()` function like so:

```py
def quicksort(arr, start, end):
  if end - start > 1:
    p = partition(arr, start, end)
    quicksort(arr, start, p)
    quicksort(arr, p + 1, end)
```

Awesome, with these tweaks **in place**, we now have a QuickSort implementation that sorts arrays **in-place** and thus is far more efficient when it comes to memory utilization

# Conclusion

If you found this tutorial useful or require further assistance or info then
please let me know in the comments section below!

## Related Reading

If you enjoyed this tutorial, you may also enjoy these other tutorials on the site:

* [Bubble Sort in Python](/compsci/sorting/bubble-sort-in-python/)
* [Insertion Sort in Python](/compsci/sorting/insertion-sort-in-python/)