---
title: "Scope and Ownership in Rust"
date: 2019-01-30T14:36:39Z
desc:
  Learn about the scope and ownership in Rust in this guest post by Daniel
  Arbuckle, the author of Rust Quick Start Guide.
author: Daniel Arbuckle
twitter: https://amzn.to/2GfjZaH
series: rust
image: rust-logo.png
tags:
  - beginner
authorImage: https://tutorialedge.net/images/logo.png
---

In Rust, every data value has a single owning scope—no more, no less. So, what's
a scope? The easy answer is that a scope is the place where a block expression
stores its variables. Scopes are not directly represented in the source code,
but a scope begins when a block expression begins, with a `{` symbol, and ends
when the block expression ends, with `}` (or when a `return` statement is run
before the block reaches its end). The scope is the chunk of memory where the
block's variables are stored.

**Every** data value has an owning scope, including implied temporary values
such as the result of `2 + 2` when we ask Rust to compute `(2 + 2) * 3`.

When Rust is done with a scope, all of the data values that the scope owns are
discarded and the memory that was used to store them is freed up for other uses.
This includes memory that was allocated on the **heap**. The time between when a
value is created and the time when its owning scope is done is called
the **lifetime** of the value.

## The stack

Like most programming languages, Rust uses a **stack** to handle memory
management for scopes. A stack is a simple data structure, also referred to as
a **Last In, First Out Queue** or **LIFO**. Stacks support two
operations: **push**, which stores a new value, and `pop`, which removes and
returns the most recently stored value.

We can think of a stack as a pile of boxes. If we want to remove the stuff
stored in the top box, we can just take it down and look inside. However, if we
want to remove the stuff stored in one of the boxes underneath, we first have to
remove the boxes above it. Here's a diagram of what I'm talking about, with
access to the boxes underneath blocked by the ones above them:

![](https://images.tutorialedge.net/images/rust/image1-17.png)

When a Rust block expression starts, it makes a note of how tall the stack is
and, when the block ends, it removes things from the stack until the stack is of
the same height as it was to begin with. In between, when the block needs to
store a new value, it pushes that value onto the stack.

When a value is removed from the stack, the Rust compiler also makes sure to do
any cleanup that is needed before discarding the value, including calling a
custom cleanup function for the value if one is defined.

Most programming languages do this, but not exclusively. In Rust, even when a
data value uses heap memory, it is represented on the stack and controlled by
the rules of ownership. By following that simple procedure, it's easy for Rust
to handle all of the record keeping and memory management for a program,
efficiently and with no garbage collection required.

> **Note -** Garbage collection is a mechanism used in many programming
> languages to remove the burden of memory management from the programmer. It's
> even easier to use than Rust's method, but it does require time for the
> garbage collection mechanism to run, which can impact program performance.
> Rust's method is almost entirely deterministic at compile time: the Rust
> compiler knows when to allocate and deallocate memory without having to figure
> it out while the program runs.

## Transferring ownership

It's possible (and common) to transfer ownership of a value to a different
scope. For example, we can do something like this:

```rust
{
    let main_1 = Point2D {x: 10.0, y: 10.0};
    receive_ownership(main_1);
    receive_ownership(main_1); // This will cause a compiler error!
}
```

What is happening is that the `main_1` variable is created and initialized under
the ownership of the current scope (the value is pushed onto the stack), but
then the ownership is transferred to the scope of the block expression that
makes up the `receive_ownership` function's body, when the value is used as a
function parameter. The compiler knows that the current scope is no longer
responsible for cleaning up the value stored in `main_1`, because that job now
belongs to a different scope.

> **Note -** The bytes that represent the value on the stack are copied to a new
> location on the stack, within the scope that is receiving ownership. Most data
> values store some of their information outside of the stack though, so the
> bytes that are left behind in the old scope are considered no longer
> meaningful or safe to use.

If we try to use the value stored in `main_1` after it has been moved to a
different scope, as we're doing here with the second call
to `receive_ownership`, the compiler will report an error. It's not just using
the value as a function parameter that will cause an error, either. Any use of a
value that has been moved is an error. It's no longer there to be used.

Ownership can also be transferred in the other direction. This function receives
ownership of its parameter, but then returns the parameter (and hence the
ownership) back to the block where it was called:

```rust
pub fn receive_ownership(point: Point2D) -> Point2D {
    println!("Point2D{{x: {}, y: {}}} is now owned by a new scope", point.x, point.y);
    return point;
}
```

That doesn't mean that the original variable (`main_1`) becomes usable again,
but if we assign the return value from the function to a variable, we can
continue using that value through the new variable.

Ownership can also be transferred "sideways" by assigning a value to a different
variable. We do something like this:

```rust
let mut main_4 = main_2;
```

Here, the value stored in `main_2` is moved to `main_4`. In this basic example,
that's not particularly interesting; we've just got a new variable containing
the value that the old variable used to contain, and they're both in the same
scope anyway. This gets more interesting when we do things like assigning a
value to a structure member, especially when the structure has a different
lifetime.

Rust's compiler is very careful about ownership, and when it detects a situation
where ownership is not properly respected, or even **might not** be properly
respected, it reports an error. The following function will not compile, because
it is only valid when the `switch` parameter is `false`:

```rust
pub fn uncertain_ownership(switch: bool) {
    let point = Point2D {x: 3.0, y: 3.0};

    if switch {
        receive_ownership(point);
    }

    println!("point is Point2D{{x: {}, y: {}}}", point.x, point.y);
}
```

When we try to compile the `uncertain_ownership` function, we get output like
this from the compiler:

![](https://images.tutorialedge.net/images/rust/image2-19.png)

## Conclusion

As far as the compiler is concerned, if we could have moved the value before
using it, we don't get to use it. Hope you enjoyed reading this article. If
you’d like to get up and running with Rust,
[Rust Quick Start Guide](https://amzn.to/2GfjZaH) is your one-stop guide! Rust
is an emerging programming language applicable to areas such as embedded
programming, network programming, system programming, and web development. This
book will take you from the basics of Rust to the point where your code compiles
and does what you intend!
