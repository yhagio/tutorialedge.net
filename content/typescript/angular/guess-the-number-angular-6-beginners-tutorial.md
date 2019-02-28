---
author: Kevin Hennessy
date: 2018-07-25T15:42:51+01:00
desc:
  Learn how to create a customary Hello Angular App – Guess the Number! in this
  tutorial by Kevin Hennessy, a developer, team lead, and solutions architect,
  working on web-based projects, primarily using the Microsoft technology stack.
image: angular.png
series: angular
tags:
  - typescript
title: How to Create a Customary Hello Angular App – Guess the Number!
twitter: https://twitter.com/TutorialEdge
---

_Learn how to create a customary Hello Angular App – Guess the Number! in this
tutorial by Kevin Hennessy, a developer, team lead, and solutions architect,
working on web-based projects, primarily using the Microsoft technology stack._

This article will help you create a simple “Guess the Number!” game, which will
serve as a platform to launch you into the world of Angular and showcase the
framework's capabilities. The objective of the game is to guess a random
computer-generated number in as few tries as possible.

This is how the game looks:

![Angular 6 Guess the Number](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/javascript/angular/guess-the-number-angular-6-01.png)

# Building Guess the Number!

With component-based design, you’ll start by looking at the UI and expected
behavior, and then encapsulate all of this into a building block called
component. This component is then hosted on your page. Within the component, you
can separate the UI into a view and the behavior into a class, with the
appropriate properties and methods needed to support the behavior.

Okay, now identify the UI and behavior that you’ll need for your application.

# Designing your first component

To determine what needs to go into your component, you’ll start by detailing the
features that you want the app to support:

- Generating random numbers (`original`)
- Providing input for a user to guess the value (`guess`)
- Tracking the number of guesses already made (`noOfTries`)
- Giving the user hints to improve their guess based on their input
  (`deviation`)
- Giving a success message if the user guesses the number correctly
  (`deviation`)

Now that you have your features, you can determine what you need to display to
the user and what data you need to track. For the preceding feature set, the
elements in parentheses denote the properties that will support those features
and will need to be included in your component.

# Developing your first component

Now that you have a design for your first component, you can start developing it
using the Angular Command Line Interface (Angular CLI). The Angular CLI enables
you to start building Angular applications and deploying them through a series
of console commands.

To use the Angular CLI you must first install Node.js and npm (Node's package
manager). Installing Node also installs npm. For this example, the versions used
are Node.js version 8.9.4 and npm version 5.6.0.

Once Node and npm are installed, open Command Prompt and type the following:

```s
$ npm install -g @angular/cli
```

This installs the Angular CLI that you’ll need use to start building your
application. Now from a directory on your local machine, enter the following
commands:

```s
$ ng new guessthenumber --inlineTemplate
$ cd guessthenumber
$ ng serve
```

With the first command, the Angular CLI will create a new Angular project on
your local machine (the `--inlineTemplate` flag creates a template within your
component). With the second command, you are navigating to the directory that
the Angular CLI has created for your new project. The third command launches the
application, which you can view at `http://localhost:4200/`. If you do that you
should see a standard default Angular page in the browser.

# Installing Bootstrap

There is one more step before you build out the specifics of your application.
Add the Bootstrap library to enhance the look and feel of your application.
First, stop the application by typing Ctrl + C in the Terminal from which it was
launched and enter Y when asked if you want to terminate the batch job. Next,
from the guessthenumber directory, enter the following command:

```s
$ npm install bootstrap --save
```

This will install the latest release of Bootstrap. You may see a few warning
messages about unmet dependencies. You can ignore them.

Next, configure your new project to include the Bootstrap stylesheet:

In the guessthenumber directory, find and open the file angular.json.

In that file, find the projects property, which contains the settings in your
new project.

Then, find the styles property within architect.build.options and you will see
that it contains an array that holds styles.css, the default style sheet for
your new project.

Add to that array the location of the bootstrap.min.css style sheet:

```js
"styles": [
   "node_modules/bootstrap/dist/css/bootstrap.min.css",
   "src/styles.css"
],
```

# What do you have so far?

If you take a look in the guessthenumber directory, where the Angular CLI has
been created, you’ll see a large number of files. This may look overwhelming at
first, but the important thing to understand is that the Angular CLI has
generated all these files for you with just a few command line statements. In
this way, it makes getting started with an Angular application much smoother and
easier. It takes the grunt work out of the process and enables you to be able to
build and serve your application with minimal effort.

Before turning to build out the specifics of your application, take a look at
one of the key files that will be used to get your application up and running.

