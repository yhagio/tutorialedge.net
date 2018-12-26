---
title: "Go Encryption and Decryption using AES - Tutorial"
date: 2018-11-20T07:56:42Z
description: In this tutorial, wwe are going to look at how you can do both encryption and decryption using AES in Go
date: 2018-09-27T10:48:51+01:00
series: golang
image: golang.png
tags:
- advanced
author: Elliot Forbes
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
weight: 34
---

# Objectives

By the end of this tutorial, you will be able to...

1. Encrypt text using the AES - Advanced Encryption Standard in Go
1. We'll then look at writing this encrypted message to a file
1. Finally we'll look at how we can decrypt this message using a shared secret

From this, you should be able to build your own simple encryption systems that can do various things like, encrypt files on your file system and protect them with a passphrase only you know or add simple encryption to various parts of the systems that you are working on.

# Introduction

We'll start off by looking at the AES, or Advanced Encryption Standard, as that is the standard we will be using to encrypt and decrypt the information within our Go programs.

Then we'll build up a really simple encryption program which will take in a passphrase from the command line and use this in conjunction with AES to encrypt a passage of text.

Once this is done, we'll create a counterpart program which will decrypt this passage of text using that same passphrase we used to encrypt our text.

# AES - Advanced Encryption Standard

So AES, or the Advanced Encryption Standard, is a symmetric key encryption algorithm that was originally developed by two Belgian cryptographers - Joan Daemen, and Vincent Rijmen.

If you are wanting to use encryption within any of your programs and aren't quite sure about how they all differ, then AES is definitely the safest option to choose from due to both it's efficiency and ease of use.

> **Note -** I'll be covering other encryption techniques in future tutorials, so make sure that you follow me on twitter: [@Elliot_f](https://twitter.com/elliot_f)

## Symmetric Key Encryption

If you haven't come across the term symmetric key encryption, then fear not, it's a relatively simple concept that essentially allows two parties to encrypt and decrypt information using a shared secret. 

# Our Encryption Client

Ok, let's jump into our code editor of choice and start writing some code! 

We'll start by creating a new file called `encrypt.go` which will contain take in a passphrase from the command line and subsequently use this to encrypt some text before writing this to a file.

Let's start by simply encrypting a piece of text with a pre-set key and printing out the results. Once we have this mastered, we can introduce more complexity:

```go
package main

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"fmt"
	"io"
)

func main() {
	fmt.Println("Encryption Program v0.01")

	text := []byte("My Super Secret Code Stuff")
	key := []byte("passphrasewhichneedstobe32bytes!")

	// generate a new aes cipher using our 32 byte long key
	c, err := aes.NewCipher(key)
	// if there are any errors, handle them
	if err != nil {
		fmt.Println(err)
	}

	// gcm or Galois/Counter Mode, is a mode of operation
	// for symmetric key cryptographic block ciphers
	// - https://en.wikipedia.org/wiki/Galois/Counter_Mode
	gcm, err := cipher.NewGCM(c)
	// if any error generating new GCM
	// handle them
	if err != nil {
		fmt.Println(err)
	}

	// creates a new byte array the size of the nonce
	// which must be passed to Seal
	nonce := make([]byte, gcm.NonceSize())
	// populates our nonce with a cryptographically secure
	// random sequence
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		fmt.Println(err)
	}

	// here we encrypt our text using the Seal function
	// Seal encrypts and authenticates plaintext, authenticates the
	// additional data and appends the result to dst, returning the updated
	// slice. The nonce must be NonceSize() bytes long and unique for all
	// time, for a given key.
	fmt.Println(gcm.Seal(nonce, nonce, text, nil))
}
```

So, if we try and run this with `go run encrypt.go` you should see that it prints out both `Hello World` and an array of bytes which represent our encrypted `text`.

Let's try and write this to a file now by adding a call to `ioutile.WriteFile`, in place of our final `fmt.Println` statement:

```go
// the WriteFile method returns an error if unsuccessful
err = ioutil.WriteFile("myfile.data", gcm.Seal(nonce, nonce, text, nil), 0777)
// handle this error
if err != nil {
  // print it out
  fmt.Println(err)
}
```

> For more information on reading and writing files in Go, I suggest you check out my aptly named article - [Reading and Writing to Files in Go](/golang/reading-writing-files-in-go/).

## Testing it Out

Once we have finished making these changes to our `encrypt.go` file, we can try testing it out:

```s
$ go run encrypt.go
```

If this runs successfully, you should see a new file created within your project's directory called `myfile.data`. If you open this up, you should see the results of your encryption!

# Our Decryption Client

Now that we've covered encryption and writing our encrypted message to a file, let's now have a look at reading from that file and trying to decrypt that using the same shared key.

We'll start by using `ioutil.ReadFile('myfile.data')` in order to read in the encrypted text as a byte array. Once we have this byte array, we'll be able to subsequently follow very similar steps as we did for the encryption side of things. 

1. First we need to create a new Cipher using the `aes.NewCipher` function, passing in our shared key as it's primary parameter.
1. Next, we need to generate our GCM
1. After that we need to get our Nonce size using `gcm.NonceSize()`
1. Finally we will decrypt our encrypted `ciphertext` using the `gcm.Open()` function which returns both our `plaintext` and/or an `error` if there is any.

```go
package main

import (
	"crypto/aes"
	"crypto/cipher"
	"fmt"
	"io/ioutil"
)

func main() {
	fmt.Println("Decryption Program v0.01")

	key := []byte("passphrasewhichneedstobe32bytes!")
	ciphertext, err := ioutil.ReadFile("myfile.data")
	// if our program was unable to read the file
	// print out the reason why it can't
	if err != nil {
		fmt.Println(err)
	}

	c, err := aes.NewCipher(key)
	if err != nil {
		fmt.Println(err)
	}

	gcm, err := cipher.NewGCM(c)
	if err != nil {
		fmt.Println(err)
	}

	nonceSize := gcm.NonceSize()
	if len(ciphertext) < nonceSize {
		fmt.Println(err)
	}

	nonce, ciphertext := ciphertext[:nonceSize], ciphertext[nonceSize:]
	plaintext, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(plaintext))
}
```

## Testing it Out

Awesome, so now that we have finished writing our `decrypt.go` program, we can try it out. 

```s
$ go run decrypt.go
Decryption Program v0.01
My Super Secret Code Stuff
```

As you can see from the output, we have been able to successfully read the encrypted contents of our `myfile.data` file and subsequently decrypt it using our shared secret key. 

# Challenge - Encrypted FileSystem

If you are interested in a challenge, a cool way to test what you have learned in this tutorial would be to try and extend the existing program that we've created above to encrypt and decrypt any files given to it using a passphrase.

You could potentially turn this into a CLI that accepts flags and filepaths as input and outputs them in encrypted form to your current location. 

* [Building a CLI in Go](/golang/building-a-cli-in-go/)

# Conclusion

So, in this tutorial we have successfully covered a number of cool concepts such as symmetric encryption algorithms, and how to encrypt and decrypt information using the Advanced Encryption Standard and a secret key.

I had a lot of fun writing this and hopefully you enjoyed it! If you did, or if you have any feedback, then I would love to hear it in the comments section below!

> **Note -** If you want to keep track of when new Go articles are posted to the site, then please feel free to follow me on twitter for all the latest news: [@Elliot_F](https://twitter.com/elliot_f).