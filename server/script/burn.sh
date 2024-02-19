#!/bin/bash
rsync -r ../uploads/ota/hello.c $1@$2:/home/$1/aifi_ota/
ssh $1@$2 'cd ~/aifi_ota/ && sudo ./install.sh'
