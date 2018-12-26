---
author: Elliot Forbes
date: 2017-04-09T21:27:23+01:00
desc: In this tutorial I demonstrate a simple example of microservice based architecture
series: nodejs
image: node.png
tags:
- javascript
- nodejs
title: Building Software using A Microservice Based Architecture
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this tutorial I’m going to be showing an example of how you could go about building your own software following a microservice based architecture. 

I’m going to be discussing key things such as communication between services, asynchronous vs synchronous and most importantly managing your services. I’m going to be writing everything using Google’s Go(GoLang) programming language but these concepts will be transferable across to other language domains.

# Why Should We Use Microservice Based Architecture?

Microservice based architecture isn’t a silver bullet that will solve all your problems, however, it does a very good job of simplifying the way you develop solutions. This architecture pattern effectively breaks up modules of your project into succinct pieces that can be scaled and reduced as needed. 

It’s a style of architecture that allows teams to work independently on separate parts of a system with only the knowledge of another component’s interface. The architecture is flexible in the sense that modules can be replaced without impacting the picture and modules can be written in the programming language that best solves that particular problem. 

# High-Level Overview

So we’ll be creating 2 services, one a *RESTful* api that persists tweets and another a service that parses twitter for all tweets related to a certain topic. This could be beneficial if you wanted to automatically scrape twitter for tweets about your brand and possibly flag any tweets that are negative so that your PR team could contact them in person.

This could in theory be delivered as one monolithic application but say you wanted to add a service in the future that automatically favourited positive tweets then this separation would make it simple.

<h2>Microservice 1 - Creating a Twitter Stream Reader in GoLang</h2>
The first microservices we are going to be building is a twitter stream reader that will monitor a twitter stream for the words <b>“tutorialedge”</b>. When a tweet is found, it will be persisted to a database. 

You can find the full tutorial for how to build a twitter stream reader here. We however are going to be slightly modifying that code so that it queries our newly built <b>REST</b> API every time a tweet pops up:

```js
package main

import (
    "fmt"
    "log"
    "os"
    "os/signal"
    "syscall"
    "net/http"
    "bytes"
    "github.com/dghubble/go-twitter/twitter"
    "github.com/dghubble/oauth1"
)

func configure() {
    // Pass in your consumer key (API Key) and your Consumer Secret (API Secret) 
    config := oauth1.NewConfig("key", "secret")
    // Pass in your Access Token and your Access Token Secret
    token := oauth1.NewToken("access", "secret")
    httpClient := config.Client(oauth1.NoContext, token)
    client := twitter.NewClient(httpClient)
    
    
    demux := twitter.NewSwitchDemux()
    
    demux.Tweet = func(tweet *twitter.Tweet){
        fmt.Println(tweet.Text)
        var url bytes.Buffer
        user := tweet.User
        
        url.WriteString("http://localhost:10000/insert/")
        url.WriteString(user.Name)
        url.WriteString("/")
        url.WriteString(tweet.Text)
        
        resp, err := http.Get(url.String())
        
        if err != nil {
            fmt.Println(err.Error())
        }
        
        fmt.Println(resp)
    }
    
    demux.DM = func(dm *twitter.DirectMessage){
        fmt.Println(dm.SenderID)
    }
    
    fmt.Println("Starting Stream...")
    
    // FILTER
	filterParams := &twitter.StreamFilterParams{
		Track:         []string{"cat"},
		StallWarnings: twitter.Bool(true),
	}
	stream, err := client.Streams.Filter(filterParams)
	if err != nil {
		log.Fatal(err)
	}
    
    // Receive messages until stopped or stream quits
	go demux.HandleChan(stream.Messages)

	// Wait for SIGINT and SIGTERM (HIT CTRL-C)
	ch := make(chan os.Signal)
	signal.Notify(ch, syscall.SIGINT, syscall.SIGTERM)
	log.Println(<-ch)

	fmt.Println("Stopping Stream...")
	stream.Stop()
    
}

func main() {
    fmt.Println("Go-Twitter Bot v0.01")
    configure()
}
```

