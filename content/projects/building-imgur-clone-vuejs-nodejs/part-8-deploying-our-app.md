---
title: "Part 8 - Deploying our Imgur Clone"
date: 2020-02-08T18:44:50+01:00
weight: 9
desc: In this tutorial series, we are going to be building an Imgur clone using Lambda functions written using Node.JS and a frontend built using Vue.JS
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: vuejsimgurclone
image: vuejs.png
tags:
- beginner
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

In this tutorial in the series, we are going to look at an incredibly important, but often overlooked aspect of project development and that is deploying our app in an automated fashion. The main goal for this tutorial is to show you **how you can fully automate both your Vue.js and your Serverless deploys using Travis-CI**.

## The Importance of Automated Deployment

Being able to automatically and reliably deploy updates to your applications is hugely important regardless of what you are developing. 

I have seen manual and complex deployments of applications cripple the development progress of teams, so getting this right from the start and ensuring that you consistently work to minimize any manual tasks is something that I am a huge advocate for. 

As we now have a minimum viable product, now is exactly the right time where we should be automating the deployment of this new application. 

## Travis CI

For the purpose of this tutorial series, we will be using the free Travis CI system in order to automatically build and deploy our application. 

You will be able to sign up to this using a GitHub account and once you have done this then you will be able to enable it specifically to watch for changes to your project's repository.

