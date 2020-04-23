---
title: "Designing a Production Grade REST API"
date: 2020-02-24T22:11:32Z
desc: In this tutorial, we are going to look at what it takes to design a production-ready REST API.
author: Elliot Forbes
aliases: [
    "/general/rest-api-best-practices/"
]
twitter: https://twitter.com/elliot_f
series: software-engineer
image: logo.svg
tags:
- beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

<!-- TODO: Improve this -->

In this article, we are going to transcend the programming language paradigm and look at the more high-level topic that is REST API design fundamentals. 


We are going to take a look at some of the **do's** and **don'ts** when it comes to designing production-ready services and how we can design our systems so that they can be easily extended, upgraded and maintained without any underlying impact to the people consuming your service.

# Versioning Your API

The first, and quite frankly most important point that you should consider when designing a REST API is that the contract for all your endpoints is **immutable**. This is a really fancy way of saying that no matter when, how, or why you call this API, it should always follow the same contract.

What I mean by this is, if I design an API that let's me update the articles on this site, then I **must** at all times ensure that the API doesn't change the `JSON format` that it expects to update these articles. 

## Example

Let's look at an example of this in action. Say I had an endpoint which, when you hit that endpoint, it would return a `JSON` structure with a response. 

```output
# HTTP GET
https://api.tutorialedge.net/api/hello

{ "response": "hello" }
```

Bear with me here, but imagine that we had customers who started using this endpoint within their own services for whatever reason. 

Now, imagine how upset you would be if your clients were to suddenly see that their systems were breaking as you had updated the endpoint to return the following:

```output
# HTTP GET
https://api.tutorialedge.net/api/hello

{ "content": "hello" }
```

This may appear to have been a subtle change, but whoever was consuming this endpoint had built up their own application around the previous `JSON` structure and expects this to never change. 

## The Solution

This example highlights the importance of versioning your API endpoints. In practice this means ensuring that you expose the first version of your API using a structure like so:

```output
# HTTP GET
https://api.tutorialedge.net/api/v1/hello

{ "response": "hello" }
```

Notice the small change to the path parameters from `/api/hello` to `/api/v1/hello`. 

Now, if we wanted to modify the response of our `JSON` for any reason to use the new `content` key instead, we could simply add a new endpoint which uses `v2` like so:

```output
# HTTP GET
https://api.tutorialedge.net/api/v2/hello

{ "content": "hello" }
```

This approach ensures that we never unintentionally **break the downstream apps** that are using our original version of the service, but it also gives us the flexibility to extend our service and offer newer, or more improved endpoints!

Now, if you are rolling out new versions all the time, then you may want to use a more granular version number in the path parameters. i.e. `/api/v1-1/hello` so that you can roll out minor changes quicker without necessarily upgrading the major version entirely.

## Deprecating Older Versions

At some point, you may want to start deprecating and removing older versions of your API. There are many reasons as to why you might want to do this. From, removing additional endpoints that you have to constantly support, to possibly removing the feature entirely.

When it comes to managing this, you need to be careful and ensure that you **give your customers a massive lead time** in which they can migrate their applications to use newer versions of the system. This could range from a couple weeks to a couple months depending on the complexity of the change and how many clients you are dealing with and unfortunately this is never an easy process.

> **Side Note** - Having good monitoring and logging systems in place within your APIs can drastically help improve this process. If you can accurately map which of your clients is using which version of the endpoint, you can focus your efforts on migrating these clients off and ensure nobody is still using the version before removing it entirely.

# Use Appropriate HTTP Verbs

When it comes to writing APIs it is incredibly important to use the correct HTTP verbs when it comes to creating your API endpoints and **don't include verbs** in your API path. 

For example, don't define endpoints like this:

```output
- /api/v1/getposts
- /api/v1/newpost
- /api/v1/updatepost/:id
- /api/v1/deletepost/:id
```

If another developer is going to be using your API then they won't instinctively know what endpoints they have to use to perform basic CRUD operations. They will feel themselves second guessing as to whether or not the API endpoint to create a post is on `/api/v1/createpost`, `/api/v1/addpost` or `/api/v1/newpost`.

