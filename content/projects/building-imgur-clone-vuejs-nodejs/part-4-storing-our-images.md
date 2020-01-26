---
title: "Part 4 - Uploading and Storing Images"
date: 2020-01-04T00:44:50+01:00
weight: 5
desc: In this tutorial series, we are going to be building an Imgur clone using Lambda functions written using Node.JS and a frontend built using Vue.JS
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: vuejsimgurclone
image: vuejs.png
tags:
- beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this tutorial, we are going to look at building out the backend of our imgur clone and start creating a few simple AWS Lambda functions that will handle actions such as uploading and retrieving images. 

This is where our application really starts to take shape and provide real value to our users, just without some critical functions like authentication and registration, which we will be covering in the next tutorial in this series.

In this tutorial, we'll be introducing 2 key technologies that are widely used in production cloud applications around the world. These are:

* **Terraform** - This will be used to declaratively define what cloud infrastructure our application needs, i.e. the S3 buckets that will be used to store our images
* **Serverless CLI** - This will be used to define our AWS Lambda functions and the API gateways that these functions will sit behind.

> **Note** - You could use terraform to define these lambda functions, but I have found it's a far simpler and nicer experience using the Serverless CLI as it gives additional benefits such as deploying to multiple environments like 'test', 'dev', 'production'.   

# Introducing Serverless CLI

In order to make our lives simpler, we'll be using the Serverless CLI in order to test and deploy our AWS Lambda functions. This is a tool that has exploded in popularity since the start of the serverless revolution due to the way it simplified key tasks like creating API gateways and quickly deploying lambda functions. 

> **Note** - The Serverless CLI does a number of key tasks for us when developing serverless applications across not only AWS, but also across technologies such as OpenFAAS, Google Functions and Azure functions to name a few. 

## Official Serverless Docs

