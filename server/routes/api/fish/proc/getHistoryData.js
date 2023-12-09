const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

module.exports = async (req, res) => { 
    try{
      let { fishesUID, versions } = req.query; //取得路由參數
      fishesUID = fishesUID.match(/(\d+)/g); //將路由參數轉為id陣列
      versions = versions.split(','); //將路由參數轉為version陣列
      const fishes = await prisma.fish.findMany({
        where: {
          fishUID: {
            in: fishesUID,
          }
        },
        include: {
          fishData: {
            where: {
              OR: versions.map((version,index) => ({
                fishUID: fishesUID[index],
                time:{
                  gte: Number(version.split(':')[0]),
                  lte: Number(version.split(':')[1])
                }
              }))
            },
            orderBy: {
              time: 'asc'
            }
          }
        }
      }) 
      console.log(fishes)
      let datas = {};
      fishes.forEach(fish => {
        if(!datas[fish.location]) datas[fish.location] = {};
        fish.fishData.forEach(data => delete data.fishUID);
        datas[fish.location][fish.fishUID] = fish.fishData;
        datas[fish.location][fish.fishUID].at(-1).photoCode = fish.photoCode;
      })
      res.send(datas);
    }catch{res.sendStatus(403);}
  }