This style is complex and leaves a lot of ambiguity. The better approach would be to use appropriate HTTP verbs instead:

```output
- /api/v1/post - HTTP GET request - All Posts
- /api/v1/post/:id - HTTP GET request - Single post
- /api/v1/post/:id - HTTP POST request - Publish a post
- /api/v1/post/:id - HTTP PATCH request - update an existing post
- /api/v1/post/:id - HTTP DELETE request - deletes a post
```

This is a far cleaner approach as you know instantly from general convention what endpoints you need to hit and with what verbs. There is no ambiguity in this approach.

> **Note** - An excellent example of this approach is the [Open Service Broker API Spec](https://github.com/openservicebrokerapi/servicebroker/blob/master/spec.md)

# Use of HTTP Response Codes

This is a huge rule that you absolutely must adhere to. How your API is viewed by developers consuming the service can be seriously besmirched by an endpoint returning a `200 OK` status when in fact it is quietly failing behind the scenes.

When it comes to returning a response to whomever called your API then it's best
to utilize the correct `HTTP` status codes.

```bash
1xx # Informational Status Codes
2xx # Success status codes
3xx # Redirection status codes
4xx # Client Error status codes
5xx # Server Error status codes
```

By employing correct HTTP response codes we effectively improve the way our
services interact with each other. It's a good idea to refer to
[this](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) list of HTTP
status codes when deciding what to return to a HTTP request in any given
situation.

A good example of this would be to imagine you had an API that powered a simple
blog. You would have a number of different REST API endpoints that would return
things like individual blog posts as well as ones that would allow you to update
said blog posts. We'll imagine that we have 2 endpoints on our API exposed to
the world, the first of which is a `GET` request which simply returns the `JSON`
for that given article, the second is a `UPDATE` endpoint which updates the
given article.

```bash
http://myservice.com/api/v1/article/1 # GET Endpoint returns article '1'
http://myservice.com/api/v1/article/1 # UPDATE Endpoint updates article '1'
```

When a standard user calls `GET` on the first API you would typically return the
json response as well as a `200 - OK` status code which indicates everything is
ok. However, imagine that same user tries to update our article using the
`UPDATE` endpoint. As the user isn't an administrator, we would want to return a
different status code such as `401 - Unauthorized` which would indicate that the
user does not have the sufficient level or permissions. Once the user becomes
authorized as an admin and tries to `UPDATE` again to that same endpoint, we
then return a `200 - OK` status which indicates they were successfully able to
update the article.

# Media Types

If you are building a general purpose API that could be used for a massively variety of reasons then you need to consider adding different responses based on the `Content-Type` header passed in with the request. 

This gives the developer trying to interact with your application the option of requesting a response in a variety of different data formats. 

```output
- /api/v1/posts - HTTP GET - Content-Type: application/json

{ "posts": [
    ... all the posts in JSON
]}
```

Imagine we needed to feed the information from this into a build pipeline but needed the posts in a `yaml` format. Ideally, our API would be able to serialize the response into `yaml` and return it if the `Content-Type` was set to `application/yaml`:

```output
- /api/v1/posts - HTTP GET - Content-Type: application/yaml

posts:
 ... all posts in yaml format
```

# Swagger 

Swagger is something that makes quickly testings and validating API endpoints a treat. If you are building an API that is going to be consumed by a wide variety of users then providing a page which allows them to instantly interact with your API offers huge value for something that takes incredibly minimal amounts of effort to set up.

# Conclusion

So, in this article, we looked at some of the best practices that you should consider when designing your own REST APIs. These are practices that I see a lot of production-grade services adhere to and they absolutely make the lives of developers using your services a whole lot easier.

## Further Reading:

If you enjoyed this article then you may also enjoy these other articles on the site:

* [What is a REST API](/software-eng/what-is-a-rest-api/)
* [Building a REST API in Go](/golang/creating-restful-api-with-golang/)