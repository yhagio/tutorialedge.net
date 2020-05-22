#!/bin/bash
set -eoux pipefail

function setup() {
    echo "Setting up Environment"
    wget https://github.com/gohugoio/hugo/releases/download/v0.51/hugo_0.51_Linux-64bit.deb
    sudo dpkg -i hugo*.deb
    yarn install
    yarn global add travis-ci-cloudfront-invalidation
}

function algolia_index() {
    echo "Running Algolia Index Job"
}

function main() {
    echo "Indexing new articles on the site with Algolia"
    setup
    algolia_index
}

main
