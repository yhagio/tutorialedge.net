---
author: Elliot Forbes
date: 2017-04-15T08:04:33+01:00
series: laravel-5.2

tags:

- php
title: Getting Started With Controllers in Laravel 5.2
twitter: https://twitter.com/Elliot_F
---

<p>This tutorial is part of the <a href="https://tutorialedge.net/course/laravel-5">Build a blog with Laravel 5.2</a> course.</p>

<h2>What are Controllers?</h2>

<p>Laravel follows the model-view-controller software architectural pattern. We’ve already played about with views in Laravel which constitute the ‘V’ in an MVC architecture but if we wanted to do anything fancy like query a database or process user input then we are going to need to create a <b>controller</b>.</p>

<p><b>Controllers : </b>The formal definition of controllers is something that accepts input and then converts this for commands for the model or view. In laravel this tends to be accepting things like form input and returning blade templates as well as retrieving data from the database. You should as a rule try to ensure the View layer of your application does not contain any logic and remains as just a method of displaying data processed by the controller.</p>

<p>So initially we don’t require a model to complete the MVC architecture as all we are going to be doing is returning a view to the user. We’ll come to models further into this course when we start building the blog section of our site.</p>

<h2>Creating a Controller in Laravel 5.2</h2>

<p>Thanks to the <b>php artisan</b> it’s incredibly easy for us to create a new controller in Laravel 5.2. As we will be building a blog, I want the name of this controller to be <b>BlogController</b>. So open up your command line and navigate to the root of your project. Once there type the following:</p>

```bash
php artisan make:controller BlogController
```

<p>This should create a new controller for us under <b>app/Http/Controllers</b>. Open this up and you should see the following: </p>

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class BlogController extends Controller
{
    //    
}
```
<p>Now that we have this we can go into our BlogController class definition and create a few functions. As we don’t yet have a model in place we want to just return a few static pages back to anyone who visits our site. </p>

<h2>Adding our Blade Templates</h2>

<p>Ok, so initially we are going to have a homepage which displays all blog posts, an about page, a contact page and a single page which will display a single blog post.</p>

<p>Each of these will need to have their own blade view within our <b>resources/views</b> directory. For now these are going to be really simple and they are going to extend our app.blade.php master page that we created in the previous tutorial:</p>

<h6>single.blade.php</h6>

```html
@extends('app')

@section('content')
<h2>Single Page</h2>
@endsection
```

<h6>index.blade.php</h6>

```html
@extends('app')

@section('content')
<h2>Single Page</h2>
@endsection
```

<h6>about.blade.php</h6>

```html
@extends('app')

@section('content')
<h2>About Page</h2>
@endsection
```

<h6>contact.blade.php</h6>

```html
@extends('app')

@section('content')
<h2>Contact Page</h2>
@endsection
```

<h2>Returning our Blade Templates</h2>
<p>Now that we’ve got something to return we can add the new functions to our BlogController class that will return our views to the frontend:</p>

```php
public function index()
{
    return view('index');
}

public function single()
{
    return view('single');
}
    
public function about()
{
    return view('about');
}

public function contact()
{
    return view('contact');
}
```

<h2>Updating our Routes.php File</h2>

<p>And finally, now that we’ve created our blade templates and added the appropriate functions to our BlogController we can now update our Routes.php file to use this new controller:</p>

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

Route::get('/', 'BlogController@index');

/*
 * Our Static pages
 */
Route::get('/about', 'BlogController@about');
Route::get('/contact', 'BlogController@contact');

/*
 * The Routes for all our Blog pages.
 * Note that this is placed after our /about and /contact
 * routes to avoid conflict
 */
Route::get('/{slug}', 'BlogController@single');
```

<h2>Testing it All Works</h2>

<p>Once you’ve saved all this, navigate to your browser and open up your application. Test out navigating to different pages and checking that everything works. </p>

<p>If it has, <b>Congratulations!</b> You have successfully completed create a static site using Laravel 5.2</p>

<p>In the next tutorial I’m going to be introducing the concept of <b>models</b> and how to turn our static site into a <b>dynamic</b> website that will automatically change based off what is in the database.</p>