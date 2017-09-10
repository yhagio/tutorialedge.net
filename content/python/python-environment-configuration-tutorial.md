+++
date = "2017-09-10T14:01:28+01:00"
title = "Python Environment Configuration Tutorial"
desc = "In this tutorial we evaluate the different ways to handle environment configuration in your Python Programs"
draft = true
tags = ["python", "configuration"]
series = [ "python" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

> This tutorial was written using Python 3.6

Defining a solid strategy for handling various environment configuration in your Python programs can drastically improve the way you deploy and manage different environments. In the most basic of scenarios we would typically have 2 main environments, `development` and `production`. In our development environment we would do both our development and testing against the likes of non-production based databases and resources in order to prevent adding noise to our `production` environment. Once we were happy and our unit tests were passing we would then attempt to deploy our new software to our `production` environment.

## Basic Example

Say we had a section of code that talks to a database. In `development` we would want it to talk to our `development`-only database, in `production` we would want it to talk to our larger `production` database. We may have code that looks like this:

~~~python
import MySQLdb

db = MySQLdb.connect("localhost", "devuser", "devpass", "devdatabase")
~~~ 

When we want to push to production you may want to update the connection details to your production database and credentials. But doing this every time you make a release to production can be time-consuming and error-prone. What happens if we forget when we are deploying and our `production` environment ends up hitting a `development` database? In some scenarios this could be disastrous and cost millions in damages. 

So how do we 

## System Environment Variables

One answer to this problem could be the use of System Environment variables. These are environment variables that can be read using the `os` module like so:

~~~py
>>> import os
>>> print(os.environ)
environ({'VAR1': 'value1', ...})
~~~

This solution works if you can set distinct variables in the environments that you run your Python applications. However this approach could be difficult if you run on one shared machine without the use of virtual machines, containers or some other similar mechanism.  
