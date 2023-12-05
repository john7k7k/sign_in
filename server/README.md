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
        sudo apt install nodejs npm
        sudo npm install -g n
        sudo n 16.17.1
        ```

2. 建置MySQL資料庫

    *  windows環境: [官網下載](https://www.mysql.com/)
    *  linux環境:
    
        Bash
        ```
        sudo apt install mysql-server
        sudo mysql -u root -p
        ```
        MySQL
        ```
        CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
        /* 需自行替換 'username' 及 'password' */

        GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost';
        /* 需自行替換 'username' */

        FLUSH PRIVILEGES;

        CREATE DATABASE database_name;
        /* 需自行替換 database_name */

        EXIT;
        ```
       
3. 建置MQTT伺服器

    *  windows環境: [官網下載](https://mosquitto.org/download/)
    *  linux環境:
    
        ```
        sudo apt install mosquitto
        sudo systemctl start mosquitto
        sudo systemctl enable mosquitto.service
        mosquitto -v
        systemctl status mosquitto
        sudo vim /etc/mosquitto/mosquitto.conf
        ```
        此時會開啟mosquitto的配置檔，在最底部加上
        ```
        listener 1883
        ```
        按 : 鍵，然後按 w q Enter 退出vim編輯器
        ```
        sudo systemctl restart mosquitto
        sudo mosquitto_passwd -c /etc/mosquitto/passwd <username>
        #<username>改成你要的使用者帳戶名
        sudo vim /etc/mosquitto/mosquitto.conf
        #開啟vim後在最頂端加入
        per_listener_settings true
        #在最底端加入
        allow_anonymous false
        password_file /etc/mosquitto/passwd
        #退出vim
        sudo systemctl restart mosquitto
        systemctl status mosquitto
        ```

4. 安裝項目依賴的模組
    ```
    npm install
    ```

5. 配置環境變數

    * 在專案中新增.env文件
    * 配置下列環境變數
        ```
        DB_SQL_HOST = 'localhost'
        DB_SQL_USER =  ''
        DB_SQL_PASSWORD = ''  
        DB_SQL_PORT = 3306
        DB_SQL_DATABASE = 'sys'
        DB_MQTT_IP = 'mqtt://localhost:1884'
        DB_MQTT_USER = ''
        DB_MQTT_PASSWORD = ''
        DB_LINE_TOKEN = ''
        DB_GMAIL_ACCOUNT = ''
        DB_GMAIL_PASS = ''
        DB_JWTKEY = ''
        DOMAIN = 'localhost:3000'
        ```

6. 建置資料庫模型

    *  windows環境:
        ```
        npm install prisma --save-dev
        npx prisma init
        npx prisma migrate dev
        npx prisma generate
        ```
    *  linux環境:
        ```
        sudo npm install prisma --save-dev
        sudo npx prisma init
        sudo npx prisma migrate dev
        sudo npx prisma generate
        ```

7. 配置apache代理 (windows測試環境可跳過)
    ```
    sudo apt install apache2
    sudo systemctl start apache2
    sudo systemctl enable apache2
    sudo a2enmod proxy
    sudo systemctl enable httpd
    sudo systemctl status apache2
    sudo systemctl restart apache2
    cd /etc/apache2/sites-available
    sudo vim 000-default.conf
    ```
    配置文件中，新增以下兩行
    ```
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
    ```

8. 安裝PM2
    *  windows環境: 
        ```
        npm install -g pm2
        ```
    *  linux環境:
        ```
        sudo npm install -g pm2
        ```

9. 啟動伺服器
    *  windows環境: 
        ```
        pm2 start app.js
        ```
    *  linux環境:
        ```
        sudo pm2 start app.js
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
* README版本: 2
* 未開發功能:
    * 智慧魚OTA
    * 其他智慧生物監控
* 更新日期: 2023/9/8
## developers
* 專案經理: Jason 
* 合作開發者: Jack,James
* 開發者: John