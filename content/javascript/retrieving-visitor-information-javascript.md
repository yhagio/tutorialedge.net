---
author: Elliot Forbes
date: 2017-04-15T08:40:42+01:00
desc: In this tutorial I'll be demonstrating how you can effectively retrieve all
  the information possible about any visitors to your website using a very simple
  javascript snippet
series: javascript
tags:
- javascript
title: Retrieving Website Visitor Information Using Javascript
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

<p>In this tutorial I'll be demonstrating how you can retrieve key information about all your website visitors using a very simple javascript snippet. This could in theory be placed on all your website's pages and then returned to a REST API which then stores this information for you to analyse in the future. I thought this would be an interesting little snippet for those of you thinking of rolling your own google analytics-like tracking.</p>

<h2>The Web Page</h2>

```html
<html>
    <head>
        <title>Analytics Engine Test Page</title>
    </head>
    <body>
        
        <h1>This is my test webpage</h1>
        
        <script src="analytics.js"></script>
    </body>
</html>
```

<h2>The JavaScript File</h2>

```js
console.log("Cookies: " + navigator.cookieEnabled);
console.log("Browser Language: " + navigator.browserLanguage);
console.log("Language: " + navigator.language);
console.log("Platform: " + navigator.platform);
console.log("Connection Speed: " + navigator.connectionSpeed);
console.log("User Agent: " + navigator.userAgent);
console.log("Webdriver: " + navigator.webdriver);
console.log("Geolocation: " + navigator.geolocation);
```

# Conclusion

If you visit this web page in your browser of choice and open up the console, you should see just about everything you can see about yourself displayed in the console.
