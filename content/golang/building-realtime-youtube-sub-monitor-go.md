---
title: "Building a Realtime Youtube Subscriber Monitor in Go"
date: 2019-02-23T09:45:55Z
draft: true
desc:  In this tutorial, we'll be building a realtime websocket based YouTube Subscriber monitor in Go!
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.png
tags:
- beginner
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

Hi Everyone! In this tutorial, we are going to be having a bit of fun and we are going to be creating a real-time YouTube stats monitoring system in Go.

So, we are going to be looking at a number of different topics within this tutorial such as creating a WebSocket server and using WebSockets to communicate in real-time with a frontend application, as well as how you can interact with an existing REST API to get the subscriber stats we need.

# Getting Started

First things first, we'll want to create a new directory to work in. I'll be calling mine `youtube-stats/`. 

Within this new project directory, we'll want to run the following command to initialize our project using go modules. 

```s
$ go mod init github.com/elliotforbes/youtube-stats

```

> **Note -** You'll have to have set up your computer to use the new Go 1.11 Modules - [Go Modules Wiki](https://github.com/golang/go/wiki/Modules)

Within this new directory, we'll be creating our `main.go` file which will be the main entry point to our Go program.

```go
package main

import (
	"fmt"
)

func main() {
	fmt.Println("YouTube Subscriber Monitor")
}
```

Let's go ahead and create a simple `net/http` based server that runs on `http://localhost:8080`. This will act as the base for our WebSocket server that our frontend client will connect to in order to get the stats in real time.

```go
package main

import (
	"fmt"
	"log"
	"net/http"
)

// homePage will be a simple "hello World" style page
func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World")
}

// setupRoutes handles setting up our servers
// routes and matching them to their respective
// functions
func setupRoutes() {
	http.HandleFunc("/", homePage)
    // here we kick off our server on localhost:8080
    log.Fatal(http.ListenAndServe(":8080", nil))
}

// our main function
func main() {
	fmt.Println("YouTube Subscriber Monitor")
	// calls setup routes
    setupRoutes()
}
```

We can then open up a terminal and run this using `go run main.go`. Once you have started this up, try navigating to `http://localhost:8080` within your browser and you should hopefully see `Hello World` printed out in the browser!

Awesome, so we now have a solid base that we can build on top of! 

# The YouTube API

Being able to interact with the YouTube API is going to be a crucial part of this mini-project. In order to connect to this API, we'll need to first create a project within the [Google Developers Console](https://console.developers.google.com/).

> **Note -** If you haven't used the API before, you may have to enable the YouTube V3 Data API

Once we have created a project, we can then create a new API Key within the credentials section of the developer dashboard. 

## API Endpoint

The API that we are going to be interacting with is the `channels/list` API which can be found here - https://developers.google.com/youtube/v3/docs/channels/list#try-it. This should return all of the statistics of our channel as well as things like the description and a few other bits of information.

Using our API Key, we can construct a request to this API Endpoint and test to see if everything works with a simple curl command. Replace the `API-KEY` section of this command with your own API Key and then try running this command in your terminal.

```s
$ curl -i -G -d "id=UCwFl9Y49sWChrddQTD9QhRA&part=snippet%2CcontentDetails%2Cstatistics&key=API-KEY" https://www.googleapis.com/youtube/v3/channels 
```

If everything has worked as expected, we should see a fairly large JSON object printing out in our terminal which contains everything we need!

> **Tip -** curl is a fantastic tool for testing API endpoints and I honestly wish I'd invested more time learning it when I just started my career. A simple curl command can save you a lot of time debugging.

## Authentication

So, as we are going to be using an API Key that is from our own personal Google accounts, we want to ensure that we aren't exposing these to the rest of the world if we commit our project to Git. An excellent way of preventing this from happening is from never hard coding any credentials and to use environment variables. 

Let's set the `YOUTUBE_KEY` and `CHANNEL_ID` environment variables using the `export` command on MacOS like so:

```s
$ export YOUTUBE_KEY=YOUR-KEY-FROM-DEVELOPER-CONSOLE
$ export CHANNEL_ID=UCwFl9Y49sWChrddQTD9QhRA 
```

