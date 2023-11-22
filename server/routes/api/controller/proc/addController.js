const { PrismaClient } = require('@prisma/client');
const dotenv = require("dotenv").config();

module.exports = async (req, res) => {
    const prisma = new PrismaClient();
    await prisma.user.create({
        data: {
            id: req.body.controllerID,
            fish: req.body.fish,
            exist: 1,
            enable: ,
        }
    })
    await prisma.$disconnect();
    res.sendStatus(200);
}