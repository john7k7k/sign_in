#!/bin/bash

echo "start flash"
mark = ''
for ((ratio=0;${ratio}<=100;ratio+=5))
do
    printf "progress:[%-40s]%d%%\r" "${mark}" "${ratio}"
    mark="##${mark}"
    sleep 0.01
    
done
echo ""
echo "flash finish"
sleep 5