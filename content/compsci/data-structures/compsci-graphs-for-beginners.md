---
author: Elliot Forbes
date: 2017-12-20T22:02:28Z
desc:
  In This Tutorial we look at Graphs, we look at how they work and what problems
  they can solve
series: compsci
tags:
  - python
  - compsci
title: Data Structures - Graphs For Beginners
twitter: https://twitter.com/Elliot_F
---

> Under Construction

`Graphs` and `graph traversal` algorithms are a cornerstone of every computer
scientists education. Every reputable university will feature one or more
classes dedicated to this topic and with good reason, the theory covered within
these topics branches into a number of practical uses.

If you are interested in going into something like Game Development then
`graphs` feature pretty heavily.

- Game developers typically use algorithms such as the `A* search algorithm` in
  order to implement basic AI within their games.
- Network Engineers widely use `Djikstra's Algorithm` in order to implement
  their network routing protocols.

# Directed and Undirected

`Graphs` can come in two distinct flavours; `directed` and `undirected`.

## Directed Graphs

Directed Graphs feature a series of `nodes` where the path or `edge` between
each node is only one-way. I.e. you cannot traverse from one `node` to a
neighbouring connected `node` and return across the same `edge`.

## Un-directed Graphs

Un-directed graphs feature a series of `nodes` where each path can be travelled
both forwards and backwards. I.e. in a `graph` that contains 2 connected
`nodes`, you can start at one `node`, travel to the other and then travel back
to the original `node` across the same `edge`.

# Conclusion

I hope you found this tutorial somewhat informative and helpful! If you require
further assistance then please feel free to leave a comment in the comments
section below or tweet me [@Elliot_F](https://twitter.com/elliot_f).
