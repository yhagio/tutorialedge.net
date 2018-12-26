---
author: Elliot Forbes
date: 2017-04-20T08:06:37+01:00
desc: In this tutorial we look at how we implement curved borders on some of the elements
  within our html
series: webdev
image: logo.png
tags:
- webdev
- css3
- html5
- border-radius
title: CSS3 Border Radius Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

Effective use of border-radius on some elements can remove the harshness of the square corners on some components. 

# Circle Element

In this example we'll be creating a completely round circle object using nothing but css3. This is what our finished item will look like: 

<div class="circle">
</div>

<style>
.circle {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: #074E68;
  margin: auto;
}
</style>

# Source Code

To get this to work, what I've done is create a `div` and attached the `.circle` class to that div. I've then defined this `.circle` within my css file and given it a height and width of 100px. I've then added `border-radius:100%;` to this class which gives it the shape of a perfect circle. 

```html
<div class="circle">
</div>

<style>
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #074E68;
  margin: auto;
}
</style>
```

# Circle Images

It's important to note that the `border-radius: 100%;` property can be attached to `<img>` tags in order for them to take on a circular shape:

<img class="circle" src="https://twitter.com/Elliot_F/profile_image?size=original" alt="circle-image" /> 

<style>
img.circle {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin: auto;
}
</style>


## Source Code:

```html
<img class="circle" src="https://twitter.com/Elliot_F/profile_image?size=original" alt="circle-image" /> 

<style>
img.circle {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin: auto;
}
</style>
```

# border-radius For Specific Corners

There are times where you don't want every corner of your object to be rounded, thankfully we can utilize some of the more specific border-radius properties in order to allow us to only round certain corners. We can do this by setting the 4 specific properties:

```css
border-top-left-radius: 5px;
border-top-right-radius: 10px;
border-bottom-left-radius: 20px;
border-bottom-right-radius: 30px;
```

or we can pass in 4 distinct parameters to our `border-radius` property like so:

```css
border-radius: 10px 15px 20px 30px;
```

```html
<div class="element">
</div>

<style>
.element {
  width: 100px;
  height: 100px;
  border-top-left-radius: 5px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 30px;
  background-color: #074E68;
  margin: auto;
}
</style>
```

## Output

<div class="element">
</div>

<style>
.element {
  width: 100px;
  height: 100px;
  border-top-left-radius: 5px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 30px;
  background-color: #074E68;
  margin: auto;
}
</style>