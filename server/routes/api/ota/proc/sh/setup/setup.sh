#!/bin/bash

# move to PATH
cp -f /home/aifi-fish/aifi-fota/stm32flash /usr/local/bin/

# setup gpio
systemctl stop aifi-fota.service.service
rsync -r /home/aifi-fish/aifi-fota/aifi-fota.service /etc/systemd/system/aifi-fota.service
systemctl start aifi-fota.service
systemctl enable aifi-fota.service
systemctl daemon-reload
