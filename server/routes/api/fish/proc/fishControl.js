const mqttConnection = require('../../../../modules/util/mqtt');

module.exports = async (req, res) => {
    try{
        const { fishControl } = req.body; //取得參數
        const { section } = req.query;
        const { id } = fishControl.motion;
        const fishUID = section.section.slice(0,3) + id;
        global.fishCount[fishUID] = 0;
        for(key in fishControl){
            const fish_string = JSON.stringify(fishControl[key]); //轉換為json字串
            mqttConnection.publish('Fish/control/' +  section.slice(0,3) + section.slice(3,6) +section.slice(6) + '/'  + key,fish_string);
            console.log('Fish/control/' + section.slice(0,3) + section.slice(3,6) +section.slice(6) + '/'  + key);
            console.log(fish_string);
        }
        res.sendStatus(200);
    }
    catch{res.sendStatus(403);}
}
