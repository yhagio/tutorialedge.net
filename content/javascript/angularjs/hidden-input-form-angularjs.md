+++
date = "2017-04-15T08:35:56+01:00"
title = "Using Hidden Input in a Form in AngularJS"
draft = true
desc = "Another useful code snippet for those of you dealing with angularjs applications."
tags = ["angularjs", "javascript"]
series = ["angularjs"]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

<p>This ended up being an interesting little problem for me during one of my programming sessions. Below you'll find a couple of different methods that you can use to pass hidden data to any form submission using AngularJS.</p>

#### Method 1

```html
<input type="text" name="someData" ng-model="data" style="display: none;"/>
```