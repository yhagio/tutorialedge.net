---
author: Elliot Forbes
date: 2016-02-14T16:11:58+05:30
desc: In this tutorial we look at how we can use cookies in our Angular 2 Applications
series: angular
image: angular.png
tags:
- typescript
title: Angular Cookies Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> This tutorial was built using Angular 2.2. 

Cookies are small packages of information that are typically stored by your browser and websites tend to use cookies for multiple things. Cookies persist across multiple requests and browser sessions should you set them to and they can be a great method for authentication in some web apps.

> Check out my AngularJS 1.* tutorial on [storing information in cookies](/javascript/angularjs/angularjs-store-cookies-tutorial/)

# Limitations of Cookies

Typically we can only store no more than 20 cookies per web server and no more than 4KB of information in each cookie and they can last indefinitely should you choose to specify the max-age attribute. 

# Setting Up

In order to play about with cookies in Angular 2 we’ll have to install the `angular2-cookie` library by typing the following within our project:

```bash
npm install angular2-cookie --save
```

This should download angular2-cookies to our project’s node_modules folder and also add it as a dependency to our project.

# Implementation

Once we’ve successfully added angular2-cookie to our project we can set about using it. It’s recommended that you import the CookieService within your module file and then add it to your providers array like so:

```ts
/*
 * Custom Libraries
 */
import { CookieService } from 'angular2-cookie/services/cookies.service';

// .. all other imports

@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    // ..
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Then once we’ve added it as a provider we can utilize it in one of our component files like so:

```ts
import { Component } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _cookieService:CookieService){}

  ngOnInit() {
    this._cookieService.put('test', 'test');
    console.log("Set Test Cookie as Test");
  }

  getCookie(key: string){
    return this._cookieService.get(key);
  }
}
```

# Setting Cookies

In order to set cookies using this library we would have to use the following method:

```ts
// the put method takes in the name of the cookie and the value for that cookie.
// if we wanted to define cookie options then we would pass in a third parameter to 
// this method containing those options.
this._cookieService.put('test', 'test');
```

# Retrieving Cookies

Once we have successfully set a cookie, we can then retrieve that same cookie by using the `.get(cookie)` method like so:

```ts
// This would retrieve the previously defined 'test' cookie 
this._cookieService.get('test');
```

# Conclusion

If you found this tutorial useful or need further information on working with cookies in Angular 2 then please let me know in the comments section below.