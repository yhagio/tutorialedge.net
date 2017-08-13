+++
date = "2017-08-13T17:06:57+01:00"
title = "Python Logging Best Practices"
draft = true
desc = "In this tutorial we'll be examining some of the best practices when it comes to logging in your Python applications"
tags = ["python"]
series = [ "python" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

In this tutorial we'll be looking at some of the best practices that you should be following when it comes to implementing logging in your Python programs. 

> This article was written against Python version 3.6

## Why Do We Need Logging?

Logging is an incredibly important feature of any application as it gives both programmers and people supporting the application key insight into what their systems are doing. Without proper logging we have no real idea as to why our applications fail and no real recourse for fixing these applications. 

Imagine you were working on an incredibly important application that your company relied upon in order to generate income. Now imagine that somehow, at say 3am in the morning on a Saturday night, your application has fallen over and the company stops generating income. In this scenario logging is your best ally in finding out what went wrong. The very first thing you'll do when you log in is to check the error logs for your application and ascertain exactly what and where failed. In this particular instance you quickly spot that this is a memory issue and that you need to increase the amount of RAM on the machine running your system. You quickly start up a new AWS EC2 instance with slightly more RAM and deploy your app and suddenly your company is back online. 

All in all, thanks to logging this took less than 30 minutes and your company only lost a minimal amount of money in that time. Without appropriate logging you may have found yourself scratching your head for hours into the break of day and become more and more stressed as your company loses more and more money.

This example is exactly why you should pay attention to the way that your systems log what is going on and in this tutorial we'll be covering some of the best practices you can follow when it comes to implementing your own logging systems.

## 