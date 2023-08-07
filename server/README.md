# AIFI_WEB
## introduce
* 專案名稱: 智慧魚監控系統之網頁後端
* 專案架構: 
    * 運行環境: Node.js
    * API框架: Express.js 
    * 資料庫: MySQL
* 專案目標: 
    * 智慧魚與客戶之間的通訊
    * 遠端更新及控制智慧魚
    * 保證傳輸安全性
    * 保證資料庫安全性

## build method
1. 安裝Node.js 16.17.1版本

    *  windows環境: [官網下載](https://nodejs.org/)
    *  linux環境:
    
        ```
        sudo apt update
        sudo apt install nodejs=16.17.1
        ```

2. 建置MySQL資料庫

    *  windows環境: [官網下載](https://www.mysql.com/)
    *  linux環境:
    
        ```
        sudo apt install mysql-server
        ```
3. 建置MQTT伺服器

    *  windows環境: [官網下載](https://mosquitto.org/download/)
    *  linux環境:
    
        ```
        sudo apt install mosquitto
        sudo systemctl start mosquitto
        ```

4. 安裝項目依賴的模組
    ```
    npm install
    ```

5. 配置環境變數

    * 在專案中新增.env文件
    * 配置下列環境變數
        ```
        DB_SQL_HOST = ''
        DB_SQL_USER = ''
        DB_SQL_PASSWORD = ''
        DB_SQL_PORT = 
        DB_SQL_DATABASE = ''
        DB_MQTT_IP = ''
        DB_MQTT_USER = ''
        DB_MQTT_PASSWORD = ''
        DB_LINE_TOKEN = ''
        DB_GMAIL_ACCOUNT = ''
        DB_GMAIL_PASS = ''
        DB_JWTKEY = ''
        ```
6. 啟動伺服器
    *  windows環境: 
        ```
        node index.js
        ```
    *  linux環境:
        ```
        sudo node index.js
        ```
## API document
[API.pdf](readme/API.pdf)
## API test document
[APItest.http](httptest/APItest.http)
## flow chart
### 伺服器啟動
![Alt text](readme/server_init.png)
### 伺服器響應
#### mqtt
![Alt text](readme/server_res_mqtt.png)
#### Restful-fish
![Alt text](readme/server_res_fish.png)
#### Restful-user
![Alt text](readme/server_res_user.png)
## develop diary
* README版本: 1
* 未開發功能:
    * 智慧魚OTA
    * 網域名指定
    * 魚錯誤資訊表
    * 魚跨區調動
    * 其他智慧生物監控
* 更新日期: 2023/8/3
## developers
* 專案經理: Jason 
* 合作開發者: Jack,James
* 開發者: John