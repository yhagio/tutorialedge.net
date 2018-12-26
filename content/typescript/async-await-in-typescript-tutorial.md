---
author: Elliot Forbes
date: 2018-06-19T20:29:57+01:00
desc: In this tutorial, we are going to be looking at the async and await keywords
  within your Typescript applications
image: typescript.png
series: typescript
tags:
- typescript
title: Async/Await in Typescript - Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this tutorial, we are going to be looking at how you can use both the `async` and `await` keywords within your TypeScript application and subsequently improve the readibility and succinctness of your code.

# Introduction

If you have come from a Node.JS background, you'll most likely be familiar with something we know as Callback Hell. This is where you end up with code within your Node.JS applications that look akin to the Pyramids from ancient Giza. 

```js
myAwesomeFunction(function(x){
    mySecondFunction(x, function(y){
        myThirdNestedFunction(y, function(z){ 
            // here we handle the results of the 3 chained functions.
        });
    });
});
```

People quickly realized that this was an issue and as such Promises were introduced to the language in order to address said issue. These promises are objects that will eventually return as complete or as failed and they allowed us to rewrite the above code like so:

```js
// our original promise function
myAwesomeFunction()
  // on completion would trigger this
  .then(function(result) {
    // which would in turn return another promise
    return mySecondFunction(result);
  })
  // which on completion would trigger this
  .then(function(result2) {
    // which would again return a promise
    return myThirdNestedFunction(finalResult);
  })
  // before finally executing this block
  .then(function(finalResult) {
    // and in here we could play with the result
    // of all three promise calls
    console.log(finalResult)
  })
  // within here we could catch any errors 
  // in our above promises
  .catch(function(error) {
    console.log(error)
  });

```

Now, this was certainly an improvement, however, this isn't all that much better and keeping track of the results of your nested function calls is painful. 

Thankfully, this is what helped bring about both the `async` and the `await` keywords.

# Async + Await Keywords

The `async` keyword within a TypeScript program lets us define an *asynchronous function* like so:

```ts
async function myAwesomeFunction() {
  setTimeout(() => {}, 100, 'foo');
}

const result = myAwesomeFunction();
console.log(result);
// returns Promise { undefined }
```

We can then call this *asynchronous function* in such a manner that its execution becomes *synchronous*. 

Wait, why would we want that? 

By doing this, we can write code that is far cleaner and more understandable than our chained promise example. It allows us to utilize the `await` keyword in front of an express that will return a promise and pause the execution of the function until the `await`-ed promise resolves with a result. 

```ts
async function mySecondFunction(x: number) {
  setTimeout(() => {}, 100);
  return 2 + x;
}

async function myThirdNestedFunction(x: number) {
  setTimeout(() => {}, 100);
  return 3 + x;
}

async function myAwesomeFunction() {
  let startingValue = 1;
  // we can await the call to mySecondFunction() as this 
  // returns a promise that will eventually return
  // our firstResult
  let firstResult = await mySecondFunction(startingValue);
  // once mySecondFunction has resolve, our function will
  // carry on execution of myThirdNestedFunction
  let finalResult = await myThirdNestedFunction(firstResult);
  // once this resolves, we get back our finalResult
  // which we can subsequently return 
  return finalResult;
}

let promise = myAwesomeFunction();
promise.then((result) =>  console.log(result));
```

Now, this should instantly highlight just how much better your application's code can be by switching out chained promises and instead using these new keywords! 

The final result is far more terse, and far more readable for new developers coming into the codebase. 

# Mixing in Raw Promises

If you start working with the `async` and `await` keywords, you should note that you don't preclude the use of raw Promises within your TypeScript applications. 

The `async` keyword will still return a *promise* which can be used in conjunction with something like `Promise.all()`. This gives us the flexibility to run our asynchronous functions in an asynchronous manner whilst ensuring the execution within those functions remains synchronous. Confusing isn't it? 

Let's take a look at what I mean by this in the code:

```ts
async function myAsyncFunction(input: number) {
  // the internal part of our async function
  // will still be executed synchronously thanks
  // to the await keyword
  let result = await setTimeout(() => {
    console.log("Function: %d executed", input)
  }, 1000 * input);
}

Promise.all([myAsyncFunction(3), myAsyncFunction(2), myAsyncFunction(1)])
```

When you execute this, you should see that the execution of the above array of async functions is done asynchronously:

```js
[ Node] [nodemon] starting `node dist/app.js`
[ Node] Function: 1 executed
[ Node] Function: 2 executed
[ Node] Function: 3 executed
```

# Conclusion

Hopefully, this tutorial helped to clarify what the `async` and `await` keywords are and how they can help you to improve the way you write your TypeScript applications. 

If you have any further questions, please let me know in the comments section at the bottom of this article!