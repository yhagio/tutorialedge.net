---
title: "Part 8 - Deploying our Imgur Clone"
date: 2019-08-20T18:44:50+01:00
draft: true
weight: 7
desc: In this tutorial series, we are going to be building an Imgur clone using Lambda functions written using Node.JS and a frontend built using Vue.JS
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: vuejsimgurclone
image: vuejs.png
tags:
- beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this tutorial in the series, we are going to look at an incredibly important, but often overlooked aspect of project development and that is deploying our app in an automated fashion. 

# The Importance of Automated Deployment

Being able to automatically and reliably deploy updates to your applications is hugely important regardless of what you are developing. 

I have seen manual and complex deployments of applications cripple the development progress of teams. So getting this right from the start and ensuring that you consistently work to minimize any manual tasks is something that I advocate for hugely. 

As we now have a minimum viable product, now is exactly the right time where we should be automating the deployment of this new application.

# Travis CI

For the purpose of this tutorial series, we will be using the free Travis CI system in order to automatically build and deploy our application. 

You will be able to sign up to this using a GitHub account and once you have done this then you will be able to enable it specifically to watch for changes to your project's repository.

## Step 1 - A Simple Build Script

Let's first take a look at how we can set up a simple build job that will be triggered every time you make a code change to the `master` branch within our git repository. 

This will do the job of building our frontend Vue.Js application into a `build/` directory which will contain a built version of our code which we can subsequently deploy to wherever we wish.

<div class="filename"> .travis.yml </div>

```yml
language: python

script:
    vue run build
```

Now that we have created this `.travis.yml` file within our repository, we need to commit it. Upon committing and pushing this to our `master` branch, we should see that Travis will now attempt to build our frontend project for us.

## Step 2 - Deploying our Built Application

As the rest of this tutorial has been built on top of AWS, it makes sense that we also deploy our frontend application here to keep thinks simple. 

So, we'll be deploying our built frontend application to an S3 bucket which will serve up this application to our users. Once again, we will want to rely on an S3 bucket in which we can host our built frontend application and once again we will be relying on **terraform** to provision this S3 bucket for us as this is infrastructure.

Let's open up the `main.tf` file within our `terraform/` directory and add a new `resource` definition. We'll be adding this below the existing **bucket** resource definition:

<div class="filename"> terraform/main.tf </div>

```yml
...
resource "aws_s3_bucket" "frontend" {
    bucket = "dev-imgur-clone-frontend"

    tags = {
        Name = "Dev Imgur Clone Frontend"
        Environment = "Dev"
    }
}
...
```

With this in place, let's provision this by once again using the `terraform apply` command:

```output
$ terraform apply
...
Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

aws_s3_bucket.frontend: Creating...
aws_s3_bucket.frontend: Still creating... [10s elapsed]
aws_s3_bucket.frontend: Creation complete after 14s [id=dev-imgur-clone-frontend]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

Awesome, we now have a bucket in which we can deploy and serve our frontend application from!

## Step 3 - Deploying our Lambda Functions

Now, the frontend of our application isn't the entire application, we need to also be able to deploy the Lambda functions that we developed in part 5 of this tutorial series.

Seeing that we used serverless to help us construct our lambda functions, deploying these was done using the `serverless deploy` command. In order for our travis script to work with the `serverless` CLI tool, we will have to ensure we have the CLI installed.

Let's extend our existing `.travis.yml` file to include the steps necessary to install and use the `serverless` cli:

<div class="filename"> .travis.yml </div>

```yml

serverless deploy

```

With this now in place, let's test our automated deployment by making a code change to our repository.

### Handling Credentials

With this in place, the final piece of the puzzle is to give Travis the credentials needed in order to deploy your AWS account.

We can inject the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` using the following commands:

```output
$ 
$
```

With this final piece of the puzzle in place, we should now be able to update our `.travis.yml` in order to use these provided credentials and our serverless deploys will now automatically deploy the latest code changes to our account every time we make a commit to `master`!


# Conclusion

In the ultimate tutorial in this project series, we have managed to build a really quick and powerful automated deployment pipeline that will take any changes of our application merged into our master branch, and automatically deploy them to AWS with no manual intervention. 

## Closing Words

I very much hope that you have enjoyed this tutorial series and that it has helped give you an understanding as to how you can build and deploy your own applications using Vue.JS in conjunction with a backend technology such as AWS Lambda. 