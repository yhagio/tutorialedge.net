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

## Prerequisites

You will require at least the following:

* TypeScript 2.8.1
* The Yarn Package Manager
* ExpressJS

## Our Project Layout

So within our project, we are going to create a couple of incredibly simple endpoints that will simply return a few simple strings, depending on what `HTTP` verb is used to hit said route.

We'll be using the `tsc` compiler to transpile our TypeScript code back to normal JavaScript and then we'll be running this built code using `nodemon`. 

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

Our `/src/server.ts` file will act as the entry point for our REST API. This will kick off our application and start listening for incoming requests.

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

## Writing our Mocha Test Suite

Now that we've written our simple TypeScript based RESTful API, we need to be able to programatically check that it works! What good is a production bit of software if we don't have a test suite for it!

In order to test this REST API, we'll be using `mocha` and `chai`. You can install these dependencies like so:

```s
npm install chai mocha ts-node @types/chai @types/mocha --save-dev
```

Next, create a file called `./src/app.spec.ts` and add the following:

```ts
import app from './app';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Hello API Request', () => {
  it('should return hello on call', async () => {
    return chai.request(app).get('/')
      .then(res => {
        chai.expect(res.text).to.eql('hello')
      })
  })
})
```

You will also have to update the `package.json` to include a new `script` that will run our `mocha` tests for us:

```json
"test": "mocha -r ts-node/register src/**/*.spec.ts"
```

Now that we've create a simple test and updated our `package.json`, try running our incredible new test suite by calling `npm run test`:

```s
➜  express-api npm run test

> express-api@1.0.0 test /Users/elliot/Documents/Projects/tutorials/typescript/express-api
> mocha -r ts-node/register src/**/*.spec.ts



  Hello API Request
    ✓ should return hello on call


  1 passing (68ms)
```

And Voila! We now have a working test suite that we can expand out and ensure that everything we write now works!

## Conclusion

Hopefully, you have found this tutorial useful. We managed to set up an entire RESTful API written in TypeScript that automatically rebuilds whenever we make any changes to our code.