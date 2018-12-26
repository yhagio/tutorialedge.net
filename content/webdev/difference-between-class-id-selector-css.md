---
author: Elliot Forbes
date: 2017-04-23T14:48:20+01:00
desc: In this tutorial we take a look at the exact differences between class selectors
  and id selectors in CSS
series: webdev
image: logo.png
tags:
- webdev
- css3
- html5
title: The Difference Between Class Selectors and ID Selectors in CSS
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

If you are new to CSS then you'll probably have noticed that some rules have selectors that start with `#` and some that start with `.` and even some that have none at all. The difference between the two is that the `#` rule is an id selector and the `.` is a class selector. 

* `.` - is a class selector that target elements with the correct `class` attribute.
* `#` - is an id selector that styles the element with the specified `id` attribute.

When I was initially learning HTML and CSS I was hit by this stumbling block a number of times and knowing this distinction between class selectors and id selectors can save you a lot of time.

# Class Selectors

In CSS we have this concept of selectors, in order for us to be able to style our html elements correctly, we have to ensure we use the right selector in the right place. Say, for example, we wanted to style all `<div>` elements that feature the *class* equal to `blue` with a blue background. We'd have to create a CSS rule that applies to the `.blue` selector.

```css
.blue {
  background-color: blue;
}
```

With this `.blue` rule above, only the following html element would be styled with a blue background.

```html
<div class="blue"></div>
```

# ID Selectors

If we want to style a html component that features an `id` attribute that equals `blue` then we have to use the `#` id selector which will style the single element tagged with this id. 

```css
#blue {
  background-color: blue;
}
```

The above rule will only style the element with the attribute `id="blue"` like our `<div>` tag does below.

```html
<div id="blue"></div>
```

<!--# Specificity

These two different types of selector have differing levels of something we call specificity. It's important to note that when an element features both and there is a collision between the rules, the id selector will generally get its way. 

```html
<div id="yellow" class="blue"></div>

<style>
.blue {
  height: 50px;
  width: 50px;
  margin: auto;
  background-color: blue;
}
#yellow {
  height: 50px;
  width: 50px;
  margin: auto;
  background-color: yellow;
}
</style>
```

## Output 

<div class="blue" id="green"></div>

<style>
#green {
  height: 50px;
  width: 50px;
  margin: auto;
  background-color: green;
}

.blue {
  height: 50px;
  width: 50px;
  margin: auto;
  background-color: blue;
}
</style>-->

# Summary

If you found there was something lacking about this tutorial then please feel free to let me know in the comments section below! If you wish to make any changes to this particular tutorial then you can also submit a pull request to the github repo for the site here: [TutorialEdge-v2](https://github.com/elliotforbes/tutorialedge-v2)