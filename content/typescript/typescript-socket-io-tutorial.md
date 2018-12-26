---
author: Elliot Forbes
date: 2018-05-30T18:09:26+01:00
desc: In this tutorial, we are going to be creating a Websocket server using both
  TypeScript and socket.io.
image: typescript.png
series: typescript
tags:
- typescript
- express
title: Getting Started with Typescript and Socket.Io - Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> **Last Updated -** 24th December, 2018

Welcome friends! In this tutorial, we are going to be looking at how you can build a websocket based server using both TypeScript and Socket.io. 

We'll be covering the following:

* What WebSockets are and why they are beneficial
* Building a Simple TypeScript WebSocket Server
* Building a Simple client to connect to our Server
* Two-way communication between our client and our server

# WebSockets

WebSockets are an awesome technology and I absolutely love playing around with them and creating real-time applications. I've used them for quite a number of different applications now in combination with other frontend frameworks such as Angular and Vue.JS. 

Socket.io makes dealing with WebSockets a pleasurable and easy experience and the library is generally well supported regardless of what frontend framework you tend to run with.

In this tutorial, we'll be using `ExpressJS` as the backend web framework that our Websocket API will sit on top of.

> The full source code for this repo can be found here: [TutorialEdge/TypeScript](https://github.com/TutorialEdge/TypeScript)

# Introduction

We are going to start off by defining a really simple TypeScript based Express.js server that will listen on port 3000. Whenever a user hits `http://localhost:3000/` our REST API it will return a very simple `hello world`.

Create a new file called `server.ts` within a `src/` directory and add the following:

```ts
// src/server.ts
import * as express from "express";

const app = express();
app.set("port", process.env.PORT || 3000);

var http = require('http').Server(app);

// simple '/' endpoint sending a Hello World 
// response
app.get('/', (req: any, res: any) => {
  res.send('hello world');
});

// start our simple server up on localhost:3000
const server = http.listen(3000, function(){
  console.log('listening on *:3000');
});
```

You'll need to install `express` and `@types/express` in order for the above to run successfully. Run `yarn init` or `npm init` to initialize our project and then run the following:

```s
$ yarn add express @types/express
```

Once you've installed these libraries, we will need to define our `tsconfig.json` file in order to tell our TypeScript compiler how we wish our project should be built. Create this file in the root directory of your project:

```js
// tsconfig.json
{
    "compilerOptions": {
        "module": "commonjs",
        "esModuleInterop": false,
        "target": "es6",
        "noImplicitAny": true,
        "moduleResolution": "node",
        "sourceMap": true,
        "outDir": "dist",
        "baseUrl": ".",
        "paths": {
            "*": [
                "node_modules/",
                "src/types/*"
            ]
        }
    },
    "include": [
        "src/**/*"
    ]
}
```

# Building our Project

Now that we've set up our `tsconfig.json` file and we've got our `src/server.ts` file, we can attempt to build and subsequently run this app:

```s
$ tsc
$ node dist/server.js
```

Should there be no errors, this will kick off our server running on port `3000`. Attempt to hit this now by navigating to `http://localhost:3000` in your browser.

# Automatically Rebuilding and Re-running

Obviously, as we start to develop this out more, we don't want to have to perform the above commands every time we wish to test what we've done works. Let's install the `concurrently` node_module as well as `nodemon` to concurrently run our `tsc -w` and `nodemon dist/server.js` commands:

```s
$ yarn add concurrently nodemon
```

Now, within our `package.json` we'll wish to add the following `scripts`:

```js
{
  "name": "socket-typescript-api",
  "version": "1.0.0",
  "main": "dist/server.js",
  "license": "MIT",
  "scripts": {
    "build": "tsc",
    "watch-ts": "tsc -w",
    "watch-node": "nodemon dist/server.js",
    "watch": "concurrently -k -p \"[{name}]\" -n \"TypeScript, Node\" -c \"yello.bold, cyan.bold\" \"yarn run watch-ts\" \"yarn run watch-node\"",
    "test": "mocha -r ts-node/register src/**/*.spec.ts"
  },
  "dependencies": {
    ...
  },
  "devDependencies": {
    ...
  }
}
``` 

Now, we can just run `yarn run watch` and it will automatically rebuild and rerun our TypeScript based project every time we make a change. This is invaluable as it saves you a lot of time in the long run.

# Implementing our Websocket Endpoint

Now that we have a basic `express` server, let's add the code we'll need for our `socket.io` based endpoint.

We'll first have to install `socket.io` by calling:

```s
$ yarn add socket.io @types/socket.io
```

Now that we've got the necessary dependencies, we can import `socket.io` as `socketio` and do the following:

```ts
import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path"

const app = express();
app.set("port", process.env.PORT || 3000);

let http = require('http').Server(app);
// set up socket.io and bind it to our
// http server.
let io = require('socket.io')(http);

app.get('/', (req: any, res: any) => {
  res.sendFile(path.resolve('./client/index.html'));
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on('connection', function(socket: any){
  console.log('a user connected');
});

const server = http.listen(3000, function(){
  console.log('listening on *:3000');
});
```

Now, when we run our `yarn run watch` command, it should start up our incredibly simple websocket API. 

# Testing This Works

Now that we've implemented the server, let's implement a really clean and simple `./client/index.html` page that we can serve. This will simply contain a single `<button />` element that, when hit, will `emit` a new `message` event to the WebSocket connection which simply contains `HELLO WORLD`:

```html
<!-- ./client/index.html -->
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
    const socket = io('http://localhost:3000');
    
    function sendMsg() {
      socket.emit("message", "HELLO WORLD");
    }
  </script>
</body>
</html>
```

When we try and hit `http://localhost:3000` in our browser, we should see our `index.html` page rendering our button. We should see, in our server logs, that a new user has connected as we've triggered the `connection` event.

## Listening for Messages

So, in the above `index.html` we emit a `message` of `Hello World`. If we want to listen to this within our server, we can add the following code:

```ts
import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path"

const app = express();
app.set("port", process.env.PORT || 3000);

let http = require('http').Server(app);
// set up socket.io and bind it to our
// http server.
let io = require('socket.io')(http);

app.get('/', (req: any, res: any) => {
  res.sendFile(path.resolve('./client/index.html'));
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on('connection', function(socket: any){
  console.log('a user connected');
  // whenever we receive a 'message' we log it out
  socket.on('message', function(message: any){
    console.log(message);
  });
});


const server = http.listen(3000, function(){
  console.log('listening on *:3000');
});
```

If we kill our server and restart, we should see that whenever our client's `<button/>` element is clicked, it will emit a `message` that will be logged out by our server side! 

When we run this, and click the button a few times on our client-side, we should see the following log output on our server:

```s
$ node dist/server.js
listening on *:3000
a user connected
HELLO WORLD
HELLO WORLD
HELLO WORLD
```

Awesome, we've managed to successfully send a message from our client to our WebSocket server using the socket-io package.

# Two-Way Communication

Now that we've got basic one-way communication up and running, let's try going back the way and send an echoed response from our server back to the client whenever it receives a message.

We'll first have to add a listener on our client for new message events. Within the `<script/>` tag, let's add a new listener:

```html
<script>
    const socket = io('http://localhost:3000');
    // listen for new messages
    socket.on("message", function(data) {
      console.log(data);
    });
    // our sendMsg function...
</script>
```

We can then add a call to `socket.emit()` in our `socket.on('message')` callback function that emit's the received message back down the WebSocket connection:

```ts
// ...
io.on('connection', function(socket: any){
  console.log('a user connected');
  socket.on("message", function(message: any){
    console.log(message);
    // echo the message back down the 
    // websocket connection
    socket.emit('message', message);
  });
});
```

Perfect, now that we have that in place, we can test it out. Reload your browser page and make sure your server has recompiled/restarted successfully. 

Notice how, whenever you click the button on your server, it now sends a message to our server, which is outputted in the logs. This message is then emitted back to the client and you should be able to see the same message outputted in the browser console. 

> **Challenge -** Try modifying the message sent from the server back to the client. You should see this newly modified message being printed out only in your client's browser console.

# Conclusion

In this tutorial, we've successfully managed to create a socket.io TypeScript server that can be connected to using a frontend in order to display any real-time events you wish.

> **Note -** If you want to keep track of when new articles are posted to the site, then please feel free to follow me on twitter for all the latest news: [@Elliot_F](https://twitter.com/elliot_f).