const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
    try{
      const { fishData } = req.body; //取得參數
      if(!fishData){
        res.sendStatus(403);
        return;
      }
      const fishesUID = Object.keys(fishData);
      await prisma.fishData.createMany({
        data: fishesUID.map(fishUID => ({
          fishUID,
          time: Math.floor((new Date()).getTime()/1000),
          ...(fishData[fishUID]),
          accumulationTime:3856
        })) 
      })
      res.sendStatus(200);
    }catch{res.sendStatus(500);}
  }