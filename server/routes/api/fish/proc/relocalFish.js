const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

module.exports = async (req,res) => {
   try{
      await prisma.fish.update({
        where: {
            fishUID: req.body.fishUID
        },
        data: {
            location: req.body.newPool
        }
      })
      const users = await prisma.user.findMany();

      const admins = users.filter(user => user.level <= 30 && (req.body.newPool.match('^' + user.section)));
      for (let { userID } of admins){
        if(await prisma.fishAble.findUnique({
          where: {
            userID_fishUID_key: {
              userID,
              fishUID: req.body.fishUID,
            }
          }
        })) continue;
        await prisma.fishAble.create({
          data: {
            user: {
              connect: {
                userID
              }
            },
            fish: {
              connect:{
                fishUID: req.body.fishUID
              }
            }
          }
        });
      }
      res.sendStatus(200)
   }catch(e){ console.log(e);res.sendStatus(500);}
  }