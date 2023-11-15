const mqttConnection = require('../../../../modules/util/mqtt')();

module.exports = async (req, res) => {
    try{
        
        const { fishControl } = req.body; //取得參數
        const { section } = req.query;
        /*
        mqttConnection.publish(`Fish/control/${section}/require`, "nothing");
        console.log(`Fish/control/${section}/require`);
        const controlTask = () => {
            if( global.controlAble ){
                for(key in fishControl){
                    const fish_string = JSON.stringify(fishControl[key]); //轉換為json字串
                    mqttConnection.publish('Fish/control/' +  section.slice(0,3) + section.slice(3,6) +section.slice(6) + '/'  + key,fish_string);
                    console.log('Fish/control/' + section.slice(0,3) + section.slice(3,6) +section.slice(6) + '/'  + key);
                }
                global.controlAble = false;
            }
            else {
                setTimeout(controlTask, 2000);
            }
        }
        setTimeout(controlTask, 20);*/
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