The example code is available on GitHub for downloading at
https://github.com/chandermani/angular6byexample. It is organized in checkpoints
that allow you to follow along step by step as you build your sample project.
The branch to download is GitHub's Branch: checkpoint1.1. Look in the
guessthenumber folder for the code covered here. If you are not using Git,
download the snapshot of Checkpoint 1.1 (a ZIP file) from the following GitHub
location: https://github.com/chandermani/angular6byexample/tree/checkpoint1.1.
Refer to the readme.md file in the guessthenumber folder when setting up. the
snapshot for the first time.

# The host file - index.html

Navigate to the src folder in the guessthenumber directory and open index.html.
You will see the following:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Guessthenumber</title>
    <base href="/" />

    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

`index.html` is the host file for your application. It will be launched by the
browser when the application is first run and will host the components in your
application. If you have any exposure to web development, most of the HTML code
in this file should look familiar. It has standard html, head, and body tags
along with a couple of optional tags, one a meta tag for the viewport, which
configures how the app will display in a mobile device, and the other a link to
an Angular favicon image that will display on the tab in the browser in which
the application is loaded.

# Custom element

However, there is one more important tag on the page that may not look as
familiar to you:

```html
<app-root></app-root>
```

This tag is a custom element. It instructs Angular where to inject the component
that you build.

# The component file

Now turn to build out the specifics of your application. The Angular CLI has
already given us a start by generating a component file for us. Of course, that
file does not contain any of the particulars of your application, so you’ll have
to modify it. To do this, navigate to the src folder in the app directory and
open app.component.ts.

# The import statement

At the top of the page, you will find the following line:

```js
import { Component } from "@angular/core";
```

This is an import statement. It tells you what modules you’ll load and use in
your component. In this case, you can select one module that you need to load
from Angular: Component.

You'll notice that the location from which you’ll importing is not identified as
a path or directory within your application. Instead, it is identified as
`@angular/core`. Angular has been divided into barrel modules that are prefixed
with `@angular`.

These barrels combine several modules that are logically related. In this case,
you’ll indicate that you want to import the core barrel module, which in turn
brings in the Component module.

# Decorator

Next, replace the code block that starts with `@Component` with the following:

```ts
@Component({
 selector: 'app-root',
 template: `
  <div class="container">
      <h2>Guess the Number !</h2>
        <div class="card bg-light mb-3">
           <div class="card-body">
              <p class="card-text">Guess the computer generated random number between 1
                                                                          and 1000.</p>
           </div>
        </div>
       <div>
         <label>Your Guess: </label>
         <input type="number" [value]="guess" (input)="guess = $event.target.value" />
         <button (click)="verifyGuess()" class="btn btn-primary btn-sm">Verify</button>
         <button (click)="initializeGame()" class="btn btn-warning btn-
                                                               sm">Restart</button>
       </div>
      <div>
         <p *ngIf="deviation<0" class="alert alert-warning">Your guess is higher.</p>
         <p *ngIf="deviation>0" class="alert alert-warning">Your guess is lower.</p>
         <p *ngIf="deviation===0" class="alert alert-success">Yes! That's it.</p>
      </div>
      <p class="text-info">No of guesses :
        <span class="badge">{{noOfTries}}</span>
      </p>
  </div>
  `
})
```

This is the decorator for your component and it is placed directly above the
class definition. The @ symbol is used to identify a decorator. The @Component
decorator has a property called selector, and you may not be surprised to see
that it is set to the <app-root> tag in your HTML page.

This setting tells Angular to inject this component into that tag on the HTML
page.

The decorator also has a property called template, and this property identifies
the HTML markup for your component. Notice the use of backticks for rendering
the template string over multiple lines. Alternatively, you can set a
templateUrl property that would point to a separate file.

# Defining the class

Now replace the code block that begins with export class AppComponent with the
following:

```ts
export class AppComponent {
  deviation: number;
  noOfTries: number;
  original: number;
  guess: number;

  constructor() {
    this.initializeGame();
  }
  initializeGame() {
    this.noOfTries = 0;
    this.original = Math.floor(Math.random() * 1000 + 1);
    this.guess = null;
    this.deviation = null;
  }
  verifyGuess() {
    this.deviation = this.original - this.guess;
    this.noOfTries = this.noOfTries + 1;
  }
}
```

If you have been developing in ES5, the version of JavaScript that is supported
in all current browsers, you may not be familiar with the use of classes here.

The class file holds the code that you’ll need to use to run your component. At
the top, you can give the class a name, which is AppComponent. Then, inside the
curly braces, you have four lines that declare the properties for your class.
These are similar to ES5 variables, and you can use them to hold the values that
you’ll need to run the application (you'll notice that these are the four values
that you identified when you designed your component).

