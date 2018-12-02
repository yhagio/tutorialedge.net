---
author: Elliot Forbes
date: 2017-04-15T08:27:49+01:00
desc: In this tutorial I'll be demonstrating to you how you can add github authentication
  to your Laravel 5 application.
series: laravel-5.2
image: laravel.png
tags:
- php
title: Adding Github Registry and Authentication To Laravel 5.2
twitter: https://twitter.com/Elliot_F
---

<p>As part of the ongoing work I’ve been doing on this site, I thought it would be a good idea to totally remove the traditional method of registering and logging in and instead replace that with github authentication. This actively reduces the risks that the site takes with regards to storing passwords and allows me to rely upon a relatively secure authentication method rather than having to roll my own.</p>

<h2>Creating a Github Application</h2>

<p>In order for us to use Github’s authentication in our application we are going to need to first register this with Github. Navigate to <a href=”https://github.com/settings/applications/new”>here</a> and fill in the details for your new application. </p>

<p>The callback url should be http://yourapp.com/auth/github/callback </p>

<p>Once you’ve done that you should be redirected to a page that shows you the client ID and the secret. Copy these and add them to your .env file in your laravel 5 application: </p>

```t
GITHUB_ID=abcd12345
GITHUB_SECRET=abcdefg1234567
GITHUB_CALLBACK_URL=https://yourapp.com/auth/github/callback
```

<p>Next thing we need to do is add this to our config/services.php</p>

```php
'github' => [
      'client_id' => env('GITHUB_ID'),
      'client_secret' => env('GITHUB_SECRET'),
      'redirect' => env('GITHUB_CALLBACK_URL'),  
  ],
```

<p>After you’ve done this we should be good to go and can proceed with installing Socialite and configuring our app.</p>

<h2>Adding Socialite To Your Laravel 5 Project</h2>

<p>In order for us to use Github’s authentication we are going to need to first add Socialite to our Laravel 5 project. We can do this by performing the following composer command:</p>

```bash
composer require laravel/socialite
```

Once this has successfully ran we then need to make some modifications to our config/app.php file. 

```php
'providers' => [
		…
  // add our new provider to the providers array 
  'Laravel\Socialite\SocialiteServiceProvider',
],
```

```php
'aliases' => [
  'Socialite' => 'Laravel\Socialite\Facades\Socialite',
],
```

<h2>Configuring our Routes</h2>

<p>In order for visitors to authenticate with github we are going to need a new route that they can navigate to that will trigger out authentication prompt. Navigate to your routes.php file and add the following routes: </p>

```php
Route::get('auth/github', 'Auth\AuthController@redirectToProvider');
Route::get('auth/github/callback', 'Auth\AuthController@handleProviderCallback');
```

<p>Now that we’ve added these two routes, we now need to add the functions that they call whenever they are hit.</p>

<h2>Our AuthController File</h2>

<p>Open up your AuthController.php file and add the following 3 functions: </p>

```php
<?php    
/**
  * Redirect the user to the GitHub authentication page.
  *
  * @return Response
  */
public function redirectToProvider(Request $request)
{
    return Socialite::driver('github')
        ->with(['redirect_uri' => env('GITHUB_CALLBACK_URL' ) . '?redirect=' . $request->input('redirect')])
        ->redirect();
}

/**
  * Obtain the user information from GitHub.
  *
  * @return Response
  */
public function handleProviderCallback(Request $request)
{
    $user = Socialite::driver('github')->user();
    Session::put('user', $user);

    $redirect = $request->input('redirect');
    
    if($redirect)
    {
        return redirect($redirect);
    }
    
    $authUser = $this->findOrCreateUser($user);

    Auth::login($authUser, true);
            
    return redirect('home');
}

/**
  * Return user if exists; create and return if doesn't
  *
  * @param $githubUser
  * @return User
  */
private function findOrCreateUser($githubUser)
{
    if ($authUser = User::where('github_id', $githubUser->id)->first()) {
        Log::info("User Found");
        Auth::login($authUser);
        return $authUser;
    }

    return User::create([
        'name' => $githubUser->name,
        'email' => $githubUser->email,
        'github_id' => $githubUser->id,
        'avatar' => $githubUser->avatar
    ]);
    }
```

<h2>Editing the Database Structure</h2>

<p>So if we are going to be authenticating people using Github’s OAuth2 then we need to be able to store who we have and haven’t already authenticated. To do this we’ll need to modify the database so that it stores the github_id and any subsequent things like the avatar etc. </p>

<p>In this example I just extended my users table by adding an extra row, I prefer doing it using pure sql rather than migrations:</p>

<b>Pure SQL</b>

```sql
ALTER TABLE users ADD github_id INT;
```

<h3>Updating our Users Model</h2>

<p>Finally we need to update our User model. Open up app/User.php and change the following</p>

```php
/**
* The attributes that are mass assignable.
*
* @var array
*/
protected $fillable = ['github_id','name', 'email', 'password'];
```

# Testing it All Works

Now that you’ve configured everything it’s time to check it all works. Navigate to http://yourapp.com/auth/github and you should hopefully be redirected to githubs authentication page on which you can allow your app to use your details. This should then return you to your ‘home’ route or whatever other route you wish to route them back to.

If everything works then congratulations, you’ve now succesfully added github authentication to your Laravel application! 
