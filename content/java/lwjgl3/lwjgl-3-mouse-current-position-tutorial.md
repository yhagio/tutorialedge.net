+++
date = "2017-04-15T09:43:47+01:00"
title = "LWJGL 3 Mouse Current Position Tutorial"
draft = true
desc = "This tutorial looks to teach the programmer how to attain the mouse's current window position and print it out to the console."
tags = ["lwjgl3", "java", "gamedev"]
series = ["lwjgl3"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

In this tutorial I will be showing you how you can obtain the X and Y coordinates of the Mouse cursor in an applications window and print it out to the console.

<h2>Creating a MouseHandler Class</h2>

To begin with I recommend you create an 'Input' package within your project as this is a good way to keep all Input Handler classes organized within your projects. Once you've created this package, right click on it and add a new class called MouseHandler. This class will extend the GLFWCursorPosCallback abstract class provided by the LWJGL3 framework. 

```java
package Input;

import org.lwjgl.glfw.GLFWCursorPosCallback;

// Our MouseHandler class extends the abstract class
// abstract classes should never be instantiated so here
// we create a concrete that we can instantiate
public class MouseHandler extends GLFWCursorPosCallback {

  @Override
  public void invoke(long window, double xpos, double ypos) {
    // TODO Auto-generated method stub
    // this basically just prints out the X and Y coordinates 
    // of our mouse whenever it is in our window
    System.out.println("X: " + xpos + " Y: " + ypos);
  }	
}
```

<h2>Making it Work</h2>

Now that we've created our MouseHandler class we need to put in the following code just below our GLFW Window initialization so that our invoke method will be called every time the cursor's position changes.

```java
glfwSetCursorPosCallback(window, mouseCallback = new MouseHandler());
```

And that should be it all done, you should now be seeing the cursors position outputted to the console. 

<img style="width: 100%; height: auto;" src="/uploads/articles/cursor-pos-console.PNG" />

<h2>Main Class</h2>

```java
import org.lwjgl.Sys;
import org.lwjgl.glfw.*;
import org.lwjgl.opengl.*;

import Input.KeyboardHandler;
import Input.MouseHandler;

import java.nio.ByteBuffer;
 

import static org.lwjgl.glfw.Callbacks.*;
import static org.lwjgl.glfw.GLFW.*;
import static org.lwjgl.opengl.GL11.*;
import static org.lwjgl.system.MemoryUtil.*;
 
public class HelloWorld {
 
  // We need to strongly reference callback instances.
  private GLFWErrorCallback errorCallback;
  private GLFWKeyCallback   keyCallback;
  private GLFWCursorPosCallback mouseCallback;

  // The window handle
  private long window;

  public void run() {
    System.out.println("Hello LWJGL " + Sys.getVersion() + "!");

    try {
      init();
      loop();

      // Release window and window callbacks
      glfwDestroyWindow(window);
      keyCallback.release();
    } finally {
      // Terminate GLFW and release the GLFWerrorfun
      glfwTerminate();
      errorCallback.release();
    }
  }

  private void init() {
    // Setup an error callback. The default implementation
    // will print the error message in System.err.
    glfwSetErrorCallback(errorCallback = errorCallbackPrint(System.err));

    // Initialize GLFW. Most GLFW functions will not work before doing this.
    if ( glfwInit() != GL11.GL_TRUE )
      throw new IllegalStateException("Unable to initialize GLFW");

    // Configure our window
    glfwDefaultWindowHints(); // optional, the current window hints are already the default
    glfwWindowHint(GLFW_VISIBLE, GL_FALSE); // the window will stay hidden after creation
    glfwWindowHint(GLFW_RESIZABLE, GL_TRUE); // the window will be resizable

    int WIDTH = 300;
    int HEIGHT = 300;

    // Create the window
    window = glfwCreateWindow(WIDTH, HEIGHT, "Hello World!", NULL, NULL);
    if ( window == NULL )
      throw new RuntimeException("Failed to create the GLFW window");

    // Setup a key callback. It will be called every time a key is pressed, repeated or released.
    glfwSetKeyCallback(window, keyCallback = new KeyboardHandler());


    glfwSetCursorPosCallback(window, mouseCallback = new MouseHandler());

    // Get the resolution of the primary monitor
    ByteBuffer vidmode = glfwGetVideoMode(glfwGetPrimaryMonitor());
    // Center our window
    glfwSetWindowPos(
      window,
      (GLFWvidmode.width(vidmode) - WIDTH) / 2,
      (GLFWvidmode.height(vidmode) - HEIGHT) / 2
    );

    // Make the OpenGL context current
    glfwMakeContextCurrent(window);
    // Enable v-sync
    glfwSwapInterval(1);

    // Make the window visible
    glfwShowWindow(window);
  }
  
  public void update(){
    if(KeyboardHandler.isKeyDown(GLFW_KEY_SPACE))
      System.out.println("Space Key Pressed");
  }

  private void loop() {
    // This line is critical for LWJGL's interoperation with GLFW's
    // OpenGL context, or any context that is managed externally.
    // LWJGL detects the context that is current in the current thread,
    // creates the ContextCapabilities instance and makes the OpenGL
    // bindings available for use.
    GLContext.createFromCurrent();

    // Set the clear color
    glClearColor(1.0f, 0.0f, 0.0f, 0.0f);

    // Run the rendering loop until the user has attempted to close
    // the window or has pressed the ESCAPE key.
    while ( glfwWindowShouldClose(window) == GL_FALSE ) {
      glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT); // clear the framebuffer

      glfwSwapBuffers(window); // swap the color buffers

      // Poll for window events. The key callback above will only be
      // invoked during this call.
      glfwPollEvents();
      
      update();
        
    }
  }

  public static void main(String[] args) {
    new HelloWorld().run();
  }
 
}
```