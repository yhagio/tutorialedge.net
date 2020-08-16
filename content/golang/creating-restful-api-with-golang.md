---
author: Elliot Forbes
date: 2017-04-15T08:45:15+01:00
desc:
  this tutorial demonstrates how you can create your own simple RESTful JSON api
  using Go(Lang)
series: golang
image: golang.svg
tag: Intermediate
tags: 
 - intermediate
title: Creating a RESTful API With Golang
twitter: https://twitter.com/Elliot_F
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
weight: 16
---

If you are writing any form of web application, then you are most likely
interfacing with 1 or more REST APIs in order to populate the dynamic
parts of your application and to perform tasks such as updating or deleting
data within a database.

**In this tutorial, you are going to be building a fully-fledged REST API**
that exposes `GET`, `POST`, `DELETE` and `PUT` endpoints that will subsequently
allow you to perform the full range of `CRUD` operations. 

In order to keep this simple and focus on the basic concepts, we won't be interacting
with any backend database technologies to store the articles that we'll be 
playing with. However, we will be writing this REST API in such a way that it will
be easy to update the functions we will be defining so that they make subsequent
calls to a database to perform any necessary `CRUD` operations.

If you wish to learn more about how you can use Go to interact with Databases, 
you can check out the following articles:

* [Go MySQL Tutorial](/golang/golang-mysql-tutorial/)
* [Go ORM Tutorial](/golang/golang-orm-tutorial/)

> **Source Code** - The full source code for this article can be found here:
[TutorialEdge/create-rest-api-in-go-tutorial](https://github.com/TutorialEdge/create-rest-api-in-go-tutorial)

## Prerequisites

* You will need Go version 1.11+ installed on your development machine. 

## Goals

By the end of this tutorial, you will know how to create your own REST-ful
APIs in Go that can handle all aspects of. You will know how to create 
REST endpoints within your project that can handle `POST`, `GET`, `PUT` and 
`DELETE` HTTP requests.

## Video Tutorial

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/W5b64DXeP0o?ecver=2" width="640" height="360" frameborder="0" allow="autoplay; encrypted-media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## REST Architectures

REST is everywhere these days, from websites to enterprise applications, the
RESTful architecture style is a powerful way of providing communication between
separate software components. Building REST APIs allow you to easily decouple
both consumers and producers and are typically stateless by design.

> **Note -** If you wish to learn more about the basics of REST APIs then check
> out <a href="/general/what-is-a-rest-api/">What Are RESTful APIs?</a>

### JSON

For the purpose of this tutorial I’ll be using JavaScript Object Notation as a
means of sending and receiving all information and thankfully Go comes with some
excellent support for encoding and decoding these formats using the standard
library package, encoding/json.

> **Note -** For more information on the encoding/json package check out the
> official documentation:
> <a href="https://golang.org/pkg/encoding/json/" target="_blank">encoding/json</a>

### Marshalling

In order for us to easily We can easily convert data structures in GO into JSON
by using something called marshalling which produces a byte slice containing a
very long string with no extraneous white space.

## Getting Started with A Basic API

To get started we will have to create a very simple server which can handle HTTP
requests. To do this we'll create a new file called `main.go`. Within this
`main.go` file we'll want to define 3 distinct functions. A `homePage` function
that will handle all requests to our root URL, a `handleRequests` function that
will match the URL path hit with a defined function and a `main` function which
will kick off our API.

<div class="filename">main.go</div>

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
    log.Fatal(http.ListenAndServe(":10000", nil))
}

func main() {
    handleRequests()
}
```

If we run this on our machine now, we should see our very simple API start up on
port 10000 if it's not already been taken by another process. If we now navigate
to `http://localhost:10000/` in our local browser we should see
`Welcome to the HomePage!` print out on our screen. This means we have
successfully created the base from which we'll build our REST API.

> **Note -** If you want a more in-depth tutorial on how to create a go based
> web server then check out this tutorial here:
> <a href="/golang/creating-simple-web-server-with-golang/">Creating a Simple
> Web Server with Go(Lang)</a>

## Our Articles Structure

We'll be creating a REST API that allows us to `CREATE`, `READ`, `UPDATE` and
`DELETE` the articles on our website. When we talk about `CRUD` APIs we are
referring to an API that can handle all of these tasks: Creating, Reading,
Updating and Deleting.

Before we can get started, we'll have to define our `Article` structure. Go has
this concept of structs that are perfect for just this scenario. Let's create an
`Article` struct that features a Title, a Description (desc) and Content like
so:

