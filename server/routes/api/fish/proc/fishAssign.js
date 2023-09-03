const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
    //try{
      const { username, fishUID } = req.body;
      const { userID, section } = await prisma.user.findUnique({ where: { username } });
      const { location } = await prisma.fish.findUnique({ where: { fishUID }});
      if(!location.match('^' + section) && section !== '001'){
        res.sendStatus(403);
        return;
      }
      await prisma.fishAble.create({
        data: {
          user: {
            connect: {
              userID
            }
          },
          fish: {
            connect:{
              fishUID
            }
          }
        }
      });
      res.sendStatus(200);
    //}catch{res.sendStatus(403)}
  }