Now that we've done that, we can use the `os.Getenv()` function in order to retrieve these values whenever we need them in our code base.

## Retrieving our Stats

Now that we've got our API key, we've got an API that we can hit and we are seeing a 200 response from that API through curl, we can start coding up our `youtube` package which will handle all of our application's interaction with the YouTube API. 

Create a new directory within your project called `youtube`, and within that create a new file called `youtube.go`. 

We'll want to define a `GetSubscribers()` function which will return an `Items` struct that we can later Marshal into JSON.

```go
package youtube

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

// Response models the JSON structure
// that we get back from the YouTube API
type Response struct {
	Kind  string  `json:"kind"`
	Items []Items `json:"items"`
}

// Items stores the ID + Statistics for
// a given channel
type Items struct {
	Kind  string `json:"kind"`
	Id    string `json:"id"`
	Stats Stats  `json:"statistics"`
}

// Stats stores the information we care about
// so how many views the channel has, how many subscribers
// how many video etc.
type Stats struct {
	Views       string `json:"viewCount"`
	Subscribers string `json:"subscriberCount"`
	Videos      string `json:"videoCount"`
}

func GetSubscribers() (Items, error) {
	var response Response
    // We want to craft a new GET request that will include the query parameters we want
	req, err := http.NewRequest("GET", "https://www.googleapis.com/youtube/v3/channels", nil)
	if err != nil {
		fmt.Println(err)
		return Items{}, err
	}

    // here we define the query parameters and their respective values
    q := req.URL.Query()
    // notice how I'm using os.Getenv() to pick up the environment
    // variables that we defined earlier. No hard coded credentials here
	q.Add("key", os.Getenv("YOUTUBE_KEY"))
	q.Add("id", os.Getenv("CHANNEL_ID"))
	q.Add("part", "statistics")
	req.URL.RawQuery = q.Encode()

    // finally we make the request to the URL that we have just
    // constructed
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return Items{}, err
	}
	defer resp.Body.Close()

	fmt.Println("Response Status: ", resp.Status)
    // we then read in all of the body of the
    // JSON response
	body, _ := ioutil.ReadAll(resp.Body)
	// and finally unmarshal it into an Response struct
    err = json.Unmarshal(body, &response)
	if err != nil {
		return Items{}, err
	}
    // we only care about the first Item in our 
    // Items array, so we just send that back
	return response.Items[0], nil
}
```

Awesome, we now have something that is able to hit the YouTube API in a self-contained package that we can reference in other parts of our project. 

# Setting up a WebSocket Endpoint

The next step will be to expose the stats that we are able to retrieve from the YouTube API via a WebSocket endpoint.

```go
// websocket.go
package websocket

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/elliotforbes/youtube-stats/youtube"
	"github.com/gorilla/websocket"
)

// We set our Read and Write buffer sizes
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

// The Upgrade function will take in an incoming request and upgrade the request
// into a websocket connection
func Upgrade(w http.ResponseWriter, r *http.Request) (*websocket.Conn, error) {
    // this line allows other origin hosts to connect to our 
    // websocket server
    upgrader.CheckOrigin = func(r *http.Request) bool { return true }

    // creates our websocket connection 
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return ws, err
    }
    // returns our new websocket connection
	return ws, nil
}
```

We'll then want to create a `Writer` function that will take in the pointer to our recently opened WebSocket connection - `websocket.Conn`. This will subsequently start calling `youtube.GetSubscribers()` from our newly defined `youtube` package every 5 seconds using a really handy ticker from the `time` package:

```go
// websocket.go
func Writer(conn *websocket.Conn) {
    // we want to kick off a for loop that runs for the
    // duration of our websockets connection
	for {
        // we create a new ticker that ticks every 5 seconds
		ticker := time.NewTicker(5 * time.Second)

        // every time our ticker ticks
		for t := range ticker.C {
            // print out that we are updating the stats
            fmt.Printf("Updating Stats: %+v\n", t)
            // and retrieve the subscribers
			items, err := youtube.GetSubscribers()
			if err != nil {
				fmt.Println(err)
			}
            // next we marshal our response into a JSON string
			jsonString, err := json.Marshal(items)
			if err != nil {
				fmt.Println(err)
			}
            // and finally we write this JSON string to our WebSocket
            // connection and record any errors if there has been any
			if err := conn.WriteMessage(websocket.TextMessage, []byte(jsonString)); err != nil {
				fmt.Println(err)
				return
			}
		}
	}
}
```

