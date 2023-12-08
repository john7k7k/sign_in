const { PrismaClient } = require('@prisma/client');
const dotenv = require("dotenv").config();

module.exports = async (req, res) => {
    const prisma =  global.prisma;
    try{
        await prisma.controller.delete({
            where: {id: req.body.controllerID}
        })
    }
    catch(e) {console.log(e);res.sendStatus(403)}
    finally {await prisma.$disconnect();}
    
    res.sendStatus(200);
}