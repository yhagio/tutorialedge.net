---
author: Elliot Forbes
date: 2018-09-10T20:04:14+01:00
desc: In this tutorial, we are going to look at how you can use mutexes in your Go
  programs
series:
- golang
tags:
- advanced
title: Go Oauth2 Tutorial
twitter: https://twitter.com/Elliot_F
weight: 30
draft: true
---

Welcome fellow coders! In this tutorial, we are going to be taking a look at how you can implement your own OAuth2 Server and client using the [go-oauth2/oauth2](https://github.com/go-oauth2/oauth2) package.

This is without a doubt one of the most requested topics from commentors on my YouTube videos and it's certainly something that I myself find incredibly interesting. 

Security is without doubt a very important feature for any public and even private facing service or API and it's something that you need to pay a lot of attention to in order to get it right. 

# The Theory

So, before we dive into how we can code this up, it's important to know how it works in the background. Typically, we have a `client` that will start by making an authorization request to the `resource owner`. The `resource owner` then either grants or denies this request. 

With this `authorization grant` the `client` then passes this to the `authorization server` which will grant back an `access token`. It is with this granted `access token` that our `client` can then access a protected resource such as an API or a service.

So, with that said, let's now look at how we can implement our own `authorization server` using this go-oauth2/oauth2 package.

> If you are interested in seeing the RFC that Oauth2 implementations follow, you can find it here: [RFC-6749](https://tools.ietf.org/html/rfc6749)

# A Simple Oauth2 Flow

We'll start off by implementing a really simple server based on the example that they provide within their documentation. When we pass an `client id` and a `client secret` to our `authorization server` it should return us with our `access token` that'll look something like this:

```js
{"access_token":"Z_1QUVC5M_EOCESISKW8AQ","expires_in":7200,"scope":"read","token_type":"Bearer"}
```

So, let's dive into our server implementation and see if we can decipher what's going on:

```go
package main

import (
	"log"
	"net/http"

	"gopkg.in/oauth2.v3/errors"
	"gopkg.in/oauth2.v3/manage"
	"gopkg.in/oauth2.v3/models"
	"gopkg.in/oauth2.v3/server"
	"gopkg.in/oauth2.v3/store"
)

func main() {
	manager := manage.NewDefaultManager()
	// token memory store
	manager.MustTokenStorage(store.NewMemoryTokenStore())

	// client memory store
	clientStore := store.NewClientStore()
	clientStore.Set("000000", &models.Client{
		ID:     "000000",
		Secret: "999999",
		Domain: "http://localhost",
	})
	manager.MapClientStorage(clientStore)

	srv := server.NewDefaultServer(manager)
	srv.SetAllowGetAccessRequest(true)
	srv.SetClientInfoHandler(server.ClientFormHandler)

	srv.SetInternalErrorHandler(func(err error) (re *errors.Response) {
		log.Println("Internal Error:", err.Error())
		return
	})

	srv.SetResponseErrorHandler(func(re *errors.Response) {
		log.Println("Response Error:", re.Error.Error())
	})

	http.HandleFunc("/authorize", func(w http.ResponseWriter, r *http.Request) {
		err := srv.HandleAuthorizeRequest(w, r)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}
	})

	http.HandleFunc("/token", func(w http.ResponseWriter, r *http.Request) {
		srv.HandleTokenRequest(w, r)
	})

	log.Fatal(http.ListenAndServe(":9096", nil))
}
```

# Our Client

# Conclusion

So, in this tutorial, we looked at how you could implement your own `authorization server` in Go. We then looked at how we could build a simple Go-based client that could subsequently make requests for `access tokens` to this server. 

Hopefully, you found this tutorial useful! If you did then please feel free to let me know in the comments section below!