Now that we have that in place, we'll just need to create a new endpoint on our server to call these two functions and we should be good to go!

# Our New Endpoint

Finally, we'll want to update our `main.go` file to expose our new WebSocket API endpoint. We'll do this by adding a new route to our `setupRoutes()` function called `/stats` which will map to a `stats` function that we'll be defining.

```go
package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/elliotforbes/youtube-stats/websocket"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World")
}

// our new stats function which will expose any YouTube
// stats via a websocket connection
func stats(w http.ResponseWriter, r *http.Request) {
    // we call our new websocket package Upgrade
    // function in order to upgrade the connection
    // from a standard HTTP connection to a websocket one
    ws, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+v\n", err)
    }
    // we then call our Writer function
    // which continually polls and writes the results
    // to this websocket connection
	go websocket.Writer(ws)
}

func setupRoutes() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/stats", stats)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func main() {
	fmt.Println("YouTube Subscriber Monitor")
	setupRoutes()
}
```

And that should be everything we need for our server to work! We can now try running this by calling `go run main.go` and it should kick off our server once again on `http://localhost:8080`.

# The Frontend

The final piece of the puzzle is the frontend. We'll be creating an incredibly simple frontend `index.html` page in this case just to highlight how you can interact with our WebSocket server. 

> **Note -** If you want to spice things up a bit and introduce a framework such as React then it might be worthwhile checking out my course on building a [Real-time Chat Application with React and Go](https://tutorialedge.net/projects/chat-system-in-go-and-react/)

So, we are going to need add some JavaScript which will first open a WebSocket connection for us and then listen for `onopen` events, `onerror` events and `onmessage` events. 

* `onopen` - will be triggered when the WebSocket connection is successfully established.
* `onerror` - will be triggered if there are any errors connecting to our WebSocket server
* `onmessage` - will be triggered when we receive a message from our WebSocket server.

The one we care most about will be the `onmessage` event handler as we'll want to take in the subscriber stats from that event as a `JSON` object. We'll then want to populate our `<h1 id="subs">` element on our page with the subscriber count:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Document</title>
</head>
<body>
    
    <div class="container">
        <h2>YouTube Subscribers</h2>
        <h1 id="subs"></h1>
    </div>

    <script>
        let subscribers = {};
        const websocket = new WebSocket("ws://localhost:8080/stats");
        
        websocket.onopen = function (event) {
            console.log("Successfully connected to websocket server");
        }

        websocket.onerror = function (error) {
            console.log("Error connecting to websocket server")
            console.log(error);
        }

        websocket.onmessage = function (event) {
            // parse the event data sent from our websocket server
            subscribers = JSON.parse(event.data);
            // populate our `sub` element with the total subscriber counter for our
            // channel
            document.getElementById("subs").innerText = subscribers.statistics.subscriberCount;
        }
        
    </script>
    
</body>
</html>
```

Awesome, we should have everything in place for our Real-time monitoring system to work! If you open this `index.html` page in your browser, you should see that it connects to our server. Our server will then start calling the YouTube API every 5 seconds and will send the results back to our frontend `index.html` page for it to render out!

# Conclusion

In this tutorial, we covered a few cool topics such as WebSocket communication using the `gorilla/mux` package as well as handling JSON responses from an API. 

This was a really fun project for me to build up and I hope you enjoyed following it along! If you have any suggestions or comments on this project, then I'd love to hear them through the suggestions box below.

If you want to support the work that I do then feel free to share my work with your friends and family! Every little bit helps! :)

> **Note -** If you want to keep track of when new Go articles are posted to the site, then please feel free to follow me on twitter for all the latest news: [@Elliot_F](https://twitter.com/elliot_f).