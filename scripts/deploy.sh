#!/bin/bash
cd /var/www/test
ls
chmod +x scripts/hugo
./scripts/hugo --buildDrafts
cd public
ls
