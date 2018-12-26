---
author: Elliot Forbes
date: 2017-06-12T08:49:04+01:00
desc: In this tutorial we look at how you can add images to your hugo content pages
series: hugo
image: golang.png
tags:
- hugo
title: Hugo Adding Images To Markdown Posts
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this quick tutorial we are going to look at the various ways you can add images to your markdown content in hugo. 

# Markdown Annotation

The quickest and simplest way of adding images to your content would be to use markdown annotation. Place the image you want to display in your post within your `static/` directory and then reference it in your markdown like so:

```md
![image alt text](/my_image.png)
```

# Using HTML Tags

In the situation where you need to add say a custom css class to the image then your second option is to simply use an `<img/>` tag within your markdown content. Hugo is smart in the sense that it will automatically include html content within your markdown content without modifying it.

```html
<img class="special-img-class" src="/my_images.png" /> 
```

> This tutorial was written using Hugo version 0.19. However due to the nature of the content it should work with any version of hugo.