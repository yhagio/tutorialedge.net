---
title: "Github Actions for Go Projects"
date: 2020-06-07T10:12:45+01:00
draft: true
desc: 👋 Welcome Gophers! In this article, we are going to be looking at how you can use Github actions to supercharge your Go project setup!
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
tags:
- beginner
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

👋 **Welcome Gophers!** In this tutorial, we are going to be taking a look at how you can leverage GitHub actions for fame and fortune within your own Go projects!

Specifically, we are going to be taking a look at how you can build your own GitHub actions by starting off with a `"Hello World"` example and then ramping it up to more useful actions such as code linting and test coverage reporting!

# 🚀 What are GitHub Actions? 

GitHub actions have just recently become generally available to everyone with a repository on GitHub. 

They are an incredibly versatile tool that allows us to trigger code off the back of any changes pushed to our project's branches. This is awesome as it allows us as Go developers to programmatically trigger anything we need off the back of a commit to master. 

**For example**, whenever I make a change to the `master` branch of the repository for this website, GitHub actions automatically run through a series of jobs that build, and deploy the website into production as well as running through a number of checks to see if there are any broken links on the site and validating that the site is at least meeting the basic requirements around accessibility thanks to a lighthouse report generated.

# 🧙 A Simple Action

Let's start off by defining a simple GitHub action for one of our Go projects. 

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
## Hello World Action

In this action, which we've called `Simple Job`. We have set this up so that every time you push a change to the `master` branch of your project, it will trigger the `Hello` job!

Within the definition of this `Hello` job, we have specified that we want this job to run on a `ubuntu-18.04` image and we've defined the series of steps we want to run through.

In this case, we have just defined 1 solitary step in this job which we've called `Hello World!`. You'll see that within this `step` we have defined what we are going to `run`, which in this case simply prints out `Hello World!`

{{% /column %}}
{{% /row %}}


# Something more useful... Automatic Linting! 🤓

Now that we have a basic handle on building our own GitHub actions for our project, let's take it a step further and start defining some actions that will be genuinely useful to us as maintainers of Go projects.

Let's start by defining an action that, when a pull request comes in to our project, it will automatically lint the incoming code and validate that it meets our project's standards!

Let's start by creating a new workflow file within our project called `.github/workflows/lint.yml`. We'll be defining our action within this file:

<div class="filename">.github/workflows/lint.yml</div>

```yaml
name: Lint Go Code

on:
  push:
    branches:
      - master

jobs:
  lint:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-go@v2
        with:
          stable: 'false'
          go-version: '1.14.1'

      - name: Lint
        run: |
          curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin v1.26.0

          golangci-lint run
```

Once you have this `lint.yml` file update, let's `git add`, `git commit`, and `git push` this to our project repository.  

Upon pushing this up to our GitHub repository, we should be able to see the workflow running within the `actions` tab of our repo. 

![GitHub Actions Successful Run](https://images.tutorialedge.net/golang/successful-action.png)

# ⚒️ Building Release Artifacts

If you are working on a project that you have to test across multiple versions of Go or to release across multiple different architectures, then you can utilize the power of actions to aide you in your quest!

Let's build in a simple GitHub action that will build our project across a variety of different Go versions now:

<div class="filename"> .github/workflows/test.yml </div>

```yaml
on:
  push:
    branches:
      - master

name: Test Across Matrix

jobs:
  test:
    # We want to define a strategy for our job
    strategy:
      # this will contain a matrix of all of the combinations
      # we wish to test again:
      matrix:
        go-version: [1.12.x, 1.13.x, 1.14.x]
        platform: [ubuntu-latest, macos-latest, windows-latest]
    
    # Defines the platform for each test run
    runs-on: ${{ matrix.platform }}
    
    # the steps that will be run through for each version and platform
    # combination
    steps:
    # sets up go based on the version
    - name: Install Go
      uses: actions/setup-go@v2
      with:
        go-version: ${{ matrix.go-version }}

    # checks out our code locally so we can work with the files
    - name: Checkout code
      uses: actions/checkout@v2
    
    # runs go test ./...
    - name: Test
      run: go test ./...
```



# Conclusion

Awesome! 😎 So, in this tutorial, we have successfully created a number of very useful GitHub actions around one of our Go GitHub repositories!

This is by no means an exhaustive list, but hopefully it highlights just how powerful GitHub actions can be when added to your own projects!

## Further Reading:

If you found this article useful, you may also like some of these other articles on the site:

* [Github Actions for Beginners](/software-eng/getting-started-with-github-actions/)