const mqttConnection = require('../../../../modules/util/mqtt')();

module.exports = async (req, res) => {
    try{
        
        const { fishControl } = req.body; //取得參數
        const { section } = req.query;
        mqttConnection.publish(`Fish/control/${section}/require`, "nothing");
        console.log(`Fish/control/${section}/require`);
        const controlTask = () => {
                for(key in fishControl){
                    const fish_string = JSON.stringify(fishControl[key]); //轉換為json字串
                    mqttConnection.publish('Fish/control/' +  section.slice(0,3) + section.slice(3,6) +section.slice(6) + '/'  + key,fish_string);
                    console.log('Fish/control/' + section.slice(0,3) + section.slice(3,6) +section.slice(6) + '/'  + key);
                }
                global.controlAble = false;
        }
        controlTask();
    }
    catch{res.sendStatus(403);}
}