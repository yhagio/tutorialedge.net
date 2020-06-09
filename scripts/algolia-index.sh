#!/bin/bash
set -eoux pipefail

function setup() {
    echo "Setting up Environment"
    wget https://github.com/gohugoio/hugo/releases/download/v0.51/hugo_0.51_Linux-64bit.deb
    sudo dpkg -i hugo*.deb
    yarn install
}

function algolia_index() {
    echo "Running Algolia Index Job"
    hugo --minify
    npm run algolia
}

function main() {
    echo "Indexing new articles on the site with Algolia"
    setup
    algolia_index
}

main
