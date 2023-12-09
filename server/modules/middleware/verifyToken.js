const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { prisma } =  require('../../modules/util/myPrisma.js') ;

module.exports = function (tokenFrom = 'URL'){
    return (threshold = 0, verifySection = true) => {
      return (req, res, next) => {
        let token = '';
        try{
          if(tokenFrom === 'URL') token = req.query.token;
          else if(tokenFrom === 'Header') token = req.headers['authorization'].split(' ')[1];
          else if(tokenFrom === 'Cookie') token = req.cookies.token;
        }
        catch{
          res.sendStatus(403);
          return;
        }
        jwt.verify(token, process.env.DB_JWTKEY, async (err, payload) => {
          if (err) {
            res.sendStatus(403);
            console.log(err);
            return;
          }
          req.payload = payload;
          if(threshold === 0) {
            next();
            return;
          }
          const { level, section } = await prisma.user.findUnique({
            where: {
              username: payload.username
            }
          });
          if(level > threshold) res.sendStatus(403);
          else if(verifySection && !req.query.section.match('^'+section) && section !== '001') res.sendStatus(403);
          else next();
        })
      }
    }
  }