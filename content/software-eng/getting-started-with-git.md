---
title: "Getting Started With Git"
date: 2019-11-24T10:48:50Z
draft: true
desc: Getting Started with Git
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: software-engineer
image: logo.svg
tags:
- beginner
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

It cannot be understated how important source control systems are when it comes to developing software. If you are just getting started in the world of computer programming then it is absolutely crucial that you nail this fundamental skill so that you can actively contribute your own code to any projects you may become a part of.

# Introduction

In this tutorial, we are going to step through some of the absolute basics when it comes to working with Git and source control systems so that you can start to create your own projects.

We are going to cover the following:

* The Fundamental concepts
* Git != GitHub
* Some basic commands
* Advanced Concepts - Branching, Forking + Pull Requests

By the end of this tutorial, you should be confident and capable of pulling down Open Source repositories from GitHub using the `git` CLI and making Pull Requests back into said repositories.

# The Fundamental Concepts

Let's dive into some of the fundamental concepts surrounding `git` that will highlight exactly why these source controls systems are needed in everyday development life for developers.

## Why Is It Needed?

Imagine you were working on a team of people in a room on a simple project. How would you go about ensuring everyone could work on the project at the same time whilst ensuring that each developer isn't stepping on the toes of another developer by changing their code?

You would need a really good communication system to signal to other developers what you are working on at a given time. This is a lot of effort though and with say 4 people in the team it requires a lot of mental gymnastics to keep track of where everyone is working at a given time.

Now imagine you scaled this up to thousands of developers that were located across the world? It would be a disaster and nothing would every get done.

Thankfully, this is where git, and more specifically source control systems, come in to save the day!

Source control systems such as git help us to orchestrate how developers can make changes to shared projects. They take away most of the hassle when it comes to merging in any changes you have made into the current latest version of the code, this is often referred to as the `master` copy or `branch`.  

## Basic Structure

Let's break down some of the concepts of git into separate pieces:

* `Repository` - This is where the source code of a project is held. The most popular place for this is `github`, but you can store your source code on any `git`-compatible version control system.
* `git cli` - This is the command-line tool that is used to interact with any repositories you create. You can use this tool to `push` or `pull` changes from a repository.
* `push` - This is the act of `push`-ing up any changes you have made to the source code to the `repository`.
* `pull` - This is the act of `pull`-ing down any changes other people have made to the source code in the `repository`.
* `commit` - This is your source code at a given period in time. Every time you make a change to your source code, it is tagged as a new `commit` and you can roll back to this commit should you need to.
* `clone` - The act of cloning a repository from one place to another. You typically do this when you want to start developing on top of someone else' code.
* `fork` - This is very similar to `clone`, but it creates a new repository in your account and gives you full admin rights to the code.
* `branch` - Branches are incredibly handy as they allow us to keep a working version of our code in our `master` branch, but give us the freedom to make and publish changes to the same code on another version of the code.
* `pull request` - When you are finally happy with any changes made on a branch, you can submit a `pull request` to merge both `branches` together!

This is quite a lot to take in, but don't worry! We will be covering each in more detail very shortly!

# Challenge - Making an Open Source Change

> I'm a great believer in learning through doing, so, if you wish you can follow allow these steps to practice the concepts you have just been taught. In this challenge, you will `fork` a `repository` that I have created and make a few minor changes to the code within this `repository`. 

You will then `commit` these changes locally and `push` them up to your own `forked` version and finally you will submit a `pull request` into the original location!

## Step 1 - Cloning

The first action we are going to take is to `clone` down the repository and then 

## Step 2 - Making Changes

Now that we have this repository on our local machine, it's time to make a few simple changes to the code. 

Before we make any changes, we will first want to create a branch in which we will be working from. This practice of branching off ensures that we always have a working copy of our code in the master branch and gives us free reign to make breaking changes on a separate copy of the codebase. 

<div class="filename"> command line </div>

```output
$ git branch -b feature-branch
``` 

> If you are working with a ticketing system such as JIRA then it is good practice to name your branches based on the ticket number you are working against. I.e. `git branch -b JIRA-0001`. This practice helps you track what changes have been made against the ticket and helps overall project organisation.

Now that we have created this feature branch, we can start making code changes and simple commits to the branch. 

> **Action** - Make some code changes and save these changes.

Now that we have made some changes, we can now commit these changes and push these up to our feature branch:

<div class="filename"> command line </div>

```output
$ git add -A 
$ git commit -m "Simple Changes"
$ git push origin feature-branch
```

The first 2 commands add the changes we have made and create a commit. These commits can then be pushed up to our feature branch using the `push` command. These changes have now been pushed up to our repository and other people can now pull down these changes to their own machines to work on them themselves should they wish.

## Step 3 - Making a Pull Request

At this point, we have pushed up our code to a separate branch from `master`. We haven't quite finished as we need to merge these changes into our `master` branch.

There are a number of different ways to do this, but for open-source contributions the most popular way is to create a pull request.

Within GitHub, on the home page for the repository that you are merging into, you should see a button for creating a pull request. 

![Create Pull Request Button]()

Click on this and it should give you a number of different options. Now, our aim is to merge our forked repository that we have been working on into the original repository so that our changes are available for everyone to see.

You should see the option to select your forked repository, select this and then select the master branch of `tutorialedge/learn-git` and create the pull request. 

After this point, I, as the repository owner, will get a notification saying that a new pull request has been opened and I will be able to review it and decide whether or not to merge your changes.



# Conclusion

So, in this tutorial, we have covered the absolute basics of `git` and source control. We have been able to learn some of the basic git commands needed to get up and running and we've also been able to try our hand at a practical example of

## Further Reading:

If you enjoyed this article then you may also enjoy some of my other articles on the site:

* [Designing a Production Ready REST API](/software-eng/designing-a-rest-api)