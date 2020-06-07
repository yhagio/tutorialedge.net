---
title: "Rust Module Tutorial"
date: 2020-04-05T08:53:05+01:00
desc: In this tutorial, we are going to look at modules within Rust and how you can define and import your own simple modules!
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: rust
image: rust.svg
weight: 2
tags:
- "01 - beginner"
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

Welcome Rustaceans! In this tutorial, we are going to take a look at Modules in Rust and how you can define your own simple modules.

By the end of this tutorial, we will have covered:

* The absolute basics of modules in Rust
* The rules around defining your own modules

With this in mind, let's dive in!

# Modules in Rust

When you first start learning Rust coming from another programming language, one of the first problems you typically come up against is - "How do I split my code into multiple files?".

This is where modules come into play. Modules in Rust allow us to split up our code into multiple files so that we can write more readable and maintainable code within our projects.

# Defining A Module

Let's start looking at how we can define a simple module within a simple Rust application. Create a new project using `cargo` like so:

```output
$ cargo new rust-modules-tutorial
$ cd rust-modules-tutorial
```

I've been picking up Rust with the intention that I'll be using it to program some games, so for the purpose of this tutorial we'll be creating a `player` module within which some of our Player's functionality will reside.

Within your project, we are going to define a simple module within a new file called `player.rs` which will live within our `src/` directory. This will represent our Player module.

Within this we will define a public function called `test_function()` which will feature just a very simple `println!()` call:

<div class="filename"> src/player.rs </div>

```rust
pub fn test_function() {
    println!("Call to test_function()");
}
```

Now, with our simple module defined, we can open up our `main.rs` file within the `src/` directory and update it so that it imports our new `player` module. We can achieve this by adding `mod player;` to near the top of our file.

We then have the flexibility to access the `test_function` directly by calling `player::test_function();` within our main function, or we can create a local name binding to the `test_function` with a `use` declaration like so:

<div class="filename"> src/main.rs </div>

```rust
mod player;
use player::test_function;

fn main() {
    println!("Hello, world!");

    test_function();
}
```

Awesome, with this in place we can now save this and attempt to run it by calling `cargo run`:

```output
cargo run
   Compiling test-project v0.1.0 (/Users/elliot/Documents/Projects/TutorialEdge/Projects/rust/game/test-project)
    Finished dev [unoptimized + debuginfo] target(s) in 0.22s
     Running `target/debug/test-project`
Hello, world!
Call to test_function()
```

As you can see, this has printed out `Hello, World!` as well as the `Call to test_function()` which we defined within our `player` module. 

<!-- TODO: Add section on module paths -->

# Conclusion

In this tutorial, we looked at the basics of modules within the Rust programming language and how you can build your own incredibly simple modules!

If you have any comments or anything else you would like to discuss, then please let me know in the comments section below!

## Further Reading:

If you enjoyed this tutorial, you may also like some of the other tutorials on the site:

* [Learning Generics in Rust](/rust/learning-generics-in-rust/)