---
author: Elliot Forbes
date: 2018-06-09T22:48:26+01:00
desc: In this tutorial, we are going to look at how you can implement a testing framework
  for your TypeScript projects using Jest and Supertest
image: typescript.png
series: typescript
tags:
- typescript
- jest
title: Testing Typescript Api With Jest and Supertest
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> We are going to be using the [very simple TypeScript API](/typescript/creating-rest-api-express-typescript/) we developed in a previous tutorial in order to learn about Jest Testing.

In this tutorial, we'll be looking at how you can get a very simple test framework up and running for your TypesScript based API using the `jest` and `supertest` testing libraries.

# Installation

Now that we have gotten the `why?` out of the way, let's see how we can go about implementing our own testing framework:

First and foremost, we'll have to install the libraries that we wish to use to test our systems. 

```s
$ yarn add ts-jest jest supertest
```

Once you have installed the above packages, you will have to add the `test` script to your `package.json` file within your project:

```js
{
  // name, version etc.
  "scripts": {
    // other scripts
    "test": "jest"
  },
  // dependencies etc.
  // our jest test suite configuration
  "jest": {
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "globals": {
      "ts-jest": {
        "tsConfigFile": "tsconfig.json"
      }
    },
    "testMatch": [
      "**/__tests__/*.+(ts|tsx|js)"
    ]
  }
}
```

You'll notice we've also added in the `jest` configuration to our `package.json` in the above code snippet. This dictates where `jest` will be able to find our tests and in this case we've dictated they'll be within our `src/__tests__/` directory.

# A Simple Test

Ok, so we've got the necessary libraries installed, how do we then go about using these to test our codebase? 

Well, let's start by writing a really simple `jest` test suite that will test a very simple `hello` API endpoint.

```js
import app from '../app';
import * as request from 'supertest';

describe('GET / - a simple api endpoint', () => {
  it('Hello API Request', async () => {
    const result = await request(app).get('/');
    expect(result.text).toEqual("hello");
    expect(result.statusCode).toEqual(200);
  });
})
```

In the above test suite we have used the `supertest` library to make a test request against our API endpoint `GET "/"`. This then awaits the response and tests this response to ensure it's what we expect.

## Running our Tests

Now that we've got this test case written, let's try running our test suite by calling the following: 

```s
$ yarn run test
```

This should then return the following output:

```s
✗ yarn run test
yarn run v1.5.1
(node:10360) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
$ jest
 PASS  src/__tests__/app.test.ts
  ✓ Hello API Request (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.171s
Ran all test suites.
✨  Done in 3.12s.
```

Excellent, we now have a running, incredibly simple testing framework that we can start to flesh out and use to test every other endpoint or function within our TypeScript based REST API.

# Conclusion

I hope you enjoyed this tutorial! If you found it useful and wish to learn more then please feel free to follow me on Twitter where I actively post new stuff: [@Elliot_f](https://twitter.com/elliot_f).