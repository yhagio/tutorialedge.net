---
author: Elliot Forbes
date: 2017-04-09T21:05:28+01:00
desc: In this tutorial we look at modules within Angular 2.
series: angular
image: angular.png
tags:
- typescript
title: Angular Modules Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> This tutorial was built of the official Angular 2.2 release. 

In this tutorial we’ll be examining what modules are in Angular 2.0 as well as how to define them, what the best practices are for using modules and what the differences are between 1.* Modules and 2.* modules.

> Official documentation for Angular 2 Modules can be found here: <a target="_blank" href="https://angular.io/docs/ts/latest/guide/ngmodule.html">Angular 2 Modules</a>

# What Are Modules?

Typically a module would contain all the code necessary for one cohesive piece of functionality for your application. So say you were designing an admin dashboard for your website or application. You would have one root module and possibly a module for your articles section, a module for your users section, a module for your stats section and so on. 

Being able to structure your application into a series of smaller blocks of functionality is highly advantageous as it allows for easy extendibility and maintainability further down the line. We can group things like components, directives and services into a single module and should we wish to use any of these things within another module, we would simply import that module at the top of our file like so:

```ts
// import OurService from the ourmodule folder
import { OurService } from ./ourmodule/our.module';
```

Ever Angular application contains at least one route module. Without this your angular application simply wouldn’t work. Modules were introduced in Angular 2's 5th Release candidate and Angular 2 offers in built modules such as the FormsModule, the HttpModule and the RouterModule. These standard modules can all be imported into our application and will allow us to do things like perform http calls or define routes within our application.

```bash
// Notice how all of the sub modules and components are branched off the root module like a tree.
-- Root Module
---- Users Module
------ new user component
-------- new-user.ts|html|spec.ts|css
---- Articles Module
------ New/edit/delete/search article code
---- Statistics Module
------ All our code for gathering statistics and displaying them etc. 
```  


# Our Main Module


Now we know every Angular application must have at the very least a root module. This is typically a class that has been decorated with @NgModule. @NgModule typically tells Angular how to compile and run module code. This root module acts as your applications main entry point.


> Note that it is considered best practice to include the app.module.ts file within your apps root directory.


```ts
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { TestComponent } from './test-component/test-component.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    TestComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```


> We can add our own custom components to the declarations array. Notice I’ve added TestComponent above. 

## The @NgModule Decorator

In order to define a module we need to first define a class within our application. After we've defined this class we would then have to decorate it with the @NgModule decorator. Within this we define our metadata for this module, this metadata declares what components, directives, services and so on belong in this module.

Defining your own new modules is relatively simple in Angular 2. Below you'll find the code needed to define your own UserModule module that contains a user component and also exports this component so that other modules can utilize it.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserComponent } from './user.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    UserComponent
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
```

And next we'll define the very simple UserComponent that the above module references. This component will be bound to the 'user' html tag and will basically print out own h2 title that says 'User Component', exciting I know.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'user',
  template: '<h2>User Component</h2>'
})
export class UserComponent { }
```

In order for us to use the UserComponent within our root AppModule that we defined above we simply have to add the following to our list of imports at the top of our file.

```ts
import { UserModule, UserComponent } from './users/users.module';
```

> If we failed to add UserComponent to the list of exports in our UserModule file then we would be unable to import it in our root Module

Once we've done this we can then utilize the <user></user> tags within any component that lies within our root AppModule.

# Bootstrapping


In Angular 1.* we would typically have used the ng-app directive to bootstrap our angular application. This would act almost like a main function that would act as the starting point for all of our Angular code. 

In Angular 2 this ng-app directive no longer exists and we have to resort to explicitly calling a bootstrap function and passing our root module to this function. 


 ```ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// we import our root module file, notice the lack of file-extension
import { AppModule } from './app.module';


// this compiles and launches our AngularJS Application for us
platformBrowserDynamic().bootstrapModule(AppModule);
```

# Conclusion

I hope you found this tutorial useful. If you want any further help or information then please let me know in the comments section below!