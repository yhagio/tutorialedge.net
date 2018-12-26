---
author: Elliot Forbes
date: 2017-04-16T17:27:53+01:00
desc: In this tutorial we take a broad overview of the basics of web development.
series: webdev
image: logo.png
tags:
- webdev
- css3
- html5
title: An Introduction To Web Development
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 1
---

Since it's inception in the 90s the web has seen an explosion in the number and range of different web technologies used for building websites. However, if you have never created a website in your life then this can all be very daunting and initially offputting for someone wanting to take the plunge and get into web development seriously. In this introductory guide I'll be helping to demystify some of the key terms and concepts that every web developer should know or be aware of.

# The Languages - HTML and CSS


## HTML - Hyper Text Markup language

HTML or Hyper text markup language as it more formally known is the language in which we define the structure of our web pages. Every webpage must follow this structure and it looks something like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My Website</title>
  </head>
  <body>
    <h1>My New Website</h1>
  </body>
</html>
```

> Save the above file as index.html on your machine and then drag and drop that file into your preferred browser. 

The above code is made up of a series of `tags` which are most often opened `<tag-name>` and then closed like so: `</tag-name>`. 

# Line by Line 

## Our Head Section

The Doctype tag specifies that this document is of type html. We leave this in so that browsers can more easily work with our web pages.

```html
<!DOCTYPE html>
```

The following `<html lang="en">` tag is the outter-most tag for every web site. It's meant to wrap around all of our html code as the root element. `lang="en"` specifies that the content within this `<html>` document is english. This can be changed to other languages to suit.

```html
<html lang="en">
...
</html>
```

The first tag to appear inside of our `<html lang="en">` tag is our `<head>` tag. This is where we do things such as file import and setting important meta-data about our site. In our `<head>` section we've  defined the `<title>` of our site which sets our webpage's tab name in modern browsers. 

```html
<head>
  <title>My Website</title>
</head>
```

## Meta Data

When we talk about meta data we are referring to the tags within our `<head>` section that describe our webpage. We can define things like the webpage's description that will get picked up by search engines as part of our meta data like so:

```html
<meta name="description" content="A cool description of what my webpage contains">
```

# Our Body Section

Finally we come to the `<body>` section of our webpage. It is within this section that we write the code that defines how our webpage is structured. We can add as much as we like in here and it's typically a weird mix of your sites content and the structure of that content. 

The `<h1>` tag that lies within our `<body>` tag is a header tag within which we would typically put the title of our content. These tags range from `<h1>` to `<h6>` and with no extra styling they decrement in size each time.

```html
<body>
  <h1>My New Website</h1>
</body>
```

# Making Our Site Look Good - CSS

So in the above section we've defined a very basic website. It doesn't do anything fancy just yet and it definitely doesn't look the best so the next thing we should have a look at is how we can style our website to look more attractive. This is where CSS or Cascading Style Sheets come into play. 

Cascading Style Sheets can be written either within our .html pages or they can be pulled into their own .css file or even multiple .css files should you need it. CSS is typically made up of a series of rules that say whenever a browser is rendering a certain element, it must follow a set styling. 

Say for instance we wanted to make our 'My New Website' header on our site a different colour. In order to do that we would have to define a rule for our h1 tag. Let's change the colour to blue by adding a style tag and a css rule for our `<h1>` tags to our `<head>` section of our website. 

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My Website</title>
    <style>
    h1 {
      color: blue;
    }
    </style>
  </head>
  <body>
    <h1>My New Website</h1>
  </body>
</html>
```

If we tried refreshing our browser page then you should notice that our My New Website title is now rendered in a rather vibrant blue colour. 