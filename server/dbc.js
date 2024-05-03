
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
    await prisma.fishData.deleteMany({
        where: {
            version: 'init'
        }
    })
})()