---
title: "Part 2 - Getting Started With AWS Lambda"
date: 2018-04-19T21:42:29+01:00
draft: true
desc: "In this tutorial, we are going to get up and running with some very simple Lambda functions and deploying them using the serverless api."
author: "Elliot Forbes"
tags: ["vuejs", "javascript"]
image: "vuejs.png"
weight: 2
series: [ "vuejsawsblog" ]
twitter: "https://twitter.com/Elliot_F"
---

So, in the last tutorial, we managed to get a simple CI/CD pipeline up and running so that whenever we commit anything to our github repo, it automatically builds and deploys these changes to our "production" environment. 

In this tutorial, we are going to continue to develop our blog and get started building up the first of our Lambda functions that we'll need to make our blog work. 

## Our First Lambda Function

We'll start by creating a `hello world` style lambda function that will later return a paginated list of blog posts. Once we've managed to successfully deploy this version 1 of the endpoint, we can then start working on integrating it with our DynamoDB table that we'll be creating later on in the series.

```js
const AWS = require('aws-sdk');

module.exports.index = (event, context, callback) => {

    callback(null, {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: "Hello World" }),
    })
}
```

Let's break down the above code.

* **line 1** - We import the `aws-sdk` so that we can interact with DynamoDB later on
* **line 3** - We define the the entry point of our Lambda function, this function takes in the following:
  * **event** - Allows us to access the event data 
  * **context** - The context under which the Lambda will execute, this includes things like the runtime information.
  * **callback** - The callback we will call when our function is ready to return
* **line 5** - We call our `callback` function which returns a `statusCode`, any response `headers` and a `body`.

## Serverless Config

Now that we have a simple Lambda function, let's attempt to deploy this using the serverless command line interface. Create a new `serverless.yml` file within a new `functions/` directory in the root of your project. You will then want to populate it with the following `yaml` configuration:

```yaml
service: vuejs-blog-aws

frameworkVersion: ">=1.1.0 <2.0.0"

provider:
  name: aws
  region: eu-west-1

functions:
  list:
    runtime: nodejs8.10
    handler: listPosts.index
    events:
      - http:
          path: posts
          method: get
          cors: true
```

Let's break this configuration down so that we know what's going on:

* **line 1** - We define the name of the service that we will be deploying, in this case `vuejs-blow-aws`
* **line 3** - We pin the serverless cli version we wish to use
* **line 5** - We specify that we want to deploy to AWS and the `eu-west-1` region within AWS
* **line 9** - We specify what the array of functions we wish to deploy, the first of which is our `list` function
* **line 11** - This is the runtime we wish our Lambda function to execute within
* **line 12** - This is the handler of our function, this is a combination of `listPosts.js` and the `index` function that we defined within said file
* **line 13** - We define how this Lambda is triggered, in this case through `http` and through a `GET` request 

Now that we've got this all set up for us, we can now deploy our lambda by doing the following:

```s
$ cd functions/
$ serverless deploy
```

This will then package everything up for us, and handle the deployment of our functions up to AWS. It will also set up any API Gateways required in order to interact with our Lambda functions. Upon running this, you should see something like this:

```s
➜  functions git:(master) ✗ serverless deploy
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (342 B)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..........
Serverless: Stack update finished...
Service Information
service: vuejs-blog-aws
stage: dev
region: eu-west-1
stack: vuejs-blog-aws-dev
api keys:
  None
endpoints:
  GET - https://xravpvj33l.execute-api.eu-west-1.amazonaws.com/dev/posts
functions:
  search: vuejs-blog-aws-dev-search
```

You should notice that in the list of `endpoints` this deployment returns, we have a `GET` request and the url for that request. If we now hit that API endpoint, we should be able to see `Hello World` displaying within our browser!

## Debugging your Lambda Functions

If you see any issues with this endpoint, it's worthwhile looking into how you can accurately debug what has gone wrong with the code you have written and deployed. In order to do that, we need to look at AWS CloudWatch which hosts all of the logs of our Lambda functions with no additional setup needed. In order to view these logs, you can either navigate to CloudWatch directly, or you can open up the Lambda console and select your newly deployed function, you can then click the `monitoring` tab at the top of the page and it will show you graphs that tell you things like invocation count, duration and any errors.

![Monitoring Tab Lambda](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/vuejs-blog-aws/screenshot-02.png)

You should notice on each of these graph boxes, there is a link to `Jump to Logs` at the top right. If you click on this, you will be taken to the CloudWatch logs and you can dive in and see things like stack traces if things have gone wrong:

![CloudWatch Logs](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/vuejs-blog-aws/screenshot-03.png)

## Next Steps

We have now managed to write and deploy our first Lambda function! In the next few tutorials, we will be expanding our Lambda collection and start integrating with services such as DynamoDB and eventually GraphQL.

One question you may be asking is `Why Serverless?`. Well, this one function we've deployed in this tutorial is highly scalable, incredibly resilient and ready for production. If you are interested, you should check out my article on [How Serverless Computing will Change the World in 2018](https://hackernoon.com/how-serverless-computing-will-change-the-world-in-2018-7818fc06b447) for more one why you should use technology such as AWS Lambda within your production systems.

> Under Construction: This course is currently under construction and new tutorials will be getting released in the coming days and weeks! Stay Tuned!