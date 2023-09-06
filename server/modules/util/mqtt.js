const mqtt = require('mqtt');
require("dotenv").config();

module.exports = (
        mqtt_ip = process.env.DB_MQTT_IP,
        mqtt_data = {
        username: process.env.DB_MQTT_USER,
        password: process.env.DB_MQTT_PASSWORD
    }
) => mqtt.connect(mqtt_ip,mqtt_data);
