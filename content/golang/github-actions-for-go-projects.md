---
title: "GitHub Actions for Go Projects"
date: 2020-06-07T10:12:45+01:00
desc: 👋 Welcome Gophers! In this article, we are going to be looking at how you can use GitHub actions to supercharge your Go project setup!
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
tags:
- intermediate
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

# 🧪 Platform and Version Matrix Builds

If you are working on a project that you have to test across multiple versions of Go or across multiple different architectures, then you can utilize the power of actions to aide you in your quest!

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

Let's try commit this and trigger this workflow now within our project.

You should be able to see the 9 jobs defined within our `3x3` matrix running and you should see the results of their execution like so:

![Matrix Running](https://images.tutorialedge.net/golang/action-matrix.png)

Obviously I have a fair bit of work to do in this example project to get the tests passing across all versions and platforms, however, I have removed the manual toil needed to run these myself.

# 🚢 Publishing Docker Images

The final action we are going to cover in this tutorial is a `publish` action which will take our committed code and then build a docker image from the `Dockerfile` within our project before then publishing it to Docker Hub. 

## 🙈 Managing Secrets

In this task, we'll have to figure out a way expose secrets to our task in a secure way. Thankfully, GitHub makes this easy for us and allows us to add secrets to each individual repository through the `settings` tab.

Navigate to the `settings` tab and then open `Secrets` and click the `New secret` button. We then need to add the `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets with your own Docker Hub credentials. 

With these in place, we can then pass them through to actions using `${{ secrets.VARIABLE_NAME }}`. 

> **Note** - Take care when creating custom tasks that you don't echo our these secrets or have the `-x` flag set in bash scripts. This could lead to secrets leaking in ways that you don't expect.

## 🛒 Using Predefined Marketplace GitHub Actions  

Now that we've covered passing secrets securely, we can now attempt to use these secrets with a pre-defined marketplace action that handles most of the complexity of publishing to Docker Hub for us. 

We'll be using `elgohr/Publish-Docker-Github-Action@master` in order to publish our image. It's worthwhile checking out the marketplace to see the full list of arguments this takes in, but for now we'll just be using the `name` of the image we want to publish as well as our `username` and `password` combo:

<div class="filename"> .github/workflows/publish.yml </div>

```yaml
name: Build and Publish Docker Image

on:
  push:
    branches: [ master ]

jobs:
  build-and-publish:
    runs-on: ubuntu-latest
    steps:
    # checks out our project source code
    - uses: actions/checkout@v2
    
    # Builds our docker image!
    - name: Build the Docker image
      run: docker build . --file Dockerfile --tag my-image-name:$(date +%s)

    # Publishes our image to Docker Hub 😎
    - name: Publish to Registry
      uses: elgohr/Publish-Docker-Github-Action@master
      with:
        # the name of our image
        name: forbsey/go-api
        # Here we pass in our Docker Username
        username: ${{ secrets.DOCKER_USERNAME }}
        # and our Docker password which 
        password: ${{ secrets.DOCKER_PASSWORD }}
```

If we commit this with our secrets set within our repository, we should see that our image is automatically published up to Docker Hub for us using the `username` and `password` combination. 

Perfect! We now have a fully functional `publish` action which will build and publish our Docker image for us up to Docker Hub from which we can now deploy to our hearts content!

# Conclusion

Awesome! 😎 So, in this tutorial, we have successfully created a number of very useful GitHub actions around one of our Go GitHub repositories!

This is by no means an exhaustive list, but hopefully it highlights just how powerful GitHub actions can be when added to your own projects!

## Further Reading:

If you found this article useful, you may also like some of these other articles on the site:

* [Github Actions for Beginners](/software-eng/getting-started-with-github-actions/)