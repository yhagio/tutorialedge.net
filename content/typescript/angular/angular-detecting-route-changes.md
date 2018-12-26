---
author: Elliot Forbes
date: 2017-04-09T20:55:22+01:00
desc: In this tutorial we look at how we can subscribe to route change events within
  our Angular 2 applications.
series: angular
image: angular.png
tags:
- typescript
title: Angular Detecting Route Changes Within Your Application
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> This tutorial was built using Angular 2.2. Some of the features in this tutorial may not work for earlier/later versions.

Detecting whenever a route change happens in your application can be very useful for a multitude of reasons. For instance you may wish to store form data in a cookie in case they accidentally clicked on something they didn’t mean to.

In Angular 2 detecting this route change is relatively simple. If we have a component that is transient across all routes in our application then we can have it subscribe to our router for any changes and act upon these changes as we wish to.

In this example I’ve got a Top-Nav component which has subscribed to route changes so that in future it can determine what sub-navigation to show and so on:

```js
import { Component, OnInit } from '@angular/core';
// I import Location so that I can query the current path
import { Location } from '@angular/common';
// I also import Router so that I can subscribe to events
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  route: string;

  constructor(location: Location, router: Router) {
    // within our constructor we can define our subscription
    // and then decide what to do when this event is triggered.
    // in this case I simply update my route string.
    router.events.subscribe((val) => {
      if(location.path() != ''){
        this.route = location.path();
      } else {
        this.route = 'Home'
      }
    });
  }

  ngOnInit() { }

}
```

# Conclusion

If you found this tutorial useful or require more examples or assistance then please let me know in the comments section below!

<div class="github-link">A live example of this code can be found at: <a href="https://github.com/elliotforbes/angular-2-admin/blob/master/src/app/common/top-nav/top-nav.component.ts">Angular 2 Admin Dashboard</a>