<h2>Microservice 2 - REST API</h2>
The second microservice will be a simple REST API that retrieves the tweets that have been stored in the database to anyone who queries it. 

```go
package main

import (
    "log"
    "fmt"
    "net/http"
    "database/sql"
    "encoding/json"
    "github.com/gorilla/mux"
    _ "github.com/go-sql-driver/mysql"
)

func getJSON(sqlString string) (string, error) {
    // Open up our database connection.
    db, err := sql.Open("mysql", "root:charlie1@tcp(127.0.0.1:3306)/test")
    
    // if there is an error opening the connection, handle it
    if err != nil {
        panic(err.Error())
    }
    
    rows, err := db.Query(sqlString)
    if err != nil {
        return "", err
    }
    defer rows.Close()
    columns, err := rows.Columns()
    if err != nil {
        return "", err
    }
    count := len(columns)
    tableData := make([]map[string]interface{}, 0)
    values := make([]interface{}, count)
    valuePtrs := make([]interface{}, count)
    for rows.Next() {
        for i := 0; i < count; i++ {
            valuePtrs[i] = &values[i]
        }
        rows.Scan(valuePtrs...)
        entry := make(map[string]interface{})
        for i, col := range columns {
            var v interface{}
            val := values[i]
            b, ok := val.([]byte)
            if ok {
                v = string(b)
            } else {
                v = val
            }
            entry[col] = v
        }
        tableData = append(tableData, entry)
    }
    jsonData, err := json.Marshal(tableData)
    if err != nil {
        return "", err
    }
    fmt.Println(string(jsonData))
    return string(jsonData), nil 
}

func returnAllArticles(w http.ResponseWriter, r *http.Request){
    
    // perform a db.Query insert 
    all, err := getJSON("SELECT * FROM tweets")
    
    if err != nil {
        fmt.Println(err.Error())
    }
    
    fmt.Fprintf(w, all)

}

func homePage(w http.ResponseWriter, r *http.Request){
    fmt.Fprintf(w, "Our Simple RESTful Microservice!")
    fmt.Println("Endpoint Hit: homePage")
}

func insertOne(w http.ResponseWriter, r *http.Request){
    
    vars := mux.Vars(r)
    name := vars["name"]
    tweet := vars["tweet"]
    
    fmt.Println("Name: " + name)
    fmt.Println("Tweet: " + tweet)
    
    // Open up our database connection.
    db, err := sql.Open("mysql", "user:pass@tcp(127.0.0.1:3306)/test")
    
    // if there is an error opening the connection, handle it
    if err != nil {
        panic(err.Error())
    }
    
    
    insert, err := db.Query("INSERT INTO tweets (NAME, TWEET) VALUES ( ? , ? )", name, tweet)
    
    // if there is an error inserting, handle it
    if err != nil {
        panic(err.Error())
    }
    // be careful defering Queries if you are using transactions
    defer insert.Close()
    
    fmt.Fprintf(w, "Inserted one into the Database")
}

func handleRequests() {
    myRouter := mux.NewRouter().StrictSlash(true)
    myRouter.HandleFunc("/", homePage)
    myRouter.HandleFunc("/all", returnAllArticles)
    myRouter.HandleFunc("/insert/{name}/{tweet}", insertOne)
    log.Fatal(http.ListenAndServe(":10000", myRouter))
}

func main() {
    fmt.Println("Go MySQL Tutorial")
    
    handleRequests()
    
}
```

<h2>Conclusion</h2>

These two services are independent of each other and if one falls over then the other services aren't affected. This demonstrates the resiliency of the microservice based architecture and if performance becomes an issue, more instances of each service can be spun up.

These two small programs are just a very primitive example of a program that utilizes a microservice based architecture. Numerous services could be added on top of this such as a responder to every tweeter or auto-favourite service in order to boost community involvement or whatever.
This hopefully served as a useful demonstration of microservices working together. If you found anything wrong with the tutorial then please let me know so I can rectify it. 