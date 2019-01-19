---
author: Elliot Forbes
date: 2018-06-09T22:48:26+01:00
desc: In this tutorial, we are going to look at how you can implement a testing framework
  for your TypeScript projects using Mocha and Chai
image: golang.png
draft: true
series: 
- gofacerecognition
tags:
- Face Recognition
title: Part 1 - An Introduction to Face Recognition in Go
twitter: https://twitter.com/Elliot_F
weight: 2
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

Let's dive into the course by covering the theory. We'll begin by covering a few of the various face recognition algorithms currently in use and then we'll discuss roughly how our chosen face recognition algorithm will work.

Face Recognition technology is relatively new in the grand scheme of things. Some of the most well-used face recognition algorithms were only conceived in the 1990's and are about the same age as myself. 

This technology has truly revolutionized consumer electronics and we see face recognition as a "must-have" accessory for our smart phones and watches. 

# The Different Face Recognition Algorithms

In recent years we have seen a majority of the largest tech companies come out with various research papers on doing mass facial recognition and detection at huge scale. 

* [Google's FaceNet Research Paper](https://arxiv.org/abs/1503.03832)
* [Facebook's DeepFace Research Paper](https://www.cs.toronto.edu/~ranzato/publications/taigman_cvpr14.pdf)

These both require *deep neural networks* or *convolutional neural networks* and as such, will be out of scope for what we are trying to achieve in this course.

We'll be focusing on the somewhat simpler, but still very effective Local Binary Patterns Histogram algorithm. 

# Local Binary Patterns Histogram - Our Algorithm of Choice

So, the algorithm we'll be implementing through the course of this series is going to be the local binary patterns histogram algorithm. 

That's quite a mouthful to say, but the underlying algorithm is beautifully simple. 

# Alternative Algorithms and Implementations

If you are just interested in getting a quick and simple face recognition up and running without knowing the details, then you can certainly rely on libraries such as OpenCV which already come with out of the box implementations of the LBPH algorithm as well as the Eigenfaces and Fisherfaces algorithms.

However, the goal for this course is to try and give you a deeper insight into what it takes to develop your own face recognition system including the underlying mathematical component.

# Next Part of the Series



* [Part 2 - Local Binary Patterns](/projects/face-recognition-with-go/part-2-local-binary-patterns/)