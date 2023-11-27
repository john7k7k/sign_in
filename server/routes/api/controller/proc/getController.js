const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => { 
    try{
        const datas = await prisma.controller.findMany()
        res.send(datas);
    }catch{res.sendStatus(403);}
  }