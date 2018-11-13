---
title: "Stability Patterns in Angular"
date: 2018-10-22T12:46:35+01:00
desc: "In this tutorial, we'll will learn about stability patterns in Angular in this article by Mathieu Nayrolles"
series:
- Angular
tags:
- Design patterns
author: Mathieu Nayrolles
twitter: https://twitter.com/mathieunls
---

Stability is one of the cornerstones of software engineering. No matter what, you must expect the worst from your environment and your users, and be prepared for it. Your Angular applications should be able to operate in a degraded mode when your backend is burning and smoothly recover when it comes back online. In this article, you’ll learn about stability patterns, timeouts and the circuit breaker.

# Timeouts

You can never trust an API to work as expected, even if it is your own API. You should always expect everything that can go wrong to, well, go wrong. One of the less harmful things that can happen when trying to communicate with your backend is that it won't respond. While this one-way communication is harmless for your Angular applications, it is most frustrating for your users.

Fortunately, there is a very simple way to prevent your user from getting frustrated about unresponsive APIs: timeouts. A timeout is a simple defense mechanism that allows your application to wait a fixed amount of time and not a millisecond more. Create a new project to test it out:
ng new timeoutcd timeoutng g service API

This will create a new project and a service called API. In the first glance, there is not much to look at:

```ts
import { Injectable } from '@angular/core'; 
 
@Injectable() 
export class ApiService { 
 
  constructor() { } 
 
} 
Add the HttpClient component in app.module.ts as follows:
import { BrowserModule } from '@angular/platform-browser'; 
import { NgModule } from '@angular/core'; 
import { HttpClientModule } from '@angular/common/http'; 
 
import { AppComponent } from './app.component'; 
import { ApiService } from './api.service'; 
 
@NgModule({ 
  declarations: [ 
    AppComponent 
  ], 
  imports: [ 
    BrowserModule, 
    HttpClientModule 
  ], 
  providers: [ApiService], 
  bootstrap: [AppComponent] 
}) 
export class AppModule { } 
```

Now, inject the HttpClient component into your API service client in order to have access to its methods:

```ts
import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
 
@Injectable() 
export class ApiService { 
 
  constructor(private http:HttpClient) { } 
 
} 
```

