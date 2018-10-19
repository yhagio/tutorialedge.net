---
title: "Go Dependency Management with Go Modules"
date: 2018-10-07T11:44:32+01:00
draft: true
---

Over the last few months, I've been working on an increasing number of Go projects both in a professional capacity and in a personal capacity. One of the trickiest aspects for new developers coming into a project however, seems to be with dependency management. 

When a new developer joins the fold and starts actively trying to work on a new project, they undoubtedly face issues getting their dependencies right and ensure everything is setup so they can run and develop the project on their local machine.

This is the issue that Go modules tries to address and the functionality has been included in the new Go 1.11 version of the language. With the introduction of this new tool, it will hopefully rid Go programmers of the constraints of having to checkout and develop their Go projects within a set subdirectory of their `$GOPATH`. 

This is going to have a massive impact on the usability of the language and will undoubtedly lower the barrier to entry for all developers coming to grips with the language. It's certainly something that I'm incredibly excited about and it should hopefully help Go to increase in it's adoption.

# Getting Started with Go Mod

So, as it stands, Go 1.11 includes preliminary support for versioned modules and as such the feature can only be used if you opt-in. To do this will require you having both Go 1.11 downloaded on your machine and you'll also need to export the `GO111MODULE` environment variable. 

```
$ export GO111MODULE=on   
```

Once both of these prerequisites have been taken care of, you are free to start using the `go mod` command within your Go projects.

Awesome, so let's see what using this new feature looks like. Let's create a new directory on our computer and run our `go mod init` command. Now, this takes in the repository location for where this project will live, so if it was me, I would have the project live under my github profile with the name `elliotforbes/test-project`.

```
$ go mod init github.com/elliotforbes/test-project
```

On running this, you should notice that a new `go.mod` file is generated for you and should contain something like this:

```
module github.com/elliotforbes/test-project
```

So, we've managed to initialize our Go project using the `go mod` tool. You may notice that, when you import a new package into your project that you don't currently have on your local machine, Go will automatically fetch the latest version of that package before it kicks off your program. 

From a usability point of view, this is a major improvement.

# Semantic Import Versioning



# Vendoring Packages

# Conclusion

Hopefully this tutorial has demystified the art of dependency management in Go with the new Go modules. 