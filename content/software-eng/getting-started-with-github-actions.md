---
title: "Getting Started With Github Actions"
date: 2020-04-14T11:23:28+01:00
draft: true
desc: Welcome Everyone! In this tutorial, we are going to be looking at GitHub actions and how you can use them for fame and fortune in your own GitHub repositories!
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: software-engineer
image: logo.svg
tags:
- ci-cd
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

GitHub actions have taken the developer universe by storm since their release to general availability earlier this year. The have been huge amounts of developers choosing to utilize this new feature to help automate the tedious tasks away and ultimately save developers a heap of time.

In this tutorial, we are going to be walking through the basics of GitHub actions and why you should be considering them for use in your own projects in the near future!


## Introduction

Let's start off by defining a really simple function that we'll want to run every time we make a change to the `master` branch of our project. 



{{% row %}}
{{% column %}}
<div class="filename"> .github/workflows/hello-world.yml </div>

```yaml
name: Simple Job

on:
  push:
    branches:
      - master

jobs:
  Hello:
    runs-on: ubuntu-18.04
    steps:
      - name: Hello World!
        run: echo "Hello World"
```
{{% /column %}}

{{% column %}}
### Hello World Action

In this action, which we've called `Simple Job`. We have set this up so that every time you push a change to the `master` branch of your project, it will trigger the `Hello` job!

Within the definition of this `Hello` job, we have specified that we want this job to run on a `ubuntu-18.04` image and we've defined the series of steps we want to run through.

In this case, we have just defined 1 solitary step in this job which we've called `Hello World!`. You'll see that within this `step` we have defined what we are going to `run`, which in this case simply prints out `Hello World!`

{{% /column %}}
{{% /row %}}

## Prerequisites

## Conclusion

### Further Reading:

* []()