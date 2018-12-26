---
author: Elliot Forbes
date: 2018-06-09T22:48:26+01:00
desc: In this tutorial, we are going to look at how you can implement a testing framework
  for your TypeScript projects using Mocha and Chai
image: typescript.png
series: typescript
tags:
- typescript
- mocha
- chai
title: Testing Typescript Api With Mocha and Chai
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> We are going to be using the [very simple TypeScript API](/typescript/creating-rest-api-express-typescript/) we developed in a previous tutorial in order to learn about Mocha and Chai Testing.

In this tutorial, we'll be looking at how you can get a very simple test framework up and running for your TypesScript based API using the `mocha` and `chai` testing libraries.

# Why Do We Test?

Being able to accurately test any application you build is hugely important for any software developer regardless of the technology stack they are working with. Having a test suite probe your system to ensure that it performs as expected when called into action helps to ensure that any new changes or bug-fixes to the code don't impact old functions and subsequently start causing reliant systems to fail.

I've seen it all too often where a developer comes in, makes a change, and tests only that particular change to see if it works. When they are happy with it, they release it into their production environment and unwittingly seem to have caused other parts of their system to fail.

Now, a developer could, in theory, test every part of his/her system manually before that change goes live, but this could end up taking a lot of time. In an ideal world, the developer would automate every test using a framework such as `chai` and `mocha` and then run the test suite once before then pushing the code into a higher level environment for further testing.

# Installation

Now that we have gotten the `why?` out of the way, let's see how we can go about implementing our own testing framework:

First and foremost, we'll have to install the libraries that we wish to use to test our systems.

```s
$ npm i chai-http @types/chai-http @types/express @mocha
```

Once you have installed the above packages, you will have to add the `test` script to your `package.json` file within your project:

```js
{
  // name, version etc.
  "scripts": {
    // other scripts
    "test": "mocha -r ts-node/register src/**/*.spec.ts"
  },
  // dependencies etc.
}
```

This will subsequently allow you to run `npm run test` within your project and it will walk through every test file that features `.spec.ts` in its filename.

# A Simple Test

Ok, so we've got the necessary libraries installed, how do we then go about using these to test our codebase? 

Well, let's start by writing a really simple `chai` test suite that will test a very simple `hello` API endpoint.

```js
import app from './app';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Hello API Request', () => {
  it('should return response on call', () => {
    return chai.request(app).get('/hello')
      .then(res => {
        chai.expect(res.text).to.eql("how's it going?");
      })
  })
})
```

Let's dissect what has happened in the above code. We've called mocha's `describe` function which is essentially a wrapper around our suite of test cases. These individual test cases are denoted by the use of the `it()` function and we could have multiple function calls like this within a single `describe()` function body.

## Testing Promises

Now, in the above code we managed to successfully test a promise by using the inbuilt `.request().get()` promise function within `chai`. When this returns we then dictate how that should have responded within our `.then()` promise return. 

In this case we just expect our `/hello` GET endpoint to return `how's it going?`.

## Running our Tests

Now that we've got this test case written, let's try running our test suite by calling the following: 

```s
$ npm run test
```

This should then return the following output:

```s
➜  testing-with-jest git:(master) ✗ npm run test

> express-api@1.0.0 test /tutorials/typescript/testing-with-jest
> mocha -r ts-node/register src/**/*.spec.ts



  Hello API Request
    ✓ should return awesome on call


  1 passing (54ms)
```

Excellent, we now have a running, incredibly simple testing framework that we can start to flesh out and use to test every other endpoint or function within our TypeScript based REST API.

# Conclusion

I hope you enjoyed this tutorial! If you found it useful and wish to learn more then please feel free to follow me on Twitter where I actively post new stuff: [@Elliot_f](https://twitter.com/elliot_f).