---
title: "Uploading Files in Go - Tutorial"
date: 2019-02-09T18:32:11Z
desc:
  In this tutorial, we are going to be looking at how you can implement a simple
  File Upload HTTP endpoint within your Go systems.
author: Elliot Forbes
twitter: https://twitter.com/elliot_f
series: golang
image: golang.svg
tags:
  - File Upload
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

Hi everybody! In this tutorial, we are going to be building a really simple
file-upload HTTP server that allows you to upload your files to the server
running your Go application.

There are countless different reasons why you would want to do this, you could
be uploading CSV reports for further processing within your complex financial
system, or you could be creating a cool image manipulation app that allows you
to modify various aspects of any photos you want to upload.

Thankfully, the task of dealing with image uploading in Go is fairly simple and,
coupled with the new `TempFile` API introduced in Go version 1.11, we can come
up with a really elegant system fairly quickly!

> **Note -** You can read more about the TempFile api in my other tutorial here:
> [Go Temporary Files and Directories](/golang/temporary-files-directories-go-111/)

# Video Tutorial

{{< youtube id="0sRjYzL_oYs" autoplay="false" >}}

# The Implementation

We'll start off by creating a really simple HTTP server using the `net/http`
package. This will feature just the one solitary endpoint which will be our
`/upload` endpoint.

```go
// main.go
package main

import (
    "net/http"
    "fmt"
)

func uploadFile(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Uploading File")
}

func setupRoutes() {
    http.HandleFunc("/upload", uploadFile)
    http.ListenAndServe(":8080", nil)
}

func main() {
    fmt.Println("hello World")
}
```

If we want to run this, we can do so by running `go run main.go` and if we
haven't made any mistakes, we should see our server starting up successfully.

Ok, so now that we have a base to build on top of, let's set about implementing
our upload endpoint to handle file uploads.

```go
package main

import (
    "fmt"
    "io/ioutil"
    "net/http"
)

func uploadFile(w http.ResponseWriter, r *http.Request) {
    fmt.Println("File Upload Endpoint Hit")

    // Parse our multipart form, 10 << 20 specifies a maximum
    // upload of 10 MB files.
    r.ParseMultipartForm(10 << 20)
    // FormFile returns the first file for the given key `myFile`
    // it also returns the FileHeader so we can get the Filename,
    // the Header and the size of the file
    file, handler, err := r.FormFile("myFile")
    if err != nil {
        fmt.Println("Error Retrieving the File")
        fmt.Println(err)
        return
    }
    defer file.Close()
    fmt.Printf("Uploaded File: %+v\n", handler.Filename)
    fmt.Printf("File Size: %+v\n", handler.Size)
    fmt.Printf("MIME Header: %+v\n", handler.Header)

    // Create a temporary file within our temp-images directory that follows
    // a particular naming pattern
    tempFile, err := ioutil.TempFile("temp-images", "upload-*.png")
    if err != nil {
        fmt.Println(err)
    }
    defer tempFile.Close()

    // read all of the contents of our uploaded file into a
    // byte array
    fileBytes, err := ioutil.ReadAll(file)
    if err != nil {
        fmt.Println(err)
    }
    // write this byte array to our temporary file
    tempFile.Write(fileBytes)
    // return that we have successfully uploaded our file!
    fmt.Fprintf(w, "Successfully Uploaded File\n")
}

func setupRoutes() {
    http.HandleFunc("/upload", uploadFile)
    http.ListenAndServe(":8080", nil)
}

func main() {
    fmt.Println("Hello World")
    setupRoutes()
}

```

Awesome, we can try running this and seeing if everything else works by again
calling `go run main.go` within our terminal.

# The Frontend

We'll need a really simple HTML frontend that will act as our portal for
uploading our files. We won't bother with any of the more complex aspects such
as authentication and user management, we'll just create a really simple `form`
element that will allow us to select a file from our local machine and hit the
API endpoint we have defined above!

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <form
      enctype="multipart/form-data"
      action="http://localhost:8080/upload"
      method="post"
    >
      <input type="file" name="myFile" />
      <input type="submit" value="upload" />
    </form>
  </body>
</html>
```

Awesome, we can now test that what we have done works and it successfully
uploads our files!

Try opening up this `index.html` file within your browser and try uploading a
file to our running web server.

You should see that a new file has been generated in the `temp-images/`
directory that follows the convention `upload-23421432.png`.

# Conclusion

> **Source Code** - The full source code for this project can be found here: [TutorialEdge/go-file-upload-tutorial](https://github.com/TutorialEdge/go-file-upload-tutorial)

Hopefully you found this tutorial useful and entertaining! If you did, or you
spotted anything wrong with the tutorial, then please feel free to let me know
through the suggestion section below!

> **Note -** If you want to keep track of when new Go articles are posted to the
> site, then please feel free to follow me on twitter for all the latest news:
> [@Elliot_F](https://twitter.com/elliot_f).
