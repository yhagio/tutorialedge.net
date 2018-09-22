---
author: Elliot Forbes
date: 2017-10-01T12:22:11+01:00
desc: In this tutorial we will be covering how you can implement a socket.io based
  Python webserver.
series:
- python
tags:
- python
- socket.io
title: Python Socket.io Tutorial
twitter: https://twitter.com/Elliot_F
---

> This tutorial was written using Python version 3.6. Some of the code used is not compatible with version 2.

In this tutorial we'll be exploring how one can create a socket.io based webserver in Python using the `socketio` module. 

## What are WebSockets?

[WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) are an awesome bit of technology which enable us to do cool things such as perform real time communication between both a client and a server. They allow you to perform full-duplex communication over a single TCP connection and remove the need for clients to constantly poll API endpoints for updates or new content. Clients can create a single connection to a WebSocket server and simply listen for new events or messages from the server. 

The main advantage this gives us is it reduces the amount of load on a network and can be more efficient for propagating information to huge numbers of clients. Say for instance you have a real-time trading system that tracks stock market prices, you also have hundreds of clients subscribed to this system. If we used the traditional method of constantly polling a REST API for new stock information every second then this would amount to thousands of network requests a minute from all of our clients. By using WebSockets we can maintain a single TCP connection for all of our clients and simply send any stock updates over said TCP connection whenever we want to update our clients. 

## Implementing a Server

We'll be basing our `socket.io` server on an `aiohttp` based web server. You can find the source code to `aiohttp` here: [aio-libs/aiohttp](https://github.com/aio-libs/aiohttp) 

In this example we'll be defining two methods, the `index()` method which will return a very simple `index.html` file, and a `print_message()` method which will be wrapped in an `@sio.on('message')` decorator. This decorator turns this function into a listener that will listen for events of type `message` and when these events occur it will then act upon said events. 

```py
from aiohttp import web
import socketio

sio = socketio.AsyncServer()
app = web.Application()
sio.attach(app)

async def index(request):
    with open('index.html') as f:
        return web.Response(text=f.read(), content_type='text/html')

@sio.on('message')
def print_message(sid, message):
    print("Socket ID: " , sid)
    print(message)

app.router.add_get('/', index)

if __name__ == '__main__':
    web.run_app(app)
```

If you were now to run this, as long as no other process is running on port `8080` you should have a fully functioning websocket server that utilizes `socket.io`. How do you interact with this though? You could write a frontend game that sends messages to and from the server every time a player makes a move, or you could write a chat interface that allows multiple clients to talk to each other. The possibilities are almost endless and I am definitely a fan of how powerful websockets are in comparison to simply polling a RESTful API constantly.   

## A Sample Client Application

If you want to test your new `socket.io` based webserver with a frontend client then I recommend checking out my tutorial on [Creating a Realtime App with Angular and Socket.io](/typescript/angular/angular-socket-io-tutorial/). If you change the websocket url in the example app provided you will be able to instantly test out your Python based server.
