+++
title = "Creating a Python Web Crawler"
desc = "In this tutorial we look at how you can build a web crawler in Python using beautifulsoup and multiple threads"
draft = true
date = "2017-05-27T19:23:49+01:00"
tags = ["python", "concurrency", "web crawler"]
series = [ "python" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

> This tutorial was built using Python 3.6 

In this tutorial we'll be taking a look at how you can build your own Python web crawler using the ThreadPoolExecutor class and BeautifulSoup. 

Web Crawlers are incredibly interesting in the sense that they can do a huge host of data mining tasks. You could for instance do any of the following:

* Crawl and entire website for broken links, or errors
* Scrape an entire site to get a collective view of the entire site
* Scrape hundreds of different sites in order to build your own simple search engine

The possibilities are truly endless. 

## The Design

The web crawler that we'll be building will take in the base url of a website and will try to crawl every subsequent linked page on that website. The process we'll be following for each page will look something like this:

1. Request the HTML for the Page
2. Parse the page for every link
3. for every link in the returned list, check if it's already in the crawled list
4. if it is then discard it, if not then add it to the list of links to be crawled.

This will continue until the number of links to be crawled is zero and thus all pages of said website have been crawled. 

> Create a new directory called `crawler`. This is where our source code will go for the crawler we will be building.

## Step 1 - Making Requests 

The first problem we have to solve when it comes to building a web crawler is, how do we retrieve web pages in such a fashion that we can parse them? In order to accomplish this we'll be utilizing the `urllib2` package which will enable us to send http `GET` requests to a `URL` of choice and return the `html` of that given page. We'll then be able to parse that `html` for the appropriate `a` tags and continue crawling those links.

> For more detail on the making requests check out [Fetching Web Pages in Python](/python/fetching-web-pages-python/).

Within our `crawler` project. Create a new `crawler` module:

~~~py
# module structure
- crawler/
- - crawler/
- - - __init__.py
- - - crawler.py
- main.py
~~~

We'll put the majority of our web-crawling logic within this `crawler` module.

