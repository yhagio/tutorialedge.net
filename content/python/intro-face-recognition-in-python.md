---
author: Elliot Forbes
date: 2017-11-05T17:42:45Z
desc: An absolute beginners introduction to writing face recognition software in Python
series: python
image: python-logo.png
tags:
- ai
title: An Introduction to Face Recognition in Python
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

> This tutorial was written with Python 3.6, however the library used is compatible with versions 3.3 and above.

Face recognition software is awesome. The fact that we are able to write software that accurately picks out where someone's eyes and nose reside within an image still astounds me and the fact that there are libraries out there for this sort of things is awesome. These libraries help to lower the barrier to entry for beginners looking to write their own face recognition systems and allow people to do some really cool things.

[ageitgey/face_recognition](https://github.com/ageitgey/face_recognition) is one such library and at the time of writing this it features well over `7,000` stars on github.

# Setting up

In order to get started with the `face_recognition` library you will first have to install it, this can be done with a simple `pip` install command like so:

```py
pip3 install face_recognition
```

# A Simple Example

Let's take a stock image with a number of people in it. If we wanted to automatically find all of the faces in an image, we could easily do that in 4 lines of code. This code will first take in an image and then will compute the locations of all faces using `face_recognition.face_locations(image)`. After we will simply print out the number of faces that were found.

```py
import face_recognition

image = face_recognition.load_image_file("My_Image.png")
face_locations = face_recognition.face_locations(image)
print("I found {} face(s) in this photograph.".format(len(face_locations)))
``` 

![stock photo](/images/stock_people.jpg)

If I were to run this against the image above I would get the following output:

```py
 $ python3.6 simple.py
I found 5 face(s) in this photograph.
```

This is an example of face detection and you could potentially sync this up with something like a security camera and perform real-time analysis using this detection algorithm to see if someone has just walked into your house for example. 

# Identifying Faces

A more complex example would be identifying the exact coordinates of each of the faces found and translating those coordinates into separate images. 

Say we wanted to take the example above a step further and store the faces that we've detected in our new security software. This can be done like so using the `face_recognition` library:

```py
from PIL import Image
import face_recognition

# Load the jpg file into a numpy array
image = face_recognition.load_image_file("stock_people.jpg")

# Find all the faces in the image using the default HOG-based model.
# This method is fairly accurate, but not as accurate as the CNN model and not GPU accelerated.
# See also: find_faces_in_picture_cnn.py
face_locations = face_recognition.face_locations(image)

print("I found {} face(s) in this photograph.".format(len(face_locations)))

for face_location in face_locations:

    # Print the location of each face in this image
    top, right, bottom, left = face_location
    print("A face is located at pixel location Top: {}, Left: {}, Bottom: {}, Right: {}".format(top, left, bottom, right))

    # You can access the actual face itself like this:
    face_image = image[top:bottom, left:right]
    pil_image = Image.fromarray(face_image)
    pil_image.show()
```

Running this would give the following output and it would open the 5 temporary image files.

```py
 $ python3.6 simple.py
I found 5 face(s) in this photograph.
A face is located at pixel location Top: 72, Left: 394, Bottom: 124, Right: 446
A face is located at pixel location Top: 32, Left: 467, Bottom: 94, Right: 529
A face is located at pixel location Top: 72, Left: 285, Bottom: 124, Right: 337
A face is located at pixel location Top: 72, Left: 170, Bottom: 124, Right: 222
A face is located at pixel location Top: 39, Left: 87, Bottom: 101, Right: 149
```

Pretty cool, huh? Again you could potentially run this across a series a video stream and capture all of the faces that appear within that video. 

If you weren't interested in concepts such as face recognition which we'll be covering below, you could potentially start doing cool things such as sentiment analysis and try to guage how happy or sad people are within your videos.

This could be useful if you were trying to get real-time feedback on how well an attraction is doing at a museum or an amusement park!

# Checking if A Person Exists Within an Image

Recognizing that an image contains multiple faces is pretty cool but we can actually take this one step further and determine who exists within an image. Say for instance you have a photo of a group of people, you could determine using the `face_recognition` library whether your friend `Alan` exists within that photo. 

In order for this to work however you need at least one reference image of the people you are trying to identify.

```py
import face_recognition

# Load in our reference image of Joe Biden
known_image = face_recognition.load_image_file("biden.jpg")
# Load in our image of a group of people
unknown_image = face_recognition.load_image_file("unknown.jpg")

# Create a biden encoding
biden_encoding = face_recognition.face_encodings(known_image)[0]
# create an encoding based off our group photo
unknown_encoding = face_recognition.face_encodings(unknown_image)[0]

# Compare the encodings and try to determine if Biden exists within a photo
results = face_recognition.compare_faces([biden_encoding], unknown_encoding)
# Print the results
print(results)
```

Large scale face recognition systems tend to build up big databases of people and their faces. As more faces get added to a database, checking to see who exists within a photo or series of photos becomes more expensive. 

This means we couldn't take a photo of everyone in the world and expect our software to be able to tell us in real-time who exists within any given photo. 

# Conclusion

This was a fairly simple introduction to the art of facial recognition software and hopefully you found it both useful and interesting. In this tutorial we managed to cover both face detection and face recognition. 

If you require further assistance or wish to chat then please leave a comment in the comments section below or tweet me: [@Elliot_f](https://twitter.com/elliot_f).