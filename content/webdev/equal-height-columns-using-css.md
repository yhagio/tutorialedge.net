---
author: Elliot Forbes
date: 2017-04-15T09:19:19+01:00
desc:
  In this tutorial we'll be taking a look at how we can easily create equal
  height columns using CSS and HTML and a new feature of CSS, the Flex Box.
series: webdev
image: logo.svg
tags:
  - css3
title: Equal Height Columns in a Row using Flex Box
twitter: https://twitter.com/Elliot_F
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

<p>In this tutorial I'll be showcasing how we can achieve equal heights on our columns using the CSS and HTML. More specifically I'll be demonstrating the Flex Box feature of CSS which allows us to create these equal height columns without resorting to a nasty javascript workaround.</p>

<h2>Flex CSS</h2>

```css
.list {
  display: flex;
  flex-wrap: wrap;
}

.list-item {
  background-color: #eee;
  display: flex;
  color: white;
}
.list-content {
  padding: 1.5em;
}
```

<p>So how does this work? In our .list class we use display: flex; which initiates flexbox for the outer element. In order for our inner-elements to all have the same height, we have to use display:flex; once again in our .list-item css class.</p>

<!-- TODO: Add code for this and improve article -->