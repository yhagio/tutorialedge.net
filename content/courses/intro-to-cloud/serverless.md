---
author: Elliot Forbes
date: 2018-06-09T22:48:26+01:00
desc:
  In this tutorial, we are going to look at how you can implement a testing
  framework for your TypeScript projects using Mocha and Chai
image: cloud.svg
paid: false
series: introcloud
tags:
  - cloud
title: Serverless
twitter: https://twitter.com/Elliot_F
## video: 433296255
nextPage: /courses/intro-to-cloud/containerization/
weight: 1
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

Lambda's are an incredibly powerful and fairly new concept that allow you to forget about the hassles of dealing with massive frameworks and instead focus on writing simple small functions that can be triggered through either different events taking place or through an API.

When Gemma and her team were looking at introducing newer features that didn't necessarily fit within the scope of any of their defined services they looked towards AWS Lambda. 

By going with Lambda they could leverage the languages that best suited these incredibly niche jobs. 

### Functions as a Service 

When it comes to categorizing AWS Lambdas, they essentially fall into the FaaS category or Function as a Service. These so called FaaS offerings are excellent in the sense that they do a lot of the heavy lifting for us. 

They are known as *Serverless* as the developer does not have to worry at all over what servers the functions are being run on or where these servers are. The underlying platform is essentially a black box to the developer.

When you utilize a service such as AWS Lambda it automatically handles quite complex problems such as resiliency and scaling for you. The service essentially allows you, as a developer, to focus on building more valuable systems instead of worrying about the operations side of things.

### Intro to Lambdas

When it came to choosing a language runtime that Gemma could utilize for her new Lambda based service she had a variety of different options. Currently AWS Lambda supports Java, Node.js, C#, and Python and the support for other languages is certainly coming. The ability to write Go based functions is already there but requires a Node-shim to transpile the Go code into executable Node.js code. 

Thankfully, Gemma and her team were quite the Pythonista's and were happy going with the latest version of Python as a base for their new Serverless offering. 

#### Anatomy of a Lambda Function

All Lambda functions feature an entry point function or **handler**. This handler is comprised of the name of the file and the name of the function when working in Python. Therefore if I defined a Lambda function called `lambda_handler` in my `lambda_function.py` file, I would expect the handler to look like: `lambda_function.lambda_handler`.

When defining our Lambda function it should look something like so: 

    def lambda_handler(event, context):
        ## body of our function
        return "My Response!"

You'll notice this `lambda_handler` function takes in two parameters, an `event` parameter and a `context` parameter. The `event` passed in is the actual event that has triggered this function. `context` simply provides more information that is passed to the function at runtime. 

#### Triggering Lambda Functions

These Lambda functions can be triggered in a massive number of different ways. You could set these lambda functions to trigger at a given time interval or you could watch for changes to AWS resources. 

For instance, say you were uploading a new comic book to an S3 bucket, you could have a Lambda function watch for uploads to said bucket and trigger when the upload is finished. This means that you could potentially write a lambda function that automates the notification to your massive user group that a new comic is now available on the website. 

#### Writing Lambda Function

When it comes to writing Lambda functions you currently have two options. You can either use your normal development environment or you can use the inline AWS editor to edit your functions.

This editor tends to look something like this:

![Writing in the editor](/images/lambda-function.png)

Now, when writing quick and dirty lambda functions, the inline editor is a nice and simple option and it's one that Gemma and co. used to get to grips with the numerous ins and outs of the Lambda service. 

### Developing and Deploying Lambda Functions

Thankfully with the AWS SAM hitting it's beta testing stage at the time of writing this, the ability to test any Lambda functions locally is now a possibility. The team can write their lambda functions in the code editor of their choice and then run the appropriate AWS SAM commands to test them quickly and effectively.

#### Deploying Lambda Functions

When it comes to deploying the teams lambda functions there are a number of different options. You could deploy using the AWS CLI every time you make a change to the function.

You could alternatively leverage something like CodePipeline and CodeDeploy atop your favorite source code management system. 

* CodePipeline + CodeDeploy
* A Deployment Lambda?

### API Gateway

So whilst a lambda function may be useful within the AWS ecosystem, what happens if Gemma and her team wanted to call a Lambda function from one of their websites? 

Say for instance they had a lambda function that handled new user registrations, they could write the lambda function that would insert the user into their database or their Cognito user pool. In order to provide a way of accessing this Lambda function, they could expose it through use of the API Gateway service. 

This would allow them to define an API endpoint that was accessible from anywhere in the world through a simple `HTTP` request and it would scale to cope with any surges in traffic that the site may see. 

