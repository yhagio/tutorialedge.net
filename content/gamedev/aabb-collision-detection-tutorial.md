+++
title = "AABB Collision Detection Tutorial"
draft = true
date = "2017-04-15T09:30:45+01:00"
desc = "This tutorial demonstrates how one can implement 2D Collision detection using AABB method. This is demonstrated in Java using the LWJGL 3 framework but the concepts are transferrable to all languages and frameworks."
series = ["gamedev"]
tags = ["java", "gamedev"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

<p>AABB Collision Detection or "Axis-Aligned Bounding Box" Collision detection as it stands for is the simplest form, or one of the simplest forms of collision detection that you can implement in a 2D game. If you have an object that is axis-aligned, ie. not rotated and doesn't need tight collision detection then AABB collision detection is the route you are going to want to take.</p>

## Implementing AABB Collision Detection in Java

<p>In order to be able to accurately perform Axis-Aligned Bounding Box collision detection you'll need at minimum the 4 following characteristics of the object you are wanting to make collidable.</p>

```java
class player {
  public int x = 5;
  public int y = 5;
  public int width = 50;
  public int height = 50;
}
```

<p>If we had 2 instantiated player objects then we could perform AABB collision detection using the following:</p>

```java
if(player1.x < player2.x + player2.width && 
    player1.x + player1.width > player2.x &&
    player1.y < player2.y + player2.height && 
    player1.y + player1.height > player2.y)
{
    System.out.println("Collision Detected");
}
```

<p>AABB is a very obvious and simple method to implement and is very useful in games where there are very few objects that could possibly collide. However should you wish to implement this form of collision detection in a game that features a huge number of collidable objects then this method will become far too computationally expensive and as such you will have to look at ways you can optimize these calculations.</p>

