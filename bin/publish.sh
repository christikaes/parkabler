#!/bin/bash

echo '_________________________________________'
echo 'Starting to publish to gh-pages'

# Exit on error
set -o errexit

echo '_________________________________________'
echo 'Clean Commit to gh-pages'
# Clean commit the gh-pages branch
git checkout gh-pages
rimraf ./*
git commit -a -m '[publish] clean'
git checkout master

echo '_________________________________________'
echo 'Build Master'
# Clean build on master
npm install
npm run build

# Get the new dist on gh-pages
git checkout gh-pages
cp dist/* ./ -r
rimraf dist

echo '_________________________________________'
echo 'Commit and push the new build to gh-pages'
# Commit the new build on gh-pages branch
git add --all
git commit -m '[publish] build'
git push origin gh-pages

# Restore original state
git checkout master
echo '_________________________________________'
echo 'Finished publishing to gh-pages'
