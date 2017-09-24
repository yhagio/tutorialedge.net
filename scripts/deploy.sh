#!/bin/bash
cd /var/www/test
ls
chmod +x scripts/hugo
scripts/hugo --buildDrafts > output.log
cp -R public/ /var/www/html/public

