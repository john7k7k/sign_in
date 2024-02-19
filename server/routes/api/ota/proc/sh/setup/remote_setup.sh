#!/bin/bash
rsync -e "ssh -p $2" -r * aifi-fish@$1:/home/aifi-fish/aifi-fota/
ssh -p $2 aifi-fish@$1 'sudo /home/aifi-fish/aifi-fota/setup.sh'
