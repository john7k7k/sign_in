#!/bin/bash
rsync -e "ssh -p $2" -r ./aifi_core_stm32_MPU_loopTest_20230920.bin aifi-fish@$1:/home/aifi-fish/firmware/
ssh -p $2 aifi-fish@$1 'sudo /home/aifi-fish/aifi-fota/flash.sh'
