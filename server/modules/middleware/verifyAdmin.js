const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = function (){
    return async (req, res, next) => {
      try{
        req.admin = await prisma.user.findUnique({
          where: {username: req.payload.username},
        });
        const { level: adminLevel, section: adminSection } = req.admin;
        const { level: userLevel, section: userSection, email: userEmail } = await prisma.user.findUnique({
          where: {username: req.body.username},
        });
        if(adminSection !== '001' && !userSection.match('^'+adminSection)){
          res.sendStatus(403);
          return;
        }
        if(req.body.newLevel < adminLevel || userLevel < adminLevel){
          res.sendStatus(403);
          return;
        }
        req.user = {};
        req.user.email = userEmail;
        next();
      }catch{res.sendStatus(500);}
    }
  }