---
author: Elliot Forbes
date: 2018-03-28T20:25:53+01:00
desc: In this tutorial, we look at how properly implement a tests within your go based
  systems using the go test tool
image: typescript.png
series: typescript
tags:
- typescript
- express
title: Building a RESTful API using Express and Typescript
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this tutorial, we are going to be building a REST API using both `express` and TypeScript! This REST API will simply return a status depending on what API endpoint we hit using our HTTP Client. 

# Prerequisites

You will require at least the following:

* TypeScript 2.8.1
* The Yarn Package Manager
* ExpressJS

# Our Project Layout

So within our project, we are going to create a couple of incredibly simple endpoints that will simply return a few simple strings, depending on what `HTTP` verb is used to hit said route.

We'll be using the `tsc` compiler to transpile our TypeScript code back to normal JavaScript and then we'll be running this built code using `nodemon`. 

# Package.json

We'll need to start by initializing our project using the `npm init` command. This will generate the initial version of our `package.json` and allow us to specify any dependencies and scripts our project may need. Once you've run through this basic initialization, let's add a few `scripts` to our `package.json` that will enable us to compile and run our TypeScript application:

```json
"scripts": {
    "watch-ts": "tsc -w",
    "watch-node": "nodemon dist/server.js",
    "watch": "concurrently -k -p \"[{name}]\" -n \"TypeScript, Node\" -c \"yello.bold, cyan.bold\" \"yarn run watch-ts\" \"yarn run watch-node\""
}
```

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

Should we try to run our `watch` script by calling `npm run watch`, you should notice it fails. This is because we haven't yet specified our `tsconfig.json` and as such our `tsc -W` fails to execute. 

# Our tsconfig.json

Create a new `tsconfig.json` file within your root directory and add the following configuration:

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "esModuleInterop": false,
        "target": "es6",
        "noImplicitAny": true,
        "moduleResolution": "node",
        "sourceMap": true,
        "outDir": "dist",
        "baseUrl": ".",
        "paths": {
            "*": [
                "node_modules/",
                "src/types/*"
            ]
        }
    },
    "include": [
        "src/**/*"
    ]
}
```

The key things to note in this `tsconfig.json` file are that we are using `commonjs` to resolve our node modules. We are also targetting `es6` as the ECMAScript version we wish to transpile our TypeScript code down to. `outDir` specifies the directory that our built JavaScript files will be pushed into and then `paths` specifies where to resolve the `node_modules` and the `types` that our project will require. 

Finally, within our `include` array, we specify all of the locations in which we will be building up our project. For the purpose of this tutorial, we'll be adding all of our code to a `src` directory and we want any `.ts` files underneath that directory to be included when our project is being rebuilt.

# Initial Dependencies

Before we can start coding up our REST API, we'll need to install any dependencies we may be using. To do this, call the following `npm install` command:

```s
$ npm install express @types/express --save-dev
```

Now that we have these included within our project, we can start programming!

# Our app.ts File

Let's begin programming by creating our `app.ts` file. Within this we are going to import the `express` node module and then set up our `express` server. This includes setting up a simple endpoint within our application that will simple return `Hi` whenever that route is hit. 

```ts
import express = require("express");

// Our Express APP config
const app = express();
app.set("port", process.env.PORT || 3000);

// API Endpoints
app.get('/', (req, res) => {
    res.send("Hi")   
})

// export our app
export default app;
```

# Our server.ts File

Our `/src/server.ts` file will act as the entry point for our REST API. This will kick off our application and start listening for incoming requests. We'll first want to import the express application that we've defined within our `app.ts` file and then start up our server by calling `app.listen`, just as you normally would with a traditional ExpressJS server.

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

With this now added to our project, we can check that everything is working as expected by calling `npm run watch` and checking to see if our application builds and starts as we would expect it to. Once you have kicked off this `watch` script, you should be able to navigate to `http://localhost:3000/` within your browser or with your REST client of choice, and it should deliver `Hi` back to you. Awesome, we now have the base upon which we will be building the rest of our RESTful API!

# Our Status Controller

Now that we have our base API, we want to expand upon it a bit and create a few new API endpoints that we can interact with. We will want to create a new status controller that will return different status strings depending on what API endpoint is called. We'll call this `./src/controllers/status.ts` within our application and we will add the following:

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


# Running our Build Server

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

# Writing our Mocha Test Suite

Now that we've written our simple TypeScript based RESTful API, we need to be able to programatically check that it works! What good is a production bit of software if we don't have a test suite for it!

In order to test this REST API, we'll be using `mocha` and `chai`. You can install these dependencies like so:

```s
npm install chai mocha ts-node @types/chai @types/mocha chai-http @types/chai-http typescript --save-dev
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

# Conclusion

Hopefully, you have found this tutorial useful. We managed to set up an entire RESTful API written in TypeScript that automatically rebuilds whenever we make any changes to our code.