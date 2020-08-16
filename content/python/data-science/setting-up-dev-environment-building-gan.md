---
title:
  "Setting Up your Development Environment for Building a Genetic Adversarial
  Network"
date: 2019-01-19T11:11:06Z
desc:
  Learn what it takes to set up the development environment you need to get
  started with Generative Adversarial Networks
author: Josh Kalin
twitter: https://amzn.to/2SYiQrA
series: python
image: python.svg
tags:
  - data-science
authorImage: https://images.tutorialedge.net/images/logo.svg
---

What's a development environment? Everyone thinks setting up
a development environment needs to be this incredibly arduous process. The
installation process could be worse. It's actually quite simple and this article
intends to show you the basics.

## Getting ready

Let's lay out the requirements for the equipment you'll need:

- GPU: 10 series CUDA-enabled Nidea GPU
- Operating system: Ubuntu Linux 16.04+
- CPU/RAM: i5 or i7 with at least 8 GB of RAM

First and foremost, the GPU is a requirement. Although these algorithms can
technically train on a CPU, it could take days in some cases for a single model
to converge. It can take a GPU a day or more to converge in some instances. GPUs
offer an immense computational power increase over CPUs and are hence a
necessity. It's easy today to find a laptop with a 1,060 or better in it for
around \$900.

Ubuntu is the typical operating system for this type of development. This
article will assume Ubuntu and Bash as the default interaction with the
operating system.

## How to do it...

There are a few common steps that will need to be for each new developer—these
steps will be addressed in the following subsections.

## Installing the NVIDIA driver for your GPU

Installing the correct NVIDIA driver is incredibly important. A key component 
is the usage of CUDA in TensorFlow. NVIDIA has this description for
the CUDA library:

> **"CUDA®** is a parallel computing platform and programming model developed by
> NVIDIA for general computing on graphical processing units (GPUs). With CUDA,
> developers are able to dramatically speed up computing applications by
> harnessing the power of GPUs."
> (Source: `https://developer.nvidia.com/cuda-zone`).

Using CUDA, TensorFlow can achieve drastic speedups in terms of processing
power. In order to make this happen, we need to have a certain type of GPU and
driver installed on the host machine.

So, let's start installing the things that we require.

In this section, a recommended driver will be specified and a few options for
installation will be proposed. It's hard to ensure that the installation will be
the same for each developer because the installation can vary for each machine
it's installed on. Instead, we'll show some methods on how to get it done but
will rely on you to figure out the nitty-gritties for their application.

You can run the nvidia-smi command to know which version of driver is installed
on your system.

The following is an example of the nvidia-smi command:

