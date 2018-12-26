---
title: "Building a Solid Continuous Integration Pipeline with TravisCI for Your Go Projects"
date: 2018-10-16T20:10:30+01:00
weight: 36
desc: In this tutorial, we look at how you can build a solid CI pipeline with Travis for your Go Projects
series: golang
image: golang.png
tags:
- advanced
author: Elliot Forbes
twitter: https://twitter.com/Elliot_f
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

So, I recently partook in [Hacktoberfest](https://hacktoberfest.digitalocean.com/) which is an event that helps to support thousands of different Open Source projects. Usually, I tend to get caught up in other projects or can't find the time or make up a hundred other excuses for not taking part.

This year however, is different, and I've made an attempt at doing more Open Source work just so I can earn myself a free t-shirt. And also to force myself to improve my Go programming skills and contribute back to a community I'm incredibly grateful for. But mostly for the t-shirt...

So, through my travels, one thing seemed to be prevalent across multiple high-quality projects and that was they had a solid **continuous integration**, and sometimes **continuous deployment** pipeline that is triggered whenever somebody makes changes to their codebase. 

# The Benefits of a CI/CD Pipeline

If you haven't built a highly used package before, the benefits of a CI/CD pipeline may not be immediately obvious to you. If you have built a highly-used package then feel free to move on to the next section of this article.

Building a solid CI/CD pipeline around your package can help to infinitely improve the packages useability and if you are going to build an incredibly successful open source package, this is something you seriously have to consider in order to ensure you don't piss off users by deploying breaking changes or broken code.

* CI, or *Continuous Integration* is a practice that helps you to automatically test and merge any changes to your codebase in such a way that new version release day is easy. 

* CD, or *Continuous Deployment* is a practice that ensures that you can deploy your application with any new changes in a quick and sustainable way. We won't be worrying about the CD section of the pipeline in this article as that could have an infinite number of deployment platforms and cataloging these all would be an ongoing slog. 

# A Overview of our Simple Pipeline

So, let's start this article by envisioning the perfect pipeline for our package. Our pipeline **must**:

* Automatically format any new code to ensure it meets our standards
* Automatically test any new code to ensure we don't break parts of our codebase
  * This could potentially include any older versions of Go if you have users pinned to particular versions
* Prevent breaking changes from being merged into our master branch
* Ask for reviewers to ensure malicious actors aren't going to inject working but infected code into our project

Now, the process for making any changes to our Go package will be slightly more complex than your standard `git commit` and `git push origin master`. We'll have to lock down our project so that we can't directly commit to our `master` branch. Why you may ask? well, so that we can enforce every change to our package to go through the pipeline we'll be fleshing out later on in this article. 

# Step 1 - Setting up Travis-CI

The very first thing we will have to do, is to set up travis to work with our open-source project. You'll have to register an account with them if you haven't already, from there, you'll then be able to find the project you want to enable and you can toggle it:

![Setup Travis](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/golang/go-ci-pipeline/screenshot-04.png)

This will then take you to a build page for your repository, which will look a little something like this, but with no builds:

![travis homepage](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/golang/go-ci-pipeline/screenshot-05.png)

Once you have successfully set this up, it's time to go about adding a `.travis.yml` file to the root of your project. When you add this, Travis-CI will automatically see this and execute whatever pipeline you define within it:

```yaml
# .travis.yml
language: go

sudo: false

go:
  - "1.8"
  - "1.9"
  - "1.10"
  - "1.11"
  - tip
```

Now, with everything on the travis side setup, we can move on to triggering our pipeline and adding more functionality to it. Right now it doesn't do an awful lot, so let's change that!

# Step 2 - Trigger with a Pull Request

Now, if you are working in your own repository, you'll need to have self-discipline in order to ensure you never commit directly to master. Whenever you want to make a change to your code, you simply branch off like so:

```s
$ git checkout -b new-feature-branch
```

And this will automatically create a new branch, `new-feature-branch` and checkout that newly created branch. You'll then be able to make your changes to your code and commit them to your newly created branch. 

When you are finally happy with your changes and you want to merge them into `master` to make them available to the rest of the world, you then open up your project in Github and you create a new Pull Request from your `new-feature-branch`. 

Now, this is where the interesting stuff happens. When you create this new pull request, Travis-CI will automatically pick this up and kick off your pipeline for you. Within your newly created Pull Request, you should see that this has been kicked off and it'll then let you know if the code you wish to merge is fit to merge based off our previously defined tests and formatting.

# Step 3 - Adding Some Tests

So, now that we have a basic pipeline in place, it's time to extend it a bit and get it to automatically run a couple of unit tests for our code. We can start by adding an extra line to our script section:

```yaml
language: go

sudo: false

go:
  - "1.8"
  - "1.9"
  - "1.10"
  - "1.11"
  - tip

script:
  - go test -v -race $(go list ./... | grep -v vendor)
```

Let's extend our Go package to include a simple `Calculate()` function that we can subsequently test:

```go
// main.go
package main

import (
	"fmt"
)

func Calculate(x int) int {
	return x + 2
}

func main() {
	fmt.Println("Go CI Pipeline Tutorial")
}
```

Let's add a really simple test to a `main_test.go` file within our project. This doesn't necessarily follow the best testing practices, but it does highlight the concept I'm trying to show:

```go
// main_test.go
package main

import "testing"

func TestCalculation(t *testing.T) {
	if Calculate(2) != 4 {
		t.Fatal("Someone has goofed")
	}
}
```

When we try and run this test locally, we see that all tests pass. Awesome, 

# Step 4 - Auto Formatting our Code

Now that we've got our tests automatically running on a code change, it's time to add automatic formatting using gofmt. 

> **Note -** If you want to learn more about the `gofmt` tool, you can read up on it here: [gofmt](https://golang.org/cmd/gofmt/)

Let's update our `.travis.yml` file to include a gofmt step in our script. We'll do this prior to running our test suite as any failures at the format stage make the tests passing or failing irrelevant.

Create a new file called `.travis.gofmt.sh` within your project's root directory and add the following:

```sh
#!/bin/bash

if [ -n "$(gofmt -l .)" ]; then
  echo "Go code is not formatted:"
  gofmt -d .
  exit 1
fi
```

If you are unfamiliar with scripting, this essentially goes away and runs the `gofmt` command with the -d flag in the current directory. If this fails, it will throw exit code 1 and the build will ultimately fail.

We then need to update our `.travis.yml` file to run this new shell script like so:

```yml
language: go

sudo: false

go:
  - "1.8"
  - "1.9"
  - "1.10"
  - "1.11"
  - tip

script:
  - ./.travis.gofmt.sh
  - go test -v -race $(go list ./... | grep -v vendor)
```


# Step 5 - Setting up Reviewers in Github

Finally, should all of our tests and formatting checks pass, we need to set up some reviewers for our project that will be able to manually verify that we aren't adding malicious code or extending the project in a way that is unsuitable.

In order to do this, we need to go to the `Settings` tab within our github project and check the box that asks `Require pull request reviews before merging`:

![setting up reviewers](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/golang/go-ci-pipeline/screenshot-01.png)

You'll also want to check the `Require status cheks to pass before merging` option to ensure that the pipeline we have put in place is actively enforced for every pull request.

After this is done, we've successfully pulled together a really simple and effective continuous integration pipeline for our Go project. 

# Step 6 - Testing it All Works

Now that everything is in place, it is time to test it all works. Create a new branch on your project and open a new pull request to `master` from your branch.

![branch to master](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/golang/go-ci-pipeline/screenshot-02.png)

This will then go off, and attempt to run our travis-CI pipeline:

![travis-ci](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/golang/go-ci-pipeline/screenshot-03.png)

And finally, you will be able to merge (if approved) into master:

![merge to master](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/golang/go-ci-pipeline/screenshot-04.png)

If you have set up your branch rules correctly, any outsiders attempting to submit a PR into your project will have to be reviewed and approved over and above passing the travis pipeline before they can get their changes into master.

# Conclusion

Now, I've put all of this together for you in a handy project repo which can be found here: [elliotforbes/go-ci-pipeline-example](https://github.com/elliotforbes/go-ci-pipeline-example). Hopefully, this helps you in some way and if it does, then feel free to let me know in the comments section down below! 

If you have any feedback or any further questions, I'd also love to hear them so please do get in touch either via the comments or via my twitter: [@Elliot_f](https://twitter.com/elliot_f).