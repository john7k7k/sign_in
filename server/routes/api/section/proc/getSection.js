const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
    try{
      const [poolTable, departTable, instructionTable] = [
        await prisma.pool.findMany(),
        await prisma.depart.findMany(),
        await prisma.instruction.findMany()
      ]
      res.send({ poolTable, departTable, instructionTable });
    }catch{ res.sendStatus(500); }
}