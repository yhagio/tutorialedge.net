---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
desc: 
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.png
tags:
- beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

Welcome fellow Gophers! In this tutorial, we are going to be looking at how you can interact with a GraphQL server within your Go-based programs. By the end of this tutorial, you should hopefully know how to do the following:

* The basics of GraphQL
* Craft and Submit GraphQL Queries in Go
* Parse the responses returned by GraphQL
* Best Practices 

# The Basics of GraphQL

Ok, so before we dive in, we should really cover the basics of GraphQL. How does using it benefit us as developers?

Well, consider working with systems that handles hundreds of thousands, if not millions of requests per day. Traditionally, you would hit an API that fronts your database and you would be returned a massive JSON response that contains a lot of redundant information that we might not necessarily need.

GraphQL essentially allows you to cut down the noise and describe the data that you wish to retrieve from your APIs so that you are retrieving *only* what you require for your current task/view/whatever.

# Query Language for your API, NOT your Database

One important thing to note is that GraphQL is not a query language like your traditional SQL. It is an abstraction that lies in-front of your APIs and is **not** tied to any specific database or storage engine. 

This is actually really cool. We can stand up a GraphQL server that interacts with existing services and then build around this new GraphQL server instead of having to worry about modifying existing REST APIs.

# Comparing REST to GraphQL

Let's look at how the RESTful approach differs from the GraphQL approach. Now, imagine we were building a service that returns all of the tutorials on this site, if we wanted a particular tutorial's information, we would generally create an API endpoint that allowed us to retrieve particular tutorials based on an ID:

```s
# A dummy endpoint that takes in an ID path parameter
http://api.tutorialedge.net/tutorial/:id
```

This would then return a response, if given a valid `ID`, that would look something like this:

```json
{
    "title": "Go GraphQL Tutorial",
    "Author": "Elliot Forbes",
    "view
}
```

## A Simple Example of Introspection

One of the coolest features of GraphQL is that it is *introspectable*, you are able to introspectively query it using the  

# Conclusion

> **Note -** If you want to keep track of when new Go articles are posted to the site, then please feel free to follow me on twitter for all the latest news: [@Elliot_F](https://twitter.com/elliot_f).