const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

module.exports = async (req, res) => { 
    try{
      let { fishesUID } = req.query; //取得路由參數
      fishesUID = fishesUID.match(/(\d+)/g) //將路由參數轉為id陣列
      const fishes = await prisma.fish.findMany({
        where: {fishUID: {in: fishesUID}},
        include: { 
          fishData: {
            take: 1,
            orderBy: { dataID: 'desc' }
          }
        }
      })
      let datas = {};
      fishes.forEach(fish => {
        if(!datas[fish.location]) datas[fish.location] = {};
        fish.fishData.forEach(data => {
          delete data.fishUID;
          data.accumulationTime += ((data.active === 1)?(Math.floor((new Date()).getTime()/1000) - data.time):0)
        });
        datas[fish.location][fish.fishUID] = fish.fishData[0];
        datas[fish.location][fish.fishUID].photoCode = fish.photoCode;
        datas[fish.location][fish.fishUID].nickName = fish.nickName;
      })
      res.send(datas);
    }catch{res.sendStatus(500);}
  }