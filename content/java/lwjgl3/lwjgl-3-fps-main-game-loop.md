+++
date = "2017-04-15T09:29:14+01:00"
title = "LWJGL 3 Main Game Loop Tutorial"
draft = true
desc = "This tutorial demonstrates how to build a game loop which provides consistent time between updates across all computers by using Java's "
tags = ["lwjgl3", "java", "gamedev"]
series = ["lwjgl3"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

<p>The code featured below is an example of how you create a game loop that is limited to 60 frames per second. This is useful if you have implemented update functions that are bounded by the number of times they are called rather than based on time between updates. </p>

<h2>The Code</h2>

~~~
public void run(){
	init();
	long lastTime = System.nanoTime();
	double delta = 0.0;
	double ns = 1000000000.0 / 60.0;
	long timer = System.currentTimeMillis();
	int updates = 0;
	int frames = 0;
	while(running){
		long now = System.nanoTime();
		delta += (now - lastTime) / ns;
		lastTime = now;
		if (delta >= 1.0) {
			update();
			updates++;
			delta--;
		}
		render();		
		frames++;
		if (System.currentTimeMillis() - timer > 1000) {
			timer += 1000;
			System.out.println(updates + " ups, " + frames + " fps");
			updates = 0;
			frames = 0;
		}
		if(glfwWindowShouldClose(window) == GL_TRUE){
			running = false;
		}
	}
	
	cleanup();
}
~~~