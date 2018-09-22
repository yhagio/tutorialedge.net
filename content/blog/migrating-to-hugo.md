---
author: Elliot Forbes
date: 2016-02-14T16:11:58+05:30
desc: A quick look at why I choose to migrate the site from a Laravel 5 based system
  to hugo
series:
- blog
tags:
- blog
title: Migrating to Hugo
twitter: https://twitter.com/Elliot_F
---

If you've frequented this site in the past you should hopefully have noticed a huge change to the way the site looks and hopefully the speed at which the site serves content. Over the past 2 weeks I've been working with a static site tool, similar to that of Jekyll, called Hugo.

## Reasons for the Migration

#### Ease

The first and biggest reason I'm moving to a github based site is due to the ease with which I can make changes. I was writing in markdown with the old system so the writing style isn't going to change and leveraging the power of github when it comes to revision history is fantastic.


#### Speed

Laravel 5 is a great framework, I really respect what Taylor has been able to do with it but unfortunately I don't have the time to custom build my own CMS anymore. Initially I went down that path in order to teach myself how to do it but my focus is shifting and I'd rather spend the time writing articles for the site than dealing with all the extra stuff.

When it comes to site performance, I'm hoping that the new static method will improve the speed at which my site is delivered. Afterall, nothing can really beat a simple get request to already created html and css. With hugo I perform all the processing that would have been done on every page request right at the time of deployment. 

I also no longer have to worry about managing a database and worrying about database performance. With Hugo, github essentially acts as the database and I don't have to worry about the latency for performing a lookup for a post.

#### Community

Moving to a public github based solution means that other people can actively contribute( should they wish) to the site and help make it one of the best online resources for technical tutorials. I've had multiple friends ask me if they could write and post things on it and with the current Laravel content management system, it would have been a complex process.



