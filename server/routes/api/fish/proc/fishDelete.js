const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

module.exports = async (req, res) => {
    try{
      const { fishesUID } = req.body; //取得參數
      console.log(fishesUID)
      await prisma.fish.deleteMany({
        where: {
          fishUID: {in: fishesUID}
        }
      })
      res.sendStatus(200);
    }catch{res.sendStatus(500);}
  }