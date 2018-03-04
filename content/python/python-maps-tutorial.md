+++
date = "2017-05-24T07:57:51+01:00"
title = "Python Maps Tutorial"
draft = true
desc = "In this tutorial we cover the map function within the Python programming language"
tags = ["python", "concurrency"]
series = ["python"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

> This tutorial was built using Python 3.6

Maps in Python are syntactic sugar that allow you to very succinctly iterate through every element of an array and perform a function on it. 

Imagine we started off with a list of values numbering from 2-6 like so:

```python
values = [2,3,4,5,6]
``` 

And we had a function which doubled said values:

```python
def double(x):
  return x * 2
```

With the use of maps we would have to do something like so in order to multiply every element:

```python
for value in values:
  value = double(value)
```

but with maps we can be far more succinct:

```python
results = list(map(double, values))
```

### Complete Example

Below you'll find a complete exmaple for a simple map which applies the double function to every element in the values array.

```python
values = [2,3,4,5,6]

def double(x):
  return x * 2

results = list(map(double, values))
print(results)
```

this produces the following output:

```python
[4, 6, 8, 10, 12, 14, 16]
```

## Conclusion

Hopefully you found this tutorial useful! If you did or you require further assistance then please feel free to let me know in the comments section below or by tweeting me [@Elliot_F](https://twitter.com/elliot_f).