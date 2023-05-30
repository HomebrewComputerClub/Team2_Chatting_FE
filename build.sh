#!/bin/bash
REPOSITORY=/home/ubuntu/fe

cd $REPOSITORY
# sudo npx pm2 kill

# sudo rm -rf node_modules

# sudo yarn install

# sudo npx pm2 start yarn --interpreter bash -- start

# sudo yarn build
sudo service nginx restart
