---
author: Elliot Forbes
date: 2017-04-09T20:56:49+01:00
desc: In this tutorial we examine ways to obtain the current URL route using the location
  service.
series: angular
image: angular.png
tags:
- typescript
title: Angular Get Current Route using the Location Service
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

>This tutorial was built using Angular 2.2. If you want to check out the official documentation for <a href="https://angular.io/docs/ts/latest/api/common/index/Location-class.html">Angular 2 Location</a>

In this tutorial we’ll be looking at various ways we can obtain the current URL of our application in Angular 2. 

# The Location Service

The location service is part of the **@angular/common** module. It allows you to interact directly with a browser’s URL and can read and redirect the user should you wish to.

> This tutorial assumes that you are familiar with Angular 2 Routing and have an application that utilizes routes.

## Getting the Current Path

Getting the current application path can be handy for scenarios where you want to show select sub-menus in say a navigation component. 

In this example we’ll be working with a very simple ‘Top-Nav’ component that will simply assign a string variable to our current path every time a route change is observed. 

```ts
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  route: string;

  constructor(location: Location, router: Router) {
    router.events.subscribe((val) => {
      if(location.path() != ''){
        this.route = location.path();
      } else {
        this.route = 'Home'
      }
    });
  }

  ngOnInit() {
  }

}
```

Notice that we have to import both Location and Router at the top of our component and then ask for them in the constructor of our component. Once we’ve asked for them, we can let Angular 2’s dependency injection work it’s magic and we’ll be able to subscribe to route changes as demonstrated above.

> If you wish to see this as a live example then I suggest you check out my Angular 2 Admin github project: <a href="https://github.com/elliotforbes/angular-2-admin/blob/master/src/app/common/top-nav/top-nav.component.ts">top-nav.component.ts</a>