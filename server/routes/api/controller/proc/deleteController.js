const { PrismaClient } = require('@prisma/client');
const dotenv = require("dotenv").config();
const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

module.exports = async (req, res) => {
    try{
        await prisma.controller.delete({
            where: {id: req.body.controllerID}
        })
    }
    catch(e) {console.log(e);res.sendStatus(403)}
    
    res.sendStatus(200);
}