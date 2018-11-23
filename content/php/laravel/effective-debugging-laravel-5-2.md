---
author: Elliot Forbes
date: 2017-04-15T08:05:46+01:00
series: laravel-5.2

tags:

- php
title: Effective Debugging of Laravel 5.2 Applications
twitter: https://twitter.com/Elliot_F
---

<p>Knowing how to effectively debug problems with your laravel 5.2 application is vital if you are to combat problems and reduce the amount of errors within your application.</p>

<p>Below you’ll find an array of different methods you can use either one their own or in any combination in order to fight against the dreaded bugs that might be turning potential customers away.</p>

<h2>Using Log and tail -f</h2>

<p>This happens to be one of my favourite and potentially most effective methods of debugging my applications. In production environments where you should hide all error output from visitors, using Log is one way to trap this information for analysis further down the line.</p>

<p>Below you’ll find a simple implementation of a controller that utilizes the Log function to log a message every time that function is hit:</p>

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
// Notice we’ve added this line here to import Log
use Log;

class TestlController extends Controller
{
    //
    public function test()
    {
        Log::info("This will print to the logs");
        return "done";
    }
}

```

<p>If you create a route using this test function and hit this route, you should see the a new line with a timestamp and the message “this will print to the logs” appended to <b>storage/logs/laravel.log</b> every time.</p>

<p><b>tail -f</b>: tail -100f log.log is one of the best ways to watch logs, all it does is print out the last 100 lines of our log.log file. Typically fresh laravel 5.2 applications will output to <b>storage/log/laravel.log</b> so the command <b>tail -100f storage/log/laravel.log</b> executed from your project’s root directory should work straight out the box.</p>