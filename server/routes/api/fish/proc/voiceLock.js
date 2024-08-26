const mqttConnection = require('../../../../modules/util/mqtt');
global.controlling = [];
global.fishCount = {};

module.exports = async (req, res) => { 
    //try{
        const { fishUID, section, end } = req.body; //取得參數
        if(end){
            mqttConnection.publish('Fish/control/' +  section.slice(0,3) + section.slice(3,6) +section.slice(6) + '/'  + 'motion', JSON.stringify({
                id: fishUID.slice(3),
                motion: "A"
            }));
            setTimeout(()=>{mqttConnection.publish('Fish/control/' +  section.slice(0,3) + section.slice(3,6) +section.slice(6) + '/'  + 'motion', JSON.stringify({
                id: fishUID.slice(3),
                motion: "2"
            }));}, 1000);
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
        mqttConnection.publish('Fish/control/' +  section.slice(0,3) + section.slice(3,6) +section.slice(6) + '/'  + 'motion', JSON.stringify({
            id: fishUID.slice(3),
            motion: "A"
        }));
        delete global.fishCount[fishUID];
        delete global.controlling[global.controlling.findIndex(fishUID_ => fishUID_===fishUID)];
        return;
    }
    setTimeout(()=>{
        count(section, fishUID)
    }, 1000)
}