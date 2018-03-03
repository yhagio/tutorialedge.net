+++
date = "2017-04-15T08:01:33+01:00"
title = "Working With Tables in Laravel 5.2"
draft = true
tags = ["laravel-5.2", "php"]
series = ["laravel-5.2"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

## Pre-Requisites

<p><b>Before we can get started</b> building our blog, we'll first need to set up a database on our machine that we can play around with for testing purposes.</p>

<p>I typically use XAMPP on my local machines as it allows me to create MySQL tables using phpMyAdmin. I'd recommend, if you haven't already, downloading this and setting it up.</p>

<p><b>Once you've set up phpMyAdmin</b> create a table with which we can build our blog. Create a user and give that user permission and then add this to your <b>.env</b> file within the root directory of your project.</p>

<pre><code class="language-markup">DB_HOST=127.0.0.1
DB_DATABASE=blog_db
DB_USERNAME=your_user
DB_PASSWORD=your_password</code></pre>

<p>Test this connection out by performing <b>php artisan migrate</b> and if everything is configured correctly you should now see a users table within that database.</p>

## Creating our Database Tables:

<p>Over these tutorials we will be implementing the following components:</p>

<ul>
<li>A Blog System with Tags</li>
<li>A commenting system so that users can respond to our posts.</li>
<li>User authentication using Facebook, Twitter and Google Plus</li>
<li>An Admin Section where we can perform all CRUD on our posts.</li>
<li>An API that we can consume and utilize for future components.</li>
</ul>

<p>For each of these things we’ll want to define some form of schema that can be used to store our data in our database. I’m purposefully leaving a few fields out of the initial design as it’ll let me demonstrate the power of migrations further down the line.</p>

### Posts

<table class="striped">
        <thead>
          <tr>
              <th data-field="id">Name</th>
              <th data-field="name">Type</th>
              <th data-field="price">Traits</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>id</td>
            <td>integer</td>
<td>unique, increments</td>
          </tr>
          <tr>
            <td>Title</td>
            <td>string</td>
<td>n/a</td>
          </tr>
          <tr>
            <td>description</td>
            <td>text</td>
<td>n/a</td>
          </tr>
<tr>
<td>Author</td>
<td>String</td>
<td>N/A</td>
</tr>
<tr>
<td>Body</td>
<td>Text</td>
<td>N/A</td>
</tr>
<tr>
<td>created_at</td>
<td>timestamp</td>
<td>N/A</td>
</tr>
<tr>
<td>updated_at</td>
<td>timestamp</td>
<td>N/A</td>
</tr>
<tr>
<td>published_at</td>
<td>timestamp</td>
<td>N/A</td>
</tr>
        </tbody>
      </table>

### Comments


<table class="striped">
        <thead>
          <tr>
              <th data-field="id">Name</th>
              <th data-field="name">Type</th>
              <th data-field="price">Traits</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>id</td>
            <td>integer</td>
<td>unique, increments</td>
          </tr>
          <tr>
            <td>body</td>
            <td>text</td>
<td>n/a</td>
          </tr>
          <tr>
            <td>author</td>
            <td>string</td>
<td>n/a</td>
          </tr>
<tr>
<td>created_at</td>
<td>timestamp</td>
<td>N/A</td>
</tr>
<tr>
<td>updated_at</td>
<td>timestamp</td>
<td>N/A</td>
</tr>
<tr>
<td>published_at</td>
<td>timestamp</td>
<td>N/A</td>
</tr>
</tbody>
</table>

### Tags

<table class="striped">
        <thead>
          <tr>
              <th data-field="id">Name</th>
              <th data-field="name">Type</th>
              <th data-field="price">Traits</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>id</td>
            <td>integer</td>
<td>unique, increments</td>
          </tr>
          <tr>
            <td>name</td>
            <td>string</td>
<td>n/a</td>
          </tr>
<td>created_at</td>
<td>timestamp</td>
<td>N/A</td>
</tr>
<tr>
<td>updated_at</td>
<td>timestamp</td>
<td>N/A</td>
</tr>
</tbody>
</table>
### Post_Tag

<table class="striped">
        <thead>
          <tr>
              <th data-field="id">Name</th>
              <th data-field="name">Type</th>
              <th data-field="price">Traits</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>post_id</td>
            <td>integer</td>
<td>n/a</td>
          </tr>
          <tr>
            <td>tag_id</td>
            <td>integer</td>
<td>n/a</td>
          </tr>
<td>created_at</td>
<td>timestamp</td>
<td>N/A</td>
</tr>
<tr>
<td>updated_at</td>
<td>timestamp</td>
<td>N/A</td>
</tr>
</tbody>
</table>

## Creating our Migrations

<p>php artisan again comes in useful when creating migrations. For each of the tables we’ve defined above, we are going to want to create a migration that will create a table in the database.</p>

<p>Navigate to the root directory of the project and type the following commands in:</p>

<pre><code class=”language-markup”>php artisan make:migration create_posts_table</code></pre>

<pre><code class=”language-markup”>php artisan make:migration create_comments_table</code></pre>

<pre><code class=”language-markup”>php artisan make:migration create_tags_table</code></pre>

<pre><code class=”language-markup”>php artisan make:migration create_post_tag_table</code></pre>

<p>This should create 4 new php classes under <b>database/migrations</b> and it’s in these 4 new files that we are going to define our tables schema.</p>

 ## Defining our Schemas

<p>In each of these 4 new files we need to define the table structure for all of our tables. You’ll notice that the users table has already been defined for us.</p>

<p>If you open up the CreatePostsTable class that will have been created from the first php artisan command then you should see something like the code below. The only difference is I've added the basic create and drop table functionality in the up and down methods. Migration classes like the one below contain 2 functions, an up function and a down function. The up function creates tables and the down function typically does the reverse.</p>

<p>In this tutorial we'll be using <b>Laravel's Schema Builder</b> in order to elegantly craft the tables we need in our database. </p>

<pre><code class="language-php"><xmp><?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table){
           // our schema is defined in here 
           $table->increments('id');
           $table->string('title');
           $table->text('description');
           $table->text('body');
           $table->string('author');
           $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // here we define what happens when we bring down our application
        // in this case we want to drop our posts table
        Schema::drop('posts');
    }
}</xmp></code></pre>

