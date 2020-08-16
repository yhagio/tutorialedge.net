---
title: "Crafting Tcp Packets in Go"
date: 2020-02-23T09:24:05Z
draft: true
desc: In this tutorial, we are going to look at how you can craft and edit TCP and UDP packet headers using Go and why this is useful for penetration testing
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series:
- securityingo
image: golang.svg
weight: 2 
tags:
- security
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

In the previous tutorial in this series on security, we looked at how you could build a very simple port scanner in Go which would iterate across all of the ports on a given host and try to make either a `TCP` or a `UDP` connection to said ports. 

By the end of this tutorial, we will have covered:

* The technique of packet crafting and how security engineers use this technique to try and elicit responses from services in their tests.
* How we can build our own simple TCP and UDP packet headers and payloads using the Go standard library
* How we can extend the application from [part 1](/projects/building-security-tools-in-go/building-port-scanner-go/) of the series to include a `packet` package which can do these tasks for us! 

Awesome, with that in mind, let's dive into the theory!

## Packet Manipulation and Sniffing

Security engineers often use this technique of packet manipulation and sniffing in order to try and gain as much information from a system as possible. This is all part of the **recon** stage of a penetration test where we probe services running on various ports with pre-crafted packets which should elicit responses.


## Packet Crafting and Editing



## Defining Packets and Payloads in Go

In order to do our packet creation and editing, we'll be using the `github.com/google/gopacket` package which effectively wraps around the C-based `libpcap`. 

<div class="filename"> main.go </div>

```go
package main

import "fmt"

func main() {
    fmt.Println("Packet Crafting in Go")
}
```

## Conclusion

That's all we are going to cover in this tutorial, hopefully you found it useful and educational! If you have any comments or any suggestions for new topics then please let me know in the comments section below!

### Further Reading:

If you enjoyed this tutorial, then you may also enjoy some of these other tutorials on the site:

* [Building a REST API in Go]()