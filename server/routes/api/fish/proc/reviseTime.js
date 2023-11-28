const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req,res) => {
   try{
        const oldData = (await prisma.fishData.findMany({
            where: {
                fishUID: req.body.fishUID,
            },
            take: 1,
            orderBy: { dataID: 'desc' }
        }))[0];
        oldData.accumulationTime = 0;
        await prisma.fishData.create({
            data: oldData
        })
      res.sendStatus(200)
   }catch(e){ console.log(e);res.sendStatus(500);}
  }