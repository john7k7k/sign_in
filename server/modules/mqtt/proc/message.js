const lineNotify = require('../../util/lineNotify')();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (topic, rec_message) => { //接收到IOT端訊息

        const json_data = JSON.parse(rec_message.toString()); //parse資料
        messageProcess(topicDecode(topic),json_data);
    
}

function topicDecode(topic){
    const topicArray = topic.split('/');
    return {
      main: topicArray[0],
      type: topicArray[1],
      instruction: topicArray[2],
      depart: topicArray[3],
      pool: topicArray[4],
      command: topicArray[5]
    }
  }
 

async function messageProcess(topic,mqtt_data){
    try{
        if(topic.type === 'alarm'){
            const { name: instruction, depart: [{name: depart, pool: [{name: pool}]}] } = 
            await prisma.instruction.findUnique({ 
            where: { id: topic.instruction },
            include: {
                depart: {
                where: { id: topic.instruction + topic.depart },
                include: {
                    pool: { where: { id: topic.instruction + topic.depart + topic.pool } }
                }
                }
            }
            })
            mqtt_data.poolID = topic.instruction + topic.depart + topic.pool;
            mqtt_data.instruction = instruction;
            mqtt_data.depart = depart;
            mqtt_data.pool = pool;
            lineNotify.send(mqtt_data, decode = lineNotify.decodeFishesAlarm, test = false);
        }
        else if(topic.type === 'info'){
            delete mqtt_data.time;
            console.log(mqtt_data);
            let thisPoolFishesUID = (await prisma.fish.findMany({
                where: {
                    location: topic.instruction + topic.depart + topic.pool
                }
            })).map(({ fishUID }) => fishUID)
            console.log(thisPoolFishesUID)
            Object.keys(mqtt_data).forEach(fishID => {
                if(!thisPoolFishesUID.map(fishUID => fishUID.slice(3)).includes(fishID)){
                    delete mqtt_data[fishID];
                }
            })
            await prisma.fishData.createMany({
            data: Object.keys(mqtt_data).map(fishID => ({
                    fishUID: '002' + fishID,
                    time: Math.floor((new Date()).getTime()/1000),
                    ...(mqtt_data[fishID])
                }))
            })
        }
    }catch(err){console.log(err)}
}