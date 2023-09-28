const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
    try{
      const { departID: id } = req.body;
      await prisma.depart.delete({
        where: {
          id,
        }
      })
      res.sendStatus(200);
  }catch(err){ console.log(err);res.sendStatus(500); }
}