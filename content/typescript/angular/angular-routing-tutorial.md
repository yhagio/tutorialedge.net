---
author: Elliot Forbes
date: 2016-02-14T16:11:58+05:30
desc: In this tutorial we look at how we can define routes in our Angular applications.
series: angular
image: angular.png
tags:
- typescript
title: Angular Routing Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> This tutorial was built using Angular 2.2. Some of the code samples may not work if you are using previous versions

Routing is practically essential in all larger Angular applications, it provides us with the ability to show different sections of html within a master template and basically create a full-blown multi-page application.

Routing in Angular 2+ has changed dramatically from the original AngularJS days where you would have to utilize the $routeProvider and typically define routes in a separate file to that of your module file.

> If you are interested, check out my [AngularJS 1.5 Routing Tutorial](https://tutorialedge.net/angularjs-template-tutorial-ng-view)

# Defining your First Routes

The first thing that you need to do in order to add routing to your application is append the following tag to your index.html page:

```html
<base href="/">
```

This should be placed somewhere within your `<head></head>` tags. The `<base href="/">` tells the Angular router what is the static part of the URL. The router then only modifies the remaining part of the URL.

> Without the base href tag you will see errors like this: <a href="http://stackoverflow.com/questions/34535163/angular-2-router-no-base-href-set">Angular 2 Router no Base href set</a>

Now that we’ve set the our base href tag, we can then move on to defining some routes without your route module file or your `app.module.ts` file if you follow the standard convention.

```js
import { RouterModule, Routes } from '@angular/router';
// …
const appRoutes: Routes = [
  // To represent our index page or root page we simply
  // pass in empty single quotes as our path value
  { path: '', component: HomeComponent },
  // if we want a page on http://ourapp.com/social then 
  // we can define it like so and it will show the SocialComponent 
  { path: 'social', component: SocialComponent },
  // the same goes for settings and email
  { path: 'settings', component: SettingsComponent },
  { path: 'email', component: EmailComponent }
]
// …

@NgModule({
  declarations: [
    // ...
    EmailComponent,
    HomeComponent,
    SettingsComponent,
    SocialComponent
  ],
  imports: [
    // ...
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
 
In this example I’ve imported the RouterModule and Routes from @angular/router and then I’ve defined my routes as appRoutes and passed in 4 different routes that all resolve to differing components.

I’ve then ensured that these components lie within our AppModules declarations array and finally I’ve added the following line to the bottom of our imports array:

```ts
RouterModule.forRoot(appRoutes)
```

Finally we need to define where we want our sub-pages html to render. We can do this by placing:

```html
<router-outlet></router-outlet>
```

In our app.component.html file. In my [example project](https://github.com/elliotforbes/angular-2-admin/blob/master/src/app/app.component.html) you’ll see that I’ve defined this below my app-top-nav which will remain constant for all pages throughout my application. 

# Child Routes

So now that we know how to define our own routes we could keep adding and adding them to our app.module.ts file forever right? Well what happens when we are working with an application that features hundreds or potentially thousands of sub-pages? Our app.module.ts would become un-maintainable and a giant mess of routes. Thankfully Angular provides a solution to this problem by allowing us to define child routes within sub-modules of our application.

In a sub-module of my application I can do the following:

```js
import { RouterModule, Routes } from '@angular/router';
// …
// define all the routes I want for my blog component
export const blogRoutes:Routes = [
  { path: 'blog', component: BlogComponent },
  { path: 'blog/new', component: BlogNewComponent }
]
// …
@NgModule({
  imports: [
    // ...
    RouterModule.forChild(blogRoutes)
  ],
  declarations: [
    BlogComponent,
    BlogNewComponent
  ],
  providers: [
    BlogService
  ]
})
export class BlogModule { }
```

Above you’ll see that it looks almost identical to our `app.module.ts` except for one key difference. Notice that in our module’s imports we’ve changed our RouterModule import to use the forChild method and we’ve passed in our sub-modules defined routes:

```ts
RouterModule.forChild(blogRoutes)
```

# Navigation Between Routes in HTML

Now that we’ve defined our routes we need to provide a means to navigate between these routes in our html. If we were wanting to link to any other route in our application then we can use the following:

```html
<a routerLink="/settings">Settings</a>
```

The above `<a/>` tag would link to our settings page that we defined above.

# A Live Example

Should you wish to see a live example of Angular routing then feel free to checkout my Angular Admin repo: [Angular-2-Admin-Dashboard](https://github.com/elliotforbes/angular-2-admin.git)

# Conclusion

If you found this tutorial helpful or need further assistance then please do not hesitate to let me know in the comments section below. 

> Please check out the <a href="https://angular.io/docs/ts/latest/guide/router.html">official angular routing documentation</a> for more in-depth resources

## Further Reading

* [Angular Detecting Route Changes](/typescript/angular/angular-detecting-route-changes/)
* [Angular Getting Current Location using Location Provider](/typescript/angular/angular-get-current-route-location/)