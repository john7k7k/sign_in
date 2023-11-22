const { PrismaClient } = require('@prisma/client');
const dotenv = require("dotenv").config();

module.exports = async (req, res) => {
    const prisma = new PrismaClient();
    await prisma.user.delete({
        where: {id: req.payload.controllerID}
    })
    await prisma.$disconnect();
    res.sendStatus(200);
}