const { prisma } =  require('../../../../modules/util/myPrisma.js') ;
const subTopics = require('../../../../config/subTopics');

module.exports = async (req, res) => {
    try{
      const { poolID: id } = req.body;
      await prisma.pool.delete({
        where: {
          id,
        }
      })
      for(let sub_topic of subTopics){
        mqttConnection.subscribe(sub_topic.replace('<poolID>', `${id.slice(0,3)}/${id.slice(3,6)}/${id.slice(6)}`))
        console.log(sub_topic.replace('<poolID>', `${id.slice(0,3)}/${id.slice(3,6)}/${id.slice(6)}`))
      }
      res.sendStatus(200);
  }catch(err){ console.log(err);res.sendStatus(500); }
}