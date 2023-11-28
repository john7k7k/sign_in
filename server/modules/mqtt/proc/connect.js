const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const sub_topic_group = require("../../../config/subTopics")

module.exports = (mqttConnection) => {
    return async () => {
        console.log('已連接到MQTT');
        const pools = await prisma.pool.findMany();
        pools.forEach(({ id }) => {
            sub_topic_group.forEach(sub_topic => {
            mqttConnection.subscribe(sub_topic.replace('<poolID>', `${id.slice(0,3)}${id.slice(3,6)}${id.slice(6)}`))
            console.log(sub_topic.replace('<poolID>', `${id.slice(0,3)}${id.slice(3,6)}${id.slice(6)}`))
            })
        })
    }
}
