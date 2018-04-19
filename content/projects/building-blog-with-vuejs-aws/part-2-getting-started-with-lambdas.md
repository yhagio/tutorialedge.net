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

## Next Steps

We have now managed to write and deploy our first Lambda function! In the next few tutorials, we will be expanding our Lambda collection and start integrating with services such as DynamoDB.