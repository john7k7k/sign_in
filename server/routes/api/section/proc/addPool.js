const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
    try{
      const { instruction, depart, pool } = req.body;
      await prisma.pool.create({
        data: {
          id: instruction.code + depart.code + pool.code,
          mac: '',
          name: pool.name,
          depart: {
            connect: {
              id: instruction.code + depart.code
            }
          }
        }
      })
      res.sendStatus(200);
  }catch{ res.sendStatus(500); }
}