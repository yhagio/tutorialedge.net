---
author: Elliot Forbes
date: 2017-04-15T08:42:15+01:00
desc: 'in this tutorial I''ll be showing you exactly how to create a multithreaded
  java program using Callable. '
series:
- java
tags:
- java
- multithreading
- concurrency
title: Java Multithreading Tutorial Using Callable
twitter: https://twitter.com/Elliot_F
---

<p>In this tutorial I’ll be giving you a brief introduction to the world of concurrent programming using the Java programming language. By the end of this tutorial you should hopefully have a feel for what it takes to write simple, multi-threaded java programs and an understanding of how these can help improve the performance of your programs on multithreaded/multicore machines.</p>

## Requirements

<p>In order to successfully complete this tutorial you will need to have Java 7 installed and running on your machine, as well as a method for editing and executing your Java code for which I would recommend the Eclipse or Intellij IDE.</p>

<p>You’ll also need a basic understanding of the Java programming language. Everything covered here will be built on top of a pre-existing Java background.</p>

## Introduction - What is Concurrent Programming?

<p>“Concurrent computing is a form of computing in which several computations are executing during overlapping time periods - concurrently - instead of sequentially” - Wikipedia</p>

<p>What this essentially means for us is that we can have our programs utilizing more of the power that is contained within our CPUs by spreading the load evenly across multiple cores and threads. If you gave 1 worker 1,000,000 computations to work through and each computation took 1 minute, the fastest that worker could complete that task is in 1,000,000 minutes. If you had 100 workers working on that 1,000,000 computations then it should take roughly 100 times faster, this isn’t always the case with computers but we do see tremendous performance enhancements and far greater CPU utilization. </p>

<p>One thing to bear in mind is that we don’t have an infinite number of threads on a CPU and creating more and more threads could eventually start to severely hamper your program’s performance.</p>

## Implementing this in Java

<p>There are multiple ways we can implement multithreading into our programs but the one I’m going to be focusing on in this tutorial is the Callable method. This method is advantageous over the Runnable and Thread methods as it allows you to see the results of execution.</p>

<p>We’ll start of with a basic Java class implementing Callable:</p>

```java
package com.tutorialedge.net;

import java.util.concurrent.Callable;

public class Worker implements Callable{
	
	String identifier;
	
	Worker(String identifier){
		this.identifier = identifier;
	}
	
	@Override
	public String call() throws Exception {
		System.out.println("Worker ID: " + this.identifier);
		
		for(int i = 0; i < 10000; i++){
			System.out.println("ID: " + this.identifier + " ,Value: " + i);
		}
		
		return null;
	}

}
```

<p>Next thing we’ll do is create a main method which will run our workers for us. This will look something like this:</p>

```java
package com.tutorialedge.net;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {

	public static void main(String[] args){
		ExecutorService pool = Executors.newFixedThreadPool(4);
		
		Worker worker1 = new Worker("1");
		Worker worker2 = new Worker("2");
		Worker worker3 = new Worker("3");
		Worker worker4 = new Worker("4");
		
		pool.submit(worker1);
		pool.submit(worker2);
		pool.submit(worker3);
		pool.submit(worker4);
		
		pool.shutdown();
		
		System.out.println("Hello World");
	}
	
}
```


