const mqttConnection = require('../util/mqtt');
const messageProcess = require('./proc/message');
const onConnect = require('./proc/connect');

module.exports = async () => {
    global.mqttConnection = mqttConnection
    mqttConnection.on('connect', onConnect(mqttConnection));
    mqttConnection.on('message', messageProcess);
    mqttConnection.on('error', err => console.error('MQTT連接錯誤:', err));
}

