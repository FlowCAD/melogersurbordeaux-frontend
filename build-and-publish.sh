#!/bin/sh

echo "---------------------------------------------------------\n"
echo "------------RUNNING BUILD AND PUBLISH SCRIPT!------------\n"
echo "---------------------------------------------------------\n"

echo "\n---> Login to Heroku"
heroku login

echo "\n---> Cleaning output folder\n"
cd ../backend/public/
rm -rf *
cd -

echo "\n---> Building Angular Package\n"
ng build --c=production

echo "\n---> Moving Package's Files\n"
cp -R ./dist/. ../backend/public/

echo "\n---> Publishing Package\n"
cd ../backend
git add .
git commit -am "Updated public files"
git push
git push heroku master

echo "\n----Package successfully built and published ! \o/ ----\n"