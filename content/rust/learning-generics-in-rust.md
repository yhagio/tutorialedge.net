---
author: Andrew Johnson
date: 2018-09-01T14:52:49+01:00
desc: Learn generics in this tutorial by Andrew Johnson, a software developer who
  has worn many hats.
series: rust
image: rust-logo.png
tags:
- rust
title: Learning Generics in Rust
twitter: https://twitter.com/TutorialEdge
weight: 2
---

Generics are a facility to write code for multiple contexts with different types, and parameterization allows the programmer to write code that makes fewer assumptions about the data structures and code segments involved in the code's definition. 

For example, a very ambiguous concept would be the concept of addition. When a programmer writes `a + b`, what does that mean? In Rust, the `Add` trait can be implemented for just about any type. As long as there is an implementation for the `Add` trait in scope that is compatible with the types of a and b, this trait will define the operation. 

In this pattern, you can write generic code that defines a concept in its most abstract terms, allowing for later definitions of data and methods to interface with that code without change.

A major example of completely generic code is built-in container data structures. Vectors and HashMaps must necessarily know the types of the objects they store. However, it would be very limiting if any assumptions were made about the underlying data structure or methods for the stored items.

Therefore, parameterization of containers allows the container and its methods to explicitly declare trait bounds that are expected from stored types. All other characteristics of the stored item will be parameterized.

# Investigating generics

Generics refer to the practice of parameterizing classes in object-oriented programming (OOP) languages. Rust does not have an exact equivalent of classes. However, the concept of datatypes paired with a trait is very similar to a class if used in that sense. So, in Rust, generics would refer to the parameterization of datatypes and traits.
Choosing a common example from OOP, look at the animal kingdom. In the following code, you can define some animals and the actions that they can take. First, define two animals:

```rust
struct Cat
{
   weight: f64,
   speed: f64
}
 
struct Dog
{
   weight: f64,
   speed: f64
}
```

Now, define an `animal trait` and its implementations. All animals will have the `max_speed` method. Here is the code:

```rust
trait Animal
{
   fn max_speed(&self) -> f64;
}
 
impl Animal for Cat
{
   fn max_speed(&self) -> f64
   {
      self.speed
   }
}
 
impl Animal for Dog
{
   fn max_speed(&self) -> f64
   {
      self.speed
   }
}
```

Here, you have defined the Rust equivalent of interfaces from OOP. However, you have not parameterized anything, so nothing here should be considered generic. You can add the code for a trait defining the concept of an animal chasing a toy. First, define the concept of the toy. This will follow the same OOP-like pattern as in the preceding code:

```rust
struct SqueakyToy
{
   weight: f64
}
 
struct Stick
{
   weight: f64
}
 
trait Toy
{
   fn weight(&self) -> f64;
}
 
impl Toy for SqueakyToy
{
   fn weight(&self) -> f64
   {
      self.weight
   }
}
 
impl Toy for Stick
{
   fn weight(&self) -> f64
   {
      self.weight
   }
}
```

Now, you have two traits, each having two possible implementations. Define an action for an animal chasing the toy. More than one possible animal has been defined and more than one possible toy, so you’ll need to use a generic definition. 

The struct definition also constrains each parameter with a trait bound, which adds additional information to the `struct`; now, you can guarantee that each animal will implement the `Animal` trait and similarly, each toy will implement `Toy`. You can also define some associated logic that uses the parameterized traits' methods. The code is as follows:

```rust
struct AnimalChasingToy<A: Animal, T: Toy>
{
   animal: A,
   toy: T
}
 
trait AnimalChasesToy<A: Animal, T: Toy>
{
   fn chase(&self);
}
 
impl<A: Animal, T: Toy> AnimalChasesToy<A, T> for AnimalChasingToy<A, T>
{
   fn chase(&self)
   {
      println!("chase")
   }
}
```

At this point, you have defined a generic `struct` and `trait` that accepts types, knowing only some limited information regarding the traits of each object. Multiple traits or none can be specified to declare all expected interfaces. Multiple traits or lifetime bounds can be declared with the `'l + Trait1 + Trait2` syntax.

# Investigating generalized algebraic datatypes

Sometimes, it is desirable to have the type system carry more information than normal. If you look at the process of compilation, types occupy a space between the program code and the program executable. The code can take the form of text files before compilation or an abstract syntax tree such as those manipulated by Rust macros. Program executables consist of the resulting combination of all Rust primitives like expressions, functions, datatypes, traits, and so on.

Right in the middle, it is possible to introduce a new concept called **algebraic data types (ADTs)**. ADTs are technically an extension of Rust primitives, though it is important to note how much extra type information is used for ADTs. This technique involves preserving extra type information into the executable. 

Extra run time decision-making is a step towards dynamic typing and foregoes optimizations available to static compilation. The result is a somewhat less efficient programming primitive, but also a primitive that can describe concepts that are otherwise difficult to approach.

Now, look at one example—deferred computation. When you describe a relation of different values and expressions, you normally just write this code into the program directly. However, what would you do if you wanted to separate the code step from the execution step? To accomplish this, start building something called a **domain-specific language**.

