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
title: Containerization
twitter: https://twitter.com/Elliot_F
## video: 433296255
nextPage: /courses/intro-to-cloud/serverless/
weight: 1
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

In this chapter, we'll be looking at containerization in depth. We'll be touching upon the history of containerization and then looking at the current industry leader, Docker, and how you can then use Docker for a simple Python 3.6 application.

### Introduction

Docker is a containerization technology that allows you to define a container that will feature everything your application needs to run. 

Say for instance you are writing a small Python application using a very specific version of Python. You can easily create a docker container that is based upon that python version and run it very easily using the docker run command. 

This is immensely powerful as Docker enables you to specify only what's needed for your application to run. You don't need to build every container off incredibly heavy Ubuntu images unless you absolutely need to. This allows me the ability to save memory and only have run containers that have the absolute minimum requirements needed to run my app.

### Containerization 

What is containerization? What does it really do?

Well, the concept of containerization initially came from the shipping industry. In days gone by, ships had no standards as to how they should package produce that they were to transport across the globe. This lead to a lot of space wasted, and it would be difficult at the other dock when it came to unloading the different shapes and sizes.

In 1955, a mr Malcom p. McLean, a trucking entrepreneur from North Carolina bought a steamship company with the idea of transporting entire truck trailers with their cargo still inside. This proved to be vastly more efficient and improved the way containers moved between ships to trucks and trains. 

Docker essentially allows us to benefit from these same advantages. Regardless of the place you are running them, you handle the docker container in the same manner. This means that the way you run your docker based application on your local machine is exactly the same way that you would handle it in on a production server, regardless of operating system underlying it. 

This means that windows developers can develop an application on top of their preferential windows machine the exact same way a MacOS or a Linux developer would develop on top of their machine.  

#### The Benefits of Containerization

The benefits of using containers, even within teams that aren't looking to leverage cloud based platforms, is huge. Within Gemma's team there were times where newer developers would come in and getting them up and running with the appropriate environment configuration for all of the services would take up to a week of a senior developers time. 

This was just to get their services running locally, which was required before the new developer could dive in and try to understand how the system worked. 

By adopting docker as the basis for all of their applications, Gemma and her team were able to reduce the time taken to get a service up and running on a new persons local machine down to a single command. This hugely improved the speed at which new people could be brought up to speed and made them far more effective far sooner. 

Another inherit advantage that a technology like docker brings is the fact it is so lightweight. Traditionally teams may have used full blown Virtual Machines in which they would run their applications. These virtual machines are most definitely not well known for how lightweight they are and startup times left a lot to be desired. This is due to the fact they are starting up a complete operating system in order to run.

Docker containers, on the other hand, are far more lightweight and can be started in a couple of seconds.  

### Images

I tend to think of images as blueprints for any containers I wish to run. Images in docker are inert, immutable files that are essentially snapshots of a container. You can instantiate a container from an image.

In order to list the available images you have, you can use the `docker images` command which will display a table similar to this one below:

    REPOSITORY                       TAG                 IMAGE ID            CREATED             SIZE
    red                              latest              6484161e895a        3 weeks ago         234MB
    chrome                           latest              4836d476232e        3 weeks ago         624MB
    firefox-vnc                      latest              4836d476232e        3 weeks ago         624MB
    <none>                           <none>              173e558c3f0f        3 weeks ago         743MB

Images are incredibly useful for getting things up and running really quickly. For example, you could pull down an image from the official Docker registry: registry.hub.docker.com which could contain a RabbitMQ broker all ready to go, all you would have to do is call `docker run` specifying that image name and things like the ports you would wish to expose and you could have RabbitMQ running on your machine in a couple of minutes!

If we consider Gemma and the Comic Co, if she, for instance, wanted to run a static website and wasn't concerned about the underlying Operating System. She could pull down an `nginx` base image and then configure her application to run within this nginx container. She could then run this container on whatever hardware she may have available, be it windows machines, linux machines or her mac and she wouldn't have to perform any additional configuration. 

As long as each of the machines she wanted to run this site on had docker installed, she could start her application with the exact same command and her `nginx` based container would start up and begin serving her static site. 

### Container Lifecycle + Persistance

* You can persist data!
* docker is really good for stateless apps

### How Containers were used at The Comic Co.

During the transition to a microservice based approach Gemma oversaw a couple of new faces joining her team. There’s always a learning curve when joining a new team and a transition period which reduces the overall effectiveness of the team as they look to get everything set up on their work machine.

