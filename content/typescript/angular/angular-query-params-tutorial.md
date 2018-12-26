---
author: Elliot Forbes
date: 2017-10-02T19:47:19+01:00
desc: In this tutorial we look at how you can extract query parameters from within
  your Angular application
series: angular
image: angular.png
tags:
- typescript
title: Angular Query Parameters Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this tutorial we are going to be taking a look at how you can extract information from query parameters from within your application's URL and subsequently utilize this information in your Angular based application.

> This assumes that you have already implemented routing within your Angular application. If you require further assistance with this then please feel free to check out my tutorial on [Angular Routing](/typescript/angular/angular-routing-tutorial/)

# What Are Query Parameters?

Query Parameters or `query strings` as they are otherwise known enable us to pass in information to an application through the URL that we use to open said application. Imagine you were writing a social media application that feature hundreds of users. If you had a page that allowed you to view information on a single, specific user, you would typically pass in some form of identifier in your URL to let your application known which user to display. For example:

```bash
# This would indicate that you wished to
# view the user who's id was '1'
http://myapp/user?id=1
# This would indicate that you wished to
# view the user who's id was '2'
http://myapp/user?id=2
# ... and so on
```

The advantage of this is that you only have to define one page in your application that displays user details and it will dynamically retrieve the details for whichever `id` was passed in via the url. 

# Retrieving Query Parameters in Angular

In order to retrieve the query parameters present in our application's URL we can utilize `ActivatedRoutes`. 

```js
import { Component, OnInit } from '@angular/core';
// We need to import 'ActivatedRoute' from '@angular/router' for this to work
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        // This would print out the json object which contained
        // all of our query parameters for this particular route.
        this.route.queryParams.subscribe(params => {
            console.log(params);
        })
    }

}
``` 

If we were then to navigate to say `http://localhost:4200/?version=1&id=2&name=elliot` for example we would then see the following outputted in our console:

```js
Object {version: "1", id: "2", name: "elliot"}
```

# Retrieving Specific Query Parameters

If we then wanted to retrieve specific query parameters we could do something like so:

```js
...
export class AppComponent implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.id = params['id'];
    })
  }

}
```

This would then set our components `id` variable to equal whatever the value of the `id` query parameter is when the component is loaded. So `http://localhost:4200/?id=testid` would set our `id` variable to `testid` to give an example.

# Passing Query Parameters via routerLink

If we wanted to create a link that automatically included a series of query parameters then we can do so easily using the `[queryParams]` directive like so:

```html
<a [routerLink]="['user']" [queryParams]="{id: 2}">User 2</a>
```

This would then automatically craft the url `/user?id=2` for us. This can save us a great deal of time and is a far cleaner solution than manually crafting `href` urls which could prove erroneous. You should note that you can pass any number of query parameters in through this method, you could also define an object within your component and pass that in and it would automatically expand this into a series of query parameters for you.

```js
// app.component.ts
myObj = {
    "name": "elliot",
    "age" : 24
  };
```

Our html link would then look something like so:

```html
<!-- app.component.html -->
<a [routerLink]="['user']" [queryParams]="myObj">My User Object</a>
```

