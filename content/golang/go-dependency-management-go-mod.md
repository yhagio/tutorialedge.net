---
title: "Go Dependency Management with Go Modules"
date: 2018-10-07T11:44:32+01:00
draft: true
---

Over the last few months, I've been working on an increasing number of Go
projects both in a professional capacity and in a personal capacity. One of the
trickiest aspects for new developers coming into a project however, seems to be
with dependency management.

When a new developer joins the fold and starts actively trying to work on a new
project, they undoubtedly face issues getting their dependencies right and
ensure everything is setup so they can run and develop the project on their
local machine.

This is the issue that Go modules tries to address and the functionality has
been included in the new Go 1.11 version of the language. With the introduction
of this new tool, it will hopefully rid Go programmers of the constraints of
having to checkout and develop their Go projects within a set subdirectory of
their `$GOPATH`.

This is going to have a massive impact on the usability of the language and will
undoubtedly lower the barrier to entry for all developers coming to grips with
the language. It's certainly something that I'm incredibly excited about and it
should hopefully help Go to increase in it's adoption.

# Getting Started with Go Mod

So, as it stands, Go 1.11 includes preliminary support for versioned modules and
as such the feature can only be used if you opt-in. To do this will require you
having both Go 1.11 downloaded on your machine and you'll also need to export
the `GO111MODULE` environment variable.

```
$ export GO111MODULE=on
```

Once both of these prerequisites have been taken care of, you are free to start
using the `go mod` command within your Go projects.

Awesome, so let's see what using this new feature looks like. Let's create a new
directory on our computer and run our `go mod init` command. Now, this takes in
the repository location for where this project will live, so if it was me, I
would have the project live under my github profile with the name
`elliotforbes/test-project`.

```
$ go mod init github.com/elliotforbes/test-project
```

On running this, you should notice that a new `go.mod` file is generated for you
and should contain something like this:

```
module github.com/elliotforbes/test-project
```

So, we've managed to initialize our Go project using the `go mod` tool. You may
notice that, when you import a new package into your project that you don't
currently have on your local machine, Go will automatically fetch the latest
version of that package before it kicks off your program.

From a usability point of view, this is a major improvement.

# Semantic Import Versioning

If you are developing, being able to pin you application against specific versions of packages and libraries that you know that work. This ensures that regardless of how long your software has been in production, you will have confidence that it will build successfully and work error-free without any nasty surprises.

Go Modules features a way of pinning your 

# Vendoring Packages



## Building With Your Vendor Directory

Sometimes, when you are working on tracking down a bug which is occuring in one of the packages that you import you may have to build your project with slightly modified versions of these specific packages.

This is where building with a `vendor` directory can come in incredibly useful and I have used this in the past tracking down a particularly weird bug that was specific to the hardware I was running on top of.

In order to build our project using these vendored dependencies can be done using this `go build` command:

```output
$ go build -mod vendor main.go
```

# Conclusion

Hopefully this tutorial has demystified the art of dependency management in Go
with the new Go modules.

We have covered a lot in this particular tutorial. We have covered the basics of dependency management in Go as well as some tricks that you can use to make your go development experience easier.

## Further Reading

If you enjoyed this tutorial, then you may also enjoy some of the other tutorials on this site:

* []()
