---
author: Elliot Forbes
date: 2017-04-09T21:17:41+01:00
desc: This article looks at automating your angularjs workflow using the gulp task
  runner.
series: angularjs

tags:

- javascript
title: Automating Your AngularJS Workflow With Gulp
twitter: https://twitter.com/Elliot_F
---

## Automate the Repeatable Things

Gulp is a task runner that allows you to define a series repeatable tasks that can be run any time you need. You can automate boring things like the minification and uglification of your javascript or whatever else you do in order to make your code production ready.

## Setting Up Gulp

Thankfully, Gulp is easily installable using npm.

```bash
npm install --global gulp-cli
```

Once this has successfully run, type `gulp` into your command line and you should be presented with a list of different options if it was installed successfully.

## Setting up your Project

Now that we’ve got gulp-cli installed, we can begin by initializing npm using the `npm init` command. After we’ve done this we can add gulp to our project’s list of dependencies:

```bash
npm install --save-dev gulp
```

## Creating our Gulpfile.js

Now that we’ve got everything in place, we can begin to define our automated build tasks. Create a file called gulpfile.js in your project’s root directory. 

Within this file we will begin by defining our first automated task:

```js
// import the base gulp node module
var gulp = require('gulp');


// here we define a task, the first parameter is the name of our task.
// the second is a function within which we will define what happens
gulp.task('default', function() {
  // place code for your default task here
});
```

If you navigate to your command line now, type `gulp default` and your default tasks should be run for you. Currently it does nothing so let’s expand its functionality a bit.

## Watching Files for Changes

Having a defined task run every time we save a file in our IDE can be brilliant for our productivity. We’ll start by creating a simple watch task that prints hello whenever a file in our project changes.

Gulp provides an API for us if we want to watch files, strangely enough called `gulp.watch`. Let’s take a look at how we would use this:

```js
var gulp = require(‘gulp’);

gulp.task('default', function(){
  console.log("Hello");
});

gulp.task('watch', function() {
  // Watch .js files in all folders within our src directory, when a file changes
  // perform the default task defined above.
  gulp.watch('src/**/*.js', ['default']);
});
```

## Doing Something Useful

Ok, so we’ve got a task that automatically runs whenever one of our files change. Let’s get this task doing something useful. We’ll begin by creating a task that concatenates our javascript files into a bundle.js file that we’ll place in our dist/ directory of our project. The main advantage of this is that we only have to import one bundle.js file into our index.html file and we’ll see any changes we make automatically reflected.

We’ll first need to install a few new things to our project:

```bash
npm install gulp-util gulp-concat gulp-notify gulp-uglify gulp-jshint gulp-sourcemaps
```

```js
var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

gulp.task('scripts', function() {
  return gulp.src(['src/app/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/dist/scripts/'))
    .pipe(notify({message : 'JS files successfully concated and reduced'}));
});

gulp.task('watch', function() {
  // Watch .js files
  gulp.watch('src/**/*.js', ['scripts']);
});
```

If we then run the `gulp watch` task in the command line then this will watch our javascript files, initialize sourcemaps, concat it into a bundle.js file and write everything to that file.

## Taking it Further

So we’ve looked at automatically performing tasks whenever we make a code change. This is just the start of the huge number of things we can do with Gulp, things I’ve done in my own projects include the auto-compilation of scss files into css files and providing a simple local server which hosts and auto-refreshes whenever we make style or html changes.


