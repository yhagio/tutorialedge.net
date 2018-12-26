---
author: Elliot Forbes
date: 2017-04-09T20:52:33+01:00
desc: In this tutorial we look at how we can work with websockets and subjects in
  our Angular applications.
series: angular
image: angular.png
tags:
- typescript
title: Angular Websockets Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this tutorial we’ll be looking at how you can implement a very simple WebSockets based Angular application. 

> You may also be interested in my tutorial: [Creating a Realtime App with Angular and Socket.io](/typescript/angular/angular-socket-io-tutorial/)

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:42.76%"><iframe src="https://www.youtube.com/embed/8CNVYWiR5fg?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="842" height="360" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

# Browser Compatibility

At this point in time I think it would be a good idea to let you know that websocket browser compatibility is not 100% and some older browsers may not support WebSockets. This tutorial, as a result, may not work in your browser if you haven’t updated in awhile.

# WebSockets in Angular

Angular utilizes RxJS which is essentially a javascript implementation of reactive extensions. This is a library for composing asynchronous and event-based programs using observable sequences and is perfect for working with WebSockets.

Simply put, RxJS allows us to listen to new messages from a websocket connection and then perform an action when ‘X’ event occurs. An example of this could be in a real-time chat application. Say we have 3 people connected to our chat application and one of them sends a message. If we want to do something in our application whenever we receive a message then we can simply subscribe to a ‘new-message’ event and handle the event whenever it is triggered.

## Working with WebSockets

The best way to implement WebSockets in our angular applications would be to encapsulate our WebSockets and events in a service and then call that service in whatever components we wish to interact with a websocket. 

> If you are unfamiliar with services then please feel free to check out my tutorial on [Angular Services](/typescript/angular/angular-services-tutorial/)

# Creating our Application

Using the Angular CLI, create a new application by typing the following into the command line:

```bash
ng new websocket_tutorial
```

This should create a new, fully functioning Angular 2 application in which we shall implement our websocket based services. To ensure that it’s working type:

```bash
ng serve
```

And you should hopefully see the server successfully starting on port 4200. If you then navigate to localhost:4200 in your prefered web browser you should see ‘app works!’ displaying in your browser. Now that we’ve got our basic app up and running let’s move on to creating our websocket service.

# Creating our Websocket Service

To get us started we’ll be creating a very simple service that will connect to any given URL and return an RxJS subject that we can subscribe to in other services/components in order to listen for any incoming messages from the connected socket. 

```bash
ng g service websocket
```

We’ll need to import * from the rxjs library at the top of our new service. This will allow us to create the subject that will both observe and be observable. This essentially means our subject will watch our websocket for any incoming messages and will broadcast these messages to any components that happen to be subscribing to this service.

```ts
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebsocketService {
  constructor() { }

  private subject: Rx.Subject<MessageEvent>;

  public connect(url): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    } 
    return this.subject;
  }

  private create(url): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Rx.Observable.create(
	(obs: Rx.Observer<MessageEvent>) => {
		ws.onmessage = obs.next.bind(obs);
		ws.onerror = obs.error.bind(obs);
		ws.onclose = obs.complete.bind(obs);
		return ws.close.bind(ws);
	})
let observer = {
		next: (data: Object) => {
			if (ws.readyState === WebSocket.OPEN) {
				ws.send(JSON.stringify(data));
			}
		}
	}
	return Rx.Subject.create(observer, observable);
  }

}
```

Next what we want to do is to create a second service that will interface with our websockets and will act as a type of adapter which will adapt the output from our websocket into a form that we can easily work with in the frontend. Again create this service using the angular-cli:

```bash
ng g service chat
```

This should create a chat.service.ts within your root directory. In this file we are going to want to do something like so:

```ts
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

const CHAT_URL = 'ws://echo.websocket.org/';

export interface Message {
	author: string,
	message: string
}

@Injectable()
export class ChatService {
	public messages: Subject<Message>;

	constructor(wsService: WebsocketService) {
		this.messages = <Subject<Message>>wsService
			.connect(CHAT_URL)
			.map((response: MessageEvent): Message => {
				let data = JSON.parse(response.data);
				return {
					author: data.author,
					message: data.message
				}
			});
	}
}
```

# Updating our App Component

Finally we’ll want to update our app.component.ts file so that it imports our newly created chat service and allows us to push messages to this websocket:

```ts
import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ WebsocketService, ChatService ]
})
export class AppComponent {

	constructor(private chatService: ChatService) {
		chatService.messages.subscribe(msg => {			
      console.log("Response from websocket: " + msg);
		});
	}

  private message = {
		author: 'tutorialedge',
		message: 'this is a test message'
	}

  sendMsg() {
		console.log('new message from client to websocket: ', this.message);
		this.chatService.messages.next(this.message);
		this.message.message = '';
	}

}
```

Finally we’ll need to update our html page for our app component so that we can actually use the sendMsg() function that we defined in our component file:

```html
<!-- app.component.html -->
<h1>
  Angular 2 WebSockets Tutorial
</h1>

<button (click)="sendMsg()">Send Message</button>
```

Once these changes have been made, serve the application by going to the root directory and typing:

```bash
ng serve
```

And you should see the Angular 2 WebSockets tutorial and our ‘Send Message’ button rendered in your browser.

Open up the console and click the button a few times and you should see your application both sending and receiving messages to the test websocket server.

# Conclusion

If you found this tutorial useful or wish to know more then please feel free to let me know in the comments section below.

> All source code for this tutorial can be found in this github repo: [elliotforbes/angular-websockets](https://github.com/elliotforbes/angular-websockets)