![nvidia-smi-command](https://images.tutorialedge.net/images/python/data-science/setting-dev-env-building-gan/image1-17.png)

The output of nvidia-smi will show your GPU any processes you have running and
the current driver version installed.

## Installing Nvidia-Docker

The following is an Nvidia-Docker hierarchy that you need to understand before
installing it:

![nvidia-docker](https://images.tutorialedge.net/images/python/data-science/setting-dev-env-building-gan/image2-19.png)

What is Docker? According to the Docker website, the keyword for it
is lightweight. Docker containers running on a single machine share that
machine's operating system kernel; they start instantly and use less compute and
RAM. Images are constructed from filesystem layers and share common files
(source: https://www.docker.com/what-container).

Essentially, Docker allows us to create a lightweight Virtual Machine (VM) in a
container where we can house all of our applications and guarantee that the
environment is going to be the same every time we enter this container.

NVIDIA-Docker goes one step further and provides the appropriate linkage for our
Docker containers to be able to interact with a GPU. This is a critical piece
for our development environment. Once we have NVIDIA-Docker set up, the rest of
the environment is fairly straightforward to integrate.

The installation is easy. It’s recommended that you visit the website and ensure
that the directions haven't changed since
publication: https://github.com/NVIDIA/nvidia-docker. At this time,
NVIDIA-Docker2 is the latest version of development. When you install the
NVIDIA-Docker2 system with these steps, it should allow you to upgrade
periodically with  sudo apt upgrade.

When going to the website, you should see a set of instructions similar to this
one:

```dockerfile
Ubuntu 14.04/16.04/18.04, Debian Jessie/Stretch
## If you have nvidia-docker 1.0 installed: we need to remove it and all existing GPU containers
docker volume ls -q -f driver=nvidia-docker | xargs -r -I{} -n1 docker ps -q -a -f volume={} | xargs -r docker rm -f
sudo apt-get purge -y nvidia-docker

## Add the package repositories
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | \
  sudo apt-key add -
distribution=$(. /etc/os-release;echo$ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | \
  sudo tee /etc/apt/sources.list.d/nvidia-docker.list
sudo apt-get update

## Install nvidia-docker2 and reload the Docker daemon configuration
sudo apt-get install -y nvidia-docker2
sudo pkill -SIGHUP dockerd

## Test nvidia-smi with the latest official CUDA image
docker run --runtime=nvidia --rm nvidia/cuda nvidia-smi
```

> **Note -** The instructions source is found
> at: https://github.com/NVIDIA/nvidia-docker.

Now, let's go over each of these commands in detail.

## Purging all older versions of Docker 

First things first—you have to wipe out all the old versions of Docker prior to
this installation. The folks maintaining this repository conveniently provided a
few commands. The first command removes all old versions of Docker:

```s
$ docker volume ls -q -f driver=nvidia-docker | xargs -r -I{} -n1 docker ps -q -a -f volume={} | xargs -r docker rm -f
```

After completing this command, the next step is to use the purge method
in apt-get to remove any previous installations of NVIDIA-Docker from your
previous work:

```s
$ sudo apt-get purge -y nvidia-docker
```

Here, we've completed our step 1 installation!

## Adding package repositories

Now that you've removed all of the older versions of NVIDIA-Docker, it's time to
add the keys and repository to the typical apt-get repositories that you can
pull from. First, in the Installing NVIDIA-Docker recipe, you need to add the
appropriate key for apt-get to communicate with the NVIDIA-Docker repository:

```s
$ curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | \
  sudo apt-key add -
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
```

After adding the key, add the repo to the sources that apt-get can pull from
when installing packages:

```s
$ curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | \
  sudo tee /etc/apt/sources.list.d/nvidia-docker.list
```

Finally, an apt-get update allows apt-get to update its list of installable
packages. Since we just added a new repository, the update will allow us to
install the NVIDIA-Docker repository in the next step:

```s
sudo apt-get update
```

Now we move on to the next step.

## Installing NVIDIA-Docker2 and reloading the daemon

This is the point you've been waiting for! (Probably not.) Use apt-get to
install the nvidia-docker2 package:

```s
sudo apt-get install -y nvidia-docker2
```

Next, use pkill to restart the Docker daemon after the installation:

```s
$ sudo pkill -SIGHUP dockerd
```

Now, you're ready for a simple test of the installation.

## Testing nvidia-smi through the Docker container

This is the moment of truth—if this command runs correctly, you should see
the nvidia-smi output that you see on your machine outside of the container:
docker run --runtime=nvidia --rm nvidia/cuda nvidia-smi Your output should look
similar to the nvidia-smi command example we showed in the Installing NVIDIA
driver for your GPU section:

![](https://images.tutorialedge.net/images/python/data-science/setting-dev-env-building-gan/image3-21.png)

Now you're ready to move onto actually building a development environment.

## Building a container for development

What's a container? A container is Docker's name for a VM with a certain
configuration of operating system and software. Docker containers allow you the
flexibility to have a different development environment for every new project
with minimal downtime.

This section will simply explain a small example Dockerfile to give you an idea
of how powerful these particular tools are. Here's the example we are going to
cover:

```dockerfile
FROM nvidia/cuda:9.0-cudnn7-devel-ubuntu16.04
ARG KERAS=2.2.0
ARG TENSORFLOW=1.8.0

## Update the repositories within the container

RUN apt-get update

## Install Python 2 and 3 + our basic dev tools

RUN apt-get install -y \
          python-dev \
          python3-dev \
          curl \
          git \
          vim

## Install pip

RUN curl -O https://bootstrap.pypa.io/get-pip.py &amp;&amp; \
         python get-pip.py &amp;&amp; \
         rm get-pip.py

## Install Tensorflow and Keras

RUN pip --no-cache-dir install \
         tensorflow_gpu==${TENSORFLOW} \
         keras==${KERAS}
```

This is the basics of how you will build a basic image, called base_image.

> **Note -** Here are a few topics to cover in case you are curious about how
> the RUN commands work in
> Dockerfiles: https://docs.docker.com/engine/reference/run/.

## Conclusion

If you enjoyed reading this article and are curious about building GANs, you can
explore [Generative Adversarial Networks Cookbook](https://amzn.to/2SYiQrA).
With over 100 recipes to build generative models using Python, TensorFlow, and
Keras, Generative Adversarial Networks Cookbook is a must-read for data
scientists, machine learning developers, and deep learning practitioners looking
for a quick reference to tackle challenges and tasks in the GAN domain.
