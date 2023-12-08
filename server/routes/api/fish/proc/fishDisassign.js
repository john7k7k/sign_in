const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

module.exports = async (req, res) => {
    try{
      const { username, fishUID } = req.body;
      const { userID, section } = await prisma.user.findUnique({ where: { username } });
      const { location } = await prisma.fish.findUnique({ where: { fishUID }});
      if(!location.match('^' + section) && section !== '001'){
        res.sendStatus(403);
        return;
      }
      await prisma.fishAble.delete({
        where: {
          userID_fishUID: {
            userID, fishUID
          }
        }
      });
      res.sendStatus(200);
    }catch{res.sendStatus(500)}
  }