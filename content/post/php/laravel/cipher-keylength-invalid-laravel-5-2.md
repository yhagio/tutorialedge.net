+++
date = "2017-04-15T08:08:41+01:00"
title = "The Cipher and or Key Length are Invalid - laravel 5.2 Issue"
draft = true
desc = "Here we discus how to fix a common error that you may face with brand new installations of Laravel 5.2"
tags = ["laravel-5.2", "php"]
series = ["laravel-5.2"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

<p>One of the issues you may face with a new laravel 5.2 installation is where the Cipher and or Keylength is invalid.</p>

<h2>Resolving the Issue</h2>

<p>Resolving the issue is relatively simple using php artisan, first ensure you have a .env file in the root of your project and then type the following in the command line: </p>

~~~
php artisan key:generate
~~~

<p>This should generate a key for you in square brackets. Copy this and paste the following into your .env file:</p>

~~~
APP_KEY=base64:yourkeygoeshere
~~~

<h2>Checking it works:</h2>

<p>Once you’ve successfully set this, try navigating to your laravel application and you should see the welcome page. Check the logs by typing the following:</p>

~~~
tail -100f storage/log/laravel.log
~~~

<p>If this doesn’t change the next time you render a page then you have successfully resolved the issue.</p>

<h2>The Stack Trace</h2>

~~~
production.ERROR: exception 'RuntimeException' with message 'No supported encrypter found. The cipher and / or key length are invalid.' in /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Encryption/EncryptionServiceProvider.php:45
Stack trace:
#0 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Encryption/EncryptionServiceProvider.php(25): Illuminate\Encryption\EncryptionServiceProvider->getEncrypterForKeyAndCipher(NULL, 'AES-256-CBC')
#1 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Container/Container.php(735): Illuminate\Encryption\EncryptionServiceProvider->Illuminate\Encryption\{closure}(Object(Illuminate\Foundation\Application), Array)
#2 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Container/Container.php(633): Illuminate\Container\Container->build(Object(Closure), Array)
#3 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Foundation/Application.php(697): Illuminate\Container\Container->make('encrypter', Array)
#4 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Container/Container.php(853): Illuminate\Foundation\Application->make('Illuminate\\Cont...')
#5 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Container/Container.php(808): Illuminate\Container\Container->resolveClass(Object(ReflectionParameter))
#6 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Container/Container.php(779): Illuminate\Container\Container->getDependencies(Array, Array)
#7 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Container/Container.php(633): Illuminate\Container\Container->build('App\\Http\\Middle...', Array)
#8 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Foundation/Application.php(697): Illuminate\Container\Container->make('App\\Http\\Middle...', Array)
#9 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(126): Illuminate\Foundation\Application->make('App\\Http\\Middle...')
#10 [internal function]: Illuminate\Pipeline\Pipeline->Illuminate\Pipeline\{closure}(Object(Illuminate\Http\Request))
#11 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Routing/Pipeline.php(32): call_user_func(Object(Closure), Object(Illuminate\Http\Request))
#12 [internal function]: Illuminate\Routing\Pipeline->Illuminate\Routing\{closure}(Object(Illuminate\Http\Request))
#13 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(103): call_user_func(Object(Closure), Object(Illuminate\Http\Request))
#14 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Routing/Router.php(726): Illuminate\Pipeline\Pipeline->then(Object(Closure))
#15 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Routing/Router.php(699): Illuminate\Routing\Router->runRouteWithinStack(Object(Illuminate\Routing\Route), Object(Illuminate\Http\Request))
#16 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Routing/Router.php(675): Illuminate\Routing\Router->dispatchToRoute(Object(Illuminate\Http\Request))
#17 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php(246): Illuminate\Routing\Router->dispatch(Object(Illuminate\Http\Request))
#18 [internal function]: Illuminate\Foundation\Http\Kernel->Illuminate\Foundation\Http\{closure}(Object(Illuminate\Http\Request))
#19 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Routing/Pipeline.php(52): call_user_func(Object(Closure), Object(Illuminate\Http\Request))
#20 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/CheckForMaintenanceMode.php(44): Illuminate\Routing\Pipeline->Illuminate\Routing\{closure}(Object(Illuminate\Http\Request))
#21 [internal function]: Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode->handle(Object(Illuminate\Http\Request), Object(Closure))
#22 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(136): call_user_func_array(Array, Array)
#23 [internal function]: Illuminate\Pipeline\Pipeline->Illuminate\Pipeline\{closure}(Object(Illuminate\Http\Request))
#24 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Routing/Pipeline.php(32): call_user_func(Object(Closure), Object(Illuminate\Http\Request))
#25 [internal function]: Illuminate\Routing\Pipeline->Illuminate\Routing\{closure}(Object(Illuminate\Http\Request))
#26 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php(103): call_user_func(Object(Closure), Object(Illuminate\Http\Request))
#27 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php(132): Illuminate\Pipeline\Pipeline->then(Object(Closure))
#28 /Users/elliotforbes/Documents/Projects/PersonalSite/vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php(99): Illuminate\Foundation\Http\Kernel->sendRequestThroughRouter(Object(Illuminate\Http\Request))
#29 /Users/elliotforbes/Documents/Projects/PersonalSite/public/index.php(54): Illuminate\Foundation\Http\Kernel->handle(Object(Illuminate\Http\Request))
#30 /Users/elliotforbes/Documents/Projects/PersonalSite/server.php(21): require_once('/Users/elliotfo...')
#31 {main}
~~~