* [Serverless CLI Docs](https://serverless.com/framework/docs/providers/aws/cli-reference/)

# Introducing Terraform

Terraform is a widely adopted tool that allows us to declare in config what infrastructure we want to provision for our applications. It takes this config and interacts with `terraform providers` that call the underlying API endpoints that are needed to provision anything we configure. A lot of the large cloud providers such as AWS, Google Cloud, and DigitalOcean feature custom providers

# Creating a Simple Lambda Function - Fetching Images from a Bucket

As with everything, we'll be starting off simple and creating a Lambda Function that can access an S3 Bucket that we will be creating and list off the paths of the images within that bucket. 

## Creating an S3 Bucket

Before we build and test our function, we'll first need an S3 bucket in place that we will be using to store all of our user's images. 

We'll be using terraform to provision this bucket for us.

Create a new directory at the root of your project called `terraform/` and within this create a `main.tf` file. This simple file will contain the configuration needed for terraform to provision an AWS S3 bucket within our AWS account:

<div class="filename"> terraform/main.tf </div>

```yml
provider "aws" {
    region = "eu-west-1"
}

resource "aws_s3_bucket" "imgur_image_bucket" {
    bucket = "dev-imgur-clone-bucket"

    tags = {
        Name = "Dev Imgur Clone Bucket"
        Environment = "Dev"
    }
}
```

Let's break down what we defined here. The first `provider` block tells terraform that we wish to use the `AWS` terraform provider to provision any `resources` defined within the rest of the terraform code. This 

With this defined, we can subsequently initialize our terraform using the following command:

<div class="filename"> $ terraform init </div>

```output

Initializing the backend...

Initializing provider plugins...
- Checking for available provider plugins...
- Downloading plugin for provider "aws" (hashicorp/aws) 2.43.0...

The following providers do not have any version constraints in configuration,
so the latest version was installed.

To prevent automatic upgrades to new major versions that may contain breaking
changes, it is recommended to add version = "..." constraints to the
corresponding provider blocks in configuration, with the constraint strings
suggested below.

* provider.aws: version = "~> 2.43"

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will 
detect it and remind you to do so if necessary.
```

With this now initialized, we can test our configuration to see if we have done everything right by running `terraform plan` like so:

<div class="filename"> $ terraform plan </div>

```output
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.


------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # aws_s3_bucket.imgur_image_bucket will be created
  + resource "aws_s3_bucket" "imgur_image_bucket" {
      + acceleration_status         = (known after apply)
      + acl                         = "public"
      + arn                         = (known after apply)
      + bucket                      = "dev-imgur-clone-bucket"
      + bucket_domain_name          = (known after apply)
      + bucket_regional_domain_name = (known after apply)
      + force_destroy               = false
      + hosted_zone_id              = (known after apply)
      + id                          = (known after apply)
      + region                      = (known after apply)
      + request_payer               = (known after apply)
      + tags                        = {
          + "Environment" = "Dev"
          + "Name"        = "Dev Imgur Clone Bucket"
        }
      + website_domain              = (known after apply)
      + website_endpoint            = (known after apply)

      + versioning {
          + enabled    = (known after apply)
          + mfa_delete = (known after apply)
        }
    }

Plan: 1 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------

Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.
```

Awesome, we can see from the output on our `terraform plan` command that our terraform code will successfully provision an S3 bucket in the `eu-west-1` region with some tags and a `public` ACL.

The next step is to create this by running `terraform apply` like so:

<div class="filename"> $ terraform apply </div>

```output

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # aws_s3_bucket.bucket will be created
  + resource "aws_s3_bucket" "bucket" {
      + acceleration_status         = (known after apply)
      + acl                         = "private"
      + arn                         = (known after apply)
      + bucket                      = "dev-imgur-clone-bucket-test"
      + bucket_domain_name          = (known after apply)
      + bucket_regional_domain_name = (known after apply)
      + force_destroy               = false
      + hosted_zone_id              = (known after apply)
      + id                          = (known after apply)
      + region                      = (known after apply)
      + request_payer               = (known after apply)
      + tags                        = {
          + "Environment" = "Dev"
          + "Name"        = "Dev Imgur Clone Bucket"
        }
      + website_domain              = (known after apply)
      + website_endpoint            = (known after apply)

      + versioning {
          + enabled    = (known after apply)
          + mfa_delete = (known after apply)
        }
    }

Plan: 1 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

aws_s3_bucket.bucket: Creating...
aws_s3_bucket.bucket: Still creating... [10s elapsed]
aws_s3_bucket.bucket: Creation complete after 20s [id=dev-imgur-clone-bucket-test]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

From the final few lines of our output, we can see the terraform has successfully provisioned us with an S3 bucket that we can use as the backend for our imgur clone!

Later in this series, we will be adding a DynamoDB database which will hold meta information generated using the Rekognition service, but for now, we will be able to work with a simple S3 bucket.

> **Note** - You can easily destroy this bucket by running `terraform destroy` should you wish to quickly clean up after yourself!

## Our Lambda Function Code

Now that we have an S3 bucket in place that will be able to store our user's images, we can start writing code that will retrieve the images from our bucket. 

We'll first be creating a new directory within the root of our project called `backend` which will house all of our backend Lambda function code.

Within this directory, we are going to be creating a the yml configuration file for our serverless functions within a `serverless.yml` file:

<div class="filename"> backend/serverless.yml </div>

```yml
service: imgur-clone-backend-functions

frameworkVersion: ">=1.1.0 <2.0.0"

custom:
  bucket: dev-imgur-clone-bucket-test

provider:
  name: aws
  runtime: nodejs8.10
  region: eu-west-1
  iamRoleStatements:
    - Effect: Allow
      Action:
        - s3:*
      Resource: "arn:aws:s3:::${self:custom.bucket}"
    - Effect: Allow
      Action:
        - s3:*
      Resource: "arn:aws:s3:::${self:custom.bucket}/*"

functions:
  list:
    handler: listS3Objects.list
    events:
      - http:
          path: list
          method: get
          cors: true

```

Now that we have our `serverless.yml` configuration file sorted, we can start writing the Node.js based lambda function which is simply going to list the items within our newly provisioned imgur bucket and then return the JSON:

<div class="filename"> backend/listS3Objects.js </div>

```js
'use strict';

let aws = require('aws-sdk')
let s3 = new aws.S3();

let params = {
    Bucket: 'dev-imgur-clone-bucket-test'
}

module.exports.list = (event, context, callback) => {

    s3.listObjects(params, (err, data) => {
        if (err) {
            callback(null, {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ error: err})
            });
        }

        callback(null, {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)        
        });
    })
};
```

This will allow us to quickly validate whether or not we are able to communicate with our S3 bucket as well as demonstrate how we will be hitting all of the subsequent API endpoints that we will be creating.

With this in place, let's attempt to deploy this now:

<div class="filename"> $ serverless deploy </div>

```output
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (707 B)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..........
Serverless: Stack update finished...
Service Information
service: imgur-clone-backend-functions
stage: dev
region: eu-west-1
stack: imgur-clone-backend-functions-dev
api keys:
  None
endpoints:
  GET - https://jwyzr20kqa.execute-api.eu-west-1.amazonaws.com/dev/list
functions:
  list: imgur-clone-backend-functions-dev-list