What makes these properties different from standard JavaScript variables is that
each property name is followed by : and a number. These set the type of the
property. This indicates that each of these four properties will be set to the
number type, which means you’ll expect the values of all of these properties to
be numbers. The ability to specify types for your properties is provided by
TypeScript and it is not available in standard JavaScript.

As you move down, you’ll see three blocks of the script that have names,
followed by parentheses, and then curly braces with several lines of script
inside them. These are the methods for your class, and they contain the
operations that your component will support. They are a lot like standard
JavaScript functions.

The first of these methods is constructor(), which is a special method that will
run when an instance of your component is first created. Here, the constructor
does only one thing when the class is created; it calls another method in your
class, called initializeGame().

The initializeGame() method sets the starting values of the four properties in
the class using the assignment operator =. You set these values to null or zero,
except for original, in which you use a random number generator to create the
number to be guessed.

The class holds one more method called verifyGuess(), which updates the
deviation and noOfTries properties. This method is not being called from within
the component class; instead, it will be called from the view. You'll also
notice that your methods refer to properties in the same class by prepending
this to them.

# The module file

Every Angular component must be contained within an Angular module. This means
that at a minimum you must add at least one Angular module file to the root of
your application. You can call this the root module. For a simple application
like Guess the Number!, the root module may be the only module you’ll need.

Now, take a look at your Angular module file. Again the Angular CLI has created
this file for you. Open app.module.ts in the app directory within the src folder
and you will see the following:

```ts
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

The first two statements import BrowserModule and NgModule. Notice that, while
NgModule is being imported from @angular/core, BrowserModule is being imported
from a different module: @angular/platform-browser. What's significant here is
that the import is not coming from @angular/core, but from a separate module
that is specific to browser-based applications. This is a reminder that Angular
can support devices other than browsers, such as mobile devices, hence the need
to place BrowserModule into a separate module.

The other import in this file is your component AppComponent. If you go back to
that component you’ll notice that export is added in front of the class
definition, which means you’re using module loading within your own application.

Next, define a new component AppModule. There is nothing in the class itself
other than a few imports and a decorator: @ngModule. You can use this decorator
to configure the module in your application. The first property is declarations
and with that property, you can provide an array of the components that will be
used in your application. In this case, you have only one component:
AppComponent.

Next, add imports, which in this case include the BrowserModule. As the name
suggests, this module will provide the functionality needed to run your
application in a browser. The next property is providers. This property is used
to register providers (such as services and other objects) that will be
available to be used throughout your application through dependency injection.
You have no need for providers in the simple application you’re building here,
so this property is empty.

Finally, set the bootstrap property. This indicates the first component that
will be loaded when your application starts up. Again this is the AppComponent.

With this configuration in place, you’re now ready to bootstrap your component.

# Bootstrapping

The class definition for AppComponent operates as a blueprint for the component,
but the script inside it does not run until you’ve created an instance of the
component. In order to run your application, you need something in your
application that creates this instance. The process of doing that requires you
to add code that bootstraps your component.

In the src folder, look for a file named main.ts. Open it and you will see the
following code:

```ts
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
```

As you can see, you’ll import enableProdMode from @angular/core and the
platformBrowserDynamic module from @angular/platform-browser-dynamic. Like the
import of BrowseModule in the appModule file, this latter import is specifically
for browser-based applications. Next, add an import of your AppModule and a file
called environment that is located in the environments directory of your
application.

In the next lines of code, check to see if the constant environment in the
environment file has its production property set to true, and if so, call
enableProdMode(), which as the name suggests enables production mode. The
default setting for environment.production is false, which is fine for your
purposes here since you’re not running the application in production mode.

Finally, call the platformBrowserDynamic().boostrapModule method with your
AppModule as a parameter. The bootstrapModule method then creates a new instance
of your AppModule component, which in turn initializes your AppComponent, which
you’ve marked as the component to bootstrap. It does that by calling your
component's constructor method.

# You're up and running!

Well, the app is complete and ready to be tested! From the guessthenumber
directory, type the following:

```s
$ ng serve
```

The app should appear on your browser.

If you glance at your component file and template, you should be mightily
impressed with what you’ve achieved. You’re not writing any code to update the
UI when the application is running. Still, everything works perfectly.

If you found this article helpful, you can explore
[Angular 6 by Example - Third Edition](https://amzn.to/2LJU8uJ). This book will
help you harness the power of Angular components, router, forms, directives and
much more to build professional-grade web apps with TypeScript.
