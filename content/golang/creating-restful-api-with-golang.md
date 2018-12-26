---
author: Elliot Forbes
date: 2017-04-15T08:45:15+01:00
desc: this tutorial demonstrates how you can create your own simple RESTful JSON api
  using Go(Lang)
series: golang
image: golang.png
tags:
- intermediate
title: Creating a RESTful API With Golang
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 16
---

In this article, I'm going to be showing you how we can create a simple Golang based REST API that serves up a JSON based response whenever it is hit using a `HTTP` GET request.

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/W5b64DXeP0o?ecver=2" width="640" height="360" frameborder="0" allow="autoplay; encrypted-media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

# REST Architectures

REST is everywhere these days, from websites to enterprise applications, the RESTful architecture style is a powerful way of providing communication between separate software components. Building REST APIs allow you to easily decouple both consumers and producers and are typically stateless by design.

> **Note -** If you wish to learn more about the basics of REST APIs then check out <a href="/general/what-is-a-rest-api/">What Are RESTful APIs?</a>

## JSON

For the purpose of this tutorial I’ll be using JavaScript Object Notation as a means of sending and receiving all information and thankfully Go comes with some excellent support for encoding and decoding these formats using the standard library package, encoding/json. 

> **Note -** For more information on the encoding/json package check out the official documentation: <a href="https://golang.org/pkg/encoding/json/" target="_blank">encoding/json</a>

## Marshalling

In order for us to easily We can easily convert data structures in GO into JSON by using something called marshalling which produces a byte slice containing a very long string with no extraneous white space. 

# Getting Started with A Basic API

To get started we will have to create a very simple server which can handle HTTP requests. To do this we'll create a new file called `main.go`. Within this `main.go` file we'll want to define 3 distinct functions. A `homePage` function that will handle all requests to our root URL, a `handleRequests` function that will match the URL path hit with a defined function and a `main` function which will kick off our API.

```go
package main

import (
    "fmt"
    "log"
    "net/http"
)

func homePage(w http.ResponseWriter, r *http.Request){
    fmt.Fprintf(w, "Welcome to the HomePage!")
    fmt.Println("Endpoint Hit: homePage")
}

func handleRequests() {
    http.HandleFunc("/", homePage)
    log.Fatal(http.ListenAndServe(":8081", nil))
}

func main() {
    handleRequests()
}
```

If we run this on our machine now, we should see our very simple API start up on port 8081 if it's not already been taken by another process. If we now navigate to `http://localhost:8081/` in our local browser we should see `Welcome to the HomePage!` print out on our screen. This means we have successfully created the base from which we'll build our REST API.

> **Note -** If you want a more in-depth tutorial on how to create a go based web server then check out this tutorial here: <a href="/golang/creating-simple-web-server-with-golang/">Creating a Simple Web Server with Go(Lang)</a>

# Our Articles Structure

We'll be creating a REST API that allows us to `CREATE`, `READ`, `UPDATE` and `DELETE` the articles on our website. When we talk about `CRUD` APIs we are referring to an API that can handle all of these tasks: Creating, Reading, Updating and Deleting.

Before we can get started, we'll have to define our `Article` structure. Go has this concept of structs that are perfect for just this scenario. Let's create an `Article` struct that features a Title, a Description (desc) and Content like so:

```go
type Article struct {
    Title string `json:"Title"`
    Desc string `json:"desc"`
    Content string `json:"content"`
}

type Articles []Article
```

Our Struct contains the 3 properties we need to represent all of the articles on our site. In order for this to work, we'll also have to import the `"encoding/json"` package into our list of imports.

# Retrieving All Articles

Now that we've set up our `Article` struct, we can start mocking up some API endpoints that we can hit to retrieve some data. We are going to create a new function named `returnAllArticles` that will do just that, return every article for our site. However, we don't yet have articles that we can send back so we'll have to mock them. 

```go
func returnAllArticles(w http.ResponseWriter, r *http.Request){
    articles := Articles{
        Article{Title: "Hello", Desc: "Article Description", Content: "Article Content"},
        Article{Title: "Hello 2", Desc: "Article Description", Content: "Article Content"},
    }    
    fmt.Println("Endpoint Hit: returnAllArticles")
    
    json.NewEncoder(w).Encode(articles)
}
```

In the above function, we've created an array of articles each with their own title, description, and content. We then log the fact that this Endpoint has been hit and we then return the articles as JSON to the requester. `json.NewEncoder(w).Encode(article)` does the job of encoding our articles array into a JSON string and then writing as part of our response.

Before this will work, we'll also need to add a new line to our `handleRequests` function that will map any calls to `http://localhost:8081/all` to our newly defined function. 

```go
func handleRequests() {
    http.HandleFunc("/", homePage)
    http.HandleFunc("/all", returnAllArticles)
    log.Fatal(http.ListenAndServe(":8081", nil))
}
```

Now that we've done this, run the code by typing `go run main.go` and then open up http://localhost:8081/all in your browser and you should see a JSON representation of your list of articles like so:

