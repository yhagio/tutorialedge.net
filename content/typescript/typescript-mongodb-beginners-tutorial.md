---
author: Elliot Forbes
date: 2018-06-10T18:56:37.000+00:00
desc: In this tutorial, we are going to look at how you can work with MongoDB within
  your TypeScript application
image: typescript.png
series: typescript
tags:
- typescript
- mongodb
title: Typescript REST API And MongoDB Beginners Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg

---
# Introduction

In this tutorial, we'll be building a very simple REST API that will allow you
to store, query, update and delete books from a book table within your MongoDB
instance. This will hopefully cover everything you need to get a basic project
up yourself for your own side projects.

# Prerequisites

In order to complete this tutorial, you are going to need the following:

* `npm` or `yarn` installed on your machine. We'll be using `yarn` as our primary tool for dependency management, but `npm` does also work should you wish to use that instead.
* The `tsc` cli installed on your machine, this can be done with either of these commands:
  * `npm install -g typescript`
  * `yarn global add typescript`

# Setting Up A MongoDB Database with Docker

For the purpose of this tutorial, I'm going to be using `docker` in order to
quickly get a mongodb instance up and running on my local development machine.

```s
$ docker pull mongo
$ docker run --name my_mongo -d -p 127.0.0.1:27017:27017 mongo
```

Note: If you already have a mongodb instance up and running then please feel
free to ignore this step and carry on using your own instance.

# Setting up our Project

Before we get started creating our TypeScript application, we'll first need to initialize our project. This can be done relatively easily with the help of the `tsc` command line tool:

```bash
tsc --init
```

This command will go and create a `tsconfig.json` file in the root of our project directory which will contain all of the default settings for compiling our TypeScript application into executable JavaScript.

Within this `tsconfig.json` file you will want to set the `outDir` to `dist/` and we'll want to specify the `sourceRoot` to `src/` and turn on `inlineSourceMap`. After doing that, your `tsconfig.json` file should look something like this:

> **Note**: I've removed all of the commented out fields to keep this short and easy to follow

<div class="filename">tsconfig.json</div>

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5",
    "module": "commonjs",
    "outDir": "./dist",
    /* Strict Type-Checking Options */
    "strict": true,      
    "esModuleInterop": true,
    /* Source Map Options */
    "sourceRoot": "./src",
    "inlineSourceMap": true
  }
}
```

With this initialized, we'll also have to initialize a new `package.json` file. This can be done by calling:

    yarn init

The `package.json` file will contain all of our TypeScript project's dependencies.

# Our TypeScript Application

Our TypeScript application is going to simply expose a simple REST API that will
allow us to perform basic CRUD on our MongoDB table. We'll be creating a table
that will contain a list of technical books and some attributes about said
books.

```bash
# rough book schema
[
  { "title": "Learning Concurrency in Python" },
  { "title": "An Introduction to Cloud Development" }
  ...
]
```

Now, MongoDB is a non-relational database so if we wish to add new fields like
an author, some comments or the book's rating then we can certainly do so in the
future. This will be enough for us to get started with right now though.

# Our Base REST API

So, to get started, we'll need to create a very simple REST API that will expose
5 distinct API endpoints:

```py
- GET - /books # returns all books
- GET - /book/1 # returns a book with id 1
- POST - /book # inserts a new book into the table
- DELETE - /book/1 # deletes a book with id of 1
- PUT - /book/1 # updates a book with id of 1
```

This doesn't look too bad, 5 distinct endpoints, nothing we haven't done before!

# Our Project File Structure

Let's have a look at the project structure for the REST API that we'll be
building. We'll need a main entry point which will be our `app.ts` file, this
will handle our API config and starting the server on a given port.

We'll next be building up a `bookController.ts` file which will contain all of
the REST API endpoints that we defined above. It'll be within this file that
we'll put the code for interacting with our mongodb instance.

```py
- src/
- - controllers/
- - - bookController.ts
- - app.ts
- - book.ts
- tsconfig.json
- package.json
- node_modules/
- dist/ # all of our built ts files get put here by the compiler
```

let's initialize this project now by creating a new directory to work in and
running `yarn init`. Once we have successfully initialized our project, we need
to install both `express` and `@types/express` like so:

```s
$ yarn add express @types/express
```

We'll also want to install the `concurrently` library so that we can run and
rebuild any changes we make to our TypeScript based API without having to go
back into the command line.

```s
$ yarn add concurrently nodemon
```

Within our `package.json` file we'll now have to add the following `scripts`:

<div class="filename">package.json</div>

```json
{
  // clipped
  "scripts": {
    "watch-ts": "tsc -w",
    "watch-node": "nodemon dist/app.js",
    "watch": "concurrently -k -p \"[{name}]\" -n \"TypeScript, Node\" -c \"yello.bold, cyan.bold\" \"yarn run watch-ts\" \"yarn run watch-node\""
  }
  // clipped
}
```

We can now build and run our application by typing `yarn run watch` into our
terminal. At this stage, not a lot should happen, as we don't yet have any code!
Let's go and fix this now!

# Our app.ts File

Let's start off by creating a really simple `express` based server that returns
`hi` when we hit the `/`.

<div class="filename">app.ts</div>

```ts
import express, { Request, Response } from "express";

// Our Express APP config
const app = express();
app.set("port", process.env.PORT || 3000);

