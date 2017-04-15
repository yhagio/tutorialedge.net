+++
date = "2017-04-15T09:26:20+01:00"
title = "Laravel 5 Simple Site Search Bar Tutorial"
draft = true
desc = "Simple site search bar tutorial for those of you wishing to implement some simplistic form of search bar in your laravel 5 applications"
tags = ["laravel-5.2", "php"]
series = ["laravel-5.2"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

<p>Something that I’ve been working on recently on the site is the search bar functionality which allows people to effectively search every through every article on the site to find one that will help them the most. In this tutorial I’ll be documenting a few of the ways that you can implement a simple full site search using Laravel 5.</p>

<h2>Requirements</h2>

<p>In order to complete this tutorial you'll have to set up your laravel 5 project to use the form facade. Add this to your composer.json file:</p>

~~~php
"require": {
    "laravelcollective/html": "~5.0"
}
~~~

<p>And then run the following composer command.</p>

~~~
composer update
~~~

<p>Finally we have to add it to our both the aliases array and the providers array found in config/app.php</p>

~~~php
'providers' => [
    ....
    'Collective\Html\HtmlServiceProvider',
    ....
 ],


'aliases' => [
    ....
    'Form' => 'Collective\Html\FormFacade',
    'Html' => 'Collective\Html\HtmlFacade',
    ....
],
~~~

<h2>Creating the Form</h2>

<p>To get things started we are going to need to create a form that will allow us to input our searches. </p>

~~~php
{!! Form::open(array('rout' => 'queries.search', 'class'=>'form navbar-form navbar-right searchform')) !!}
    {!! Form::text('search', null,
                           array('required',
                                'class'=>'form-control',
                                'placeholder'=>'Search for a tutorial...')) !!}
     {!! Form::submit('Search',
                                array('class'=>'btn btn-default')) !!}
 {!! Form::close() !!}
~~~

<h2>Creating our Routes:</h2>

<p>The way I’ve implemented the search function route in my project is to use a Route resource as I’m going to be storing the queries further down the line in order to get suggestions for new articles. Open up your routes.php file and add the following route:</p>

~~~php
Route::resource('queries', 'QueryController');
~~~

<h2>Adding Search Functionality to our QueryController</h2>

<p>So now we’ve created a form and updated our routes.php file we can add the search functionality to our controller. Create a new function that takes in a Request and call it search, like so:</p>

~~~php
public function search(Request $request)
{
  // Gets the query string from our form submission 
  $query = Request::input('search');
  // Returns an array of articles that have the query string located somewhere within 
  // our articles titles. Paginates them so we can break up lots of search results.
  $articles = DB::table('articles')->where('title', 'LIKE', '%' . $query . '%')->paginate(10);
      
  // returns a view and passes the view the list of articles and the original query.
  return view('page.search', compact('articles', 'query'));
 }
~~~

<p>That’s all we need for very simplistic search functionality but now we need to be able to see these results.</p>

<h2>Creating our Search blade Template</h2>

<p>We’ve already set up our routes so but currently it doesn’t have a template it can use so we’ll implement that now. Create a new folder within your resources/views folder called page and then create search.blade.php within that folder. This will be the template that will be used whenever we want to list our results. I’m going to assume you’ve got an app.blade.php already implemented with sections for content.</p>

~~~
@if (count($articles) === 0)
... html showing no articles found
@elseif (count($articles) >= 1)
... print out results
    @foreach($articles as $article)
    print article
    @endforeach
@endif
~~~

<h2>Conclusion</h2>

<p>That should be everything you need for a simple full site search with laravel 5. If you feel I’ve missed anything or require further explanations then please let me know in the comments section below!</p>