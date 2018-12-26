---
author: Elliot Forbes
date: 2018-07-15T09:13:28+01:00
desc: In this tutorial, we are going to look at how you can create a realtime react
  application using socket.io
series: react
tags:
- javascript
- react
- socket.io
title: Building Real-time ReactJS Applications with Socket.Io - Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this article, we are going to be looking at how you can implement real-time websocket-based communication within your ReactJS web application.

# Why Websockets?

I've covered this numerous times in previous articles on this site as to why we should use websockets within our applications. 

The benefits are numerous, and when we use socket.io, these benefits can be realized with minimal added complexity. 

Let's have a look at a real-life example. Imagine you had a real-time monitoring application that continually polled the status of the fleet of 100 servers that currently host your services. 

With traditional HTTP requests, you could send out a new HTTP request to validate the status of a server once every minute. Whilst this would certainly work, it would mean you would be creating a new TCP connection 100 times per minute for your fleet of servers. This adds up to 6000 times per hour, or 144,000 per day. 

If each of these services sent back a JSON status response that looked like this:

```json
{
  "service_status": "good",
  "last_issue": "2018-07-15T13:51:53.415Z"
}
```

Each HTTP response from our server could amount to roughly 200-300Kb in size *per* response. This equates to roughly 41GB of network traffic per day, just on polling the status of your 100 servers. 

This represents a somewhat conservative example if you start to consider the scale of some large enterprises. These enterprises might maintain tens, if not hundreds of thousands of servers and by utilizing HTTP to poll status, you could very quickly find yourself chocking the network for minimal added value.

If we migrated our application to use websockets, we could reduce this to 100 TCP connections that would be persistent throughout the course of the day. 

These bi-directional connections could then be used to push status updates only when they start seeing issues. As such, you could find yourself drastically saving the amount of network traffic generated. 

# Scaffolding our Application

To avoid any confusion, we'll be creating a blank react application using the `create-react-app` tool:

```s
$ create-react-app my-new-app
```

Once this has gone away and successfully created our application, we can then proceed to install the necessary libraries we will need in  order to build our real-time application.

```s
$ yarn add socket.io-client
```

# Our api.js File

Now that we have all of our dependencies installed and ready to go, it's time to define the file that will perform our websocket connection and also allow us to interact with the newly opened connection.

Create a new file within an `api` directory and add the following:

```js
// api/index.js
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000/');

function connect(cb) {
  // listen for any messages coming through
  // of type 'chat' and then trigger the 
  // callback function with said message
  socket.on('chat', (message) => {
    // console.log the message for posterity
    console.log(message)
    // trigger the callback passed in when
    // our App component calls connect
    cb(message);
  })
}

export { connect }
```

You'll notice within this that we have first imported the necessary `socket.io-client` library. We've then created a `socket` connection that connects to the hard coded `http://localhost:5000` backend websocket service.

Below this we've then defined a `connect()` function which takes in a callback as a parameter. Within the body of this function we define what happens when our frontend client receives a socket.io message of type `chat`. In this case we simply log what was received and then call our inputted callback function, passing in the received message to that. 

# Updating your App.js

So, now that we have defined our `connect` function within our `api/index.js` file, we can start the process of connecting to our websocket endpoint and sending and receiving messages.

We'll first have to import our new `api/index.js` file at the top of our `app.js` file. Once we've done that we can define a `constructor` if there isn't one already and within that we'll be calling `connect()` and passing in a callback function that will simply `console.log` our returned message.

```ts
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from './api';

class App extends Component {

  constructor(props) {
    super(props);
    // call our connect function and define
    // an anonymous callback function that 
    // simply console.log's the received 
    // message
    connect(message => {
      console.log(message);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
```

Once you've done this, save your file and reload your application within your browser. You should see within your console tab the words `hello world` returned when you make a successful connection to the backend websocket server.

# Our Backend System

Our backend system is very simple, but can be extended to your heart's content. This will actually be the base for a new series that I'm building on creating a real-time chat application that runs on AWS. If you want to stay tuned to when this comes out then please feel free to follow me on twitter: [@Elliot_f](https://twiter.com/Elliot_f)

So, the below code simply sets up a socket.io endpoint that runs on `http://localhost:5000`. When a user connects to this websocket endpoint, it will then log that a new client has successfully connected and it will emit a `Hello World` message back to the client.

```ts
import express from "express";
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// This enables CORs and ensures that our frontend, 
// running on a different server can connect to our backend
io.set('origins', '*:*');
// whenever we receive a `connection` event
// our async function is then called
io.on('connection', async (socket: any) => {
  // we should see this printed out whenever we have
  // a successful connection
	console.log("Client Successfully Connected");

  // we then send out a new message to the
  // `chat` channel with "Hello World"
  // Our clientside should be able to see
  // this and print it out in the console
	io.emit('chat', "hello world");
})

server.listen(5000, () => {
	console.log("Backend Server is running on http://localhost:5000");
})
```

I recommend checking our the `backend` directory here: [TypeScript/react-typescript-real-time-chat](https://github.com/TutorialEdge/react-typescript-real-time-chat/tree/241b6b404a821e7566e5353a4605db9b107a83f5) which features the appropriate configuration files needed to run this on your own machine.

When you create the necessary config files and perform a `yarn install` or `npm install`, you will then be able to build and run this project by calling:

```s
$ yarn watch
```

This will concurrently watch for any code changes, compiles our TypeScript files down to a `dist/` directory and subsequently runs these files using `nodemon`.

Once this is started and you are running your frontend application, you should be able to see `Hello World` being successfully logged in your browser inspector when you connect to the backend.

# Conclusion

So, hopefully this tutorial has been successful in getting you started with both React and Socket.io so that you can build up your own complex, awesome real-time applications. 

If you need any additional help, or would like to know more, please feel free to tweet me [@Elliot_f](https://twitter.com/@elliot_f) or let me know in the comments section below.