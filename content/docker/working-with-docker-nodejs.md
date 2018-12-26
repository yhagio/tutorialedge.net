---
author: Elliot Forbes
date: 2018-05-27T21:40:20+01:00
desc: In this tutorial, we are going to look at how you can dockerize a NodeJS application
image: docker.png
series: docker
tags:
- docker
- nodejs
- javascript
title: Working With Docker and NodeJS - Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> The full source code for this tutorial can be found here: [TutorialEdge/Docker/node-docker](https://github.com/TutorialEdge/Docker/tree/master/node-docker)

In this tutorial, we are going to be looking at how you can dockerize an existing NodeJS application and ultimately leverage the benefits of Docker. We'll be creating a Docker image that will dynamically pick up changes to a NodeJS application and automatically recompile and rerun our application without having to rebuild and re-run our docker image.

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:42.76%"><iframe src="https://www.youtube.com/embed/CsWoMpK3EtE?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="842" height="360" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

# Advantages of Docker

Docker offers a number of massive advantages and can drastically reduce the friction of deploying your application to multiple platforms with minimal fuss. 

New developers can easily pull down Docker-ized applications and run them with a couple of commands on their local machine. Application developers explicitly state within the `Dockerfile` everything that application needs in order to run.  

# Our NodeJS Application

We are going to start off with a fairly simple, 6-line NodeJS Express.JS application that will simply serve `Hello World!` when it's `/` endpoint is hit with a `GET` request. 

The application will listen on port `3000` for any incoming requests and will map those requests against the corresponding route. 

Create a new file called `app.js` within a new `node-docker` directory on your local machine. Once this is created, add the following:

```js
// app.js
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send(`Hello World!`))

app.listen(3000, () => {
  console.log(`Example app listening on port 3000!`)
})

```

As this uses the `express.js` library, we'll have to figure out a way of getting this into the Docker container that will be running our application. 

If you are familiar with Node.js development, you'll know that the standard practice for this is to declare that your application requires `express.js` within the `package.json` in your application's directory. Create this now and add the following to the newly created file:

```js
// package.json
{
    "name": "simple-rest-api",
    "version": "1.0.0",
    "main": "app.js",
    "dependencies": {
      "express": "^4.16.3"
    },
    "scripts": {
      "start": "node app.js"
    }
  }
```

> We can test if our application works locally by calling `npm install` within our project directory and then subsequently calling `npm run start`. You should then be able to navigate to `http://localhost:3000/` and be greeted with `Hello World!` in your browser. 

# Dockerizing our Application

The aim of the game here is to get a docker image that is as thin as possible in terms of size and is still able to provide our application with everything it needs in order to run successfully.

We'll choose a fairly lightweight `alpine` based image from which to base our own Docker image on top of. 

```Dockerfile
FROM node:9-slim
# WORKDIR specifies the directory our 
# application's code will live within
WORKDIR /app
# We copy our package.json file to our 
# app directory
COPY package.json /app
# We then run npm install to install
# express for our application
RUN npm install
# We then copy the rest of our application
# to the app direcoty
COPY . /app
# We start our application by calling
# npm start.
CMD ["npm", "start"]
```

Now, we've done two distinct `COPY` commands within our `Dockerfile`, and the reason for this is to reduce the time taken for us to continually rebuild our application. 

Docker automatically caches the results of each individual command so that they don't have to be fully run each time you wish to build a Docker image. By doing it this way, we can cache the results of our `npm install` command so that every time we build our Docker image, it doesn't constantly have to reinstall all our dependencies. This may not take a lot of time for this particular project, but for larger projects, this can become a massive time drain.

## Building our Docker Image

Now that we have defined our `Dockerfile` within our application's directory, we can go about building our Docker image. We can do this by running the following `docker` command within our terminal.

```s
> docker build -t node-docker .
```

This will subsequently run through the 6 steps outlined within our `Dockerfile` and build our complete Docker image. 

## Running our Docker Image

Once our Docker image has been successfully built, we can then go about running one or more Docker containers based off this image by running the following command:

```s
> docker run -d -p 9000:3000 node-docker
```

This will start up a Docker container based off our `node-docker` docker image and expose it on port `9000` on our machine. The `-d` flag specifies that we wish to run this in a detached mode which means that the docker container will run in the background on our host machine. 

> It's important to note that whilst our Node.js application may be listening for requests on port `3000` within the code, by specifying `-p 9000:3000` we essentially map any requests to port `9000` from our host machine to the underlying docker container listening on port `3000`.

## Viewing running Docker Containers

In order to view all of the running containers on your local machine, type `docker ps`. This should show our `node-docker` container running and the ports that it's listening to.

# Automatically Picking up Changes

The first thing we'll have to do in order for our running Docker container to pick up any changes is mount it to a directory on my host machine. We can achieve this by using the `-v` flag and specifying the current directory of my application and mapping that to the `/app` directory our application lives within in our docker container.

We can also install and use the `nodemon` node_module in order to automatically watch for any changes to our source files and subsequently kick off our server with these incorporated changes.

```s
$ npm install --save nodemon
```

Now that `nodemon` is explicitly listed within our `package.json` as a dependency, we can go ahead and rebuild our docker image:

```s
$ docker build -t node-docker-tutorial .
```

We can then run this with the `-v` flag as mentioned before like so:

```s
$ docker run -it -p 9001:3000 -v $(pwd):/app node-docker-tutorial
```

If you now navigate to `http://localhost:9001` you should see your application up and running, if you then subsequently make any changes to the app, these changes will be picked up and automatically reran within our container! Awesome!

# Conclusion

In this tutorial, we learned how to implement a docker container that perfectly wraps our NodeJS application. This Docker container is deployable anywhere that can run docker which is a massive advantage! No more worrying about the fact that "it works on my machine".

If you found this tutorial useful then please feel free to let me know in the comments section below or on twitter: [@elliot_f](https://twitter.com/elliot_f).

