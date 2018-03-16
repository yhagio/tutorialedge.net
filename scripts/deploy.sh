#!/bin/bash
cd /var/www/html/public/
aws s3 sync s3://test-tutorialedge-v2 .

