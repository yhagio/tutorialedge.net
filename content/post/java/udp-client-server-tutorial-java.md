+++
date = "2017-04-09T21:24:02+01:00"
title = "UDP Client Server Tutorial Java"
draft = true
desc = "In this tutorial we discuss how to set up a UDP client and server using datagramsockets in Java"
+++

In this tutorial we’ll be looking at how we can set up a UDP client and server using Java’s DatagramSocket’s. 

## UDP Server

~~~
package com.tutorialedge.server;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;

import org.apache.log4j.Logger;

import com.tutorialedge.driver.ServerDriver;

public class Server implements Runnable{
	final static Logger logger = Logger.getLogger(Server.class);
	
	private DatagramSocket serverSocket;
	
	private byte[] in;
	private byte[] out;
	
	/*
	 * Our constructor which instantiates our serverSocket
	 */
	public Server() throws SocketException{
		serverSocket = new DatagramSocket(10000);
	}

	public void run() {
		while(true){
			try {
				in = new byte[1024];
				out = new byte[1024];
				
				/*
				 * Create our inbound datagram packet
				 */
				DatagramPacket receivedPacket = new DatagramPacket(in, in.length);
				serverSocket.receive(receivedPacket);
				
				/*
				 * Get the data from the packet we've just received
				 * and transform it to uppercase.
				 */
				String text = new String(receivedPacket.getData());
				out = text.toUpperCase().getBytes();
				logger.info("String Received: " + text);
				
				/*
				 * Retrieve the IP Address and port number of the datagram packet
				 * we've just received
				 */
				InetAddress IPAddress = receivedPacket.getAddress();
				int port = receivedPacket.getPort();
				
				/*
				 * Create a DatagramPacket which will return our message back to the last system
				 * that we received from
				 */
				DatagramPacket sendPacket = new DatagramPacket(in, in.length, IPAddress, port);
				serverSocket.send(sendPacket);
			} catch (IOException e) {
				/*
				 * Handle our servers exception
				 */
				logger.info("Exception thrown: " + e.getLocalizedMessage());
			}
			
		}
	}
	
	
	
}
~~~

## UDP Client

~~~
package com.tutorialedge.client;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;

import org.apache.log4j.Logger;

import com.tutorialedge.server.Server;

public class Client implements Runnable{
	final static Logger logger = Logger.getLogger(Server.class);
	
	private BufferedReader inFromUser;
	private DatagramSocket clientSocket;
	private InetAddress IPAddress;
	
	/*
	 * Our byte arrays that we'll use to read in and send out to our UDP server
	 */
	private byte[] outData;
    private byte[] inData;
	
    /*
     * Our Client constructor which instantiates our clientSocket
     * and get's our IPAddress
     */
	public Client() throws SocketException, UnknownHostException{
		clientSocket = new DatagramSocket();
		IPAddress = InetAddress.getByName("localhost");
		inFromUser = new BufferedReader(new InputStreamReader(System.in));
	}
	
	private void shutdown(){
		clientSocket.close();
	}
	
	public void run() {
		logger.info("Client Started, Listening for Input:");
		/*
		 * Start a while loop that will run until we kill the program, this will continuously
		 * poll for user input and send it to the server.
		 */
		while(true){
			try {
				inData = new byte[1024];
				outData = new byte[1024];
				/*
				 * First we read in the users input from the console.
				 */
				System.out.print("> ");
				String sentence = inFromUser.readLine();
				outData = sentence.getBytes();
				
				/*
				 * Next we create a datagram packet which will allow us send our message back to our datagram server
				 */
				DatagramPacket out = new DatagramPacket(outData, outData.length, IPAddress, 10000);
				clientSocket.send(out);
				
				/*
				 * Once we've sent our message we create a second datagram packet which will
				 * let us receive a response.
				 */
				DatagramPacket in = new DatagramPacket(inData, inData.length);
				clientSocket.receive(in);
				
				/*
				 * Finally we log the response from the server using log4j
				 */
				String modifiedSentence = new String(in.getData());
				logger.info("Server >" + modifiedSentence);
				
			} catch (IOException e) {
				/*
				 * Here we need to capture any exceptions thrown by our application
				 */
				logger.error("Exception Thrown: " + e.getLocalizedMessage());
			}
		}
	}
}
~~~

## ServerDriver Class

~~~
package com.tutorialedge.driver;

import java.net.SocketException;

import org.apache.log4j.Logger;

import com.tutorialedge.server.Server;

public class ServerDriver {
	final static Logger logger = Logger.getLogger(ServerDriver.class);
	
	public static void main(String[] args) throws SocketException{
		logger.info("Networking Tutorial v0.01");
		new Thread(new Server()).start();
	}
	
}
~~~

## ClientDriver Class

~~~
package com.tutorialedge.driver;

import java.net.SocketException;
import java.net.UnknownHostException;

import org.apache.log4j.Logger;

import com.tutorialedge.client.Client;

public class ClientDriver {
	final static Logger logger = Logger.getLogger(ServerDriver.class);
	
	public static void main(String[] args) throws SocketException, UnknownHostException{
		logger.info("Starting Client...");
		new Thread(new Client()).start();
	}
	
}
~~~
