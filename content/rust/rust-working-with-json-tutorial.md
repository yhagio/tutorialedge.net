---
author: Elliot Forbes
date: 2017-12-25T11:51:47Z
desc: This tutorial shows you how you can work with JSON objects in Rust
series: rust
image: rust-logo.png
tags:
  - rust
  - json
title: Working with JSON in Rust - Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

> This tutorial was built using Rust Version: 1.22.1

# Introduction

Most programming languages support `JSON` as part of the core language by
default. It's an incredibly popular data format that is used in millions of
different applications.

In this tutorial we'll be looking at how you can effectively work with JSON
objects within our own Rust based systems. In order to do this we'll be creating
a very simple [REST API](/general/what-is-a-rest-api) that will do a variety of
different things with JSON objects.

# Serde

In this tutorial we'll be utilizing the `Serde` crate which can be found here:
[serde](https://serde.rs/). `Serde` is an awesome framework which can
`Serialize` and `Deserialize` objects into a huge range of data formats
including:

- JSON
- Bincode
- YAML
- TOML
- BSON
- XML
- Redis

In order to use this you will have to add the following to your `Cargo.toml`.

```toml
[dependencies]
serde = "*"
serde_json = "*"
serde_derive = "*"
```

and then you will have to add this to your crate root:

```rust
#[macro_use]
extern crate serde_derive;
extern crate serde;
extern crate serde_json;
```

# Structs

If you have ever used `Golang` then the concept of defining `struct`'s that will
represent our `JSON` objects.

```rust
#[derive(Serialize, Deserialize, Debug)]
struct Greeting {
    status: String,
    content: String
}
```

# Serializing

Let's take a look at how we can serialize a `struct` to a `JSON` string:

```rust
let greeting = Greeting { status: "success", content: "Hello World" };
let serialized = serde_json::to_string(&greeting).unwrap();
println!("Serialized: {}", serialized);
```

# Deserializing

If we conversely wanted to deserialize our `JSON` string and convert it back to
a `Greeting` then we could do the following:

```rust
let deserialized: Greeting = serde_json::from_str(&serialized).unwrap();
println!("Deserialized: {:?}", deserialized);
```

# Sample Program

Let's now put this all together and try and create a simple REST api that will
return a JSON response. This `JSON` response will be serialized from the `resp`
variable that we will follow the `Greeting` struct.

```rust
#[macro_use]
extern crate serde_derive;
extern crate serde;
extern crate serde_json;

extern crate iron;

use iron::prelude::*;
use iron::status;

#[derive(Serialize, Deserialize, Debug)]
struct Greeting {
    status: String,
    content: String
}

fn main() {
    fn hello_world(_: &mut Request) -> IronResult<Response> {

        let resp = Greeting{status: "success".to_string(), content: "hello world".to_string()};
        let payload = serde_json::to_string(&resp).unwrap();
        Ok(Response::with((status::Ok, payload)))

    }

    Iron::new(hello_world).http("localhost:3000").unwrap();
}
```

# Conclusion

Hopefully you found this tutorial useful! If you did or require further
assistance then please let me know in the comments section below or by tweeting
me [@Elliot_F](https://twitter.com/elliot_f).
