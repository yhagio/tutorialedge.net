---
author: Elliot Forbes
date: 2017-04-15T09:29:14+01:00
desc: This tutorial looks to demonstrate how one can initialize a window using the
  LWJGL 3 framework and OpenGL
series:
- lwjgl3
tags:
- lwjgl3
- java
- gamedev
title: Creating a Game Window using GLFW - LWJGL3
twitter: https://twitter.com/Elliot_F
---

## Creating our Game Window

<p>So now that you’ve got the base project set up, you are going to want to start writing some code and making some magic happen on the screen.
First of all you are going to want to create a new class and call it Main.java. This will be the class that contains vital things like the initialization code and the main game loop which we will be developing later on.</p>

<p>Once you’ve created the Main.java class you are going to want to write the following code:</p>

```java
import static org.lwjgl.glfw.GLFW.*;

public class Main implements Runnable{

  private Thread thread;
  public boolean running = true;

  public static void Main(String args[]){
    Main game = new Main();
    game.start();
  }

  public void start(){
    running = true;
    thread = new Thread(this, "EndlessRunner");
    thread.start();
  }

  public void init(){
    
  }

  public void update(){
    
  }

  public void render(){
    
  }

  @Override
  public void run() {
    init();
    while(running){
      update();
      render();
    }
  }
}
```

<p>This will form the main outline of our code and it’s a great place to start from. So far it’s all super simple stuff and all the code is really doing is starting our games thread, everything else still has to be fleshed out.</p>

## Our Imports

```java
import static org.lwjgl.glfw.GLFW.*; // allows us to create windows
import static org.lwjgl.opengl.GL11.*; // gives us access to things like "GL_TRUE" which we'll need 
import static org.lwjgl.system.MemoryUtil.*; // allows us to use 'NULL' in our code, note this is slightly different from java's 'null'
import java.nio.ByteBuffer; // Used for getting the primary monitor later on.
import org.lwjgl.glfw.GLFWvidmode; // again used for primary monitor stuff.
```

<p>These are the libraries we need to import in order for our basic window to be displayed.</p>

## The init() function

<p>Our init function is where most of our initialization code will go for both the window and for OpenGL. It takes the following shape:</p>

```java
public void init(){
  // Initializes our window creator library - GLFW 
  // This basically means, if this glfwInit() doesn't run properlly
  // print an error to the console
  if(glfwInit() != GL_TRUE){
    // Throw an error.
    System.err.println("GLFW initialization failed!");
  }
  
  // Allows our window to be resizable
  glfwWindowHint(GLFW_RESIZABLE, GL_TRUE);
  
  // Creates our window. You'll need to declare private long window at the
  // top of the class though. 
  // We pass the width and height of the game we want as well as the title for
  // the window. The last 2 NULL parameters are for more advanced uses and you
  // shouldn't worry about them right now.
  window = glfwCreateWindow(width, height, "Endless Runner", NULL, NULL);

  // This code performs the appropriate checks to ensure that the
  // window was successfully created. 
  // If not then it prints an error to the console
  if(window == NULL){
    // Throw an Error
    System.err.println("Could not create our Window!");
  }
  
  // creates a bytebuffer object 'vidmode' which then queries 
  // to see what the primary monitor is. 
  ByteBuffer vidmode = glfwGetVideoMode(glfwGetPrimaryMonitor());
  // Sets the initial position of our game window. 
  glfwSetWindowPos(window, 100, 100);
  // Sets the context of GLFW, this is vital for our program to work.
  glfwMakeContextCurrent(window);
  // finally shows our created window in all it's glory.
  glfwShowWindow(window);
}
```

## Update() and Render() functions

<p>Once we’ve successfully initialized both our window and GLFW we will now want to make sure that everything works correctly and that we’ll be able to get any input needed from the user.</p>

```java
public void update(){
  // Polls for any window events such as the window closing etc.
  glfwPollEvents();
}

public void render(){
  // Swaps out our buffers
  glfwSwapBuffers(window);
}
```

## Our updated Game Loop

<p>Now that everything is in place you will want to implement the code that allows us to close the window. This can be done by adding the following 3 lines of code under our call to render(); in the main game loop as follows:</p>

```java
@Override
public void run() {
  // All our initialization code
  init();
  // Our main game loop
  while(running){
    update();
    render();
    // Checks to see if either the escape button or the
    // red cross at the top were pressed.
    // if so sets our boolean to false and closes the
    // thread.
    if(glfwWindowShouldClose(window) == GL_TRUE){
      running = false;
    }
  }
}
```

## Compile

<p>Once you’ve done all that, try hitting the green ‘run as’ arrow button at the top of your Eclipse IDE or right clicking on your project and selecting ‘run as’ and then selecting ‘Java application’. If you’ve done everything correctly and have no errors then you should see a game window successfully appearing on your screen</p>

## Full Source:

```java
import static org.lwjgl.glfw.GLFW.*;
import static org.lwjgl.opengl.GL11.*;
import static org.lwjgl.system.MemoryUtil.*;
import java.nio.ByteBuffer;
import org.lwjgl.glfw.GLFWvidmode;

public class Main implements Runnable{
	
  private Thread thread;
  public boolean running = true;

  private long window;

  private int width = 1200, height = 800;

  public static void main(String args[]){
    Main game = new Main();
    game.start();
  }

  public void start(){
    running = true;
    thread = new Thread(this, "EndlessRunner");
    thread.start();
  }

  public void init(){
    // Initializes our window creator library - GLFW 
    // This basically means, if this glfwInit() doesn't run properlly
    // print an error to the console
    if(glfwInit() != GL_TRUE){
      // Throw an error.
      System.err.println("GLFW initialization failed!");
    }
    
    // Allows our window to be resizable
    glfwWindowHint(GLFW_RESIZABLE, GL_TRUE);
    
    // Creates our window. You'll need to declare private long window at the
    // top of the class though. 
    // We pass the width and height of the game we want as well as the title for
    // the window. The last 2 NULL parameters are for more advanced uses and you
    // shouldn't worry about them right now.
    window = glfwCreateWindow(width, height, "Endless Runner", NULL, NULL);

    // This code performs the appropriate checks to ensure that the
    // window was successfully created. 
    // If not then it prints an error to the console
    if(window == NULL){
      // Throw an Error
      System.err.println("Could not create our Window!");
    }
    
    // creates a bytebuffer object 'vidmode' which then queries 
    // to see what the primary monitor is. 
    ByteBuffer vidmode = glfwGetVideoMode(glfwGetPrimaryMonitor());
    // Sets the initial position of our game window. 
    glfwSetWindowPos(window, 100, 100);
    // Sets the context of GLFW, this is vital for our program to work.
    glfwMakeContextCurrent(window);
    // finally shows our created window in all it's glory.
    glfwShowWindow(window);
  }

  public void update(){
    // Polls for any window events such as the window closing etc.
    glfwPollEvents();
  }

  public void render(){
    // Swaps out our buffers
    glfwSwapBuffers(window);
  }

  @Override
  public void run() {
    // All our initialization code
    init();
    // Our main game loop
    while(running){
      update();
      render();
      // Checks to see if either the escape button or the
      // red cross at the top were pressed.
      // if so sets our boolean to false and closes the
      // thread.
      if(glfwWindowShouldClose(window) == GL_TRUE){
        running = false;
      }
    }
  }
}
```