---
author: Elliot Forbes
date: 2018-05-18T14:25:51+01:00
desc: In this tutorial, we are going to look at what docker is, why it is useful,
  and how you can get a simple Docker-based application up and running
image: docker.png
series: docker
tags:
- docker
title: Getting Started With Docker
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this tutorial, we are going to be taking a look at what Docker is, why it's needed and how you can get up and running using Docker in your day-to-day development. 

# What Is Docker?

Docker is a containerization technology that allows you to package up your application into something that will run everywhere that Docker can run.

You typically define absolutely everything you need for your application within your docker file and no more. If your application is a Java application, then you would typically use a Java-based Docker image that would have the exact version of the JVM that you need. 

By specifying only what your application needs, you end up with lightweight containers that can be scheduled and ran side-by-side.  

# Why Should You Use Docker?

Imagine you were working in a development team that spanned across the world. In this team you were working on a number of different microservices that all pieced together to form one larger system. 

If all of these microservices were written in different languages and required various environment variables to be set or exact versions of programming languages such as Python, Go, Node to be used. Setting up your machine to support the development of these various microservices could be difficult and you might find yourself spending hours on getting your configuration just right.

By using Docker, we can remove this issue almost entirely. Each microservice would come with its own `Dockerfile` within the root of the repository. This `Dockerfile` would contain everything each of your microservices would need in order to run. 

In order to run and develop one of these microservices, you would simply have to pull the project down and run the appropriate `docker run` command with appropriate flags and your microservice would be started on your local machine. You would no longer have to spend hours trying to get everything just right and you could dive right into the codebase and start making changes.

# Installation

Docker can be installed by navigating to this page: [Docker Download](https://www.docker.com) and clicking the download button.

Once you have Docker installed on your machine, you should be able to run `docker` commands from the terminal. Running just `docker` by itself should return a list of everything you can do with the `docker` binary:

```s
➜  tutorialedge-v2 git:(master) ✗ docker

Usage:  docker COMMAND

A self-sufficient runtime for containers

Options:
      --config string      Location of client config files (default "/Users/elliot/.docker")
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket(s) to connect to
  -l, --log-level string   Set the logging level ("debug"|"info"|"warn"|"error"|"fatal") (default "info")
      --tls                Use TLS; implied by --tlsverify
      --tlscacert string   Trust certs signed only by this CA (default "/Users/elliot/.docker/ca.pem")
      --tlscert string     Path to TLS certificate file (default "/Users/elliot/.docker/cert.pem")
      --tlskey string      Path to TLS key file (default "/Users/elliot/.docker/key.pem")
      --tlsverify          Use TLS and verify the remote
  -v, --version            Print version information and quit
... and so on
```

# A Simple Python Docker Application

Let's have a shot at writing our own Docker based application that uses Python and serves a very simple REST API over port 3000.

```dockerfile
FROM python:3.6.3
WORKDIR /app
ADD . /app
RUN pip install -r requirements.txt
EXPOSE 80
CMD ["python", "app.py"]
```

Now, let's have a look at how we would go about implementing our `app.py` python application:

```py
from flask import Flask
import os

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World"

if __name__ == "__main__":
app.run(host='0.0.0.0', port=80)
```

Now, in order to run this, we would first have to build our image using the `docker build` command passing in the name of the image we wish to build using the `-t` flag and specifying where our `Dockerfile` exists with the `.` at the end of the command like so:

```s
docker build -t py36-account-service .
```

We then want to run our newly created `py36-account-service` image by utilizing the `docker run` command specifying the name of our container as `py36-account-service`, that we wish to run this in a detached mode with `-d` and the port we wish to expose with `-p`. We want to access this application through port `9000` locally but within the container our application will be running on port `80`, so we specify `9000:80` to map these two ports together and forward any traffic hitting `http://localhost:9000` into our container and subsequently to our application.

Finally we specify the image we wish to build our container from by appending `py36-account-service` to the end of our command:

```s
docker run --name "py36-account-service" -d -p 9000:80 py36-account-service
```

# Benefits

The main benefits of Docker-izing the above Python program would be that if it is reliant on the particular version of Python we specified, another developer wouldn't have to worry about getting this installed on their machine. They would simply have to have `docker` installed on their machine and then they would run that above `docker run` command and their service would start up and be exposed on port 9000.

# Conclusion

In this tutorial, we looked at what Docker is, and how you can use it to improve the way that you develop software. We created a really simple NodeJS project that used Docker and we launched this Docker application using the `docker run` command.



