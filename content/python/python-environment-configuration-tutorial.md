---
author: Elliot Forbes
date: 2017-09-10T14:01:28+01:00
desc: In this tutorial we evaluate the different ways to handle environment configuration
  in your Python Programs
series: python
image: python-logo.png
tags:
- configuration
title: Python Environment Configuration Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> This tutorial was written using Python 3.6

Defining a solid strategy for handling various environment configuration in your Python programs can drastically improve the way you deploy and manage different environments. 

In the most basic of scenarios we would typically have 2 main environments, `development` and `production`. In our development environment we would do both our development and testing against the likes of non-production based databases and resources in order to prevent adding noise to our `production` environment. 

In some scenarios you may have to pick up various environment variables from the machine running your Python application. In this tutorial I'm going to be showing you the best ways to access these environment variables.

# Basic Example

Say we had a section of code that talks to a database. In `development` we would want it to talk to our `development`-only database, in `production` we would want it to talk to our larger `production` database. We may have code that looks like this:

```python
import MySQLdb

db = MySQLdb.connect("localhost", "devuser", "devpass", "devdatabase")
``` 

When we want to push to production you may want to update the connection details to your production database and credentials. But doing this every time you make a release to production can be time-consuming and error-prone. What happens if we forget when we are deploying and our `production` environment ends up hitting a `development` database? In some scenarios this could be disastrous and cost millions in damages. 

So how do we do this using environment variables?

# System Environment Variables

If we had two distinct servers to run our Python applications, we could set the environment variables `db_username` and `db_password` on each of our servers. 

When our application starts up it would pick up our `db_username` and `db_password` environment variables and connect to the database using the appropriate credentials.

These are environment variables that can be read using the `os` module. If we wanted to read all of our environment variables we could use `os.environ` like so: 

```py
>>> import os
>>> print(os.environ)
environ({'VAR1': 'value1', ...})
```

If we wanted to read in our `db_username` and `db_password` environment variables only then we could use the `os.getenv()` function. This takes in 2 parameters, the first being the name of the environment variable we wish to retrieve and the second being a `default` value that is returned if no environment variable can be found. 

```py
>>> import os
>>> db_username = os.getenv('db_username', 'NULL')
>>> db_password = os.getenv('db_password', 'NULL')
```

This solution works if you can set distinct variables in the environments that you run your Python applications. However this approach could be difficult if you run on one shared machine without the use of virtual machines, containers or some other similar mechanism. 

# Docker

If you haven't heard of Docker then I highly suggest you check it out. Essentially it's a containerization technology that allows you to wrap your applications in a container. This container features everything that your app needs to run and can subsequently be deployed on any operating system also running Docker.

Within these containers you would typically set `environment` variables that contained things such as database `usernames` and `passwords`. Your application would then pick these up at runtime and use these credentials to connect to the appropriate database. 

# Conclusion

Hopefully this article helped to shed some light on how you would go about working with environment variables in your Python applications. If you found this tutorial useful or require further assistance then please let me know in the comments section below or by tweeting me: [@Elliot_F](https://twitter.com/elliot_f).