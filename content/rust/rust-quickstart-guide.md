---
title: "Rust Quickstart Guide"
date: 2020-04-04T12:22:34+01:00
draft: true
desc: This is a super quick and dirty guide to getting started with the Rust programming language!
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: rust
image: rust-logo.png
tags:
- "01 - beginner"
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

# Glossary

* **Cargo** - Cargo is Rust's build system and package manager. The majority of Rustaceans use this tool to manage their Rust projects due to the fact that the tool performs tasks such as building your code, downloading the libaries your code depends on and building these libraries.


# Cargo Quickstart

> **Official Documentation** - The official documentation for Cargo can be found here - [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)

```py
# Creates a new Project
cargo new project_name 
```

Dependencies and information are stored within the `Cargo.toml` file at the root of your Rust project and this tends to look something like this:

```toml
[package]
name = "hello_cargo"
version = "0.1.0"
authors = ["Your Name <you@example.com>"]
edition = "2018"

[dependencies]
```

## Building with Cargo

```py
# This attempts to build your Rust project
cargo build

# You can run your project when developing with run
cargo run
```


# Splitting Code

