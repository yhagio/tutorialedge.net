+++
date = "2017-11-18T16:10:25Z"
title = "Memoization For Beginners"
draft = true
desc = "In This Tutorial we look at memoization and how you can use it to effectively optimize your recursive algorithms performance"
tags = ["python", "algorithms"]
series = ["compsci"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

In this tutorial we are going to look at a concept in computer science called `memoization`. This is a really cool concept that allows us to optimize the runtime performance of some of our recursive algorithms by effectively caching the results of previous computations so that they don't have to be continuously re-computed. 

## The Fibonacci Example

Calculating Fibonacci in a recursive manner is quite possibly the best example I've come across when it comes to showing the power of `memoization`.  

Imagine we had a function that computed the fibonacci number `n` like so:

~~~py
# Basic fibonacci function
# 1 + 1 + 2 + 3 + 5 + 8 + 13
def fib(n):
    if n <= 0:
        return 0
    if n == 1:
        return 1
    return fib(n-1) + fib(n-2)
~~~

When we then tried to run our `fib(7)` function it would then compute the following answer.

~~~py
>>> import fibonacci
>>> fibonacci.fib(7)
13
~~~

Now the runtime complexity of this relatively simple function above would be `O(2^n)` which is incredibly inefficient as we start to compute larger and larger fibonacci numbers.

## The Memoization Optimization

Through the use of `memoization` we could effectively store the results of previous computations. In order to store our results we will use a `dict` in Python.

~~~py
def fib_with_memo(n, memo):
    if n <= 0:
        return 0
    if n == 1:
        return 1
    if n not in memo: 
        print("Memo Computed")
        memo[n] = fib_with_memo(n-1, memo) + fib_with_memo(n-2, memo)

    return memo[n]

memo = {}

print(fib_with_memo(9, memo))
print(memo)
~~~  

When you run this you should get the following output. As you can see from the number of times `Memo Computed` is printed out, we have been able to effectively optimize the number of times we have to recursively call `fib()`. 

~~~py
 $ python3.6 fibonacci.py
Memo Computed
Memo Computed
Memo Computed
Memo Computed
Memo Computed
Memo Computed
Memo Computed
Memo Computed
34
{2: 1, 3: 2, 4: 3, 5: 5, 6: 8, 7: 13, 8: 21, 9: 34}
~~~

We have been able to modify our program and change is runtime performance from `O(2^N)` to `O(N)` which is a huge saving.

## Entire Program

The entire Python file can be found below. 

~~~py
def fib(n):
    if n <= 0:
        return 0
    if n == 1:
        return 1
    print("Recursive Call")
    return fib(n-1) + fib(n-2)

def fib_with_memo(n, memo):
    if n <= 0:
        return 0
    if n == 1:
        return 1
    if n not in memo: 
        print("Memoization Computed")
        memo[n] = fib_with_memo(n-1, memo) + fib_with_memo(n-2, memo)

    return memo[n]

memo = {}

print(fib(9))
print(fib_with_memo(9, memo))
print(memo)
~~~

## Conclusion

If you found this tutorial useful or need further explanation then please feel free to let me know in the comments section below!