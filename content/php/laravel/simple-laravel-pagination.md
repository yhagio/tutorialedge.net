+++
date = "2017-04-15T14:42:47+01:00"
title = "Simple Laravel 5 Pagination"
draft = true
desc = "In this tutorial I will be demonstrating how to perform simple pagination using Laravel 5."
tags = ["laravel-5.2", "php"]
series = ["laravel-5.2"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

<p>Pagination is a way of splitting up content into several different pages and making content layout far more organized. A must for blogs who wish their front-pages to be small enough to load and yet big enough to showcase the most important tutorials.</p>

<h2>Modifying the Controller:</h2>

<p>Pagination in Laravel 5 is incredibly easy to implement. In this tutorial I will be using some of the code from this site to serve as an example:</p>

<p><strong>Old Method - No Pagination:</strong></p>

```php
<?php
class ArticleController extends Controller {
    public function index()
    {
        $articles = Article::get();
        return view('someview', compact('articles'));
    }
}
```

<p><b>New Way : With Pagination</b></p>

```php
<?php
class ArticleController extends Controller {
    public function index()
    {
        $articles = Article::paginate(15);
        return view('someview', compact('articles'));
    }
}
```

<h2>Modifying the View</h2>

<p>So now that we've modified the controller we need to then modify the view ever so slightly in order to allow for our pagination. In this example I was printing out key details about my articles in a table and wanted the results to be split up instead of having huge lists of posts to wade through:</p>

```php
@foreach ($articles as $article)

    {{ $article->id }}
    {{ $article->title }}
    {{ $article->published }}

@endforeach
```

<p>With the newly added pagination this works fine, but we have no current way to navigate between pages of rows. So in order for us to fix that we add the following wrapped in php tags:</p>

```php
<?php echo $articles->render(); ?>
```