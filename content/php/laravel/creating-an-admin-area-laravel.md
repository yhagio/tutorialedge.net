---
author: Elliot Forbes
date: 2017-04-15T09:35:37+01:00
desc: This tutorial teaches you how to utilize route middleware in order to authenticate
  admin users for a backend of a laravel 5 site.
series:
- laravel-5.2
tags:
- laravel-5.2
- php
title: Creating an Admin Area with Laravel 5
twitter: https://twitter.com/Elliot_F
---

> This tutorial assumes prior knowledge of Laravel 5. 

<h2>Adding a new Column to Users Table</h2>

<p>In order for this authentication to work, we are going to need to have a column that lets us distinguish between either admins or regular users. In this case I chose to extend the pre-existing users table by adding an integer column to the schema. Once you've added this rollback and then migrate so that you have access to this new column.</p>

<h2>Using Middleware</h2>

<p>Laravel 5's new middleware mechanism offers an exceptionally easy way to authenticate users and thus create an admin backend to manage any web apps. HTTP middleware provide a convenient mechanism for filtering HTTP requests entering your application, by utilizing these filters we can determine if the user is both logged in and features the correct access levels required to access the sensitive backend of our site. If the user requesting access to the backend of the site is not authenticated, the middleware redirects the user to the login screen. </p>

<h3>Creating our AdminMiddleware</h3>

<p>Open up your terminal and type the following in your projects root folder. </p>

```bash
php artisan make:middleware AdminMiddleware
```

<p>This will contain the code that will authenticate our user and ensure that they have the appropriate access levels.</p>

<h3>Adding Middleware to Kernel.php</h3>

<p>Once we've created our new AdminMiddleware we need to assign the middleware a short-hand key by opening up Kernel.php under App > Http and add the following line to your protected $routeMiddleware array.</p>

```php
<?php
  /**
  * The application's route middleware.
  *
  * @var array
  */
  protected $routeMiddleware = [
    'auth' => 'App\Http\Middleware\Authenticate',
    'auth.basic' => 'Illuminate\Auth\Middleware\AuthenticateWithBasicAuth',
    'guest' => 'App\Http\Middleware\RedirectIfAuthenticated',
        # LINE TO BE ADDED HERE:
        'admin' => 'App\Http\Middleware\AdminMiddleware',
  ];
```

<h3>Utilizing our Middleware in our Route Options:</h3>

<p>Now that we've created our middleware and assigned it a short-hand key in our kernel.php file we can start using it in our Routes.php file:</p>

```php
Route::get('admin', ['middleware' => 'admin', 'uses' => 'AdminController@index']);
```

<h2>Updating our AdminController</h2>

<p>Our AdminController's index function mentioned in the route above will look something like this to return the index page:</p>

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Log;

class Authenticate
{
  /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \Closure  $next
    * @param  string|null  $guard
    * @return mixed
    */
  public function handle($request, Closure $next, $guard = null)
  {
    Log::info("Authenticating Users...");
    if (Auth::guard($guard)->guest()) {
      if ($request->ajax() || $request->wantsJson()) {
        Log::info("Unauthorized ajax request.");
        return response('Unauthorized.', 401);
      } else {
        Log::info("Redirecting to login page.");
        return redirect()->guest('/auth/github');
      }
    }
  }
}
```

<h3>Testing it Works</h3>

<p>Now that you've set up your AdminController correctly and applied the AdminMiddleware to your 'admin' route, you should see that you are redirected back to the login screen should you happen to not be authenticated. This was just a quick and easy way to create an admin backend that only specific user groups can access, however if you believe there is a better way then please let me know in the comments section below!</p>