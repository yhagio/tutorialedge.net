---
author: Elliot Forbes
date: 2018-02-18T09:16:39Z
desc: In this tutorial, we are going to look at how you can get started using the
  go dep tool for your go projects.
series: golang
image: golang.png
tags:
- intermediate
title: An Intro to Go Dep
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 13
---

In this tutorial, we are going to look at how you can use the `Dep` tool in go to manage your Go's project dependencies.

# Why dep?

The `dep` tool is the "official experiment" dependency management tool for the go programming language. It helps you to manage the ever-growing list of dependencies your project needs to maintain without a lot of overhead and it can pin you to specific versions of dependencies to ensure stability in your systems.

Without a dependency management tool, you may find yourself in a lot of pain when it comes to developing multiple different Go programs on the same machine. You may find that updating a particular dependency that is used by 6 projects on your machine ends up breaking 3 of said projects due to a small API change. 

# Installation

Installation of the `dep` tool can be done using homebrew, like so:

```bash
$ brew install dep
$ brew upgrade dep
```

Once these 2 commands have been run, you should have the `dep` CLI available to you within your terminal. 

## dep init

When getting started with the `dep` tool, the first thing you will typically have to run is the `dep init` command. This command does a lot of things and can be run on existing Go projects as well as newer ones.

When you call `dep init`, the tool does a few things:

1. It identifies the dependencies of your current project
2. It validates whether or not these dependencies use the `dep` tool
3. It picks the highest compatible version for each of these dependencies
  
# Creating a New Project

When it comes to creating a new project that relies upon `dep` you have a few options. The first and possibly best option is to create your project within your `$GOPATH`, much like you normally would, `cd` into that directory and then call `dep init`:

```c
$ mkdir -p $GOPATH/src/github.com/my/project
$ cd $GOPATH/src/github.com/my/project
$ dep init
$ ls
Gopkg.toml Gopkg.lock vendor/
```

## Gopkg.toml

The `Gopkg.toml` file is where you specify your dependencies and the particular versions of these dependencies that you wish your project to use. Think of this as your `package.json` if you are coming from a `NodeJS` background, or your `pom.xml` if you are coming from a `Java` background.

## Gopkg.lock

The `Gopkg.lock` file is a transitively complete snapshot of your project's dependency graph that is expressed as a series of `[[project]]` stanzas. 

In layman's terms this is a list of every dependency and the particular revision of that dependency. 

## The vendor/ Directory

The `vendor/` directory is where your dependencies are stored. It's the equivalent to the `node_modules/` directory in your `NodeJS` projects.

# Helpful Commands

The `dep` command features 5 commands in total:

* `init` - Sets up a new Go project
* `status` - Reports the status of a project's dependencies
* `ensure` - Ensures a dependency is safely vendored in the project
* `prune` - Prunes your dependencies, this is also done automatically by `ensure`
* `version` - Shows the dep version information

You'll typically only work with the first 3 commands so I'll just be covering these in more detail. 

## dep ensure

The `dep ensure` command is quite possibly the most important command you will need to come to grips with when it comes to working with the `dep` dependency management tool. 

## Adding Dependencies

If you want to add new dependencies to your project you can do so by calling the `dep ensure -add` command and specifying the source for the project.

```go
$ dep ensure -add github.com/foo/bar github.com/another/project ...
```

## Updating Dependencies

Should you wish to update some of the dependencies within your project you can do that using the `-update` flag when calling `dep ensure`:

```go
// dry run testing an update
$ dep ensure -update -n 
// non-dry run
$ dep ensure -update 
// updates a specific package
$ dep ensure -update github.com/gorilla/mux 
// updates to a specific version
$ dep ensure -update github.com/gorilla/mux@1.0.0 
```

## dep status

The `dep status` command reports the status of a project's dependencies:

```go
$ dep status
// output
...
```

# Conclusion

Hopefully, this tutorial has shown you everything you need to get started with the `dep` tool. If you require any further assistance then please do not hesitate to let me know in the comments section below! 

> **Note -** If you want to keep track of when new Go articles are posted to the site, then please feel free to follow me on twitter for all the latest news: [@Elliot_F](https://twitter.com/elliot_f).