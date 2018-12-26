---
author: Elliot Forbes
date: 2017-04-15T09:45:44+01:00
desc: 'This tutorial teaches the user how they can build a twitter bot using both
  the Python programming language and the RESTful Twitter Library. '
series: python
image: python-logo.png
tags:
- intermediate
title: Creating a Twitter Bot Using Python and the Twitter API
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

Twitter bots are a fantastic way to drum up a bit of interest in your brand or website and I've had fantastic results myself building up an audience for the Twitter account specifically for this website. This tutorial will hopefully cover everything it takes to construct your own twitter bot that utilizes the RESTful Twitter API. 

> The source code for this Python wrapper for the Twitter API can be found here: <a href="https://github.com/bear/python-twitter">Github: Bear's Python-Twitter Wrapper</a>

# Getting Started

<p>To get started you will have to use the pip tool to install the Twitter library on your machine. To do so you can use the python pip package manager by typing the following into the terminal:</p>

```c
pip install python-twitter
```

<p>Full installation instructions can be found on the Readme.md file found on github if needed.</p>

# Obtaining OAuth Access Tokens

<p>In order for this Twitter API to work you will have to generate OAuth access tokens for the owner of the application. These access tokens allow your application to run on behalf of the twitter account which you hold for your brand or website. The other option would be to use 3-Legged OAuth but in an attempt to keep this simple we'll be sticking to standard OAuth authentication. A good guide for building access tokens can be found on twitters dev subdomain here: <a href="https://dev.twitter.com/oauth/overview/application-owner-access-tokens">OAuth Access Tokens</a></p>

# Connecting to your Twitter Account using OAuth

<p>The code for connecting to your Twitter account using this Bear's Python wrapper looks like so:</p>

```py
from twitter import Twitter, OAuth, TwitterHTTPError

consumer_key = ''
consumer_secret = ''
access_token_key = ''
access_token_secret = ''

bot = Twitter(auth=OAuth(access_token_key, access_token_secret,
            consumer_key, consumer_secret))
```

<p>Replace the strings 'consumer_key' etc. with the appropriate keys and secrets generated for you and you should have successfully connected to the Twitter RESTful API. Now that we've connected we can begin to do some interesting things such as retweeting followers or searching tweets.</p>

# Searching for Tweets

<p>The first thing we need to do is create a function for searching for tweets, this function will return all recent tweets that have mentioned a specific string anywhere within the tweet.</p>

```py
def search_tweets(query, count=100):
    return bot.search.tweets(query=query, result_type='recent', count=count)
```

# Favoriting Tweets

<p>So now that we've got the basic mechanisms in place to search for tweets, we now have to do something with them. The first interaction I'm going to show you how to do is favourite tweets.</p>

```py
def fav_tweet(tweet):
    try:
        result = t.favorites.create(_id=tweet['id'])
        print "Favorited: %s" % (result['text'])
        return result
    # when you have already favourited a tweet
    # this error is thrown
    except TwitterHTTPError as e:
        print "Error: ", e
        return None
```
# Retweeting Tweets

<p>Retweeting specific tweets is again very similar to favoriting tweets and can be useful if you want to, for instance, retweet all replies to any of the posts you make and try to improve your community presence. </p>

```py
def retweet_tweet(tweet):
    try:
        result = t.statuses.retweet._id(_id=tweet['id'])
        print "Retweeted: %s" % (result['text'])
        return result
    except TwitterHTTPError as e:
        print "Error: ", e
        return None
```

# Bringing it all together

<p>Now that you've got an idea of how to favorite and retweet tweets, we can bring this together into a bot that constantly runs on a server or wherever else you choose to run it.</p>

```py
from twitter import Twitter, OAuth, TwitterHTTPError
import time
#enter the corresponding information from your Twitter application:
consumer_key = ''#keep the quotes, replace this with your consumer key
consumer_secret = ''#keep the quotes, replace this with your consumer secret key
access_token_key = ''#keep the quotes, replace this with your access token
access_token_secret = ''#keep the quotes, replace this with your access token secret


t = Twitter(auth=OAuth(access_token_key, access_token_secret,
            consumer_key, consumer_secret))

def search_tweets(q, count=100):
    return t.search.tweets(q=q, result_type='recent', count=count)

def get_limit():
    try:
        result = t.application.rate_limit_status()
        print result
    except TwitterHTTPError as e:
        print "Error: ", e
        return None

def fav_tweet(tweet):
    try:
        result = t.favorites.create(_id=tweet['id'])
        print "Favorited: %s" % (result['text'])
        return result
    # when you have already favourited a tweet
    # this error is thrown
    except TwitterHTTPError as e:
        print "Error: ", e
        return None
    
def retweet_tweet(tweet):
    try:
        result = t.statuses.retweet._id(_id=tweet['id'])
        print "Retweeted: %s" % (result['text'])
        return result
    except TwitterHTTPError as e:
        print "Error: ", e
        return None
    
def auto_fav(q, count):
    result = search_tweets(q, count)
    a = result['statuses'][0]['user']['screen_name']
    print a
    success = 0
    for tweet in result['statuses']:
        if fav_tweet(tweet) is not None:
            success += 1
    print "We Favorited a total of %i out of %i tweets" % (success,
          len(result['statuses']))
    
def auto_retweet(q, count):
    result = search_tweets(q, count)
    a = result['statuses'][0]['user']['screen_name']
    print a
    success = 0
    for tweet in result['statuses']:
        if retweet_tweet(tweet) is not None:
            success += 1
        time.sleep(10)
    print "We Favorited a total of %i out of %i tweets" % (success, len(result['statuses']))
    
if __name__ == "__main__":
    while(1):
        try:
            auto_retweet("GameDev", 1)
            auto_retweet("IndieDev", 1)
            auto_retweet("ScreenshotSaturday", 1)
        except Exception, e:
            print(e)   
        
        try:
            auto_fav("IndieDev", 1)
        except Exception, e:
            print(e)
```