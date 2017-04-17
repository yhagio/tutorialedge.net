+++
title = "Creating a RESTful API With Golang"
draft = true
date = "2017-04-15T08:45:15+01:00"
desc = "this tutorial demonstrates how you can create your own simple RESTful JSON api using Go(Lang)"
series = [ "golang" ]
tags = ["golang", "rest", "api"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

<h2>REST Architectures</h2>

<p>REST is everywhere these days, from web sites to enterprise applications, the RESTful architecture style is a powerful way of providing communication between various moving by separate software components. Building REST APIs allow you to easily decouple both consumers and producers and are typically stateless by design. </p>

> If you wish to learn more about the basics of REST APIs then check out <a href="https://tutorialedge.net/post/general/what-is-a-rest-api/">What Are RESTful APIs?</a>

<h4>JSON</h4>

<p>For the purpose of this tutorial we’ll be using JavaScript Object Notation as a means of sending and receiving all information and thankfully Go comes with some excellent support for encoding and decoding these formats using the standard library package, encoding/json. </p>

> For more information on the encoding/json package check out the official documentation: <a href="https://golang.org/pkg/encoding/json/" target="_blank">encoding/json</a>

<h4>Marshalling</h4>

<p>In order for us to easily We can easily convert data structures in GO into JSON by using something called marshalling which produces a byte slice containing a very long string with no extraneous white space. </p>

<h2>A Basic Web Server</h2>

<p>In order for a consumer to consume our API we’ll need to set up some form of server which will constantly listen on our local machine for now.</p>

> If you want a more in-depth tutorial on how to create a go based web server then check out this tutorial here: <a href="http://tutorialedge.net/post/golang/creating-simple-web-server-with-golang/">Creating a Simple Web Server with Go(Lang)</a>

~~~go
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

func returnArticle(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "returns a specific article")
    fmt.Println("Endpoint Hit: returnArticle")
}

func returnAllArticles(w http.ResponseWriter, r *http.Request){
    fmt.Fprintf(w, "All Articles")
    fmt.Println("Endpoint Hit: returnAllArticles")
}

func addArticle(w http.ResponseWriter, r *http.Request){
    fmt.Fprintf(w, "Adds an article to list of articles")
    fmt.Println("Endpoint Hit: addArticle")
}

func delArticle(w http.ResponseWriter, r *http.Request){
    fmt.Fprintf(w, "deletes a specific article")
    fmt.Println("Endpoint Hit: delArticle")
}

func handleRequests() {
    http.HandleFunc("/", homePage)
    http.HandleFunc("/all", returnAllArticles)
    http.HandleFunc("/single", returnArticle)
    http.HandleFunc("/delete", delArticle)
    http.HandleFunc("/add", addArticle)
    log.Fatal(http.ListenAndServe(":8081", nil))
}

func main() {
    handleRequests()
}
~~~

<h2>Our Articles Structure</h2>

<p>Once we’ve set up all the endpoints to our API, we can proceed to create a basic model that will store our articles for us and enable us to then encode this into a JSON format and return it via an endpoint.</p>

~~~go
type Article struct {
    Title string `json:"Title"`
    Desc string `json:"desc"`
    Content string `json:"content"`
}

type Articles []Article 
~~~

<h2>Retrieving All Articles</h2>

<p>We’ve now got everything we need in order to start mocking up some data and returning it. Add <b>“encoding/json”</b> to your list of imports at the top of the file and then navigate to the <b>returnAllArticles</b> function and then add the following:</p>

~~~go
func returnAllArticles(w http.ResponseWriter, r *http.Request){
    articles := Articles{
        Article{Title: "Hello", Desc: "Article Description", Content: "Article Content"},
        Article{Title: "Hello 2", Desc: "Article Description", Content: "Article Content"},
    }    
    fmt.Println("Endpoint Hit: returnAllArticles")
    
    json.NewEncoder(w).Encode(articles)
}
~~~

<p>Run this and then open up http://localhost:8081/all in your browser and you should see a json representation of your list of articles like so:</p>

~~~js
[{"Title":"Hello","desc":"Article Description","content":"Article Content"},{"Title":"Hello 2","desc":"Article Description","content":"Article Content"}]
~~~

<h2>Getting Started with Routers</h2>

<p>Now the standard library is adequate at providing everything you need to get your own simple REST api up and running but now that we’ve got the basic concepts down I feel it’s time to introduce third-party router packages. The most notable and highly used is the <a href="https://github.com/gorilla/mux" target="_blank">gorilla/mux router</a> which, as it stands currently has 2,281 stars on github.</p>

<h5>Building our Router</h5>

~~~go
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
~~~

<h5>Path Variables</h5>

<p>So far so good, we’ve created a very simple REST API that returns a homepage and all our Articles. But what happens if we want to just view one article? Well thanks to the gorilla mux router this is easy, we can add variables to our paths and then pick and choose what articles we want to return based of these variables.</p>

<p>Create a new route in your handleRequest function: </p>

~~~go
myRouter.HandleFunc("/article/{key}", returnOneArticle)
~~~

<p>And then create the new returnOneArticle function above it like so: </p>

~~~go
func returnOneArticle(w http.ResponseWriter, r *http.Request){
    vars := mux.Vars(r)
    key := vars["key"]
    
    fmt.Fprintf(w, "Key: " + key)
}
~~~

<p>So to explain this, in our route we’ve created a key variable. We are then accessing this new key variable within our new function by creating a map called vars and then selecting the key value from this map. We are able to do this for however many variables we want to set in our path like so: </p>

~~~go
func returnOneArticle(w http.ResponseWriter, r *http.Request){
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
    myRouter.HandleFunc("/article/{key}/{var1}/{var2}/", returnOneArticle)
    log.Fatal(http.ListenAndServe(":10000", myRouter))
}

~~~

<p>When you run this and hit: http://localhost:10000/article/1/1/2/ you should see your 2 variables printing out in the console and the page should also return Key: 1.</p>

## Real Life Examples

> If you want a real life RESTful json api to have a look at, why not take a look at the rest api powering this site's backend: [Tutorialedge-Rest-API](https://github.com/elliotforbes/tutorialedge-rest-api)