const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require("fs")
module.exports = async (req,res) => {
    try{
      const  { fishUID } = req.body;
      await prisma.fish.create({
        data: {
          fishUID,
          exist: 1,
          pool: {
            connect: {
              id: req.query.section
            }
          }
        }
      });
      fs.mkdir(`uploads/photos/fish/${fishUID}` , {recursive: true},() => void 0)
      const users = await prisma.user.findMany();
      const admins = users.filter(user => user.level <= 30 && (req.query.section.match('^' + user.section)||user.section=='001'));
      for (let { userID } of admins)
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
    }catch{ res.sendStatus(500); }
  }