They would no longer have to run relatively expensive EC2 instances for their registration service, they could simply define their registration service as a series of Lambda functions and expose these Lambda functions through the API gateway. This is ideal as it takes away concerns about resiliency and monitoring as the API Gateway comes with all this included by default. 

In terms of cost, it would also help to reduce the companies infrastructure bill as the API Gateway is incredibly low cost and charges $3.50 per million API calls received as well as the cost of data out of the service. This pricing is tiered and varies depending on what region you are in. The cost for the EU (Ireland) service is:

#### Amazon API Gateway Data-Transfer-Out Rates 

| Cost | Capacity |
| --- | --- |
| $0.09/GB | The first 10 TB |
| $0.085/GB | The next 40 TB |
| $0.07/GB | The next 100 TB | 
| $0.05/GB | The next 350 TB |

#### Deployments

When it comes to deploying your API, Gemma could make changes to various endpoints and then choose to deploy these changes to a particular stage. This means that she could in theory make some changes, deploy the test stage of her API and then run a full battery of integration tests. 

Once she is happy with the results she could then deploy her changes to her Production environment. These changes would be deployed almost instantly and users of the site would be able to use any new features that may have been deployed. Again the important thing to highlight here is that these changes will be reflected across the world almost instantly, and will be fully resilient.  

### Monitoring and Alerting

One of the major pain points of writing an application on legacy infrastructure is the management of logs. Traditionally, Gemma and her team would persist log files to the disk of the server that they were running their applications on top of. The major challenge that this presents is, how do we backup these logs so that we don't lose them in the case of a total loss of the server? 

They would then have to start configuring incredibly complex logging services that features redundancy across multiple servers in different locations in order to be truly resilient. 

#### Debugging Nightmares

When it came to debugging applications as well, trying to find out which server handled a certain request before failing was tricky and measures had to be implemented to improve this process. 

In order to debug an issue, one of the developers would first have to find the box in question, log into that box through ssh and then navigate it's file system in order to find the appropriate log files. 

More often than not the log statements they were looking for would be spread over multiple partitioned log files. These would be most often partitioned based on the size of the files generated or the date at which they were recorded. This meant that some pretty crazy looking `grep` commands had to be constructed in order to grep all log files in a given directory for a particular set of log statements.

#### Storing Log Files

When it came to storing the log files of the various applications they had deployed across their old servers, it was a nightmare. They had to manage the persistance of these log files to a particular folder, they would then compress these into a file and push them to another backup server that featured more backing storage. In the event of that backup server going down, they were screwed and thus had to put in place measure to backup their disks to other disks that could be swapped in should one disk fail.

Overall, this process took time and money to implement. Moving to use AWS' proprietary monitoring and logging system meant that they could refocus their efforts away from ensuring their logs were safe and instead work on improving their own services. This was a huge win as far as both the developers and upper management were concerned. 

#### Limitations of Lambda 

Now before the team could fully migrate some of their existing services to AWS Lambda, they had to realise some of the limitations of the service. There are always going to be limitations with anything and cloud is no exception. 

One of the first limitations is that the maximum file size of a lambda is 250MB. This means that the entire zip file that you upload must not be larger than this. As this is on a per-function basis, the likelihood of hitting this is incredibly low, unless you are using an incredibly complex array of heavy libraries.

Another key point to note is that functions will timeout if they hit the 300 second mark. You should bear this in mind when doing the initial architecture of your application. For longer running processes you may have to leverage the likes of an EC2
 instance or utilize something like ECS.

* file size < 250MB to deploy to Lambda
* total function packages in a region < 75 GB
* Compressed function package < 50MB

* Ephemeral File Limitation < 512MB
* Maximum execution duration == 300 seconds
* * functions will time out if they take longer
* 100 concurrent lambda functions at a time

##### Workarounds

* Ask AWS increase Limitations
* Chain functions together
* Load and store files in S3

### Social Media promotion with SQS

One of the things that Gemma was tasked with automating was the companies social media promotion. Every week they would send out an email and publish posts across all their social media platforms that covered everything they had released in the previous week. 

These social media promotions always followed the same structure and it would typically take an hour or two for someone to craft this post every week. 

Gemma decided that she would leverage a lambda function in order to automate the sending of this email. Within the lambda function she could connect to the Database powering the site and retrieve the last 5 comic book entries and their descriptions and concatenate this into an email template. 

She could then schedule this lambda function to run every Saturday at 2pm using a CloudWatch trigger. Writing this simple Lambda function took a couple of hours to figure out, but once it was done it was effectively saving the company 1-2 hours a week from now on and that time could be better devoted to another task.  

### Summary

In this chapter we covered quite a number of different topics focused around the AWS Lambda service. We touched upon some of the things that could be achieved with Lambda's as well as their limitations. 

We also looked at how we could expose these Lambda functions using the API Gateway.