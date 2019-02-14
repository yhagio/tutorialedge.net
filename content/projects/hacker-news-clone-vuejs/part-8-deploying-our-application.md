---
author: Elliot Forbes
date: 2018-03-19T16:24:13Z
desc: In this tutorial, we are going to be looking at how you can deploy your HackerNews clone up to AWS using their S3 service
image: vuejs.png
series:
- hackernewsclone
tags:
- vuejs
- javascript
title: Part 8 - Deploying Our HackerNews Client To AWS
twitter: https://twitter.com/Elliot_F
weight: 8
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this final lesson in the series, we are going to be taking a look at how you can deploy your finished application up to AWS so that it is available for the world.

We'll cover how to do this in an automated fashion using the Travis-CI platform and we'll also cover some of the various methods of improving performance using services such as CloudFront.

# Setting up a CI/CD Pipeline

Now that we have a basic level of functionality within our application, it makes sense to deploy it, have our users see it, and interact with it and hopefully provide feedback on it as soon as possible. 

By getting feedback from the users of any of our project early, we can better decide what parts we should focus on next to improve user experience and basically improve the overall quality of our application. 

This iterative approach to building up our application is something I would recommend doing with **all** your projects. Get it in the hands of your users as soon as possible and build based on their feedback. 

## How a Pipeline Helps

When you start seriously developing a project or application, there comes a time where the amount of time you spend on deploying the newer versions of that application surpass the amount of time it takes to implement a continuous integration/continuous deployment pipeline (CI/CD pipeline for short).

The earlier on you implement a good CI/CD pipeline in your project, the more time you save in the long run, so doing this right and from the start can certainly improve the chances of a successful project.

## Travis-CI

For this particular course, we are going to be using the free-to-use [Travis CI](https://travis-ci.org/). If you are developing open-source libraries, applications, etc... then this is *the* tool to use for continuously testing and deploying your stuff.




# Conclusion

Hopefully you found this final part of the series educational! These courses take a long time to develop and fine tune over time, so if you can, I would massively appreciate you sharing this course with your friends and getting the word out so that I can spend more time developing these courses.

