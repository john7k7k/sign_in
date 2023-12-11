const lineNotify = require('../../util/lineNotify')();
const { prisma } =  require('../../util/myPrisma.js') ;

module.exports = async (topic, rec_message) => { //接收到IOT端訊息
    const json_data = JSON.parse(rec_message.toString()); //parse資料
    messageProcess(topic,json_data);
    
}

function topicDecode(topic){
    const topicArray = topic.split('/');
    return {
      main: topicArray[0],
      type: topicArray[1],
      instruction: topicArray[2].slice(0,3),
      depart: topicArray[2].slice(3,6),
      pool: topicArray[2].slice(6),
      command: topicArray[3]
    }
  }
 

async function messageProcess(topic,mqtt_data){
    try{
        console.log(topic + ' 收到訊息' + `message: ${JSON.stringify(mqtt_data)}`)
        
        if(topic === 'Ota/port'){
            global.fishPort = mqtt_data.port;
            return;
        }
        topic = topicDecode(topic);
        console.log(topic)
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
            let thisPoolFishesUID = (await prisma.fish.findMany({
                where: {
                    location: topic.instruction + topic.depart + topic.pool
                }
            })).map(({ fishUID }) => fishUID)
            Object.keys(mqtt_data).forEach(fishID => {
                if(!thisPoolFishesUID.map(fishUID => fishUID.slice(3)).includes(fishID)){
                    delete mqtt_data[fishID];
                }
            })
            const fishes = await prisma.fish.findMany({
                where: {fishUID: {in: thisPoolFishesUID}},
                include: { 
                  fishData: {
                    take: 1,
                    orderBy: { dataID: 'desc' }
                  }
                }
              })
            const now = Math.floor((new Date()).getTime()/1000)
            const fishesData = fishes.map(({ fishData }) => fishData[0]);
            await prisma.fishData.createMany({
            data: Object.keys(mqtt_data).map(fishID => ({
                    fishUID: '002' + fishID,
                    time: now,
                    ...(mqtt_data[fishID]),
                    accumulationTime:
                    fishesData[fishesData.findIndex(fish => fish.fishUID === '002' + fishID)].accumulationTime + 
                    ((fishesData[fishesData.findIndex(fish => fish.fishUID === '002' + fishID)].active === 1)?( now - fishesData[fishesData.findIndex(fish => fish.fishUID === '002' + fishID)].time):0)
                }))
            })
        }
        else if(topic.type === 'control'){
            global.controlAble = True;
        }
    }catch(err){console.log(err)}
}