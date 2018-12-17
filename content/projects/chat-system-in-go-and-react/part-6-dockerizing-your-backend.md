---
author: Elliot Forbes
date: 2018-03-19T11:05:52Z
desc: 'In this series, we are going to be building a Chat App in Go and ReactJS'
image: golang.png
series:
- goreactchat
tags:
- golang
title: Part 6 - Dockerizing your Backend
twitter: https://twitter.com/Elliot_F
---

> **Note -** This post is part 6 of a series on building a chat application in Go with ReactJS. You can find part 5 here - [Part 5 - Improving the Frontend](/projects/chat-system-in-go-and-react/part-5-improved-frontend/)

In this part of the series, we are going to be focusing on adding Docker to our backend application. 

Why are we doing this now you might ask? Well, before we look into things like authentication, load balancing and deployment, it'll be good to have a standard way of deploying our application using containerization technology.

# Why Docker?

If this is your first time hearing about Docker and containerization technologies, then you may be questioning why we are using it?

For me, one of the main selling points is that it makes deployments so much easier. You are able to deploy your docker-based application to any server or platform that supports Docker. 

This means that, regardless of where you are deploying to, you can start up your application with a single command.

Not only that, it eradicates the "it works on my machine" as, within your `Dockerfile`, you dictate the exact environment that your application needs in order to start up. 

# Getting Started

The first thing you'll need to do, is to install Docker for Desktop on your machine. This can be done here: [Docker - Getting Started](https://www.docker.com/get-started)

Once you've installed docker and have it running locally, we can dive into creating our `Dockerfile`:

```dockerfile
FROM golang:1.11.1-alpine3.8
RUN mkdir /app 
ADD . /app/ 
WORKDIR /app 
RUN go mod download
RUN go build -o main ./... 
CMD ["/app/main"]
```

Once we have defined our `Dockerfile`, we can go ahead and build our Docker image using the `docker` cli:

> **Note -** If you are running on a slow internet connection, this next command can take a while to execute, however, subsequent commands will be a lot faster due to caching.

```s
$ docker build -t backend .
Sending build context to Docker daemon  11.26kB
Step 1/8 : FROM golang:1.11.1-alpine3.8
 ---> 95ec94706ff6
Step 2/8 : RUN apk add bash ca-certificates git gcc g++ libc-dev
 ---> Running in 763630b369ca
 ...
 
```

Upon successfully completing the `build` step, we can then proceed to try running this like so:

```s
$ docker run -it -p 8080:8080 backend
Distributed Chat App v0.01
WebSocket Endpoint Hit
Size of Connection Pool:  1
&{ 0xc000124000 0xc0000902a0 {0 0}}
Message Received: {Type:1 Body:test}
Sending message to all clients in Pool
```

As you can see, upon running this command and refreshing our client, we can see connections now coming in to our Docker-ized application and we can see the log files being printed to our terminal.

If we wanted to now go away and deploy this application to the likes of AWS, we've greatly simplified doing this. We can leverage something like AWS' Elastic Container Service to deploy and run our container with just a few commands.

Conversely, if we wanted to use Google's Cloud, we could deploy it to their container offering with no additional work needed! This just highlights one of the massive benefits of containerization for development.

# No Docker for the Frontend?

At this point, you may be wondering why we aren't doing the same for our `frontend/` application? The reason for this is that we are intending to deploy this frontend app to the likes of an AWS S3 bucket. 

We don't need anything fancy serving our frontend when we go to production, we just need something that will be able to reliably serve our built frontend files. 

# Conclusion

So, in this part of the series, we managed to add Docker to our backend application and how this benefits us, the developers when it comes to continuing development and deployments.

> **Enjoying This Series?** - If you are enjoying this series, or have any feedback, I would love to hear it on twitter and see your progress in the form of screenshots! - [@Elliot_f](https://twitter.com/elliot_f). 