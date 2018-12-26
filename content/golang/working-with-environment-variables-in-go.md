---
title: "Working With Environment Variables in Go"
date: 2018-12-04T16:15:42Z
desc: The definitive list of all the books you should buy if you want to master the
  art of programming Golang applications
series: golang
image: golang.png
tags:
- intermediate
author: Elliot Forbes
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

As we start to build ever more complex Go-based applications, we start to face challenges when it comes to safely introducing new features, or handling credentials for the likes of databases, or brokers. 

Using environment variables is an excellent way to simplify a number of different aspects such as handling credentials across various different environments, as well as simplifying the implementation of feature flags in your system.

In this tutorial, we will be covering:

* How you can effectively get and set environment variables within your Go applications
* How you can subsequently use environment variables as the basis for feature flags within your application.

# Handling Credentials

If you are writing distributed systems in Go, the best practice when it comes to configuration is to store it in the environment. 

This practice allows you to really easily deploy a version of your application to say, a development server that has the development database credentials already injected into it's environment.

Once you are happy with your development efforts, you can then deploy an identical copy of your application to a production server that features the production database credentials already injected into the environment with no additional fuss.

> **Note -** You can read up more about the 12 Factors you should adhere too when developing cloud native applications - [III. Config](https://12factor.net/config)

# Reading Environment Variables

With Go, we can read environment variables using the `os` package and by calling `os.Getenv()` passing in the string name of our environment variable.

Let's set an environment variable called `DATABASE_PASS` on our machine which we can then read in our application and use that to connect to a database should we wish.

```s
$ export DATABASE_PASS=unicorns
```

> **Note -** I'm using MacOS to write these tutorials, if you are on windows, you may have to use `set DATABASE_PASS=unicorns`

Next, let's write out Go program which will be able to read in this `DATABASE_PASS`:

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	fmt.Println("Reading Environment Variable")
	var databasePass string
	databasePass = os.Getenv("DATABASE_PASS")
	fmt.Printf("Database Password: %s\n", databasePass)
}
```

Now, when you run this, you should see the following output:

```s
$ go run main.go
Reading Environment Variable
Database Password: unicorns
```

Awesome, our application has been able to successfully pick up this environment variable and print it out using a simple call to `fmt.Printf`. 

# Setting Environment Variables

Go also has the ability to set environment variables should you so wish. We can do this by again leveraging the `os` package and calling `os.Setenv()`.

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	fmt.Println("Reading Environment Variable")
	var databasePass string
	databasePass = os.Getenv("DATABASE_PASS")
	fmt.Printf("Database Password: %s\n", databasePass)

	err := os.Setenv("DATABASE_PASS", "newunicorns")
	if err != nil {
		fmt.Println(err)
	}
	databasePass = os.Getenv("DATABASE_PASS")
	fmt.Printf("Database Password: %s\n", databasePass)
}

```

And, if we were to go ahead and run this, we should see that it picks up our environment variable changes:

```s
$ go run main.go
Reading Environment Variable
Database Password: unicorns
Database Password: newunicorns
```

> **Note -** If you happen to run this again, you should see that `unicorns` is again picked up as the original value of `DATABASE_PASS`. This is because a child process cannot change it's parent processes' environment variables. Any changes you make will only be made for your Go program.

# Feature Flags

One interesting use of environment variables within Go programs could be as `Feature Flags` or `Feature Toggles`. These feature flags essentially give us the flexibility in our deployments to switch off new features and revert to older features in the event of an issue.

> **Note -** If you haven't heard of feature flags before, I highly recommend checking out this article from Martin Fowler here: [Feature Flags/Toggles](https://martinfowler.com/articles/feature-toggles.html) 

Let's take for instance a simple REST API:

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	if os.Getenv("FEATURE_TOGGLE") == "TRUE" {
		fmt.Println(os.Getenv("FEATURE_TOGGLE"))
		fmt.Fprintf(w, "Exciting New Feature")
	} else {
		fmt.Println(os.Getenv("FEATURE_TOGGLE"))
		fmt.Fprintf(w, "existing boring feature")
	}
}

func handleRequests() {
	http.HandleFunc("/", homePage)
	log.Fatal(http.ListenAndServe(":8081", nil))
}

func main() {
	handleRequests()
}

```

We could start this application with our `FEATURE_TOGGLE` environment variable set to `TRUE` which would enable our "Exciting New Feature", however, should we notice an issue with this new feature after running it in production, we can kill the process and change the environment variable to `FALSE` before quickly restarting our application.

In a distributed system, this downtime should see our application instance being taken out of a load balancer group whilst it's down and then being re-added to the load balancer group when it is brought back up.

# Setup Of Environment Variables

In more complex applications, you may have tens, if not hundreds of different environment variables that need to be set prior to application startup. 

Now, there are a number of different techniques when it comes to managing these environment variables. This is something that has a "fuzzy" answer unfortunately, different organizations have different security criteria that mean some perfectly valid solutions aren't fit for them.

> **Note -** Securing your credentials is something that requires a lot of consideration and time to ensure you get it right. These are only suggestions, but the onus is on you to go and research the solution that is right for your team.

* **git-crypt** - [AGWA/git-crypt](https://github.com/AGWA/git-crypt) - Allows transparent encryption/decryption of files in a git repo, with this you can encrypt a bash file which sets up your config and decrypt it when you need to run it -
* **AWS SSM** - [https://aws.amazon.com/secrets-manager/](https://aws.amazon.com/secrets-manager/) - If you are working on AWS specific kit, this allows you to manage credentials through a service -
* **Within your CI/CD Tool** - [Example - https://travis-ci.org/](https://travis-ci.org/) - Inject your environment credentials once into their service and allow them to inject it into your build jobs automatically with the only manual stage happening 

These are just a few potential suggestions, hopefully they give you some indication as to how to handle this in a production environment in a secure fashion.

# Conclusion

So, in this tutorial, we have covered both reading and writing environment variables in Go, as well as using these environment variables to implement feature flags, or feature toggles within your application.

Hopefully, you have found this article worthwhile, if you have any comments or suggestions, I'd love to hear them in the comments/suggestions section below!

> **Note -** If you want to keep up to date with new articles, then please feel free to follow me on twitter: [@Elliot_f](https://twitter.com/elliot_f).