> **Note** - In order to set this up for your project, I recommend checking out the official docs here: [Travis CI Tutorial](https://docs.travis-ci.com/user/tutorial/)

### Step 1 - A Simple Build Script

Let's first take a look at how we can set up a simple build job that will be triggered every time you make a code change to the `master` branch within our git repository. 

This will do the job of building our frontend Vue.Js application into a `dist/` directory which will contain a built version of our code which we can subsequently deploy to our frontend S3 bucket that we'll be creating later on in this tutorial.

<div class="filename"> .travis.yml </div>

```yml
language: node_js
node_js:
  - 11

before_script:
- pushd frontend
- yarn install
- popd

script:
- pushd frontend
- yarn build
- popd
```

> **Note** - I've used `pushd` and `popd` as a way of navigating into and out of directories. These are incredibly handy unix navigation commands that I highly recommend adding to your unix vocabulary!

Now that we have created this `.travis.yml` file within our repository, we need to commit it. Upon committing and pushing this to our `master` branch, we should see that Travis will now attempt to build our frontend project for us.

![First Build](https://images.tutorialedge.net/images/imgur-clone/first-build.png)

### Step 2 - Deploying our Built Application

As the rest of this tutorial has been built on top of AWS, it makes sense that we also deploy our frontend application here to keep thinks simple. 

So, we'll be deploying our built frontend application to an S3 bucket which will serve up this application to our users. Once again, we will want to rely on an S3 bucket in which we can host our built frontend application and once again we will be relying on **terraform** to provision this S3 bucket for us as this is infrastructure.

Let's open up the `main.tf` file within our `terraform/` directory and add a new `resource` definition. We'll be adding this below the existing **bucket** resource definition:

<div class="filename"> terraform/main.tf </div>

```yml
...
resource "aws_s3_bucket" "frontend_bucket" {
    bucket = "imgur-clone-frontend"

    website {
        index_document = "index.html"
        error_document = "index.html"
    }

    tags = {
        Name = "Dev Imgur Clone Frontend"
        Environment = "Dev"
    }
}

output "app-path" {
    value = "${aws_s3_bucket.frontend_bucket.website_endpoint}"
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

Awesome, we now have a bucket in which we can deploy and serve our frontend application from and we have the **app-path** which outputs the URL that we can reach our app when it is eventually deployed!

### Step 3 - Pushing our Frontend to Our S3 Bucket

We have the bucket, we have the code building within our Travis pipeline. We now need to push the built code to our bucket. 

Travis-CI thankfully makes this easier by allowing us to add a `deploy` block to our `.travis.yml` file which will take in all the configuration for our S3 bucket including our `access_key_id` and `secret_access_key` so that it can push the code to that bucket successfully.

<div class="filename"> .travis.yml </div>

```yml
language: node_js
node_js:
  - 11

before_script:
- pushd frontend
- yarn install
- popd

script:
- pushd frontend
- yarn build
- popd

## We need to add this block with our credentials and the name of the
## the s3 bucket that we created in the previous step
deploy:
  provider: s3
  access_key_id: 
  bucket: imgur-clone-frontend
  skip_cleanup: true
  local-dir: frontend/dist
  acl: public_read
```

Next, we will want to add our `secret_acces_key` so that it is encrypted and people who can view the repository cannot unencrypt it and wreck havoc on our AWS account. 

> **Note** - In order to add this, you will need the `travis` cli which can be installed by following the instructions here: [Installing Travis-CI CLI](https://blog.travis-ci.com/2013-01-14-new-client/)

Run the following `encrypt` command to successfully add the encrypted secret_access_key:

```output
$ travis encrypt --add deploy.secret_access_key
Detected repository as elliotforbes/imgur-clone-vuejs-nodejs, is this correct? |yes| yes
supersecretaccesskey
```

With this in place, we can now test to see whether everything has been set up correctly by committing this new file and watching the build take place:

```output
$ git add -A
$ git commit -m "Adding travis build + deploy script"
$ git push origin master
```

Awesome, when this successfully builds, open up the URL which was outputted from the `terraform apply` in the previous step and you should see your wonderful application now live:

![First Deploy](https://images.tutorialedge.net/images/imgur-clone/first-deploy.png)

## Deploying our Serverless Functions

Now, the frontend of our application isn't the entire application, we need to also be able to deploy the Lambda functions that we developed in part 5 of this tutorial series.

Seeing that we used serverless to help us construct our lambda functions, deploying these was done using the `serverless deploy` command. In order for our travis script to work with the `serverless` CLI tool, we will have to ensure we have the CLI installed.

Let's extend our existing `.travis.yml` file to include the steps necessary to install and use the `serverless` cli:

<div class="filename"> .travis.yml </div>

```yml
language: node_js
node_js:
- 11

before_script:
- pushd frontend
- yarn install
- popd
- pushd backend
- yarn add serverless
- popd

script:
- pushd frontend
- yarn build
- popd
- pushd backend
- sls deploy
- popd
deploy:
  provider: s3
  access_key_id: AKIAIN5O72B44O5TWFVA
  secret_access_key:
    secure: QRIriQRPkMIlZCHujIvEqBDos0oOTUX+LClaxknTf8ufoNIR7Ygzq41De8yHQNVIqCSmq0481pNrY7bItEXFGJ/6480ayprRDU3TvO/3C0Wd3XY1+hQty2LZZoVuVjJt7EOZEO1CrIiD0/3IqMVv0Cccntj95I2A8IPuNhH3AEAiupR8PxsmjHPQzZ1rYWhqzu5j8ay7dtlSeBW3Ca9sPS+W+eVs7AYtgw/ovrEjEsO3NR15qO84+3VK4847Uh6KmJ14G5DF9ozdQMq3T/oV4WtGlCmBWA8POrf2HGtbuxnAuumFBo2Urd2Sq22HfrGHbewOqD6tmMw9n6Nb4FsnJPSMFw+LhP1fjSlFaCfAJk829wFtj/pDZY1CGeiRJ8aZq/CoFU9Q+0jNt2ytpsLlr3SUQBQeWC4hbNsOpLhIpYFf2+LMblboMhBORWBP+tA5/h8Dx4b45JMv0WtxhaWjeRi5ATnkWgsra/818mGIUyhnuq4DCx93mUJ7DfvsmBAf4fv1+oM2HzH/fl+ngTz7etyTze5Z8PaI7eOHy/GEAXLJcUJJMatcL9n6Cv/YZJUgo8xXdxs76P7uT024tktEUR4Yhq0K9qTyAZYW9iuv5dF9azrR1qu966aK23w4+F6ZVrhZE347tiixcLtHxNtc/ja8sx+LO0WtjFh0F8H1Chg=
  bucket: imgur-clone-frontend
  skip_cleanup: true
  local-dir: frontend/dist
  acl: public_read
  region: eu-west-1

```

With this now in place, let's test our automated deployment by making a code change to our repository. You should notice this fails with the following:

![Serverless Failure](https://images.tutorialedge.net/images/imgur-clone/serverless-failure.png)

This is due to the fact that the appropriate environment variables have not been set up which

#### Handling Credentials

With this in place, the final piece of the puzzle is to give Travis the credentials needed in order to deploy your AWS account.

We can inject the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` using the following commands:

```output
$ travis encrypt AWS_SECRET_ACCESS_KEY=<supersecretaccesskey> --add env.global
```

This will inject the `AWS_SECRET_ACCESS_KEY` into our environment so that the `serverless deploy` command can pick it up and use it to deploy our serverless lambda functions.

<div class="filename"> .travis.yml </div>

```yml
language: node_js
node_js:
- 11
env:
  matrix:
  - AWS_ACCESS_KEY_ID=AKIAIN5O72B44O5TWFVA
  global:
    secure: pKidPvpHiO32R0gOHiBE/omiDer//7vdI8vEhw5cjTUIW4DI+ICVMOEqtCj3BESMgUhk7EQTciRV9Bh/m2JrPwPdSjFasIAZcswKUxf9Lu6EfDiw5C/ugywfd2FghVch2u4HGQRoHYHMCV2JFOsOSkAfyHxRltmjOCpbUnYI6WIPiq8JWdkVgghbbLgy3LcRZ66e8Vxh6Ma9x7t5sf+C53X5UGR1obkcpDxHkeepBw+NW2sHCcfsupL5bVJBSZY6BuHzypRjGSzz9MmoySS/e4eaFa1+MVHmc6//MnK+P3PwRc/C+TGQPf1+VkJMnHmIdOmTVzjpnhu8s/21Jtvd+8UFUUoQ2ZZx0Yr/G9xToNkIeTzMiUATKsiGlDzWp25WRrstTEGbxqWRaXV7hbc66U3MiTUh2ZMxZep30aLtRauUW363JWrvJRdsNyZ9ga6oKGc2ZWjJK6jYBUeAW6cpWQxru3b5K0zIgrOr/kXTEsf4a9qHJPv4xcZRpZK/JnxwQJwrgHOmpPZGNAHrmdJ0G6u+9IXQ70c5Fnd9HfLFLm8NLY+oA4JIXbj/JEepewnTEMFx989XZ+L36SyxFtTzvFNZg4DorrYgq0I3t2wIMW3vks3kMFZECR1CZRXPYsDTgTuOohb+fKzuQlASJbHEZBtSQeeyvIctY/wEetmQK+w=
    
before_script:
- pushd frontend
- yarn install
- popd
- pushd backend
- yarn add serverless
- popd
script:
- pushd frontend
- yarn build
- popd
- pushd backend
- sls deploy
- popd
deploy:
  provider: s3
  access_key_id: AKIAIN5O72B44O5TWFVA
  secret_access_key:
    secure: QRIriQRPkMIlZCHujIvEqBDos0oOTUX+LClaxknTf8ufoNIR7Ygzq41De8yHQNVIqCSmq0481pNrY7bItEXFGJ/6480ayprRDU3TvO/3C0Wd3XY1+hQty2LZZoVuVjJt7EOZEO1CrIiD0/3IqMVv0Cccntj95I2A8IPuNhH3AEAiupR8PxsmjHPQzZ1rYWhqzu5j8ay7dtlSeBW3Ca9sPS+W+eVs7AYtgw/ovrEjEsO3NR15qO84+3VK4847Uh6KmJ14G5DF9ozdQMq3T/oV4WtGlCmBWA8POrf2HGtbuxnAuumFBo2Urd2Sq22HfrGHbewOqD6tmMw9n6Nb4FsnJPSMFw+LhP1fjSlFaCfAJk829wFtj/pDZY1CGeiRJ8aZq/CoFU9Q+0jNt2ytpsLlr3SUQBQeWC4hbNsOpLhIpYFf2+LMblboMhBORWBP+tA5/h8Dx4b45JMv0WtxhaWjeRi5ATnkWgsra/818mGIUyhnuq4DCx93mUJ7DfvsmBAf4fv1+oM2HzH/fl+ngTz7etyTze5Z8PaI7eOHy/GEAXLJcUJJMatcL9n6Cv/YZJUgo8xXdxs76P7uT024tktEUR4Yhq0K9qTyAZYW9iuv5dF9azrR1qu966aK23w4+F6ZVrhZE347tiixcLtHxNtc/ja8sx+LO0WtjFh0F8H1Chg=
  bucket: imgur-clone-frontend
  skip_cleanup: true
  local-dir: frontend/dist
  acl: public_read
  region: eu-west-1
```

With this final piece of the puzzle in place, we should now be able to update our `.travis.yml` in order to use these provided credentials and our serverless deploys will now automatically deploy the latest code changes to our account every time we make a commit to `master`!

![Working Build](https://images.tutorialedge.net/images/imgur-clone/final-build.png)

## Conclusion

So, in this tutorial, we have managed to build a really **quick and powerful automated deployment pipeline** that will take any changes of our application merged into our master branch, and automatically deploy them to AWS with no manual intervention.

This is a huge step forward in terms of progress and it will allow us to quickly iterate over changes and focus on improving the code whilst massively reducing the *toil* that is involved in manually deploying our app to AWS!

### Challenge - Automated Terraforming

With this pipeline now in place, you should attempt to add an additional step to the pipeline which automatically applies any changes to the terraform code to our underlying infrastructure. You should also look at moving the tfstate files out of the git repo and into an S3 bucket for bonus points!