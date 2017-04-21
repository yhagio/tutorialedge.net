+++
title = "How To Work With CSS3 Variables"
draft = true
date = "2017-04-21T19:53:46+01:00"
series = ["webdev"]
desc = "In this tutorial we look at how we can get started working with CSS3 variables"
tags = ["webdev", "css3", "html5"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

One of the main reasons that preprocessors like [SASS](http://sass-lang.com/) and [LESS](http://lesscss.org/) have gained such huge popularity over the years is the fact that the help to bring order to your convoluted and messy CSS files. I've found myself too often ending up with 1,000 line css files where the header specific rules have migrated south towards the end of the document. With preprocessors you were able to leverage things like inheritance and it actually gave you a reason to structure your code in a cohesive format.

Preprocessors also allow you to declare global variables such as colors which can be used at multiple points throughout your websites design. From a web developers perspective this is very powerful as it allows us to be lazier when it comes to color scheme changes. Typically with any website you'd have a core palate of colors that compliment each other well and describe numerous elements within your site. With Preprocessors you can declare these variables like so:

#### SCSS

~~~less
// SCSS
$blue: blue;
$green: green;
$white: #fff;
$black: black;
~~~

We'd then be able to reference the variable names whenever we are setting say, the `background-color` of certain elements like so:

~~~less
.box {
  background-color: $blue;
}
~~~

Imagine we had 100 different elements in our site that all had to be this certain shade of blue. With traditional CSS we'd have to manually go through every individual rule and alter the value to reflect the new shade of blue we want. This can be a nightmare when you have clients dithering between colors and you find yourself spending more time in tedious updates like this than actually developing.

## CSS3 Variables Enter The Fold

Thankfully, most major browsers have no added support for these new experimental variables. 

> Mozilla Developer Network has an excellent post on using CSS variables which you can find here: [Using CSS Variables - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables#Browser_compatibility)

#### Basic Usage

~~~css
:root {
  --light-blue: blue;
}  
~~~

We can then reference this variable in all of the other elements within our stylesheet file like so:

~~~css
div {
  background-color: var(--light-blue);
}

.element {
  background-color: var(--light-blue);
}
~~~

## Example

In this example we are going to create a simple `--light-blue` variable that we'll reference within 2 distinct css rules. 

---------------------

<div class="box"></div>

<div class="text">
lorem ipsum dolor sit.
</div>

---------------------    

<style>
:root {
  --light-blue: blue;
}

.box {
  background-color: var(--light-blue);
  width: 100px;
  height: 100px;
  margin: auto;
}

.text {
  color: var(--light-blue);
  text-align: center;
}
</style>

#### Source Code

Below you'll find the full source code to the above example. Obviously the larger your css file and the more places that you use this distinct variable, the more worthwhile it's going to be for you if you ever need to quickly change colors on the fly.

~~~html
<div class="box"></div>

<div class="text">
lorem ipsum dolor sit.
</div>
    

<style>
:root {
  --light-blue: blue;
}

.box {
  background-color: var(--light-blue);
  width: 100px;
  height: 100px;
  margin: auto;
}

.circle {
  color: var(--light-blue);
  text-align: center;
}
</style>
~~~