<p><b>For the purpose of brevity</b>, I'm only going to be showing you the up functions for the next 3 tables we'll be creating.</p>

<pre><code class="language-php"><xmp>public function up()
    {
        Schema::create('comments', function (Blueprint $table){
           // our schema is defined in here 
           $table->increments('id');
           $table->integer('post_id');
           $table->text('body');
           $table->string('author');
           $table->timestamps();
        });
    }</xmp></code></pre>

<pre><code class="language-php">public function up()
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });
    }</code></pre>


<pre><code class="language-php">public function up()
    {
        Schema::create('post_tag', function (Blueprint $table){
            $table->integer('post_id')->unsigned()->index();
            $table->integer('tag_id')->unsigned()->index();
            $table->timestamps(); 
        }); 
        
        // This sets up the relationships for our table
        Schema::table('post_tag', function ($table){
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade'); 
        });
    }</code></pre>

<p>Once these are in place and you have successfully set up a database for your test site, perform the following command in the terminal:</p>

<pre><code class="language-markup">php artisan migrate</code></pre>

## Conclusions

<p>If everything went smoothly with our migrations then you should have in place everything we need to start building our blog.</p> 

<p>In the next lesson I'm going to be demonstrating how to implement some basic routes in Laravel 5.2</p>

<p><b>Link:</b> <a href="https://tutorialedge.net/creating-some-routes-laravel-5">Lesson 3 - Creating some Basic Routes</a></p>