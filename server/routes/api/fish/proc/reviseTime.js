const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

module.exports = async (req,res) => {
   try{
        const oldData = (await prisma.fishData.findMany({
            where: {
                fishUID: req.query.fishUID,
            },
            take: 1,
            orderBy: { dataID: 'desc' }
        }))[0];
        oldData.accumulationTime = 0;
        delete oldData.dataID;
        await prisma.fishData.create({
            data: oldData
        })
      res.sendStatus(200)
   }catch(e){ console.log(e);res.sendStatus(500);}
  }