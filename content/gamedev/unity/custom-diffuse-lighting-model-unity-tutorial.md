---
title: "Creating a Custom Diffuse Lighting Model in Unity - Tutorial"
date: 2018-10-01T18:49:06+01:00
description: Learn how to create a custom diffuse lighting model in this tutorial by John P. Doran, a passionate and seasoned technical game designer and software engineer.
series: unity
tags:
- unity
- gamedev
twitter: https://twitter.com/jodoran
author: John P. Doran
---

If you are familiar with Unity 4, you may know that the default shader provided by it was based on a lighting model called the Lambertian reflectance. This article shows you how you can create a shader with a custom lighting model and explains the mathematics involved along with the implementation. The following diagram shows the same geometry rendered with a standard shader (right) and a diffuse Lambert one (left):

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/gamedev/unity/custom-diffuse-lighting-tutorial/image1-17.png)

Shaders based on the Lambertian reflectance are classified as non-photorealistic; no object in the real world looks like this. However, Lambert Shaders are often used in low-poly games as they produce a neat contrast between the faces of complex geometries. The lighting model used to calculate the Lambertian reflectance is also very efficient, making it perfect for mobile games.

The Lambertian lighting model provided by Unity is one of the more basic and efficient forms, which you can find in a lot of games even today. As it is already built into the Unity Surface Shader language, it is best to start with this first and build on it. 

# Create a new shader

Start by carrying out the following steps:

1. Create a new shader and give it a name (`SimpleLambert`).
1. Create a new material, give it a name (`SimpleLambertMat`), and assign the new shader to its `shader` property.
1. Then, create a sphere object, place it roughly in the center of the scene, and attach the new material to it.
1. Finally, create a directional light to cast some light on your object if one isn't created already.
1. When your assets have been set up in Unity, you should have a scene that resembles the following screenshot:

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/gamedev/unity/custom-diffuse-lighting-tutorial/image2-19.png)

Achieving the Lambertian Reflectance
The Lambertian reflectance can be achieved with the following changes to the shader:
Begin by replacing the shader's Properties block with the following :

```c#
Properties 
{
  _MainTex("Texture", 2D) = "white" 
}
```

Since you are removing all of the other properties, remove the `_Glossiness`, `_Metallic`, and `_Color` declarations inside the SubShader section.

Change the #pragma directive of the shader so that it uses your custom lighting model instead of Standard:

```c
#pragma surface surf SimpleLambert  
```

If you try to run the script now, it will complain that it doesn't know what the SimpleLambert lighting model is. You need to create a function called Lighting + the name that you gave here, with instructions on how to light the object, which you’ll learn later in this article. In this case, it would be LightingSimpleLambert.

Use a very simple surface function, which just samples the texture according to its UV data:

```c
void surf(Input IN, inout SurfaceOutput o) { 
  o.Albedo = tex2D(_MainTex, IN.uv_MainTex).rgb; 
} 
```

Add a function called LightingSimpleLambert() that will contain the following code for the Lambertian reflectance:

```c
// Allows us to use the SimpleLambert lighting mode
half4 LightingSimpleLambert (SurfaceOutput s, half3 lightDir, 
                             half atten) 
{ 
  // First calculate the dot product of the light direction and the 
  // surface's normal
  half NdotL = dot(s.Normal, lightDir); 

  // Next, set what color should be returned
  half4 color; 

  color.rgb = s.Albedo * _LightColor0.rgb * (NdotL * atten); 
  color.a = s.Alpha; 

  // Return the calculated color
  return color; 
} 
```

Save your script and return to the Unity editor. You should notice that it looks somewhat different than what it was before:

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/gamedev/unity/custom-diffuse-lighting-tutorial/image3-21.png)

The effect is even easier to see if you use cylinders:

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/gamedev/unity/custom-diffuse-lighting-tutorial/image4-23.png)

# How it works...

SimpleLambert forces Cg to look for a function called `LightingSimpleLambert()`. Note the Lighting at the beginning, which is omitted in the directive.

The Lighting function takes three parameters: the surface output (which contains physical properties such as the albedo and transparency), the direction the light is coming from, and its attenuation.

According to the Lambertian reflectance, the amount of light a surface reflects depends on the angle between the incident light and the surface normal. If you have played pool or billiards, you may surely be familiar with this concept; the direction of a ball depends on its incident angle against the wall. 

If you hit a wall at a 90-degree angle, the ball will come back at you; if you hit it with a very low angle, its direction will be mostly unchanged. The Lambertian model makes the same assumption; if the light hits a triangle at a 90-degree angle, all the light gets reflected back. The lower the angle, the less light is reflected back to you. This concept is shown in the following diagram:

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/gamedev/unity/custom-diffuse-lighting-tutorial/image5-25.png)

This simple concept has to be translated into a mathematical form. In vector algebra, the angle between two unit vectors can be calculated via an operator called dot product. When the dot product is equal to zero, two vectors are orthogonal, which means that they make a 90-degree angle. When it is equal to one (or minus one), they are parallel to each other. Cg has a function called dot(), which implements the dot product extremely efficiently.

The following diagram shows a light source (sun) shining on a complex surface. L indicates the light direction (called `lightDir` in the shader) and N is normal to the surface. The light is reflected with the same angle with which it hits the surface:

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/gamedev/unity/custom-diffuse-lighting-tutorial/image6-27.png)

The Lambertian reflectance simply uses the `NdotL` dot product as a multiplicative coefficient for the intensity of light:

![](https://s3-eu-west-1.amazonaws.com/images.tutorialedge.net/images/gamedev/unity/custom-diffuse-lighting-tutorial/image7-29.png)

When `N` and `L` are parallel, all the light is reflected back to the source, causing the geometry to appear brighter. The `_LightColor0` variable contains the color of the light that is calculated.

Prior to Unity 5, the intensity of the lights was different. If you are using an old diffuse shader based on the Lambertian model, you may notice that `NdotL` is multiplied by two: `(NdotL * atten * 2)`, rather than `(NdotL * atten)`. If you are importing a custom shader from Unity 4, you will need to correct this manually. Legacy Shaders, however, have already been designed taking this aspect into account.

When the dot product is negative, the light comes from the opposite side of the triangle. This is not a problem for opaque geometries as triangles that are not facing the camera frontally are culled (discarded) and not rendered.

This basic Lambert is a great starting point when you are prototyping your shaders. You can get a lot accomplished in terms of writing the core functionality of the shader while not having to worry about the basic Lighting functions.

Unity has provided you with a lighting model that has already taken the task of creating Lambert lighting for you. If you look at the `UnityCG.cginc` file found in your Unity's installation directory under the Data folder, you will notice that you have Lambert and `BlinnPhong` lighting models available for use. When you compile your shader with pragma surface surf Lambert, the shader utilizes Unity’s implementation of the Lambert Lighting function in the UnityCG.cginc file so that you don't have to write the code over and over again. 

# Conclusion

If you found this article interesting, you can explore [Unity 2018 Shaders and Effects Cookbook - Third Edition](https://amzn.to/2Iu9S0W) to bring realism to your games by mastering post-processing effects and advanced shading techniques in Unity 2018. Since their introduction to Unity, shaders have been seen as notoriously difficult to understand and implement in games. [Unity 2018 Shaders and Effects Cookbook - Third Edition](https://amzn.to/2Iu9S0W) changes that by giving you a recipe-based guide to creating shaders using Unity.
