---
author: Elliot Forbes
date: 2017-05-27T11:13:46+01:00
desc: In this tutorial we look at how you can get started writing your first hugo
  based website
series: hugo
image: golang.png
tags:
- hugo
title: Getting Started With Hugo
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

Hugo is an incredibly popular static site generator written primarily in Go and it is currently running this site. With Hugo you would typically define all of your content in the form of markdown files. These markdown files are then parsed and combined with a number of template files and you are left with a fully functioning html page that you can easily host anywhere. There are a number of key advantages to this approach such as:

* You don't have to deploy and manage a database to store all your content
* Static content is lighteningly quick. No database calls have to be made so it's almost instant
* You know exactly what you are deploying as you can preview the generated public folder
* The likelihood for your site to crash is minimal as there are no moving parts involved other than the server
* It's incredibly secure, no database calls or systems behind your site mean there is nothing to attack
* It can be managed in a public repository such as github.

In this tutorial I'm going to be showing you some of the essentials of hugo in order to help you get up and running with your own staticly generated website.

# Getting Started

> In order to download Hugo you can visit this site: [https://github.com/spf13/hugo/releases](https://github.com/spf13/hugo/releases)

Once you've successfully installed hugo and can access it from the command line then building a site is relatively simple.

## Generating a New Site

In order to generate a brand new hugo based website you can run the following command:

```bash
hugo new site mySite
```

This will automatically create a new directory called mySite which will feature all of the components we require for our new hugo based website.

## Layout

The layout of all hugo websites typically looks something like this:

```go
|-- archetypes // you can add new configuration properties here
|-- config.toml // our websites main config file
|-- content // where all of our content will go
|-- data // site generation config goes here
|-- layouts // where all our templates will go
|-- static // our images, css, js files all go here
|-- themes // the location of our website theme
```

# Hugo CLI

Hugo has a number of very useful, and very powerful cli based tools which can really help the efficiency of how you work on your site.

## Live Server

One of the best features of hugo is the inbuilt live server that it comes with. The live server allows you to make changes to your content and layouts and update your browser in real-time to reflect these changes. If you have multiple monitors then this can be incredibly powerful, work on the code on one monitor and instantly see changes to your pages on the other.

```bash
hugo server --buildDrafts
```

After running this command you should then be able to navigate to `http://localhost:1313` and see the generated index page for your site. 

Whilst running this in a console, every time you make a change to something you should see something like this outputting:

```bash
Change detected, rebuilding site
2017-05-27 11:35 +0100
Source changed /Users/elliotforbes/Projects/hugo-tutorialedge/tutorialedge/content/post/golang/hugo/getting-started-with-hugo.md
Built site for language en:
118 of 118 drafts rendered
... 
total in 87 ms
```

This indicates that it's seen a change to one of the files within your site and that it's rebuilding the entire site for you so that you can view it locally. 

## Generating New Content

Hugo comes with an inbuilt post builder that I find is quite handy for generating new posts quickly with the basic meta data provideed for us. In order to generate a new post for your site you can simply run the following command and it will automatically create the `post/test.md` file for you.

```bash
hugo new post/test.md
```

When we look at the contents of the `test.md` file you should see that it includes the following default meta data. This is the title, it's draft state and the date at which it was generated. All we then have to do is type the content below and we've got ourselves a new website page for our visitors to consume.

```t
+++
title = "test"

date = "2017-05-27T11:39:09+01:00"

+++
```

# CI/CD Pipeline

One major advantage of hugo and building sites using it is the fact that the build process is so simple. We can generate all the files necessary for our site with a simple `hugo` command. After this point we can then push up the files anywhere we want and they'll be live instantly.

Currently this site uses a tool called `jenkins` in order to automatically deploy any commits pushed to the master branch of our github repo live up on the site. This process looks something like this:

1. Make changes on my local machine and check they look ok.
2. Commit these changes to github
3. Jenkins see's that a commit has been made and then runs a deployment job
4. This deployment job pulls the latest version of the code from the github 
5. Jenkins then builds the entire website using the 'hugo' command
6. Jenkins then places the new files in the appropriate place on my webserver and the changes are live

All of this takes less than a minute to execute and is very easy to follow compared to some other methods I've used in the past. 

