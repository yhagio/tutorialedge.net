---
author: Elliot Forbes
date: 2017-06-12T08:48:26+01:00
desc: In this tutorial we look at how you can implement an automatic deployment strategy
  for your hugo websites.
series: hugo
image: golang.png
tags:
- hugo
title: Hugo Deployment Workflow Tutorial
twitter: https://twitter.com/Elliot_F
authorImage: https://pbs.twimg.com/profile_images/1028545501367554048/lzr43cQv_400x400.jpg
---

When developing websites with Hugo, having a solid automated deployment strategy can save you hundreds of hours of performing repetitive manual tasks. This site itself uses hugo and an automated deployment strategy in order to automatically deploy any changes made to it's underlying git repo: [elliotforbes/tutorialedge-v2](https://github.com/elliotforbes/tutorialedge-v2). Whenever I wish to make a change to any of the content on my site I follow these steps:

1. Make the changes to a local version of hugo running on my laptop
2. Verify the changes look good in my browser.
3. git add path/to/filename.md
4. git commit -m "Commit Message"
5. git push origin master

And that's it. As soon as I've made the changes to my master branch on github, the deployment process I've defined picks these changes up and deploys them to my live website. In this tutorial we'll be looking at the various methods you could use in order to automatically deploy your own hugo websites.

# Using Jenkins

> [Jenkins](https://jenkins.io/) for those of you who have never used it before is a continuous integration/continuous deployment tool that is built for performing automated deployment tasks such as deploying a hugo website. 

If you have a Jenkins instance running on the webserver that your site currently runs on then this is a fantastic method for automatically deploying your site whenever changes are made to your github repository.

You can create a new job which watches your github repository for any changes. If any changes are made then it would then run something like the following in the build stage:

```shell
# You will need the hugo binary somewhere on your webserver
# build the website into the public/ directory
/Path/To/hugo

# Once you've built your website you can then copy all of these
# files to where your website lives on your web server
cp -R public/* /var/www/html/
```

Once you've got this set up, you can then freely make changes to your github repo and every time you do these changes will be built locally on your webserver and then will be pushed to overwrite your existing website, thus making your changes instantly live!
