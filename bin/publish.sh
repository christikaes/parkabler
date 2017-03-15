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
if [ -n "$(git status --porcelain)" ]; then
  git commit -a -m '[publish] clean'
else
  echo "no changes";
fi
git checkout master

echo '_________________________________________'
echo 'Build Master'
# Clean build on master
npm install
npm run build

echo 'Phonegap build disabled'
# echo '_________________________________________'
# echo 'Build Master (Phonegap)'
# # Clean phonegap build on master
# npm run phonegap
# cd phonegap
# phonegap build android --release
# cd ..
# mkdir -p dist/apk
# cp phonegap/platforms/android/build/outputs/apk/* dist/apk/ -r

echo '_________________________________________'
echo 'Copy to gh-pages branch'
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

echo '_________________________________________'
echo 'Create and push a new release'
# Create a new release
# get highest tag number
VERSION=`git describe --abbrev=0 --tags`

# replace . with space so can split into an array
VERSION_BITS=(${VERSION//./ })

# get number parts and increase last one by 1
VNUM1=${VERSION_BITS[0]}
VNUM2=${VERSION_BITS[1]}
VNUM2=$((VNUM2+1))

# create new tag
NEW_TAG="$VNUM1.$VNUM2"

echo "Updating $VERSION to $NEW_TAG"
git tag -a $NEW_TAG -m "Update to $NEW_TAG"
git push --tags

# Restore original state
git checkout master
echo '_________________________________________'
echo 'Finished publishing to gh-pages'
