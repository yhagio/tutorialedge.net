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

