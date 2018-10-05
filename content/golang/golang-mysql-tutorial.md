---
author: Elliot Forbes
date: 2017-04-09T21:28:15+01:00
desc: In this tutorial I'll be demonstrating how we can work with MySQL databases
  using Go.
series:
- golang
tags:
- intermediate
weight: 21
title: Golang MySQL Tutorial
twitter: https://twitter.com/Elliot_F
---

> In this tutorial I’ll be demonstrating how you can connect to a MySQL database and perform basic SQL statements using Go.

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:42.76%"><iframe src="https://www.youtube.com/embed/DWNozbk_fuk?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="842" height="360" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

# Text Tutorial

In order to do this we’ll be using <a href=”https://github.com/go-sql-driver/mysql”>https://github.com/go-sql-driver/mysql</a> as our MySQL driver. Go-SQL-Driver is a lightweight and fast MySQL driver that supports connections over TCP/IPv4, TCP/IPv6, Unix domain sockets or custom protocols and features automatic handling of broken connections.

> Github Repo: **[go-sql-driver/mysql](https://github.com/go-sql-driver/mysql)**

# Implementation

We’ll begin by connecting to a database we’ve set up on our local machine and then go on to perform some basic insert and select statements.

## Connecting to a MySQL database

```go
package main

import (
    "fmt"
    "database/sql"
    _ "github.com/go-sql-driver/mysql"
)

func main() {
    fmt.Println("Go MySQL Tutorial")
    
    // Open up our database connection.
    // I've set up a database on my local machine using phpmyadmin.
    // The database is called testDb
    db, err := sql.Open("mysql", "username:password@tcp(127.0.0.1:3306)/test")
    
    // if there is an error opening the connection, handle it
    if err != nil {
        panic(err.Error())
    }
    
    // defer the close till after the main function has finished
    // executing 
    defer db.Close()
    
}
```

## Performing Basic SQL Commands

`db.Query(sql)` allows us to perform any SQL command we so desire. Simply construct the string and pass it in as a parameter.

```go
package main

import (
    "fmt"
    "database/sql"
    _ "github.com/go-sql-driver/mysql"
)

func main() {
    fmt.Println("Go MySQL Tutorial")
    
    // Open up our database connection.
    // I've set up a database on my local machine using phpmyadmin.
    // The database is called testDb
    db, err := sql.Open("mysql", "root:password1@tcp(127.0.0.1:3306)/test")
    
    // if there is an error opening the connection, handle it
    if err != nil {
        panic(err.Error())
    }
    
    // defer the close till after the main function has finished
    // executing 
    defer db.Close()
    
    // perform a db.Query insert 
    insert, err := db.Query("INSERT INTO test VALUES ( 2, 'TEST' )")
    
    // if there is an error inserting, handle it
    if err != nil {
        panic(err.Error())
    }
    // be careful deferring Queries if you are using transactions
    defer insert.Close()
    
    
}
```

# Populating Structs from Results

Retrieving a set of results from the database is all well and good, but we need to be able to read these results or populating existing `structs` so that we can parse them and modify them easily. In order to parse a number of rows we can use the `.Scan(args...)` method which takes in any number of arguments and allows us to populate a composite object.

```go
/*
 * Tag... - a very simple struct
 */
type Tag struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
```

```go
func main() {
	// Open up our database connection.
	db, err := sql.Open("mysql", "root:pass1@tcp(127.0.0.1:3306)/tuts")

	// if there is an error opening the connection, handle it
	if err != nil {
		log.Print(err.Error())
	}
	defer db.Close()

	// Execute the query
	results, err := db.Query("SELECT id, name FROM tags")
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}

	for results.Next() {
		var tag Tag
		// for each row, scan the result into our tag composite object
		err = results.Scan(&tag.ID, &tag.Name)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}
                // and then print out the tag's Name attribute
		log.Printf(tag.Name)
	}

}
```

In this example we retrieved 2 columns from the tags database and then used .Scan to populate our tag object. 

> Note that if you retrieve 3 fields from the database and Scan only has 2 parameters, it will fail. They need to match up exactly.

# Querying a Single Row

Say we wanted to query a single row this time and had an ID and again wanted to populate our struct. We could do that like so:

```go
var tag Tag
// Execute the query
err = db.QueryRow("SELECT id, name FROM tags where id = ?", 2).Scan(&tag.ID, &tag.Name)
if err != nil {
	panic(err.Error()) // proper error handling instead of panic in your app
}

log.Println(tag.ID)
log.Println(tag.Name)
```

# Conclusion

If you found this tutorial helpful or require more assistance then please don't hesitate to let me know in the comments section below:

> Recommended Reading: [Creating a RESTful JSON api with Go](/golang/creating-restful-api-with-golang/)