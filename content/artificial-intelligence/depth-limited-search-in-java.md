---
author: Elliot Forbes
bookImage: game-ai-by-example.jpeg
bookLink: http://amzn.to/2r74d8f
bookTitle: Programming Game AI by Example
date: 2017-04-15T09:23:35+01:00
desc: 'depth limited search demonstrated in java programming language. '
series: ai
image: ai.png
tags:
- ai
- java
title: Depth Limited Search in Java
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

# About Depth Limited Searching

<p>Traditional depth first search could be deemed useless in infinite state spaces as they will continue to traverse down the leftmost branch infinitely. This essentially means that the path to the goal node might never be found, in order to combat this we can add a limit to the depth that our search recurses down the tree, this essentially transforms our depth first algorithm into a depth-limited algorithm.</p>

<p>This algorithm can fail in two different ways. First is that no goal node is found in the graph and the other is the cutoff type of failure in which no goal node is found within the set depth.</p>

# Walkthrough

<p>This algorithm basically follows the same methods as the depth first search.</p>


1. Node 1 is added to the stack
  1. If Node 1 is not the goal node then add Node 2 to the stack
  2. If Node 2 is not the goal node then add Node 4 to the stack
  3. If Node 4 is not the goal node and depth limit has been reached then revert to nearest Node with unexplored children and add these to stack
2. continue until all nodes within depth limit have been searched or goal node has been found.

<p><strong>Depth First Search:</strong></p>

> For more information about the search based algorithm that this is based off, you can check out this tutorial here: <a href="/artificial-intelligence/depth-first-search/">Depth First Search in Java</a>

# The Implementation:

<p>Below you’ll find an implementation of a Depth-Limited search class which is built as an extension of the AbstractSearch java class.</p>

# AbstractSearch Java Class:

```java
/**
* AbstractSearch.
*/
public abstract class AbstractSearch {

   Node startNode;
   Node goalNode;

   public AbstractSearch(Node startNode, Node goalNode){
       this.startNode = startNode;
       this.goalNode = goalNode;
   }

   public abstract boolean execute();

}
```

# Depth Limited Search Class

```java
import java.util.ArrayList;
import java.util.Stack;

/**
* Depth Limited Search Class
*/
public class DepthLimitedSearch extends AbstractSearch {

   Node startNode;
   Node goalNode;
   int depth = 0;
   int limit = 2;

   public DepthLimitedSearch(Node start, Node goalNode){
       super(start, goalNode);
       this.startNode = start;
       this.goalNode = goalNode;
   }

   public boolean execute(){
       Stack<node> nodeStack = new Stack<>();
       ArrayList<node> visitedNodes = new ArrayList<>();
       nodeStack.add(startNode);

       depth = 0;

       while(!nodeStack.isEmpty()){
           if(depth <= limit) {
               Node current = nodeStack.pop();
               if (current.equals(goalNode)) {
                   System.out.print(visitedNodes);
                   System.out.println("Goal node found");
                   return true;
               } else {
                   visitedNodes.add(current);
                   nodeStack.addAll(current.getChildren());
                   depth++;

               }
           } else {
               System.out.println("Goal Node not found within depth limit");
               return false;
           }
       }


       return false;
   }
}
```