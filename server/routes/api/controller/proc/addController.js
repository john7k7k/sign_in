const { PrismaClient } = require('@prisma/client');
const dotenv = require("dotenv").config();
const mqttConnection = require('../../../../modules/util/mqtt.js');
const { prisma } =  require('../../../../modules/util/myPrisma.js');

module.exports = async (req, res) => {
    
    try{
        await prisma.controller.create({
            data: {
                id: req.body.controllerID,
                fish: req.body.fish,
                location: req.body.location,
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
            }
        })
        const joysticks = await prisma.controller.findUnique({
            where:{
                id: req.body.controllerID
            }
        })
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
        const topic = `Monitor/config/${req.body.location}/set`;
        mqttConnection.publish(topic, message);
        res.sendStatus(200);
    }catch(e) {console.log(e);res.sendStatus(403);}
}