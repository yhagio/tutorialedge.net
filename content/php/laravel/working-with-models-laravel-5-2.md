---
author: Elliot Forbes
date: 2017-04-09T21:34:10+01:00
desc: In this tutorial we begin by looking at why our application needs models and
  then we look at how we can define our own.
series: laravel-5.2

tags:

- php
title: Working With Models in Laravel 5.2
twitter: https://twitter.com/Elliot_F
---

<p>This tutorial is part of the <a href="https://tutorialedge.net/course/laravel-5">Building a blog with Laravel 5.2</a> course.</p>

<h2>Working with Models</h2>

<p>In a traditional MVC architecture, the model is where all the data, rules and logic for an application are written. The same concept applies to Laravel 5.2 applications.</p>

<p><b>In this tutorial</b> I’m going to be showing you how we can create and work with some basic models in our new blog.</p>

<h2>Why Do We Need Models?</h2>

<p>Model’s are incredibly powerful in Laravel as they allow us to do things like define relationships. Say for instance you had a post on your blog and you wanted to link comments to that post, in Laravel it’s incredibly easy to define this relationship within a Model. You’ll see how we can define this Post -> Comment relationship further into the tutorial series.</p>

<h2>Creating a Model</h2>

<p>Again we are going to be utilizing <b>php artisan</b> in order to create a new model. For the blog we are building, we want to create a Post model that will interact with our posts database. </p>

<p>Now this is where Laravel shows it’s power, by simply creating a posts database table and then a Post model, Laravel will behind the scenes link these two things together without any added configuration.</p>

<p>Navigate to the root directory of your project and type the following in the console:</p>

```bash
php artisan make:model Post
```


<p>This should create a new Post.php class under your <b>app</b> directory.</p>

<h2>Under Construction</h2>

<p>This series is still undergoing construction. Stay tuned for more updates.</p>
