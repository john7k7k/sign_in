const init = require ('./modules/inital'); 
const routes = require('./routes');
const mqttProcess = require('./modules/mqtt')
const express = require('express'); 
const app = express();

mqttProcess(); //IOT處理
init(app); //初始化伺服器
app.use('/', routes); //開啟API