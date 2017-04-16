+++
date = "2017-04-16T16:50:07+01:00"
title = "CSS3 Box Shadow Tutorial"
draft = true
series = ["webdev"]
desc = "In this tutorial we look at how we can implement a css3 box shadow to components of our website."
tags = ["webdev", "css3", "html5"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

In this tutorial we'll be looking at how you can add a box shadow effect to elements of your website.

## Output

This is what we'll be creating:

<div class="box">
  <h2>Box Shadow Example</h2>
</div>

<style>
.box {
  box-shadow: 0px 0px 15px #888888;
  padding: 20px;
  margin: auto;
}
</style>

## Implementation

For the above example we first define a div and attach the `.box` class to that div.

~~~html
<div class="box">
  <h2>Box Shadow Example</h2>
</div>
~~~

In our css we then define our `.box` class and within that we set our box-shadow attribute like so:

~~~css
box-shadow: 0px 0px 15px #888888;
~~~


#### Full .box css

~~~css
.box {
  box-shadow: 0px 0px 15px #888888;
  padding: 20px;
  margin: auto;
}
~~~