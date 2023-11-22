const { PrismaClient } = require('@prisma/client');
const dotenv = require("dotenv").config();

module.exports = async (req, res) => {
    const prisma = new PrismaClient();
    try{
        await prisma.controller.create({
            data: {
                id: req.body.controllerID,
                fish: req.body.fish,
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
    }catch(e) {console.log(e);res.sendStatus(403);}
    finally{
        await prisma.$disconnect();
    }
    res.sendStatus(200);
}