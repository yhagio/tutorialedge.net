---
author: Elliot Forbes
date: 2017-04-14T20:28:13+01:00
series: misc
tags:
  - misc
title: Redirect
twitter: https://twitter.com/Elliot_F
---

<script type="text/javascript">
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log(token);
    Cookies.set("jwt-token", token, { secure: true });
    console.log(Cookies.get("jwt-token"));
    var redirect_url = Cookies.get("redirect_url");
    // console.log(redirect_url);
    if(typeof redirect_url !== 'undefined') {
        Cookies.remove("redirect_url");
        window.location.replace(redirect_url);
    }

</script>