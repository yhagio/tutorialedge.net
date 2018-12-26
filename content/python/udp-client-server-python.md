---
author: Elliot Forbes
date: 2017-04-15T09:49:35+01:00
desc: This tutorial shows the user how to construct a UDP based client and server
  application
series: python
image: python-logo.png
tags:
- networking
title: UDP Client and Server Tutorial in Python
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

<p>In this tutorial I'll be showing you exactly how you can set up your own UDP chat server using CPython 3.3 and Python's Socket module. The end product will be a server that listens for all connections and messages over a specific port and prints out any messages to the console. This could be extended in the future to create a chat server that subsequently broadcasts any messages received to all parties listening for responses.</p>

# Advantages of UDP in Games Programming

<p>UDP or User Datagram Protocol is connection-less protocol which is suitable for applications that require efficient communication that doesn't have to worry about packet loss. For gaming applications this tends to be the perfect protocol due to the lower overhead incurred as opposed to TCP. Typically games send and receive thousands of packets a second that contain information such as opposing players health, location, direction and so on. Now if one of these packets was to be dropped during transmission then it isn't too critical to the game and the worst case scenario is that a player jerks about for a split second during gameplay. </p>

# Implementing the Client

<p>To begin with we will need to import the socket python module, this can be done like so:</p>

```py
import socket
```

<p>Once we''ve got this we need to declare the IP address that we will be trying to send our UDP messages to as well as the port number. This port number is arbritary but ensure that you aren''t using a socket that has already been taken.</p>

```py
UDP_IP_ADDRESS = "127.0.0.1"
UDP_PORT_NO = 6789
Message = "Hello, Server"
```

<p>Now that we've declared these few variables it''s time to create the socket through which we will be sending our UDP message to the server.</p>

```py
clientSock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
```

<p>And finally, once we've constructed our new socket it's time to write the code that will send our UDP message:</p>

```py
clientSock.sendto(Message, (UDP_IP_ADDRESS, UDP_PORT_NO))
```

# Implementing the Server

<p>Now that we''ve coded our client we then need to move on to creating our server program which will be continuously listening on our defined IP address and port number for any UDP messages. It is essential that this server has to be run prior to the execution of the client python script or the client script will fail.</p>

```py
# Again we import the necessary socket python module
import socket
# Here we define the UDP IP address as well as the port number that we have 
# already defined in the client python script.
UDP_IP_ADDRESS = "127.0.0.1"
UDP_PORT_NO = 6789
```

<p>Once we''ve imported the socket module and declared our ip address and port number we can create another socket which will look exactly like the socket we constructed in our client program.</p>

```py
# declare our serverSocket upon which
# we will be listening for UDP messages
serverSock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
# One difference is that we will have to bind our declared IP address
# and port number to our newly declared serverSock
serverSock.bind((UDP_IP_ADDRESS, UDP_PORT_NO))
```

<p>And finally, once we've created our server socket, we need to write the code that will keep our script continuously listening to this socket until its termination. This takes form as a simple while loop, like so:</p>

```py
while True:
    data, addr = serverSock.recvfrom(1024)
    print "Message: ", data
```
