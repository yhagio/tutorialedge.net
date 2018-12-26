---
author: Elliot Forbes
date: 2017-10-28T11:50:27+01:00
desc: This tutorial teaches you how to calculate the keyword density of a web page
  using the python programming language.
series: python
image: python-logo.png
tags:
- http
- rest
title: Creating a RESTful API with Python and aiohttp
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> This tutorial was built on top of Python 3.6

In this tutorial we'll be building a very simple RESTful based API using [aio-libs/aiohttp](https://github.com/aio-libs/aiohttp) which is an asynchronous http client/server framework. 

# Getting Started with aiohttp

Before we go into how we can use aiohttp to create a simple RESTful API, it's important to know exactly what the framework is and what it can do for us. To start with, it features excellent support of the HTTP protocol as well as for websockets which makes it ideal for working with popular websocket libraries such as Socket.io. If you are interested in seeing how to implement a simple client/server socketio based solution check out this tutorial: [Python Socket.io with aiohttp Tutorial](/python/python-socket-io-tutorial/). 

The key part of the aiohttp framework is that it works in an asynchronous manner, it can concurrently handle hundreds of requests per second without too much hassle. In comparison to frameworks such as flask, it's incredibly performant. 

## Installing aiohttp

In order to install aiohttp you can run the following `pip` command:

```py
pip install aiohttp
```

# Writing a Simple API

To get us started writing a simple API we are going to write a handler function; `async def handle(request):` which will return a `json` based response whenever it is called. We'll then create an `app` object by calling `app = web.Application()` and then we'll set up our app's router and add a `GET` request endpoint that calls `handle` whenever `"/"` is hit. Finally we call `web.run_app(app)` in order to kick off our newly defined `aiohttp` API.

```py
# filename: app.py

from aiohttp import web
import json

async def handle(request):
    response_obj = { 'status' : 'success' }
    return web.Response(text=json.dumps(response_obj))

app = web.Application()
app.router.add_get('/', handle)

web.run_app(app)
```

# Testing our API

We can then run our new REST API by calling `python app.py` which should start our app on `http://0.0.0.0` a.k.a `http://localhost` on port `8080` by default. 

```py
 $ python3.6 app.py
======== Running on http://0.0.0.0 ========
(Press CTRL+C to quit)
```

When you navigate to `http://localhost:8080` you should see our `{"status": "success"}` being returned in the browser. 

# POST Requests and Query Parameters

Now that we've successfully defined a very basic, single `endpoint` API we can now start to build on top of this and start exposing different routes that use different verbs. Let's create a simple `POST` request endpoint that takes in `name` via a query parameter. We'll want the final URL of this endpoint to look like so: `http://localhost:8080/user?name=elliot`. Let's define the handler function `new_user(request)` now.

```py
async def new_user(request):
    try:
        # happy path where name is set
        user = request.query['name']
        # Process our new user
        print("Creating new user with name: " , user)
        
        response_obj = { 'status' : 'success' }
        # return a success json response with status code 200 i.e. 'OK'
        return web.Response(text=json.dumps(response_obj), status=200)
    except Exception as e:
        # Bad path where name is not set
        response_obj = { 'status' : 'failed', 'reason': str(e) }
        # return failed with a status code of 500 i.e. 'Server Error'
        return web.Response(text=json.dumps(response_obj), status=500)
```

Once we have successfully defined this new handler function we will have to register it in our routes like so:

```py
app.router.add_post('/user', new_user)
```

Try run your application now and send a `POST` request to `http://localhost:8080/user?name=test` and you should see the following output in the console:

```py
 $ python3.6 app.py
======== Running on http://0.0.0.0 ========
(Press CTRL+C to quit)
Creating new user with name:  test
```

You should also receive the same success json as well as a `200` status.

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/Z784Mwm4VBg?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="640" height="360" frameborder="0" gesture="media" allowfullscreen></iframe></div>