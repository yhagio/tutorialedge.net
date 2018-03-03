+++
date = "2017-04-15T08:23:18+01:00"
title = "Managing Game States With LWJGL 3"
draft = true
desc = "This tutorial demonstrates how you can effectively manage what state your game is in using Java's enum and a few simple switch cases."
series = ["lwjgl3"]
tags = ["gamedev", "java", "lwjgl3", "graphics"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

<p>Managing game states effectively in any game can sometimes be tricky and if not done properly from the outset, can lead to a tangled mess of spaghetti code that’s almost unmaintainable. In this tutorial I’m hopefully going to be helping to prevent any of these problems from arising in your own personal game development projects. For the purpose of this tutorial I’ll be using Java and the OpenGL wrapper library LWJGL3 in order to demonstrate how to effectively manage game states.</p>

## The Design

<p>So straight away I know I want to have a game that has a main menu, as well as the ability to pause and play and possibly a movie state that allows me to show in-game cinematics or something to that effect. So from this we’ll create the following states: MENU, PLAY, PAUSE, MOVIE<p>

## The Implementation

<p>In Java we can easily represent these states like so using an enum: </p>

```java
private enum State {
    MENU, PLAY, PAUSE, MOVIE 
};

private static State gameState = State.MENU;
```

<p>After we’ve declared what states we want and initialized what state we are in on startup, we can then add some form of logic to our update and render functions that allow us to choose when and where to update and render different aspects of our game. </p>

```java	
	public void update() {
		handleInput();
		
		switch(gameState) {
			case MENU:
				// update all menu stuff
				break;
			case PLAY:
				// update our player object and allow us to play
				player1.update();
				break;
				
			case PAUSE:
				// stop updating our game objects and essentially do nothing
				break;
				
			case MOVIE:
				// Play any movie clips...
				break;
				
			default:
				break;	
		}
		
	}
	
	public void render() {
		
		switch(gameState){
			case MENU:
				// Just show our background, we can add some cool menus and stuff
				// here but for now I'm keeping it simple.
				bg.render();
				break;
			case PLAY:
				// Render both our player and background and in update switch
				// we enable player1.update()
				bg.render();
				player1.render();
				break;
			case PAUSE:
				// Render our player and background but don't allow them to
				// update
				bg.render();
				player1.render();
				break;
			case MOVIE:
				// Play any movie clips...
				break;
			default:
				// Switch cases should almost always have a default case
				// this is so that it catches any unexpected values although.
				break;
		}
		
	}

```

## Switching States
<p>As a means of switching states, I’ve created a simple method in my game class that checks to see whether any of the main keys I have defined for switching states have been pressed.</p>

```java
public void handleInput(){
		if(KeyboardHandler.isKeyDown(GLFW.GLFW_KEY_SPACE)){
			gameState = State.PLAY;
		}
		if(KeyboardHandler.isKeyDown(GLFW.GLFW_KEY_P)){
			System.err.println("Pausing Play...");
			gameState = State.PAUSE;
		}
		if(KeyboardHandler.isKeyDown(GLFW.GLFW_KEY_R)){
			gameState = State.PLAY;
			System.err.println("Resuming Play...");
		}
		if(KeyboardHandler.isKeyDown(GLFW.GLFW_KEY_ESCAPE)){
			gameState = State.MENU;
		}
	}

```
