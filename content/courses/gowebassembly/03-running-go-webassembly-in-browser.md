---
author: Elliot Forbes
date: 2020-09-11T22:48:26+01:00
desc:
  In this tutorial, we are going to look at how you can run your newly compiled Go WebAssembly application in the Browser
image: golang.svg
paid: true
series: gowebassembly
tags:
  - gowebassembly
title: Running your Go WebAssembly App in the Browser
twitter: https://twitter.com/Elliot_F
video: 457423626
nextPage: /courses/gowebassembly/04-basic-dom-manipulation-webassembly-go/
weight: 3
authorImage: https://images.tutorialedge.net/authors/profile.jpeg
---

Now that we have been able to compile our Go application as a WebAssembly file and execute it with node. Let's take it a step further and try running this within a browser. 

Start off by creating a new `index.html` file within your project directory and then within here add the following:

```jsx
<html>
	<head>
		<meta charset="utf-8"/>
		<script src="wasm_exec.js"></script>
		<script>
			const go = new Go();
			WebAssembly.instantiateStreaming(fetch("main.wasm"), go.importObject).then((result) => {
				go.run(result.instance);
			});
		</script>
	</head>
	<body></body>
</html>
```

Next, you can try serve this using `live-server` which can be installed using `npm install -g live-server`

Let's open up our application and then open up the browser console before refreshing the page. When we refresh the page, we should see that our Go WebAssembly file has been successfully executed within the browser!