const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

module.exports = async (req, res) => { 
    try{
        const datas = await prisma.controller.findMany()
        res.send(datas);
    }catch{res.sendStatus(403);}
  }