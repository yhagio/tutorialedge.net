---
author: Elliot Forbes
date: 2018-09-01T18:53:06+01:00
desc: In this tutorial, we are going to be taking a look at how you can use Protocol
  Buffers within your Go applications
series: golang
image: golang.png
tags:
- advanced
title: Go Protocol Buffer Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 28
---

Welcome fellow coders! In this tutorial, we are going to be looking at how you can utilize the Protocol Buffers data format within your Go-based applications. We'll be covering what the data format is, and why it is an improvement over more traditional data formats such as XML or even JSON. And we'll dive into a simple example to get us up and running before trying our hands at a more complex example.

By the end of this tutorial, you should be fairly comfortable with the basics and you'll subsequently be able to go out and build your own more advanced systems.

# Video Tutorial

<div style="position:relative;height:0;padding-bottom:43.59%"><iframe src="https://www.youtube.com/embed/NoDRq6Twkts?ecver=2" style="position:absolute;width:100%;height:100%;left:0" width="826" height="360" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

# The Protocol Buffer Data Format

Protocol buffers, are essentially a data format, much like JSON or XML in the sense that they store structured data which can be serialized or de-serialized by a wide number of different languages. 

The main advantage of this format is that it's a hell of a lot smaller when compared to the likes of XML or even JSON. It was a format that was originally developed by Google, who are fairly well known company that are at such a size, that every byte they can save makes a difference. 

Imagine we had a person, who's data we wanted to represent in the 3 separate data formats:

```xml
<person>
  <name>Elliot</name>
  <age>24</age>
</person>
```

We could represent this data in a far smaller size footprint in JSON:

```json
{
  "name": "Elliot",
  "age": 24
}
```

And if we were to represent this same data using the protocol buffer data format:

```c
[10 6 69 108 108 105 111 116 16 24]
```

If you look closely at the above wire encoded output, you may see that, starting from position 2 in the array, the name `elliot` is spelled out, `e` = 69, `l` = 108 and so on. This is followed by the byte representation of my current age, 24. 

There's a bit more to the encoding format than meets the eye though and it's something I'm still attempting to learn about in more detail, should you wish, I'd recommend checking out Google's own documentation here: [Protocol Buffer Encoding](https://developers.google.com/protocol-buffers/docs/encoding).

Now, whilst the respective size of both the JSON and the Protocol Buffer representation may be similar at this scale, but when we start to consider scenarios where our data is larger than your standard "getting started" example, the savings start to ramp up.

# A Simple Example

```s
& go get github.com/golang/protobuf
$ go get github.com/golang/protobuf/proto
```

This will download the necessary packages we'll need to get our really simple example up and running. 

```s
$ export PATH=$PATH:$GOPATH/bin
```

With this set, you should have the necessary `protoc` binary available in your terminal. We can then go about defining our `protobuf` schema, in this example, we'll be trying to represent the same `person` object we used to highlight the differences between the various data formats above.

We'll start off by specifying the syntax we want to use, in this example `proto3` suits our needs. We'll then specify that we want this to be part of the `main` package. 

Finally we define how we want our object to look. This consists of our message format of type `Person` which features two fields, `name` and `age`. 

```proto
syntax="proto3";

package main;
		
message Person {
	  string name = 1;
	  int32 age = 2;
}
```

And we can then compile this using the `protoc` binary:

```s
$ protoc --go_out=. *.proto
```

We've finally got everything in place to start writing our go code. Let's start by defining a new `Person` and then we can marshal this object into a `protobuf` object. 

To get an understanding as to how this is stored, we call `fmt.Println(data)` to print out the wire encoded format that stores our `protobuf` object.

```go
package main

import (
	"fmt"
	"log"

	"github.com/golang/protobuf/proto"
)

func main() {

	elliot := &Person{
		Name: "Elliot",
		Age:  24,
	}
	
	data, err := proto.Marshal(elliot)
	if err != nil {
		log.Fatal("marshaling error: ", err)
	}

  // printing out our raw protobuf object
	fmt.Println(data)

  // let's go the other way and unmarshal
  // our byte array into an object we can modify 
  // and use
	newElliot := &Person{}
	err = proto.Unmarshal(data, newElliot)
	if err != nil {
		log.Fatal("unmarshaling error: ", err)
  }
  
  // print out our `newElliot` object
  // for good measure
  fmt.Println(newElliot.GetAge())
	fmt.Println(newElliot.GetName())

}
```

When we run this, we need to ensure that we pass in our `test.pb.go` file as well in order for this to work: 

```s
➜  src go run main.go test.pb.go
[10 6 69 108 108 105 111 116 16 24]
name:"Elliot" age:24
```

# Nested Fields

Ok, so we've managed to get a fairly simple example up and running, but in the real-world, we will most likely have multiple nested fields within our message format and we'll be modifying some of the values etc.

Let's take a look at how we can start working with nested fields. We'll continue using our `Person` message type and we'll add a nested field which will contain social media followers. 

We can compose our Person of standard field types and a custom `SocialFollowers` message type like so:

```c
syntax="proto3";

package main;

message SocialFollowers {
  int32 youtube = 1;
  int32 twitter = 2;
}
		
message Person {
	  string name = 1;
	  int32 age = 2;
    SocialFollowers socialFollowers = 3;
}
```

Once, we've made these changes we'll then have to rerun the `protoc` command:

```s
$ protoc --go_out=. *.proto
```

And then when we come back into our Go program, we can populate our `elliot` object with `SocialFollowers`:

```go
package main

import (
	"fmt"
	"log"

	"github.com/golang/protobuf/proto"
)

func main() {

	elliot := Person{
		Name: "Elliot",
		Age:  24,
		SocialFollowers: &SocialFollowers{
			Youtube: 2500,
			Twitter: 1400,
		},
	}

	data, err := proto.Marshal(&elliot)
	if err != nil {
		log.Fatal("marshaling error: ", err)
	}

	// let's go the other way and unmarshal
	// our protocol buffer into an object we can modify
	// and use
	newElliot := &Person{}
	err = proto.Unmarshal(data, newElliot)
	if err != nil {
		log.Fatal("unmarshaling error: ", err)
	}

	// print out our `newElliot` object
	// for good measure
	fmt.Println(newElliot.GetName())
	fmt.Println(newElliot.GetAge())
	fmt.Println(newElliot.SocialFollowers.GetTwitter())
	fmt.Println(newElliot.SocialFollowers.GetYoutube())

}
```

When we run this for a final time, we see that everything is printed out as expected:

```s
➜  src go run main.go test.pb.go
Elliot
24
1400
2500
```


# Conclusion

So, in this tutorial, we had a good look at how you can get up and running with the protocol buffer data format within your own Go-based applications. 

Hopefully, you found this tutorial useful, if you have any further questions or comments then please feel free to let me know in the comments section below!