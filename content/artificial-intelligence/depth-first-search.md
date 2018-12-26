---
author: Elliot Forbes
bookImage: game-ai-by-example.jpeg
bookLink: http://amzn.to/2r74d8f
bookTitle: Programming Game AI by Example
date: 2017-04-15T09:23:35+01:00
desc: 'This article looks to demonstrate how one can implement the depth first graph
  search algorithm using the java programming language. '
series: ai
image: ai.png
tags:
- ai
- java
title: Depth First Search in Java
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

# Depth First Search

<p>DFS is another uninformed graph traversal algorithm which produces a non-optimal solution but can be useful for traversing quickly into deeper search domains. Depth first search is very similar to the previously covered breadth first search that we covered in this tutorial: <a href="/artificial-intelligence/breadth-first-search-java/">breadth first search in Java</a></p>

# How it Works

<p>With Depth first search you start at the top most node in a tree and then follow the left most branch until there exists no more leafs in that branch. At that point you will search the nearest ancestor with unexplored nodes until such time as you find the goal node.</p>

<p>If we take this binary tree as an example, the depth first search algorithm would do the following:</p>

<ol>
	<li>Add Node 1 to the stack </li>
	<li>If Node 1 isn't the goal node then add Node 2 to the stack</li>
	<li>Check if Node 2 is the goal node and if not add Node 4 to the stack.</li>
	<li>If Node 4 isn't the goal node then add Node 8 to the stack. </li>
	<li>If node 8 isn't the goal node then go to the nearest ancestor with unexplored children.</li>
	<li>This happens to be Node 4, so we add Node 9 to the stack and check that.</li>
	<li>If this isn't the goal node then we travel to Node 2 and explore it's unexplored children, Node 5.</li>
	<li>and so on...</li>
</ol>

<p>We continue to go down the left most nodes until we find the first path that reaches our goal node.</p>

# AbstractSearch Class

<p>As a means of clearing up the code from all these tutorials I am going to add in an abstract class to which all of our graph traversal classes will extend and adhere to. The source code for this looks like so:</p>

```java
/**
 * AbstractSearch class so that we have a template
 * that all future graph traversal algorithms must adhere to.
 * this will make it far easier to "hot-swap" different algorithms
 * out for testing later on.
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

# Depth First Search Implementation

```java
import java.util.ArrayList;
import java.util.Stack;

/**
 * depth first search implementation using a stack structure instead of a queue
 * structure as exhibited in the breadth first search algorithm
 */
public class DepthFirstSearch extends AbstractSearch{

    Node startNode;
    Node goalNode;

    public DepthFirstSearch(Node start, Node goalNode){
        super(start, goalNode);
        this.startNode = start;
        this.goalNode = goalNode;
    }

    public boolean execute(){
        if(this.startNode.equals(goalNode)){
            System.out.println("Goal Node Found at 0 depth");
            System.out.println(startNode);
        }
        Stack<node> nodeStack = new Stack<>();
        ArrayList<node> visitedNodes = new ArrayList<>();

        nodeStack.add(startNode);

        while(!nodeStack.isEmpty()){
            Node current = nodeStack.pop();
            if(current.equals(goalNode)){
                System.out.print(visitedNodes);
                System.out.println("Goal node found");
                return true;
            }
            else {
                visitedNodes.add(current);
                nodeStack.addAll(current.getChildren());
            }
        }
        return false;
    }

}
```

# Updating our Driver class

<p>Due to the fact we've created an abstract search class we can now do something similar to this in our driver class:</p>

```java
/**
 * Created by elliotforbes on 24/06/15.
 */
public class Driver {

    public static void main(String args[]){
        Node station1 = new Node("Westminster", null, null);
        Node station2 = new Node("Waterloo", station1, null);
        Node station3 = new Node("Trafalgar Square", station1, station2);
        Node station4 = new Node("Canary Wharf", station2, station3);
        Node station5 = new Node("London Bridge", station4, station3);
        Node station6 = new Node("Tottenham Court Road", station5, station4);

        // We instantiate searchAlgo as type AbstractSearch but we set it to equal
        // our newly created DepthFirstSearch concrete class implementation
        AbstractSearch searchAlgo = new DepthFirstSearch(station6, station1);

        if(searchAlgo.execute())
            System.out.print("Path Found!");
    }
}
```
