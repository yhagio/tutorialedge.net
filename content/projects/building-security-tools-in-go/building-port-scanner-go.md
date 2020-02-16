---
title: "Security in Go - Building a Port Scanner in Go"
date: 2020-02-15T15:06:51Z
desc: In the first tutorial in this security series, we are going to be looking at how you can build a dynamic port scanner in Go!
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: 
- securityingo
image: golang.svg
tags:
- security
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

Welcome to the first tutorial in this new series on building security tools in Go! In this tutorial, we are going to be building a very cool port scanner which you will be able to point at a server and probe for any potential vulnerabilities.

This will give us a good understanding of what Port Scanning is and why we should be aware of what ports we are leaving open on any of the machines that we run our applications on top of.

# What is Port Scanning?

Port scanning is the act of iterating over every port on a machine and checking to see which ones are `Open`, `Closed`, or `Filtered`.  

In total there are just over **130,000 ports** on a typical machine, **65535 of which are `TCP`** and the **other 65535 which are `UDP` ports**. Each of these ports could effectively be a way in to your system if left open and port scanning allows security engineers see if there are any potential ways to gain access to your system from un-patched software.

## Why Should We Care?

This is one of the biggest offenders when it comes to identifying how a security breach has occurred. These security breaches can be caused by a combination of leaving ports open and not updating the services running behind those ports regularly enough. 

There are a number of different ways we can protect ourselves from these security issues however. The simple act of running services in a segregated network zone such as in an AWS private VPC can greatly improve the security posture of your application as it means that only machines within that VPC can communicate with your server. 

With this in mind, let's jump in to the code and see how we can implement our own, simple port scanning tool in Go which can help us to better evaluate the systems that we develop and deploy for any security vulnerabilities.

# Scanning a Port in Go

Let's take a look at how we would implement a simple port scan function in Go using the `net` package.

We'll start by creating a `scanPort` function which will take in a `protocol`, `hostname` and a `port` and return a boolean determining whether or not that particular `port` has been left open:

<div class="filename"> main.go </div>

```go
package main

import (
	"fmt"
	"net"
	"strconv"
	"time"
)

func scanPort(protocol, hostname string, port int) bool {
	address := hostname + ":" + strconv.Itoa(port)
	conn, err := net.DialTimeout(protocol, address, 60*time.Second)

	if err != nil {
		return false
	}
	defer conn.Close()
	return true
}

func main() {
	fmt.Println("Port Scanning")
	open := scanPort("tcp", "localhost", 1313)
	fmt.Printf("Port Open: %t\n", open)
}

```

Now currently I am running my site which is a **hugo server** on port 1313, so when I run this, I should expect to see this port open and accepting incoming requests but let's test that theory out:

<div class="filename"> go run main.go </div>

```output
Port Scanning
Port Open: true
```

If we try against one of the lower ports within the **1-1024** port range on our machine, we should see that it returns `false` as these are typically locked down by default or assigned to services that do not accept connections on these ports.

# First Scan - Lower Port Ranges

The lower end of the port range from 1-1024 are well known ports that have been pre-allocated to various services such as HTTP - `Port 80`, SSH - `Port 22` or FTP - `Port 21` to name just a few. 

Let's expand upon our incredibly simple port scanning app above and extend it to iterate over the lower 1024 ports to try and find an open TCP connection.

