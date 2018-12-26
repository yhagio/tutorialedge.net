---
author: Elliot Forbes
date: 2017-04-09T21:04:22+01:00
desc: In this tutorial we look at how we can define and utilize services within Angular
  2
series: angular
image: angular.png
tags:
- typescript
title: Angular Services Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

If you’ve ever written an application in Angular 1.* that interfaces with a RESTful web API then you should have come across services. Services are essentially the interfaces we should use in order to interact with these APIs. 


They essentially provide a cleaner interface with which we can interact with APIs. If you are building a todo application that interacts with say a ToDo REST api then what method do you think is cleaner?


Defining a HTTP Promise, remembering the exact URL for the api and having to define the path parameters, modify cookies, play with http headers etc every time you want to create a new ToDo from multiple locations in your application or?
Define all of the above **ONCE** in a service so that we could do something like: TodoService.addTodo(todoObj);


Clearly it’s got to be the second way. It doesn’t take away the complexity of working with an API but it focuses it in one small place following the **DRY** principle. Having it in one place also makes maintenance far easier, say for instance v2 of your API was released and you had to move all of your apps over to that API? Well having it defined in on service would mean that you just have one place to update it from.


# Defining a Service in Angular


In order to define a service, create a file called user.service.ts. Within this file we will then do the following:


```ts
// We import the necessary Injectable module from angular/core
import { Injectable } from '@angular/core';

// we decorate our UserService class with the @Injectable()
// decorator
@Injectable()
export class UserService {

  constructor() { }

  // we define our services methods. 
  getHi() {
    return 'hi';
  }

}
```

# Using our New Service

If we wanted to start using our UserService within one of our components we would first have to import that service and pass the path to that file and then Inject it through the constructor of our components class.

```ts
import { Component } from '@angular/core';
import {Inject} from '@angular/core';
// Import our user service
import { UserService } from './user.service';

@Component({
  selector: 'user',
  template: '<h2>User</h2>'
})
export class UserComponent {

  title: string;

  constructor(@Inject(UserService) userService: UserService) {   }
  
  ngOnInit() {
    console.log(userService.getHi());
  }

 }
```

In this example we will simply print out the response from the service to the console.

# Interacting with Http APIs

Typically services are used as an interface between your components and your outside RESTful APIs. If you are wanting to do some form of Http request then you'll have to first add the necessary imports and then within your function return a http request that maps the response and error into json.

```ts
import { Injectable } from '@angular/core';
// we need these imports in order to do any http requests
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ArticleService {

  constructor(private http: Http) { }

  getArticles() {
    return this.http.get("http://localhost:8000/api/lessons")
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

}
```

Once we've returned our http observable we can then call this function and subscribe to the response like so:

```ts
import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  private articles: any;

  constructor(private articleService: ArticleService) {   }

  ngOnInit() { 
    articleService.getArticles().subscribe(
        articles => {
          this.articles = articles.lessons.data;
        },
        err => {
          console.log(err);
        }
      );
  }
}
```

Notice above that we import our newly defined ArticleService at the top and then ask for it as a parameter in our constructor. We then let our dependency injection do it's magic and then we are able to call any of that service's defined methods.

# Video Tutorial

<iframe width="560" height="315" src="https://www.youtube.com/embed/RJHNe1x5ov4" frameborder="0" allowfullscreen></iframe>

# Conclusion

If you found this tutorial helpful or require further assistance then please feel free to let me know in the comments section below.