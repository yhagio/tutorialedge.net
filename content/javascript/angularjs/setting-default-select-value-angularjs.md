+++
date = "2017-04-15T08:37:21+01:00"
title = "Setting a Default Value for Select Elements in AngularJS"
draft = true
desc = "This is just a quick little code snippet showing how you can set an angularjs select box to a certain value on pageload"
tags = ["angularjs", "javascript"]
series = [ "angularjs" ]
author = "Elliot Forbes"
twitter = "https://twitter.com/Elliot_F"
+++

<p>This is just a quick code snippet for those of you facing this slight problem when developing your applications using AngularJS 1.5. This works for those of you </p>

~~~
<select ng-model="selection" ng-init="selection ='The First Default Option'">
    <option>The First Default Option</option>
    <option>The Second non-default option</option>
  </select>
~~~