// API Endpoints
app.get("/", (req: Request, res: Response => res.send("hi"));

const server = app.listen(app.get("port"), () => {
  console.log("App is running on http://localhost:%d", app.get("port"));
});
```

If we save this and kick off our `yarn run watch` script, you should see that
this will successfully start up a really simple server on
`http://localhost:3000` that returns `hi`.

Excellent, we now have a good base on top of which we can build our MongoDB
based REST API!

# Our bookController.ts File

Ok, so let's start fleshing out our API and subsequently the functions within our `bookController.ts` file we want to expose.

<div class="filename">bookController.ts</div>

```ts
import { Request, Response } from "express";

export let allBooks = (req: Request, res: Response) => {
  res.send("Returns all Books");
};

export let getBook = (req: Request, res: Response) => {
  res.send("Returns one book");
};

export let deleteBook = (req: Request, res: Response) => {
  res.send("Returns one book");
};

export let updateBook = (req: Request, res: Response) => {
  res.send("Returns one book");
};

export let addBook = (req: Request, res: Response) => {
  res.send("Returns one book");
};
```

Within our `app.ts` file, we'll now want to map these functions up to a
corresponding endpoint:

```ts
import express, { Request, Response } from "express";

import * as bookController from "./controllers/bookController";

// Our Express APP config
const app = express();
app.set("port", process.env.PORT || 3000);

// API Endpoints
app.get("/", (req: Request, res: Response) => res.send("hi"))

// API Endpoints
app.get("/", bookController.allBooks);
app.get("/{id}", bookController.getBook);
app.post("/", bookController.addBook);
app.put("/{id}", bookController.updateBook);
app.delete("/{id}", bookController.deleteBook);

const server = app.listen(app.get("port"), () => {
  console.log("App is running on http://localhost:%d", app.get("port"));
});
```

Excellent, we have now defined all of the API Endpoints we had in mind. It's now
time to work on integrating this with MongoDB!

# Integrating with MongoDB

The first thing we'll need to do is import a new library that will allow us to
not only connect to our MongoDB instance, but to also do cool things such as
insert new books, query those books and whatever else we wish to do.

```s
$ yarn add mongoose @types/mongoose
```

The `mongoose` library has been around since the dawn of MongoDB. I can remember
it being the number one choice years ago and it hasn't changed since.

`mongoose` allows you to work with models, much like Hibernate if you are coming
from Java.

<div class="filename">book.ts</div>

```ts
import * as mongoose from "mongoose";

const uri: string = "mongodb://127.0.0.1:27017/local";

mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Succesfully Connected!");
  }
});

export interface IBook extends mongoose.Document {
  title: string;
  author: number;
}

export const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true }
});

const Book = mongoose.model<IBook>("Book", BookSchema);
export default Book;
```

Within our book controller, we'll now want to create the 5 distinct functions
that we've previously mapped to an endpoint within our `app.ts` file.

<div class="filename">controllers/bookController.ts</div>

```ts
// controllers/bookController.ts
import { Request, Response } from "express";
import Book from "./../book";

// We'll start with allBooks which will return
// every we have from our database
export let allBooks = (req: Request, res: Response) => {
  let books = Book.find((err: any, books: any) => {
    if (err) {
      res.send("Error!");
    } else {
      res.send(books);
    }
  });
};
```

Next, we'll want to use the `findById()` function in order to query our database
for a particular book based of an `id` that is passed in via a path parameter.
i.e. `http://localhost:3000/book/my-unique-book-id` where `my-unique-book-id`
will be an alphanumeric string.

<div class="filename">controllers/bookController.ts</div>

```ts
export let getBook = (req: Request, res: Response) => {
  let book = Book.findById(req.params.id, (err: any, book: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(book);
    }
  });
};
```

Our `deleteBook` function will look much like our `getBook` function in the
sense that it takes in a path parameter `id` value and uses that to dictate what
row to delete from our database. We pass this `id` into the `deleteOne()`
function and specify the callback function we wish to invoke once this has
completed.

<div class="filename">controllers/bookController.ts</div>

```ts
export let deleteBook = (req: Request, res: Response) => {
  let book = Book.deleteOne({ _id: req.params.id }, (err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Succesfully Deleted Book");
    }
  });
};
```

The `updateBook` function will this time use the `findByIdAndUpdate()` mongoose
function in order to find a specific book and then update that based off the
JSON block we send within the body of our `HTTP` request:

<div class="filename">controllers/bookController.ts</div>

```ts
export let updateBook = (req: Request, res: Response) => {
  console.log(req.body);
  let book = Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err: any, book: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Succesfully updated book!");
      }
    }
  );
};
```

And finally, the `addBook` function will simply insert a new book object into
our MongoDB database. We'll pass in the `title` and the `author` we wish in a
`json` object within our `PUT` requests' body. If the `json` object we pass in
doesn't have these two fields as a minimum then it'll fail and return an error!

<div class="filename">controllers/bookController.ts</div>

```ts
export let addBook = (req: Request, res: Response) => {
  var book = new Book(req.body);

  book.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(book);
    }
  });
};
```

# Running our Project

Now, we should be done with our programming section of this tutorial, it's time
to run this and try and test it by throwing a few HTTP Requests at it. We can
again run our REST API by calling the following command:

```s
$ yarn run watch
[ Node] [nodemon] restarting due to changes...
[ Node] [nodemon] starting `node dist/server.js`
[ Node] App is running on http://localhost:3000 in development mode
[ Node] Connected to MongoDb
```

Once this is up and running, I encourage you to play around using something like
Postman in order to hit your API with a number of different HTTP requests and do
things like populate your database, update any entries and just get used to
interacting with it in general.

# Conclusion

Hopefully you found this tutorial useful! If you did then I'd love to hear your
feedback on twitter: [@Elliot_F](https://twitter.com/elliot_f).

If you need any further help then please feel free to let me know in the
comments section below!