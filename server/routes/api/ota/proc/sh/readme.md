### 流程
1. 初始化
```
./remote_setup.sh ip port
```
2. 丟bin檔上去並執行燒錄腳本
```
./remote_flash.sh ip port
```

### 注意事項
1. 需要給bin檔一個通用的名稱，寫死在remote_flash.sh裡面。
2. 執行上面兩個指令的時候要cd之後再執行，用絕對路徑執行可能會錯。
3. flash資料夾裡面附了兩個bin檔，要測試的話可以燒那個loopTest，成功後在機器上跑uart_test.py看有沒有輸出。
