---
author: Elliot Forbes
date: 2016-02-14T16:11:58+05:30
desc: In this tutorial we'll be looking at Angular 2 Observables, what they are and
  how we can use them in our Angular applications.
series: angular
image: angular.png
tags:
- typescript
title: Angular Observables Tutorial using RxJS
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

The Observable Design pattern is an incredibly powerful paradigm that we can utilize in a wide array of different applications. In this tutorial we’ll be covering how you can implement your own observables in Angular. 

# RxJS

RxJS or reactive extensions is a set of libraries that are designed to help implement asynchronous and event-based programs and it’s necessary if you are wanting to perform Http requests or work with streams of information in Angular applications.

## Examples of Observable Uses:

* UI Events
* Websocket Streams
* Http Requests

# What Are Streams

Streams are essentially a sequence of ongoing events ordered in time. Using RxJS we can specifically subscribe to each of these signals and act upon them whenever we get them. We can ‘Observe’ them and constantly watch them in the background by subscribing to ‘Subjects’. 

> Streams emit 3 different types of signals: value, error and completed. We can subscribe to these individually and react to whenever one of these signals is given.

# Subjects in RxJS

In RxJS we are provided with these things known as Subjects. These are both observers and observable and can watch a stream of data for us. These subjects notify all the subscribers to these subjects of any updates. 

Below you’ll find the declaration for RxJS’s Subject class. You should notice that it implements the Subscription interface and also extends the Observable class. 

```ts
/**
 * @class Subject<T>
 */
export declare class Subject<T> extends Observable<T> implements ISubscription {
…
}
``` 

# A Live Example:

<div class="github-link">If you want to see a live example of Angular observables then I recommend checking out : <a href="https://github.com/elliotforbes/ng-chat">elliotforbes/ng-chat</a>.</div>

Below you’ll find the code for the WebsocketService which is included in this github repo.

```js
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

# Conclusion

If you found this tutorial helpful or require more information then please let me know in the comments section below.