No newcomer should feel stranded and as such Gemma put some of her senior engineers with the newcomers in an attempt to get them up and running with the codebase as quickly as possible.

### Dependency and Environment Hell

Originally there were 4 people within Gemma’s team, they all worked as a tightly knit unit and were able to very quickly and easily fix any dependency issues or environment issues on each others machine with not too much time wasted.

However, as the team expanded, the number of differing environments became an issue. One team member may have been running on CentOS, another on MacOS and a third on Windows 10. With 3 respective services composing their comic-book viewer this meant they had to ensure every machine had the correct dependencies and environment variables set in order to run.

One team member may have had Python 3.1 installed on their machine whilst the account service actually required Asyncio in order to work. Asyncio only became available in version 3.4 of the language and thus the service would fail to start on their machine.

Now whilst this may have been somewhat trivial to solve, it did represent time spent trying to synchronize everyone to be on the right version. As the codebase grew in complexity, so too did the environment config needed in order for it to run.

#### III. Config — 12 Factor Applications

If you have worked on making applications cloud friendly then you may have encountered the 12 factors. Gemma and her team were trying to ensure that every service within their application adhered to all of these factors in order to easily scale and deploy their services with very little to no manual effort.

The third factor is that you store all config items within your environment. This typically means using python commands such as:

    import os
    db_pass = os.environ["DB_PASS"]

In order to retrieve database passwords etc. This however makes running it on your local machine rather difficult and you would have to set all of these variables first in order for your program to run. You could do this with the likes of a powershell script or a bash script but making this cross-platform compatible takes time and effort and any changes become difficult.

### The Issue

The combination of setting appropriate dependencies and environment variables for all newcomers was starting to become a bit of a burden and there were times when tests were run against production databases. This was due to developers forgetting to set environment variables back to development values.

With plans for further team expansion in the future this issue needed to be resolved.

### The Solution — Docker

This is when Gemma discovered the wonderful world of containerization and Docker. With containerization Gemma and her team were able to define everything they needed for their application to run within a Dockerfile and then run their newly coined docker app with one simple command.

They started by converting their account service which was written in Python to use docker and came up with something that looked like this to start with:

    FROM python:3.6.3
    WORKDIR /app
    ADD . /app
    RUN pip install -r requirements.txt
    EXPOSE 80
    ENV DB_PASS dolphins
    CMD ["python", "app.py"]

They specified the precise Python version they wanted their app to run in, they specified the working directory of their application and they ran a pip install -r requirements.txt in order to install all the necessary Python dependencies. Finally they exposed port 80 which was the port that the underlying Python application was running on.

You’ll see on the second last line that they were also able to specify their DB_PASS environment variable which would subsequently allow them to connect to their development database.

### Running Their App

The real beauty of defining this Dockerfile was that everyone in the team would be able to build and start the application after having installed Docker on their local machine by using the following 2 commands:

    docker build -t py36-account-service .
    docker run --name "py36-account-service" -d -p 9000:80 py36-account-service

This would subsequently go away, download all of requirements needed and build our Docker image file which we could subsequently run.

A screenshot of Gemma running this locally
After this point she was able to run the application by calling the second Docker command specified above.

### Running The Account Service

By migrating the app to this new format it meant that anyone new to the team could be told to simply install Docker if they hadn’t already, and then run these two commands and they’d have a working account-service on their machine. This would ultimately save a lot of time in the long run.

This worked across all of the developers Operating Systems with minimal fuss.

### Dealing With Multiple Environments

So whilst the above structure allowed developers to get up and running with one environment of their application, it doesn’t solve the problem of developers accidentally running application tests against a production environment.

To combat this we can do things like specifying what --env-file we want to pass in to our application. Within these environment files we could specify our dev, test and production credentials separately. We could then specify that we wanted our application to start and use our development database like so:

    docker run my_app --env-file .dev

### Conclusion

Through the utilization of docker, Gemma and her team were able to minimize the barrier to entry for new developers coming into the team and greatly reduce the time taken to get someone up and running with a working development environment.

Docker-izing their application also made deployments simpler as they were able to leverage AWS services such as the Elastic Container Service (ECS) and not have to worry so much about the underlying operating systems etc. This ultimately saved them time and effort and the costs were the same as if they were to run it across a normal EC2 instance.z