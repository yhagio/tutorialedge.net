---
author: Elliot Forbes
date: 2016-02-14T16:11:58+05:30
desc: In this tutorial we look at how we can easily define different application configuration
  for different environments.
series: angular
image: angular.png
tags:
- typescript
title: Angular Multiple Environment Configuration Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> This Tutorial is part of the Angular Fundamentals course which can be found here: [Angular Fundamentals](https://tutorialedge.net/course/angular-2-fundamentals)

If you are developing serious applications there is a very good chance that you will have more than one environment. You’ll have at least one testing environment to harmlessly break things in and a polished production environment that is supposed to remain as stable as possible.

Angular, or more specifically the angular-cli provides a very good mechanism for having multiple differing configuration files and for building these files easily into your finished build artefacts.

# Why Is This Necessary

Say for instance you are developing a new Administration dashboard for your website that interacts with a REST API that updates your articles. Now imagine you wanted to develop and test new features, without potentially breaking your existing application for people using your site. How would you test new features without impacting your existing application?

This is where different environments will help, ideally you would have at minimum 2 environments. One testing environment which interacts with a test REST API and a test Database.

# How Do You Manage the Configuration?	

So the most basic way of managing two different environments is to just change a variable or two every time you want to test or deploy something. But then what happens when our app becomes increasingly sophisticated and requires hundreds of different configuration variables?

The most popular answer to this is to move all of this configuration to a set of configuration or ‘environment’ files. If your application was built using the Angular-CLI then you should notice an `environment` directory within your `src` directory. 

The default file is your `environment.ts` file which should look like so: 

```js
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false
};
```

# Adding Your Own Configuration

So in this example, we want to be able to easily switch between APIs depending on what environment we are in.

In our standard `environment.ts` file we can define the api location of our test REST API:

```js
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  api_url: 'http://localhost:8000'
};
```

And in our `environment.prod.ts` file we can define our production REST API:

```ts
export const environment = {
  production: true,
  api_url: 'http://localhost:9000'
};
```

# Importing These Variables Where They Are Needed:

So now that we’ve defined these variables, how do we reference these in our environment files? 

So typically we interact with APIs using services, in this example we’ll be interacting with a `user` api. At the top of our service file we add: `import { environment } from ‘../../environments/environment’;`

This then references whatever production file we need depending on the arguments we pass to our build or serve command.

# Building For Different Environments

The Angular CLI provides both a build and serve command for use that takes in an environment argument. Whenever we want to build our application for a specific environment we do the following:

```bash
ng build -e prod
```

And change `prod` to the environment that we want. Leaving it blank will default it to the standard test environment config. The built files in the dist folder can then be pushed up to wherever you are hosting your application. 

If we wanted to run the serve command for our test environment we would then do:

```bash
ng serve
```

# Conclusions

If you found this tutorial useful then please be sure to let me know in the comments section below.