```go
type Article struct {
    Title string `json:"Title"`
    Desc string `json:"desc"`
    Content string `json:"content"`
}

// let's declare a global Articles array
// that we can then populate in our main function
// to simulate a database
var Articles []Article
```

Our Struct contains the 3 properties we need to represent all of the articles on
our site. In order for this to work, we'll also have to import the
`"encoding/json"` package into our list of imports.

Let's now update our `main` function so that our `Articles` variable is populated
with some dummy data that we can retrieve and modify later on.

```go
func main() {
    Articles = []Article{
        Article{Title: "Hello", Desc: "Article Description", Content: "Article Content"},
        Article{Title: "Hello 2", Desc: "Article Description", Content: "Article Content"},
    }
    handleRequests()
}
```

Perfect, let's now move on to creating our `/articles` endpoint which will
return all of the articles that we've just defined here.

## Retrieving All Articles

In this part of the tutorial we are going to create a new REST endpoint which,
when hit with a `HTTP GET` request, will return all of the articles for our site.

We'll first start off by creating a new function called `returnAllArticles`, which 
will do the simple task of returning our newly populated `Articles` variable, encoded
in JSON format:

<div class="filename">main.go</div>

```go
func returnAllArticles(w http.ResponseWriter, r *http.Request){
    fmt.Println("Endpoint Hit: returnAllArticles")
    json.NewEncoder(w).Encode(Articles)
}
```

The call to `json.NewEncoder(w).Encode(article)` does the job of encoding our articles 
array into a JSON string and then writing as part of our response.

Before this will work, we'll also need to add a new route to our `handleRequests`
function that will map any calls to `http://localhost:10000/articles` to our newly
defined function.

```go
func handleRequests() {
    http.HandleFunc("/", homePage)
    // add our articles route and map it to our 
    // returnAllArticles function like so
    http.HandleFunc("/articles", returnAllArticles)
    log.Fatal(http.ListenAndServe(":10000", nil))
}
```

Now that we've done this, run the code by typing `go run main.go` and then open
up `http://localhost:10000/articles` in your browser and you should see a JSON
representation of your list of articles like so:

<div class="filename">http://localhost:10000/articles response</div>

```js
[
  {
    Title: "Hello",
    desc: "Article Description",
    content: "Article Content"
  },
  {
    Title: "Hello 2",
    desc: "Article Description",
    content: "Article Content"
  }
];
```

We've successfully defined our first API endpoint. 

In the next part of this series, you are going to update your REST API
to use a `gorilla/mux` router instead of the traditional `net/http` router.

Swapping the routers will enable you to more easily perform tasks such as
parsing any path or query parameters that may reside within an incoming 
`HTTP` request which we will need later on.

## Getting Started with Routers

Now the standard library is adequate at providing everything you need to get
your own simple REST API up and running but now that we’ve got the basic
concepts down I feel it’s time to introduce third-party router packages. The
most notable and highly used is the
[gorilla/mux router](https://github.com/gorilla/mux) which, as it stands
currently has 2,281 stars on Github.

### Building our Router

We can update our existing `main.go` file and swap in a `gorilla/mux`
based `HTTP` router in place of the standard library one which was present
before.

Modify your `handleRequests` function so that it creates a new router.

<div class="filename">main.go</div>

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
    // creates a new instance of a mux router
    myRouter := mux.NewRouter().StrictSlash(true)
    // replace http.HandleFunc with myRouter.HandleFunc
    myRouter.HandleFunc("/", homePage)
    myRouter.HandleFunc("/all", returnAllArticles)
    // finally, instead of passing in nil, we want
    // to pass in our newly created router as the second
    // argument
    log.Fatal(http.ListenAndServe(":10000", myRouter))
}

