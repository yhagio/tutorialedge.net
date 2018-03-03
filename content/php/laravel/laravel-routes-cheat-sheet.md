+++
title = "Laravel 5.1 Routes Cheat Sheet"
draft = true
date = "2017-04-15T09:22:16+01:00"
desc = "A simple primer on all the different ways to handle routes in laravel 5.1. We cover route groups, prefixes, middleware and simple routes."
tags = ["laravel-5.2", "php"]
series = ["laravel-5.2"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

## Static Pages:

<p>Static pages are just simple pages that don’t necessarily change too much. A good example of pages that would typically fall under this umbrella are your About and Contact us pages. These routes point back to views that have already been created in your resources/views folder. I.e resources/views/contact.blade.php would be the file for our contact view returned below.</p>

```php
Route::get(‘/contact’, function() 
{
    return view(‘contact’);
});

Route::get(‘/about’, function()
{
    return view(‘about’);
});
```

<p>Check that these have worked by calling:</p>

```bash
php artisan route:list
```

<p>If you were to open up your app and navigate to http://localhost:8000/about you should see your about.blade.php file rendered in full.</p>

## Route Prefixes:

<p>A good way to create certain sections of your site such as a video section in which the uri would look something like this: http://localhost:8000/videos/latestvideo would be to use route prefixes like so:</p>

```php
Route::group(['as' => 'videos::', 'prefix' => 'videos'], function () {
   Route::get(‘latestvideo’, ['as' => 'latestvideo', function () {
       return "super amazing latest video";
   }]);
});
```

## Route Groups:

<p>Route groups are an great way to create different sections of your site such as admin sections.</p>

```php
Route::group(['as' => 'admin::', 'prefix' => 'admin'], function () {
   Route::get('dashboard', ['as' => 'dashboard', function () {
       return "hello";
   }]);
});
```

<p>If you navigate to admin/dashboard then you should be able to see hello printed out in the browser. Of course you can change this to point to another view if you desired.</p>

<h3>Adding more routes to a Group</h3>

<p>Adding more routes to a route group is as simple as placing them within the group array like so:</p>

```php
Route::group(['as' => 'admin::', 'prefix' => 'admin'], function () {
   Route::get('dashboard', ['as' => 'dashboard', function () {
       return "hello";
   }]);
   
   Route::get('users', ['as'=>'users', function() {
       return "users";
   }]);
});
```

## Adding Middleware to Groups:

<p>Say for instance we wanted to create an admin only section of the site. We’d want to create a filter that wouldn’t allow any unauthorised access to the admin section. We can do that like so:</p>

```php
Route::group(['as' => 'admin::', 'prefix' => 'admin', 'middleware'=>'auth'], function () {
   Route::get('dashboard', ['as' => 'dashboard', function () {
       return "hello";
   }]);
   
   Route::get('users', ['as'=>'users', function() {
       return "users";
   }]);
});
```

<p>You’ll notice if you call php artisan route:list now you should see the auth middleware applied to both admin/dashboard and admin/users. You’ll have to create your own auth/login and auth/register views within Laravel 5.1 as these have been removed in the latest version.</p>

## Custom 404 Route:

<p>Laravel 5.1 takes care of 404 errors for you so all you have to do is to create your custom 404 page: resources/views/errors/404.blade.php and the rest is handled for you.</p>