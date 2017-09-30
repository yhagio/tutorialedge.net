+++
title = "Creating a Realtime App with Angular with Socket.io Tutorial"
draft = true
date = "2017-06-12T15:26:02+01:00"
desc = "In this tutorial we are going to be using angular with socket.io"
tags = ["angular", "socket.io"]
series = [ "angular" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

In this tutorial we are going to be looking at how we can build a realtime application using both Angular 4 and the Socket.io library. I've covered in the past how you can utilize raw websockets and convert them into observables using the RxJS library in a previous tutorial which can be found here: [Angular Websockets Tutorial](/typescript/angular/angular-websockets-tutorial/)

## Installing Socket.IO

In order to utilize the socket.io library we will first have to install it using the node package manager. We can do this by typing the following:

~~~js
npm install socket.io-client
npm install @types/socket.io-client
~~~

## Turning Websockets into Observables

When communicating with these websockets we can use RxJS Subjects. These are both an Observable and an Observer so we can both listen to a websocket and send new messages to the websocket url that we will be interacting with. 

Let's implement a service that will handle all our websocket communication. This will feature a method `connect()` which will return an instance of an RxJS Subject. We'll have to define both an Observer and and Observable first.

~~~ts
connect() {
    let ws = io(environment.ws_url);

    let observable = new Observable(observer => {
        ws.on('event', (data) => {
            observer.next(data);
        });
    });

    return observable;
}
~~~

