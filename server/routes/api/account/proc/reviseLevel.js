const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => { 
    await prisma.user.update({
    where: {username: req.body.username},
    data: {level: req.body.newLevel}
    });
    res.sendStatus(200);
}