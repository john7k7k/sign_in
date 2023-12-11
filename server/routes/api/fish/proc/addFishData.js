const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

module.exports = async (req, res) => {
    try{
      const { fishData } = req.body; //取得參數
      if(!fishData){
        res.sendStatus(403);
        return;
      }
      const fishesUID = Object.keys(fishData);
      const fishes = await prisma.fish.findMany({
        where: {fishUID: {in: fishesUID}},
        include: { 
          fishData: {
            take: 1,
            orderBy: { dataID: 'desc' }
          }
        }
      })
      const now = Math.floor((new Date()).getTime()/1000)
      const fishesData = fishes.map(({ fishData }) => fishData[0]);
      await prisma.fishData.createMany({
        data: fishesUID.map((fishUID, index) => ({
          fishUID,
          time: Math.floor((new Date()).getTime()/1000),
          ...(fishData[fishUID]),
          accumulationTime:
          fishesData[fishesData.findIndex(fish => fish.fishUID === fishUID)].accumulationTime + 
          ((fishesData[fishesData.findIndex(fish => fish.fishUID === fishUID)].active === 1)?( now - fishesData[fishesData.findIndex(fish => fish.fishUID === '002' + fishID)].time):0)
        })) 
      })
      res.sendStatus(200);
    }catch(e){console.log(e);res.status(5000).send(e);}
  }