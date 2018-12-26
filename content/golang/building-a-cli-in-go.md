---
author: Elliot Forbes
date: 2018-07-29T09:41:15+01:00
desc: In this tutorial, we are going to be building a very simple Command Line Interface
  or CLI in Go
series: golang
image: golang.png
tags:
- intermediate
title: Building a Network Command Line Interface in Go
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 18
---

In this article, we are going to be building a very simple Command Line Interface in Go using the `urfave/cli` package available on Github here: [https://github.com/urfave/cli](https://github.com/urfave/cli). 

I've been doing one or two domain migrations across various hosting providers recently and thought it would be a cool idea to build a tool or program that could be used to query things like the Nameservers of a website, the CNAMEs, the IP addresses and so on. 

The overall aim of this particular tutorial is to give you an idea as to how you can build your own CLIs that could do a wide variety of other things such as network monitoring, image manipulation and so on. 

> **Note -** The full code for this tutorial can be found here: [TutorialEdge/Go/go-cli-tutorial](https://github.com/TutorialEdge/Go/tree/master/go-cli-tutorial)

# Popular Projects

Golang is growing massively in popularity and we have seen large enterprise companies such as Hashicorp adopt the language for quite a number of different tools and systems. And for good reason, the design of Go lends itself incredibly well to these styles of application and the ability to cross-compile a binary executable for all major platforms easily is a massive win.

# Video Tutorial

If you prefer learning through the medium of video, then feel free to check out this tutorial here:

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/i2p0Snwk4gc?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="640" height="360" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

# Getting Started

Let's create a new directory on our computer called `go-cli/` or something along those lines. We'll be creating a directory structure that will look like this for our project:

```s
go-cli/
- pkg/
- cmd/my-cli/
- vendor/
- README.md
- ...
```

> **Note -** This structure follows the widely accepted [Go project layout](https://github.com/golang-standards/project-layout) guide available on Github. 

# Getting Into The Code

Now that we've got a basic project structure down, we can start to work on our application. First of all, we will need a new file called `cli.go` within our new `cmd/my-cli/` directory. We'll populate this with a very simple `Hello World` type of application and use this as the base from which we'll grow from.

```go
// cmd/my-cli/cli.go
package main

import (
  "fmt"
)

func main() {
  fmt.Println("Go CLI v0.01")
}
```

We can then attempt to run this from our project's root directory by typing:

```s
➜ go run cmd/my-cli/cli.go
Go CLI v0.01
```

Excellent, we've got the makings of our new CLI sorted, let's now look at how we can add a few commands and make it somewhat useful.

# Our First Command

As we'll be using the `urfave/cli` package we'll need to download this package locally in order to use it, we can do that through a simple `go get` command like so:

```s
$ go get github.com/urfave/cli
```

Now that we have the necessary package, let's update our `cli.go` file to use this package and create a new CLI application for us:

```go
// cmd/my-cli/cli.go
import (
  "log"
  "os"

  "github.com/urfave/cli"
)

func main() {
  err := cli.NewApp().Run(os.Args)
  if err != nil {
    log.Fatal(err)
  }
}
```

When we run this now, you'll see it fleshes out our programs response and adds things like the version, how we use the cli and the various commands we have at our disposal.

```s
➜  go run cmd/my-cli/cli.go
NAME:
   cli - A new cli application

USAGE:
   cli [global options] command [command options] [arguments...]

VERSION:
   0.0.0

COMMANDS:
     help, h  Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --help, -h     show help
   --version, -v  print the version
```

Awesome, this is very quickly starting to look like a more polished project and not just a minor side project!

We can now start adding our own `Commands`. Each of these commands will match up with one of our tests, so we'll have one command: `ns` which, when triggered and supplied with a `url` will go off and lookup the Name Servers of that particular host. 

Our final list of commands will look something like this:

* `ns` - will retrieve the name servers
* `cname` - will lookup the CNAME for a given host
* `mx` - will lookup the mail exchange records for a given host
* `ip` - will lookup the IP addresses for a given host.

Nice and simple, let's get started by creating our first command:

```go
package main

import (
	"fmt"
	"log"
	"net"
	"os"

	"github.com/urfave/cli"
)

func main() {
	app := cli.NewApp()
	app.Name = "Website Lookup CLI"
	app.Usage = "Let's you query IPs, CNAMEs, MX records and Name Servers!"

	// We'll be using the same flag for all our commands
	// so we'll define it up here
	myFlags := []cli.Flag{
		cli.StringFlag{
			Name:  "host",
			Value: "tutorialedge.net",
		},
	}

	// we create our commands
	app.Commands = []cli.Command{
		{
			Name:  "ns",
			Usage: "Looks Up the NameServers for a Particular Host",
			Flags: myFlags,
			// the action, or code that will be executed when
			// we execute our `ns` command
			Action: func(c *cli.Context) error {
				// a simple lookup function
				ns, err := net.LookupNS(c.String("url"))
				if err != nil {
					return err
				}
				// we log the results to our console
				// using a trusty fmt.Println statement
				for i := 0; i < len(ns); i++ {
					fmt.Println(ns[i].Host)
				}
				return nil
			},
		},
	}

	// start our application
	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}

```

We can then try to run this by typing: 

```s
$ go run cmd/my-cli/cli.go ns --url tutorialedge.net
```

This should then return the name servers for my site and print them out in the terminal. We can also do a run the help command which will show us exactly how to use our new command within our CLI. 

# Looking up IP Addresses

All of our command definitions will look really similar within our program, with the exception of how we go about printing out the results. The `net.LookupIP()` function returns a slice of IP addresses and as such we'll have to iterate over these in order to print them out in a nice fashion:

```go
{
	Name:  "ip",
	Usage: "Looks up the IP addresses for a particular host",
	Flags: myFlags,
	Action: func(c *cli.Context) error {
		ip, err := net.LookupIP(c.String("host"))
		if err != nil {
			fmt.Println(err)
		}
		for i := 0; i < len(ip); i++ {
			fmt.Println(ip[i])
		}
		return nil
	},
},
```

# Looking up our CNAME

We can then add our `cname` command which will use the `net.LookupCNAME()` function with our passed in host and return a single CNAME string which we can then print out:

```go
{
	Name:  "cname",
	Usage: "Looks up the CNAME for a particular host",
	Flags: myFlags,
	Action: func(c *cli.Context) error {
		cname, err := net.LookupCNAME(c.String("host"))
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(cname)
		return nil
	},
},
```

# Looking up MX Records

Finally, we want to be able to query the Mail Exchange records for our given host, we can do that by using the `net.LookupMX()` function and passing in our host. This will return a slice of mx records which, like our IPs, we'll have to iterate over in order to print out:

```go
{
	Name:  "mx",
	Usage: "Looks up the MX records for a particular host",
	Flags: myFlags,
	Action: func(c *cli.Context) error {
		mx, err := net.LookupMX(c.String("host"))
		if err != nil {
			fmt.Println(err)
		}
		for i := 0; i < len(mx); i++ {
			fmt.Println(mx[i].Host, mx[i].Pref)
		}
		return nil
	},
},
```


# Building our CLI

Now that we have a basic CLI up and running, it's time to build it so that we can use it in anger. 

```s
$ go build cmd/my-cli/cli.go
```

This should compile a `cli` executable which we can then run like so:

```s
$ ./cli help
NAME:
   Website Lookup CLI - Let's you query IPs, CNAMEs, MX records and Name Servers!

USAGE:
   cli [global options] command [command options] [arguments...]

VERSION:
   0.0.0

COMMANDS:
     ns       Looks Up the NameServers for a Particular Host
     cname    Looks up the CNAME for a particular host
     ip       Looks up the IP addresses for a particular host
     mx       Looks up the MX records for a particular host
     help, h  Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --help, -h     show help
   --version, -v  print the version
```

As you can see, all of our commands have been successfully listed in the COMMANDS section of the output. 

# Conclusion

So, in this tutorial we've managed to successfully build a really simple, yet effective CLI using the `urface/cli` package from Github. The CLI can be cross-compiled for any of the major operating systems with minimal fuss and it features all the functionality that you would expect from a production-grade command line interface.

> **Note -** If you want to keep up to date with the latest articles and updates on the site then please feel free to follow me on twitter: [@Elliot_f](https://twitter.com/elliot_f)