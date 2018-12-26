---
author: Elliot Forbes
date: 2017-10-14T11:30:25+01:00
desc: In this tutorial we are going to look at how you can build event driven programs
  using RxPY in Python
series: python
image: python-logo.png
tags:
- rxpy
- concurrency
title: Python Event-Driven Programming with RxPY - Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> This tutorial was built using Python 3.6

The reactive programming paradigm is something that I've always been interested in upon learning about them when working with RxJS in my Angular 2+ based projects. 

Event based systems can dynamically react to different situations in smart ways and the [ReactiveX](https://github.com/ReactiveX) library enables to do this in a such a way that our code is succinct and easy to follow. 

# Differences between Reactive and Event-Driven Programming

It should be noted that there are some subtle differences between both event-driven programming and that of reactive programming. Event-driven programming focuses on handling events such as, for example, a button click and is the paradigm that most operating systems are based upon. If you perform an action within an operating system, the `os` will treat that as an event and trigger the corresponding function for that action.

Reactive programming on the other hand treats data passed into reactive systems as events. You could have a reactive system listen for stock price changes and only trigger an action to happen when a stock reaches a certain price. 

# Working with RxPY

In this tutorial we'll be exploring the [RxPY](https://github.com/ReactiveX/RxPY) library which is the most popular library currently available for writing reactive systems. 

To get us started we are going to want to define an input stream that we'll subsequently watch and then trigger actions should one of these bits of data meet a certain criteria. 

Let's imagine that we are creating a stock trading system that will buy and sell stocks depending on their price. We could have an array of stocks like so:

```py
stocks = [
  { 'TCKR' : 'APPL', 'PRICE': 200},
  { 'TCKR' : 'GOOG', 'PRICE': 90},
  { 'TCKR' : 'TSLA', 'PRICE': 120},
  { 'TCKR' : 'MSFT', 'PRICE': 150},
  { 'TCKR' : 'INTL', 'PRICE': 70},
]
```

We then want to create an `Observable` object that will emit events based on what the value of the stocks are. In this example we'll define a `buy_stock_events(observer)` function which will iterate over our `stocks` array and call the `on_next()` function whenever the stock price is greater than `100`.

```py
from rx import Observable

stocks = [
  { 'TCKR' : 'APPL', 'PRICE': 200},
  { 'TCKR' : 'GOOG', 'PRICE': 90},
  { 'TCKR' : 'TSLA', 'PRICE': 120},
  { 'TCKR' : 'MSFT', 'PRICE': 150},
  { 'TCKR' : 'INTL', 'PRICE': 70},
  { 'TCKR' : 'ELLT', 'PRICE': 0}
]

def buy_stock_events(observer):
  for stock in stocks:
    if(stock['PRICE'] > 100):
      observer.on_next(stock['TCKR'])
    elif(stock['PRICE'] <= 0):
      observer.on_error(stock['TCKR'])
  observer.on_completed()

source = Observable.create(buy_stock_events) 
```

Once we have done this we can then subscribe to our `source` Observable object like so:

```py
source.subscribe(on_next=lambda value: print("Received Instruction to buy {0}".format(value)),
                on_completed=lambda: print("Completed trades"),
                on_error=lambda e: print(e))
```

You'll notice that we are passing in 3 distinct `lambda` functions into our call to `subscribe()`. These 3 `lambda` functions are `on_next()` which is called whenever our Observable emits something, `on_completed()` which is called when our Observable has nothing else to give us, and `on_error()` which is called whenever there is an error emitted by our Observable.

# The Output

When you run this you should see that `APPL`, `TSLA` and `MSFT` all trigger our observer's `on_next()` function and a buy order is placed. However, when our Observable tries to process `ELLT` it calls `on_error()` as the stock price is set to `0`.

```py
 $ python3.6 allLambda.py
Received Instruction to buy APPL
Received Instruction to buy TSLA
Received Instruction to buy MSFT
Stock has an invalid price: ELLT
```

# Conclusion

This is just a very simple example of what could be done with `RxPY`, there are an almost infinite amount of different things you could do with this library. You could for instance have a Twitter bot scan for tweets based on a certain keyword and whenever a new tweet appears it could trigger an event. Or you could expand out this wonderfully complex trading algorithm shown above and create a system that has the potential to buy you a luxury yacht somewhere warm!

If you enjoyed this tutorial then you may like my book on [Learning Concurrency in Python](https://www.packtpub.com/application-development/learning-concurrency-python) which covers the RxPY library in greater detail!

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:56.3%"><iframe src="https://www.youtube.com/embed/tQA8I8yMxxM?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="639" height="360" frameborder="0" gesture="media" allowfullscreen></iframe></div>