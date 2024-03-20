const { forEach } = require('../../../../config/subTopics.js');
const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

module.exports = async (req, res) => { 
   try{
      let { types } = req.body; //取得路由參數
      let allCom = {};
      for(let type of types){
        const latestTimestamps = await prisma.$queryRaw`
        SELECT id, MAX(time) as latestTime
        FROM Component
        WHERE type = ${type}
        GROUP BY id
      `;
        const latestData = await Promise.all(latestTimestamps.map(async (item) => {
        const data = await prisma.component.findFirst({
            where: {
              id: item.id,
              time: item.latestTime
            },
            select: {
              id: true,
              local: true,
              hours: true,
              errReason: true,
              time: true
            }
          });
          return data;
        }));
        allCom[type] = latestData;
        
      }
      if(allCom.motor){
        const latestTimestamps = await prisma.$queryRaw`
        SELECT id, MAX(time) as latestTime
        FROM motor
        GROUP BY id
      `;
        const latestData = await Promise.all(latestTimestamps.map(async (item) => {
        const data = await prisma.motor.findFirst({
            where: {
              id: item.id,
              time: item.latestTime
            },
            select: {
              id: true,
              local: true,
              hours: true,
              errReason: true,
              time: true,
              turn: true
            }
          });
          return data;
        }));
        allCom.motor = latestData;
      }
      return res.send(allCom);
    }catch(e){ return res.send(e);}
  }