#!/bin/bash
cd /var/www/
wget https://s3-eu-west-1.amazonaws.com/test-tutorialedge-v2/app.zip
unzip app.zip -d temp
\cp -rf temp/* html/public/
rm *.zip*
rm -rf temp/