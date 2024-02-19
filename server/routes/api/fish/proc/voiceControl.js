const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

function recognize(text){
  return 'result of ' + text;
}

module.exports = async (req, res) => { 
    try{
      console.log(req.body);
      res.send(recognize(req.body.text));
    }catch{res.status(402).send("資料有誤");}
  }