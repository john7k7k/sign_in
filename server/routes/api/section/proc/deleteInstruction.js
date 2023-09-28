const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
    try{
      const { instructionID: id } = req.body;
      await prisma.instruction.delete({
        where: {
          id,
        }
      })
      res.sendStatus(200);
  }catch(err){ console.log(err);res.sendStatus(500); }
}