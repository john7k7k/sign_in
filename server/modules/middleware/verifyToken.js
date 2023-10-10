const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = function (tokenFrom = 'URL'){
    return (redirect = false,threshold = 0, verifySection = true) => {
      return (req, res, next) => {
        console.log(redirect)
        if(!redirect) failMethod = () => res.sendStatus(403);
        else failMethod = () => res.redirect('/login');
        let token = '';
        try{
          if(tokenFrom === 'URL') token = req.query.token;
          else if(tokenFrom === 'Header') token = req.headers['authorization'].split(' ')[1];
          else if(tokenFrom === 'Cookie') token = req.cookies.token;
        }
        catch{
          failMethod();
          return;
        }
        jwt.verify(token, process.env.DB_JWTKEY, async (err, payload) => {
          if (err) {
            failMethod();
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
          if(level > threshold) failMethod();
          else if(verifySection && !req.query.section.match('^'+section) && section !== '001') failMethod();
          else next();
        })
      }
    }
  }