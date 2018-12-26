---
author: Elliot Forbes
date: 2018-09-10T20:04:14+01:00
desc: In this tutorial, we are going to look at how you can use mutexes in your Go
  programs
series: golang
image: golang.png
tags:
- advanced
title: Go Oauth2 Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 30
---

Welcome fellow coders! In this tutorial, we are going to be taking a look at how you can implement your own OAuth2 Server and client using the [go-oauth2/oauth2](https://github.com/go-oauth2/oauth2) package.

This is without a doubt one of the most requested topics from commentors on my YouTube videos and it's certainly something that I myself find incredibly interesting. 

Security is without doubt a very important feature for any public and even private facing service or API and it's something that you need to pay a lot of attention to in order to get it right. 

# The Theory

So, before we dive into how we can code this up, it's important to know how it works in the background. Typically, we have a `client` that will start by making an authorization request to the `resource owner`. The `resource owner` then either grants or denies this request. 

With this `authorization grant` the `client` then passes this to the `authorization server` which will grant back an `access token`. It is with this granted `access token` that our `client` can then access a protected resource such as an API or a service.

So, with that said, let's now look at how we can implement our own `authorization server` using this go-oauth2/oauth2 package.

> **Note -** If you are interested in seeing the RFC that Oauth2 implementations follow, you can find it here: [RFC-6749](https://tools.ietf.org/html/rfc6749)

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
	"net/url"
	"os"

	"github.com/go-session/session"
	"gopkg.in/oauth2.v3/errors"
	"gopkg.in/oauth2.v3/manage"
	"gopkg.in/oauth2.v3/models"
	"gopkg.in/oauth2.v3/server"
	"gopkg.in/oauth2.v3/store"
)

func main() {
	manager := manage.NewDefaultManager()
	// token store
	manager.MustTokenStorage(store.NewMemoryTokenStore())

	clientStore := store.NewClientStore()
	clientStore.Set("222222", &models.Client{
		ID:     "222222",
		Secret: "22222222",
		Domain: "http://localhost:9094",
	})
	manager.MapClientStorage(clientStore)

	srv := server.NewServer(server.NewConfig(), manager)
	srv.SetUserAuthorizationHandler(userAuthorizeHandler)

	srv.SetInternalErrorHandler(func(err error) (re *errors.Response) {
		log.Println("Internal Error:", err.Error())
		return
	})

	srv.SetResponseErrorHandler(func(re *errors.Response) {
		log.Println("Response Error:", re.Error.Error())
	})

	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/auth", authHandler)

	http.HandleFunc("/authorize", func(w http.ResponseWriter, r *http.Request) {
		err := srv.HandleAuthorizeRequest(w, r)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}
	})

	http.HandleFunc("/token", func(w http.ResponseWriter, r *http.Request) {
		err := srv.HandleTokenRequest(w, r)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	})

	log.Println("Server is running at 9096 port.")
	log.Fatal(http.ListenAndServe(":9096", nil))
}

