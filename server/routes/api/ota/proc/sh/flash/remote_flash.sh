#!/bin/bash
#rsync -e "ssh -p $2" -r ./aifi_core_stm32_MPU_loopTest_20230920.bin aifi-fish@$1:/home/aifi-fish/firmware/
#ssh -p $2 aifi-fish@$1 'sudo /home/aifi-fish/aifi-fota/flash.sh'

scp -P $2 ./aifi_core_stm32_MPU_loopTest_20230920.bin aifi-fish@$1:/home/aifi-fish/firmware/
ssh -p $2 aifi-fish@$1 'sudo /home/aifi-fish/aifi-fota/flash.sh'

#scp -P 6567 ./aifi_core_stm32_MPU_loopTest_20230920.bin aifi-fish@4.216.216.249:/home/aifi-fish/firmware/;ssh -p 6567 aifi-fish@4.216.216.249 'sudo /home/aifi-fish/aifi-fota/flash.sh'