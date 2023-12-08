const { PrismaClient } = require('@prisma/client');
const dotenv = require("dotenv").config();
const mqttConnection = require('../../../../modules/util/mqtt')();

module.exports = async (req, res) => {
    const prisma =  global.prisma;
    try{
        await prisma.controller.update({
            where: {
                id: req.body.controllerID
            },
            data: req.body.enble
            /*{
                fish: req.body.fish,
                location:
                exist: 1,
                forward: 1,
                left: 1,
                right: 1,
                floating: 1,
                diving: 1,
                middle: 1,
                switch_mode: 1,
                led: 1,
                auto: 1,
                leave_auto: 1
            }*/
        })
        const joysticks = await prisma.controller.findUnique({
            where:{
                id: req.body.controllerID
            }
        })
        const topic = `Monitor/config/${joysticks.location}/set`;
        console.log(topic)
        let message = { joysticks:{  
            [req.body.controllerID]:{
                ids:[joysticks.fish.slice(3)],
                priority: 30,
                timeout: 180,
                enable:  Object.fromEntries(
                    Object.entries(joysticks).filter(([key]) => [ "forward",
                    "left",
                    "right",
                    "floating",
                    "diving",
                    "middle",
                    "switch_mode",
                    "led",
                    "auto",
                    "leave_auto"].includes(key))
                )
            }
        } }
        for (let en in message.joysticks[req.body.controllerID].enable){
            if(message.joysticks[req.body.controllerID].enable[en]) message.joysticks[req.body.controllerID].enable[en] = true;
            else message.joysticks[req.body.controllerID].enable[en] = false;
        }
        console.log(message.joysticks)
        message = JSON.stringify(message);
        mqttConnection.publish(topic, message)
        console.log(`publiced topic: ${topic}, message: ${message}`);
    }catch(e) {console.log(e);res.sendStatus(403);}
    finally{
        await prisma.$disconnect();
    }
    res.sendStatus(200);
}