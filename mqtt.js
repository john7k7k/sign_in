const mqtt = require('mqtt');

module.exports = (
        mqtt_ip = 'mqtt://20.89.131.34:1884',
        mqtt_data = {
        username: 'lab314',
        password: 'lab314fish'
    }
) => mqtt.connect(mqtt_ip,mqtt_data);
