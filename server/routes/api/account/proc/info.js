const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => { 
    let resData  = await prisma.user.findUnique({
        where: {username: req.payload.username},
        include: {
        fishAble: { 
            include: { 
            fish: { 
                include: {
                fishData: {
                    orderBy: {
                    time: 'desc'
                    },
                    take: 1 
                }
                }
            }
            } 
        }
        }
    });
    resData.fishesID = {};
    resData.fishAble.forEach(({fish: {location, fishUID, fishData: [{ active } = {active: 3}]}}) => {
        if(!resData.fishesID[location]) resData.fishesID[location] = {};
        resData.fishesID[location][fishUID] = active;
    })
    delete resData.fishAble;
    delete resData.passcode;
    delete resData.exist;
    delete resData.verify;
    resData.instructionTable = await prisma.instruction.findMany();
    resData.departTable = await prisma.depart.findMany();
    resData.poolTable = await prisma.pool.findMany();
    res.send(resData);
}