Serverless: Removing old service artifacts from S3...
```

As you can see, we have successfully been able to deploy this serverless function and it has automatically been given permissions to access our s3 bucket as well as a HTTP endpoint which we can directly hit in the browser with a simple `HTTP GET` request!

When we `curl` this new endpoint, we should see that it returns a JSON string which contains a `Contents` element which is at this point an empty array.

<div class="filename"> $ curl https://jwyzr20kqa.execute-api.eu-west-1.amazonaws.com/dev/list </div>

```output
{"IsTruncated":false,"Marker":"","Contents":[],"Name":"dev-imgur-clone-bucket-test","Prefix":"","MaxKeys":1000,"CommonPrefixes":[]}
```

Awesome, we now have our first serverless Node.js function up and running and ready to serve our frontend application!!

> **Action** - Test out this code by uploading an image to the s3 bucket and then hitting the API endpoint again. You should see the `Contents` array now populated with some information!

# Storing Images

Now that we have the hang of writing serverless functions, let's create a lambda function that will act as our image upload endpoint. 

This will be a 2-step process. The first step will involve creating and deploying the lambda function, the second step will involve updating the frontend and adding a component that allows users to upload images. We'll be holding off this step until the next part of this series where we will also be adding in the authorization around this new API endpoint.

## Upload Lambda Function

Let's start off by creating the S3 upload image lambda which our Vue.js upload component will interact with. 

This will again be a really simple AWS Lambda function which leverages the AWS SDK in order to retrieve what is called a `signed URL` which we can then use to upload our image to our respective bucket! 

<div class="filename"> backend/getSignedUpload.js </div>

```js
const AWS = require('aws-sdk');

module.exports.requestUploadURL = (event, context, callback) => {
    var s3 = new AWS.S3();

    var params = JSON.parse(event.body);

    var s3Params = {
      Bucket: process.env.BUCKET,
      Key:  params.name,
      ContentType: params.type,
      Expires: 3600,
      ACL: 'public-read'
    };
  
    var uploadURL = s3.getSignedUrl('putObject', s3Params);
  
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ uploadURL: uploadURL }),
    })
}
```

With this Lambda function now complete, we will need to now add this function to our `serverless.yml` configuration. This function will be eventually deployed as a protected endpoint, but for now we are going to keep it unauthenticated.

<div class="filename"> backend/serverless.yml </div>

```yml
... 
functions:
  list:
    handler: listS3Objects.list
    events:
      - http:
          path: list
          method: get
          cors: true
  
  uploadImage:
    handler: getSignedUpload.requestUploadURL
    environment:
      BUCKET: ${self:custom.bucket}
    events:
      - http:
          path: upload-node
          method: post
          cors: true
```

Perfect, the final step now is to deploy this lambda function using the same command we used before:

<div class="filename"> $ serverless deploy </div>

```output
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (1.16 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.....................................
Serverless: Stack update finished...
Service Information
service: imgur-clone-backend-functions
stage: dev
region: eu-west-1
stack: imgur-clone-backend-functions-dev
api keys:
  None
endpoints:
  GET - https://jwyzr20kqa.execute-api.eu-west-1.amazonaws.com/dev/list
  POST - https://jwyzr20kqa.execute-api.eu-west-1.amazonaws.com/dev/upload-node
functions:
  list: imgur-clone-backend-functions-dev-list
  uploadImage: imgur-clone-backend-functions-dev-uploadImage
Serverless: Removing old service artifacts from S3...
```

And with that, we now have a Lambda function that is allows our users to upload images to our imgur clone bucket, we just don't have a means of interacting with the endpoint just yet but we will be getting to that shortly!

# Updating our config/index.js File

Finally, we want to create a `config/index.js` file which will contain a `s3SignedUrl` key-value which will point to our `/upload-node` backend API endpoint: 

<div class="filename"> frontend/src/config/index.js </div>

```js
export default {
    region: 'eu-west-1',
    s3SignedUrl: 'https://rvv1a9to8j.execute-api.eu-west-1.amazonaws.com/dev/upload-node'
}
```

# Conclusion

So, in part 5 of this series, we have successfully managed to create a number of different AWS Lambda functions that now feature as the backend of our Imgur application. 

We are getting incredibly close to a `minimum viable product` where our application meets the minimum amount of functionality in order to be useful, in the next few tutorials, we should finally get there!

## Further Reading:

Now that we have the backend of our Imgur application working and deployed to AWS, the next part of this series will be focused on adding authorization and authentication to our application as well as the Upload component that will interact with our newly deployed endpoints!

> **Next Tutorial** - [Part 5 - Adding Authentication](/projects/building-imgur-clone-vuejs-nodejs/part-5-authentication/)