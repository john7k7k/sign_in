
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

(async (prisma)=>{
    await prisma.FishMap.create({
        data: {
            id: 2534,
            fish: {create:[
                {bc: 50, err:28, active: 0},
                {bc: 51, err:30, active: 0}
            ]}
        }
    })
    //await prisma.FishMap.deleteMany()
    await prisma.FishMap.create({
        data: {
            id: 2535,
            fish: {create:[
                {bc: 60, err:28, active: 1},
                {bc: 61, err:30, active: 0}
            ]}
        }
    })
    console.table(await prisma.Fish.findMany());
    await prisma.FishMap.deleteMany()
})(prisma)
