---
author: Elliot Forbes
date: 2017-01-10T15:26:02+01:00
desc: In this tutorial we are going to be using angular with socket.io
series: angular
image: angular.png
tags:
- socket.io
title: Creating a Realtime App with Angular and Socket.io Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> The full source code for this tutorial can be found here: [elliotforbes/angular-socket-io-example](https://github.com/elliotforbes/angular-socket-io-example)

In this tutorial we are going to be looking at how we can build a realtime application using both Angular 4 and the Socket.io library. I've covered in the past how you can utilize raw websockets and convert them into observables using the RxJS library in a previous tutorial which can be found here: [Angular Websockets Tutorial](/typescript/angular/angular-websockets-tutorial/)

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:42.76%"><iframe src="https://www.youtube.com/embed/n7OKfVwClE4?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="842" height="360" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

# Installing Socket.IO

In order to utilize the socket.io library we will first have to install it using the node package manager. We can do this by typing the following:

```js
npm install socket.io-client
npm install @types/socket.io-client
```

# Turning Websockets into RxJS Subjects

RxJS Subjects are both an `Observable` and an `Observer`. Using these Subjects we can concurrently listen to and send messages to a single websocket, this essentially opens up two way communication and allows us to do cool things such as build chat systems.

In this scenario we'll be creating both a Websocket service and a Chat service. The Websocket service will handle direct communication with the socket and the Chat service will expose a simple interface that our other components can easily interact with.

```js
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../environments/environment';

@Injectable()
export class WebsocketService {

  // Our socket connection
  private socket;

  constructor() { }

  connect(): Rx.Subject<MessageEvent> {
    // If you aren't familiar with environment variables then
    // you can hard code `environment.ws_url` as `http://localhost:5000`
    this.socket = io(environment.ws_url);

    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    let observable = new Observable(observer => {
        this.socket.on('message', (data) => {
          console.log("Received message from Websocket Server")
          observer.next(data);
        })
        return () => {
          this.socket.disconnect();
        }
    });
    
    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    let observer = {
        next: (data: Object) => {
            this.socket.emit('message', JSON.stringify(data));
        },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Rx.Subject.create(observer, observable);
  }

}
```

Once we've defined this websocket service we can then define a chat service that features just a constructor and one `sendMsg()` function that will be used to send messages to our socket.io server.

```js
import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class ChatService {
  
  messages: Subject<any>;
  
  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        return response;
      })
   }
  
  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg);
  }

}
```

# Using our Chat Service

If we wanted to start using our newly crafted chat service we could something like this: 

```js
import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private chat: ChatService){ }

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      console.log(msg);
    })
  }

  sendMessage() {
    this.chat.sendMsg("Test Message");
  }

}
```

We could then create a simple button in our `./app.component.html` file which would call our `sendMessage()` function: `<button (click)="sendMessage()">Send Message</button>`. As long as you have specified your newly created services in the `app.module.ts` providers array you should hopefully now have an application that can send and receive messages from a `socket.io` based webserver.

# Our Websocket Server

In this tutorial we will be leveraging a very simple socket.io based `express` server which will listen on `http://localhost:5000` for all incoming websocket connections and upon receiving a connection it will print out that a user has connected. Create a new file called `app.js` and add the following code:

```js
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {

    // Log whenever a user connects
    console.log('user connected');

    // Log whenever a client disconnects from our websocket server
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client
    // using `io.emit()`
    socket.on('message', (message) => {
        console.log("Message Received: " + message);
        io.emit('message', {type:'new-message', text: message});    
    });
});

// Initialize our websocket server on port 5000
http.listen(5000, () => {
    console.log('started on port 5000');
});
```

> Before you run this code you will have to ensure the proper node dependencies are installed. You can do that by typing `npm i express http socket.io`. You can run this server by typing `node app.js`. 

# Conclusion

When you run this you should see our websocket server print out something like the below output. It first starts on port 5000, when we then open up our Angular client you should then see it log `user connected` and then every time we send a message from our client you see the contents of that message being outputted below.

```bash
 $ node app.js
started on port 5000
user connected
Message Received: "Test Message"
Message Received: "Test Message"
```

