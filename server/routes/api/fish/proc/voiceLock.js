const mqttConnection = require('../../../../modules/util/mqtt');
const { prisma } = require('../../../../modules/util/myPrisma');
global.controlling = [];
global.fishCount = {};

module.exports = async (req, res) => { 
    //try{
        const { fishUID, section, end } = req.body; //取得參數
        if(end){
            record(section)
            mqttConnection.publish('Fish/control/' +  section.slice(0,3) + section.slice(3,6) +section.slice(6) + '/'  + 'motion', JSON.stringify({
                id: fishUID.slice(3),
                motion: "2"
            }));
            setTimeout(()=>{mqttConnection.publish('Fish/control/' +  section.slice(0,3) + section.slice(3,6) +section.slice(6) + '/'  + 'motion', JSON.stringify({
                id: fishUID.slice(3),
                motion: "A"
            }));}, 3000);
            delete global.fishCount[fishUID];
            delete global.controlling[global.controlling.findIndex(fishUID_ => fishUID_===fishUID)];
            return res.send('已放生')
        }
        if(global.controlling.includes(fishUID)) return res.status(403).send('名魚有主');
        global.controlling.push(fishUID);
        mqttConnection.publish('Fish/control/' +  section.slice(0,3) + section.slice(3,6) +section.slice(6) + '/'  + 'motion', JSON.stringify({
            id: fishUID.slice(3),
            motion: "a"
        }));
        setTimeout(()=>{mqttConnection.publish('Fish/control/' +  section.slice(0,3) + section.slice(3,6) +section.slice(6) + '/'  + 'motion', JSON.stringify({
            id: fishUID.slice(3),
            motion: "3"
        }));}, 1000);
        count(section, fishUID);
        res.sendStatus(200);
    //}catch{res.status(402).send("資料有誤");}
}

function count(section, fishUID) {
    if(!global.fishCount[fishUID]) global.fishCount[fishUID] = 1;
    global.fishCount[fishUID] = global.fishCount[fishUID]+1;
    if(global.fishCount[fishUID] > 30) {
        record();
        mqttConnection.publish('Fish/control/' +  section.slice(0,3) + section.slice(3,6) +section.slice(6) + '/'  + 'motion', JSON.stringify({
            id: fishUID.slice(3),
            motion: "2"
        }));
        setTimeout(()=>{mqttConnection.publish('Fish/control/' +  section.slice(0,3) + section.slice(3,6) +section.slice(6) + '/'  + 'motion', JSON.stringify({
            id: fishUID.slice(3),
            motion: "A"
        }));}, 3000);
        delete global.fishCount[fishUID];
        delete global.controlling[global.controlling.findIndex(fishUID_ => fishUID_===fishUID)];
        return;
    }
    setTimeout(()=>{
        count(section, fishUID)
    }, 1000)
}

async function record(poolID){
    let records =  Number((await prisma.pool.findUnique({
        where: {
            id: poolID
        }
    })).mac)
    if(!records && records !== 0) records = 0
    else records += 1;
    records = String(records)
    console.log(records)
    await prisma.pool.update({
            where: {
                id: poolID
            },
            data:{
                mac: records
            }
        }
    )
}
