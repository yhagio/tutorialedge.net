---
author: Elliot Forbes
date: 2017-04-15T08:44:00+01:00
desc:
  In this tutorial I'll be demonstrating how to send mail using Mailgun's API
  and Google's GoLang programming language.
series: golang
image: golang.svg
tag: Misc
tags:
  - mail
title: Sending Email Using Go And Mailgun
twitter: https://twitter.com/Elliot_F
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

<p>In this tutorial I'm going to be demonstrating how you can send mail with Go(Lang) and the mailgun api. Thankfully, mailgun's API is fantastic and sending mail is incredibly easy once you've set everything up properly.</p>

## Requirements

<ul>
<li>You'll need a mailgun account with your own verified domains</li>
<li>Mailgun's Go Package: Downloadable from here > <a href="https://github.com/mailgun/mailgun-go" target="_blank" >https://github.com/mailgun/mailgun-go</a></li>
<li>Your Mailgun's Public API Key</li>
</ul>

## Implementation

```go
package main

import (
    "github.com/mailgun/mailgun-go"
)

func SendSimpleMessage(domain, apiKey string) (string, error) {
  mg := mailgun.NewMailgun("tutorialedge.net", apiKey, "key-12345671234567")
  m := mg.NewMessage(
    "Excited User <elliot@tutorialedge.net>",
    "Hello",
    "Testing some Mailgun!",
    "elliot@tutorialedge.net",
  )
  _, id, err := mg.Send(m)
  return id, err
}

func main(){
    SendSimpleMessage("postmaster@elliotforbes.co.uk", "key-12345671234567")

}
```