func userAuthorizeHandler(w http.ResponseWriter, r *http.Request) (userID string, err error) {
	store, err := session.Start(nil, w, r)
	if err != nil {
		return
	}

	uid, ok := store.Get("UserID")
	if !ok {
		if r.Form == nil {
			r.ParseForm()
		}
		store.Set("ReturnUri", r.Form)
		store.Save()

		w.Header().Set("Location", "/login")
		w.WriteHeader(http.StatusFound)
		return
	}
	userID = uid.(string)
	store.Delete("UserID")
	store.Save()
	return
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	store, err := session.Start(nil, w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if r.Method == "POST" {
		store.Set("LoggedInUserID", "000000")
		store.Save()

		w.Header().Set("Location", "/auth")
		w.WriteHeader(http.StatusFound)
		return
	}
	outputHTML(w, r, "static/login.html")
}

func authHandler(w http.ResponseWriter, r *http.Request) {
	store, err := session.Start(nil, w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if _, ok := store.Get("LoggedInUserID"); !ok {
		w.Header().Set("Location", "/login")
		w.WriteHeader(http.StatusFound)
		return
	}

	if r.Method == "POST" {
		var form url.Values
		if v, ok := store.Get("ReturnUri"); ok {
			form = v.(url.Values)
		}
		u := new(url.URL)
		u.Path = "/authorize"
		u.RawQuery = form.Encode()
		w.Header().Set("Location", u.String())
		w.WriteHeader(http.StatusFound)
		store.Delete("Form")

		if v, ok := store.Get("LoggedInUserID"); ok {
			store.Set("UserID", v)
		}
		store.Save()

		return
	}
	outputHTML(w, r, "static/auth.html")
}

func outputHTML(w http.ResponseWriter, req *http.Request, filename string) {
	file, err := os.Open(filename)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	defer file.Close()
	fi, _ := file.Stat()
	http.ServeContent(w, req, file.Name(), fi.ModTime(), file)
}

```

# Our Client

Now that we have our server implementation done and dusted, we can focus on building up our client. This will use the `golang.org/x/oauth2` standard package for authenticating.

We'll be defining a really simple server using `net/http` which features 2 endpoints:

* `/` - The root or homepage of our client
* `/oauth2` - The route which successfully authenticated clients will be automatically redirected to.

We'll start by defining our `oauth2.Config{}` object which will contain our `ClientID` or `ClientSecret`. Our OAuth2 server implementation already has a note of these two variables and should they not match, we won't be able to retrieve access tokens from our server.

It'll also take in a string of `Scopes` which define the scope of our access token, these scopes can define various different levels of access to a given resource. For example, we could provide define a `Read-Only` scope which just provides the client read-only access to our underlying resource.

Next, we define the `RedirectURL` which specifies an endpoint that our Authorization server should redirect to upon successful authentication. We'll want this handled by our `/oauth2` endpoint.

Finally, we specify `oauth2.Endpoint` which takes in the `AuthURL` and `TokenURL` that will point towards our authorization and token endpoints that we defined previously on our server.

```go
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"golang.org/x/oauth2"
)

var (
	config = oauth2.Config{
		ClientID:     "222222",
		ClientSecret: "22222222",
		Scopes:       []string{"all"},
		RedirectURL:  "http://localhost:9094/oauth2",
		// This points to our Authorization Server
		// if our Client ID and Client Secret are valid
		// it will attempt to authorize our user
		Endpoint: oauth2.Endpoint{
			AuthURL:  "http://localhost:9096/authorize",
			TokenURL: "http://localhost:9096/token",
		},
	}
)

// Homepage
func HomePage(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Homepage Hit!")
	u := config.AuthCodeURL("xyz")
	http.Redirect(w, r, u, http.StatusFound)
}

// Authorize
func Authorize(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	state := r.Form.Get("state")
	if state != "xyz" {
		http.Error(w, "State invalid", http.StatusBadRequest)
		return
	}

	code := r.Form.Get("code")
	if code == "" {
		http.Error(w, "Code not found", http.StatusBadRequest)
		return
	}

	token, err := config.Exchange(context.Background(), code)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	
	e := json.NewEncoder(w)
	e.SetIndent("", "  ")
	e.Encode(*token)
}

func main() {

	// 1 - We attempt to hit our Homepage route
	// if we attempt to hit this unauthenticated, it
	// will automatically redirect to our Auth
	// server and prompt for login credentials
	http.HandleFunc("/", HomePage)

	// 2 - This displays our state, code and
	// token and expiry time that we get back
	// from our Authorization server
	http.HandleFunc("/oauth2", Authorize)

	// 3 - We start up our Client on port 9094
	log.Println("Client is running at 9094 port.")
	log.Fatal(http.ListenAndServe(":9094", nil))
}
```

So, we've managed to build up our client. Let's try and run this and see what happens. 

```
go run main.go
2018/10/20 13:25:22 Client is running at 9094 port.
```

Now, whenever you hit `localhost:9094` within your browser, you should see it automatically redirect to your running server implementation, `localhost:9096/login`. We'll then provide our credentials `admin` and `admin` for demonstration purposes, and this will prompt us to grant access to our client.

When we click `Allow` it will automatically redirect us back to our Client application `/oauth2` endpoint, but it will return a JSON string containing our `access_token`, `refresh_token`, `token_type` and when our tokens will expire.

Awesome, we have a fully working Oauth2 flow implemented.

# Conclusion

So, in this tutorial, we looked at how you could implement your own `authorization server` in Go. We then looked at how we could build a simple Go-based client that could subsequently make requests for `access tokens` to this server. 

Hopefully, you found this tutorial useful! If you did then please feel free to let me know in the comments section below!