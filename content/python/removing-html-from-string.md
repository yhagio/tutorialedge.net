---
author: Elliot Forbes
date: 2017-04-15T09:38:07+01:00
desc: this tutorial shows us how to remove the html tags from a retrieved html page.
  This will allow us to do cool stuff such as keyword density checking etc.
series: python
image: python-logo.png
tags:
- beginner
title: Removing HTML Tags from a String with Python
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

<p>This tutorial will demonstrate two different methods as to how one can remove html tags from a string such as the one that we retrieved in my previous tutorial on <a href="/python/fetching-web-pages-with-python">fetching a web page using python.</a></p>

# Method 1

<p>This method will demonstrate a way that we can remove html tags from a string using regex strings. </p>

```py
import re

TAG_RE = re.compile(r'<[^>]+>')

def remove_tags(text):
    return TAG_RE.sub('', text)
```

# Method 2

<p>This is another method we can use to remove html tags using functionality present in the Python Standard library so there is no need for any imports.</p>

```py
def remove_tags(text):
    ''.join(xml.etree.ElementTree.fromstring(text).itertext())
```

# Conclusions

<p>In the coming tutorials we will be learning how to calculate important seo metrics such as keyword density that will allow us to perform important seo analysis of competing sites to try and understand how they have achieved their success.</p>

<p>The methods for tag removal can be found here: http://stackoverflow.com/questions/9662346/python-code-to-remove-html-tags-from-a-string</p>

