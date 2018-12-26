---
author: Elliot Forbes
date: 2017-08-28T18:47:50+01:00
desc: In this tutorial we'll be examining some of the best practices to follow when
  it comes to laying out your Python applications
series: python
image: python-logo.png
tags:
- intermediate
title: Python Project Layout Best Practices
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 9
---

> This tutorial was built using Python 3.6. It should also be noted that these are opinions and to be taken with a grain of salt.

Structure is an incredibly important aspect of all projects and following a standard structure when it comes to designing your systems plays a huge part in making it more maintainable. By following standards you are essentially easing the job of new programmers coming on to a project as they'll find it easier to navigate around and become comfortable with your systems.

Not only that but by following the right structure from the outset we prevent ourselves from having to perform costly refactoring further down the road and can potentially ease the transition from hobby side-project into a fully-fledged system.

# Structuring your Python Projects

When it comes to structuring your Python projects it makes sense to follow some semblance of structure or you will find yourself soon entangled in the heaps of spaghetti code that becomes a nightmare to work with. I can state as fact that it was my lack of structure that caused me a lot of pain and heartache when it came to writing my University dissertation project and if I knew then what I know now, I may have gotten a marginally better grade for far less work.

## Simple Project Structure

For simple Python projects your projects structure you can typically keep most, if not all of your source code contained within the one directory level like so:

```python
mypackage/
- mypackage.py
- setup.py
- requirements.txt
- travis.yml
- tests/
```

This keeps everything succinct and easy to navigate through but bear in mind that if your project starts to grow substantially then keeping everything in the one `mypackage.py` file is a bad idea. This is where you'll typically have to migrate to a more advanced project structure.

## Advanced Project Structure

For more advanced ones however you'll tend to find it looking something like this:

```python
mypackage/
- mypackage/
- - mypackage.py
- - module1/
- - module2/
- - module3/
- tests/
- - mypackage_test.py
- bin/
- - script1.sh
- lib/
- - lib1
- doc/
- - doc1.md
- apidoc/
- requirements.txt
- setup.py
- runtime.py
- travis.yml
```

The majority of your projects code will fall under the second `mypackage/` directory and will from there be split up into distinct modules. 

We split all of our projects tests into a separate `tests/` directory as well as creating a `bin/` directory for any scripts that we want in our project.

> Under Construction - This is a placeholder for an article that is currently under construction