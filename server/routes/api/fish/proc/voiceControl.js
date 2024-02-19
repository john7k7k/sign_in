const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

module.exports = async (req, res) => { 
    try{
      console.log(req.body);
      res.send("控制成功");
    }catch{res.status(402).send("資料有誤");}
  }