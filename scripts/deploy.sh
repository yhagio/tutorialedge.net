#!/bin/bash
set -eoux pipefail

function setup() {
    echo "Setting up Environment"
    wget https://github.com/gohugoio/hugo/releases/download/v0.72.0/hugo_0.71.0_Linux-64bit.deb
    sudo dpkg -i hugo*.deb
    yarn install
    yarn global add travis-ci-cloudfront-invalidation

    pyenv global 3.7.1
    pip install -U pip
    pip install awscli
}

function build() {
    yarn prod-build
    hugo --minify
    yarn sass-compile
}


function main() {
    echo "Deploying..."
    setup
    build
    echo "Successfully Deployed Site!"
}

main
