const { PrismaClient } = require('@prisma/client');
const dotenv = require("dotenv").config();

module.exports = async (req, res) => {
    const prisma = new PrismaClient();
    try{
        await prisma.user.delete({
            where: {id: req.payload.controllerID}
        })
    }
    catch(e) {console.log(e);res.sendStatus(403)}
    finally {await prisma.$disconnect();}
    
    res.sendStatus(200);
}