func main() {
    fmt.Println("Rest API v2.0 - Mux Routers")
    Articles = []Article{
        Article{Title: "Hello", Desc: "Article Description", Content: "Article Content"},
        Article{Title: "Hello 2", Desc: "Article Description", Content: "Article Content"},
    }
    handleRequests()
}
```

When you now run this, you will see no real change to the way our system
works. It will still start up on the same port and return the same
results depending on what endpoints you hit.

The only real difference is that we now have a gorilla/mux router which 
will allow us to easily do things such as retrieve path and query parameters
later on in this tutorial. 

<div class="filename"> $ go run main.go </div>

```output
Rest API v2.0 - Mux Routers
```

### Path Variables

So far so good, we’ve created a very simple REST API that returns a homepage and
all our Articles. But what happens if we want to just view one article? 

Well, thanks to the gorilla mux router we can add variables to our paths and then 
pick and choose what articles we want to return based on these variables. Create a
new route within your `handleRequests()` function just below our `/articles` route:

```go
myRouter.HandleFunc("/article/{id}", returnSingleArticle)
```

Notice that we've added `{id}` to our path. This will represent our id variable
that we'll be able to use when we wish to return only the article that features
that exact key. For now, our `Article` struct doesn't feature an Id property.
Let's add that now:

```go
type Article struct {
    Id      string `json:"Id"`
    Title   string `json:"Title"`
    Desc    string `json:"desc"`
    Content string `json:"content"`
}
```

We can then update our `main` function to populate our `Id` values in our 
`Articles` array:

```go
func main() {
    Articles = []Article{
        Article{Id: "1", Title: "Hello", Desc: "Article Description", Content: "Article Content"},
        Article{Id: "2", Title: "Hello 2", Desc: "Article Description", Content: "Article Content"},
    }
    handleRequests()
}
```

Now that we've done that, in our `returnSingleArticle` function we can obtain
this `{id}` value from our URL and we can return the article that matches this
criteria. As we haven't stored our data anywhere we'll just be returning the Id
that was passed to the browser.

```go
func returnSingleArticle(w http.ResponseWriter, r *http.Request){
    vars := mux.Vars(r)
    key := vars["id"]

    fmt.Fprintf(w, "Key: " + key)
}
```

If we navigate to `http://localhost:1000/article/1`after we've now run this, you
should see `Key: 1` being printed out within the browser.

Let's use this `key` value to return the specific article that matches that key.

```go
func returnSingleArticle(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    key := vars["id"]

    // Loop over all of our Articles
    // if the article.Id equals the key we pass in
    // return the article encoded as JSON
    for _, article := range Articles {
        if article.Id == key {
            json.NewEncoder(w).Encode(article)
        }
    }
}
```

Run that by calling `go run main.go` and then open up `http://localhost:10000/article/1`
in your browser:

<div class="filename">http://localhost:10000/article/1 response</div>

```js
{
Id: "1",
Title: "Hello",
desc: "Article Description",
content: "Article Content"
}
```

You will now see the article matching the key `1` returned as JSON.

## Creating and Updating Articles

In this part of the tutorial, you are going to build the `Create`, `Update` and
`DELETE` part of a `CRUD` REST API. We have already covered the `R` with the ability
to read both single articles and all articles.

### Creating new Articles 

Once again, you will need to create a new function which will do the job of creating
this new article. 

Let's start off by creating a `createNewArticle()` function within our `main.go` file.

```go
func createNewArticle(w http.ResponseWriter, r *http.Request) {
    // get the body of our POST request
    // return the string response containing the request body    
    reqBody, _ := ioutil.ReadAll(r.Body)
    fmt.Fprintf(w, "%+v", string(reqBody))
}
```

With this function defined, you can now add the route to the list of routes defined
within the `handleRequests` function. This time however, we'll be adding `.Methods("POST")`
to the end of our route to specify that we only want to call this function when
the incoming request is a `HTTP POST` request:

```go
func handleRequests() {
    myRouter := mux.NewRouter().StrictSlash(true)
    myRouter.HandleFunc("/", homePage)
    myRouter.HandleFunc("/articles", returnAllArticles)
    // NOTE: Ordering is important here! This has to be defined before
    // the other `/article` endpoint. 
    myRouter.HandleFunc("/article", createNewArticle).Methods("POST")
    myRouter.HandleFunc("/article/{id}", returnSingleArticle)
    log.Fatal(http.ListenAndServe(":10000", myRouter))
}
```

Try running this again and then try submitting a `HTTP POST` request which
contains the following `POST` body:

```js
{
    "Id": "3", 
    "Title": "Newly Created Post", 
    "desc": "The description for my new post", 
    "content": "my articles content" 
}
```

Our endpoint will trigger and subsequently echo back whatever value was in 
the request body.

Now that you have validated your new endpoint is working correctly, let's
update our `createNewArticle` function so that it unmarshals the JSON in the
request body into a new `Article` struct which can subsequently be appended
to our `Articles` array:

```go
func createNewArticle(w http.ResponseWriter, r *http.Request) {
    // get the body of our POST request
    // unmarshal this into a new Article struct
    // append this to our Articles array.    
    reqBody, _ := ioutil.ReadAll(r.Body)
    var article Article 
    json.Unmarshal(reqBody, &article)
    // update our global Articles array to include
    // our new Article
    Articles = append(Articles, article)

    json.NewEncoder(w).Encode(article)
}
```

