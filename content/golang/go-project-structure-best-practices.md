---
title: "Go Project Structure Best Practices"
date: 2019-12-05T21:14:52Z
desc: In this article, we are going to look at some of the best practices that you should consider when structuring your Go applications.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
tags:
- beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

The structure your Go applications should follow is a somewhat contentious subject. Some people are adamant that everyone should follow the well known [golang-standards/project-layout](https://github.com/golang-standards/project-layout) structure for absolutely every project. 

However, with the introduction of Go Modules as the standard going forward for handling dependencies, this structure starts to present challenges. Going with the traditional structure, you will find that some folders within your structure will not have access to folders such as `internal` or `pkg` and you will have to implement somewhat hacky solutions in order for these to work as-is.

In this article, I will be presenting a range of options that you can choose from when it comes to structuring your Go applications in the new world order. 

> **Note** - When it comes to structuring your applications, there is no "once-and-done" approach. As your application evolves, so too must your method of structuring your project. 

# Small Applications - Flat Structure

Every project starts out small and gradually grows arms and legs depending on how successful it is, or how much time developers are willing to contribute into it. 

```output
application/
 - main.go
 - main_test.go
 - utils.go
 - utils_test.go
 - ...
```

Starting with a flat folder structure in these situations like the one outlined above is highly recommended. By keeping the structure of your project simple to begin with, you as a developer can focus on delivering the highest value features to whoever your intended audience is as quickly as possible, without the cognitive overhead of a complex structure. 

Too often have I seen developers spending more time arranging and re-arranging their codebase at the early stages of their projects, before anything of real value has been delivered and ultimately it leads to longer feedback loops between you as a developer or team of developers and your intended audience.

## Benefits

This flat folder structure is ideal when it comes to developing:

* **Microservices** - tiny applications deployed in a distributed fashion that are built to do one thing, and one thing only.
* **Small Tools and libraries** - Command line tools or small libraries that focus on doing a handful of tasks really well.

## Examples of This Structure

Let's have a look at some examples of where this structure works:

* **[tidwall/gjson](https://github.com/tidwall/gjson)** - This project almost perfectly illustrates the point about how a project can still be successful with an incredibly minimalist structure. They've kept everything incredibly flat and not overcomplicated things from the start whilst focusing on delivering real value to the people that use the project.

* **[go-yaml/yaml](https://github.com/go-yaml/yaml)** - Another very cool project that features a completely flat project structure. 


# Medium/Large Sized Applications - Modularization

As your projects grow in size and complexity, you'll quickly see it start to outgrow the flat structure which is when you should start to consider modularizing your codebase.

Let's take for example a REST API that powers a website. This REST API might have endpoints that handle user registration and login, and another group which handle a users' content in a CRUD-like fashion. 

It is at this point where we should start to consider picking apart our application into semantic groups of functionality and potentially centralizing any core logic shared across these components into a shared package within our project.

```output
rest-api/
- main.go
- user/
- - user.go
- - login.go
- - registration.go
- articles/
- - articles.go
- utils/
- - common_utils.go
```

## Examples of This Structure

Here are just a few Go projects that have adopted this structure. 

* **[google/go-cloud](https://github.com/google/go-cloud)** - This is an excellent example of a project that has adopted this structure. They have broken up the project into packages for each of the IAAS Cloud Providers, and each package contains all of the code pertinent to that specific cloud provider. 
* **[hashicorp/consul](https://github.com/hashicorp/consul)** - This is another great example of a large project that has chosen to go down the modular approach.
* **[ipfs/go-ipfs](https://github.com/ipfs/go-ipfs)** - IPFS is a very cool peer-to-peer filesystem written in Go based off of previous systems such as Git and BitTorrent. Again, they've chosen to go for a modular approach when developing their system.
 
# Mature Projects

You will absolutely still see projects that adhere to the older project structure, but this is very much a byproduct of the time in which these applications were developed. 

Large applications such as Hashicorp's Terraform or Google's own Kubernetes tend to feature remnants of the old style of structure which worked very well when the `$GOPATH` reigned supreme. You'll see that they still feature `internal` and `pkg` folders which encapsulate some of the inner workings of the projects. 

* **[hashicorp/terraform](https://github.com/hashicorp/terraform/tree/master/terraform)** 
* **[Kubernetes/kubernetes](https://github.com/kubernetes/kubernetes)**

This structure has worked exceptionally well and allowed the developers to deliver incredible value to the development community, however I think that as Go Modules start to become more prevalent, we will start to see a migration of these applications away from the more traditional structure and into a newer structure. 

# Conclusion

Hopefully this article has helped you in your development efforts and given you some ideas when you start modeling your next Go project!

These are my own findings based off my own personal development experience developing services and service brokers in my day job. Your own mileage may vary when using these structures but I would love to hear your own thoughts and tips on how you structure your Go applications in the comments section below!

## Further Reading:

If you found this article useful, then you may also appreciate some of my other articles:

* [Go Modules Tutorial](/golang/go-modules-tutorial/)