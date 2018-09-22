---
author: Elliot Forbes
date: 2017-04-15T09:20:55+01:00
desc: laravel 5 middleware tutorial
series:
- laravel-5.2
tags:
- laravel-5.2
- php
title: Laravel 5 Middleware Tutorial
twitter: https://twitter.com/Elliot_F
---

<p>This tutorial serves as a more expanded introduction to Laravel 5.1’s middleware than that of the documentation. I’ll be exploring a more expanded ins-and-outs of the middleware part of the framework.</p>

<h2>What is Middleware?</h2>

<p>Every site on the planet basically has to deal with loads of different requests on a daily basis, from the standard GET request which basically asks for resources such as web pages or files to the PUT and DELETE requests which allow you to upload and delete things depending on the scenario.</p>

<p>But say you implemented something on your site that allowed you to upload new articles, how would you protect it from loads of people randomly uploading garbage to the site? Well that’s where Laravel 5’s middleware comes in. Middleware is basically a filtering mechanism that allows you to filter out all the bad requests and only deal with the good ones.</p>

<p>This is brilliant for those of you who want to do things like rate-limiting on APIs that you want to build or if you wanted to build something like an advertisement provider that needs to provide ads based off location etc.</p>

<h2>Creating Middleware</h2>

<p>We can easily create new middleware using artisan.</p>

```bash
php artisan make:middleware AdMiddleware
```

<p>After we’ve created a new middleware component, we then need to look at modifying the code to suit our needs.</p>

<h2>Updating our Middleware File:</h2>

<p>After you’ve ran the make:middleware command you should see your new middleware file in app/http/middleware. Open this up and we’ll create a middleware that will get the request’s IP address and then determine what country that request came from.</p>

```php
<?php 
namespace App\Http\Middleware;
use Closure;
class AdMiddleware
{
  /**
    * Handle an incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \Closure  $next
    * @return mixed
    */
  public function handle($request, Closure $next)
  {
    // Test to see if the requesters have an ip address.
    if($request->ip() == null){
        throw new \Exception("IP ADDRESS NOT SET");   
    } 
    $country=file_get_contents('http://api.hostip.info/get_html.php?ip=' . $request->ip());
    echo $country;
    if(strpos($country, "UNITED STATES")){
        throw new \Exception("NOT FOR YOUR EYES, NSA");   
    } else {
        return redirect("index");   
    }
    
    return $next($request);
  }
}
```

<p>This code basically takes in a request and as an example checks to see it’s location before deciding whether to display a US only ad or an advertisement suited for the rest of the world.
This could be quite beneficial for those of you who want to build up a site that features amazon affiliate links from multiple countries.</p>

<p>Note that you shouldn't be passing anything back in the middleware section, you should instead be passing redirects to views instead of printing out things like I've done for brevity.</p>

<h2>Registering your Middleware</h2>

<p>When registering your middleware you have 2 choices. First choice is that you add the middleware to be run on every request handled by your app. You can do that by opening up App\Http\Kernel.php and adding it to your $middleware array like so:</p>

```php
protected $middleware = [
  \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
  \App\Http\Middleware\EncryptCookies::class,
  \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
  \Illuminate\Session\Middleware\StartSession::class,
  \Illuminate\View\Middleware\ShareErrorsFromSession::class,
  \App\Http\Middleware\VerifyCsrfToken::class,
// our new class.
  \App\http\Middleware\AdMiddleware::class,
];
```

<p>Second choice is to have the middleware run on registered routes only, you can register it like so:</p>

```php
<?php
/**
  * The application's route middleware.
  *
  * @var array
  */
protected $routeMiddleware = [
    'auth' => \App\Http\Middleware\Authenticate::class,
    'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
    'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
    'ad' => \App\Http\Middleware\AdMiddleware::class,
];
```

<p>And then add the middleware to the specific routes like so:</p>

```php
Route::get('/ip', ['middleware' => 'ad', function() {
    return "IP";
}]);
```