---
author: Elliot Forbes
date: 2017-04-09T21:33:19+01:00
desc: In this tutorial I'll be demonstrating how you can implement a twitter bot using
  the go programming language
series: golang
image: golang.png
tags:
- intermediate
weight: 19
title: Writing A Twitter Bot in Golang
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

In this tutorial I’m going to be demonstrating how to build a twitter bot using <a href="https://github.com/dghubble/go-twitter">go-twitter</a>, a popular Go client library for the Twitter API.

I’ll be demonstrating how you can build a go based twitter bot that will be able to do such things as automatically reply to tweets and favorite tweets that contain a specific hashtag.

# Setting Up Your Project

> **Note -** We'll be using go modules which is an experimental feature of Go 1.11

Before we can get started, we'll need to create a new project directory and initialize it using modules:

```s
$ mkdir -p go-twitter-bot
$ go mod init github.com/elliotforbes/go-twitter-bot
```

This should create a `go.mod` file within our directory and we should be good to get started writing our twitter bot!

# Connecting to Twitter

<p>Just like with the <a href="/python/creating-python-twitter-bot-using-twitter-api-python.md">Python version of this tutorial</a>, you’ll have to create an app in twitter’s <a href=”https://apps.twitter.com/”>app control panel</a>. Once you’ve created a new application, it should present you with all the secret tokens and keys that you need in order to proceed.</p>

# Environment Variables

So, once we've created a new application within the twitter apps dashboard, we'll have our credentials and we'll be ready to start coding up our app.

We **never** want to hard-code credentials into our application's source code in case we accidentally commit these credentials into github or somewhere public. Instead, we'll want to set these as environment variables on our local machine and retrieve the credentials from there.

We can export these environment variables like so on MacOS:

```s
$ export CONSUMER_KEY=VALUE
$ export CONSUMER_SECRET=VALUE
$ export ACCESS_TOKEN=VALUE
$ export ACCESS_TOKEN_SECRET=VALUE
```

> **Note -** If you are developing this on Windows, replace the `export` command with `set` and this should still work

Once we've done this, we'll be able to pick these values up safely within our code using the `os` package.

# Writing our Basic Go Twitter Bot

Once you’ve got all the access tokens and secret tokens ready, it’s time to start implementing our Bot.

Let's start off the process by creating a really simple `main.go` file within our working directory:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello World")
}
```

And, just to sanity check that everything is working, let's try and run this by calling `go run`:

```s
$ go run ./...
Hello World
```

Awesome, now that we've got our foundation sorted, let's start building up the rest of our Bot.

The first thing we'll need, is a way to communicate with the twitter API in such a way that it knows who we are. We can create a simple `struct` called `Credentials` which will store our consumer and access tokens for authentication later on.

```go
// Credentials stores all of our access/consumer tokens
// and secret keys needed for authentication against
// the twitter REST API.
type Credentials struct {
	ConsumerKey       string
	ConsumerSecret    string
	AccessToken       string
	AccessTokenSecret string
}

// getClient is a helper function that will return a twitter client
// that we can subsequently use to send tweets, or to stream new tweets
// this will take in a pointer to a Credential struct which will contain
// everything needed to authenticate and return a pointer to a twitter Client
// or an error
func getClient(creds *Credentials) (*twitter.Client, error) {
	// Pass in your consumer key (API Key) and your Consumer Secret (API Secret)
	config := oauth1.NewConfig(creds.ConsumerKey, creds.ConsumerSecret)
	// Pass in your Access Token and your Access Token Secret
	token := oauth1.NewToken(creds.AccessToken, creds.AccessTokenSecret)

	httpClient := config.Client(oauth1.NoContext, token)
	client := twitter.NewClient(httpClient)

	// Verify Credentials
	verifyParams := &twitter.AccountVerifyParams{
		SkipStatus:   twitter.Bool(true),
		IncludeEmail: twitter.Bool(true),
	}

	// we can retrieve the user and verify if the credentials
	// we have used successfully allow us to log in!
	user, _, err := client.Accounts.VerifyCredentials(verifyParams)
	if err != nil {
		return nil, err
	}

	log.Printf("User's ACCOUNT:\n%+v\n", user)
	return client, nil
}

```

Perfect, we now have a means of connecting to the twitter API and validating whether the credentials we have used have worked.

We'll want to update our `main()` function to create a `Credentials` struct and retrieve a new client for us using our newly implemented function:

```go
func main() {
	fmt.Println("Go-Twitter Bot v0.01")
	creds := Credentials{
		AccessToken:       os.Getenv("ACCESS_TOKEN"),
		AccessTokenSecret: os.Getenv("ACCESS_TOKEN_SECRET"),
		ConsumerKey:       os.Getenv("CONSUMER_TOKEN"),
		ConsumerSecret:    os.Getenv("CONSUMER_SECRET"),
	}

	fmt.Printf("%+v\n", creds)

	client, err := getClient(&creds)
	if err != nil {
		log.Println("Error getting Twitter Client")
		log.Println(err)
    }

    // Print out the pointer to our client
    // for now so it doesn't throw errors
    fmt.Printf("%+v\n", client)

}
```

We should now be able to run this using the same `go run ./...` command that we used earlier. If our credentials have been set properly, we should see our account details being printed out in the client!

# Sending Tweets

Ok, so now that we've got a client that works, we can try sending a few test tweets out using one of the libraries' existing functions.

Remove the final `fmt.Printf()` statement in your `main()` function and let's try sending a simple tweet:

```go
tweet, resp, err := client.Statuses.Update("A Test Tweet from a new Bot I'm building!", nil)
if err != nil {
    log.Println(err)
}
log.Printf("%+v\n", resp)
log.Printf("%+v\n", tweet)
```

And, if everything goes to plan, we should see that a new tweet from our account has popped up on our timelines:

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/golang/go-twitter-bot/tweet.png)

# Searching Tweets

Ok, so we're able to send tweets, but how do we go about searching for tweets on a given topic?

To do that we could search for tweets using this handy function:

```go
search, resp, err := client.Search.Tweets(&twitter.SearchTweetParams{
    Query: "Golang",
})

if err != nil {
    log.Print(err)
}

log.Printf("%+v\n", resp)
log.Printf("%+v\n", search)
```

And when we run this, we should be able to see a list of tweets that have `Golang` mentioned somewhere within them!

Now, imagine we swapped this out for `Google`, or `Amazon` or any other major brand and plugged in a sentiment analysis system. We could chart things like the general sentiment for a brand across twitter over time, which would be pretty awesome!

# Conclusion

That's us reached the end of our journey for this particular topic! I'm hoping this tutorial has given you a good enough foundation to go off and build really cool systems that interact with various social media accounts.

> **Note -** If you want to keep track of when new Go articles are posted to the site, then please feel free to follow me on twitter for all the latest news: [@Elliot_F](https://twitter.com/elliot_f).

## Related Tutorials

If you enjoyed this tutorial, you might also enjoy the following tutorials:

* [Building a Face Recognition System in Go](/golang/go-face-recognition-tutorial-part-one/)
