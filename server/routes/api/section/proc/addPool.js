const { prisma } =  require('../../../../modules/util/myPrisma.js') ;
const sub_topic_group = require("../../../../config/subTopics");
const subTopics = require('../../../../config/subTopics');

module.exports = async (req, res) => {
    try{
      const { instruction, depart, pool } = req.body;
      await prisma.pool.create({
        data: {
          id: instruction.code + depart.code + pool.code,
          mac: '',
          name: pool.name,
          depart: {
            connect: {
              id: instruction.code + depart.code
            }
          }
        }
      })
      for(let sub_topic of subTopics){
        global.mqttConnection.subscribe(sub_topic.replace('<poolID>', `${instruction.code}/${depart.code}/${pool.code}`))
        console.log(sub_topic.replace('<poolID>', `${instruction.code}/${depart.code}/${pool.code}`))
      }
      res.sendStatus(200);
  }catch(err){ console.log(err);res.sendStatus(500); }
}