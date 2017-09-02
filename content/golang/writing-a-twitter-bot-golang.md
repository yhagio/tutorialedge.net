+++
draft = true
date = "2017-04-09T21:33:19+01:00"
title = "Writing A Twitter Bot in Golang"
desc = "In this tutorial I'll be demonstrating how you can implement a twitter bot using the go programming language"
tags = ["golang", "go", "twitter"]
series = [ "golang" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

In this tutorial I’m going to be demonstrating how to build a twitter bot using <a href="https://github.com/dghubble/go-twitter">go-twitter</a>, a popular Go client library for the Twitter API.

I’ll be demonstrating how you can build a go based twitter bot that will be able to do such things as automatically reply to tweets and favourite tweets that contain a specific hashtag.

<h2>Connecting to Twitter</h2>

<p>Just like with the <a href="/python/creating-python-twitter-bot-using-twitter-api">Python version of this tutorial</a>, you’ll have to create an app in twitter’s <a href=”https://apps.twitter.com/”>app control panel</a>. Once you’ve created a new application, it should present you with all the secret tokens and keys that you need in order to proceed.</p>

<h2>Writing our Basic Go Twitter Bot</h2>

<p>Once you’ve got all the access tokens and secret tokens ready, it’s time to start implementing our Bot. Create a new file called <b>twitter-bot.go</b> and add the following:</p>

~~~go
package main

import (
    "fmt"
    "log"
    "os"
    "os/signal"
    "syscall"
    
    "github.com/dghubble/go-twitter/twitter"
    "github.com/dghubble/oauth1"
)

func configure() {
    // Pass in your consumer key (API Key) and your Consumer Secret (API Secret) 
    config := oauth1.NewConfig("consumer-key", "consumer-secret")
    // Pass in your Access Token and your Access Token Secret
    token := oauth1.NewToken("access-token", "access-token-secret")
    httpClient := config.Client(oauth1.NoContext, token)
    client := twitter.NewClient(httpClient)
    
    
    demux := twitter.NewSwitchDemux()
    
    demux.Tweet = func(tweet *twitter.Tweet){
        fmt.Println(tweet.Text)
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
~~~