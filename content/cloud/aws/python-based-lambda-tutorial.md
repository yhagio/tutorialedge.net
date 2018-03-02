---
title: "Python Based Lambda Tutorial"
date: 2018-02-24T10:23:36Z
draft: true
desc: "In this tutorial, we will be looking at how you can get started writing your own Python based AWS Lambda functions"
author: "Elliot Forbes"
tags: ["python", "aws"]
series: ["python"]
twitter: "https://twitter.com/Elliot_F"
---

If you've been following my [Medium Blog](https://medium.com/@elliot_f) recently, you'll know that I'm a huge fan of Serverless and I genuinely believe that it will start to seriously take off in terms of popularity in the years to come.

In this tutorial, we are going to be writing a very simple Python based AWS Lambda function that we'll then deploy using the [serverless.com](https://serverless.com/) CLI.

## Installing Serverless

In order to install the `serverless` CLI you can do the following:

```bash
$ npm install serverless -g
```    

If you have set up your AWS credentials correctly with an account that has full permissions then you will now be able to deploy Lambda functions that sit behind an API gateway with ease.

## Our Function

Create a new directory in which you can add Python files. Within this new directory create a file called `simple.py` as well as a `serverless.yml` file. 

```bash
# directory structure
mydirectory/
- simple.py
- serverless.yml
```

Open up the `simple.py` file and create a new function within this called `def hello(event, context):`. This `hello()` function will be the main entry point for our AWS Lambda function and when we call the endpoint, this is what will be executed. 

Within this `hello()` function, we want to return the string `hello, world` back to anyone who calls said lambda function. 

```py
def hello(event, context):

    response = {
        "statusCode": 200,
        "body": 'hello, world'
    }

    return response
```

## Deploying Without Serverless

If you wished, you could deploy this without the serverless CLI, you could do so through using either the `aws-cli` or through the console and either uploading your lambda function as a `.zip` file or through the inline editor.

## Our Serverless.yml File

Within our `serverless.yml` file we will want to define how we want to expose our lambda function. Let's step through this line-by-line. 

```yaml
# we define the name our service
service: hello-world

# We pin the version of the serverless cli we want to use
frameworkVersion: ">=1.1.0 <2.0.0"

# we specify which cloud provider we want to deploy to
# as well as the runtime, in this case python3.6
# and the region we wish to deploy to
provider:
  name: aws
  runtime: python3.6
  region: eu-west-1

# We define our list of functions
functions:

  # our hello function
  hello:
    # the file name and the function that
    # makes up our function: simple(.py).hello()
    handler: simple.hello
    # We define the event we wish to trigger this with
    events:
      # in this case a simple HTTP GET Request
      # with CORS enabled 
      - http:
          path: hello
          method: get
          cors: true
          
```

## Deployment

Once we are happy with our function and we have our `serverless.yml` defined, we can deploy this function by calling `serverless deploy` within the same directory as our `simple.py` and `serverless.yml` file. 

When we run this, you should see the following output:

```yml
$ serverless deploy
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
.....
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (225 B)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.................................
Serverless: Stack update finished...
Service Information
service: hello-world
stage: dev
region: eu-west-1
stack: hello-world-dev
api keys:
  None
endpoints:
  GET - https://9hqihpd4c2.execute-api.eu-west-1.amazonaws.com/dev/hello
functions:
  hello: hello-world-dev-hello
```

You should notice the `endpoints` list has a `GET` request endpoint that you should be able to navigate to now should you wish. When you open this up in a browser, you should see the words `hello, world` output to your browser.

## Conclusion

Hopefully, you found this tutorial educational! If you require any further assistance then plesae feel free to let me know in the comments section below! 

