---
author: Elliot Forbes
date: 2017-04-23T08:56:56+01:00
desc: This tutorial demonstrates how you can consume an already running RESTful API
  using Go
series: golang
image: golang.png
tags:
- intermediate
title: Consuming A RESTful API With Go
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 15
---

> **Note -** For a Tutorial on how to build a RESTful API in Go click [here](/golang/creating-restful-api-with-golang/)

In this tutorial, I'm going to be demonstrating how we can consume an already running RESTful API using go. There are currently hundreds upon thousands of open REST APIs out there that are just waiting to be consumed and turned into something more meaningful. Todd Motto has put together quite an active repo on Github that lists all the public APIs that are available for consumption by us and he's categorized them so that we can easily drill down to what we want to check out, you can find that [here](https://github.com/toddmotto/public-apis).

For the purpose of this tutorial though, I feel that we should use an already live API that we can easily test to see if it works in our browser. We'll be using the very popular [pokeapi](http://pokeapi.co/docsv2/) which is an API that exposes all the known information for everything Pokemon related. A bit silly I know but it's a fully fledged API that follows standard naming conventions and requires no authentication so there is no barrier to entry.

# Querying The API

To get us started we are going to query for all the Pokemon from the original series. We'll be hitting the `http://pokeapi.co/api/v2/pokedex/kanto/` API endpoint that returns this. If you navigate to this endpoint in your browser you should see a huge JSON string printing out, this is the response we'll be expecting when our go program performs a `GET` request on this endpoint. 

> **Note -** When you open a web page in a browser, you are performing a `GET` request for that page. 

# GET Request

So in order to mimic what we've just done in the browser in go, we'll have to write a program that looks like so:

```go
package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func main() {
	response, err := http.Get("http://pokeapi.co/api/v2/pokedex/kanto/")

	if err != nil {
		fmt.Print(err.Error())
		os.Exit(1)
	}
	
	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(responseData))

}
```

Within our `main` function we first query our API endpoint using `http.Get("http://pokeapi.co/api/v2/pokedex/kanto")`, we map the results of this into either `response` or `err` and then check to see if `err` is nil. If it is we exit.

Below this, we then perform the conversion of our response's body from bytes into something meaningful that can be printed out in the console. We first use `ioutil.ReadAll(response.Body)` to read in data from the incoming byte stream and then convert this `[]byte` response into a string using `string(responseData)` within our print statement.

If you run the above program you should see that it successfully performs a `GET` request on our API Endpoint and then prints all of our Pokemon out in the console.  

## Creating a Pokemon Struct

By knowing the structure of the JSON response that the above API endpoint gives us we can now map this into a series of `structs` that we can map our objects to. Below you'll see the condensed version of the JSON. Within our JSON response, we have a couple of `key-value` pairs, the first of which is the `name` of the region that the original Pokemon reside in. `region` gives us a link to the API for gaining more information on that particular region etc. 

The one we are interested most in is `pokemon_entries` which stores an array of all the Pokemon that we want. 

```js
{
  "name":"kanto",
  "region": {
    "url":"http:\/\/pokeapi.co\/api\/v2\/region\/1\/",
    "name":"kanto"
  },
  "version_groups":[ ... ]
  ],
  "is_main_series":true,
  "descriptions":[ ... ],
  "pokemon_entries":[
    {
      "entry_number": 1,
      "pokemon_species": {
        "url":"http:\/\/pokeapi.co\/api\/v2\/pokemon-species\/1\/",
        "name":"bulbasaur"
      }
    }
    ... 
  ]
}
```  

In Go we could map this out into 3 different structs, a `Response` struct that contains an array of Pokemon and a `Pokemon` struct to map these individual pokemon and a `PokemonSpecies` struct to access our Pokemon's name.

```go
// A Response struct to map the Entire Response
type Response struct {
	Name    string    `json:"name"`
	Pokemon []Pokemon `json:"pokemon_entries"`
}

// A Pokemon Struct to map every pokemon to.
type Pokemon struct {
	EntryNo int            `json:"entry_number"`
	Species PokemonSpecies `json:"pokemon_species"`
}

// A struct to map our Pokemon's Species which includes it's name
type PokemonSpecies struct {
	Name string `json:"name"`
}
```

## Unmarshalling our JSON 

Now that we've defined these structs, we can Unmarshal the returned JSON string into a new variable. We can do this in our `main` function by adding these three lines to below where we print out our `responseData`.

```go
var responseObject Response
json.Unmarshal(responseData, &responseObject)

fmt.Println(responseObject.Name)
fmt.Println(len(responseObject.Pokemon))
```

In the above code, we declare a new `responseObject` variable which is of type `Response`. We then unmarshal our `responseData` into this object and to test that it all works we print out our `responseObject.Name` which should equat to `kanto`. We then print out the length of our Pokemon array to see if it matches our expectations, if it prints out 151 then we know we've done it right and we can now iterate over these pokemon.

# Listing All Our Pokemon

In order to list all of our pokemon we need to create a for loop that loops for every object in our `responseObjects` Pokemon array like so:

```go
var responseObject Response
json.Unmarshal(responseData, &responseObject)

fmt.Println(responseObject.Name)
fmt.Println(len(responseObject.Pokemon))

for i := 0; i < len(responseObject.Pokemon); i++ {
  fmt.Println(responseObject.Pokemon[i].Species.Name)
}
```

Running this now you should see that every Pokemon's name is listed in your console.

# Full Source Code

```go
package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

// A Response struct to map the Entire Response
type Response struct {
	Name    string    `json:"name"`
	Pokemon []Pokemon `json:"pokemon_entries"`
}

// A Pokemon Struct to map every pokemon to.
type Pokemon struct {
	EntryNo int            `json:"entry_number"`
	Species PokemonSpecies `json:"pokemon_species"`
}

// A struct to map our Pokemon's Species which includes it's name
type PokemonSpecies struct {
	Name string `json:"name"`
}

func main() {
	response, err := http.Get("http://pokeapi.co/api/v2/pokedex/kanto/")
	if err != nil {
		fmt.Print(err.Error())
		os.Exit(1)
	}

	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}

	var responseObject Response
	json.Unmarshal(responseData, &responseObject)

	fmt.Println(responseObject.Name)
	fmt.Println(len(responseObject.Pokemon))

	for i := 0; i < len(responseObject.Pokemon); i++ {
		fmt.Println(responseObject.Pokemon[i].Species.Name)
	}

}
```



# Summary

In this tutorial, we've looked at how you can perform `GET` requests on `HTTP` endpoints and print out the plain text response of the response. We've then looked at how you can unmarshal the JSON response into struct objects that we can effectively work with as if they were normal objects.   

> **Note -** If you found this tutorial useful or require any further help then please let me know in the comments section below. If you think anything is missing then please feel free to make the changes yourself by submitting a pull request here: [tutorialedge-v2](https://github.com/elliotforbes/tutorialedge-v2)