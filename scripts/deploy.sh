#!/bin/bash
cd /var/www/
wget https://s3-eu-west-1.amazonaws.com/test-tutorialedge-v2/app.zip
unzip app.zip -d temp
cp -r temp/* html/public/