const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

module.exports = async (req, res) => { 
    try{
      let { fishesUID } = req.query; //取得路由參數
      fishesUID = fishesUID.match(/(\d+)/g) //將路由參數轉為id陣列
      const fishes = await prisma.fish.findMany({
        where: {fishUID: {in: fishesUID}},
        include: { fishData: true }
      })
      let tables = {};
      fishes.forEach(fish => {
        if(!tables[fish.location]) tables[fish.location] = {};
        fish.fishData.forEach(data => delete data.fishUID);
        tables[fish.location][fish.fishUID] = fish.fishData;
        tables[fish.location][fish.fishUID].at(-1).photoCode = fish.photoCode;
      })
      res.send(tables);
    }catch{res.sendStatus(500);}
  }