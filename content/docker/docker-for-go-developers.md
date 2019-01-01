---
author: Elliot Forbes
date: 2018-07-14T22:33:43+01:00
desc: In this course, we will be taking a look at everything you need to know about
  Docker if you are a golang based developer
image: docker.png
series: docker
tags:
- docker
title: Docker for Go Developers
twitter: https://twitter.com/Elliot_F

---

In this tutorial, we are going to look at how we can leverage Docker as Go developers. 

By the end of this tutorial, we will have covered the following topics:

* Creating a Simple Dockerfile for a simple Go Program
* Mounting Volumes in Docker
* Auto-build on changes

# A Simple Example

```dockerfile
FROM base
CMD go run ./...
```

```s
$ docker build -t my-go-image .
```

```s
$ docker run -it -p 8080:8080 my-go-image
```

# Mounting Volumes

```dockerfile
FROM base
MOUNT stuff
```

```s
$ docker build -t
```

# Conclusion

So, in this tutorial, we covered how we can use Docker for fame and fortune 