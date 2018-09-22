---
author: Elliot Forbes
date: 2017-04-15T08:07:02+01:00
desc: In this tutorial I'll be demonstrating how you can create some very simple routes
  in laravel 5.2
series:
- laravel-5.2
tags:
- laravel-5.2
- php
title: Introduction To Routing in Laravel 5.2
twitter: https://twitter.com/Elliot_F
---

<p>This tutorial is part 2 of the <a target=”_blank” href="https://tutorialedge.net/course/laravel-5">Building a Blog with Laravel 5.2</a> course.</p>

<p>Ok, so we left off with an very simple, working Laravel 5.2 installation. When we run this using php artisan serve, we should see the Laravel welcome page when we navigate to http://localhost:8000/. Now that we’ve got that ready, it’s time to start playing about with routing and some basic views.</p>

<h2>The Plan</h2>

<p>Before we get started, we need some sort of plan that we can work against. So we need to think what our blog needs in order to be a successful blog.</p>

<p><b>A Home page :</b> This will be where visitors will land upon when they first visit the blog. This needs to have good navigation to all other sections of our site and should tell the visitors exactly who we are and what we do. Because I’m redo-ing my personal blog in this tutorial, I want it to showcase some of the projects I’ve worked on in recent years and I want it to link nicely to the blog section of the site.</p>

<p><b>The Blog Main Page :</b> This is where we will list all of our articles.</p>

<p><b>Blog Single Page :</b> This will be the page that displays all of our articles. Any changes we make here will be reflected across all blog posts, this makes it very powerful as we just have to maintain one single page for everything.</p>

<p><b>Contact page : </b> This is where I’m going to put all my contact details and social media links etc for getting in touch. </p>

<h2>Our First Route</h2>

<p>Now that I’ve got a very simple plan of what I want on my blog, we can start creating the routes in which we want to display things. We’ll start with the home page route, open up <b>routes.php</b> under the <b>app/Http</b> directory and you should see the following:</p>

```php
<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});
```

<p>What this does is provides us with a very simple route that returns our <b>welcome.blade.php</b> as a view to the browser whenever a <b>GET</b> request is performed for <b>http://localhost:8000/</b> or the homepage of wherever you are hosting your application.</p>

<p>This is the type of functionality I want for the home page of my blog but I don’t want it pointing to the <b>welcome.blade.php</b> file. Instead I want it pointing to my own <b>index.blade.php</b> that I’m going to define under <b>resources/views</b>. So create this new <b>index.blade.php</b> file under this directory and also create another blade template called <b>app.blade.php</b>. This app.blade.php file will act as our master page for our entire site and will handle such things as the head section of our website and the footer. This is so that we don’t have to constantly change it in every file that uses a header or footer and it’s less code to maintain.</p>

<h2>Our Blade Template</h2>

<p>In order for us to get up and running quickly we’ll be creating some very simple blade templates that we can use in our blog. Feel free to expand upon these later on once you are comfortable.</p>

<p><b>app.blade.php</b></p>

```html
<html>
    <head>
        <title>ElliotForbes.co.uk</title>
    </head>
    <body>
        
        <h2>Our Nav Goes here</h2>
        
        @yield('content')        
        
        <div class="footer">
            <h2>Our Footer Stuff Goes here</h2>
        </div>
        
    </body>
</html>
```

<p><b>index.blade.php</b></p>

```html
@extends('app')

@section('content')
<h2>Home Page</h2>
@endsection
```

<p>As you can see, nothing overly complicated here. Anything we want reflected in all pages of our site we put in our app.blade.php file. Page-specific content goes within their own blade files.</p>

<h2>Some Basic Routes</h2>

<p>So now that we’ve got our <b>app.blade.php</b> and our <b>index.blade.php</b> files we can now define our route for the homepage.</p>

<p>Open up <b>routes.php</b> within <b>app/Http</b> and we are going to change the route for our ‘/’ page.</p>

```php
Route::get('/', function () {
    // change this to return our index blade template rather than the defaul
    // welcome template
    return view('index');
});
```

<p>If you now navigate to your app in the browser you will now see your newly created index file rather than the old welcome page. Now that we’ve got the basics down, we can create the blade template for our contact and about pages and the routes to them. Below you’ll find an example of how we can create the route for our contact page.</p>

```php
Route::get('/blog', function () {
    return view('blog-home');
});
```

<p>Create the <b>blog-home.blade.php</b> blade template in the same directory as your <b>index.blade.php</b> and then navigate to your <b>http://localhost:8000/blog</b> and you should see your newly created blog template rendered in all it’s glory. </p>