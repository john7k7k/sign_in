#!/bin/bash
date >> /var/log/aifi-fota-monitor.txt
echo 27 >/sys/class/gpio/export # Reset
echo out >/sys/class/gpio/gpio27/direction
echo 22 >/sys/class/gpio/export # Boot0
echo out >/sys/class/gpio/gpio22/direction
