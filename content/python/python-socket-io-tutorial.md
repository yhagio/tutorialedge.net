---
author: Elliot Forbes
date: 2017-10-01T12:22:11+01:00
desc: In this tutorial we will be covering how you can implement a socket.io based
  Python webserver.
series: python
image: python-logo.png
tags:
- socket.io
title: Python Socket.io Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> **Last Updated** December 22nd, 2018 <br/><br/>
> This tutorial was written using **Python 3.6**. Some of the code used is not compatible with version 2. 

In this tutorial we'll be exploring how one can create a socket.io based webserver in Python using the `socketio` module. 

# What are WebSockets?

WebSockets are an awesome bit of technology which enable us to do cool things such as perform real time communication between both a client and a server. They allow you to perform full-duplex communication over a single TCP connection and remove the need for clients to constantly poll API endpoints for updates or new content. Clients can create a single connection to a WebSocket server and simply listen for new events or messages from the server. 

The main advantage this gives us is it reduces the amount of load on a network and can be more efficient for propagating information to huge numbers of clients. 

Say for instance you have a real-time trading system that tracks stock market prices, you also have hundreds of clients subscribed to this system. If we used the traditional method of constantly polling a REST API for new stock information every second then this would amount to thousands of network requests a minute from all of our clients. By using WebSockets we can maintain a single TCP connection for all of our clients and simply send any stock updates over said TCP connection whenever we want to update our clients. 

# Installation & Requirements.txt

We'll start by installing the `python-socketio` python package using `pip`:

```py
$ pip install python-socketio
```

> **Note -** If you don't already have `aiohttp` installed, you will have to install it by again calling `pip install aiohttp`

# Implementing a Server

We'll be basing our `socket.io` server on an `aiohttp` based web server. You can find the source code to `aiohttp` here: [aio-libs/aiohttp](https://github.com/aio-libs/aiohttp) 

In this example we'll be defining two functions, the `index()` function, which will return a very simple `index.html` file, and a `print_message()` function which will be wrapped in an `@sio.on('message')` decorator. 

This decorator turns this function into a listener that will listen for events of type `message` and when these events occur it will then act upon said events. 

```py
from aiohttp import web
import socketio

# creates a new Async Socket IO Server
sio = socketio.AsyncServer()
# Creates a new Aiohttp Web Application
app = web.Application()
# Binds our Socket.IO server to our Web App
# instance
sio.attach(app)

# we can define aiohttp endpoints just as we normally
# would with no change
async def index(request):
    with open('index.html') as f:
        return web.Response(text=f.read(), content_type='text/html')

# If we wanted to create a new websocket endpoint, 
# use this decorator, passing in the name of the 
# event we wish to listen out for
@sio.on('message')
async def print_message(sid, message):
    # When we receive a new event of type 
    # 'message' through a socket.io connection
    # we print the socket ID and the message
    print("Socket ID: " , sid)
    print(message)

# We bind our aiohttp endpoint to our app
# router
app.router.add_get('/', index)

# We kick off our server
if __name__ == '__main__':
    web.run_app(app)
```

If you were now to run this, as long as no other process is running on port `8080` you should have a fully functioning websocket server that utilizes `socket.io`. 

How do you interact with this though? You could write a frontend game that sends messages to and from the server every time a player makes a move, or you could write a chat interface that allows multiple clients to talk to each other. The possibilities are almost endless and I am definitely a fan of how powerful websockets are in comparison to simply polling a RESTful API constantly.   

When we try run this, we should see something like so:

```s
$ python3.6 main.py
======== Running on http://0.0.0.0:8080 ========
(Press CTRL+C to quit)
```

This means that it is successfully server our new WebSocket server and we can start working on the frontend and connecting that in to it.

# A Sample Client Application

Now that we've implemented the server, let's implement a really clean and simple `index.html` page that we can serve. This will simply contain a single `<button />` element that, when hit, will `emit` a new `message` event to the WebSocket connection which simply contains `HELLO WORLD`:

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  
  <button onClick="sendMsg()">Hit Me</button>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js"></script>
  <script>
    const socket = io('http://localhost:8080');
    
    function sendMsg() {
      socket.emit("message", "HELLO WORLD");
    }
  </script>
</body>
</html>
```

When we now try and navigate to `http://localhost:8080`, we should see our server successfully returning out page with a single `<button/>` element and we should be able to click on said button.

When we do, we should see our server print out the Socket ID and the message we passed from our client.

```s
$ python3.6 main.py
======== Running on http://0.0.0.0:8080 ========
(Press CTRL+C to quit)
Socket ID:  02509b5ecdbb4db3a9cfb432e0741d95
HELLO WORLD
```

Awesome, we have successfully managed to set up a really simple Socket.IO connection between both our Python backend and a simple HTML frontend!

# Challenge - Two-Way Communication

Now that we've implemented simple one-way communication from our frontend to our backend, let's try improve things a little by implementing two-way communication.

We can listen for messages in our frontend by adding the following bit of JavaScript to our `<script>` tag:

```js
socket.on("message", function(data) {
    console.log(data);
})
```

This will listen for any incoming message from the server to the frontend of type `message` and then simply `console.log` the data coming from the server to the browser console.

We can then improve the backend server code to echo back any messages received. Just to make things a little more interesting, we'll echo back a modified version of our string back to the frontend:

```py
@sio.on('message')
async def print_message(sid, message):
    print("Socket ID: " , sid)
    print(message)
    # await a successful emit of our reversed message
    # back to the client
    await sio.emit('message', message[::-1])
```

If we then try to kick this off again, we should see that whenever we hit the `<button/>` in our browser, it succesfully sends a message to our backend, which is then reversed and sent back to the frontend to be printed out in the browser!

Awesome, we have successfully managed to implement full duplex communication over WebSockets using the socket.io library!

# Conclusion

So, in this tutorial, we managed to successfully implement a really simple WebSocket server using Python and `aiohttp`.

Hopefully this has given you enough to get going with WebSockets in your own Python based applications. If you have any suggestions or comments, then please feel free to let me know in the comments section below!

> **Follow Me -** If you enjoyed this and want to keep up with any changes going on in the site then please feel free to follow me on twitter: [@Elliot_f](https://twitter.com/elliot_f).