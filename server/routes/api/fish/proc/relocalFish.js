const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req,res) => {
   try{
      await prisma.fish.update({
        where: {
            fishUID: req.body.fishUID
        },
        data: {
            location: req.body.newPool
        }
      })
      res.sendStatus(200)
   }catch{ res.sendStatus(500);}
  }