```js
[
    {
        "Title":"Hello",
        "desc":"Article Description",
        "content":"Article Content"},
    {
        "Title":"Hello 2",
        "desc":"Article Description",
        "content":"Article Content"
    }
]
```

We've successfully defined our first API endpoint. 

# Getting Started with Routers

Now the standard library is adequate at providing everything you need to get your own simple REST API up and running but now that we’ve got the basic concepts down I feel it’s time to introduce third-party router packages. The most notable and highly used is the [gorilla/mux router](https://github.com/gorilla/mux) which, as it stands currently has 2,281 stars on Github.

## Building our Router

```go
package main

import (
    "fmt"
    "log"
    "net/http"
    "encoding/json"
    "github.com/gorilla/mux"
)

… // Existing code from above
func handleRequests() {
    
    myRouter := mux.NewRouter().StrictSlash(true)
    myRouter.HandleFunc("/", homePage)
    myRouter.HandleFunc("/all", returnAllArticles)
    log.Fatal(http.ListenAndServe(":10000", myRouter))
}

func main() {
    fmt.Println("Rest API v2.0 - Mux Routers")
    handleRequests()
}
```

## Path Variables

So far so good, we’ve created a very simple REST API that returns a homepage and all our Articles. But what happens if we want to just view one article? Well, thanks to the gorilla mux router we can add variables to our paths and then pick and choose what articles we want to return based on these variables. Create a new route within your handleRequest function: 

```go
myRouter.HandleFunc("/article/{id}", returnSingleArticle)
```

Notice that we've added `{id}` to our path. This will represent our id variable that we'll be able to use when we wish to return only the article that features that exact key. For now, our `Article` struct doesn't feature an Id property. Let's add that now:

```go
type Article struct {
	Id 			int		 `json:"Id"`
	Title   string `json:"Title"`
	Desc    string `json:"desc"`
	Content string `json:"content"`
}
```  

Now that we've done that, in our `returnSingleArticle` function we can obtain this `{id}` value from our URL and we can return the article that matches this criteria. As we haven't stored our data anywhere we'll just be returning the Id that was passed to the browser.

```go
func returnSingleArticle(w http.ResponseWriter, r *http.Request){
    vars := mux.Vars(r)
    key := vars["id"]
    
    fmt.Fprintf(w, "Key: " + key)
}
```

If we navigate to `http://localhost:1000/article/1`after we've now run this, you should see `Key: 1` being printed out within the browser. 

## Multiple Variables

In our route above we’ve created an `id` variable. We are then accessing this id variable within our `returnSingleArticle` function by creating a map called vars and then selecting the key value from this map. We are able to do this for however many variables we want to set in our path like so: 

```go
func returnSingleArticle(w http.ResponseWriter, r *http.Request){
    vars := mux.Vars(r)
    key := vars["key"]
    var1 := vars["var1"]
    var2 := vars["var2"]
    
    fmt.Println("Var 1: " + var1)
    fmt.Println("Var 2: " + var2)
    fmt.Fprintf(w, "Key: " + key)
}

func handleRequests() {
    
    myRouter := mux.NewRouter().StrictSlash(true)
    myRouter.HandleFunc("/", homePage)
    myRouter.HandleFunc("/all", returnAllArticles)
    myRouter.HandleFunc("/article/{key}/{var1}/{var2}/", returnSingleArticle)
    log.Fatal(http.ListenAndServe(":10000", myRouter))
}
```

When you run this and hit: http://localhost:10000/article/1/1/2/ you should see your 2 variables printing out in the console and the page should also return Key: 1.

# Creating and Updating Articles

Under Construction

# Summary

This example represents a very simple RESTful API written using Go. In a real project, we'd typically tie this up with a database so that we were returning real values. For a tutorial on how to connect to a MySQL database using Go I'd recommend my [Go MySQL Tutorial](/golang/golang-mysql-tutorial/)

# Real Life Examples

> If you want a real-life RESTful json api to have a look at, why not take a look at the REST API powering this site's backend: [Tutorialedge-Rest-API](https://github.com/elliotforbes/tutorialedge-rest-api)

# Full Source Code:

```golang
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

// Article - Our struct for all articles
type Article struct {
	Id      int    `json:"Id"`
	Title   string `json:"Title"`
	Desc    string `json:"desc"`
	Content string `json:"content"`
}

type Articles []Article

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")
	fmt.Println("Endpoint Hit: homePage")
}

func returnAllArticles(w http.ResponseWriter, r *http.Request) {
	articles := Articles{
		Article{Title: "Hello", Desc: "Article Description", Content: "Article Content"},
		Article{Title: "Hello 2", Desc: "Article Description", Content: "Article Content"},
	}
	fmt.Println("Endpoint Hit: returnAllArticles")

	json.NewEncoder(w).Encode(articles)
}

func returnSingleArticle(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	key := vars["id"]
	fmt.Fprintf(w, "Key: "+key)
}

func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/all", returnAllArticles)
	myRouter.HandleFunc("/article/{id}", returnSingleArticle)
	log.Fatal(http.ListenAndServe(":10000", myRouter))
}

func main() {
	handleRequests()
}
```