Add a new method in APIService, which simply makes an http.get request to the GitHub repository that contains the code for this article (https://github.com/MathieuNls/Angular-Design-Patterns-and-Best-Practices):

```ts
import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
 
@Injectable() 
export class ApiService { 
 
  constructor(private http: HttpClient) { } 
 
  public getURL(url: string): void { 
    this.http.get(url) 
    .subscribe(data => { 
      console.log(data); 
    }); 
  }  
 
} 
```

This is followed by an injection of ApiService and a call to the new getURL method in the AppComponent:

```ts
import { Component } from '@angular/core'; 
import { ApiService } from './api.service'; 
 
@Component({ 
  selector: 'app-root', 
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css'] 
}) 
export class AppComponent { 
  title = 'app'; 
 
  constructor(private api: ApiService){ 
    api.getURL("https://github.com/MathieuNls/Angular-Design-Patterns-and-Best-Practices") 
  } 
}
```

Now, if you were to execute this, you would have a gracious HTTP response, and the HTML of the web page would be printed out in the console. The problem, however, is that you have no countermeasure in place in the case that github.com is down and does not respond:

```ts
import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
 
@Injectable() 
export class ApiService { 
 
  constructor(private http: HttpClient) { } 
 
  public getURL(url: string): void { 
 
    let timeout; 
 
    let sub = this.http.get(url) 
      .subscribe((res) => { 
        console.log(res); 
        clearTimeout(timeout) 
      }); 
 
    timeout = setTimeout( 
      () => { sub.unsubscribe() }, 1000 
    ); 
  } 
 
} 
```

In this version of the getURL function, you must first declare a timeout variable that will contain a NodeJS timeout. Then, instead of performing a regular HTTP.get, you will subscribe to the response. Finally, after the subscription to the result, assign the timeout variable with the setTimeout function.

Use this function to unsubscribe from the response after 1,000 ms. You only wait one second for the http reply. If the reply does not arrive within that time, you automatically unsubscribe and allow your application to continue. Of course, your users will have to be warned in some way that the operation was unsuccessful.

# Circuit breaker 

The timeout pattern is efficient at protecting the patience of your users and, ultimately, your Angular application. However, in the case that the API is not responding because something went wrong on the server side, say 80% of your server is down and the remaining 20% is trying to manage the load, your clients will most likely repeatedly retry the action that timed out. This puts even more stress on your dying backend infrastructure.

A circuit is an automatic device for stopping the flow of the current in an electric circuit as a safety measure. Circuit breakers are used to detect failures and encapsulate the logic of preventing a failure from reoccurring constantly (during maintenance, temporary external system failure, or unexpected system difficulties).

Within the framework of an Angular app, a circuit breaker will prevent the client from performing API requests when there are too many failures. After a given amount of time, the circuit will allow some of the queries to go through and consume the API. If these queries return without any problems, then the circuit will close itself and allow all the requests to go through:

In the preceding diagram, you can see how the circuit breaker operates. All requests go through the circuit breaker, and if the supplier answers the requests in time, the circuit stays closed. When problems start occurring, the circuit breaker notices this, and if enough requests time out, then the circuit opens and prevents requests from going through.

Finally, after a given amount of time, the circuit breaker tries to resend requests to the supplier:

From an implementation point of view, you’ll need the ApiStatus and Call classes, which are responsible for keeping track of the call you make to diverse APIs:

```ts
//ApiStatus class 
class ApiStatus { 
 
  public lastFail: number 
  public calls: Call[] 
 
  constructor(public url: string) { } 
 
  //Compute the fail percentage 
  public failPercentage(timeWindow: number): number { 
 
    var i = this.calls.length - 1; 
    var success = 0 
    var fail = 0; 
 
    while (this.calls[i].time > Date.now() - timeWindow && i >= 0) { 
      if (this.calls[i].status) { 
        success++; 
      } else { 
        fail++; 
      } 
   i--; 
    } 
 
    return fail / (fail + success) 
  } 
 
} 
```

The APIStatus contains the statistics for the on root API. Take into account that you might use several APIs in your application. Each API has to be linked to its own circuit breaker. First, you have the lastFail variable, which contains the date at which the last call to this API failed. 

Then, you have a calls array that contains all the calls made to a given API. In addition to the constructor that defines the URL property, you have the failPercentage function. This function is responsible for computing the percentage of calls that failed within the timeWindows time. To do this, iterate over all the calls in a reverse chronological order until you reach Date.now()–timeWindow or the end of the calls array. 

Within the while loop, increment two number variables called success and fail with regard to the status of the current call. In the end, return the percentage of failed calls. This percentage will be used to determine the status of the circuit breaker.

The Call class is rather simple:

```ts
//An Api Call 
class Call { 
  constructor(public time: number, public status: boolean) { } 
} 
```

It only contains two properties: time and status. You’re now ready to implement an API client for your Angular app that implements a circuit breaker. First, create the class:

```ts
import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
 
@Injectable() 
export class ApiwithBreakerService { 
 
  constructor(private http: HttpClient) { } 
```

Then, add the property for ApiwithBreakerService:

```ts
  private apis: Map<string, ApiStatus>; 
  private failPercentage: number = 0.2; 
  private timeWindow : number = 60*60*24; 
  private timeToRetry : number = 60;
```

These properties will allow you to implement the circuit breaker pattern. First, you have a map of string, an ApiStatus that is used to store the API status of many APIs. Then, you have failPercentage, which defines how many calls can fail, as a percentage, before you open the circuit. 

The timeWindow variable defines the amount of time that is used to compute failPercentage. Here, you have a maximum of 20% of calls that can fail within a 24-hour window before you open this circuit and prevent other calls from being made. Finally, you have timeToRetry, which states how long you have to wait before trying to reclose the circuit.

Here is the modified getURL function from the timeout section:

```ts
  //Http get an url 
  public getURL(url: string): void { 
 
    var rootUrl = this.extractRootDomain(url); 
 
    if(this.isClosed(rootUrl) || this.readyToRetry(rootUrl)){ 
      let timeout; 
 
      let sub = this.http.get(url) 
        .subscribe((res) => { 
          console.log(res); 
          clearTimeout(timeout); 
          this.addCall(rootUrl, true); 
        }); 
   
      timeout = setTimeout( 
        () => {  
          sub.unsubscribe(); 
          this.addCall(rootUrl, false); 
        }, 1000 
      ); 
    } 
  } 
```

The core functionalities are same as the previous section with the timeout, but they are embedded in an if statement:

```ts
if(this.isClosed(rootUrl) || this.readyToRetry(rootUrl)) 
```

The if statement checks if the circuit is closed or if you are ready to retry on an open circuit. You can also add calls to the addCall function:

```ts
  //Add a call 
  private addCall(url: string, status: boolean) { 
 
    let res = this.apis.get(url); 
 
    if (res == null) { 
      res = new ApiStatus(url); 
      this.apis.set(url, res); 
    } 
 
    res.calls.push(new Call(Date.now(), status)); 
 
    if(!status){ 
      res.lastFail = Date.now(); 
    } 
  } 
```

The addCall function adds a new call to an ApiStatus that's stored inside the apis map. It also updates the lastFail properties of the ApiStatus instance if the call was unsuccessful.

What remains are the readyToRetry and isClosed functions:

```ts
  //Are we ready to retry 
  private readyToRetry(url:string): boolean { 
 
    return this.apis.get(url).lastFail < (Date.now() - this.timeToRetry) 
  } 
 
  //Is it closed ? 
  private isClosed(url :string) : boolean { 
 
    return this.apis.get(url) == null ||  
      !(this.apis.get(url).failPercentage(this.timeWindow) > this.failPercentage); 
  } 
```

In the readyToRetry function, simply check that the latest fail is older than the time it is now minus timeToRetry. In the isClosed function, check if the percentage of failed calls during the time window is greater than the maximum allowed. Here is the complete implementation:

```ts
import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
 
//ApiStatus class 
class ApiStatus { 
 
  public lastFail: number 
  public calls: Call[] 
 
  constructor(public url: string) { } 
 
  //Compute the fail percentage 
  public failPercentage(timeWindow: number): number { 
 
    var i = this.calls.length - 1; 
    var success = 0 
    var fail = 0; 
 
    while (this.calls[i].time > Date.now() - timeWindow && i >= 0) { 
      if (this.calls[i].status) { 
        success++; 
      } else { 
        fail++; 
      } 
      i--; 
    } 
    return fail / (fail + success) 
  } 
 
} 
 
//An Api Call 
class Call { 
  constructor(public time: number, public status: boolean) { } 
} 
 
@Injectable() 
export class ApiwithBreakerService { 
 
  constructor(private http: HttpClient) { } 
 
  private apis: Map<string, ApiStatus>; 
  private failPercentage: number = 0.2; 
  private timeWindow : number = 60*60*24; 
  private timeToRetry : number = 60; 
 
  //Http get an url 
  public getURL(url: string): void { 
 
    var rootUrl = this.extractRootDomain(url); 
 
    if(this.isClosed(rootUrl) || this.readyToRetry(rootUrl)){ 
      let timeout; 
 
      let sub = this.http.get(url) 
        .subscribe((res) => { 
          console.log(res); 
          clearTimeout(timeout); 
          this.addCall(rootUrl, true); 
        }); 
   
      timeout = setTimeout( 
        () => {  
          sub.unsubscribe(); 
          this.addCall(rootUrl, false); 
        }, 1000 
      ); 
    } 
  } 
 
  //Add a call 
  private addCall(url: string, status: boolean) { 
 
    let res = this.apis.get(url); 
 
    if (res == null) { 
      res = new ApiStatus(url); 
      this.apis.set(url, res); 
    } 
 
    res.calls.push(new Call(Date.now(), status)); 
 
    if(!status){ 
      res.lastFail = Date.now(); 
    } 
  } 
 
  //Are we ready to retry 
  private readyToRetry(url:string): boolean { 
 
    return this.apis.get(url).lastFail < (Date.now() - this.timeToRetry) 
  } 
 
  //Is it closed ? 
  private isClosed(url :string) : boolean { 
 
    return this.apis.get(url) == null ||  
      !(this.apis.get(url).failPercentage(this.timeWindow) > this.failPercentage); 
  } 
 
  private extractHostname(url: string) : string { 
    var hostname; 
    //find & remove protocol (http, ftp, etc.) and get hostname 
 
    if (url.indexOf("://") > -1) { 
      hostname = url.split('/')[2]; 
    } 
    else { 
      hostname = url.split('/')[0]; 
    } 
 
    //find & remove port number 
    hostname = hostname.split(':')[0]; 
    //find & remove "?" 
    hostname = hostname.split('?')[0]; 
 
    return hostname; 
  } 
 
  private extractRootDomain(url: string) : string{ 
    var domain = this.extractHostname(url), 
      splitArr = domain.split('.'), 
      arrLen = splitArr.length; 
 
    //extracting the root domain here 
    //if there is a subdomain  
    if (arrLen > 2) { 
      domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1]; 
      //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk") 
      if (splitArr[arrLen - 1].length == 2 && splitArr[arrLen - 1].length == 2) { 
        //this is using a ccTLD 
        domain = splitArr[arrLen - 3] + '.' + domain; 
      } 
    } 
    return domain; 
  } 
} 
```

Note that you have two helper functions that do not directly participate in the implementation of the circuit patterns, only extracting the root URL of a call in order to compute a shared status by root APIs. Thanks to these helper functions, you can have http://someapi.com/users and http://someapi.com/sales share the same status, while http://anotherapi.com/someCall has its own separated ApiStatus.

The timeout and the circuit breaker patterns work in parallel in order to reduce self-denial. Self-denial is the art of dooming your backend servers yourself. This tends to happen when you have an application behaving improperly and making thousands of calls per second to your backend architecture.

If you found this article interesting, you can explore Mathieu Nayrolles’ [Angular Design Patterns](https://amzn.to/2T4TRmS) to make the most of Angular by leveraging design patterns and best practices to build stable and high performing apps. Angular Design Patterns is an insightful journey through the most valuable design patterns, and it will provide clear guidance on how to use them effectively in Angular. 
