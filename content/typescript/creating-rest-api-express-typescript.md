---
title: "Building a RESTful API using Express and Typescript"
date: 2018-03-28T20:25:53+01:00
draft: true
desc: "In this tutorial, we look at how properly implement a tests within your go based systems using the go test tool"
author: "Elliot Forbes"
tags: ["typescript", "express"]
series: ["typescript"]
twitter: "https://twitter.com/Elliot_F"
---

In this tutorial, we are going to be building a REST API using both `express` and TypeScript! This REST API will simply return a status depending on what API endpoint we hit using our HTTP Client. 

## Our Project Layout

So within our project, we are going to create a couple of incredibly simple endpoints that will simply return a few simple strings, depending on what `HTTP` verb is used to hit said route.

## Our app.ts File

Let's begin by creating our `app.ts` file. Within this we are going to import the `express` node module and then set up our `express` server. This includes setting up a simple endpoint within our application that will simple return `Hi` whenever that route is hit. 

```ts
import * as express from "express";

// Our Express APP config
const app = express();
app.set("port", process.env.PORT || 3000);

// API Endpoints
app.get('/', (res, request) => {
    res.send("Hi")   
})

// export our app
export default app;
```

## Our Status Controller

Next, we will want to create a controller. We'll call this `./src/controllers/status.ts` within our application.

```ts
import { Request, Response } from 'express'

export let hi = (req: Request, res: Response) => {
    res.send("hello")
}

export let hello = (req: Request, res: Response) => {
    res.send("how's it going?")
}

export let awesome = (req: Request, res: Response) => {
    res.send("EVERYTHING IS AWESOME")
}
```

## Our server.ts File

Our `server.ts` file will act as the entry point for our REST API. This will kick off our application and start listening for incoming requests.

```ts
import app from './app'

const server = app.listen(app.get("port"), () => {
    console.log(
        "App is running on http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    )
});

export default server;
```

## Package.json

Finally, we want to define our `package.json`. This will feature all of our dependencies and the scripts we will need in order to keep developing our application. 

The key one to note is the `watch` script which will concurrently watch our typescript application for changes and subsequently run the built `server.js` file using `nodemon`.

```js
{
  "name": "express-api",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "watch-ts": "tsc -w",
    "watch-node": "nodemon dist/server.js",
    "watch": "concurrently -k -p \"[{name}]\" -n \"TypeScript, Node\" -c \"yello.bold, cyan.bold\" \"yarn run watch-ts\" \"yarn run watch-node\""
  },
  "dependencies": {
    "@types/express": "^4.11.1",
    "concurrently": "^3.5.1",
    "express": "^4.16.3"
  }
}
```

## Running our Build Server

In order to run our REST API locally, you can run the `watch` script like so:

```bash
$ yarn run watch
```

This will continuously watch for changes and serve our application on port 3000 like so:

```bash
0:23:48 - File change detected. Starting incremental compilation...
[TypeScript]
[TypeScript]
[TypeScript] 20:23:48 - Compilation complete. Watching for file changes.
[TypeScript]
[TypeScript]
[ Node] [nodemon] restarting due to changes...
[ Node] [nodemon] starting `node dist/server.js`
[ Node] App is running on http://localhost:3000 in development mode
```

## Conclusion

Hopefully, you have found this tutorial useful. We managed to set up an entire RESTful API written in TypeScript that automatically rebuilds whenever we make any changes to our code.