#!/bin/bash
cd /var/www/test
ls
chmod +x scripts/hugo
scripts/hugo --buildDrafts > output.log
rm -rf /var/www/html/public/
mkdir /var/www/html/public/
cp -R public/* /var/www/html/public/

