const { prisma } =  require('../../../../modules/util/myPrisma.js') ;
const fs = require("fs")

module.exports = async (req,res) => {
    try{
      const  { type, data } = req.body;
      console.log(type)
      if(type !== "motor"){
        data.time = Math.floor((new Date()).getTime()/1000);
        const ltasData = await prisma.component.findMany({
          where: { type, id: data.id }
        });
        console.log(lastData)
        if(lastData[0]) data.hours = (data.time - lastData.at(-1).time)/3600;
        else data.hours = 0;
        await prisma.component.create({
          data: {...data,type}
        });
      }
      else{
        data.time = Math.floor((new Date()).getTime()/1000);
        const lastData = await prisma.motor.findMany({
          where: { id: data.id }
        });
        console.log(lastData)
        if(lastData[0]){
          data.hours = (data.time - lastData.at(-1).time)/3600;
          data.turn += lastData.at(-1).turn;
        }
        else data.hours = 0;

        await prisma.motor.create({
          data: {...data}
        });
      }
      res.sendStatus(200);
    }catch(e){ res.sendStatus(e); }
  }