---
author: Elliot Forbes
date: 2017-04-15T08:21:41+01:00
desc: In this series we'll be building our own Laravel 5.2 blog and fully functioning
  content management system
series: laravel-5.2
image: laravel.png
tags:
- php
title: Building A Blog With Laravel 5.2
twitter: https://twitter.com/Elliot_F
---

<p>In this series we’ll be building a fully functioning blog using the Laravel 5.2 framework. We’ll iteratively build up our own content management system from the ground up and I’ll focus on demonstrating the best practices and by the end of this you’ll have a solid base for whatever projects you have in the pipeline.</p>

<h2>Creating our Project</h2>

<p.In order to create our project we’ll first need to install composer and laravel. The official docs have an excellent guide as to how you can install everything on your local machine which you can find here: <a target=”_blank” href="https://laravel.com/docs/5.1/installation">Laravel 5.1 Installation</a></p>

<p>Once you’ve installed and configured your environment it’s time to begin. Create the new project by creating a new directory on your machine and then typing the following in the terminal:</p>

```c
composer create-project laravel/laravel blog "5.1.*"
```

<h2>Testing it all works:</h2>

<p>Ensure that you set the correct permissions on the storage and bootstrap/cache directories within your new project. You can do this on mac easily by typing the following:</p>

```c
chmod -R 777 bootstrap/cache
chmod -R 777 storage
```

<h2>Running our Laravel project Locally:</h2>

<p>Now that all permission have been set up you can now serve up your application by typing the following in the terminal:</p>

```c
php artisan serve --port=8080
```

<p>Navigate to <a href="http://localhost:8080" target="_blank">http://localhost:8080</a> in your browser and, should everything have been set up correctly, you should see the laravel 5 default page.</p>

<h2>Next Lesson</h2>

<p>In the next lesson of this course, I will be demonstrating how we can create some basic tables using migrations.</p>

<p><b>Link:</b> <a href="https://tutorialedge.net/working-with-tables-laravel-5-2">Lesson 2 - Working With Tables</a></p>