For a concrete example, consider that you are building a JIT (dynamically compiled) interpreter for JavaScript. The Mozilla project has several projects dedicated to JS engines built in Rust (https://blog.mozilla.org/javascript/2017/10/20/holyjit-a-new-hope/). This is a real application for which Rust is well-suited. To use an ADT in a JIT compiled interpreter, you want two things:

* To evaluate ADT expressions directly within the interpreter
* To compile ADT expressions if selected for compilation

So, any part of your JavaScript expressions can either be interpreted or compiled at any time. If an expression is compiled, then you want all further evaluations to use the compiled version. The key to implement this cleanly is to put some extra weight on the type system. These heavy type definitions are the essence of the ADT concept. Here is a definition of a very small subset of JavaScript using an ADT:

```rust
struct JSJIT(u64);
 
enum JSJITorExpr {
   Jit { label: Box<JSJIT> },
   Expr { expr: Box<JSExpr> }
}
 
enum JSExpr {
   Integer { value: u64 },
   String { value: String },
   OperatorAdd { lexpr: Box<JSJITorExpr>, rexpr: Box<JSJITorExpr> },
   OperatorMul { lexpr: Box<JSJITorExpr>, rexpr: Box<JSJITorExpr> }
}
```

Here, you can see that each intermediate expression has enough information to be evaluated, but also has enough information to be compiled. You could have easily wrapped the Add or Mul operator into closures, but that would disallow JIT optimization. You need to maintain the full representation here in order to permit JIT compilation. 

Also, note the indirection between each point where the program decides whether to evaluate an expression or to call into compiled code.

The next step is to implement an evaluation program for each expression form. You could break this into traits or define the evaluation as one larger function. To keep the functional style, you can define a single function. To evaluate an expression, you can use a pattern match on the JSJITorExpr expression. 

This JIT expression breaks down into either a code address which is run by calling the jump function or an expression which must be evaluated dynamically. This pattern gives you the best of both worlds, mixing compiled code and interpreted code together. The code is as follows:

```rust
fn jump(l: JSJIT) -> JSJITorExpr
{
   //jump to compiled code
   //this depends on implementation
   //so we will just leave this as a stub
   JSJITorExpr::Jit { label: JSJIT(0) }
}
 
fn eval(e: JSJITorExpr) -> JSJITorExpr
{
   match e
   {
      JSJITorExpr::Jit { label: label } => jump(label),
      JSJITorExpr::Expr { expr: expr } => {
         let rawexpr = *expr;
         match rawexpr
         {
            JSExpr::Integer {..} => JSJITorExpr::Expr { expr: Box::new(rawexpr) },
            JSExpr::String {..} => JSJITorExpr::Expr { expr: Box::new(rawexpr) },
            JSExpr::OperatorAdd { lexpr: l, rexpr: r } => {
               let l = eval(*l);
               let r = eval(*r);
               //call add op codes for possible l,r representations
               //should return wrapped value from above
               JSJITorExpr::Jit { label: JSJIT(0) }
            }
            JSExpr::OperatorMul { lexpr: l, rexpr: r } => {
               let l = eval(*l);
               let r = eval(*r);
               //call mul op codes for possible l,r representations
               //should return wrapped value from above
               JSJITorExpr::Jit { label: JSJIT(0) }
            }
         }
      }
   }
}
```

Another example of the ADT concept is in heterogeneous lists. Heterogeneous lists are not like other generic containers, such as vectors. Rust vectors are homogeneous, meaning all items are required to have the same type. By comparison, a heterogeneous list can have any mix of types of elements. This may sound like a tuple, but tuples have a fixed length and flat type signature. 

Similarly, heterogeneous lists must have a length and type signature known at compile time, but that knowledge can be achieved incrementally. Heterogeneous lists are permitted to work with partial knowledge of the list type, parameterizing the knowledge that they do not need.

Here is an example implementation of a heterogeneous list:

```rust
pub trait HList: Sized {}
 
pub struct HNil;
impl HList for HNil {}
 
pub struct HCons<H, T> {
   pub head: H,
   pub tail: T,
}
impl<H, T: HList> HList for HCons<H, T> {}
impl<H, T> HCons<H, T> {
   pub fn pop(self) -> (H, T) {
      (self.head, self.tail)
   }
}
```

Notice how this definition intentionally uses a trait to obscure type information, without which, such a definition would be impossible. A declaration of `HList` would look as follows:

```rust
let hl = HCons {
   head: 2,
   tail: HCons {
      head: "abcd".to_string(),
      tail: HNil
   }
};
 
let (h1,t1) = hl.pop();
let (h2,t2) = t1.pop();
//this would fail
//HNil has no .pop method
//t2.pop();
```

Rust can be a bit rigid with regards to type checking, at times. However, there are also many workarounds that permit complex behavior that might seem impossible at first.

> If you found this article interesting, you can explore Andrew Johnson’s [Hands-On Functional Programming in RUST](https://amzn.to/2osWQaz) to explore the support Rust offers for creating functional applications in Rust. This book will help you discover all the Rust features that can be used to build software in a functional way.
