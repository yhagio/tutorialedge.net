---
author: Elliot Forbes
date: 2017-04-16T16:50:07+01:00
desc: In this tutorial we look at how we can implement a css3 box shadow to components
  of our website.
series: webdev
image: logo.png
tags:
- webdev
- css3
- html5
title: CSS3 Box Shadow Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this tutorial we'll be looking at how you can add a box shadow effect to elements of your website. Box shadow can help turn elements of your website from flat structures to almost 3D like. 

> It's worth checking out the material design documentation on [Elevation and Shadows](https://material.io/guidelines/material-design/elevation-shadows.html) 

# Output

This is what we'll be creating:

<div class="box">
  <h2>Box Shadow Example</h2>
</div>

<style>
.box {
  box-shadow: 0px 0px 15px #888888;
  padding: 20px;
  margin: auto;
  width: 50%;
}
</style>

# Implementation

For the above example we first define a div and attach the `.box` class to that div.

```html
<div class="box">
  <h2>Box Shadow Example</h2>
</div>
```

In our css we then define our `.box` class and within that we set our box-shadow attribute like so:

```css
box-shadow: 0px 0px 15px #888888;
```

box-shadow takes in the following parameters:

```css
box-shadow: h-shadow v-shadow blur spread color |inset|initial|inherit;
```

| Property | What It Does |
| -------- | ------------ |
| h-shadow | Specifies the horizontal position of the shadow relative to the element |
| v-shadow | Specifies the vertical position of the shadow relative to the element |
| blur     | The amount of bluring for our shadow |
| spread   | The distance over which our shadow is spread |
| color    | The color of our shadow |
| inset    | Shadow goes from outer shadow to inner shadow |
| initial  | Sets to default value |
| inherit  | Inherits property from parent element |


## Full .box css

```css
.box {
  box-shadow: 0px 0px 15px #888888;
  padding: 20px;
  margin: auto;
}
```


# Inner Shadow

<div class="box-2">
  <h2>Box Shadow Example</h2>
</div>

<style>
.box-2 {
  box-shadow: 0px 0px 15px #888888 inset;
  padding: 20px;
  margin: auto;
  width: 50%;
}
</style>

## Code

```html
<div class="box-2">
  <h2>Box Shadow Example</h2>
</div>

<style>
.box-2 {
  box-shadow: 0px 0px 15px #888888 inset;
  padding: 20px;
  margin: auto;
  width: 50%;
}
</style>
```

