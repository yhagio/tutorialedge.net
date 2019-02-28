---
author: Elliot Forbes
date: 2017-04-15T09:42:07+01:00
desc:
  This standalone tutorial looks to teach programmers how they can extend the
  LWJGL 3 library to create their own Input handlers which can be implemented
  into their own applications.
series: lwjgl3
image: lwjgl.jpg
tags:
  - lwjgl3
  - java
  - gamedev
title: LWJGL 3 Keyboard Input Handler Tutorial
twitter: https://twitter.com/Elliot_F
---

<p>This tutorial looks to demonstrate how you can extend the lightweight java game library in order to create your own input handlers which can be used in your games as a means for handling keyboard and mouse input.</p>

# The Observer Design Pattern

<p>The programmers who developed LWJGL 3 have used an observer design pattern as a way to implement input. The works by having one part of the system listening for input through all the various input devices whilst also keeping a list of classes that should be notified every time an event takes place. This has been explained in more detail in a tutorial dedicated to the Observer Design Pattern which I recommend if you wish to help improve your overall understanding of how LWJGL 3 works.</p>

# Creating a Keyboard Handler

<p>In order to keep the project tidy I recommend you create a new Package within your project and call it "Input" or something meaningful to that effect. Create a new class within this Package called KeyboardHandler. This KeyboardHandler class will look something like this:</p>

```java
package Input;

import org.lwjgl.glfw.GLFWKeyCallback;
import static org.lwjgl.glfw.GLFW.*;

public class KeyboardHandler extends GLFWKeyCallback{

  public static boolean[] keys = new boolean[65536];

  // The GLFWKeyCallback class is an abstract method that
  // can't be instantiated by itself and must instead be extended
  //
  @Override
  public void invoke(long window, int key, int scancode, int action, int mods) {
    // TODO Auto-generated method stub
    keys[key] = action != GLFW_RELEASE;
  }

  // boolean method that returns true if a given key
  // is pressed.
  public static boolean isKeyDown(int keycode) {
    return keys[keycode];
  }

}
```

# Making it Work

<p>Now that we've got our input handler class it's time to register our new class as a listener in the class that deals with OpenGL and GLFW initialization as this is where we will have to register our newly built class as a listener. At the top of your class add an declaration of the GLFWKeyCallback class like so:</p>

```java
// This prevents our window from crashing later on.
private GLFWKeyCallback keyCallback;
```

<p>Now that we've instantiated our keyCallBack class we can set this to equal our newly built KeyboardHandler class like so:</p>

```java
// Sets our keycallback to equal our newly created Input class()
glfwSetKeyCallback(window, keyCallback = new KeyboardHandler());
```

# Checking it Works

<p>Now that we've implemented our own KeyboardHandler class it's time to check to see if it works. We can do this by adding the following to our Update() function:</p>

```java
public void update(){
  if(KeyboardHandler.isKeyDown(GLFW_KEY_SPACE))
    System.out.println("Space Key Pressed");
}
```

# Main Class

```java
import org.lwjgl.Sys;
import org.lwjgl.glfw.*;
import org.lwjgl.opengl.*;

import Input.KeyboardHandler;

import java.nio.ByteBuffer;


import static org.lwjgl.glfw.Callbacks.*;
import static org.lwjgl.glfw.GLFW.*;
import static org.lwjgl.opengl.GL11.*;
import static org.lwjgl.system.MemoryUtil.*;

public class HelloWorld {

    // We need to strongly reference callback instances.
    private GLFWErrorCallback errorCallback;
    private GLFWKeyCallback   keyCallback;

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

# Video Tutorial

<iframe width="560" height="315" src="https://www.youtube.com/embed/_6b73ZxlQOg" frameborder="0" allowfullscreen></iframe>
