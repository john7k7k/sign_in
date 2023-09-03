const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
    try{
    const { instruction, depart } = req.body;
    await prisma.depart.create({
        data: {
        id: instruction.code + depart.code,
        name: depart.name,
        instruction: {
            connect: {
            id: instruction.code
            }
        }
        }
    })
    res.sendStatus(200);
    }catch{ res.sendStatus(403) }
}