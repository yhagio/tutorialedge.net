+++
date = "2017-04-15T09:39:43+01:00"
title = "LWJGL 3 Orthographic Camera Tutorial"
draft = true
desc = "This tutorial teaches the user how to create an orthographic projection camera using matrix translation and rotation with the LWJGL 3 framework."
series = ["lwjgl3"]
tags = ["gamedev", "java", "lwjgl3", "graphics"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

<p>This tutorial leads on from some of the topics covered in my previous tutorial : How Matrices are used in Game Development so if you haven’t got a good grounding in matrices then I suggest you check that out first. There are several YouTube videos out there that expertly cover the topic of matrices as well so check them out!</p>

<h2>Orthographic Projection Camera</h2>

<p>Orthographic cameras are a means of representing 3D points in our game world on a 2D monitor/screen. This basically means that you see objects moving away from the camera getting smaller and thus this is perfect for our 2D games. One of the key things you have to understand from the beginning is that there is no ‘physical’ camera object, the camera is basically represented by a matrix that we can translate, rotate or scale depending on however we need to move the camera.</p>

<p>In this tutorial we will be building the basic Orthographic projection matrix that is primarily used in 2D games. This orthographic matrix is one of the simplest camera matrices and doesn’t show any form of perspective to our objects in our scenes. Without any form of perspective we will never see objects getting smaller as they go further into the distance, but seeing as 2D games are only represented in terms of X and Y coordinates we don’t tend to worry about perspective in our scenes.</p>

<p>To create an orthographic matrix we will need 6 float variables:</p>


1. left
2. right
3. bottom
4. top
5. near
6. far

<p>These will represent the positions of the clipping planes.</p>

<h2>Representing our Matrix in Code:</h2>

<p>I wont go into the specifics of how these matrices work as I’m pretty sure there are a hundred different YouTube videos that go to great lengths to describe these things, but I will go onto say that all of this code follows Column-major order just to avoid confusion.</p>

~~~java
// Gives us our orthographic matrix
  public static Matrix4f orthographic(float left, float right, float bottom, float top, float near, float far){
  Matrix4f matrix = new Matrix4f();

  matrix.elements[0 + 0 * 4] = 2.0f / (right - left);
  matrix.elements[1 + 1 * 4] = 2.0f / (top - bottom);
  matrix.elements[2 + 2 * 4] = 2.0f / (near - far);

  matrix.elements[0 + 3 * 4] = (left + right) / (left - right);
  matrix.elements[1 + 3 * 4] = (bottom + top) / (bottom - top);
  matrix.elements[2 + 3 * 4] = (far + near) / (far - near);

  matrix.elements[3 + 3 * 4] = 1.0f;

  return matrix;
}
~~~

<p>By doing this we can now create a projection matrix in our initialization using this new method. In the demonstration code this is done like so in our main class:</p>

~~~java
Matrix4f pr_matrix = Matrix4f.orthographic(-10.0f, 10.0f, -10.0f * 9.0f / 16.0f, 10.0f * 9.0f / 16.0f, -10.0f, 10.0f);
~~~

<h2>Creating Camera Controls</h2>

<p>So now that we’ve got a matrix that will represent our projection matrix, we will also need some way of tracking and updating where our camera is in the world. We can do this by adding a Vector3f to our Camera class and calling it ‘position’. This will essentially store the coordinates of our camera and allow us to move the camera using the following update method:</p>

~~~java
public void update(){		
  if(Input.isKeyDown(GLFW_KEY_W)){
    position.y += 0.05f;
  }
  if(Input.isKeyDown(GLFW_KEY_S)){
    position.y -= 0.05f;
  }
  if(Input.isKeyDown(GLFW_KEY_D)){
    position.x += 0.05f;
  }
  if(Input.isKeyDown(GLFW_KEY_A)){
    position.x -= 0.05f;
  }
}
~~~

<h2>Updating Every Model in our Game</h2>

<p>The way that the game engine has been implemented is that every object currently uses the one shader which looks something like this:</p>

~~~c
#version 330 core

layout ( location = 0 ) in vec4 position;
layout ( location = 1 ) in vec2 tc;

uniform mat4 pr_matrix;
uniform mat4 vw_matrix;
uniform mat4 ml_matrix = mat4(1.0);

out DATA
{
	vec2 tc;
} vs_out;

void main()
{
	gl_Position = pr_matrix * vw_matrix * ml_matrix * position;
	vs_out.tc = tc;
}
~~~

<p>By adding in the uniform mat4 variable vw_matrix, we can then pass our camera’s view matrix into our shader and multiply the gl_Position variable by the view matrix and update our camera.</p>

<p>In order for us to pass in our view matrix to our shader we have added the following line to our Main class.</p>

~~~
Shader.shader1.setUniformMat4f("vw_matrix", Matrix4f.translate(camera.position));
~~~

<h2>Conclusions</h2>

<p>So that should be all you need to get yourself up and running with the demonstration code and your own orthographic projection matrix! If you feel you need more detail on the subject then please leave a comment in the comments section below and I’ll try my best to expand upon the explanations already given!</p>

<p>You can find the repository for the example code here: <a href="https://github.com/emforce/AlgebraTutorial">Github Repo</a></p>