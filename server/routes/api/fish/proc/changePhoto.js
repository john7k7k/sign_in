const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

module.exports = async (req, res) => {
    try{
      const { fishUID , photoCode } = req.body; //取得參數
      if(!photoCode){
        res.sendStatus(403);
        return;
      }
      await prisma.fish.update({
        where: { fishUID },
        data: { photoCode }
    });
    res.sendStatus(200);
    }catch{res.sendStatus(500);}
  }