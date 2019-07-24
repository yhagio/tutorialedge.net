---
title: Go Modules Tutorial
date: 2019-04-19T08:34:10.000+00:00
desc: In this tutorial, we are going to be looking at how you can successfully work
  with modules in Go!
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
tags:
- beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg

---
**In this tutorial, we are going to be looking at how you can use Go modules** in your Go applications
to simplify the way you work with dependencies for your Go applications. We will be looking at
how Go Modules work, and also what problems they solve for us, before finally going into developing a simple
Go application which uses Go Modules.

# Goals

By the end of this tutorial:

* You will have a solid understanding of Go Modules
* You will be able to build a Go package which uses Go Modules

# Prerequisites

In order to follow this tutorial, you will have to have the following:

* You will need Go version 1.11+ installed on your development machine.
* You will need an account on GitHub

# Why Go Modules?

There has been a lot of turbulence in the dependency management space in the Go language
over the last few years. We've seen tools such as `dep`, `godep`, `govendor` and a whole
heap more come into the scene to try and solve this problem once and for all.

Go Modules is deemed to be the _official_ attempt at a solution for handling dependencies
within your Go applications _going_ forward. The main reasoning for this piece of work
was to essentially allow Go developers to use semantic versioning for their Go packages.

Semantic Versioning is very widely adopted practice of labeling different versions of your
applications and various packages and libraries with a semantic version number. This number
looks a little something like this: `v1.2.3`, where `1` would be the **major** version of your
application, `2` would be the **minor** version, and `3` would be the **patch** version.

* **Major Versions** - All the versions within a particular major version _should_ be backwards
  compatible with other minor and patch versions. Incrementing this typically tells other developers
  using your package that you have made some **breaking** changes to how your package works.
* **Minor Versions** - Developers tend to increment minor versions of their package or application
  when they have added new functionality, or new features to the package whilst _maintaining backwards
  compatibility_ within the rest of the application.
* **Patch Versions** - Patch versions are typically used for general bug-fixes. If a developer notices
  a slight issue or bug within their application, they can fix the issue whilst again ensuring
  backwards compatibility and then increment the patch version by one to indicate new bug fixes.

> **Note** - You can find the original proposal for versioned Go modules here:
> [Proposal: Version Go Modules](https://go.googlesource.com/proposal/+/master/design/24301-versioned-go.md)

## The Problem

Imagine you are developing a Go service that has a number of key dependencies
such as `package A`. Now, at the time of writing your service `package A` has
a set interface and works in a set way.

However, what happens when the maintainers of `package A` update their program to fix
a bug or extend functionality? You might get lucky and their changes might not impact
your application, however, you might be unlucky and these changes subsequently break
your application.

This is where versioning comes in to save the day. By using versioning, we can
select the precise versions of a package or library that we wish to use and
ensure that whenever we build our package, it always uses the specified version.

# A Simple Example

In this part of the tutorial, we are going to build an simple Go package which
will use Go Modules to handle dependencies.

Let's start by creating a new project in which our application can run called
`go-modules-test/`:

```output
$ mkdir -p go-modules-test
$ cd go-modules-test
```

Next, within this, we are going to want to initialize our project to use
modules. We can do this using the `go mod init` command and specifying a
placeholder github repo link.

```output
$ go mod init github.com/tutorialedge/go-modules-test
```

This will go away and generate a `go.mod` file which will contain all of our Go application's
dependencies.

Once you have done this, create a new file within your project directory called `main.go`.

<div class="filename"> go-modules-test/main.go </div>

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello World")
}
```

Let's verify everything is working at this point by trying to run our simple Go applications:

<div class="filename"> $ go run main.go </div>

```output
Hello World
```

# Adding Dependencies To Your Project

Now that we have a basic project initialized and using go modules, let's take this a step further
and look at how we can introduce new dependencies into our codebase.

For the purpose of this tutorial, we are going to be importing a custom Go package called
`"github.com/elliotforbes/test-package"` which has a number of features that will allow us to
become more familiar with the more advanced practices of dependency management with Go modules.

At the top of your `main.go` file, let's start by importing this new package. After this has been
imported, let's look at using some of the functions that are declared within that package:

<div class="filename"> go-modules-test/main.go </div>

```go
package main

import (
    "fmt"

    sample "github.com/elliotforbes/test-package"
)

func main() {
    fmt.Println("Hello World")
    sample.MySampleFunction()
}
```

Now that we have added that package to the list of imports at the top of our program, we can then
try to use some of the

<div class="filename"> $ go run main.go </div>

```output
go: finding github.com/elliotforbes/test-package v2.0.0
go: downloading github.com/elliotforbes/test-package v2.0.0
go: extracting github.com/elliotforbes/test-package v2.0.0
Hello World
Version 2.0 of this Function
Hello World
```

Awesome, we have been able to define a really simple Go application that uses Go modules and
import an external dependency for use within said Go application!

# Handling Major and Minor Versions

As it stands, when our application imports the package: `"github.com/elliotforbes/test-package"`, it'll
import the latest version to start with. If we wanted fine grained control over what versions we import
then we can define the precise versions we need within our `go.mod` file:

<div class="filename"> go.mod </div>

```output
module github.com/TutorialEdge/go-modules-tutorial

go 1.12

require github.com/elliotforbes/test-package v2.0.0
```

When we once again go to run this after modifying the version from `v2.0.0` to `v1.0.0` of our package, we should see the following:

<div class="filename"> $ go run main.go </div>

```output
go: finding github.com/elliotforbes/test-package v1.0.0
go: downloading github.com/elliotforbes/test-package v1.0.0
go: extracting github.com/elliotforbes/test-package v1.0.0
Hello World
Version 1.0 of this Function
Hello World
```

We have successfully been able to define the exact version of the package we want to use in
our production environment. This again gives us greater confidence in what we are releasing and
ensures that when we finally push our application into production environments, it doesn't break
catastrophically on us due to the underlying package changing without our knowledge.

# Conclusion

I hope that you enjoyed this tutorial and it has given you some insight into how
you can use Modules within your own Go applications.