Awesome! If you run this now and send the same `POST` request to your application,
you will see that it echoes back the same JSON format as before, but it also 
appends the new Article to your `Articles` array.

Validate this now by hitting the `http://localhost:10000/articles`:

<div class="filename">http://localhost:10000/articles response</div>

```js
[
    {
        "Id": "1",
        "Title": "Hello",
        "desc": "Article Description",
        "content": "Article Content"
    },
    {
        "Id": "2",
        "Title": "Hello 2",
        "desc": "Article Description",
        "content": "Article Content"
    },
    {
        "Id": "3",
        "Title": "Newly Created Post",
        "desc": "The description for my new post",
        "content": "my articles content"
    }
]
```

You have now successfully added a `Create` function to your new REST API!

In the next section of this tutorial, you are going to look at how you can 
add a new API Endpoint which will allow you to delete Articles.

### Deleting Articles

There may be times where you need to delete the data being exposed by your
REST API. In order to do this, you need to expose a `DELETE` endpoint within
your API that will take in an identifier and delete whatever is associated with
that identifier.

In this section of this tutorial, you are going to be creating another endpoint
which receives `HTTP DELETE` requests and deletes articles if they match the given
`Id` path parameter.

Add a new function to your `main.go` file which we will call `deleteArticle`:

```go
func deleteArticle(w http.ResponseWriter, r *http.Request) {
    // once again, we will need to parse the path parameters
    vars := mux.Vars(r)
    // we will need to extract the `id` of the article we
    // wish to delete
    id := vars["id"]

    // we then need to loop through all our articles
    for index, article := range Articles {
        // if our id path parameter matches one of our
        // articles
        if article.Id == id {
            // updates our Articles array to remove the 
            // article
            Articles = append(Articles[:index], Articles[index+1:]...)
        }
    }

}

```

Once again, you will need to add a route to the `handleRequests` function which
maps to this new `deleteArticle` function:

```go
func handleRequests() {
    myRouter := mux.NewRouter().StrictSlash(true)
    myRouter.HandleFunc("/", homePage)
    myRouter.HandleFunc("/articles", returnAllArticles)
    myRouter.HandleFunc("/article", createNewArticle).Methods("POST")
    // add our new DELETE endpoint here
    myRouter.HandleFunc("/article/{id}", deleteArticle).Methods("DELETE")
    myRouter.HandleFunc("/article/{id}", returnSingleArticle)
    log.Fatal(http.ListenAndServe(":10000", myRouter))
}
```

Try sending a new `HTTP DELETE` request to `http://localhost:10000/article/2`. This
will delete the second article within your Articles array and when you subsequently
hit `http://localhost:10000/articles` with a `HTTP GET` request, you should see it 
now only contains a single `Article`.

> **Note** - To keep this simple, we are updating a global variable. However, we aren't
doing any checks to ensure that our code is free of race conditions. In order to make this 
code thread-safe, I recommend checking out my other tutorial on [Go Mutexes](/golang/go-mutex-tutorial/)

### Updating Articles Endpoint

The final endpoint you will need to implement is the Update endpoint. This endpoint
will be a `HTTP PUT` based endpoint and will need to take in an `Id` path parameter, 
the same way we have done for our `HTTP DELETE` endpoint, as well as a JSON request 
body. 

This JSON in the body of the incoming `HTTP PUT` request will contain the newer version
of the article that we want to update.

#### **Challenge**

Try create an `updateArticle` function and corresponding route in the
`handleRequests` function. This will match to `PUT` requests. Once you have this, 
implement the `updateArticle` function so that it parses the `HTTP` request body, 
using the same code that you used in your `createNewArticle` function. 

Finally, you will have to loop over the articles in your `Articles` array and match
and subsequently update the article.

## Conclusion

This example represents a very simple RESTful API written using Go. In a real
project, we'd typically tie this up with a database so that we were returning
real values.

> **Source Code** - The full source code for this tutorial can be found here:
[TutorialEdge/create-rest-api-in-go](https://github.com/TutorialEdge/create-rest-api-in-go-tutorial)

### Further Reading

If you enjoyed this article, then you may also enjoy the following tutorials:

* [Designing a Production-Ready REST API](/software-eng/designing-a-rest-api/)
* [Go MySQL Tutorial](/golang/golang-mysql-tutorial/)