We'll first want to initialize this project using the `go mod init` command and pass in a repository name. For the purpose of this tutorial, I've created a github repo: [elliotforbes/athena](https://github.com/elliotforbes/athena) which I've subsequently initialized this Go project against:

```output
$ go mod init github.com/elliotforbes/athena
```

Let's start by creating a new folder called `port/` and within that we'll create a new `.go` file called `port.go`. We'll move the `ScanPort` function from our `main.go` file above into this new file and capitalize the function so that we can access it from outside the package.

We'll also be creating a `ScanResult` struct which will feature the `port` and the state which will be of type `string`:

<div class="filename"> port/port.go </div>

```go
package port

import (
	"net"
	"strconv"
	"time"
)

type ScanResult struct {
	Port  int
	State string
}

func ScanPort(protocol, hostname string, port int) ScanResult {
	result := ScanResult{Port: port}
	address := hostname + ":" + strconv.Itoa(port)
	conn, err := net.DialTimeout(protocol, address, 60*time.Second)

	if err != nil {
		result.State = "Closed"
		return result
	}
	defer conn.Close()
	result.State = "Open"
	return result
}

func InitialScan(hostname string) []ScanResult {

	var results []ScanResult

	for i := 0; i <= 1024; i++ {
		results = append(results, ScanPort("tcp", hostname, i))
	}

	return results
}

```

Let's update our `main.go` file so that it imports our newly created `port` package and call the newly defined `InitialScan` function which will iterate through all the **lower 1024 ports** on a host and try and to open a TCP connection on those ports:

<div class="filename"> main.go </div>

```go
package main

import (
	"fmt"

	"github.com/elliotforbes/athena/port"
)

func main() {
	fmt.Println("Port Scanning")
	results := port.InitialScan("localhost")
	fmt.Println(results)
}
```

Now, when we run this, we should see that our program goes away and tries to open a TCP connection with the bottom 1024 ports on our `localhost` machine. 

Hopefully, if you are running this against your local machine, you should see that no ports are currently in an `Open` state. 

# Running UDP Scans

Now that we have a means of scanning ports within our `ScanPort` function, we can now easily extend our port scanning application to also scan the lower `UDP` ports by adding an additional loop in our `InitialScan` function like so:

<div class="filename"> port/port.go </div>

```go
package port

import (
	"net"
	"strconv"
	"time"
)

type ScanResult struct {
	Port    string
	State   string
	Service string
}

func ScanPort(protocol, hostname string, port int) ScanResult {
	result := ScanResult{Port: strconv.Itoa(port) + string("/") + protocol}
	address := hostname + ":" + strconv.Itoa(port)
	conn, err := net.DialTimeout(protocol, address, 60*time.Second)

	if err != nil {
		result.State = "Closed"
		return result
	}
	defer conn.Close()
	result.State = "Open"
	return result
}

func InitialScan(hostname string) []ScanResult {

	var results []ScanResult

	for i := 0; i <= 1024; i++ {
		results = append(results, ScanPort("udp", hostname, i))
	}

	for i := 0; i <= 1024; i++ {
		results = append(results, ScanPort("tcp", hostname, i))
	}

	return results
}
```

We've also made some slight changes to our `ScanResult` struct and changed the `Port` to have a type of string so that we can store the `port/protocol` easily like so: `80/tcp`.

Now, when we run this, our port-scanner will run through the bottom 1024 and scan both `TCP` and `UDP` ports and output the results!

# Types of Port Scan

In the above example we are looking exclusively at how to do a TCP Connect port scan over a machine. This is fine for getting started, however you should note that this can sometimes tip off a security system that a potential hack is underway. 

When implementing a more sophisticated port scanning tool, you should note that there are a number of other techniques which can also be employed which each have their own benefits and drawbacks. 

Some of the more common techniques are:

* **Ping Scan** - This sends a ping and listens for a response

* **TCP Half-Open** - Also known as `SYN` scan, these scans attempt to start a TCP connection, listen for the `SYN-ACK` response and then never send the final `ACK`. 

* **TCP Open** - This is just attempting to open a TCP connection on a host:port like we have done above

* **UDP** - Very similar to TCP scanning except using the UDP protocol.

* **Stealth Scanning** - A far more sophisticated type of scan which has been designed so that these scans don't show up in connection logs.

> **Challenge** - Have a look at the [https://github.com/tatsushid/go-fastping](https://github.com/tatsushid/go-fastping) and import it into your project. Extend the `port` package to include the functionality to run an ICMP port scan in a new function.

# Wider Port Scans

We've looked at how to do an initial scan which covers the first 1024 ports on a machine for both UDP and TCP. However, if there are no obvious services which have been left open on these ports then the next step is typically to widen the scan to the first 49151 ports which are the list of registered ports. 

**The reason we don't just scan all 65535 ports straight from the get-go** is that port-scanning typically takes a long time to do, building it up with different levels of scan can help reduce the time it takes to penetrate into a system.

Now, we are going to extend our `athena` project so that it performs a wider scan by creating a `WideScan` function within our `port` package:

<div class="filename"> port/port.go </div>

```go
package port

import (
	"net"
	"strconv"
	"time"
)

type ScanResult struct {
	Port    string
	State   string
	Service string
}

func ScanPort(protocol, hostname string, port int) ScanResult {
	result := ScanResult{Port: strconv.Itoa(port) + string("/") + protocol}
	address := hostname + ":" + strconv.Itoa(port)
	conn, err := net.DialTimeout(protocol, address, 60*time.Second)

	if err != nil {
		result.State = "Closed"
		return result
	}
	defer conn.Close()
	result.State = "Open"
	return result
}

func InitialScan(hostname string) []ScanResult {

	var results []ScanResult

	for i := 0; i <= 1024; i++ {
		results = append(results, ScanPort("udp", hostname, i))
	}

	for i := 0; i <= 1024; i++ {
		results = append(results, ScanPort("tcp", hostname, i))
	}

	return results
}

func WideScan(hostname string) []ScanResult {
	var results []ScanResult

	for i := 0; i <= 49152; i++ {
		results = append(results, ScanPort("udp", hostname, i))
	}

	for i := 0; i <= 49152; i++ {
		results = append(results, ScanPort("tcp", hostname, i))
	}

	return results
}

```

With this new `WideScan` function now in place, we can extend our `main` function to call this exported function from the `port` package like so:

<div class="filename"> main.go </div>

```go
package main

import (
	"fmt"

	"github.com/elliotforbes/athena/port"
)

func main() {
	fmt.Println("Port Scanning")
	results := port.InitialScan("localhost")
	fmt.Println(results)

	widescanresults := port.WideScan("localhost")
	fmt.Println(widescanresults)

}

```

Try running this now and see how long it takes to run, even on my high-powered Macbook Pro connecting to `localhost` it takes quite a long time to complete. If we were targetting a server in a different country or continent then we would also have to account for network latency which would massively increase the amount of time this scan would take to run.

# Improving the Performance with goroutines

Currently we have a synchronous system that will loop through all the ports one after the other and check to see if they are open. However, we can massively improve the performance of our system by introducing `goroutines` and making our port scans execute concurrently. 

> **Challenge** - Improve the performance using `goroutines`, a `sync.Mutex` and `sync.WaitGroup` so that the system performs these scans in parallel.
>  
>  
> * [Go Goroutines Tutorial](/golang/concurrency-with-golang-goroutines/)
>
> * [Go Mutex Tutorial](/golang/go-mutex-tutorial/)
>
> * [Go WaitGroup Tutorial](/golang/go-waitgroup-tutorial/)

# Conclusion

So, in this tutorial, we have looked at the technique of port scanning and how it can be used to probe various servers for potential vulnerabilities. With this newfound understanding of this technique, we then put theory into practice and built an incredibly cool Go-based port scanner which we can use in our own day-to-day security tests!

Hopefully you found this tutorial useful! If you enjoyed this, or you have any feedback, then I would love to hear your thoughts in the comments section below!
