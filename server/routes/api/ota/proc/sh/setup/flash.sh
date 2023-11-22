#!/bin/bash
OK=0
Faild=1
search_dir=/home/aifi-fish/firmware
flash_firmware=$search_dir/`ls $search_dir -Art | tail -n 1`

# start flash
echo "Start flashing $flash_firmware"
#flash_result=`stm32flash -i '396&397,-397,:-396&397,-397' -w $flash_firmware -v /dev/ttyS1`
flash_result=`stm32flash -v -i '22,,,27,,,-27,,,:-22,,,27,,,-27' -w $flash_firmware /dev/serial0`
#STR='GNU/Linux is an operating system'
SECESS_FLASH_STR='(100.00%) Done'
if [[ "$flash_result" == *"$SECESS_FLASH_STR"* ]]; then
  echo "Flash STM32 Successful!"
  exit ${OK}
fi
echo "Flash STM32 Failed!"
rm $flash_firmware
echo "Removed firmware $flash_firmware ..."
exit ${Faild}
