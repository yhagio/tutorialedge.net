---
author: Elliot Forbes
date: 2017-09-10T12:27:56+01:00
desc: In this tutorial we look at how we can make HTTP requests in Python using the
  Requests package.
series: python
image: python-logo.png
tags:
- http
- rest
title: Making HTTP Requests in Python - Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> This Tutorial was built using Python 3.6 and the [Requests](http://docs.python-requests.org/en/master/) library

Being able to interact with `HTTP` based RESTful APIs is an incredibly important task for any Python developer. More and more developers are starting to build their systems our of numerous microservices and often they will expose `HTTP` based endpoints with which we can interact in our own Python programs. In this tutorial we'll look at the various ways we can interact with a `HTTP` based API using the [Requests](http://docs.python-requests.org/en/master/) library in Python.

> If you want to know more about RESTful APIs then check out my article on [What is a REST API?](/general/what-is-a-rest-api/)

# Installing the requests library

Before we can get started with the `requests` library we'll have to install it. This can be done using `pip` like so:

```py
pip install requests
```

# Making GET Requests

As a means of example we'll be using the `pokeapi` that DigitalOcean have kindly put up for educational purposes. You can find the full link to the official pokeapi here: [DigitalOcean - Pokeapi](https://pokeapi.co/).

To get us started we'll try and request `http://pokeapi.co/api/v2/pokemon/1/`. If you open this up in the browser you should see that it returns a `json` response filled with all the information you could possibly want on the `bulbasaur` pokemon. But how do we do this using the Python `requests` library? 

Open up a new Python file and add the following code:

```py
import requests

def main():
    # we define a request object that is equal to requests.get('API')
    req = requests.get('http://pokeapi.co/api/v2/pokemon/1/')
    # we then print out the http status_code that was returned on making this request
    # you should see a successfull '200' code being returned.
    print(req.status_code)

if __name__ == '__main__':
    main()
```

When you run this you should hopefully see the following output:

```py
 $ python3.6 main.py
200
```

The `200` indicates a successful `HTTP` request. We can then start to do other things such as printing out the body of the `HTTP` response which would hold the same `JSON` that was outputted in the browser when we navigated to the same url. Let's expand our program to extract our pokemon's name and the `HTTP` headers that were returned:

```py
import requests
import json

def main():
    req = requests.get('http://pokeapi.co/api/v2/pokemon/1/')
    print("HTTP Status Code: " + str(req.status_code))
    print(req.headers)
    json_response = json.loads(req.content)
    print("Pokemon Name: " + json_response['name'])

if __name__ == '__main__':
    main()
```

When you run this you should then see something like so output:

```py
 $ python3.6 main.py
HTTP Status Code: 200
{'Date': 'Sun, 10 Sep 2017 11:57:10 GMT', 'Content-Type': 'application/json', 'Transfer-Encoding': 'chunked', 'Connection': 'keep-alive', 'Set-Cookie': '__cfduid=d6fed90089a596b94eaad6b530d584ffa1505044630; expires=Mon, 10-Sep-18 11:57:10 GMT; path=/; domain=.pokeapi.co; HttpOnly', 'Vary': 'Accept-Encoding, Cookie', 'X-Frame-Options': 'SAMEORIGIN', 'Allow': 'GET, HEAD, OPTIONS', 'X-XSS-Protection': '1; mode=block', 'Content-Encoding': 'gzip', 'Server': 'cloudflare-nginx', 'CF-RAY': '39c2354985bc6b8b-LHR'}
Pokemon Name: bulbasaur
```

# Making POST Requests

The requests library features methods for all of the `HTTP` verbs currently in use. If you wanted to make a simple `POST` request to an API endpoint then you can do that like so:

```py
req = requests.post('http://api/user', data=None, json=None)
``` 

This would work in exactly the same fashion as our previous `GET` request, however it features 2 additional keyword parameters:

* `data` which can be populated with say a dictionary, a file or bytes that will be passed in the `HTTP` body of our `POST` request.  
* `json` which can be populated with a json object that will be passed in the body of our `HTTP` request also.





