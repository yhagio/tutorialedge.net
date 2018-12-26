---
author: Elliot Forbes
date: 2017-04-21T19:53:46+01:00
desc: In this tutorial we look at how we can get started working with CSS3 variables
series: webdev
image: logo.png
tags:
- webdev
- css3
- html5
title: How To Work With CSS3 Variables
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

One of the main reasons that preprocessors like [SASS](http://sass-lang.com/) and [LESS](http://lesscss.org/) have gained such huge popularity over the years is the fact that the help to bring order to your convoluted and messy CSS files. I've found myself too often ending up with 1,000 line css files where the header specific rules have migrated south towards the end of the document. With preprocessors you were able to leverage things like inheritance and it actually gave you a reason to structure your code in a cohesive format.

Preprocessors also allow you to declare global variables such as colors which can be used at multiple points throughout your websites design. From a web developers perspective this is very powerful as it allows us to be lazier when it comes to color scheme changes. Typically with any website you'd have a core palate of colors that compliment each other well and describe numerous elements within your site. With Preprocessors you can declare these variables like so:

```less
// SCSS
$blue: blue;
$green: green;
$white: #fff;
$black: black;
```

We'd then be able to reference the variable names whenever we are setting say, the `background-color` of certain elements like so:

```less
.box {
  background-color: $blue;
}
```

Imagine we had 100 different elements in our site that all had to be this certain shade of blue. With traditional CSS we'd have to manually go through every individual rule and alter the value to reflect the new shade of blue we want. This can be a nightmare when you have clients dithering between colors and you find yourself spending more time in tedious updates like this than actually developing.

# CSS3 Variables Enter The Fold

Thankfully, most major browsers have no added support for these new experimental variables. 

> Mozilla Developer Network has an excellent post on using CSS variables which you can find here: [Using CSS Variables - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables#Browser_compatibility)

## Basic Usage

```css
:root {
  --light-blue: blue;
}  
```

We can then reference this variable in all of the other elements within our stylesheet file like so:

```css
div {
  background-color: var(--light-blue);
}

.element {
  background-color: var(--light-blue);
}
```

# Example

In this example we are going to create a simple `--light-blue` variable that we'll reference within 2 distinct css rules. This should hopefully give you some basic idea of how powerful this could potentially be.

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

## Source Code

Now if we have a look at the full source code to the above example. You'll see our two html elements and the `style` tag below them which contains our CSS. We define the `--light-blue` variable in our :root element and then we reference this on the first line of the `.box` and `.text` rules for different properties.

```html
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

.text {
  color: var(--light-blue);
  text-align: center;
}
</style>
```

# Overall

With these variables the larger your css file and the more places that you use this distinct variable, the more worthwhile it's going to be for you if you ever need to quickly change colors on the fly.

This is definitely a huge addition for us as web developers and it's one that I'm going to be taking full advantage of in projects to come. I'm a huge fan of some of the features SASS and LESS provide us and having some of their core features slowly migrate into the standard CSS definition is a huge step forward. 
